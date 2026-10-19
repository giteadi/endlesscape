import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { buildKnowledgeDocuments, getItinerariesKnowledge } from '../data/travelKnowledge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini 2.5 Flash via LangChain
let model = null;
if (GEMINI_API_KEY) {
  try {
    model = new ChatGoogleGenerativeAI({
      apiKey: GEMINI_API_KEY,
      model: 'gemini-2.5-flash',
      temperature: 0.25,
      maxOutputTokens: 1024,
    });
  } catch (err) {
    console.error('Failed to initialize ChatGoogleGenerativeAI:', err);
  }
} else {
  console.warn('GEMINI_API_KEY not configured in environment.');
}

/**
 * Score and retrieve top matching knowledge documents
 */
export function retrieveContext(query, topK = 4) {
  const docs = buildKnowledgeDocuments();
  const cleanQuery = (query || '').toLowerCase().trim();
  const tokens = cleanQuery.split(/[\s,?.!]+/).filter(Boolean);

  if (tokens.length === 0) {
    return {
      contextText: docs.slice(0, 3).map(d => d.content).join('\n\n---\n\n'),
      matchedPackages: docs.filter(d => d.type === 'itinerary').slice(0, 3)
    };
  }

  const scoredDocs = docs.map(doc => {
    let score = 0;
    const contentLower = doc.content.toLowerCase();
    const titleLower = doc.title.toLowerCase();

    // Direct phrase match
    if (contentLower.includes(cleanQuery)) {
      score += 25;
    }
    if (titleLower.includes(cleanQuery)) {
      score += 40;
    }

    // Exact country match gets highest priority
    if (doc.country && cleanQuery.includes(doc.country.toLowerCase())) {
      score += 60;
    }

    // Token frequency and keyword boosts
    for (const token of tokens) {
      if (token.length < 2) continue;

      if (doc.country && doc.country.toLowerCase().includes(token)) {
        score += 35;
      }
      if (doc.region && doc.region.toLowerCase().includes(token)) {
        score += 15;
      }
      if (titleLower.includes(token)) {
        score += 20;
      }
      if (doc.keywords && doc.keywords.some(k => k.includes(token))) {
        score += 8;
      }
      if (contentLower.includes(token)) {
        score += 3;
      }
    }

    // Style query boosts
    if (cleanQuery.includes('honeymoon') && contentLower.includes('honeymoon')) score += 12;
    if (cleanQuery.includes('family') && contentLower.includes('family')) score += 12;
    if (cleanQuery.includes('solo') && contentLower.includes('solo')) score += 12;
    if (cleanQuery.includes('price') || cleanQuery.includes('cost') || cleanQuery.includes('budget') || cleanQuery.includes('rate')) {
      if (doc.startingPrice) score += 5;
    }

    return { doc, score };
  });

  scoredDocs.sort((a, b) => b.score - a.score);

  const topScored = scoredDocs.slice(0, topK);
  const matchedDocs = topScored.map(item => item.doc);

  // Extract distinct itinerary packages from results for interactive UI cards
  const matchedPackages = [];
  const seenIds = new Set();
  for (const item of topScored) {
    if (item.doc.type === 'itinerary' && !seenIds.has(item.doc.id) && item.score > 2) {
      seenIds.add(item.doc.id);
      matchedPackages.push({
        id: item.doc.id,
        title: item.doc.title,
        country: item.doc.country,
        region: item.doc.region,
        startingPrice: item.doc.startingPrice,
        nights: item.doc.nights,
        image: item.doc.image,
        bestSeason: item.doc.bestSeason
      });
    }
  }

  const contextText = matchedDocs.map(d => d.content).join('\n\n---\n\n');

  return {
    contextText,
    matchedPackages
  };
}

/**
 * Generate intelligent follow-up suggestions based on query and context
 */
function generateSuggestedQuestions(query, matchedPackages) {
  const suggestions = [];
  if (matchedPackages.length > 0) {
    const pkg = matchedPackages[0];
    suggestions.push(`What are the key highlights of ${pkg.country}?`);
    suggestions.push(`Can we customize the ${pkg.nights}-night ${pkg.country} itinerary?`);
  } else {
    suggestions.push('What are your most popular honeymoon itineraries?');
    suggestions.push('Which destinations are best to visit in October?');
  }
  suggestions.push('How does the private concierge booking process work?');
  return suggestions.slice(0, 3);
}

