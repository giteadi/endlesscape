import { useState } from 'react';
import { Play, Heart, Wind, Mountain, Eye } from 'lucide-react';

interface BrandStorySplitProps {
  onWatchFilm: () => void;
  onExploreFeeling: (feeling: string) => void;
}

const FEELINGS = [
  {
    id: 'awe',
    name: 'Awe & Wonder',
    icon: Eye,
    description: 'Standing speechless before glaciers, thunderous waterfalls, and galaxies untainted by light.',
    sampleTrip: 'Iceland Northern Lights or Torres del Paine Expedition',
  },
  {
    id: 'seclusion',
    name: 'Total Solitude',
    icon: Wind,
    description: 'Untethering from noise in remote private desert lodges, secluded fjords, and private atolls.',
    sampleTrip: 'Namibia Skeleton Coast & Sossusvlei Dunes',
  },
  {
    id: 'connection',
    name: 'Deep Reconnection',
    icon: Heart,
    description: 'Shared laughter around a safari fire, private Tuscan family feasts, and timeless kinship.',
    sampleTrip: 'Galápagos Private Catamaran or Mykonos Villa Odyssey',
  },
  {
    id: 'vitality',
    name: 'Raw Adrenaline',
    icon: Mountain,
    description: 'Helicopter ascents, ice-cave descents, and diving along uncharted Pacific reef walls.',
    sampleTrip: 'Patagonia Glaciers or Norwegian Arctic Fjord Crossing',
  },
];

