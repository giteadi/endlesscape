import type { Itinerary, TravelStyle, Testimonial, PressAward } from '../types/travel';

export const TRAVEL_STYLES: TravelStyle[] = [
  {
    id: 'family',
    title: 'FAMILY',
    subtitle: 'Wonders Crafted for All Generations',
    focus: 'Private villas, expert naturalists, unhurried pacing & engaging wilderness masterclasses.',
    image: '/assets/images/style-safari.jpg',
    destinations: ['India Royal Palaces', 'Dubai & Abu Dhabi', 'Singapore Theme Parks', 'Canada Rockies']
  },
  {
    id: 'couples',
    title: 'COUPLES',
    subtitle: 'Intimate Horizons & Secluded Luxury',
    focus: 'Clifftop infinity pools, candlelit ruins, secret Tuscan vineyards and starlit desert camps.',
    image: '/assets/images/hero-poster.jpg',
    destinations: ['Santorini Caldera', 'Amalfi Coast Villa', 'Swiss Alpine Chalets', 'Udaipur Lake Palace']
  },
  {
    id: 'groups',
    title: 'GROUPS',
    subtitle: 'Milestone Expeditions & Private Estates',
    focus: 'Whole-island buyouts, chartered classic schooners, private castles and bespoke chef celebrations.',
    image: '/assets/images/style-yacht.jpg',
    destinations: ['Rajasthan Heritage Havelis', 'Scottish Highlands Lodge', 'Spanish Country Estate']
  },
  {
    id: 'honeymoon',
    title: 'HONEYMOON',
    subtitle: 'Once-in-a-Lifetime Romance',
    focus: 'Barefoot luxury, private coral reef sandbanks, glacier helicopter flights & seamless pampering.',
    image: '/assets/images/style-honeymoon.jpg',
    destinations: ['Maldives Atolls', 'Seychelles Granite Islands', 'Kyoto Zen Sanctuary', 'Udaipur Lake Palace']
  },
  {
    id: 'solo',
    title: 'SOLO',
    subtitle: 'Untamed Freedom & Deep Immersion',
    focus: 'Transformative solo journeys, photography expeditions, wellness sanctuaries & safe, effortless ease.',
    image: '/assets/images/style-kyoto.jpg',
    destinations: ['Bhutan Monasteries', 'Iceland Aurora Ring Road', 'Bali Jungle Retreat', 'Ranthambore Tigers']
  }
];

export interface MonthGuide {
  id: string;
  month: string;
  destination: string;
  region: string;
  image: string;
  description: string;
}

export const MONTH_CALENDAR_DATA: MonthGuide[] = [
  {
    "id": "january",
    "month": "JANUARY",
    "destination": "DUBAI, MALDIVES & SOUTHEAST ASIA",
    "region": "africa",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
    "description": "Peak winter-sun in the Gulf and Southeast Asia, and pristine powder snow in Switzerland and Hokkaido."
  },
  {
    "id": "february",
    "month": "FEBRUARY",
    "destination": "MALDIVES & SEYCHELLES HONEYMOON",
    "region": "africa",
    "image": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85",
    "description": "Romantic overwater atolls and crystal coral lagoons; gentle climates across Egypt and the Gulf."
  },
  {
    "id": "march",
    "month": "MARCH",
    "destination": "JAPAN SAKURA, JORDAN & BHUTAN",
    "region": "asia",
    "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
    "description": "Early cherry blossoms unfurling in Tokyo and Kyoto, comfortable desert days in Petra, and clear Himalayan passes."
  },
  {
    "id": "april",
    "month": "APRIL",
    "destination": "JAPAN CHERRY BLOSSOMS & MEDITERRANEAN",
    "region": "mediterranean",
    "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
    "description": "Peak sakura in Kyoto, tulip blossoms in Europe, and mild spring across Italy, France, and Spain before summer crowds."
  },
  {
    "id": "may",
    "month": "MAY",
    "destination": "GREEK ISLANDS & SWISS ALPINE MEADOWS",
    "region": "mediterranean",
    "image": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
    "description": "Greek islands opening with azure seas, thundering Swiss waterfalls, and lush mountain vineyards in Georgia."
  },
  {
    "id": "june",
    "month": "JUNE",
    "destination": "ICELAND MIDNIGHT SUN & CANADIAN ROCKIES",
    "region": "polar",
    "image": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=85",
    "description": "Midnight sun across Iceland's volcanic fjords, thawing turquoise glacier lakes in Banff, and prime Europe summer days."
  },
  {
    "id": "july",
    "month": "JULY",
    "destination": "KENYA & TANZANIA GREAT MIGRATION",
    "region": "africa",
    "image": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85",
    "description": "The dramatic Mara River crossings in the Serengeti, alpine hiking in Zermatt, and Bali's dry sunny trade winds."
  },
  {
    "id": "august",
    "month": "AUGUST",
    "destination": "AEGEAN ISLAND HOPPING & EDINBURGH FESTIVALS",
    "region": "mediterranean",
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85",
    "description": "Vibrant Mediterranean beach life in Amalfi and Santorini, Scottish castle festivals, and peak safari in the Mara."
  },
  {
    "id": "september",
    "month": "SEPTEMBER",
    "destination": "ITALY, SPAIN & GEORGIAN WINE HARVEST",
    "region": "mediterranean",
    "image": "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=85",
    "description": "Warm Mediterranean waters with uncrowded beaches, grape harvest in Tuscany and Kakheti, and early Iceland auroras."
  },
  {
    "id": "october",
    "month": "OCTOBER",
    "destination": "JAPAN AUTUMN FOLIAGE & EGYPT'S PYRAMIDS",
    "region": "asia",
    "image": "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=85",
    "description": "Crimson maples in Kyoto, pleasant weather returning to Cairo and Luxor, and desert stargazing in Wadi Rum."
  },
  {
    "id": "november",
    "month": "NOVEMBER",
    "destination": "MALDIVES & THAILAND LANTERN FESTIVALS",
    "region": "asia",
    "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=85",
    "description": "Loy Krathong floating lanterns in Chiang Mai, peak Kyoto autumn colour, and opening winter-sun season in Dubai."
  },
  {
    "id": "december",
    "month": "DECEMBER",
    "destination": "CENTRAL EUROPE CHRISTMAS MARKETS & DUBAI",
    "region": "mediterranean",
    "image": "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=85",
    "description": "Gilded Christmas markets in Vienna and Prague, festive fireworks in Dubai, and summer sailing in New Zealand."
  }
];

