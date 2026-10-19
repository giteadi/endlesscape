// Endlesscape Knowledge Base for RAG (Retrieval-Augmented Generation)
// Combines live database itineraries with curated luxury travel domain expertise.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'database.json');

export const TRAVEL_STYLES_KNOWLEDGE = [
  {
    style: 'Family Expeditions',
    description: 'Wonders crafted for all generations. Private villas, expert naturalists, unhurried pacing, wildlife tracking, and interactive wilderness masterclasses.',
    recommendedDestinations: ['Costa Rica Rainforest', 'Kenya Masai Mara', 'Galápagos Islands', 'Ecuador'],
    typicalBudget: '£8,500 – £16,000 per person'
  },
  {
    style: 'Couples & Romance',
    description: 'Intimate horizons, clifftop infinity pools, candlelit Roman ruins, secret Tuscan vineyards, and starlit private desert camps.',
    recommendedDestinations: ['Santorini & Amalfi Coast', 'Como & Tuscany', 'Bora Bora Overwater Villas', 'Swiss Alpine Chalets'],
    typicalBudget: '£7,900 – £15,000 per person'
  },
  {
    style: 'Milestone Groups & Celebrations',
    description: 'Whole-estate and island buyouts, chartered classic schooners, private castles, and bespoke private chef gatherings.',
    recommendedDestinations: ['Scottish Highlands Lodge', 'Balearic Private Catamaran', 'Napa Valley Private Vineyard', 'Rajasthan Palaces'],
    typicalBudget: '£9,000 – £20,000 per person'
  },
  {
    style: 'Once-in-a-Lifetime Honeymoon',
    description: 'Barefoot luxury, private coral reef sandbanks, glacier helicopter flights, overwater suites, and seamless pampering.',
    recommendedDestinations: ['Amalfi Coast & Como (Italy)', 'Bali, Sumba & Komodo Yachts', 'Maldives Atolls', 'Kyoto Zen Sanctuary'],
    typicalBudget: '£10,000 – £18,000 per person'
  },
  {
    style: 'Solo Immersion & Freedom',
    description: 'Untamed freedom, deep cultural immersion, photography expeditions, mindful wellness sanctuaries, and effortless safety.',
    recommendedDestinations: ['Patagonia Wilderness', 'Iceland Ring Road & Aurora', 'Bhutan Monasteries', 'Kyoto & Tokyo'],
    typicalBudget: '£8,400 – £14,000 per person'
  }
];

export const SEASONAL_CALENDAR_KNOWLEDGE = [
  { month: 'January', bestFor: 'Maldives, Southeast Asia, Costa Rica, Patagonia (Summer in Southern Hemisphere)' },
  { month: 'February', bestFor: 'Sri Lanka, Kenya & Tanzania wildebeest calving, Finnish Lapland northern lights' },
  { month: 'March', bestFor: 'Japan cherry blossom preview, Morocco Sahara desert, Jordan Petra, Galápagos' },
  { month: 'April', bestFor: 'Japan full sakura cherry blossoms, Mediterranean spring warmth, South Africa safari' },
  { month: 'May', bestFor: 'Italy (Amalfi & Tuscany before summer crowds), Greece island hopping, Peru Machu Picchu' },
  { month: 'June', bestFor: 'Norway midnight sun & fjords, Bali & Indonesia sailing, Iceland highlands' },
  { month: 'July', bestFor: 'Swiss Alps hiking, Great Serengeti wildebeest migration, French Riviera yachting' },
  { month: 'August', bestFor: 'Scottish Highlands, Croatia coast & islands, Botswana Okavango Delta' },
  { month: 'September', bestFor: 'Italian wine harvest in Tuscany, Greece sunny calm waters, Namibia wildlife dunes' },
  { month: 'October', bestFor: 'India Rajasthan palace season reopening, Egypt Nile private dahabiya, Japan autumn leaves' },
  { month: 'November', bestFor: 'New Zealand early summer, Antarctica expedition cruise season opening, Oman deserts' },
  { month: 'December', bestFor: 'Lapland winter wonderland, Caribbean private catamarans, Patagonia summer hiking' }
];

