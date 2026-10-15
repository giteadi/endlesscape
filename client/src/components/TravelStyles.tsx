import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { TRAVEL_STYLES } from '../data/travelData';
import type { TravelStyle } from '../types/travel';

interface TravelStylesProps {
  onSelectStyle: (style: TravelStyle) => void;
  onViewMore: () => void;
}

export const TravelStyles = ({ onSelectStyle, onViewMore }: TravelStylesProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        padding: '5rem 0 5.5rem 0',
      }}
      className="travel-styles-section"
    >
      <div className="container" style={{ maxWidth: '1440px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-pink-accent)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            WHO ARE YOU TRAVELLING WITH?
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: 'clamp(1.85rem, 4vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#111215',
            }}
          >
            TRAVEL BY STYLE & PERSONA
          </h2>
        </div>

        {/* 5 Vertical Tall Portrait Panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '12px',
            minHeight: '580px',
          }}
          className="travel-styles-grid"
        >
          {TRAVEL_STYLES.map((style) => {
            const isHovered = hoveredId === style.id;
            return (
              <div
                key={style.id}
                onMouseEnter={() => setHoveredId(style.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectStyle(style)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  minHeight: '480px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isHovered
                    ? '0 20px 40px rgba(0, 0, 0, 0.35)'
                    : '0 4px 14px rgba(0, 0, 0, 0.08)',
                  touchAction: 'manipulation',
                }}
                className="travel-style-card"
              >
                {/* Background Image with Zoom on Hover */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${style.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="travel-style-bg"
                />

                {/* Shaded Contrast Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: isHovered
                      ? 'linear-gradient(to bottom, rgba(8, 9, 11, 0.3) 0%, rgba(8, 9, 11, 0.88) 100%)'
                      : 'linear-gradient(to bottom, rgba(8, 9, 11, 0.25) 0%, rgba(8, 9, 11, 0.72) 100%)',
                    transition: 'background 0.4s ease',
                  }}
                  className="travel-style-overlay"
                />

                {/* Card Content */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    padding: '1.5rem 1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                  className="travel-style-content"
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-condensed)',
                      fontSize: 'clamp(1.4rem, 2.2vw, 2.1rem)',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#ffffff',
                      textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)',
                      transition: 'transform 0.4s ease',
                      marginBottom: '0.5rem',
                    }}
                    className="travel-style-title"
                  >
                    {style.title}
                  </h3>

                  {/* Subtitle & CTA: Always legible on mobile touch screens, reveal on hover for desktop */}
                  <div
                    style={{
                      transition: 'all 0.4s ease',
                      maxWidth: '240px',
                    }}
                    className={`travel-style-details ${isHovered ? 'desktop-hovered' : ''}`}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.78rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 1.5,
                        marginBottom: '0.75rem',
                        textShadow: '0 1px 8px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {style.subtitle}
                    </p>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: 'var(--color-pink-accent)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '2px',
                        border: '1px solid rgba(230, 27, 101, 0.3)',
                      }}
                    >
                      EXPLORE <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* VIEW MORE Button */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={onViewMore} className="btn-solid-black" style={{ minWidth: '180px' }}>
            VIEW MORE
          </button>
        </div>
      </div>

      <style>{`
        /* Desktop hover animations */
        @media (min-width: 900px) {
          .travel-style-title {
            transform: translateY(0);
          }
          .travel-style-card:hover .travel-style-title {
            transform: translateY(-12px);
          }
          .travel-style-details {
            opacity: 0;
            transform: translateY(16px);
            pointer-events: none;
          }
          .travel-style-card:hover .travel-style-details {
            opacity: 1 !important;
            transform: translateY(0) !important;
            pointer-events: auto !important;
          }
        }

        /* Tablet Layout (2 columns) */
        @media (max-width: 1024px) and (min-width: 641px) {
          .travel-styles-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            min-height: auto !important;
          }
          .travel-style-card {
            min-height: 380px !important;
          }
          .travel-style-details {
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* Mobile Layout */
        @media (max-width: 640px) {
          .travel-styles-section {
            padding: 3.5rem 0 4rem 0 !important;
          }
          .travel-styles-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            padding-bottom: 1.5rem !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 1rem !important;
          }
          .travel-styles-grid::-webkit-scrollbar {
            display: none !important;
          }
          .travel-style-card {
            flex: 0 0 min(82vw, 320px) !important;
            min-height: 420px !important;
            scroll-snap-align: center !important;
          }
          .travel-style-details {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};
