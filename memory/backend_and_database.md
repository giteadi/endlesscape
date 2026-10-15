# Backend Architecture & Database Specification

This document details the backend server architecture, REST API contracts, database schema, and data persistence models for **Endlesscape**.

---

## ✦ Backend Technology Stack

- **Runtime**: Node.js (v18.20.8+)
- **Framework**: Express.js
- **Middleware**: CORS (`cors`), JSON Body Parser (`express.json()`)
- **Process Manager**: PM2 (`endlesscape-api`)
- **Data Persistence**: File-backed JSON Database (`server/data/database.json`)

---

## ✦ Database Schema (`server/data/database.json`)

The database consists of two core tables: `itineraries` and `enquiries`.

### 1. `itineraries` Table

Stores all curated bespoke journeys, regional metadata, photo galleries, editorial narratives, and day-by-day plans.

```json
{
  "id": "morocco-sahara-odyssey",
  "title": "Morocco: From Imperial Riads to Sahara Sands",
  "subtitle": "Marrakech, High Atlas Mountains, and Private Luxury Sahara Camp",
  "region": "Africa & Middle East",
  "country": "Morocco",
  "days": 10,
  "price": "£7,850",
  "tags": ["Culture", "Desert", "Romance", "Gastronomy"],
  "bestMonths": ["October", "November", "March", "April"],
  "heroImage": "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1800&q=85",
  "gallery": [
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80"
  ],
  "overview": "Begin within the terracotta walls of Marrakech...",
  "highlightTitle": "24 HOURS IN MARRAKECH",
  "highlightQuote": "Drifting over the desert dunes at dawn in a private hot air balloon...",
  "dayByDay": [
    {
      "day": 1,
      "title": "Arrival in Marrakech & The Secret Medina Riads",
      "description": "Step off your flight to private VIP lounge service..."
    }
  ]
}
```

### 2. `enquiries` Table

Stores all inbound client leads, trip requests, and concierge status progression.

```json
{
  "id": "enq-1792054879460",
  "fullName": "Lord Alexander Sterling",
  "email": "alexander@sterling.co.uk",
  "phone": "+44 207 426 9888",
  "destination": "Morocco Sahara Odyssey",
  "travelParty": "Couples Escape",
  "feeling": "Awe & Wonder",
  "travelMonth": "November",
  "idealDuration": "10-14 days",
  "approxBudget": "£15,000+",
  "specialRequests": "Private astronomical guide for Sahara desert nights",
  "status": "New",
  "createdAt": "2026-10-15T09:01:19.460Z"
}
```

**Status States**: `'New' | 'Under Review' | 'Proposal Sent' | 'Confirmed' | 'Archived'`

---

## ✦ REST API Endpoints Specification

Base URL (Local): `http://localhost:5001/api`  
Base URL (Production): `https://getashokaazzwels.shop/api`

### 1. Health & Analytics
- **`GET /api/health`**
  - Response: `{ "status": "ok", "service": "Endlesscape Bespoke Travel Engine", "timestamp": "..." }`
- **`GET /api/stats`**
  - Response: `{ "totalEnquiries": 4, "newEnquiries": 2, "proposalsSent": 1, "totalItineraries": 12, "estimatedPipeline": "£50,000" }`

### 2. Itineraries
- **`GET /api/itineraries`**
  - Query Params (optional): `?region=Europe`, `?search=safari`
  - Response: Array of `Itinerary` objects.
- **`GET /api/itineraries/:id`**
  - Response: Single `Itinerary` object or 404.
- **`POST /api/itineraries`**
  - Body: Complete `Itinerary` JSON payload.
  - Response: `{ "success": true, "itinerary": { ... } }`

### 3. Enquiries (CRM)
- **`GET /api/enquiries`**
  - Response: Array of all `Enquiry` objects (newest first).
- **`POST /api/enquiries`**
  - Body: Client enquiry form payload.
  - Generates automatic unique ID (`enq-[timestamp]`) and sets `status: 'New'`.
  - Response: `{ "success": true, "enquiry": { ... } }`
- **`PATCH /api/enquiries/:id/status`**
  - Body: `{ "status": "Proposal Sent" }`
  - Response: `{ "success": true, "enquiry": { ... } }`
