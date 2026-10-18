# Deployment & Server Infrastructure

This document details the live production deployment, hosting architecture, server locations, credentials mapping, and deployment workflows for **Endlesscape**.

---

## ✦ Production Server & VPS Specifications

| Property | Value | Notes |
| :--- | :--- | :--- |
| **Primary Domain** | `https://getashokaazzwels.shop` | Managed in Hostinger Portfolio |
| **Secondary Domain** | `https://www.getashokaazzwels.shop` | 301 redirects to primary domain |
| **Public IPv4** | `195.35.45.17` | Static VPS IP |
| **Public IPv6** | `2a02:4780:12:1e1e::1` | Configured on Hostinger Cloud |
| **Hostinger VM ID** | `749165` | KVM 2 Plan (Data Center: 13) |
| **Hardware Specs** | 2 vCPUs, 8 GB RAM, 100 GB NVMe Disk | High performance |
| **Operating System** | Ubuntu 24.04 LTS (Noble Numbat) | 64-bit Linux |
| **Hostinger Firewall** | Group ID: `359929` (`default-security`) | Rules: SSH (22), HTTP (80), HTTPS (443) |
| **GitHub Repository** | `https://github.com/giteadi/endlesscape.git` | Branch: `main` |

---

## ✦ DNS Records (Hostinger DNS)

| Type | Name | Content | TTL | Purpose |
| :---: | :---: | :---: | :---: | :--- |
| **A** | `@` | `195.35.45.17` | 14400 | Apex domain routing |
| **CNAME** | `www` | `getashokaazzwels.shop.` | 300 | Subdomain redirect |

---

## ✦ VPS Directory Layout & Locations

```
/home/aditya/
├── endlesscape/                            # Application Base Directory
│   ├── client/
│   │   └── dist/                           # Transferred React Production Build
│   │       ├── index.html
│   │       ├── favicon.svg
│   │       ├── icons.svg
│   │       └── assets/
│   │           ├── index-[hash].js
│   │           ├── index-[hash].css
│   │           ├── images/
│   │           └── videos/                 # 1080p and Mobile MP4 streams
│   ├── server/                             # Production Node.js API
│   │   ├── server.js
│   │   ├── package.json
│   │   ├── node_modules/
│   │   └── data/
│   │       └── database.json               # Persistent JSON database
│   └── deploy_nginx.sh                     # Automated deployment script

/var/www/
└── covershield/                            # Live Nginx Web Root Directory
    ├── index.html                          # Synced from client/dist/
    └── assets/                             # Synced static & video assets

/etc/nginx/
├── sites-available/covershield             # Primary Nginx Server Block
└── sites-enabled/covershield               # Symlink to sites-available
```

---

## ✦ Process Management (PM2)

The backend API is managed as a daemon using PM2 under user `aditya`.

- **Process Name**: `endlesscape-api`
- **Internal Port**: `5001` (Listens on `127.0.0.1:5001`)
- **Working Directory**: `/home/aditya/endlesscape/server`
- **Status Check**:
  ```bash
  pm2 status
  pm2 logs endlesscape-api --lines 50
  ```
- **Restart Command**:
  ```bash
  pm2 restart endlesscape-api
  ```

---

## ✦ Nginx Configuration

File: `/etc/nginx/sites-available/covershield`

```nginx
server {
    server_name getashokaazzwels.shop www.getashokaazzwels.shop;
    root /var/www/covershield;
    index index.html;
    
    client_max_body_size 100M;
    
    # Single Page Application fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Reverse proxy to Node Express API
    location /api/ {
        proxy_pass http://127.0.0.1:5001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # High-performance caching for videos and static assets
    location ~* \.(mp4|webm|ogg|js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/getashokaazzwels.shop/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/getashokaazzwels.shop/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 80;
    server_name getashokaazzwels.shop www.getashokaazzwels.shop;
    return 301 https://$host$request_uri;
}
```

---

## ✦ Security & Fail2ban Rules

1. **Direct root login is disabled**: Always SSH as user `aditya`:
   ```bash
   ssh -i ~/.ssh/id_ed25519 aditya@195.35.45.17
   ```
   - User `aditya` sudo password: `RuhiRiya@12345`
   - Database credentials: `Tiger@123`
2. **Fail2ban (`f2b-sshd`) is active**:
   - Multiple failed SSH attempts will trigger an automatic IP ban.
   - To check ban status or unban an IP from VPS terminal:
     ```bash
     sudo fail2ban-client status sshd
     sudo fail2ban-client unban <IP_ADDRESS>
     ```

---

## ✦ Full Update & Deployment Pipeline

To deploy new code updates:
1. **Build locally**:
   ```bash
   npm --prefix client run build
   ```
2. **Sync files to VPS**:
   ```bash
   rsync -avz --delete -e "ssh -i ~/.ssh/id_ed25519" client/dist/ aditya@195.35.45.17:/home/aditya/endlesscape/client/dist/
   rsync -avz --exclude 'node_modules' -e "ssh -i ~/.ssh/id_ed25519" server/ aditya@195.35.45.17:/home/aditya/endlesscape/server/
   ```
3. **Execute deployment script on VPS**:
   ```bash
   ssh -i ~/.ssh/id_ed25519 aditya@195.35.45.17 "sudo /home/aditya/endlesscape/deploy_nginx.sh && pm2 restart endlesscape-api"
   ```
