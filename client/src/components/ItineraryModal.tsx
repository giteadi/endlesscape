import { X, Sparkles, MapPin, CheckCircle, Shield } from 'lucide-react';
import type { Itinerary } from '../types/travel';

interface ItineraryModalProps {
  itinerary: Itinerary | null;
  onClose: () => void;
  onCustomiseTrip: (itinerary: Itinerary) => void;
}

export const ItineraryModal = ({
  itinerary,
  onClose,
  onCustomiseTrip,
}: ItineraryModalProps) => {
  if (!itinerary) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 200,
        backgroundColor: 'rgba(8, 9, 11, 0.9)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.5rem, 3vw, 1.5rem)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#0f1116',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '4px',
          width: '100%',
          maxWidth: '880px',
          maxHeight: '92vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          color: '#ffffff',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85)',
          animation: 'slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            touchAction: 'manipulation',
          }}
          aria-label="Close trip details"
        >
          <X size={20} />
        </button>

        {/* Modal Banner Hero */}
        <div
          style={{
            position: 'relative',
            height: 'clamp(220px, 35vw, 320px)',
            backgroundImage: `url(${itinerary.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(to top, #0f1116 0%, rgba(15, 17, 22, 0.6) 60%, rgba(15, 17, 22, 0.2) 100%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(1rem, 3vw, 1.75rem)',
              left: 'clamp(1rem, 3vw, 2rem)',
              right: 'clamp(1rem, 3vw, 2rem)',
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-pink-accent)',
                fontWeight: 700,
                marginBottom: '0.35rem',
              }}
            >
              <MapPin size={13} />
              {itinerary.country} • {itinerary.tag}
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: 'clamp(1.35rem, 3.8vw, 2.3rem)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                lineHeight: 1.15,
                textTransform: 'uppercase',
                margin: '0 0 0.35rem 0',
              }}
            >
              {itinerary.title}
            </h2>

            <p
              style={{
                fontSize: '0.86rem',
                color: 'rgba(255, 255, 255, 0.85)',
                margin: 0,
                lineHeight: 1.45,
              }}
            >
              {itinerary.tagline}
            </p>
          </div>
        </div>

        {/* Key Trip Metrics Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
            gap: '1rem',
            padding: '1.1rem clamp(1rem, 3vw, 2rem)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', display: 'block' }}>
              Duration
            </span>
            <strong style={{ fontSize: '0.96rem', color: '#ffffff' }}>{itinerary.nights} Nights / {itinerary.nights + 1} Days</strong>
          </div>

          <div>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', display: 'block' }}>
              From Guide Price
            </span>
            <strong style={{ fontSize: '0.96rem', color: 'var(--color-pink-accent)' }}>{itinerary.startingPrice}</strong>
          </div>

          <div>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', display: 'block' }}>
              Ideal Travelling Window
            </span>
            <strong style={{ fontSize: '0.92rem', color: '#ffffff' }}>{itinerary.bestSeason}</strong>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: 'clamp(1.25rem, 3.5vw, 2rem)' }}>
          {/* Narrative Overview */}
          <div style={{ marginBottom: '2rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '0.65rem',
              }}
            >
              The Experience Overview
            </h3>
            <p
              style={{
                fontSize: '0.92rem',
                lineHeight: 1.8,
                color: 'rgba(255, 255, 255, 0.78)',
              }}
            >
              {itinerary.description}
            </p>
          </div>

          {/* Curated Highlights */}
          <div style={{ marginBottom: '2rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '0.85rem',
              }}
            >
              Curated Highlights & Privileged Access
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.75rem' }}>
              {itinerary.highlights.map((hl, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    padding: '0.85rem',
                    borderRadius: '3px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <CheckCircle size={16} style={{ color: 'var(--color-pink-accent)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.5 }}>
                    {hl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Day-by-Day Journey Outline */}
          <div style={{ marginBottom: '2rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ffffff',
                marginBottom: '1rem',
              }}
            >
              Illustrative Journey Outline
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {itinerary.itineraryOutline.map((dayItem, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    padding: '0.9rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderLeft: '2px solid var(--color-pink-accent)',
                    borderRadius: '0 2px 2px 0',
                  }}
                  className="itinerary-day-row"
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      color: 'var(--color-pink-accent)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {dayItem.day} — {dayItem.title}
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)', margin: 0, lineHeight: 1.6 }}>
                    {dayItem.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row (Responsive on mobile) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '1.25rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
            className="itinerary-modal-footer"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.78rem' }}>
              <Shield size={16} style={{ color: 'var(--color-teal-accent)', flexShrink: 0 }} />
              100% Tailor-made & fully flexible to your private preferences
            </div>

            <button
              onClick={() => {
                onClose();
                onCustomiseTrip(itinerary);
              }}
              className="btn-primary-pink itinerary-modal-action-btn"
              style={{ padding: '0.85rem 1.8rem' }}
            >
              <Sparkles size={14} /> CUSTOMISE THIS EXPEDITION
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .itinerary-modal-footer {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .itinerary-modal-action-btn {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};
