import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  Share2, 
  Check, 
  X,
  MapPin
} from 'lucide-react';
import type { Itinerary } from '../types/travel';

interface ItineraryDetailPageProps {
  itinerary: Itinerary;
  allItineraries: Itinerary[];
  onBack: () => void;
  onEnquire: (tripTitle?: string) => void;
  onSelectItinerary: (itinerary: Itinerary) => void;
}

export const ItineraryDetailPage: React.FC<ItineraryDetailPageProps> = ({
  itinerary,
  allItineraries,
  onBack,
  onEnquire,
  onSelectItinerary,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stickyBannerVisible, setStickyBannerVisible] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(0);

  // Gallery array
  const gallery = useMemo(() => {
    if (itinerary.gallery && itinerary.gallery.length > 0) {
      return itinerary.gallery;
    }
    return [itinerary.image];
  }, [itinerary]);

  // Next / Prev slide handlers with useCallback
  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextSlide();
      if (e.key === 'ArrowLeft') handlePrevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide]);

  // Scroll to top on itinerary change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentSlide(0);
  }, [itinerary.id]);

  // Share link handler
  const handleShare = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  }, []);

  // Related trips memoized
  const relatedTrips = useMemo(() => {
    return allItineraries
      .filter((item) => item.id !== itinerary.id)
      .slice(0, 3);
  }, [allItineraries, itinerary.id]);

  return (
    <div className="itinerary-detail-page" style={{ backgroundColor: '#ffffff', color: '#111215', minHeight: '100vh' }}>
      {/* 1. Sub-Header Meta Bar (Direct match to Black Tomato Screenshot 4) */}
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
            maxWidth: '1360px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Back link */}
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
              padding: '0.2rem 0',
            }}
          >
            <ArrowLeft size={14} /> Back to Trips
          </button>

          {/* Three Key Meta Pillars (Match Screenshot 4) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.8rem',
              fontSize: '0.82rem',
              color: '#33353b',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontSize: '0.92rem' }}>
              {itinerary.bestSeason || 'Year-Round'}
            </div>
            <div style={{ color: 'rgba(0, 0, 0, 0.25)' }}>|</div>
            <div style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontSize: '0.92rem' }}>
              From {itinerary.startingPrice} {itinerary.priceNote || 'excl. flights (based on 2 ppl sharing)'}{' '}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: '1px solid #777',
                  fontSize: '0.62rem',
                  marginLeft: '0.2rem',
                  fontStyle: 'normal',
                }}
                title="Per person based on double occupancy"
              >
                i
              </span>
            </div>
            <div style={{ color: 'rgba(0, 0, 0, 0.25)' }}>|</div>
            <div style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontSize: '0.92rem' }}>
              {itinerary.nights} nights ideal length
            </div>
          </div>

          {/* Share */}
          <button
            onClick={handleShare}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'transparent',
              border: 'none',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#555860',
              cursor: 'pointer',
            }}
          >
            {copiedLink ? <Check size={14} color="#059669" /> : <Share2 size={14} />}
            {copiedLink ? 'LINK COPIED' : 'SHARE'}
          </button>
        </div>
      </div>

      {/* 2. Hero High-Resolution Photo Slider with Left/Right Buttons (Screenshot 4) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(380px, 62vh, 680px)',
          backgroundColor: '#0c0e12',
          overflow: 'hidden',
        }}
      >
        {gallery.map((imgUrl, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === idx ? 1 : 0,
              transform: currentSlide === idx ? 'scale(1)' : 'scale(1.04)',
              transition: 'opacity 0.7s ease, transform 1s ease',
              pointerEvents: currentSlide === idx ? 'auto' : 'none',
            }}
          />
        ))}

        {/* Subtle Vignette Gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.35) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Slider Controls: Left Arrow */}
        {gallery.length > 1 && (
          <button
            onClick={handlePrevSlide}
            style={{
              position: 'absolute',
              top: '50%',
              left: '2rem',
              transform: 'translateY(-50%)',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              zIndex: 10,
            }}
            className="slider-nav-btn"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Slider Controls: Right Arrow */}
        {gallery.length > 1 && (
          <button
            onClick={handleNextSlide}
            style={{
              position: 'absolute',
              top: '50%',
              right: '2rem',
              transform: 'translateY(-50%)',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              zIndex: 10,
            }}
            className="slider-nav-btn"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Slide Counter Badge */}
        {gallery.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '1.75rem',
              right: '2rem',
              zIndex: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(6px)',
              padding: '0.35rem 0.85rem',
              borderRadius: '2px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {currentSlide + 1} / {gallery.length}
          </div>
        )}
      </div>

      {/* 3. Main Editorial Content Container (Direct Match to Screenshot 5) */}
      <div className="container" style={{ maxWidth: '1120px', padding: '4.5rem 1.5rem 6rem 1.5rem' }}>
        {/* Country & Tag Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-pink-accent)',
              marginBottom: '0.75rem',
            }}
          >
            <MapPin size={14} />
            <span>{itinerary.country}</span>
            <span style={{ color: '#aaa' }}>•</span>
            <span>{itinerary.tag}</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              lineHeight: 1.15,
              color: '#111215',
              marginBottom: '1rem',
            }}
          >
            {itinerary.title}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
              fontStyle: 'italic',
              color: '#494c55',
              lineHeight: 1.6,
              maxWidth: '880px',
            }}
          >
            “{itinerary.tagline}”
          </p>
        </div>

        {/* Narrative Lead Paragraph (Screenshot 5) */}
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: '#2a2c33',
            marginBottom: '3rem',
            maxWidth: '880px',
          }}
        >
          <p>{itinerary.description}</p>
        </div>

        {/* Editorial Story Chapters */}
        {itinerary.narrativeSections && itinerary.narrativeSections.length > 0 ? (
          <div style={{ marginBottom: '3.5rem' }}>
            {itinerary.narrativeSections.map((sec, idx) => (
              <div key={idx} style={{ marginBottom: '2.75rem', maxWidth: '880px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#111215',
                    marginBottom: '0.85rem',
                  }}
                >
                  {sec.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: '#3d4049',
                    margin: 0,
                  }}
                >
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {/* 4. Distinctive Teal Callout Banner: "MAKE AN ENQUIRY" (Exact match to Screenshot 5!) */}
        <div
          style={{
            backgroundColor: '#3aa89b',
            color: '#ffffff',
            padding: '2.5rem 3rem',
            borderRadius: '2px',
            marginBottom: '4.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.8rem',
            boxShadow: '0 12px 36px rgba(58, 168, 155, 0.22)',
          }}
          className="enquiry-teal-box"
        >
          <div style={{ maxWidth: '620px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '0.85rem',
                lineHeight: 1.15,
              }}
            >
              MAKE AN ENQUIRY
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.98rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.95)',
                margin: 0,
              }}
            >
              Each and every Endlesscape trip is tailored exactly to who you are and what you want to do. So tell us about yourself and we’ll create something that’s entirely you.
            </p>
          </div>

          <button
            onClick={() => onEnquire(itinerary.title)}
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              border: 'none',
              padding: '0.95rem 2.2rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.25)',
              whiteSpace: 'nowrap',
            }}
            className="enquire-teal-btn"
          >
            ENQUIRE NOW
          </button>
        </div>

        {/* 5. Day-by-Day Detailed Itinerary Breakdown */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-pink-accent)',
                display: 'block',
                marginBottom: '0.4rem',
              }}
            >
              DAY BY DAY
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '2rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: '#111215',
              }}
            >
              EXPEDITION ROUTE & STAGES
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {itinerary.itineraryOutline.map((dayItem, idx) => {
              const isOpen = activeDay === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    backgroundColor: isOpen ? '#faf9f6' : '#ffffff',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <button
                    onClick={() => setActiveDay(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--color-pink-accent)',
                          minWidth: '85px',
                        }}
                      >
                        {dayItem.day}
                      </span>
                      <h4
                        style={{
                          fontFamily: 'var(--font-condensed)',
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          color: '#111215',
                          margin: 0,
                        }}
                      >
                        {dayItem.title}
                      </h4>
                    </div>
                    <span style={{ fontSize: '1.2rem', color: '#666' }}>{isOpen ? '−' : '+'}</span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.5rem 1.5rem 7.5rem',
                        fontSize: '0.94rem',
                        lineHeight: 1.7,
                        color: '#4a4d56',
                      }}
                    >
                      {dayItem.detail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Expedition Highlights Grid */}
        <div
          style={{
            backgroundColor: '#0c0e12',
            color: '#ffffff',
            padding: '3rem',
            borderRadius: '3px',
            marginBottom: '4.5rem',
          }}
        >
          <div style={{ marginBottom: '1.75rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-pink-accent)',
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              HAND-PICKED EXPERIENCES
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '1.8rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#ffffff',
                margin: 0,
              }}
            >
              CURATED HIGHLIGHTS INCLUDED
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {itinerary.highlights.map((highlight, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  fontSize: '0.88rem',
                  lineHeight: 1.55,
                  color: 'rgba(255, 255, 255, 0.85)',
                }}
              >
                <div
                  style={{
                    minWidth: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(230, 27, 101, 0.15)',
                    border: '1px solid var(--color-pink-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                  }}
                >
                  <Check size={12} color="var(--color-pink-accent)" />
                </div>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Related Itineraries Suggestions */}
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-pink-accent)',
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              MORE INSPIRATION
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '1.8rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#111215',
                margin: 0,
              }}
            >
              YOU MAY ALSO LIKE
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {relatedTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => onSelectItinerary(trip)}
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#ffffff',
                }}
                className="related-trip-card"
              >
                <div
                  style={{
                    height: '200px',
                    backgroundImage: `url(${trip.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '2px',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                    }}
                  >
                    {trip.nights} NIGHTS
                  </span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-pink-accent)',
                      display: 'block',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {trip.country}
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--font-condensed)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: '#111215',
                      lineHeight: 1.3,
                      marginBottom: '0.65rem',
                    }}
                  >
                    {trip.title}
                  </h4>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#555',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    EXPLORE TRIP →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8. Sticky Bottom Navy Callout Bar (Screenshots 4 & 5 Exact Match!) */}
      {stickyBannerVisible && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: '#092742',
            backgroundImage: 'radial-gradient(ellipse at 80% 50%, rgba(20, 80, 130, 0.4), transparent 60%)',
            color: '#ffffff',
            padding: '0.85rem 1.25rem max(0.85rem, var(--safe-bottom))',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 -6px 28px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
          className="itinerary-sticky-banner"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '1.15rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}
            >
              SO, READY TO START?
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '1px',
                height: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }}
            />
            <span
              style={{
                fontSize: '0.84rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.85)',
                fontWeight: 500,
              }}
            >
              SPEAK TO OUR TRAVEL EXPERTS TO START PLANNING YOUR TRIP
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => onEnquire(itinerary.title)}
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.6rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
              }}
              className="sticky-enquire-btn"
            >
              ENQUIRE NOW
            </button>

            <button
              onClick={() => setStickyBannerVisible(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Dismiss footer notice"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .slider-nav-btn:hover {
          background-color: rgba(255, 255, 255, 0.3) !important;
          color: #ffffff !important;
          transform: translateY(-50%) scale(1.08) !important;
        }
        .enquiry-teal-box:hover .enquire-teal-btn {
          background-color: #1a1c22 !important;
          transform: translateY(-2px);
        }
        .sticky-enquire-btn:hover {
          background-color: #ffffff !important;
          color: #0b0c0e !important;
        }
        .related-trip-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }
        @media (max-width: 768px) {
          .enquiry-teal-box {
            padding: 1.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};
