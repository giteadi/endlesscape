import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { askTravelAssistant } from './services/ragService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'database.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage configuration for clean, web-optimized image filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.webp';
    const safeExt = ['.webp', '.jpg', '.jpeg', '.png', '.avif'].includes(ext) ? ext : '.webp';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `expedition-${uniqueSuffix}${safeExt}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are permitted'));
    }
  }
});

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/api/uploads', express.static(UPLOADS_DIR));

// Disable browser caching for all dynamic API endpoints
app.use('/api', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Helper to read and write database
function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database:', err);
    return { itineraries: [], enquiries: [] };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing database:', err);
    return false;
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Endlesscape Bespoke Travel Engine', timestamp: new Date().toISOString() });
});

// Admin Authentication Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  const cleanUsername = (username || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  // Valid credentials for endlesscape concierge admin
  if (
    (cleanUsername === 'admin' || cleanUsername === 'concierge') &&
    (cleanPassword === 'endlesscape2026' || cleanPassword === 'admin123' || cleanPassword === 'admin')
  ) {
    const token = `auth-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    return res.json({
      success: true,
      token,
      user: {
        username: 'admin',
        role: 'admin',
        name: 'Chief Concierge',
      },
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid administrator credentials. Please check your username and access key.',
  });
});

// Admin Token Verify
app.get('/api/admin/verify', (req, res) => {
  res.json({ success: true, status: 'authenticated' });
});


// Admin Stats
app.get('/api/stats', (req, res) => {
  const db = readDB();
  const totalEnquiries = db.enquiries.length;
  const newEnquiries = db.enquiries.filter(e => e.status === 'New').length;
  const proposalsSent = db.enquiries.filter(e => e.status === 'Proposal Sent').length;
  const totalItineraries = db.itineraries.length;

  res.json({
    totalEnquiries,
    newEnquiries,
    proposalsSent,
    totalItineraries,
    estimatedPipeline: `£${(totalEnquiries * 12500).toLocaleString()}`,
  });
});

// GET Itineraries (with optional region or keyword search)
app.get('/api/itineraries', (req, res) => {
  const db = readDB();
  const { region, search } = req.query;
  let items = db.itineraries || [];

  if (region && region !== 'all') {
    items = items.filter(it => it.region === region);
  }

  if (search) {
    const q = search.toLowerCase().trim();
    items = items.filter(it =>
      it.title.toLowerCase().includes(q) ||
      it.country.toLowerCase().includes(q) ||
      it.tagline.toLowerCase().includes(q) ||
      (it.highlights && it.highlights.some(h => h.toLowerCase().includes(q)))
    );
  }

  res.json(items);
});

// GET single itinerary
app.get('/api/itineraries/:id', (req, res) => {
  const db = readDB();
  const item = db.itineraries.find(it => it.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Itinerary not found' });
  }
  res.json(item);
});

// POST Upload multiple images (Admin)
app.post('/api/upload', upload.array('images', 12), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }
    const urls = req.files.map(file => `/api/uploads/${file.filename}`);
    res.json({ success: true, urls });
  } catch (err) {
    console.error('File upload error:', err);
    res.status(500).json({ error: 'File upload failed' });
  }
});

