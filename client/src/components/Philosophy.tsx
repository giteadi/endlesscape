import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData';

interface PhilosophyProps {
  onGetInTouch: () => void;
}

export const Philosophy = ({ onGetInTouch }: PhilosophyProps) => {
  return (
    <section
      id="philosophy"
      style={{
        backgroundColor: '#faf8f5',
        color: '#1a1b1e',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="philosophy-section"
    >
      {/* Subtle Topographical Elevation Line Watermark */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '550px',
          height: '550px',
          opacity: 0.045,
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px), repeating-radial-gradient(circle, transparent 0, transparent 20px, #000 21px, #000 22px)`,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Editorial Text Block */}
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* Main Statement Title */}
          <h2
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: 'clamp(1.85rem, 4.8vw, 3.2rem)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#0e0f12',
              lineHeight: 1.15,
              marginBottom: '1.75rem',
            }}
          >
            EVERY JOURNEY STARTS WITH A FEELING
          </h2>

          {/* Editorial Narrative Copy */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
              lineHeight: 1.85,
              color: '#4a4d55',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              textAlign: 'center',
              fontWeight: 400,
            }}
          >
            <p>
              The world is vast, full of wonders. But information engulfs us. See this, do that, don’t miss this.
              It seems the more choice there is, the more overwhelmed we feel. What’s more, you’re never asked{' '}
              <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.18em', color: '#111215' }}>
                how you want to feel
              </em>
              .
            </p>
            <p>
              That’s not us. Endlesscape is a tailor-made luxury travel company that designs fully personalised
              itineraries – not templates, not off-the-shelf tours. Whether you’re a couple seeking adventure,
              a multi-generational family exploring together, or a solo traveller chasing something extraordinary,
              we craft every detail around you.
            </p>
            <p>
              For over two decades, our team has been recognised as one of the world’s leading luxury travel planners —
              featured in Modern Luxury’s ‘Best of Luxury Travel’ Awards — and trusted to deliver tailor-made journeys
              across 100 destinations.
            </p>
            <p style={{ fontWeight: 600, color: '#111215', fontSize: 'clamp(0.98rem, 1.6vw, 1.12rem)' }}>
              So let’s begin. Let’s do something remarkable.
            </p>
          </div>

          {/* Centered Black Button */}
          <div style={{ marginTop: '2.25rem', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
            <button onClick={onGetInTouch} className="btn-solid-black" style={{ minWidth: '200px' }}>
              GET IN TOUCH
            </button>
          </div>
        </div>

        {/* 4 Quotes Columns with Emerald/Teal Quotation Marks */}
        <div
          style={{
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            paddingTop: '3rem',
            marginBottom: '3rem',
          }}
          className="testimonials-grid"
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.45)',
                padding: '1.5rem 1.25rem',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.04)',
              }}
              className="testimonial-card"
            >
              {/* Turquoise/Emerald Quote Marks */}
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.5rem',
                  lineHeight: 1,
                  color: 'var(--color-teal-accent)',
                  fontWeight: 700,
                  marginBottom: '0.6rem',
                }}
              >
                “
              </span>

              {/* Bold Uppercase Quote Text */}
              <p
                style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  lineHeight: 1.45,
                  color: '#1a1b1f',
                  textTransform: 'uppercase',
                  marginBottom: '0.85rem',
                  flex: 1,
                }}
              >
                {item.quote}
              </p>

              {/* Author & Destination */}
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '0.92rem',
                  color: 'var(--color-teal-accent)',
                  fontWeight: 600,
                }}
              >
                {item.author}, {item.destination}
              </p>
            </div>
          ))}
        </div>

        {/* Trustpilot 5 Stars Badge */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            paddingBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                style={{
                  backgroundColor: '#4a4d52',
                  width: '24px',
                  height: '24px',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Star size={14} fill="#ffffff" stroke="#ffffff" />
              </div>
            ))}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: '#1a1b1f',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginTop: '4px',
            }}
          >
            ★ Trustpilot
          </span>
        </div>
      </div>

      <style>{`
        .philosophy-section {
          padding: 6rem 0 5rem 0;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
        }
        @media (max-width: 640px) {
          .philosophy-section {
            padding: 3.5rem 0 3rem 0;
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .testimonial-card {
            padding: 1.25rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};