export const BESPOKE_SERVICE_PILLARS = [
  '100% Tailor-Made: Every expedition is customized from zero around the guest’s personal pacing, desires, and travel party.',
  'Curator Direct Access: A dedicated Senior Travel Curator plans and oversees the expedition with 24/7 on-trip concierge assistance.',
  'Unrivalled VIP Access: Private opening of historical monuments, private helicopter charters, luxury yachts, and private estate buyouts.',
  'Ultra-Luxury Accommodation Standards: Exclusive partnerships with Relais & Châteaux, Aman, Belmond, Rosewood, and private family-owned villas.',
  'Seamless Door-to-Door Logistics: Private airport VIP tarmac greetings, baggage handling, and chauffeured luxury Mercedes/Range Rover fleets.'
];

/**
 * Retrieve all itineraries directly from database.json
 */
export function getItinerariesKnowledge() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
      return data.itineraries || [];
    }
  } catch (err) {
    console.error('Error loading itineraries for RAG:', err);
  }
  return [];
}

/**
 * Build searchable documents for RAG retrieval
 */
export function buildKnowledgeDocuments() {
  const itineraries = getItinerariesKnowledge();
  const docs = [];

  // 1. Itinerary documents
  for (const it of itineraries) {
    const highlightsText = Array.isArray(it.highlights) ? it.highlights.join('; ') : '';
    const monthsText = Array.isArray(it.months) ? it.months.join(', ') : '';
    const outlineText = Array.isArray(it.itineraryOutline)
      ? it.itineraryOutline.map(d => `${d.day}: ${d.title} - ${d.detail}`).join(' | ')
      : '';
    const content = `
EXPEDITION: ${it.title}
Country: ${it.country}
Region: ${it.region}
Duration: ${it.nights} nights
Starting Price: ${it.startingPrice} ${it.priceNote || ''}
Best Season: ${it.bestSeason || 'Year-round'}
Ideal Months: ${monthsText || it.bestSeason || 'All year'}
Tag: ${it.tag || 'Bespoke Expedition'}
Overview: ${it.tagline || ''}. ${it.description ? it.description.slice(0, 220) : ''}
Key Luxury Highlights: ${highlightsText}
`.trim();

    docs.push({
      id: it.id,
      type: 'itinerary',
      title: it.title,
      country: it.country,
      region: it.region,
      startingPrice: it.startingPrice,
      nights: it.nights,
      image: it.image,
      bestSeason: it.bestSeason,
      content,
      keywords: [
        it.country.toLowerCase(),
        it.region.toLowerCase(),
        ...it.title.toLowerCase().split(/\s+/),
        ...(Array.isArray(it.highlights) ? it.highlights.map(h => h.toLowerCase()) : []),
        ...(Array.isArray(it.months) ? it.months.map(m => m.toLowerCase()) : [])
      ]
    });
  }

  // 2. Travel style documents
  for (const style of TRAVEL_STYLES_KNOWLEDGE) {
    docs.push({
      id: `style-${style.style.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      type: 'travel_style',
      title: style.style,
      content: `TRAVEL STYLE: ${style.style}\nDescription: ${style.description}\nRecommended Destinations: ${style.recommendedDestinations.join(', ')}\nTypical Budget Guide: ${style.typicalBudget}`,
      keywords: [
        style.style.toLowerCase(),
        'style',
        'travel party',
        ...style.recommendedDestinations.map(d => d.toLowerCase())
      ]
    });
  }

  // 3. Seasonal calendar documents
  for (const cal of SEASONAL_CALENDAR_KNOWLEDGE) {
    docs.push({
      id: `season-${cal.month.toLowerCase()}`,
      type: 'seasonal_calendar',
      title: `Best Travel in ${cal.month}`,
      content: `SEASONAL GUIDE: In ${cal.month}, the most extraordinary destinations to visit are: ${cal.bestFor}. Climate, scenery and wildlife visibility are at their peak.`,
      keywords: [cal.month.toLowerCase(), 'when to go', 'season', 'weather', 'month']
    });
  }

  // 4. Bespoke Service & Booking Pillar document
  docs.push({
    id: 'endlesscape-service-pillars',
    type: 'company_pillars',
    title: 'Endlesscape Bespoke Travel Philosophy & Service Standard',
    content: `ENDLESSCAPE PILLARS & HOW WE OPERATE:\n${BESPOKE_SERVICE_PILLARS.join('\n')}\nBooking Process: Guests submit an enquiry online or contact their curator. We design a bespoke digital narrative itinerary in 24 hours. Once refined, guests confirm with deposit and all logistics, private flights, guides, and hotels are secured.`,
    keywords: ['booking', 'process', 'curator', 'service', 'bespoke', 'deposit', 'vip', 'customise', 'tailor']
  });

  return docs;
}
