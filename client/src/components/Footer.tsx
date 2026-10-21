import { useState } from 'react';
import type { FormEvent } from 'react';
import { Phone, Mail, Sparkles, Shield, ArrowUp, MessageCircle } from 'lucide-react';
import { useAppDispatch } from '../store/store';
import { openLoginModal } from '../store/slices/authSlice';


export const Footer = () => {
  const dispatch = useAppDispatch();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#faf9f6',
        color: '#111215',
        borderTop: '1px solid #eae6de',
        padding: 'clamp(3rem, 6vw, 5rem) 0 max(4.5rem, calc(3.5rem + var(--safe-bottom))) 0',
        position: 'relative',
      }}
    >
      <div className="container" style={{ maxWidth: '1440px' }}>
        {/* Top Newsletter & Manifesto Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2.5rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid #eae6de',
            marginBottom: '3.5rem',
            alignItems: 'center',
          }}
          className="newsletter-strip"
        >
          <div>
            <span
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-pink-accent)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              CURATED DISPATCHES
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.35rem, 3.5vw, 1.7rem)',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#111215',
                marginBottom: '0.5rem',
              }}
            >
              STORIES FROM UNTAMED HORIZONS
            </h3>
            <p
              style={{
                fontSize: '0.86rem',
                color: '#555762',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Privileged access, seasonal expedition reveals, and editorial journeys delivered straight to your inbox monthly.
            </p>
          </div>

          <div>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    flex: 1,
                    minHeight: '44px',
                    padding: '0.8rem 1.1rem',
                    backgroundColor: '#ffffff',
                    border: '1px solid #ded9ce',
                    color: '#111215',
                    borderRadius: '3px',
                    fontSize: '16px', // iOS zoom prevention
                    outline: 'none',
                    width: '100%',
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary-pink"
                  style={{
                    padding: '0.8rem 1.6rem',
                    flexShrink: 0,
                    minHeight: '44px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  SUBSCRIBE
                </button>
              </form>
            ) : (
              <div
                style={{
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  border: '1px solid var(--color-teal-accent)',
                  color: 'var(--color-teal-accent)',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '3px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                Welcome to the Endlesscape circle. Your private dispatch has been queued.
              </div>
            )}
          </div>
        </div>

        {/* Multi-Column Luxury Navigation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Brand Info & Concierge */}
          <div style={{ maxWidth: '320px' }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              style={{
                display: 'inline-block',
                marginBottom: '1.25rem',
                textDecoration: 'none',
              }}
              aria-label="Endlesscape Home"
            >
              <picture>
                <source srcSet="/assets/images/logo-light.webp" type="image/webp" />
                <img
                  src="/assets/images/logo-light.png"
                  alt="Endlesscape"
                  style={{
                    height: '38px',
                    width: 'auto',
                    maxWidth: '220px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </picture>
            </a>
            <p
              style={{
                fontSize: '0.82rem',
                color: '#555762',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
              }}
            >
              Crafting extraordinary, fully tailor-made bespoke journeys and private luxury expeditions across 100+ global horizons.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a
                href="https://wa.me/918130216668?text=Hello%20Endlesscape,%20I%20would%20like%20to%20enquire%20about%20a%20luxury%20bespoke%20journey."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#111215',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 600,
                  padding: '2px 0',
                  touchAction: 'manipulation',
                }}
              >
                <MessageCircle size={14} style={{ color: '#25D366' }} />
                +91 8130216668 (WhatsApp Inquiry)
              </a>
              <a
                href="tel:+918130216668"
                style={{
                  color: '#111215',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 600,
                  padding: '2px 0',
                  touchAction: 'manipulation',
                }}
              >
                <Phone size={13} style={{ color: 'var(--color-pink-accent)' }} />
                +91 8130216668 (Direct Line)
              </a>
              <a
                href="mailto:endlesscape949@gmail.com"
                style={{
                  color: '#555762',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '2px 0',
                  touchAction: 'manipulation',
                }}
              >
                <Mail size={13} style={{ color: 'var(--color-pink-accent)' }} />
                endlesscape949@gmail.com
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '1.1rem',
                color: '#111215',
              }}
            >
              DESTINATIONS
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['Iceland & Arctic Fjords', 'Greece & Cyclades', 'Japan & Kyoto Machiya', 'Galápagos & Ecuador', 'Namibia & Skeleton Coast', 'Chile & Argentine Patagonia', 'Swiss Alpine Retreats'].map((d) => (
                <li key={d}>
                  <a
                    href="#itineraries"
                    style={{
                      color: '#555762',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      display: 'inline-block',
                      padding: '2px 0',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-pink-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#555762')}
                  >
                    {d}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences & Styles */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '1.1rem',
                color: '#111215',
              }}
            >
              EXPERIENCES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['Honeymoon & Romantic Solitude', 'Multi-Generational Family Expeditions', 'Private Superyacht Charters', 'Fly-In African Safaris', 'Michelin Culinary Journeys', 'Polar & Glacial Adventures'].map((e) => (
                <li key={e}>
                  <a
                    href="#itineraries"
                    style={{
                      color: '#555762',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      display: 'inline-block',
                      padding: '2px 0',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-pink-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#555762')}
                  >
                    {e}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Private Offices */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '1.1rem',
                color: '#111215',
              }}
            >
              OUR PRIVATE STUDIOS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.82rem', color: '#555762' }}>
              <div>
                <strong style={{ color: '#111215', display: 'block', marginBottom: '2px' }}>London Mayfair</strong>
                <span>14 Berkeley Square, Mayfair, London W1J 6BT</span>
              </div>
              <div>
                <strong style={{ color: '#111215', display: 'block', marginBottom: '2px' }}>New York Madison</strong>
                <span>650 Madison Avenue, New York, NY 10022</span>
              </div>
              <div>
                <strong style={{ color: '#111215', display: 'block', marginBottom: '2px' }}>Tokyo Ginza</strong>
                <span>Ginza Six Tower 11F, Chuo-ku, Tokyo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Protection Badges & Certifications Strip */}
        <div
          style={{
            borderTop: '1px solid #eae6de',
            paddingTop: '1.75rem',
            paddingBottom: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.74rem', color: '#555762' }}>
              <Shield size={14} style={{ color: 'var(--color-teal-accent)' }} />
              ATOL Protected (No. 9840)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.74rem', color: '#555762' }}>
              <Shield size={14} style={{ color: 'var(--color-teal-accent)' }} />
              ABTA Bonded Member (Y6128)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.74rem', color: '#555762' }}>
              <Sparkles size={14} style={{ color: 'var(--color-gold-accent)' }} />
              Virtuoso Member Luxury Travel
            </div>
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: '#ffffff',
              border: '1px solid #ded9ce',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              color: '#111215',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              touchAction: 'manipulation',
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: '1px solid #eae6de',
            paddingTop: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.72rem',
            color: '#787a85',
          }}
        >
          <span>© 2026 Endlesscape Luxury Travel Ltd. All Rights Reserved.</span>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#" style={{ color: '#787a85', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#787a85', textDecoration: 'none' }}>Terms & Booking Conditions</a>
            <a href="#" style={{ color: '#787a85', textDecoration: 'none' }}>Cookie Preferences</a>
            <button
              onClick={() => dispatch(openLoginModal())}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#787a85',
                textDecoration: 'none',
                fontSize: '0.72rem',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-pink-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#787a85')}
              title="Concierge Portal Authentication"
            >
              Staff Access
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .newsletter-form {
          display: flex;
          gap: 0.5rem;
          width: 100%;
        }

        @media (max-width: 580px) {
          .newsletter-form {
            flex-direction: column !important;
          }
          .newsletter-form input {
            width: 100% !important;
          }
          .newsletter-form button {
            width: 100% !important;
          }
        }
      `}</style>
    </footer>
  );
};