// POST Create itinerary (Admin)
app.post('/api/itineraries', (req, res) => {
  const db = readDB();
  const heroImg = req.body.image || (Array.isArray(req.body.gallery) && req.body.gallery[0]) || 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=85';
  const galleryImgs = Array.isArray(req.body.gallery) && req.body.gallery.length > 0
    ? req.body.gallery
    : (heroImg ? [heroImg] : []);

  const newItem = {
    id: req.body.id || `trip-${Date.now()}`,
    nights: Number(req.body.nights) || 7,
    country: req.body.country?.toUpperCase() || 'UNKNOWN DESTINATION',
    region: req.body.region || 'mediterranean',
    title: req.body.title?.toUpperCase() || 'UNTITLED EXPEDITION',
    tagline: req.body.tagline || 'Bespoke luxury journey tailored around feeling.',
    image: heroImg,
    gallery: galleryImgs,
    tag: req.body.tag || 'EXCLUSIVE DEPARTURE',
    startingPrice: req.body.startingPrice || '£9,500 per person',
    bestSeason: req.body.bestSeason || 'Year-Round',
    highlights: Array.isArray(req.body.highlights) ? req.body.highlights : ['Private helicopter transit', 'Relais & Châteaux accommodation'],
    description: req.body.description || 'A rarefied journey designed exclusively for discerning travelers.',
    itineraryOutline: Array.isArray(req.body.itineraryOutline) ? req.body.itineraryOutline : [
      { day: 'Day 1-2', title: 'Private Arrival & VIP Lodge Check-in', detail: 'Chauffeured luxury transit and evening welcome tasting.' }
    ]
  };

  db.itineraries.unshift(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

// PUT Update itinerary (Admin)
app.put('/api/itineraries/:id', (req, res) => {
  const db = readDB();
  const index = db.itineraries.findIndex(it => it.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Itinerary not found' });
  }

  db.itineraries[index] = {
    ...db.itineraries[index],
    ...req.body,
    id: req.params.id
  };

  writeDB(db);
  res.json(db.itineraries[index]);
});

// DELETE itinerary (Admin)
app.delete('/api/itineraries/:id', (req, res) => {
  const db = readDB();
  const initialLength = db.itineraries.length;
  db.itineraries = db.itineraries.filter(it => it.id !== req.params.id);

  if (db.itineraries.length === initialLength) {
    return res.status(404).json({ error: 'Itinerary not found' });
  }

  writeDB(db);
  res.json({ message: 'Itinerary deleted successfully' });
});

// GET Enquiries (Admin)
app.get('/api/enquiries', (req, res) => {
  const db = readDB();
  res.json(db.enquiries || []);
});

// POST Submit enquiry (Public Website form)
app.post('/api/enquiries', (req, res) => {
  const db = readDB();
  const newEnquiry = {
    id: `enq-${Date.now()}`,
    fullName: req.body.fullName || 'Anonymous Guest',
    email: req.body.email || 'guest@domain.com',
    phone: req.body.phone || 'N/A',
    destination: req.body.destination || req.body.selectedRegion || 'Global Custom',
    travelParty: req.body.travelParty || req.body.selectedParty || 'Couples Escape',
    feeling: req.body.feeling || req.body.selectedFeeling || 'Awe & Wonder',
    travelMonth: req.body.travelMonth || 'Flexible',
    notes: req.body.notes || '',
    status: 'New',
    createdAt: new Date().toISOString()
  };

  db.enquiries.unshift(newEnquiry);
  writeDB(db);
  res.status(201).json({ success: true, enquiry: newEnquiry });
});

// PATCH Update enquiry status (Admin)
app.patch('/api/enquiries/:id', (req, res) => {
  const db = readDB();
  const item = db.enquiries.find(e => e.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }

  if (req.body.status) item.status = req.body.status;
  if (req.body.assignedSpecialist) item.assignedSpecialist = req.body.assignedSpecialist;

  writeDB(db);
  res.json(item);
});

// DELETE Enquiry (Admin)
app.delete('/api/enquiries/:id', (req, res) => {
  const db = readDB();
  db.enquiries = db.enquiries.filter(e => e.id !== req.params.id);
  writeDB(db);
  res.json({ message: 'Enquiry archived/deleted' });
});

// AI Concierge Chat RAG Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A query message is required.' });
    }

    const result = await askTravelAssistant({ message, history });
    return res.json({
      success: true,
      reply: result.reply,
      relevantPackages: result.relevantPackages || [],
      suggestedQuestions: result.suggestedQuestions || [],
    });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while consulting the travel concierge.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Endlesscape Luxury Travel Engine running on port ${PORT}`);
});
