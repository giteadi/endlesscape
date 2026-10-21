import React, { useState, useMemo, useCallback, useRef } from 'react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  X
} from 'lucide-react';
import { MONTH_CALENDAR_DATA } from '../data/travelData';
import type { Itinerary } from '../types/travel';

interface ExperienceCategoryPageProps {
  categoryTitle?: string;
  categorySubtitle?: string;
  initialMonth?: string;
  allItineraries: Itinerary[];
  onBack: () => void;
  onSelectItinerary: (itinerary: Itinerary) => void;
  onEnquire: (tripTitle?: string) => void;
}

export const ExperienceCategoryPage: React.FC<ExperienceCategoryPageProps> = ({
  categoryTitle = 'LUXURY HONEYMOONS',
  categorySubtitle = 'Your honeymoon should be as unique as you are. Use these suggested honeymoon itineraries as a prompt and get in touch to plan something that’s truly yours.',
  initialMonth,
  allItineraries,
  onBack,
  onSelectItinerary,
  onEnquire,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(initialMonth || null);
  const heroSliderRef = useRef<HTMLDivElement>(null);

  // Scroll hero horizontal carousel
  const handleScrollSlider = useCallback((direction: 'left' | 'right') => {
    if (heroSliderRef.current) {
      const scrollAmount = 360;
      heroSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }, []);

  // Filtered itineraries based on selected month (useMemo)
  const filteredTrips = useMemo(() => {
    if (!selectedMonth) {
      return allItineraries;
    }
    const monthLower = selectedMonth.toLowerCase();
    const matched = allItineraries.filter((itinerary) => {
      if (itinerary.months && itinerary.months.length > 0) {
        return itinerary.months.some((m) => m.toLowerCase().includes(monthLower));
      }
      if (itinerary.bestSeason) {
        return itinerary.bestSeason.toLowerCase().includes(monthLower);
      }
      return true;
    });

    // If month matching yields fewer than 3, fallback to all to keep layout lush
    return matched.length > 0 ? matched : allItineraries;
  }, [allItineraries, selectedMonth]);

  // Featured top trips for the hero slider (useMemo)
  const featuredTrips = useMemo(() => {
    return filteredTrips.slice(0, 6);
  }, [filteredTrips]);

  // Handle month click with smooth scroll to top of list
  const handleMonthClick = useCallback((monthName: string) => {
    setSelectedMonth((prev) => (prev === monthName ? null : monthName));
    const el = document.getElementById('category-hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleClearMonthFilter = useCallback(() => {
    setSelectedMonth(null);
  }, []);

  return (
    <div className="experience-category-page" style={{ backgroundColor: '#ffffff', color: '#111215' }}>
      {/* 1. Top Sub-Nav Breadcrumb */}
      <div
        style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          backgroundColor: '#faf9f6',
          padding: '0.85rem 1.5rem',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <button
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'transparent',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#44464c',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={14} /> Back to Overview
          </button>

          <div
            style={{
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#777a82',
            }}
          >
            HOME / EXPERIENCE TYPES /{' '}
            <span style={{ color: 'var(--color-pink-accent)' }}>
              {selectedMonth ? `${selectedMonth} ${categoryTitle}` : categoryTitle}
            </span>
          </div>

          <button
            onClick={() => onEnquire(`Custom ${categoryTitle}`)}
            className="btn-primary-pink"
            style={{ padding: '0.45rem 1.1rem', fontSize: '0.7rem' }}
          >
            PLAN THIS EXPERIENCE
          </button>
        </div>
      </div>

      {/* 2. Hero Section: Left Title Block + Right Horizontal Cards */}
      <section
        id="category-hero"
        style={{
          backgroundColor: '#ffffff',
          color: '#111215',
          padding: '4.5rem 0 5rem 0',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid #e8e4dc',
        }}
      >
        <div className="container" style={{ maxWidth: '1440px' }}>
          {selectedMonth && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'rgba(230, 27, 101, 0.15)',
                border: '1px solid var(--color-pink-accent)',
                padding: '0.35rem 0.95rem',
                borderRadius: '999px',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '1.5rem',
              }}
            >
              <span>FILTERED BY: {selectedMonth.toUpperCase()}</span>
              <button
                onClick={handleClearMonthFilter}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="View All Months"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(320px, 420px) 1fr',
              gap: '3rem',
              alignItems: 'center',
            }}
            className="category-hero-grid"
          >
            {/* Left Dark Title Block (Screenshot 1 & 3 Left Block) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: 'var(--color-pink-accent)',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  CURATED INSPIRATIONS
                </span>
                <h1
                  style={{
                    fontFamily: 'var(--font-condensed)',
                    fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    lineHeight: 1.12,
                    color: '#111215',
                    margin: 0,
                  }}
                >
                  {selectedMonth
                    ? `OUR FAVOURITE ${selectedMonth.toUpperCase()} HONEYMOONS`
                    : `OUR FAVOURITE ${categoryTitle}`}
                </h1>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.98rem',
                  lineHeight: 1.7,
                  color: '#555762',
                  margin: 0,
                }}
              >
                {categorySubtitle}
              </p>

              <div>
                <button
                  onClick={() => onEnquire(`Quote for ${selectedMonth || ''} ${categoryTitle}`)}
                  className="btn-primary-pink"
                  style={{
                    padding: '0.85rem 2rem',
                    fontSize: '0.76rem',
                    letterSpacing: '0.18em',
                  }}
                >
                  GET A QUOTE
                </button>
              </div>

              {/* Slider Arrows */}
              <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.5rem' }}>
                <button
                  onClick={() => handleScrollSlider('left')}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  aria-label="Scroll trips left"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => handleScrollSlider('right')}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  aria-label="Scroll trips right"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Right Horizontal Tall Cards Carousel (Screenshot 1 Right) */}
            <div
              ref={heroSliderRef}
              style={{
                display: 'flex',
                gap: '1.25rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                paddingBottom: '1rem',
                scrollbarWidth: 'none',
              }}
              className="category-hero-slider"
            >
              {featuredTrips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => onSelectItinerary(trip)}
                  style={{
                    flex: '0 0 320px',
                    height: '520px',
                    position: 'relative',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
                  }}
                  className="category-card"
                >
                  {/* Photo */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${trip.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.8s ease',
                    }}
                    className="category-card-bg"
                  />

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to top, rgba(8, 9, 11, 0.95) 0%, rgba(8, 9, 11, 0.4) 50%, rgba(8, 9, 11, 0.1) 80%, rgba(8, 9, 11, 0.4) 100%)',
                    }}
                  />

                  {/* Top Nights Badge (Screenshot 1: "8 NIGHTS", "12 NIGHTS", "15 NIGHTS") */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      zIndex: 3,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#ffffff',
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '2px',
                    }}
                  >
                    {trip.nights} NIGHTS
                  </div>

                  {/* Bottom Text and CTA Button */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      padding: '1.8rem 1.5rem',
                      zIndex: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.85)',
                      }}
                    >
                      {trip.country}
                    </span>

                    <h3
                      style={{
                        fontFamily: 'var(--font-condensed)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: '#ffffff',
                        lineHeight: 1.25,
                        marginBottom: '0.75rem',
                      }}
                    >
                      {trip.title}
                    </h3>

                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItinerary(trip);
                        }}
                        style={{
                          background: 'transparent',
                          border: '1px solid rgba(255, 255, 255, 0.8)',
                          color: '#ffffff',
                          padding: '0.55rem 1.25rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                        className="category-explore-btn"
                      >
                        EXPLORE TRIP
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHERE TO GO ON HONEYMOON, WHEN (12-Month Calendar Grid - Screenshot 2 Exact Match!) */}
      <section style={{ padding: '6rem 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1440px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#111215',
                marginBottom: '0.65rem',
              }}
            >
              WHERE TO GO ON {categoryTitle.toUpperCase()}, WHEN
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                color: '#555860',
                maxWidth: '680px',
                margin: '0 auto',
              }}
            >
              Everywhere has its season. Discover which of our destinations align with your preferred honeymoon dates.
            </p>
          </div>

          {/* 12-Month Grid: 6 columns x 2 rows (Matching Screenshot 2!) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '12px',
            }}
            className="month-grid"
          >
            {MONTH_CALENDAR_DATA.map((item) => {
              const isSelected = selectedMonth?.toLowerCase() === item.month.toLowerCase();
              return (
                <div
                  key={item.id}
                  onClick={() => handleMonthClick(item.month)}
                  style={{
                    position: 'relative',
                    height: '240px',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: isSelected
                      ? '0 0 0 3px var(--color-pink-accent), 0 14px 28px rgba(0, 0, 0, 0.3)'
                      : '0 4px 14px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.4s ease',
                  }}
                  className="month-card"
                >
                  {/* Photo */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.6s ease',
                    }}
                    className="month-bg"
                  />

                  {/* Dark Shading */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: isSelected ? 'rgba(8, 9, 11, 0.35)' : 'rgba(8, 9, 11, 0.42)',
                      transition: 'background-color 0.3s ease',
                    }}
                    className="month-overlay"
                  />

                  {/* Centered Month Title (Uppercase, clean, like Screenshot 2) */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1rem',
                      textAlign: 'center',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-condensed)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#ffffff',
                        margin: 0,
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {item.month}
                    </h3>

                    {isSelected && (
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--color-pink-accent)',
                          backgroundColor: '#ffffff',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '999px',
                          marginTop: '0.5rem',
                        }}
                      >
                        SELECTED
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TOP TRENDING HONEYMOON DESTINATIONS (Screenshot 2 Bottom) */}
      <section style={{ backgroundColor: '#f9f8f5', padding: '5.5rem 0 6rem 0', borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div className="container" style={{ maxWidth: '1440px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-pink-accent)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.4rem',
              }}
            >
              HIGH-DEMAND SANCTUARIES
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#111215',
                margin: 0,
              }}
            >
              TOP TRENDING {categoryTitle.toUpperCase()} DESTINATIONS
            </h2>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => onSelectItinerary(trip)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.35s ease',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                }}
                className="trending-card"
              >
                <div
                  style={{
                    height: '240px',
                    backgroundImage: `url(${trip.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      right: '0.85rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '2px',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {trip.nights} NIGHTS
                  </span>
                </div>

                <div style={{ padding: '1.6rem 1.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--color-pink-accent)',
                      display: 'block',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {trip.country}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-condensed)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: '#111215',
                      lineHeight: 1.3,
                      marginBottom: '0.65rem',
                    }}
                  >
                    {trip.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      color: '#555860',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {trip.tagline}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                      paddingTop: '1rem',
                    }}
                  >
                    <span style={{ fontSize: '0.78rem', color: '#777', fontStyle: 'italic' }}>
                      From {trip.startingPrice}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItinerary(trip);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#111215',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        cursor: 'pointer',
                      }}
                    >
                      EXPLORE TRIP <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .get-a-quote-btn:hover {
          background-color: #ffffff !important;
          color: #0c0e12 !important;
          border-color: #ffffff !important;
        }
        .category-card:hover .category-card-bg {
          transform: scale(1.08);
        }
        .category-explore-btn:hover {
          background-color: #ffffff !important;
          color: #0c0e12 !important;
          border-color: #ffffff !important;
        }
        .month-card:hover .month-bg {
          transform: scale(1.09);
        }
        .month-card:hover .month-overlay {
          background-color: rgba(8, 9, 11, 0.25) !important;
        }
        .trending-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
        }
        .category-hero-slider::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 1024px) {
          .category-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .month-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .month-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};