export const ITINERARIES: Itinerary[] = [
  {
    "id": "india-royal-rajasthan-palaces",
    "nights": 8,
    "country": "INDIA",
    "region": "asia",
    "title": "INDIA: ROYAL RAJASTHAN, PALACE SUITES, BENGAL TIGERS & THAR DESERT",
    "tagline": "Private palace suites in Udaipur, dawn Bengal tiger safaris in Ranthambore, and starlit royal desert camps in Jaisalmer.",
    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "ROYAL EXPEDITION",
    "startingPrice": "\u00a35,800 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "October to March",
    "months": [
      "October",
      "November",
      "December",
      "January",
      "February",
      "March"
    ],
    "experienceTypes": [
      "Culture",
      "Safari",
      "Luxury",
      "History"
    ],
    "highlights": [
      "Private lake-facing palace suites at Taj Lake Palace Udaipur & Rambagh Palace Jaipur",
      "Twice-daily private game drives tracking Bengal tigers in Ranthambore National Park",
      "Private sunrise viewing of the Taj Mahal in Agra before public gates open",
      "Private royal dharohar boat cruise on Lake Pichola with champagne at dusk",
      "Luxury glamping in the dunes of Jaisalmer with candlelit royal Rajasthani banquet",
      "Private heritage walking tour with a royal historian through Jaipur Amber Fort"
    ],
    "description": "Eight majestic nights across the royal realms of Rajasthan and Agra. Wake in island palace suites floating upon Lake Pichola, track majestic Bengal tigers through the ancient stone ruins of Ranthambore, and witness the timeless marble glow of the Taj Mahal at first light.",
    "narrativeSections": [
      {
        "title": "The Floating Palaces of Mewar",
        "content": "Glide across still waters to floating marble palaces where royal attendants greet you with showerings of rose petals and heritage peacocks stroll through manicured courtyards."
      },
      {
        "title": "The Realm of the Tiger & The Golden Dunes",
        "content": "Traverse ancient deciduous forests where Bengal tigers prowl past overgrown 10th-century cenotaphs, then retreat to luxury tented camps beneath the clear starlit expanse of the Thar Desert."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Delhi Heritage & Dawn Taj Mahal Agra",
        "detail": "The Imperial New Delhi check-in, private chauffeur to Agra, and VIP sunrise tour of the Taj Mahal."
      },
      {
        "day": "Day 3-4",
        "title": "Ranthambore Royal Bengal Tiger Safaris",
        "detail": "Sujan Sher Bagh luxury tented camp, morning and evening private game drives, and fireside bush dinners."
      },
      {
        "day": "Day 5-6",
        "title": "Jaipur Pink City & Rambagh Palace",
        "detail": "Private royal historian tour of Amber Fort, private jewellery salon access, and Rambagh Palace peacock gardens."
      },
      {
        "day": "Day 7-8",
        "title": "Udaipur City of Lakes & Lake Palace",
        "detail": "Taj Lake Palace island arrival, Lake Pichola private champagne cruise, and royal Mewar farewell feast."
      }
    ]
  },
  {
    "id": "dubai-abu-dhabi-luxury",
    "nights": 5,
    "country": "UNITED ARAB EMIRATES",
    "region": "africa",
    "title": "DUBAI & ABU DHABI: SKYLINE SPLENDOUR & ARABIAN DESERT PALACES",
    "tagline": "Private yacht charters in Dubai Marina, starlit dunes at Al Maha, and private Louvre Abu Dhabi tours.",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "ARABIAN LUXURY",
    "startingPrice": "\u00a33,850 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "November to March",
    "months": [
      "November",
      "December",
      "January",
      "February",
      "March"
    ],
    "experienceTypes": [
      "Family",
      "Luxury",
      "Shopping",
      "Couples"
    ],
    "highlights": [
      "Burj Khalifa VIP private lounge access & Armani tasting menu",
      "Ultra-luxury private desert conservation safari with vintage Land Rovers",
      "Private yacht cruise gliding along Dubai Marina and Palm Jumeirah",
      "Sheikh Zayed Grand Mosque private architectural tour at twilight",
      "Overnight desert pool villa at Al Maha Luxury Collection Resort",
      "Helicopter flight transfer between Dubai and Yas Island Abu Dhabi"
    ],
    "description": "Five nights split between the glittering architectural wonders of Dubai and the majestic cultural pavilions of Abu Dhabi. Begin with private yacht excursions along the Palm, retreat to the serene red dunes in a temperature-controlled pool villa under desert stars, and marvel at the marble courtyards of the Sheikh Zayed Grand Mosque.",
    "narrativeSections": [
      {
        "title": "The Mirage of the Future",
        "content": "From the soaring glass monoliths of downtown Dubai to private sunset charters sailing beneath the Atlantis Royal, experience the world's most glamorous metropolis with effortless white-glove logistics."
      },
      {
        "title": "Dune Serenity & Royal Abu Dhabi",
        "content": "Transition from city heights to the ancient silence of the Arabian desert. Dine on artisanal Levantine cuisine beside glowing firepits, followed by privileged after-hours curator tours through the Louvre Abu Dhabi."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Downtown Dubai Glamour & Marina Yacht Charter",
        "detail": "Chauffeured Rolls-Royce transfer, Burj Khalifa VIP lounge, and private sunset yacht cruise."
      },
      {
        "day": "Day 3",
        "title": "Al Maha Desert Conservation Oasis",
        "detail": "Falconry at dawn, private camel trek across crimson dunes, and starlit fine dining."
      },
      {
        "day": "Day 4-5",
        "title": "Cultural Majesty in Abu Dhabi",
        "detail": "Sheikh Zayed Grand Mosque, Louvre Abu Dhabi private gallery access, and Emirates Palace relaxation."
      }
    ]
  },
  {
    "id": "thailand-islands-and-sanctuaries",
    "nights": 7,
    "country": "THAILAND",
    "region": "asia",
    "title": "THAILAND: EMERALD ISLANDS, ROYAL TEMPLES & PRIVATE SANCTUARIES",
    "tagline": "Private longtail boats through Phang Nga Bay, Michelin street-food tours in Bangkok, and clifftop pool villas in Phuket.",
    "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1512553353684-82a6abbc850a?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "ISLAND SANCTUARY",
    "startingPrice": "\u00a34,100 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "November to March",
    "months": [
      "November",
      "December",
      "January",
      "February",
      "March",
      "April"
    ],
    "experienceTypes": [
      "Couples",
      "Friends",
      "Honeymoon",
      "Wellness"
    ],
    "highlights": [
      "Private speedboat charter to secluded coves in Phi Phi & Phang Nga",
      "After-hours blessing at Bangkok's Wat Pho with a private cultural scholar",
      "Ethical elephant sanctuary immersion in the rainforest highlands",
      "Private beachfront pool villa stays at Trisara or Amanpuri",
      "Private chef cooking masterclass in an organic Chiang Mai or Krabi farm",
      "Chao Phraya River heritage dinner cruise aboard a restored teak rice barge"
    ],
    "description": "Seven days curated to showcase the refined soul of Thailand. From Bangkok's aromatic culinary scenes and gold-gilded stupas to the tranquil turquoise bays of Phuket and Krabi, enjoy barefoot luxury, traditional royal Thai healing, and private island hopping away from the tourist trails.",
    "narrativeSections": [
      {
        "title": "Rivers of Gold & Ancient Whispers",
        "content": "Navigate Bangkok's historic waterways on a vintage wooden boat, savouring street delicacies curated by top culinary guides before relaxing in your riverside suite at Capella."
      },
      {
        "title": "Andaman Seclusion",
        "content": "Drift through towering limestone karsts rising dramatically from emerald waters. Bask in secluded powder-sand bays accessible only by private charter, toast the sunset with chilled vintage champagne."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Bangkok Riverside & Grand Palaces",
        "detail": "Grand Palace private tour, hidden canal exploration, and Michelin street food expedition."
      },
      {
        "day": "Day 3-5",
        "title": "Phuket & Phang Nga Bay Seclusion",
        "detail": "Private catamaran around Phi Phi Islands, sea cave canoeing, and beachfront pool villa spa retreats."
      },
      {
        "day": "Day 6-7",
        "title": "Krabi Clifftop Serenity",
        "detail": "Sunset dining overlooking Railay cliffs, jungle hot springs, and serene farewell beach banquet."
      }
    ]
  },
  {
    "id": "singapore-futuristic-garden-city",
    "nights": 5,
    "country": "SINGAPORE",
    "region": "asia",
    "title": "SINGAPORE: FUTURISTIC BIOPHILIA & HERITAGE HIGH LIFE",
    "tagline": "Raffles Singapore colonial suites, private night safari encounters, and panoramic Marina Bay infinity vistas.",
    "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1506351421178-63788970e2b0?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "URBAN OASIS",
    "startingPrice": "\u00a33,950 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "February to July (Year-Round)",
    "months": [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    "experienceTypes": [
      "Family",
      "Kids",
      "Luxury",
      "Food"
    ],
    "highlights": [
      "Legendary heritage stay in the presidential suites at Raffles Singapore",
      "VIP backstage tour of Gardens by the Bay Cloud Forest & Flower Dome",
      "Exclusive private tram ride through Singapore Night Safari with a zoologist",
      "Private Peranakan culinary journey through Katong with a master chef",
      "VIP Universal Studios Sentosa passes with personal VIP guide",
      "Cocktails at sunset perched high above Marina Bay Sands SkyPark"
    ],
    "description": "Five exhilarating nights in the world's greenest metropolis. Seamlessly blending cutting-edge futuristic architecture with leafy rain-tree boulevards, Michelin-starred culinary artistry, and legendary five-star luxury.",
    "narrativeSections": [
      {
        "title": "A Garden Within a City",
        "content": "Stroll beneath towering supertrees glowing with symphonic night illuminations and explore glass bio-domes containing mountain mist waterfalls."
      },
      {
        "title": "Heritage & Gastronomy",
        "content": "Taste the cross-cultural melting pot of Singapore, from Michelin-starred hawker recipes to decadent afternoon teas inside Raffles' Grand Lobby."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Colonial Splendour & Marina Bay Icons",
        "detail": "Check-in at Raffles, Singapore Sling tasting, and private Cloud Forest mist walk."
      },
      {
        "day": "Day 3",
        "title": "Sentosa Island & VIP Theme Parks",
        "detail": "Private yacht cruise to Southern Islands, Sentosa beach club relaxation, and S.E.A. Aquarium."
      },
      {
        "day": "Day 4-5",
        "title": "Night Safari & Modern Gastronomy",
        "detail": "Peranakan cooking atelier, exclusive Night Safari animal encounters, and rooftop celebration dinner."
      }
    ]
  },
  {
    "id": "bali-spiritual-sanctuary",
    "nights": 7,
    "country": "INDONESIA",
    "region": "asia",
    "title": "BALI: SACRED JUNGLE RETREATS & CLIFFSIDE OCEAN VILLAS",
    "tagline": "Private water blessing ceremonies in Ubud, clifftop Uluwatu sunset villas, and sunrise volcanic vistas.",
    "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "SPIRITUAL WELLNESS",
    "startingPrice": "\u00a34,450 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "April to October",
    "months": [
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October"
    ],
    "experienceTypes": [
      "Honeymoon",
      "Couples",
      "Wellness",
      "Solo"
    ],
    "highlights": [
      "Private riverside pool villas suspended in Ubud's emerald valley canopy",
      "Traditional Melukat water purification with a revered Balinese High Priest",
      "Sunrise trek or 4x4 Land Rover safari across Mount Batur volcanic caldera",
      "Clifftop sunset dining overlooking crashing waves at Uluwatu",
      "Private yacht day excursion to the crystal waters and manta rays of Nusa Penida",
      "Holistic sound bath healing sessions at the Pyramids of Chi"
    ],
    "description": "Seven transformative nights in the Island of the Gods. Reconnect amidst terraced rice paddies, ancient banyan trees, sacred water temples, and the serene warmth of clifftop oceanfront pavilions.",
    "narrativeSections": [
      {
        "title": "The Cultural Heart of Ubud",
        "content": "Wake to morning mist curling over the Ayung River. Experience holistic Ayurvedic spas, organic farm gastronomy, and private encounters with master artisans."
      },
      {
        "title": "Uluwatu Clifftop Drama",
        "content": "Perched hundreds of feet above the Indian Ocean, watch the fiery sun dip below the horizon as the hypnotic Kecak fire dance echoes beneath the open sky."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-3",
        "title": "Ubud Rainforest Sanctuary",
        "detail": "Tegallalang rice terrace morning walk, sacred temple blessing, and Mandapa spa healing."
      },
      {
        "day": "Day 4",
        "title": "Mount Batur Caldera & Organic Coffee",
        "detail": "Jeep sunrise expedition, natural mineral hot springs, and artisanal cacao tastings."
      },
      {
        "day": "Day 5-7",
        "title": "Uluwatu & Ocean Clifftops",
        "detail": "Private pool villa check-in, Nusa Penida yacht excursion, and romantic clifftop candlelight dinner."
      }
    ]
  },
  {
    "id": "vietnam-dragon-bays-heritage",
    "nights": 8,
    "country": "VIETNAM",
    "region": "asia",
    "title": "VIETNAM: DRAGON BAYS, ANCIENT DYNASTIES & COASTAL SERENITY",
    "tagline": "Private junk cruising in Lan Ha Bay, lantern-lit alleys in Hoi An, and imperial culinary masterclasses in Hanoi.",
    "image": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "HERITAGE ODYSSEY",
    "startingPrice": "\u00a34,750 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "November to April",
    "months": [
      "November",
      "December",
      "January",
      "February",
      "March",
      "April"
    ],
    "experienceTypes": [
      "Culture",
      "Couples",
      "Food",
      "Adventure"
    ],
    "highlights": [
      "Overnight luxury catamaran charter through untouched Lan Ha & Ha Long Bay",
      "Stay in the historic French colonial suites of Sofitel Legend Metropole Hanoi",
      "Evening lantern boat ride through the UNESCO silk merchant town of Hoi An",
      "Early morning private access to the Golden Bridge at Ba Na Hills",
      "Seaplane scenic flight soaring over karst limestone towers",
      "Gourmet street food crawl curated by a leading Vietnamese food historian"
    ],
    "description": "Eight nights exploring the poetry and resilience of Vietnam. Glide through emerald labyrinthine sea karsts, meander through golden-hued ancient streets lit by silk lanterns, and indulge in world-class coastal wellness.",
    "narrativeSections": [
      {
        "title": "French Colonial Poise in Hanoi",
        "content": "Sip egg coffee overlooking tree-lined boulevards and discover hidden courtyards where age-old artisans still practice lacquerware and woodblock printing."
      },
      {
        "title": "Legends of Ha Long & Coastal Hoi An",
        "content": "Wake on still waters enveloped in limestone mist, before flying south to the sun-soaked sands and tailor shops of coastal Hoi An."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Hanoi Old Quarter & Culinary Secrets",
        "detail": "Metropole Hanoi check-in, private cyclo tour, and hidden temple visits."
      },
      {
        "day": "Day 3-4",
        "title": "Lan Ha Bay Private Cruise",
        "detail": "Seaplane transfer, kayaking into secluded lagoons, squid fishing at twilight."
      },
      {
        "day": "Day 5-8",
        "title": "Hoi An Lanterns & Danang Riviera",
        "detail": "Golden Bridge dawn photography, private cooking school, and coastal villa relaxation."
      }
    ]
  },
  {
    "id": "malaysia-rainforest-and-islands",
    "nights": 6,
    "country": "MALAYSIA",
    "region": "asia",
    "title": "MALAYSIA: EMERALD CANOPIES, HERITAGE FOOD & LANGKAWI LUXURY",
    "tagline": "The Datai Langkawi ancient rainforest stays, private Penang street-food trails, and Kuala Lumpur skyline vistas.",
    "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "TROPICAL WILDERNESS",
    "startingPrice": "\u00a33,900 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "December to March",
    "months": [
      "December",
      "January",
      "February",
      "March",
      "April"
    ],
    "experienceTypes": [
      "Family",
      "Food",
      "Scenic",
      "Couples"
    ],
    "highlights": [
      "Ancient rainforest pool villas at The Datai Langkawi with naturalist walks",
      "Private cable car & VIP access to Langkawi Sky Bridge above misted peaks",
      "Private Michelin heritage street food walking tour in George Town, Penang",
      "VIP access to Petronas Towers Skybridge and Batu Caves limestone temples",
      "Private sunset mangrove boat safari spotting white-bellied sea eagles",
      "Helicopter transfer from Kuala Lumpur to Cameron Highlands tea estates"
    ],
    "description": "Six days bridging the cosmopolitan pulse of Kuala Lumpur with the prehistoric 10-million-year-old virgin rainforest and turquoise Andaman bays of Langkawi.",
    "narrativeSections": [
      {
        "title": "The Heights of Kuala Lumpur",
        "content": "Gaze over neon horizons from premier high-rise suites, pairing world-class dining with quiet morning walks through lush botanical parks."
      },
      {
        "title": "Primeval Langkawi Sanctuary",
        "content": "Immerse in nature where hornbills glide overhead and dolphins dance in private coves, wrapped in five-star barefoot eco-luxury."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Kuala Lumpur Skyline & Heritage",
        "detail": "Petronas Towers VIP skybridge, Batu Caves private guide, and Chinatown secret bars."
      },
      {
        "day": "Day 3-4",
        "title": "Penang Culinary & Colonial Art",
        "detail": "Heritage shophouse stay, Peranakan mansion dinner, and street art discovery."
      },
      {
        "day": "Day 5-6",
        "title": "The Datai Langkawi Seclusion",
        "detail": "Rainforest naturalist walk, private Andaman yacht cruise, and farewell beach feast."
      }
    ]
  },
  {
    "id": "maldives-barefoot-luxury-atolls",
    "nights": 5,
    "country": "MALDIVES",
    "region": "asia",
    "title": "MALDIVES: OVERWATER RESIDENCES & AZURE ATOLL SANCTUARY",
    "tagline": "Private seaplane transfers, sandbank candlelit dinners under the stars, and vibrant manta ray reef diving.",
    "image": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "BAREFOOT LUXURY",
    "startingPrice": "\u00a36,200 per person",
    "priceNote": "excl. flights (all-inclusive luxury villa)",
    "bestSeason": "November to April",
    "months": [
      "November",
      "December",
      "January",
      "February",
      "March",
      "April"
    ],
    "experienceTypes": [
      "Honeymoon",
      "Luxury",
      "Couples",
      "Wellness"
    ],
    "highlights": [
      "Overwater sunset villa with glass floor viewing and private infinity pool",
      "Private seaplane charter with panoramic aerial photography over coral atolls",
      "Castaway sandbank dinner illuminated exclusively by 100 lanterns",
      "Guided snorkelling with marine biologists alongside whale sharks & mantas",
      "Underwater wine cellar masterclass and six-course degustation",
      "Daily Ayurvedic and organic marine therapies in an overwater spa suite"
    ],
    "description": "Five celestial nights on pristine private coral atolls. Slip directly from your private sun deck into crystal lagoons, indulge in world-renowned spa therapies, and surrender to uninterrupted horizon views.",
    "narrativeSections": [
      {
        "title": "The Overwater Dream",
        "content": "Suspended above tranquil turquoise waters, where every breeze carries tropical calm and personal butlers cater to every spontaneous whim."
      },
      {
        "title": "Coral Ocean Rhythms",
        "content": "Snorkel among flourishing coral gardens teeming with sea turtles and gentle reef sharks, followed by vintage champagne on a secluded desert sandbar."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1",
        "title": "Bespoke Seaplane Arrival",
        "detail": "Scenic aerial flight to Baa Atoll, champagne check-in, and sunset dolphin cruise."
      },
      {
        "day": "Day 2-3",
        "title": "Marine Bio Expedition & Overwater Spa",
        "detail": "Manta ray lagoon safari, private coral adoption, and restorative deep-sea massages."
      },
      {
        "day": "Day 4-5",
        "title": "Lantern Castaway Sandbank & Stargazing",
        "detail": "Exclusive private island picnic, underwater observatory dining, and astronomy cruise."
      }
    ]
  },
  {
    "id": "japan-sakura-zen-and-shinkansen",
    "nights": 9,
    "country": "JAPAN",
    "region": "asia",
    "title": "JAPAN: SAKURA BLOSSOMS, KYOTO ZEN & PRIVATE RYOKAN ONSENS",
    "tagline": "Private tea ceremonies in Kyoto, bullet train first-class journeys, and private onsen hot springs facing Mount Fuji.",
    "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "CULTURAL MASTERY",
    "startingPrice": "\u00a37,850 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "Late March to May | October to November",
    "months": [
      "March",
      "April",
      "May",
      "October",
      "November"
    ],
    "experienceTypes": [
      "Culture",
      "Couples",
      "Food",
      "Scenic"
    ],
    "highlights": [
      "Private morning access to Fushimi Inari and Kyoto's bamboo groves",
      "Traditional centuries-old Ryokan stay with private cedar hot spring onsen",
      "Private audience and matcha tea ceremony with a Kyoto Geiko master",
      "Helicopter flight offering dramatic close-up panoramas of Mount Fuji",
      "Gran Class bullet train journeys between Tokyo, Kyoto, and Kanazawa",
      "Exclusive multi-course kaiseki dining curated by three-star Michelin chefs"
    ],
    "description": "Nine transcendent nights traversing Japan's ancient soul and neon-lit tomorrow. Revel in cherry blossom season, private Zen meditation, cedar forest shrines, and exquisite culinary precision.",
    "narrativeSections": [
      {
        "title": "The Neon & Cybernetic Pulse of Tokyo",
        "content": "Explore futuristic digital art pavilions, secret cocktail laboratories in Ginza, and traditional sumo stables with a cultural insider."
      },
      {
        "title": "Kyoto's Gilded Tranquillity",
        "content": "Wander through stone gardens raked in meditative harmony, wooden teahouses in Gion, and cedar-clad mountain baths under autumn maples."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-3",
        "title": "Tokyo Future & Imperial Heart",
        "detail": "Aman Tokyo check-in, Tsukiji private chef breakfast, teamLab VIP access, and Ginza fine dining."
      },
      {
        "day": "Day 4",
        "title": "Mount Fuji & Hakone Ryokan",
        "detail": "Scenic helicopter transfer, private hot-spring onsen bath, and 12-course kaiseki banquet."
      },
      {
        "day": "Day 5-7",
        "title": "Kyoto Shrines & Geisha Heritage",
        "detail": "Bullet train Gran Class, private temple garden meditation, and Gion evening tea ceremony."
      },
      {
        "day": "Day 8-9",
        "title": "Osaka Gastronomy & Departure",
        "detail": "Street food masterclass in Dotonbori, artisanal knife-making atelier, and VIP airport lounge."
      }
    ]
  },
  {
    "id": "switzerland-grand-alpine-majesty",
    "nights": 7,
    "country": "SWITZERLAND",
    "region": "mediterranean",
    "title": "SWITZERLAND: FIRST-CLASS ALPINE EXPRESSES & MATTERHORN CHALETS",
    "tagline": "Glacier Express Excellence Class, private Matterhorn helicopter tours, and five-star lakeside palaces.",
    "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "ALPINE PRESTIGE",
    "startingPrice": "\u00a36,900 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "June to September (Hiking) | Dec to Feb (Snow)",
    "months": [
      "January",
      "February",
      "June",
      "July",
      "August",
      "September",
      "December"
    ],
    "experienceTypes": [
      "Honeymoon",
      "Family",
      "Scenic",
      "Luxury"
    ],
    "highlights": [
      "Glacier Express Excellence Class with 7-course pairing menu through snowy gorges",
      "Private helicopter flight landing atop Aletsch Glacier for vintage champagne",
      "Five-star palace stays at B\u00fcrgenstock Resort overlooking Lake Lucerne",
      "VIP Jungfraujoch Top of Europe private railway journey and ice palace",
      "Private horse-drawn sleigh or vintage carriage tour through car-free Zermatt",
      "Swiss chocolate and cheese masterclass in a historic Bernese farmhouse"
    ],
    "description": "Seven days of pure alpine grandeur. Journey aboard legendary panoramic trains, stay in historic clifftop chalets, and gaze upon the majestic silhouette of the Matterhorn reflected in glass-calm mountain lakes.",
    "narrativeSections": [
      {
        "title": "The Glass Horizons of the Alps",
        "content": "Travel on the Glacier Express Excellence Class through spiralling viaducts and snowy valleys, with personal concierge service and five-star Swiss culinary elegance."
      },
      {
        "title": "Zermatt & Mountain Royalty",
        "content": "Wake to sunrise turning the peak of the Matterhorn to pure gold from your private balcony fireplace suite in Zermatt."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Lake Lucerne & Mount Titlis",
        "detail": "B\u00fcrgenstock clifftop check-in, private lake yacht cruise, and Titlis Rotair revolving gondola."
      },
      {
        "day": "Day 3-4",
        "title": "Interlaken & Jungfraujoch",
        "detail": "Scenic train over Br\u00fcnig Pass, private guide to Jungfraujoch, and glacier walk."
      },
      {
        "day": "Day 5-7",
        "title": "Glacier Express to Zermatt & Matterhorn",
        "detail": "Excellence Class railway journey, Gornergrat scenic ridge, and helicopter glacier landing."
      }
    ]
  },
  {
    "id": "france-paris-haute-couture-and-riviera",
    "nights": 7,
    "country": "FRANCE",
    "region": "mediterranean",
    "title": "FRANCE: PARISIAN PALACES & FRENCH RIVIERA AZURE DREAMS",
    "tagline": "Private after-hours Louvre access, Eiffel Tower champagne suites, and private yachts along C\u00f4te d'Azur.",
    "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "HAUTE COUTURE",
    "startingPrice": "\u00a36,400 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "April to June | September to October",
    "months": [
      "April",
      "May",
      "June",
      "September",
      "October"
    ],
    "experienceTypes": [
      "Couples",
      "Culture",
      "Luxury",
      "Food"
    ],
    "highlights": [
      "Private after-hours curator tour of the Louvre & Mona Lisa without crowds",
      "Suites at H\u00f4tel de Crillon overlooking Place de la Concorde",
      "Private salon shopping appointment with champagne on Rue du Faubourg Saint-Honor\u00e9",
      "Private yacht charter cruising from Cannes to Monaco and Saint-Tropez",
      "Exclusive access to the King's Private Apartments at the Palace of Versailles",
      "Bespoke perfume creation workshop at a historic maison in Grasse"
    ],
    "description": "Seven days immersed in the epitome of French refinement. From grand Parisian boulevards and Michelin three-star culinary dining to the sun-drenched coastal glamour of Nice, Cannes, and Monaco.",
    "narrativeSections": [
      {
        "title": "The City of Light",
        "content": "Stroll cobblestone lanes of Saint-Germain, enjoy private evening Seine cruises, and explore legendary art collections undisturbed by crowds."
      },
      {
        "title": "Riviera Glamour",
        "content": "Sip ros\u00e9 on clifftop terraces in \u00c8ze, charter a Riva boat along turquoise Cap d'Antibes, and live the golden age of Mediterranean leisure."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-3",
        "title": "Parisian Splendour & Private Louvre",
        "detail": "Crillon check-in, after-hours Louvre tour, Seine dinner cruise, and private Versailles day."
      },
      {
        "day": "Day 4",
        "title": "TGV First Class to the C\u00f4te d'Azur",
        "detail": "Journey to Nice/Cannes, check-in at Hotel du Cap-Eden-Roc, and seaside sunset cocktails."
      },
      {
        "day": "Day 5-7",
        "title": "Riviera Yachting & Monaco Evenings",
        "detail": "Private yacht to Saint-Tropez coves, Grasse perfume atelier, and Monaco casino glamour."
      }
    ]
  },
  {
    "id": "italy-la-dolce-vita-amalfi-tuscany",
    "nights": 8,
    "country": "ITALY",
    "region": "mediterranean",
    "title": "ITALY: ROMAN PALAZZOS, TUSCAN VINEYARDS & AMALFI CLIFFS",
    "tagline": "Private Colosseum underground tours, vintage Ferrari drives through Chianti, and Positano clifftop villas.",
    "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "LA DOLCE VITA",
    "startingPrice": "\u00a36,750 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "April to June | September to October",
    "months": [
      "April",
      "May",
      "June",
      "September",
      "October"
    ],
    "experienceTypes": [
      "Culture",
      "Couples",
      "Food",
      "Honeymoon"
    ],
    "highlights": [
      "VIP underground access to Rome's Colosseum and Sistine Chapel private viewing",
      "Private Riva speed boat charter navigating Positano, Amalfi & Capri sea grottos",
      "Private Tuscan wine estate buyout with Brunello di Montalcino vintage tastings",
      "Stay at Le Sirenuse Positano with private balcony facing the cascading village",
      "Private gondola serenade through secluded Venice back canals at sunset",
      "Truffle hunting expedition in the rolling hills of San Miniato with master dogs"
    ],
    "description": "Eight enchanting nights discovering the timeless romance of Italy. Taste handcrafted pastas, savour vintage wines among olive groves, and unwind on clifftop terraces over the shimmering Tyrrhenian Sea.",
    "narrativeSections": [
      {
        "title": "The Imperial Footsteps of Rome",
        "content": "Unlock the secrets of antiquity with private historians, dining in candlelit piazzas beside the Pantheon as street violins serenade the evening."
      },
      {
        "title": "Sunlit Amalfi & Tuscan Rolling Hills",
        "content": "Wind along dramatic coastal cliffs with lemon groves perfuming the sea breeze, before retreating into centuries-old renaissance villas."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Rome Antiquities & Vatican Keys",
        "detail": "Hotel de Russie check-in, private Colosseum floor tour, and twilight piazza gelato walk."
      },
      {
        "day": "Day 3-4",
        "title": "Tuscan Vineyards & Florence Renaissance",
        "detail": "Private vintage car drive, Brunello wine cellar lunch, and Uffizi Gallery masterclass."
      },
      {
        "day": "Day 5-8",
        "title": "Positano, Capri & Amalfi Coast Dream",
        "detail": "Le Sirenuse check-in, private boat to Capri Blue Grotto, and Ravello clifftop concert."
      }
    ]
  },
  {
    "id": "spain-andalusia-and-barcelona-art",
    "nights": 7,
    "country": "SPAIN",
    "region": "mediterranean",
    "title": "SPAIN: GAUD\u00cd MASTERPIECES, ANDALUSIAN FLAMENCO & IBIZA SUN",
    "tagline": "Private rooftop access to Sagrada Fam\u00edlia, private Alhambra palaces, and Michelin tapas crawls in Seville.",
    "image": "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "VIBRANT IBERIA",
    "startingPrice": "\u00a35,200 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "April to June | September to October",
    "months": [
      "April",
      "May",
      "June",
      "September",
      "October"
    ],
    "experienceTypes": [
      "Friends",
      "Culture",
      "Food",
      "Couples"
    ],
    "highlights": [
      "Private architectural tour of Sagrada Fam\u00edlia and Casa Batll\u00f3 at opening light",
      "After-hours private access to the Moorish courtyards of the Alhambra Palace",
      "VIP flamenco performance inside a private historic 16th-century Sevillan palace",
      "Michelin tapas and Rioja wine crawl led by a celebrated Spanish sommelier",
      "Private yacht sail along Barcelona's coastline to the vineyards of Alella",
      "Stay in the Royal Suite at Hotel Arts Barcelona or Mandarin Oriental Ritz Madrid"
    ],
    "description": "Seven spirited nights across Spain's most captivating corners. From Gaud\u00ed's whimsical stone dreams to the passionate rhythm of flamenco in Andalusia and sun-drenched Mediterranean tapas bars.",
    "narrativeSections": [
      {
        "title": "Gaud\u00ed & Mediterranean Spirit",
        "content": "Witness the stained-glass kaleidoscope of Sagrada Fam\u00edlia before dining on fresh seafood paella on the golden Barceloneta beachfront."
      },
      {
        "title": "Moorish Splendour & Passion",
        "content": "Wander the fragrant orange groves and intricate stucco arches of Granada and Seville, swept up by the fiery emotion of authentic Spanish guitar."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-3",
        "title": "Barcelona Modernism & Gothic Secrets",
        "detail": "Private Sagrada Fam\u00edlia access, Park G\u00fcell sunrise, and sunset yacht sail."
      },
      {
        "day": "Day 4-5",
        "title": "Royal Madrid & Art Triangle",
        "detail": "Prado Museum curator tour, tapas hopping in La Latina, and El Retiro private rowboat."
      },
      {
        "day": "Day 6-7",
        "title": "Seville & Granada Moorish Palaces",
        "detail": "Alhambra private entry, private flamenco performance, and rooftop farewell sangria."
      }
    ]
  },
  {
    "id": "greece-santorini-caldera-and-aegean",
    "nights": 7,
    "country": "GREECE",
    "region": "mediterranean",
    "title": "GREECE: SANTORINI CALDERA SUITES, MYKONOS & ANCIENT ATHENS",
    "tagline": "Private caldera cave villas, private sunset catamarans in Oia, and VIP sunrise tours of the Acropolis.",
    "image": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "AEGEAN ELYSIUM",
    "startingPrice": "\u00a35,950 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "May to June | September to October",
    "months": [
      "May",
      "June",
      "July",
      "August",
      "September",
      "October"
    ],
    "experienceTypes": [
      "Honeymoon",
      "Couples",
      "Luxury",
      "Scenic"
    ],
    "highlights": [
      "Private cliffside cave pool suite with panoramic caldera views in Oia, Santorini",
      "Private luxury catamaran sunset cruise with grilled Aegean seafood & volcanic springs",
      "VIP private sunrise tour of the Parthenon & Acropolis before public entry",
      "Helicopter island transfer flying over the sapphire Cycladic archipelago",
      "Private wine tasting of rare Assyrtiko grapes in an ancient volcanic subterranean cellar",
      "Secluded beach cabana days and chic sunset beach clubs in Mykonos"
    ],
    "description": "Seven idyllic nights floating between cobalt seas and whitewashed clifftops. Watch the world's most romantic sunset from your private plunge pool and discover the mythology that shaped civilization.",
    "narrativeSections": [
      {
        "title": "The Golden Caldera of Santorini",
        "content": "Carved into sheer volcanic rock, Santorini offers the ultimate stage for romance, with azure domes, bougainvillea cascades, and silent starry nights."
      },
      {
        "title": "Chic Mykonos & Mythic Athens",
        "content": "From the windswept 16th-century windmills to the cradle of democracy at the Acropolis, experience Greece in effortless, ultra-curated comfort."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Athens Classical Heritage",
        "detail": "Grand Bretagne stay, private Acropolis sunrise access, and Plaka gourmet tavern dinner."
      },
      {
        "day": "Day 3-5",
        "title": "Santorini Caldera Romance",
        "detail": "Helicopter transfer, cave pool suite check-in, private volcanic wine tour, and sunset catamaran."
      },
      {
        "day": "Day 6-7",
        "title": "Mykonos Beach Clubs & Little Venice",
        "detail": "Private boat to Delos sacred ruins, seaside cocktails at Little Venice, and farewell seafood feast."
      }
    ]
  },
  {
    "id": "turkey-bosphorus-and-cappadocia-balloons",
    "nights": 7,
    "country": "TURKEY",
    "region": "mediterranean",
    "title": "TURKEY: HOT AIR BALLOONS OF CAPPADOCIA & BOSPHORUS PALACES",
    "tagline": "Private hot air balloon flight at sunrise, Ciragan Palace Ottoman suites, and luxury gulet cruising.",
    "image": "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "OTTOMAN OPULENCE",
    "startingPrice": "\u00a34,600 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "April to June | September to October",
    "months": [
      "April",
      "May",
      "June",
      "September",
      "October"
    ],
    "experienceTypes": [
      "Couples",
      "Culture",
      "Photography",
      "Value"
    ],
    "highlights": [
      "Private sunrise hot-air balloon flight over the fairy chimneys of Cappadocia",
      "Stay in a converted 5th-century cave suite with private heated pool in Cappadocia",
      "Private luxury yacht cruise along the Bosphorus dividing Europe and Asia",
      "After-hours curator visit to Hagia Sophia, Blue Mosque & Topkapi Palace",
      "Private historic Turkish bath (hammam) ritual in a 16th-century marble palace",
      "Helicopter excursion over the thermal travertine cascades of Pamukkale"
    ],
    "description": "Seven days spanning two continents. Glide over honeycombed valleys in a private balloon basket at dawn, sleep in cave suites sculpted from volcanic stone, and dine in Ottoman waterfront palaces.",
    "narrativeSections": [
      {
        "title": "The Fairy Chimneys of Cappadocia",
        "content": "Float gently above lunar valleys as hundreds of colourful balloons drift through morning mist, followed by a champagne breakfast nestled among ancient cave dwellings."
      },
      {
        "title": "Istanbul: Crossroads of Empires",
        "content": "Inhale the scents of saffron and cardamom in the Grand Bazaar, explore subterranean Roman cisterns, and toast the sunset sailing between two continents."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-3",
        "title": "Istanbul Imperial Heritage",
        "detail": "Ciragan Palace Kempinski stay, private Bosphorus yacht, Hagia Sophia & Grand Bazaar."
      },
      {
        "day": "Day 4-6",
        "title": "Cappadocia Fairy Chimneys & Cave Suite",
        "detail": "Museum Hotel cave villa, sunrise hot air balloon flight, and underground cities."
      },
      {
        "day": "Day 7",
        "title": "Antalya Coast & Farewell",
        "detail": "Mediterranean turquoise bay cruise, ancient Roman ruins of Perge, and seaside dinner."
      }
    ]
  },
  {
    "id": "united-kingdom-royal-heritage-highlands",
    "nights": 7,
    "country": "UNITED KINGDOM",
    "region": "mediterranean",
    "title": "UNITED KINGDOM: ROYAL LONDON, COTSWOLDS ESTATES & SCOTTISH HIGHLANDS",
    "tagline": "Private Tower of London Ceremony of the Keys, luxury helicopter to Gleneagles, and private Loch Ness castle stays.",
    "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "ROYAL ESTATES",
    "startingPrice": "\u00a36,100 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "May to September",
    "months": [
      "May",
      "June",
      "July",
      "August",
      "September"
    ],
    "experienceTypes": [
      "Family",
      "Culture",
      "Friends",
      "Luxury"
    ],
    "highlights": [
      "Private after-hours viewing of the Crown Jewels at the Tower of London",
      "Luxury stay at The Connaught or The Savoy with personal royal butler service",
      "Private chauffeur drive through thatched stone villages of the Cotswolds",
      "Royal Scotsman luxury sleeper train voyage winding through misty Highlands",
      "Exclusive single malt whisky tasting in the cellars of a private Scottish castle",
      "VIP backstage West End theatre evening and private dinner with leading actors"
    ],
    "description": "Seven days celebrating the aristocratic history and dramatic landscapes of Britain. From royal ceremonies in London to honey-stone Cotswolds estates and heather-clad Scottish lochs.",
    "narrativeSections": [
      {
        "title": "London Pageantry & High Society",
        "content": "Experience London with unprecedented access, from private morning art collections to iconic British afternoon tea and private Mayfair dining clubs."
      },
      {
        "title": "The Wild Romantic Highlands",
        "content": "Board the Royal Scotsman through pine-scented glens, sip aged single malts by roaring castle fireplaces, and cruise deep highland lochs."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-3",
        "title": "Royal London & West End Glitz",
        "detail": "The Connaught check-in, private Crown Jewels tour, Thames riverboat, and West End VIP seats."
      },
      {
        "day": "Day 4",
        "title": "Cotswolds Manor Gardens",
        "detail": "Private chauffeured tour through Castle Combe and Bourton-on-the-Water with private farm lunch."
      },
      {
        "day": "Day 5-7",
        "title": "Edinburgh Castle & Scottish Highlands",
        "detail": "Royal Scotsman train ride, private Edinburgh Castle after-hours tour, and Loch Ness cruise."
      }
    ]
  },
  {
    "id": "central-europe-imperial-danube-trio",
    "nights": 8,
    "country": "AUSTRIA, CZECHIA & HUNGARY",
    "region": "mediterranean",
    "title": "CENTRAL EUROPE: IMPERIAL VIENNA, PRAGUE CASTLES & BUDAPEST THERMAL SPAS",
    "tagline": "Private Mozart concerts in Viennese palaces, private Charles Bridge sunrise, and private Danube evening yachts.",
    "image": "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "IMPERIAL CAPITALS",
    "startingPrice": "\u00a35,400 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "May to September | December for Christmas Markets",
    "months": [
      "May",
      "June",
      "July",
      "August",
      "September",
      "December"
    ],
    "experienceTypes": [
      "Culture",
      "Couples",
      "Value",
      "Music"
    ],
    "highlights": [
      "Private classical concert inside the gilded ballroom of Sch\u00f6nbrunn Palace Vienna",
      "Sunrise private walking tour of Prague's Charles Bridge and Prague Castle",
      "Private illuminated Danube River champagne yacht passing Budapest Parliament",
      "Exclusive private thermal bath session inside Budapest's historic Gell\u00e9rt baths",
      "Day trip by private Mercedes to the fairy-tale lakeside village of Hallstatt",
      "Private wine tasting in the UNESCO-listed Wachau Valley terraced vineyards"
    ],
    "description": "Eight nights immersed in the musical, architectural, and culinary legacy of the Habsburg Empire. Marvel at fairy-tale spires, grand opera houses, and thermal mineral springs along the majestic blue Danube.",
    "narrativeSections": [
      {
        "title": "The Golden Spires of Prague",
        "content": "Wander quiet cobblestone lanes lined with Baroque palaces, crossing the Vltava river wrapped in morning mist without crowds."
      },
      {
        "title": "Viennese Elegance & Budapest Nights",
        "content": "Savour Sachertorte in velvet-lined coffeehouses and glide past illuminated parliament facades reflecting like liquid gold in the Danube."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-3",
        "title": "Prague Gothic Fairy Tale",
        "detail": "Four Seasons Prague check-in, Charles Bridge sunrise, and private Old Town astronomical clock tour."
      },
      {
        "day": "Day 4-5",
        "title": "Imperial Vienna & Classical Arts",
        "detail": "First-class train to Vienna, Sch\u00f6nbrunn Palace private rooms, and State Opera evening."
      },
      {
        "day": "Day 6-8",
        "title": "Budapest Danube Romance",
        "detail": "Private Danube yacht, historic thermal bath buyout, and Fisherman's Bastion sunset."
      }
    ]
  },
  {
    "id": "iceland-aurora-and-glacial-wonders",
    "nights": 6,
    "country": "ICELAND",
    "region": "polar",
    "title": "ICELAND: AURORA BOREALIS, GLACIER ICE CAVES & BLUE LAGOON RETREATS",
    "tagline": "Private super-jeep aurora hunting, private glacier ice cave exploration, and The Retreat at Blue Lagoon.",
    "image": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "POLAR WONDER",
    "startingPrice": "\u00a36,800 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "June to August (Midnight Sun) | Sep to Mar (Northern Lights)",
    "months": [
      "January",
      "February",
      "March",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    "experienceTypes": [
      "Adventure",
      "Couples",
      "Photography",
      "Scenic"
    ],
    "highlights": [
      "Exclusive stay at The Retreat at Blue Lagoon with private subterranean geothermal waters",
      "Private super-jeep expedition with an astronomer chasing the Northern Lights",
      "Helicopter flight landing on volcanic peaks and active geothermal fumaroles",
      "Private guided hike into natural sapphire-blue crystal ice caves beneath Vatnaj\u00f6kull",
      "Zodiac boat tour among floating icebergs at J\u00f6kuls\u00e1rl\u00f3n Glacier Lagoon",
      "Private luxury snowmobile safari across the vast Langj\u00f6kull ice cap"
    ],
    "description": "Six elemental nights across Iceland's volcanic moonscapes. Soak in steaming geothermal lagoons surrounded by black lava fields, walk inside crystalline ice caverns, and watch dancing green auroras paint the arctic night sky.",
    "narrativeSections": [
      {
        "title": "Fire & Geothermal Healing",
        "content": "Float weightlessly in mineral-rich milky turquoise waters, followed by in-water silica massage treatments and Michelin-recommended Nordic cuisine."
      },
      {
        "title": "The Cosmic Dance of the Aurora",
        "content": "Travel deep into the remote wilderness in custom super-jeeps away from all light pollution, watching the Northern Lights swirl across glittering glacial horizons."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "The Retreat at Blue Lagoon",
        "detail": "VIP private lagoon check-in, in-water massage, and gourmet Lava restaurant dining."
      },
      {
        "day": "Day 3-4",
        "title": "Golden Circle & Langj\u00f6kull Snowmobile",
        "detail": "Thingvellir rift valley, Gullfoss waterfall, Geysir eruptions, and glacier snowmobiling."
      },
      {
        "day": "Day 5-6",
        "title": "South Coast Waterfalls & Ice Caves",
        "detail": "Seljalandsfoss, Reynisfjara black sand beach, crystal ice cave, and private aurora hunt."
      }
    ]
  },
  {
    "id": "usa-grand-canyon-and-coastal-icons",
    "nights": 10,
    "country": "UNITED STATES",
    "region": "latin",
    "title": "USA: MANHATTAN HIGH LIFE, LAS VEGAS & GRAND CANYON HELICOPTERS",
    "tagline": "Private penthouse stays in New York, VIP helicopter descent into the Grand Canyon, and California coastal drives.",
    "image": "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "COAST TO COAST",
    "startingPrice": "\u00a37,200 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "April to June | September to October",
    "months": [
      "April",
      "May",
      "June",
      "September",
      "October"
    ],
    "experienceTypes": [
      "Family",
      "Friends",
      "Luxury",
      "Shopping"
    ],
    "highlights": [
      "Private helicopter charter landing on the Grand Canyon floor for champagne lunch",
      "Penthouse suites overlooking Central Park at The Plaza or Aman New York",
      "VIP backstage Broadway access and private meet-and-greet with cast leads",
      "VIP Universal Studios Hollywood & Disneyland private VIP tour guide",
      "Private sunset catamaran sail beneath San Francisco's Golden Gate Bridge",
      "Encore Las Vegas Tower Suites with front-row Cirque du Soleil seating"
    ],
    "description": "Ten iconic nights bridging the electric buzz of Manhattan, the spectacle of the Las Vegas strip, the timeless majesty of the Grand Canyon, and the sun-soaked Pacific coast.",
    "narrativeSections": [
      {
        "title": "The Empire State of Mind",
        "content": "Walk high above city streets, shop private designer showrooms on Fifth Avenue, and take in the glowing skyline from rooftop terraces."
      },
      {
        "title": "Desert Wonder & West Coast Horizons",
        "content": "Fly over the red rock monuments of Arizona, marvel at the vast geological abyss of the Grand Canyon, and cruise the golden beaches of California."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-4",
        "title": "New York City Culture & Penthouse Heights",
        "detail": "Aman NY check-in, Central Park private carriage, Broadway VIP, and Statue of Liberty helicopter."
      },
      {
        "day": "Day 5-7",
        "title": "Las Vegas Glamour & Grand Canyon Landing",
        "detail": "Encore Tower Suite, private helicopter floor landing in Grand Canyon, and Bellagio fountains."
      },
      {
        "day": "Day 8-10",
        "title": "Los Angeles & Pacific Sunset",
        "detail": "Beverly Hills Hotel, Hollywood VIP studio pass, and Santa Monica private beach club."
      }
    ]
  },
  {
    "id": "canada-rocky-mountaineer-and-banff",
    "nights": 8,
    "country": "CANADA",
    "region": "polar",
    "title": "CANADA: ROCKY MOUNTAINEER LUXURY & TURQUOISE GLACIER LAKES",
    "tagline": "GoldLeaf service aboard the Rocky Mountaineer, Lake Louise heritage suites, and heli-hiking in Banff.",
    "image": "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "WILDERNESS GRAND",
    "startingPrice": "\u00a36,700 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "June to October",
    "months": [
      "June",
      "July",
      "August",
      "September",
      "October"
    ],
    "experienceTypes": [
      "Family",
      "Scenic",
      "Adventure",
      "Couples"
    ],
    "highlights": [
      "Rocky Mountaineer GoldLeaf bi-level glass dome train through the Canadian Rockies",
      "Fairmont Chateau Lake Louise lakeside suite with private canoe at dawn",
      "Private helicopter flight over the Columbia Icefield and alpine ridges",
      "Grizzly bear and wildlife tracking safari with professional naturalists",
      "Private boat excursion to the misty thunder of Niagara Falls",
      "Seaplane arrival into Vancouver harbour and private gourmet foodie tour"
    ],
    "description": "Eight breathtaking days traversing Canada's majestic western mountains. Watch snow-dusted peaks roll past your glass-domed train carriage, paddle across electric-turquoise glacial waters, and retreat to grand heritage castle hotels.",
    "narrativeSections": [
      {
        "title": "The Glass Rail to the Rockies",
        "content": "Sip British Columbia wines as dramatic canyon walls and soaring bald eagles pass by your bi-level dome on the world's most luxurious rail route."
      },
      {
        "title": "Lake Louise & Emerald Serenity",
        "content": "Wake before the world stirs to glide in a wooden canoe over waters so vivid they seem painted by nature's own brush."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Vancouver Pacific Gateway",
        "detail": "Fairmont Pacific Rim, seaplane tour, and Stanley Park totem forest walk."
      },
      {
        "day": "Day 3-4",
        "title": "Rocky Mountaineer GoldLeaf Journey",
        "detail": "Glass dome railway voyage through Fraser Canyon and Continental Divide to Kamloops & Banff."
      },
      {
        "day": "Day 5-8",
        "title": "Banff & Fairmont Chateau Lake Louise",
        "detail": "Lake Louise sunrise canoe, Moraine Lake private access, and helicopter alpine landing."
      }
    ]
  },
  {
    "id": "australia-harbour-glamour-and-great-barrier-reef",
    "nights": 9,
    "country": "AUSTRALIA",
    "region": "asia",
    "title": "AUSTRALIA: SYDNEY OPERA HOUSE, GREAT BARRIER REEF & ULURU LUXURY",
    "tagline": "Private yacht in Sydney Harbour, private reef pontoon diving, and luxury tented pavilions facing Uluru.",
    "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "SUNLIT HORIZONS",
    "startingPrice": "\u00a37,300 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "September to November | March to April",
    "months": [
      "March",
      "April",
      "September",
      "October",
      "November"
    ],
    "experienceTypes": [
      "Family",
      "Adventure",
      "Luxury",
      "Scenic"
    ],
    "highlights": [
      "Private yacht charter cruising beneath the Sydney Opera House and Harbour Bridge",
      "Private helicopter flight over the Heart Reef and Great Barrier Reef coral gardens",
      "Stay at Longitude 131\u00b0 luxury tented camp with private views of sacred Uluru",
      "Exclusive backstage private tour of the Sydney Opera House and private concert box",
      "Private koala and kangaroo sanctuary encounter with senior zoologists",
      "Private helicopter transfer to the Barossa Valley for Penfolds Grange tastings"
    ],
    "description": "Nine unforgettable days embracing the sunlit optimism of Australia. From the architectural icon of Sydney Harbour to the kaleidoscopic wonders of the Great Barrier Reef and the sacred crimson sands of the Red Centre.",
    "narrativeSections": [
      {
        "title": "Harbour Splendour in Sydney",
        "content": "Dine on freshly shucked Sydney rock oysters while gliding past golden harbour beaches, before watching world-class opera beneath sail-shaped vaults."
      },
      {
        "title": "Coral Reefs & Sacred Monoliths",
        "content": "Plunge into warm coral lagoons beside marine turtles, then journey into the desert heart where Uluru glows deep ruby in the setting sun."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-3",
        "title": "Sydney Harbour Icons & Coastal Walks",
        "detail": "Park Hyatt Sydney harbour view suite, private yacht charter, and Opera House VIP tour."
      },
      {
        "day": "Day 4-6",
        "title": "Great Barrier Reef & Whitsundays",
        "detail": "Qualia Hamilton Island luxury pavilion, private helicopter to Heart Reef, and snorkelling."
      },
      {
        "day": "Day 7-9",
        "title": "Uluru Outback & Red Sand Sanctuary",
        "detail": "Longitude 131\u00b0 check-in, Field of Light installation at dusk, and indigenous star talk."
      }
    ]
  },
  {
    "id": "new-zealand-pure-adventure-fjords",
    "nights": 10,
    "country": "NEW ZEALAND",
    "region": "polar",
    "title": "NEW ZEALAND: MILFORD SOUND FJORDS, QUEENSTOWN LODGES & GLACIER FLIGHTS",
    "tagline": "Private helicopter glacier landings, luxury boutique lodges in Queenstown, and private Milford Sound charters.",
    "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "EPIC WILDERNESS",
    "startingPrice": "\u00a37,600 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "December to March",
    "months": [
      "December",
      "January",
      "February",
      "March"
    ],
    "experienceTypes": [
      "Adventure",
      "Honeymoon",
      "Scenic",
      "Wellness"
    ],
    "highlights": [
      "Private helicopter flight landing atop remote Southern Alps glaciers with champagne",
      "Private cruise through the sheer cascading waterfalls of Milford Sound",
      "Stay at Blanketeer Bay or Matakauri Lodge on the edge of Lake Wakatipu",
      "Private jet boat expedition deep into Mt Aspiring National Park river canyons",
      "Exclusive VIP evening tour of the Hobbiton movie set with feast in the Green Dragon",
      "Geothermal spa and traditional Maori cultural immersion in Rotorua"
    ],
    "description": "Ten days across the cinematic wonder of Middle-earth. Marvel at vertical fjord cliffs tumbling into inky seas, pristine alpine lakes, and world-class Pinot Noir in Central Otago.",
    "narrativeSections": [
      {
        "title": "The World Fjord Capital",
        "content": "Witness towering waterfalls crashing down sheer thousand-metre peaks straight into the ocean, accompanied by playful fur seals and rare fjordland penguins."
      },
      {
        "title": "Queenstown Alpine Luxury",
        "content": "Relax in cedar hot tubs looking out across snow-capped Remarkables mountains, enjoying fireside dining prepared by your private lodge chef."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-3",
        "title": "Auckland & Rotorua Geothermal Springs",
        "detail": "Waiheke Island wine tasting, Rotorua mud bath healing, and Maori cultural blessing."
      },
      {
        "day": "Day 4-7",
        "title": "Queenstown & Milford Sound Majesty",
        "detail": "Matakauri Lodge, private helicopter flight over Mitre Peak, and private fjord cruise."
      },
      {
        "day": "Day 8-10",
        "title": "Lake Wanaka & Central Otago Vineyards",
        "detail": "Pinot Noir masterclass, Dart River wilderness jet boat, and farewell alpine banquet."
      }
    ]
  },
  {
    "id": "mauritius-turquoise-lagoon-and-cliffs",
    "nights": 6,
    "country": "MAURITIUS",
    "region": "africa",
    "title": "MAURITIUS: LE MORNE CLIFFS, PRIVATE CATAMARANS & REEF VILLAS",
    "tagline": "Private villas facing Le Morne Brabant, catamaran dolphin cruises, and Chamarel seven-coloured earth trails.",
    "image": "https://images.unsplash.com/photo-1589779261546-b673663a7587?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1589779261546-b673663a7587?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "ISLAND EDEN",
    "startingPrice": "\u00a34,250 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "May to November",
    "months": [
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November"
    ],
    "experienceTypes": [
      "Honeymoon",
      "Family",
      "Beach",
      "Couples"
    ],
    "highlights": [
      "Private beachfront villa at Royal Palm Beachcomber or JW Marriott Mauritius",
      "Private catamaran cruise swimming with wild spinner dolphins at Black River",
      "Helicopter tour viewing the mesmerising optical illusion of the underwater waterfall",
      "Private guided hike and champagne picnic atop the UNESCO crag of Le Morne Brabant",
      "Private rum distillery and artisanal cacao tour at historic Ch\u00e2teau de Labourdonnais",
      "Private underwater sea walk exploring vibrant coral marine reserves"
    ],
    "description": "Six days of unhurried tropical bliss in the Indian Ocean. Sink your toes into warm white sands, cruise calm crystal lagoons, and revel in the harmonious blend of Creole, French, and Indian cultures.",
    "narrativeSections": [
      {
        "title": "The Emerald Monolith of Le Morne",
        "content": "Wake with the legendary basalt crag rising dramatically behind your beachfront suite, with tranquil sheltered bays perfect for swimming year-round."
      },
      {
        "title": "Tropical Spices & Dolphin Bays",
        "content": "Sail across crystalline waters where dolphins leap playfully in the morning sunlight, followed by private beach barbecues of grilled rock lobster."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Le Morne Peninsula & Ocean Serenity",
        "detail": "Royal Palm check-in, beachfront private dinner, and paddleboarding on still lagoons."
      },
      {
        "day": "Day 3-4",
        "title": "Dolphin Catamaran & Underwater Waterfall",
        "detail": "Private boat with marine biologist, helicopter flight over underwater falls, and spa."
      },
      {
        "day": "Day 5-6",
        "title": "Chamarel Coloured Earths & Rum Estate",
        "detail": "Chamarel waterfall, volcanic sand dunes, rum tasting, and starlit beach farewell."
      }
    ]
  },
  {
    "id": "seychelles-granite-boulders-and-private-islands",
    "nights": 6,
    "country": "SEYCHELLES",
    "region": "africa",
    "title": "SEYCHELLES: ANSE SOURCE D'ARGENT & PRIVATE ISLAND SANCTUARIES",
    "tagline": "Fregate & North Island private stays, pink sand bicycle rides on La Digue, and rare giant tortoise encounters.",
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "ULTRA-LUXURY ISLAND",
    "startingPrice": "\u00a37,100 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "April to May | October to November",
    "months": [
      "April",
      "May",
      "October",
      "November"
    ],
    "experienceTypes": [
      "Honeymoon",
      "Luxury",
      "Couples",
      "Wellness"
    ],
    "highlights": [
      "Private helicopter transfer to an exclusive private island resort (North Island / Fregate)",
      "Private bicycle expedition through vanilla plantations to Anse Source d'Argent",
      "Guided nature walk through the primeval palm forest of Vall\u00e9e de Mai (Praslin)",
      "Private catamaran charter island-hopping between Curieuse, F\u00e9licit\u00e9, and Sister Islands",
      "Up-close sanctuary encounter feeding gentle 100-year-old Aldabra giant tortoises",
      "Sunset vintage champagne setup upon sculpted pink-tinted granite boulders"
    ],
    "description": "Six days in earth's most exclusive archipelago. Where sculpted granite monoliths frame untouched pink sands, giant tortoises roam free, and private island retreats offer the ultimate seclusion.",
    "narrativeSections": [
      {
        "title": "The Sculpted Granite Shores",
        "content": "Anse Source d'Argent is celebrated as the world's most photogenic beach, where massive grey-pink granite boulders meet shallow sapphire waters."
      },
      {
        "title": "Untouched Eden & Rare Sanctuaries",
        "content": "Explore prehistoric forests where the rare Coco de Mer grows, and retreat to private hillside pavilions surrounded only by birdsong and rustling palms."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Mah\u00e9 & Private Helicopter Island Landing",
        "detail": "Four Seasons Seychelles arrival, clifftop plunge pool villa, and Creole lobster dinner."
      },
      {
        "day": "Day 3-4",
        "title": "Praslin & Vall\u00e9e de Mai UNESCO Forest",
        "detail": "Scenic boat transfer, Coco de Mer forest naturalist walk, and Anse Lazio beach."
      },
      {
        "day": "Day 5-6",
        "title": "La Digue Granite Marvels & Giant Tortoises",
        "detail": "Private island cycling, Anse Source d'Argent sunset champagne, and farewell ocean banquet."
      }
    ]
  },
  {
    "id": "sri-lanka-tea-hills-leopards-galle",
    "nights": 7,
    "country": "SRI LANKA",
    "region": "asia",
    "title": "SRI LANKA: BLUE TRAINS THROUGH TEA HILLS, YALA LEOPARDS & GALLE FORT",
    "tagline": "First-class scenic train through Ella, private tented safari in Yala, and Amangalla colonial suites.",
    "image": "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "ISLAND ODYSSEY",
    "startingPrice": "\u00a33,950 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "December to March (South & West)",
    "months": [
      "December",
      "January",
      "February",
      "March"
    ],
    "experienceTypes": [
      "Culture",
      "Couples",
      "Safari",
      "Scenic"
    ],
    "highlights": [
      "First-class reserved carriage aboard the iconic scenic blue train from Kandy to Ella",
      "Private luxury tented safari at Wild Coast Tented Lodge tracking leopards in Yala",
      "Sunrise climb up the ancient UNESCO rock fortress of Sigiriya with private archaeologist",
      "Stay at historic Amangalla within the 17th-century ramparts of Galle Dutch Fort",
      "Private Ceylon tea harvesting and tasting with the resident planter in Hatton hills",
      "Private sunrise boat charter spotting blue whales off the coast of Mirissa"
    ],
    "description": "Seven days across an island of intoxicating beauty. From emerald tea hills draped in morning mist to wild coastal jungles prowled by leopards and ocean fortresses steeped in spice-trade romance.",
    "narrativeSections": [
      {
        "title": "The Misty Highlands of Ceylon",
        "content": "Lean out of the open window of the blue train as it rumbles across the Nine Arch Bridge, surrounded by endless cascades of tea bushes."
      },
      {
        "title": "Jungle Safaris & Dutch Fort Romance",
        "content": "Track elusive leopards among coastal sand dunes in Yala before sipping gin and tonics beneath the frangipani trees of historic Galle Fort."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Cultural Triangle & Sigiriya Rock",
        "detail": "Heritance Kandalama check-in, Sigiriya dawn climb, and Dambulla cave temple art."
      },
      {
        "day": "Day 3-4",
        "title": "Kandy to Ella Scenic Train & Tea Bungalows",
        "detail": "First-class scenic train journey, Ceylon Tea Trails planter bungalow, and tea tasting."
      },
      {
        "day": "Day 5-7",
        "title": "Yala Leopard Safari & Galle Fort",
        "detail": "Wild Coast Tented Lodge safari, Yala big game drives, and Amangalla colonial charm."
      }
    ]
  },
  {
    "id": "egypt-pharaohs-pyramids-and-nile",
    "nights": 8,
    "country": "EGYPT",
    "region": "africa",
    "title": "EGYPT: GIZA PYRAMIDS, LUXOR TOMBS & PRIVATE NILE DAHABIYA",
    "tagline": "Private after-hours entry between the paws of the Sphinx, private Nile dahabiya sailing, and Abu Simbel flights.",
    "image": "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "ANCIENT WONDER",
    "startingPrice": "\u00a35,900 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "October to March",
    "months": [
      "October",
      "November",
      "December",
      "January",
      "February",
      "March"
    ],
    "experienceTypes": [
      "Culture",
      "History",
      "Couples",
      "Scenic"
    ],
    "highlights": [
      "Private access to stand directly between the paws of the Great Sphinx at sunrise",
      "Four-night private dahabiya sailing cruise along the Nile from Luxor to Aswan",
      "VIP after-hours entry to King Tutankhamun and Nefertari's vibrant tomb chambers",
      "Private flight and guided tour of the monumental rock-cut temples of Abu Simbel",
      "Sunrise hot-air balloon flight over the Valley of the Kings and temple colonnades",
      "Historic stay at Cairo's Mena House with private balcony views directly facing the Pyramids"
    ],
    "description": "Eight epic nights unraveling 5,000 years of pharaonic civilization. Walk within royal burial chambers where painted hieroglyphs still glow with original pigments, and glide down the timeless Nile in private luxury.",
    "narrativeSections": [
      {
        "title": "The Eternal Enigma of Giza",
        "content": "Stand in solitary reverence before the Great Pyramid of Khufu before the morning gates open, guided by a renowned Egyptologist."
      },
      {
        "title": "Nile Splendour Aboard a Dahabiya",
        "content": "Travel as royalty did a century ago, carried by white canvas sails past palm-fringed riverbanks, ancient stone temples, and glowing desert sunsets."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Cairo & Giza Pyramids Private Access",
        "detail": "Mena House check-in, Sphinx paws private entry, and Grand Egyptian Museum treasures."
      },
      {
        "day": "Day 3-6",
        "title": "Luxor to Aswan Private Nile Dahabiya",
        "detail": "Karnak temple columns, Valley of the Kings hot air balloon, and Kom Ombo sunset."
      },
      {
        "day": "Day 7-8",
        "title": "Abu Simbel & Old Cataract Aswan",
        "detail": "Abu Simbel private flight, Sofitel Legend Old Cataract high tea, and felucca sail."
      }
    ]
  },
  {
    "id": "jordan-rose-city-petra-and-wadi-rum",
    "nights": 6,
    "country": "JORDAN",
    "region": "africa",
    "title": "JORDAN: PETRA'S ROSE-RED CHASM, WADI RUM & THE DEAD SEA",
    "tagline": "Candlelit private night walk through the Siq to Petra, Martian bubble tents in Wadi Rum, and mineral Dead Sea floating.",
    "image": "https://images.unsplash.com/photo-1579606032834-0d705470d056?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1579606032834-0d705470d056?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544971587-b842c27f8e14?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "DESERT MYSTIQUE",
    "startingPrice": "\u00a34,850 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "March to May | October to November",
    "months": [
      "March",
      "April",
      "May",
      "October",
      "November"
    ],
    "experienceTypes": [
      "Culture",
      "Adventure",
      "Couples",
      "Photography"
    ],
    "highlights": [
      "Private Petra by Night candlelit walk through the narrow Siq canyon to the Treasury",
      "Luxury Martian bubble dome tent stay in the crimson dunes of Wadi Rum with private stargazing",
      "Private 4x4 desert safari tracing Lawrence of Arabia's historic desert routes",
      "Private infinity pool suite at Kempinski Hotel Ishtar overlooking the Dead Sea",
      "Guided exploration of the remarkably preserved Roman ruins of Jerash",
      "Traditional Bedouin zarb feast cooked under the desert sands"
    ],
    "description": "Six days through the ancient kingdom of Jordan. Marvel at the rose-red sandstone Treasury carved by Nabataeans, sleep under a blanket of cosmic stars in Martian landscapes, and float effortlessly in mineral-rich waters.",
    "narrativeSections": [
      {
        "title": "The Rose-Red City Half as Old as Time",
        "content": "Emerge from the shadowy 200-metre high cliffs of the Siq to the breathtaking sunlit facade of the Treasury, entirely undisturbed by crowds."
      },
      {
        "title": "The Crimson Silence of Wadi Rum",
        "content": "Surround yourself with colossal sandstone monoliths that turn fiery orange, violet, and indigo as darkness settles over the desert."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Amman & Roman Jerash",
        "detail": "Amman citadel, private drive to ancient Jerash colonnades, and traditional Levantine mezze."
      },
      {
        "day": "Day 3-4",
        "title": "Petra Nabataean Wonders",
        "detail": "M\u00f6venpick Petra check-in, private guided Treasury climb, and Petra by Night candlelit walk."
      },
      {
        "day": "Day 5-6",
        "title": "Wadi Rum Martian Desert & Dead Sea",
        "detail": "4x4 jeep safari, luxury bubble dome stargazing, and Dead Sea mineral float."
      }
    ]
  },
  {
    "id": "south-africa-kruger-safari-and-cape-town",
    "nights": 9,
    "country": "SOUTH AFRICA",
    "region": "africa",
    "title": "SOUTH AFRICA: KRUGER BIG FIVE SAFARIS, TABLE MOUNTAIN & CAPE WINELANDS",
    "tagline": "Private game reserve plunge pool lodges, private helicopter over Table Mountain, and Stellenbosch wine estates.",
    "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "SAFARI & SOMMELIER",
    "startingPrice": "\u00a36,600 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "May to September (Safari) | Nov to March (Cape Town)",
    "months": [
      "January",
      "February",
      "March",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December"
    ],
    "experienceTypes": [
      "Safari",
      "Family",
      "Adventure",
      "Food"
    ],
    "highlights": [
      "Ultra-luxury private game lodge at Singita or Sabi Sand with private plunge pool",
      "Twice-daily private game drives tracking lions, leopards, rhinos, elephants, and buffalos",
      "Private helicopter flight around the dramatic peaks of Table Mountain and Cape Point",
      "Private cellar master tour and dining at Delaire Graff Estate in Stellenbosch",
      "Private walking tour with penguins on Boulders Beach and scenic Chapman's Peak drive",
      "Stay at The Silo Hotel in Cape Town's vibrant V&A Waterfront"
    ],
    "description": "Nine exhilarating days combining the raw, untamed thrill of a world-class African safari with the sophisticated dining, coastal beauty, and premier vineyards of Cape Town.",
    "narrativeSections": [
      {
        "title": "The Thrill of the Wild",
        "content": "Track a leopard through the acacia scrub at dawn with master trackers, returning to your open-air bush suite for breakfast overlooking an elephant waterhole."
      },
      {
        "title": "Cape Town's Ocean & Mountain Majesty",
        "content": "Ascend Table Mountain, taste world-class Pinotage in Cape Dutch estates, and watch the Atlantic and Indian Oceans merge at the Cape of Good Hope."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-4",
        "title": "Sabi Sand & Kruger Big Five Safari",
        "detail": "Singita lodge check-in, sunrise & night game drives, bush banquets, and wildlife tracking."
      },
      {
        "day": "Day 5-7",
        "title": "Cape Town Oceanfront & Table Mountain",
        "detail": "The Silo Hotel check-in, Table Mountain private cable car, and Boulders Beach penguins."
      },
      {
        "day": "Day 8-9",
        "title": "Cape Winelands Gourmet Retreat",
        "detail": "Franschhoek wine tram private car, Delaire Graff wine tasting, and farewell fine dining."
      }
    ]
  },
  {
    "id": "kenya-tanzania-the-great-migration",
    "nights": 8,
    "country": "KENYA & TANZANIA",
    "region": "africa",
    "title": "KENYA & TANZANIA: THE GREAT MIGRATION & NGORONGORO CRATER",
    "tagline": "Private hot-air balloon over the Mara River, luxury tented camps in the Serengeti, and Ngorongoro crater caldera floor.",
    "image": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "THE GREAT SAFARI",
    "startingPrice": "\u00a37,950 per person",
    "priceNote": "excl. flights (all-inclusive safari lodges)",
    "bestSeason": "July to October (Migration Season)",
    "months": [
      "July",
      "August",
      "September",
      "October"
    ],
    "experienceTypes": [
      "Safari",
      "Adventure",
      "Luxury",
      "Photography"
    ],
    "highlights": [
      "Witness the thundering river crossings of the Great Wildebeest Migration in the Serengeti & Mara",
      "Private sunrise hot-air balloon flight over the Masai Mara plains followed by champagne breakfast",
      "Descend into the 2,000-foot volcanic caldera of the Ngorongoro Crater teeming with black rhinos",
      "Stay in opulent luxury canvas tents with private copper bathtubs at Singita Mara River",
      "Exclusive private game drives with champion Maasai naturalists and photographic spotters",
      "Optional private flight extension to the spice beaches and azure seas of Zanzibar"
    ],
    "description": "Eight days in the theatre of wild Africa. Witness millions of wildebeest, zebras, and gazelles brave predator-filled waters in the greatest wildlife spectacle on our planet.",
    "narrativeSections": [
      {
        "title": "The Great River Crossing",
        "content": "Feel the earth rumble as vast herds plunge into the river, where crocodiles wait and lion prides stalk along the grassy banks under acacia trees."
      },
      {
        "title": "The Lost Eden of Ngorongoro",
        "content": "Enter the world's largest intact volcanic caldera, home to over 25,000 large animals, where flamingos turn soda lakes pink against towering emerald crater walls."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-3",
        "title": "Masai Mara National Reserve",
        "detail": "Bush flight into the Mara, Singita tent check-in, balloon safari at dawn, and lion tracking."
      },
      {
        "day": "Day 4-6",
        "title": "Serengeti Migration Plains",
        "detail": "Cross-border flight, Northern Serengeti river crossing surveillance, and fireside storytelling."
      },
      {
        "day": "Day 7-8",
        "title": "Ngorongoro Crater Caldera",
        "detail": "Crater rim lodge check-in, caldera floor game drive with black rhino tracking, and farewell feast."
      }
    ]
  },
  {
    "id": "bhutan-himalayan-kingdom-serenity",
    "nights": 6,
    "country": "BHUTAN",
    "region": "asia",
    "title": "BHUTAN: TIGER'S NEST MONASTERY, DZONG PALACES & MINDFULNESS",
    "tagline": "Private blessings at Paro Taktsang, Amankora luxury lodges across mountain valleys, and Dochula Pass prayer flags.",
    "image": "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "HIMALAYAN SERENITY",
    "startingPrice": "\u00a36,300 per person",
    "priceNote": "incl. Sustainable Development Fee & private guide",
    "bestSeason": "March to May | September to November",
    "months": [
      "March",
      "April",
      "May",
      "September",
      "October",
      "November"
    ],
    "experienceTypes": [
      "Culture",
      "Wellness",
      "Scenic",
      "Solo"
    ],
    "highlights": [
      "Private morning pilgrimage hike to the cliffside monastery of Paro Taktsang (Tiger's Nest)",
      "Stay across the valleys at Amankora or Six Senses Bhutan with private hot stone baths",
      "Private butter lamp lighting and monk blessing ceremony inside Punakha Dzong",
      "Panoramic crossing of the 3,100-metre Dochula Pass with 108 chortens and Himalayan peak views",
      "Traditional herbal and mineral hot stone bath infused with wild artemisia leaves",
      "Private audience with a Buddhist lama discussing Gross National Happiness and mindfulness"
    ],
    "description": "Six contemplative days in the Last Shangri-La. Walk through pine-scented mountain valleys where prayer flags flutter in the Himalayan wind, ancient fortresses guard river confluences, and life flows with profound mindfulness.",
    "narrativeSections": [
      {
        "title": "The Cliffside Haven of Taktsang",
        "content": "Perched precariously 900 metres above the Paro valley floor, the Tiger's Nest monastery appears floating in mist, offering deeply spiritual vistas."
      },
      {
        "title": "The Valley of Punakha",
        "content": "Cross wooden suspension bridges to the 'Palace of Great Happiness', where jacaranda trees bloom purple against gleaming whitewashed fortress walls."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Thimphu Kingdom Capital & Dochula Pass",
        "detail": "Amankora Thimphu, giant Buddha Dordenma, Dochula 108 memorial stupas, and monk dialogue."
      },
      {
        "day": "Day 3-4",
        "title": "Punakha Dzong & Riverside Serenity",
        "detail": "Punakha valley walk, majestic fortress blessing, and organic farm culinary masterclass."
      },
      {
        "day": "Day 5-6",
        "title": "Paro Valley & Tiger's Nest Pilgrimage",
        "detail": "Hike to Tiger's Nest, traditional Bhutanese hot stone bath, and farewell feast."
      }
    ]
  },
  {
    "id": "georgia-caucasus-wine-and-peaks",
    "nights": 6,
    "country": "GEORGIA",
    "region": "mediterranean",
    "title": "GEORGIA: KAZBEGI MOUNTAIN PEAKS, SULPHUR BATHS & KAKHETI CRADLE OF WINE",
    "tagline": "Private 4x4 drive to Gergeti Trinity Church, Rooms Hotel Kazbegi alpine terraces, and 8,000-year-old qvevri wine tastings.",
    "image": "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=85",
    "gallery": [
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85"
    ],
    "tag": "CAUCASUS CHARM",
    "startingPrice": "\u00a33,600 per person",
    "priceNote": "excl. flights (based on 2 persons sharing)",
    "bestSeason": "May to June | September to October",
    "months": [
      "May",
      "June",
      "September",
      "October"
    ],
    "experienceTypes": [
      "Offbeat",
      "Culture",
      "Food",
      "Friends"
    ],
    "highlights": [
      "Private 4x4 ascent to Gergeti Trinity Church standing solitary against Mount Kazbek",
      "Stay at Rooms Hotel Kazbegi with floor-to-ceiling glass balconies facing snowy 5,000m peaks",
      "Private subterranean sulphur bath buyout in historic Abanotubani, Old Tbilisi",
      "Private cellar tour and ancient qvevri clay amphora wine tasting in Kakheti",
      "Artisanal culinary masterclass making khinkali dumplings and cheese-filled khachapuri",
      "Private walking tour through Old Tbilisi's carved wooden balconies and Art Nouveau courtyards"
    ],
    "description": "Six captivating days through the Caucasus. Discover the birthplace of wine, dramatic mountain highways carved into granite gorges, thermal sulphur springs, and legendary Georgian feasting culture (supra).",
    "narrativeSections": [
      {
        "title": "The Dramatic Giants of Kazbegi",
        "content": "Gaze out over alpine meadows where wild horses graze beneath the jagged snowy crown of Mount Kazbek, sipping rich amber wine by the fireplace."
      },
      {
        "title": "Old Tbilisi Soul & Ancient Vineyards",
        "content": "Stroll cobblestone lanes where ancient churches and minarets sit side by side, bathed in the warmth of polyphonic singing and centuries of hospitality."
      }
    ],
    "itineraryOutline": [
      {
        "day": "Day 1-2",
        "title": "Old Tbilisi Balconies & Thermal Springs",
        "detail": "Stamba Hotel check-in, private sulphur bath experience, and Narikala fortress cable car."
      },
      {
        "day": "Day 3-4",
        "title": "Military Highway to Kazbegi Peaks",
        "detail": "Ananuri fortress, Jvari pass, Rooms Hotel Kazbegi, and Gergeti church 4x4 ascent."
      },
      {
        "day": "Day 5-6",
        "title": "Kakheti Wine Cradle & Bodbe Monastery",
        "detail": "Qvevri clay cellar tasting, traditional Georgian supra feast, and Sighnaghi valley views."
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'ENDLESSCAPE WILL CHANGE THE WAY YOU TRAVEL. FROM PRIVATE SPHINX ACCESS TO BESPOKE NILE DAHABIYA SAILING, IT WAS ABSOLUTELY FLAWLESS.',
    author: 'Micah',
    destination: 'Egypt'
  },
  {
    id: '2',
    quote: 'THE RETREAT AT BLUE LAGOON AND PRIVATE AURORA HUNTING IN ICELAND WAS BEYOND OUR WILDEST DREAMS.',
    author: 'Jimmy & Sarah',
    destination: 'Iceland'
  },
  {
    id: '3',
    quote: 'A DREAM COME TRUE – PRIVATE TEA CEREMONIES IN KYOTO, BULLET TRAIN FIRST CLASS, AND LUXURY ONSEN BATHS FACING MT FUJI.',
    author: 'Kim & David',
    destination: 'Japan'
  },
  {
    id: '4',
    quote: 'THE ROYAL RAJASTHAN SUITES IN UDAIPUR AND PRIVATE TIGER SAFARIS WERE PURE REGAL PERFECTION.',
    author: 'Aarav & Priya',
    destination: 'India'
  }
];

export const PRESS_AWARDS: PressAward[] = [
  {
    id: '1',
    quote: '“Luxury bespoke travel company, Endlesscape specialises in the trip you didn’t even realize you had been dreaming of.”',
    publication: 'Condé Nast Traveller'
  },
  {
    id: '2',
    quote: '“One of our travel experts voted as a Robb Report Travel Master for bespoke international expeditions.”',
    publication: 'Robb Report'
  },
  {
    id: '3',
    quote: '“Voted among the World’s Most Influential Bespoke Travel Specialists of the Year.”',
    publication: 'Travel + Leisure'
  },
  {
    id: '4',
    quote: '“Awarded Best Custom Luxury Holidays at the Global Luxury Travel Awards.”',
    publication: 'Luxury Travel Awards'
  }
];

export const DESTINATION_REGIONS = [
  {
    id: 'all',
    name: 'All Destinations',
    count: 31
  },
  {
    id: 'mediterranean',
    name: 'Europe & Mediterranean',
    count: 9,
    highlight: 'Switzerland, France, Italy, Spain, Greece, Turkey, UK, Central Europe, Georgia'
  },
  {
    id: 'asia',
    name: 'Asia & Far East',
    count: 10,
    highlight: 'India, Thailand, Singapore, Bali, Vietnam, Malaysia, Maldives, Japan, Sri Lanka, Bhutan'
  },
  {
    id: 'africa',
    name: 'Africa & Arabia',
    count: 7,
    highlight: 'Dubai & Abu Dhabi, Mauritius, Seychelles, Egypt, Jordan, South Africa, Kenya & Tanzania'
  },
  {
    id: 'polar',
    name: 'Polar & Americas',
    count: 5,
    highlight: 'Iceland, Canada Rockies, USA Icons, Australia, New Zealand'
  }
];