export const BrandStorySplit = ({
  onWatchFilm,
  onExploreFeeling,
}: BrandStorySplitProps) => {
  const [selectedFeeling, setSelectedFeeling] = useState(FEELINGS[0]);

  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        color: '#111215',
        overflow: 'hidden',
      }}
    >
      {/* Split Row 1: WHAT WE DO AND WHY WE DO IT */}
      <div
        style={{
          display: 'grid',
          alignItems: 'stretch',
        }}
        className="brand-split-row"
      >
        {/* Left: Editorial Text Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '620px',
            margin: '0 auto',
            width: '100%',
          }}
          className="brand-text-col"
        >
          <span
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--color-pink-accent)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            THE ENDLESSCAPE PROMISE
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: 'clamp(1.85rem, 4.2vw, 3.2rem)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              lineHeight: 1.12,
              color: '#0e0f12',
              marginBottom: '1.5rem',
            }}
          >
            WHAT WE DO AND WHY WE DO IT
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.92rem, 1.3vw, 1.02rem)',
              lineHeight: 1.85,
              color: '#4e5159',
              marginBottom: '2rem',
            }}
          >
            Since our founding, Endlesscape has always been about crafting remarkable, tailor-made
            trips for families, couples and private groups around the world. Our co-founders know
            this better than anyone. You can meet them in our film.
          </p>

          <div>
            <button
              onClick={onWatchFilm}
              className="btn-solid-black brand-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <Play size={14} fill="currentColor" />
              WATCH THE FILM
            </button>
          </div>
        </div>

        {/* Right: Co-Founders Video Thumbnail / Visual */}
        <div
          onClick={onWatchFilm}
          style={{
            position: 'relative',
            height: '100%',
            backgroundImage: `url(/assets/images/brand-studio.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            touchAction: 'manipulation',
          }}
          className="founders-media-box"
        >
          {/* Subtle Dark Vignette */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              transition: 'background-color 0.4s ease',
            }}
            className="video-overlay"
          />

          {/* Luxury Play Button */}
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#0e0f12',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
            }}
            className="play-pulse-btn"
          >
            <Play size={22} fill="#0e0f12" style={{ marginLeft: '4px' }} />
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '1.25rem',
              right: '1.25rem',
              zIndex: 3,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '0.4rem 0.8rem',
              borderRadius: '2px',
              color: '#ffffff',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              fontWeight: 600,
            }}
          >
            WATCH 3-MIN ESSENCE
          </div>
        </div>
      </div>

      {/* Split Row 2: PURSUIT OF FEELING */}
      <div
        style={{
          display: 'grid',
          alignItems: 'stretch',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#faf9f6',
        }}
        className="brand-split-row brand-split-reverse"
      >
        {/* Left on desktop / Top on mobile: Atmospheric Artwork */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            backgroundImage: `url(/assets/images/brand-feeling.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="brand-artwork-box"
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to right, rgba(250, 249, 246, 0.25) 0%, rgba(250, 249, 246, 0.05) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              right: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              padding: '0.9rem 1.25rem',
              borderRadius: '3px',
              maxWidth: '340px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '0.88rem',
                color: '#444',
                display: 'block',
                lineHeight: 1.5,
              }}
            >
              “True luxury isn’t excess. It is silence, presence, and time made memorable.”
            </span>
          </div>
        </div>

        {/* Right on desktop / Bottom on mobile: PURSUIT OF FEELING Editorial Block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '620px',
            margin: '0 auto',
            width: '100%',
          }}
          className="brand-text-col"
        >
          <span
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--color-pink-accent)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            EMOTIONAL ARCHITECTURE
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: 'clamp(1.85rem, 4.2vw, 3.2rem)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              lineHeight: 1.12,
              color: '#0e0f12',
              marginBottom: '1.5rem',
            }}
          >
            PURSUIT OF FEELING
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.92rem, 1.3vw, 1.02rem)',
              lineHeight: 1.85,
              color: '#4e5159',
              marginBottom: '1.75rem',
            }}
          >
            Travel has always been about more than just going ‘somewhere else’. For us, true luxury
            is feeling untethered from routine, completely present, and struck by awe. We don’t just
            ask where you want to go; we ask how you want to feel.
          </p>

          {/* Interactive Feeling Picker Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1.25rem',
            }}
          >
            {FEELINGS.map((f) => {
              const isSelected = selectedFeeling.id === f.id;
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFeeling(f)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem 0.95rem',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    backgroundColor: isSelected ? '#fff4ec' : '#ffffff',
                    color: isSelected ? 'var(--color-pink-accent)' : '#4a4d55',
                    border: isSelected ? '1.5px solid var(--color-pink-accent)' : '1px solid #ded9ce',
                    touchAction: 'manipulation',
                  }}
                >
                  <Icon size={14} style={{ color: isSelected ? 'var(--color-pink-accent)' : '#8b8e9b' }} />
                  {f.name}
                </button>
              );
            })}
          </div>

          {/* Selected Feeling Active Box */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              padding: '1.2rem 1.4rem',
              borderRadius: '2px',
              marginBottom: '1.75rem',
            }}
          >
            <p style={{ fontSize: '0.86rem', color: '#2b2d33', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              {selectedFeeling.description}
            </p>
            <span
              style={{
                fontSize: '0.74rem',
                color: 'var(--color-pink-accent)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
              }}
            >
              Recommended: {selectedFeeling.sampleTrip}
            </span>
          </div>

          <div>
            <button
              onClick={() => onExploreFeeling(selectedFeeling.name)}
              className="btn-solid-black brand-cta-btn"
            >
              CRAFT THIS EXPERIENCE
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .brand-split-row {
          grid-template-columns: repeat(2, 1fr);
          min-height: 580px;
        }

        .brand-text-col {
          padding: clamp(2.5rem, 5vw, 5.5rem);
        }

        .founders-media-box {
          min-height: 480px;
        }

        .brand-artwork-box {
          min-height: 480px;
        }

        .founders-media-box:hover .play-pulse-btn {
          transform: scale(1.1);
          background-color: #ffffff;
        }
        .founders-media-box:hover .video-overlay {
          background-color: rgba(0, 0, 0, 0.2) !important;
        }

        @media (max-width: 900px) {
          .brand-split-row {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .brand-text-col {
            padding: 3rem 1.25rem !important;
          }
          .founders-media-box {
            min-height: 280px !important;
            order: -1;
          }
          .brand-artwork-box {
            min-height: 260px !important;
          }
          .brand-cta-btn {
            width: 100% !important;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};
