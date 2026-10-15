export interface NarrativeSection {
  title: string;
  content: string;
}

export interface Itinerary {
  id: string;
  nights: number;
  country: string;
  region: 'polar' | 'mediterranean' | 'asia' | 'latin' | 'africa';
  title: string;
  tagline: string;
  image: string;
  gallery?: string[];
  tag: string;
  startingPrice: string;
  priceNote?: string;
  bestSeason: string;
  months?: string[];
  experienceTypes?: string[];
  highlights: string[];
  description: string;
  narrativeSections?: NarrativeSection[];
  itineraryOutline: {
    day: string;
    title: string;
    detail: string;
  }[];
}

export interface TravelStyle {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  focus: string;
  destinations: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  destination: string;
}

export interface PressAward {
  id: string;
  quote: string;
  publication: string;
}

export interface TripPlannerState {
  destination: string;
  travelStyle: string;
  feeling: string;
  duration: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}
