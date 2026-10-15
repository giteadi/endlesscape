import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ITINERARIES, PRESS_AWARDS, DESTINATION_REGIONS } from '../data/travelData';
import type { Itinerary } from '../types/travel';

interface CuratedItinerariesProps {
  itineraries?: Itinerary[];
  onSelectItinerary: (itinerary: Itinerary) => void;
  onPlanTrip: () => void;
}

export const CuratedItineraries = ({
  itineraries,
  onSelectItinerary,
  onPlanTrip,
}: CuratedItinerariesProps) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const allItineraries = itineraries && itineraries.length > 0 ? itineraries : ITINERARIES;
  const filteredItineraries =
    selectedRegion === 'all'
      ? allItineraries
      : allItineraries.filter((item) => item.region === selectedRegion);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('.itinerary-card')?.clientWidth || 360;
      const scrollAmount = cardWidth + 24;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="itineraries"
      style={{
        backgroundColor: '#0c0e12',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="curated-itineraries-section"
    >
      {/* Background Subtle Gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '250px',
          background: 'linear-gradient(to bottom, #ffffff 0%, rgba(12, 14, 18, 0) 100%)',
          opacity: 0.03,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ maxWidth: '1440px' }}>
        {/* Header Row with Title, Region Filter, and Carousel Arrows */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
          className="itineraries-header-row"
        >
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--color-pink-accent)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.4rem',
              }}
            >
              TAILOR-MADE EXPEDITIONS
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: 'clamp(1.85rem, 4vw, 2.8rem)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: '#ffffff',
                lineHeight: 1.15,
              }}
            >
              CURATED ITINERARIES
            </h2>
          </div>

          {/* Region Tabs (Scrollable on mobile) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              overflowX: 'auto',
              maxWidth: '100%',
              paddingBottom: '4px',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
            className="region-filter-bar no-scrollbar"
          >
            {DESTINATION_REGIONS.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                style={{
                  background:
                    selectedRegion === region.id ? 'var(--color-pink-accent)' : 'rgba(255, 255, 255, 0.08)',
                  border:
                    selectedRegion === region.id
                      ? '1px solid var(--color-pink-accent)'
                      : '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  touchAction: 'manipulation',
                }}
              >
                {region.name}
              </button>
            ))}
          </div>

          {/* Desktop Navigation Controls */}
          <div style={{ display: 'flex', gap: '0.6rem' }} className="carousel-nav-arrows">
            <button
              onClick={() => handleScroll('left')}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
              }}
              aria-label="Previous trip"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
              }}
              aria-label="Next trip"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            gap: '1.25rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '2rem',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
          className="itineraries-scroll no-scrollbar"
        >
          {filteredItineraries.map((trip) => (
            <div
              key={trip.id}
              onClick={() => onSelectItinerary(trip)}
              style={{
                flex: '0 0 min(84vw, 360px)',
                scrollSnapAlign: 'start',
                position: 'relative',
                height: '520px',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
                touchAction: 'manipulation',
              }}
              className="itinerary-card"
            >
              {/* Background Image */}
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
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="itinerary-bg-img"
              />

              {/* Shaded Gradient Layer */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(to top, rgba(8, 9, 11, 0.96) 0%, rgba(8, 9, 11, 0.6) 45%, rgba(8, 9, 11, 0.1) 80%, rgba(8, 9, 11, 0.45) 100%)',
                }}
              />

              {/* Top Nights Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.1rem',
                  right: '1.1rem',
                  zIndex: 3,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.95)',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '2px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                {trip.nights} NIGHTS
              </div>

              {/* Bottom Details Content */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '1.75rem 1.4rem',
                  zIndex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {/* Country Subtitle */}
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--color-pink-accent)',
                  }}
                >
                  {trip.country}
                </span>

                {/* Itinerary Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-condensed)',
                    fontSize: 'clamp(1.15rem, 3.2vw, 1.35rem)',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    lineHeight: 1.25,
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}
                >
                  {trip.title}
                </h3>

                {/* Explore Trip Button */}
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItinerary(trip);
                    }}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.75)',
                      color: '#ffffff',
                      padding: '0.6rem 1.3rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      borderRadius: '2px',
                      touchAction: 'manipulation',
                    }}
                    className="explore-trip-btn"
                  >
                    EXPLORE TRIP
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Bespoke Itinerary Request Strip (Responsive stack on mobile) */}
        <div
          style={{
            margin: '2rem 0 1rem 0',
            padding: 'clamp(1.25rem, 3vw, 2rem)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
          className="custom-route-strip"
        >
          <div style={{ maxWidth: '640px' }}>
            <h4
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: '#ffffff',
                marginBottom: '0.35rem',
                textTransform: 'uppercase',
              }}
            >
              LOOKING FOR A COMPLETELY BESPOKE ROUTE?
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.65)', margin: 0, lineHeight: 1.6 }}>
              Every itinerary above is simply an inspirational starting point. We design 100% custom expeditions anywhere on Earth.
            </p>
          </div>
          <button onClick={onPlanTrip} className="btn-primary-pink custom-route-btn">
            PLAN A CUSTOM ROUTE
          </button>
        </div>
      </div>

      {/* Bottom Awards & Accolades Ribbon (Direct Match to Black Tomato Screenshot 4) */}
      <div
        style={{
          backgroundColor: '#faf8f5',
          color: '#111215',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          padding: 'clamp(2.5rem, 5vw, 4rem) 0',
          marginTop: '3.5rem',
          position: 'relative',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1440px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
          }}
        >
          {PRESS_AWARDS.map((award) => (
            <div
              key={award.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  lineHeight: 1.5,
                  color: '#1a1b1f',
                  textTransform: 'uppercase',
                }}
              >
                {award.quote}
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.92rem',
                  fontStyle: 'italic',
                  color: 'var(--color-pink-accent)',
                  fontWeight: 600,
                }}
              >
                — {award.publication}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .curated-itineraries-section {
          padding: 5.5rem 0 4.5rem 0;
        }

        .itinerary-card:hover .itinerary-bg-img {
          transform: scale(1.06);
        }
        .explore-trip-btn:hover {
          background-color: #ffffff !important;
          color: #0b0c0e !important;
          border-color: #ffffff !important;
        }

        @media (max-width: 768px) {
          .curated-itineraries-section {
            padding: 3.5rem 0 3rem 0 !important;
          }
          .custom-route-strip {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .custom-route-btn {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
