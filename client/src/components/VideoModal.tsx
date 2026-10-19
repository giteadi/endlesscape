import { X, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnquire: () => void;
}

export const VideoModal = ({ isOpen, onClose, onEnquire }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 250,
        backgroundColor: 'rgba(5, 6, 8, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.5rem, 3vw, 1.5rem)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '920px',
          backgroundColor: '#0a0b0e',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          animation: 'slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '0.85rem',
            right: '0.85rem',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            touchAction: 'manipulation',
          }}
          aria-label="Close video"
        >
          <X size={18} />
        </button>

        {/* Cinematic Video Player Container */}
        <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000000' }}>
          <video
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            src="/assets/videos/hero-desktop.mp4"
            poster="/assets/images/hero-poster.jpg"
            controls
            autoPlay
            playsInline
          />
        </div>


        {/* Video Footer Caption */}
        <div
          style={{
            padding: '1.25rem clamp(1rem, 3vw, 2rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
          className="video-modal-footer"
        >
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#ffffff',
                margin: '0 0 0.25rem 0',
                textTransform: 'uppercase',
              }}
            >
              ENDLESSCAPE: THE ART OF TAILOR-MADE TRAVEL
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
              An intimate look into how our private journey architects curate feelings into unforgettable realities.
            </p>
          </div>

          <button
            onClick={() => {
              onClose();
              onEnquire();
            }}
            className="btn-primary-pink video-modal-btn"
            style={{ padding: '0.65rem 1.4rem' }}
          >
            <Sparkles size={14} /> SPEAK WITH A FOUNDER
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .video-modal-footer {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .video-modal-btn {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};
