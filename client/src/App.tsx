import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { TravelStyles } from './components/TravelStyles';
import { CuratedItineraries } from './components/CuratedItineraries';
import { BrandStorySplit } from './components/BrandStorySplit';
import { Footer } from './components/Footer';
import { TripPlannerModal } from './components/TripPlannerModal';
import { ItineraryModal } from './components/ItineraryModal';
import { VideoModal } from './components/VideoModal';
import { DestinationsMenuModal } from './components/DestinationsMenuModal';
import { AdminPanel } from './components/AdminPanel';
import { ItineraryDetailPage } from './components/ItineraryDetailPage';
import { ExperienceCategoryPage } from './components/ExperienceCategoryPage';
import { ITINERARIES } from './data/travelData';
import { API_BASE } from './config/api';
import type { Itinerary, TravelStyle } from './types/travel';
import './App.css';

type PageState = 'home' | 'itinerary' | 'experience' | 'admin';

export function App() {
  // Navigation State
  const [pageState, setPageState] = useState<PageState>('home');

  // Dynamic live data from backend API
  const [itineraries, setItineraries] = useState<Itinerary[]>(ITINERARIES);

  // Selected Detail States
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const [categoryTitle, setCategoryTitle] = useState('LUXURY HONEYMOONS');
  const [categorySubtitle, setCategorySubtitle] = useState(
    'Your honeymoon should be as unique as you are. Use these suggested honeymoon itineraries as a prompt and get in touch to plan something that’s truly yours.'
  );
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);

  // Modal states
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [plannerFeeling, setPlannerFeeling] = useState('');
  const [previewModalItinerary, setPreviewModalItinerary] = useState<Itinerary | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  // Fetch live itineraries from backend
  const fetchLiveItineraries = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/itineraries`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setItineraries(data);
        }
      }
    } catch (err) {
      console.warn('Backend API offline or unreachable, using local curated itineraries', err);
    }
  }, []);

  useEffect(() => {
    fetchLiveItineraries();
  }, [fetchLiveItineraries]);

  // Handlers memoized with useCallback
  const handleGoHome = useCallback(() => {
    setPageState('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenEnquire = useCallback((tripTitle?: string) => {
    setPlannerFeeling(tripTitle ? `Enquiring for: ${tripTitle}` : '');
    setPlannerOpen(true);
  }, []);

  const handleOpenSearch = useCallback(() => {
    setSearchInitialQuery('');
    setDestinationsOpen(true);
  }, []);

  const handleExploreTrips = useCallback(() => {
    if (pageState !== 'home') {
      setPageState('home');
      setTimeout(() => {
        const el = document.getElementById('itineraries');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('itineraries');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pageState]);

  // Navigate to full dedicated Itinerary Detail Page (Screenshots 4 & 5)
  const handleSelectItinerary = useCallback((itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
    setPageState('itinerary');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Navigate to Experience Category Page (Screenshots 1, 2, 3)
  const handleSelectStyle = useCallback((style: TravelStyle) => {
    setCategoryTitle(
      style.id === 'honeymoon'
        ? 'LUXURY HONEYMOONS'
        : `LUXURY ${style.title} ADVENTURES`
    );
    setCategorySubtitle(
      style.focus ||
        `Each and every ${style.title} trip is tailored exactly to who you are and what you want to do.`
    );
    setSelectedMonth(undefined);
    setPageState('experience');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Navigate to Month Filtered Experience Page (Screenshot 3)
  const handleSelectMonth = useCallback((monthName: string) => {
    setCategoryTitle('LUXURY HONEYMOONS');
    setSelectedMonth(monthName);
    setPageState('experience');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleExploreFeeling = useCallback((feelingName: string) => {
    setPlannerFeeling(feelingName);
    setPlannerOpen(true);
  }, []);

  const handleCustomiseItinerary = useCallback((itinerary: Itinerary) => {
    setPreviewModalItinerary(null);
    setPlannerFeeling(`Customizing ${itinerary.title}`);
    setPlannerOpen(true);
  }, []);

  // If in Admin Portal Mode
  if (pageState === 'admin') {
    return (
      <AdminPanel
        onBackToSite={handleGoHome}
        onRefreshPublicData={fetchLiveItineraries}
      />
    );
  }

  return (
    <div className="app-wrapper">
      {/* 1. Header Navigation */}
      <Navbar
        onGoHome={handleGoHome}
        onOpenEnquire={() => handleOpenEnquire()}
        onOpenSearch={handleOpenSearch}
        onSelectDestinations={handleOpenSearch}
        onSelectExperiences={() => {
          setCategoryTitle('LUXURY HONEYMOONS');
          setSelectedMonth(undefined);
          setPageState('experience');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setPageState('admin')}
      />

      {/* 2. Main Page Content Routed by pageState */}
      {pageState === 'home' && (
        <>
          {/* Hero Section */}
          <Hero
            onExploreTrips={handleExploreTrips}
            onPlanTrip={() => handleOpenEnquire()}
          />

          {/* Philosophy & Testimonials Section */}
          <Philosophy
            onGetInTouch={() => handleOpenEnquire()}
          />

          {/* Travel by Persona & Style Section */}
          <TravelStyles
            onSelectStyle={handleSelectStyle}
            onViewMore={() => {
              setCategoryTitle('LUXURY HONEYMOONS');
              setPageState('experience');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Curated Itineraries Carousel (Clicking opens Itinerary Detail Page) */}
          <CuratedItineraries
            itineraries={itineraries}
            onSelectItinerary={handleSelectItinerary}
            onPlanTrip={() => handleOpenEnquire()}
          />

          {/* Co-Founders Story & 'Pursuit of Feeling' */}
          <BrandStorySplit
            onWatchFilm={() => setVideoOpen(true)}
            onExploreFeeling={handleExploreFeeling}
          />
        </>
      )}

      {/* Dedicated Experience Category Page (Screenshots 1, 2, 3) */}
      {pageState === 'experience' && (
        <ExperienceCategoryPage
          categoryTitle={categoryTitle}
          categorySubtitle={categorySubtitle}
          initialMonth={selectedMonth}
          allItineraries={itineraries}
          onBack={handleGoHome}
          onSelectItinerary={handleSelectItinerary}
          onEnquire={(title) => handleOpenEnquire(title)}
        />
      )}

      {/* Dedicated Full Itinerary Detail Page (Screenshots 4 & 5) */}
      {pageState === 'itinerary' && selectedItinerary && (
        <ItineraryDetailPage
          itinerary={selectedItinerary}
          allItineraries={itineraries}
          onBack={handleGoHome}
          onEnquire={(title) => handleOpenEnquire(title || selectedItinerary.title)}
          onSelectItinerary={handleSelectItinerary}
        />
      )}

      {/* 3. Comprehensive Editorial Footer */}
      <Footer />

      {/* Floating Discreet Concierge Admin Switcher */}
      <div
        style={{
          position: 'fixed',
          bottom: 'max(1.2rem, var(--safe-bottom))',
          right: 'max(1.2rem, var(--safe-right))',
          zIndex: 90,
        }}
      >
        <button
          onClick={() => setPageState('admin')}
          style={{
            backgroundColor: '#0f1116',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '0.55rem 1rem',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            transition: 'all 0.3s ease',
          }}
          title="Open Endlesscape Concierge Admin"
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-pink-accent)',
            }}
          />
          ADMIN SUITE
        </button>
      </div>

      {/* Interactive Modals */}
      <TripPlannerModal
        isOpen={plannerOpen}
        onClose={() => setPlannerOpen(false)}
        initialFeeling={plannerFeeling}
      />

      <ItineraryModal
        itinerary={previewModalItinerary}
        onClose={() => setPreviewModalItinerary(null)}
        onCustomiseTrip={handleCustomiseItinerary}
      />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        onEnquire={() => handleOpenEnquire()}
      />

      <DestinationsMenuModal
        isOpen={destinationsOpen}
        initialQuery={searchInitialQuery}
        itineraries={itineraries}
        onClose={() => setDestinationsOpen(false)}
        onSelectItinerary={handleSelectItinerary}
        onSelectStyle={handleSelectStyle}
        onSelectMonth={handleSelectMonth}
        onEnquire={() => handleOpenEnquire()}
      />
    </div>
  );
}

export default App;