/**
 * Main RAG processing method
 */
export async function askTravelAssistant({ message, history = [] }) {
  if (!message || typeof message !== 'string') {
    throw new Error('Message query must be a non-empty string');
  }

  // 1. RAG Retrieval Step
  const { contextText, matchedPackages } = retrieveContext(message, 4);

  // 2. Format history for conversational continuity (last 4 turns)
  const recentHistory = (Array.isArray(history) ? history : [])
    .slice(-4)
    .map(h => `${h.role === 'user' ? 'Guest' : 'Aura'}: ${h.content}`)
    .join('\n');

  // 3. Fallback responder if model fails or key limit reached
  const generateFallbackResponse = () => {
    if (matchedPackages.length > 0) {
      const top = matchedPackages[0];
      return `Welcome to Endlesscape. Based on our private catalog, we feature an exclusive expedition: **${top.title}** (${top.nights} nights, starting from ${top.startingPrice}). It includes private luxury accommodation, VIP transfers, and curated excursions. Our travel curators would be delighted to customize every detail for you.`;
    }
    return `Welcome to Endlesscape Bespoke Travel. Every journey we create is tailor-made around how you wish to feel. From royal palaces in Rajasthan and private yachts along the Amalfi Coast to starlit camps in the Sahara, our travel curators can design your journey anywhere on Earth. Feel free to enquire with your dates and party size!`;
  };

  if (!model) {
    return {
      reply: generateFallbackResponse(),
      relevantPackages: matchedPackages,
      suggestedQuestions: generateSuggestedQuestions(message, matchedPackages)
    };
  }

  try {
    const systemPrompt = `You are Aura, the Senior Bespoke Travel Concierge & Curator at Endlesscape — an ultra-luxury bespoke travel house inspired by Black Tomato, Aman, and Conde Nast Traveler.

Your Persona:
- Warm, cultured, discerning, poetic, and extraordinarily knowledgeable.
- You speak with understated British-leaning luxury elegance ("delighted to assist", "rarefied", "bespoke", "sanctuary", "unhurried").
- You provide precise, factual travel answers grounded STRICTLY in the provided Endlesscape Knowledge Base.
- If the guest inquires in Hindi or Hinglish (e.g., "mujhe honeymoon ke liye package batao", "Norway ka price kitna hai?"), respond warmly and naturally in elegant Hindi/Hinglish while preserving ultra-luxury grace and exact package details.
- When describing an expedition, mention:
  1. The exact title and destination
  2. Duration in nights
  3. Starting price in GBP (£)
  4. Best season / months to travel
  5. Standout luxury highlights (e.g. private helicopter transfers, Michelin dining, Relais & Châteaux)
- If the guest asks for a destination not currently in the catalog, explain with warmth that Endlesscape crafts 100% tailor-made bespoke journeys to virtually any destination worldwide, and invite them to submit an enquiry.
- Do NOT make up fake prices or fictitious packages outside the knowledge base.
- Keep responses engaging, structured (use bullet points or clean paragraphs), and focused.

RELEVANT ENDLESSCAPE KNOWLEDGE BASE:
${contextText}

CONVERSATION HISTORY:
${recentHistory || 'No previous turns.'}
`;

    const chatPrompt = ChatPromptTemplate.fromMessages([
      ['system', systemPrompt],
      ['human', '{query}']
    ]);

    const chain = chatPrompt.pipe(model).pipe(new StringOutputParser());

    const invokePromise = chain.invoke({ query: message });
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('RAG generation timed out after 16000ms')), 16000)
    );

    const reply = await Promise.race([invokePromise, timeoutPromise]);

    return {
      reply: reply.trim(),
      relevantPackages: matchedPackages,
      suggestedQuestions: generateSuggestedQuestions(message, matchedPackages)
    };
  } catch (err) {
    console.error('Gemini RAG Generation Error:', err.message);
    return {
      reply: generateFallbackResponse(),
      relevantPackages: matchedPackages,
      suggestedQuestions: generateSuggestedQuestions(message, matchedPackages),
      warning: 'Fallback response used due to upstream API latency.'
    };
  }
}
