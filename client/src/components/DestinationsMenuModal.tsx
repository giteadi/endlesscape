import React, { useState, useMemo, useCallback } from 'react';
import { 
  X, 
  Search, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Heart
} from 'lucide-react';
import { ITINERARIES, TRAVEL_STYLES, DESTINATION_REGIONS, MONTH_CALENDAR_DATA } from '../data/travelData';
import type { Itinerary, TravelStyle } from '../types/travel';

interface DestinationsMenuModalProps {
  isOpen: boolean;
  initialQuery?: string;
  itineraries?: Itinerary[];
  onClose: () => void;
  onSelectItinerary: (itinerary: Itinerary) => void;
  onSelectStyle: (style: TravelStyle) => void;
  onSelectMonth?: (month: string) => void;
  onEnquire: () => void;
}

interface SuggestionItem {
  id: string;
  type: 'itinerary' | 'country' | 'style' | 'month';
  title: string;
  subtitle: string;
  icon: 'pin' | 'compass' | 'heart' | 'calendar';
  data?: any;
}

export const DestinationsMenuModal: React.FC<DestinationsMenuModalProps> = ({
  isOpen,
  initialQuery = '',
  itineraries,
  onClose,
  onSelectItinerary,
  onSelectStyle,
  onSelectMonth,
  onEnquire,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedRegion, setSelectedRegion] = useState('all');

  const allItineraries = useMemo(() => {
    return itineraries && itineraries.length > 0 ? itineraries : ITINERARIES;
  }, [itineraries]);

  // Handle Search Input Change (useCallback)
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Handle Clear Search (useCallback)
  const handleClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Real-time Autocomplete Suggestions (useMemo)
  const suggestions = useMemo<SuggestionItem[]>(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q || q.length < 1) return [];

    const list: SuggestionItem[] = [];

    // 1. Check matching travel styles (e.g. Honeymoon, Family, Solo)
    TRAVEL_STYLES.forEach((style) => {
      if (
        style.title.toLowerCase().includes(q) ||
        style.subtitle.toLowerCase().includes(q)
      ) {
        list.push({
          id: `style-${style.id}`,
          type: 'style',
          title: `${style.title} EXPEDITION`,
          subtitle: style.subtitle,
          icon: 'heart',
          data: style,
        });
      }
    });

    // 2. Check matching unique countries/destinations
    const matchedCountries = new Set<string>();
    allItineraries.forEach((item) => {
      if (item.country.toLowerCase().includes(q) && !matchedCountries.has(item.country)) {
        matchedCountries.add(item.country);
        list.push({
          id: `country-${item.country}`,
          type: 'country',
          title: item.country,
          subtitle: `Explore tailor-made journeys in ${item.country}`,
          icon: 'pin',
          data: item.country,
        });
      }
    });

    // 3. Check matching months from calendar
    MONTH_CALENDAR_DATA.forEach((m) => {
      if (
        m.month.toLowerCase().includes(q) ||
        m.destination.toLowerCase().includes(q)
      ) {
        list.push({
          id: `month-${m.id}`,
          type: 'month',
          title: `${m.month} TRAVEL`,
          subtitle: m.destination,
          icon: 'calendar',
          data: m.month,
        });
      }
    });

    // 4. Check matching itineraries (by title, tagline, highlights)
    allItineraries.forEach((trip) => {
      if (
        trip.title.toLowerCase().includes(q) ||
        trip.tagline.toLowerCase().includes(q) ||
        trip.highlights.some((h) => h.toLowerCase().includes(q))
      ) {
        list.push({
          id: `trip-${trip.id}`,
          type: 'itinerary',
          title: trip.title,
          subtitle: `${trip.country} • ${trip.nights} Nights • From ${trip.startingPrice}`,
          icon: 'compass',
          data: trip,
        });
      }
    });

    return list.slice(0, 6); // Top 6 most relevant suggestions
  }, [searchQuery, allItineraries]);

  // Filtered trips for grid display (useMemo)
  const filteredTrips = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allItineraries.filter((item) => {
      const matchesRegion = selectedRegion === 'all' || item.region === selectedRegion;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.highlights.some((h) => h.toLowerCase().includes(q));
      return matchesRegion && matchesQuery;
    });
  }, [allItineraries, selectedRegion, searchQuery]);

  // Click suggestion handler (useCallback)
  const handleSelectSuggestion = useCallback((s: SuggestionItem) => {
    if (s.type === 'itinerary' && s.data) {
      onClose();
      onSelectItinerary(s.data as Itinerary);
    } else if (s.type === 'style' && s.data) {
      onClose();
      onSelectStyle(s.data as TravelStyle);
    } else if (s.type === 'country' && s.data) {
      setSearchQuery(s.data as string);
    } else if (s.type === 'month' && s.data && onSelectMonth) {
      onClose();
      onSelectMonth(s.data as string);
    } else {
      setSearchQuery(s.title);
    }
  }, [onClose, onSelectItinerary, onSelectStyle, onSelectMonth]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 220,
        backgroundColor: 'rgba(10, 12, 16, 0.72)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.5rem, 3vw, 1.5rem)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2ded5',
          borderRadius: '4px',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '92vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          padding: 'clamp(1.25rem, 4vw, 2.5rem)',
          color: '#111215',
          boxShadow: '0 28px 80px rgba(0, 0, 0, 0.22)',
          animation: 'slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f4f3ef',
            border: '1px solid #ded9ce',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#111215',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            touchAction: 'manipulation',
          }}
          aria-label="Close destinations explorer"
        >
          <X size={20} />
        </button>

        {/* Search Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-pink-accent)',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}
          >
            <Compass size={14} />
            WORLDWIDE DISCOVERY & LIVE SEARCH
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#111215',
              marginBottom: '1.25rem',
            }}
          >
            WHERE DOES YOUR IMAGINATION WANDER?
          </h2>

          {/* Search Input Bar */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: '1rem',
                color: '#777984',
              }}
            />
            <input
              type="text"
              placeholder="Search Morocco, Greece, Sahara, Honeymoon, November, Lake Como..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              style={{
                width: '100%',
                padding: '1.1rem 1rem 1.1rem 3rem',
                backgroundColor: '#f7f6f2',
                border: searchQuery
                  ? '1px solid var(--color-pink-accent)'
                  : '1px solid #ded9ce',
                borderRadius: '3px',
                color: '#111215',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.25s ease',
              }}
            />
            {searchQuery && (
              <button
                onClick={handleClear}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  background: 'transparent',
                  border: 'none',
                  color: '#666874',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                }}
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Real-time Autocomplete Suggestions Dropdown/Panel */}
          {suggestions.length > 0 && (
            <div
              style={{
                marginTop: '0.75rem',
                backgroundColor: '#ffffff',
                border: '1px solid #ded9ce',
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
              }}
            >
              <div
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-pink-accent)',
                  backgroundColor: '#fffaf5',
                  borderBottom: '1px solid #f0eee8',
                }}
              >
                SUGGESTIONS & DIRECT MATCHES
              </div>

              {suggestions.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleSelectSuggestion(s)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f3f1ec',
                    transition: 'background-color 0.2s ease',
                  }}
                  className="search-suggestion-item"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#fff4ec',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-pink-accent)',
                      }}
                    >
                      {s.icon === 'pin' && <MapPin size={14} />}
                      {s.icon === 'compass' && <Compass size={14} />}
                      {s.icon === 'heart' && <Heart size={14} />}
                      {s.icon === 'calendar' && <Calendar size={14} />}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: '#111215',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {s.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.74rem',
                          color: '#666874',
                        }}
                      >
                        {s.subtitle}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-pink-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    Select <ArrowRight size={12} />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Region Filter Tags */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
            borderBottom: '1px solid #eae6de',
            paddingBottom: '1rem',
          }}
        >
          {DESTINATION_REGIONS.map((r) => {
            const isSelected = selectedRegion === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                style={{
                  background: isSelected ? 'var(--color-pink-accent)' : '#f7f6f2',
                  border: isSelected ? '1px solid var(--color-pink-accent)' : '1px solid #e2ded5',
                  color: isSelected ? '#ffffff' : '#33353c',
                  padding: '0.4rem 0.95rem',
                  borderRadius: '2px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 3px 10px rgba(240, 139, 88, 0.3)' : 'none',
                }}
              >
                {r.name}
              </button>
            );
          })}
        </div>

        {/* Quick Travel Style Shortcuts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#666874', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Travel By Persona:
          </span>
          {TRAVEL_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => {
                onClose();
                onSelectStyle(style);
              }}
              style={{
                background: '#f8f7f4',
                border: '1px solid #ded9ce',
                color: '#33353c',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.7rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              className="quick-persona-pill"
            >
              {style.title}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div style={{ marginBottom: '2rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#666874',
              }}
            >
              Showing {filteredTrips.length} Curated Expeditions
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => {
                  onClose();
                  onSelectItinerary(trip);
                }}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #eae6de',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                }}
                className="search-trip-card"
              >
                <div
                  style={{
                    height: '140px',
                    backgroundImage: `url(${trip.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.65rem',
                      right: '0.65rem',
                      backgroundColor: 'rgba(12, 14, 18, 0.72)',
                      border: '1px solid rgba(240, 139, 88, 0.4)',
                      color: '#ffffff',
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      borderRadius: '2px',
                    }}
                  >
                    {trip.nights} NIGHTS
                  </span>
                </div>

                <div style={{ padding: '1rem' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      letterSpacing: '0.14em',
                      color: 'var(--color-pink-accent)',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {trip.country}
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--font-condensed)',
                      fontSize: '0.96rem',
                      fontWeight: 700,
                      color: '#111215',
                      marginBottom: '0.4rem',
                      lineHeight: 1.3,
                      textTransform: 'uppercase',
                    }}
                  >
                    {trip.title}
                  </h4>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      color: '#666874',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    View Details <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Custom Route Request */}
        <div
          style={{
            borderTop: '1px solid #eae6de',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
          className="search-bottom-strip"
        >
          <p style={{ fontSize: '0.82rem', color: '#555762', margin: 0 }}>
            Don’t see what you have in mind? We craft 100% custom expeditions anywhere on Earth.
          </p>
          <button
            onClick={() => {
              onClose();
              onEnquire();
            }}
            className="btn-primary-pink"
          >
            <Sparkles size={14} /> REQUEST CUSTOM ROUTE
          </button>
        </div>
      </div>

      <style>{`
        .search-suggestion-item:hover {
          background-color: #fff4ec !important;
        }
        .quick-persona-pill:hover {
          background-color: #fff4ec !important;
          border-color: var(--color-pink-accent) !important;
          color: var(--color-pink-accent) !important;
        }
        .search-trip-card:hover {
          transform: translateY(-3px);
          border-color: var(--color-pink-accent) !important;
          box-shadow: 0 10px 24px rgba(240, 139, 88, 0.15);
        }
        @media (max-width: 600px) {
          .search-bottom-strip {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .search-bottom-strip button {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};
