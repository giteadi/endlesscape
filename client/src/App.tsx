import { useEffect, useCallback } from 'react';
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
import { AdminLoginModal } from './components/AdminLoginModal';
import { ItineraryDetailPage } from './components/ItineraryDetailPage';
import { ExperienceCategoryPage } from './components/ExperienceCategoryPage';
import { AiConciergeChat } from './components/AiConciergeChat';
import { useAppDispatch, useAppSelector } from './store/store';
import { openLoginModal } from './store/slices/authSlice';
import {
  setPageState,
  navigateHome,
  openPlanner,
  closePlanner,
  openSearch,
  closeSearch,
  openVideoModal,
  closeVideoModal,
  closePreviewModal,
  selectItineraryDetail,
  selectExperienceStyle,
  selectExperienceMonth,
} from './store/slices/uiSlice';
import { fetchItineraries, setItineraries } from './store/slices/itinerariesSlice';
import type { Itinerary, TravelStyle } from './types/travel';
import './App.css';

export function App() {
  const dispatch = useAppDispatch();

  // Redux global state selectors
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const {
    pageState,
    selectedItinerary,
    categoryTitle,
    categorySubtitle,
    selectedMonth,
    plannerOpen,
    plannerFeeling,
    previewModalItinerary,
    videoOpen,
    destinationsOpen,
    searchInitialQuery,
  } = useAppSelector((state) => state.ui);

  const itineraries = useAppSelector((state) => state.itineraries.items);

  // Initial fetch of live itineraries from backend
  useEffect(() => {
    dispatch(fetchItineraries());
  }, [dispatch]);

  // Global keyboard shortcut (Ctrl/Cmd + Shift + A) to open admin login / panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        if (isAuthenticated) {
          dispatch(setPageState('admin'));
        } else {
          dispatch(openLoginModal());
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, dispatch]);

  // Support direct URL hash navigation (e.g. localhost:5173/#admin)
  useEffect(() => {
    const checkAdminHash = () => {
      if (window.location.hash.toLowerCase() === '#admin') {
        if (isAuthenticated) {
          dispatch(setPageState('admin'));
        } else {
          dispatch(openLoginModal());
        }
      }
    };
    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);
    return () => window.removeEventListener('hashchange', checkAdminHash);
  }, [isAuthenticated, dispatch]);

  // Update handler for admin changes
  const handleUpdatePublicData = useCallback((directList?: Itinerary[]) => {
    if (directList && Array.isArray(directList)) {
      dispatch(setItineraries(directList));
    }
    dispatch(fetchItineraries());
  }, [dispatch]);

  // Navigation handlers
  const handleGoHome = useCallback(() => {
    dispatch(navigateHome());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const handleOpenEnquire = useCallback((tripTitle?: string) => {
    dispatch(openPlanner(tripTitle ? `Enquiring for: ${tripTitle}` : ''));
  }, [dispatch]);

  const handleOpenSearch = useCallback(() => {
    dispatch(openSearch(''));
  }, [dispatch]);

  const handleExploreTrips = useCallback(() => {
    if (pageState !== 'home') {
      dispatch(setPageState('home'));
      setTimeout(() => {
        const el = document.getElementById('itineraries');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('itineraries');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pageState, dispatch]);

  const handleSelectItinerary = useCallback((itinerary: Itinerary) => {
    dispatch(selectItineraryDetail(itinerary));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [dispatch]);

  const handleSelectItineraryById = useCallback((id: string) => {
    const found = itineraries.find(it => it.id === id);
    if (found) {
      handleSelectItinerary(found);
    }
  }, [itineraries, handleSelectItinerary]);

  const handleSelectStyle = useCallback((style: TravelStyle) => {
    dispatch(selectExperienceStyle(style));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [dispatch]);

  const handleSelectMonth = useCallback((monthName: string) => {
    dispatch(selectExperienceMonth(monthName));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [dispatch]);

  const handleExploreFeeling = useCallback((feelingName: string) => {
    dispatch(openPlanner(feelingName));
  }, [dispatch]);

  const handleCustomiseItinerary = useCallback((itinerary: Itinerary) => {
    dispatch(closePreviewModal());
    dispatch(openPlanner(`Customizing ${itinerary.title}`));
  }, [dispatch]);

  const handleOpenAdmin = useCallback(() => {
    if (isAuthenticated) {
      dispatch(setPageState('admin'));
    } else {
      dispatch(openLoginModal());
    }
  }, [isAuthenticated, dispatch]);

  // Route Guard: Only authenticated administrators can access the Admin Panel
  if (pageState === 'admin') {
    if (!isAuthenticated) {
      // If an unauthenticated user somehow attempts to navigate to admin mode,
      // revert to home and prompt with the AdminLoginModal
      dispatch(navigateHome());
      dispatch(openLoginModal());
      return null;
    }

    return (
      <AdminPanel
        onBackToSite={handleGoHome}
        onRefreshPublicData={handleUpdatePublicData}
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
          dispatch(selectExperienceMonth('November'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={handleOpenAdmin}
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
              dispatch(selectExperienceMonth('November'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Curated Itineraries Carousel */}
          <CuratedItineraries
            itineraries={itineraries}
            onSelectItinerary={handleSelectItinerary}
            onPlanTrip={() => handleOpenEnquire()}
          />

          {/* Co-Founders Story & 'Pursuit of Feeling' */}
          <BrandStorySplit
            onWatchFilm={() => dispatch(openVideoModal())}
            onExploreFeeling={handleExploreFeeling}
          />
        </>
      )}

      {/* Dedicated Experience Category Page */}
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

      {/* Dedicated Full Itinerary Detail Page */}
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

      {/* Interactive Global Modals */}
      <AdminLoginModal />

      <TripPlannerModal
        isOpen={plannerOpen}
        onClose={() => dispatch(closePlanner())}
        initialFeeling={plannerFeeling}
      />

      <ItineraryModal
        itinerary={previewModalItinerary}
        onClose={() => dispatch(closePreviewModal())}
        onCustomiseTrip={handleCustomiseItinerary}
      />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => dispatch(closeVideoModal())}
        onEnquire={() => handleOpenEnquire()}
      />

      <DestinationsMenuModal
        isOpen={destinationsOpen}
        initialQuery={searchInitialQuery}
        itineraries={itineraries}
        onClose={() => dispatch(closeSearch())}
        onSelectItinerary={handleSelectItinerary}
        onSelectStyle={handleSelectStyle}
        onSelectMonth={handleSelectMonth}
        onEnquire={() => handleOpenEnquire()}
      />

      {/* 4. Luxury Floating AI Travel Concierge (Aura) */}
      <AiConciergeChat
        onSelectItineraryById={handleSelectItineraryById}
        onEnquire={handleOpenEnquire}
      />
    </div>
  );
}

export default App;
