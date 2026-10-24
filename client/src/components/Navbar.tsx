import { useState, useEffect } from 'react';
import { Search, Phone, User, X, Sparkles, ChevronRight, Compass, Heart, LogOut, Lock, MessageCircle, Mail } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { logout, openLoginModal } from '../store/slices/authSlice';

interface NavbarProps {
  onGoHome?: () => void;
  onOpenEnquire: () => void;
  onOpenSearch: () => void;
  onOpenMenu?: () => void;
  onSelectDestinations: () => void;
  onSelectExperiences: () => void;
  onOpenAdmin: () => void;
}

export const Navbar = ({
  onGoHome,
  onOpenEnquire,
  onOpenSearch,
  onSelectDestinations,
  onSelectExperiences,
  onOpenAdmin,
}: NavbarProps) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when iOS full-screen mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  const closeMenuAnd = (callback: () => void) => {
    setMobileMenuOpen(false);
    callback();
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 110,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          paddingTop: 'max(0.25rem, var(--safe-top))',
        }}
      >
        <div
          className="container nav-main-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Left: Brand Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {/* Logo / Brand */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onGoHome) onGoHome();
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Endlesscape Home"
              style={{
                textDecoration: 'none',
                color: '#111215',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <picture>
                <source srcSet="/assets/images/logo-light.webp" type="image/webp" />
                <img
                  src="/assets/images/logo-light.png"
                  alt="Endlesscape"
                  style={{
                    height: 'clamp(30px, 3.8vw, 38px)',
                    width: 'auto',
                    maxWidth: '220px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </picture>
            </a>

            {/* Desktop Navigation Links */}
            <nav
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '1.75rem',
                marginLeft: '1.5rem',
              }}
              className="desktop-nav"
            >
              <button
                onClick={onOpenSearch}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#111215',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px',
                  transition: 'var(--transition-fast)',
                }}
                aria-label="Search destinations"
                title="Search destinations & experiences"
              >
                <Search size={18} strokeWidth={2.2} />
              </button>

              <button
                onClick={onSelectDestinations}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#111215',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  position: 'relative',
                  transition: 'var(--transition-fast)',
                }}
                className="nav-link nav-link-scrolled"
              >
                DESTINATIONS
              </button>

              <button
                onClick={onSelectExperiences}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#111215',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  transition: 'var(--transition-fast)',
                }}
                className="nav-link nav-link-scrolled"
              >
                EXPERIENCES
              </button>

              <a
                href="#philosophy"
                style={{
                  textDecoration: 'none',
                  color: '#111215',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 0',
                  transition: 'var(--transition-fast)',
                }}
                className="nav-link nav-link-scrolled"
              >
                OUR PHILOSOPHY
              </a>

              <a
                href="#itineraries"
                style={{
                  textDecoration: 'none',
                  color: '#111215',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 0',
                  transition: 'var(--transition-fast)',
                }}
                className="nav-link nav-link-scrolled"
              >
                ITINERARIES
              </a>
            </nav>
          </div>

          {/* Right: Phone Concierge, Admin Switcher & "ENQUIRE" Button */}
          <div className="nav-actions-cluster" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
            {/* Desktop WhatsApp & Phone Concierge */}
            <a
              href="https://wa.me/918130216668?text=Hello%20Endlesscape,%20I%20would%20like%20to%20enquire%20about%20a%20luxury%20tailor-made%20journey."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                color: '#111215',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                display: 'none',
                alignItems: 'center',
                gap: '0.45rem',
                transition: 'var(--transition-fast)',
                marginRight: '0.5rem',
              }}
              className="desktop-phone"
              title="Chat with Endlesscape Concierge on WhatsApp"
            >
              <MessageCircle size={14} style={{ color: '#25D366' }} />
              +91 8130216668
            </a>

            {/* Admin Concierge Portal Switcher (Desktop - Only visible when logged in as admin) */}
            {isAuthenticated && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                <button
                  onClick={onOpenAdmin}
                  style={{
                    background: 'var(--color-pink-soft)',
                    border: '1px solid var(--color-pink-accent)',
                    color: 'var(--color-pink-accent)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    display: 'none',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.25s ease',
                  }}
                  className="desktop-admin-btn"
                  title="Open Concierge Admin Dashboard"
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-pink-accent)',
                      display: 'inline-block',
                    }}
                  />
                  ADMIN SUITE
                </button>
                <button
                  onClick={() => dispatch(logout())}
                  style={{
                    background: '#f4f2ee',
                    border: '1px solid #e2ded5',
                    color: '#555555',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.7rem',
                    padding: '0.45rem 0.65rem',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    display: 'none',
                    alignItems: 'center',
                    gap: '0.3rem',
                    transition: 'all 0.25s ease',
                  }}
                  className="desktop-admin-btn"
                  title="Logout from Concierge Suite"
                >
                  <LogOut size={12} />
                </button>
              </div>
            )}

            {/* Mobile Quick Search Glass Button */}
            <button
              onClick={onOpenSearch}
              className={`mobile-search-btn ${isScrolled ? 'scrolled' : ''}`}
              aria-label="Search destinations"
              title="Search destinations & experiences"
            >
              <Search size={16} strokeWidth={2.2} />
            </button>

            {/* Signature Luxury Warm Peach ENQUIRE Pill Button */}
            <button
              onClick={onOpenEnquire}
              className="nav-enquire-btn"
              aria-label="Enquire now"
            >
              <Sparkles size={12} className="enquire-sparkle" />
              <span className="enquire-text-desktop">ENQUIRE NOW</span>
              <span className="enquire-text-mobile">ENQUIRE</span>
            </button>

            {/* Luxury 2-Line Editorial Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`mobile-toggle-btn ${isScrolled ? 'scrolled' : ''}`}
              aria-label="Open mobile menu"
              title="Menu"
            >
              <span className="menu-line menu-line-top" />
              <span className="menu-line menu-line-bottom" />
            </button>
          </div>
        </div>
      </header>

      {/* iOS Full-Screen Luxury Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            minHeight: '100dvh',
            zIndex: 999,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingTop: 'max(1.2rem, var(--safe-top))',
            paddingBottom: 'max(1.5rem, var(--safe-bottom))',
            color: '#111215',
            animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Top Bar inside Drawer: Brand + Close Button */}
          <div
            style={{
              padding: '0 1.25rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #eae6de',
            }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (onGoHome) onGoHome();
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
              aria-label="Endlesscape Home"
            >
              <picture>
                <source srcSet="/assets/images/logo-light.webp" type="image/webp" />
                <img
                  src="/assets/images/logo-light.png"
                  alt="Endlesscape"
                  style={{
                    height: '32px',
                    width: 'auto',
                    maxWidth: '190px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </picture>
            </a>

            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#f3f1ec',
                border: '1px solid #ded9ce',
                color: '#111215',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Search Bar inside Menu */}
          <div style={{ padding: '1.25rem' }}>
            <button
              onClick={() => closeMenuAnd(onOpenSearch)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: '#f7f6f2',
                border: '1px solid #ded9ce',
                borderRadius: '6px',
                padding: '0.9rem 1rem',
                color: '#555762',
                fontSize: '0.86rem',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <Search size={18} style={{ color: 'var(--color-pink-accent)' }} />
              <span>Search destinations, feelings, itineraries...</span>
            </button>
          </div>

          {/* Editorial Navigation Links */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0.5rem 1.25rem',
              flex: 1,
            }}
          >
            {[
              {
                title: 'DESTINATIONS',
                subtitle: 'Explore 100+ worldwide expedition collection',
                icon: Compass,
                action: () => closeMenuAnd(onSelectDestinations),
              },
              {
                title: 'EXPERIENCES & TRAVEL STYLES',
                subtitle: 'Couples, multi-gen families, solo odysseys',
                icon: Heart,
                action: () => closeMenuAnd(onSelectExperiences),
              },
              {
                title: 'CURATED ITINERARIES',
                subtitle: 'Inspirational tailored routes & private charters',
                icon: Sparkles,
                action: () => {
                  closeMenuAnd(() => {
                    const el = document.getElementById('itineraries');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  });
                },
              },
              {
                title: 'OUR PHILOSOPHY',
                subtitle: 'Every journey starts with a feeling',
                icon: Compass,
                action: () => {
                  closeMenuAnd(() => {
                    const el = document.getElementById('philosophy');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  });
                },
              },
              ...(isAuthenticated
                ? [
                    {
                      title: 'CONCIERGE ADMIN PORTAL',
                      subtitle: 'Manage client enquiries & edit itineraries',
                      icon: User,
                      action: () => closeMenuAnd(onOpenAdmin),
                    },
                    {
                      title: 'LOGOUT CONCIERGE',
                      subtitle: 'End secure administrative session',
                      icon: LogOut,
                      action: () => closeMenuAnd(() => dispatch(logout())),
                    },
                  ]
                : [
                    {
                      title: 'STAFF ACCESS',
                      subtitle: 'Concierge administrative authentication',
                      icon: Lock,
                      action: () => closeMenuAnd(() => dispatch(openLoginModal())),
                    },
                  ]),
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #f0eee8',
                    padding: '1.1rem 0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        backgroundColor: '#fff4ec',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-pink-accent)',
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          color: '#111215',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#666874', marginTop: '2px' }}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} style={{ color: '#999ba4' }} />
                </button>
              );
            })}
          </div>

          {/* Bottom Concierge Quick Access & Peach CTA */}
          <div
            style={{
              padding: '1.5rem 1.25rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              borderTop: '1px solid #eae6de',
            }}
          >
            {/* Direct WhatsApp Inquiry */}
            <a
              href="https://wa.me/918130216668?text=Hello%20Endlesscape,%20I%20would%20like%20to%20enquire%20about%20a%20luxury%20tailor-made%20journey."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                color: '#0b5327',
                backgroundColor: '#eefaf1',
                border: '1px solid #c2e8cd',
                borderRadius: '4px',
                padding: '0.8rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                fontSize: '0.82rem',
                fontWeight: 600,
              }}
            >
              <MessageCircle size={16} style={{ color: '#25D366' }} />
              WhatsApp Inquiry (+91 8130216668)
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <a
                href="tel:+918130216668"
                style={{
                  textDecoration: 'none',
                  color: '#111215',
                  backgroundColor: '#f8f7f4',
                  border: '1px solid #ded9ce',
                  borderRadius: '4px',
                  padding: '0.7rem 0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                }}
              >
                <Phone size={13} style={{ color: 'var(--color-pink-accent)' }} />
                Call Direct
              </a>

              <a
                href="mailto:endlesscape949@gmail.com"
                style={{
                  textDecoration: 'none',
                  color: '#111215',
                  backgroundColor: '#f8f7f4',
                  border: '1px solid #ded9ce',
                  borderRadius: '4px',
                  padding: '0.7rem 0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                }}
              >
                <Mail size={13} style={{ color: 'var(--color-pink-accent)' }} />
                Email Us
              </a>
            </div>

            <button
              onClick={() => closeMenuAnd(onOpenEnquire)}
              className="btn-primary-pink"
              style={{
                width: '100%',
                padding: '0.95rem 1.5rem',
                fontSize: '0.82rem',
                letterSpacing: '0.14em',
                boxShadow: '0 8px 24px rgba(240, 139, 88, 0.4)',
              }}
            >
              <Sparkles size={16} />
              START YOUR LUXURY JOURNEY
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nav-main-container {
          height: 60px;
        }

        .enquire-text-mobile { display: inline; }
        .enquire-text-desktop { display: none; }

        /* Mobile Search Glass Button */
        .mobile-search-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f4f2ee;
          border: 1px solid #ded9ce;
          color: #111215;
          cursor: pointer;
          touch-action: manipulation;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }
        .mobile-search-btn:active {
          transform: scale(0.92);
          background: #eae6de;
        }

        /* Luxury Warm Peach Enquire Pill Button */
        .nav-enquire-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          height: 36px;
          padding: 0 0.95rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #f08b58 0%, #e27a44 100%);
          color: #ffffff;
          border: none;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          touch-action: manipulation;
          box-shadow: 0 3px 14px rgba(240, 139, 88, 0.38);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nav-enquire-btn:active {
          transform: scale(0.94);
          box-shadow: 0 1px 6px rgba(240, 139, 88, 0.4);
        }
        .nav-enquire-btn:hover {
          background: linear-gradient(135deg, #f59a68 0%, #eb834d 100%);
        }

        /* Luxury 2-Line Editorial Hamburger */
        .mobile-toggle-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f4f2ee;
          border: 1px solid #ded9ce;
          cursor: pointer;
          touch-action: manipulation;
          padding: 0;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }
        .mobile-toggle-btn:active {
          transform: scale(0.92);
          background: #eae6de;
        }
        .mobile-toggle-btn .menu-line {
          display: block;
          height: 1.5px;
          border-radius: 1px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-toggle-btn .menu-line-top {
          width: 17px;
          background-color: #111215;
        }
        .mobile-toggle-btn .menu-line-bottom {
          width: 11px;
          background-color: var(--color-pink-accent);
        }
        .mobile-toggle-btn:hover .menu-line-bottom {
          width: 17px;
        }

        @media (min-width: 640px) {
          .nav-main-container {
            height: 68px;
          }
          .enquire-text-mobile { display: none; }
          .enquire-text-desktop { display: inline; }
          .nav-enquire-btn {
            height: 38px;
            padding: 0 1.15rem;
          }
        }

        @media (min-width: 960px) {
          .nav-main-container {
            height: 74px;
          }
          .desktop-nav { display: flex !important; }
          .desktop-phone { display: flex !important; }
          .desktop-admin-btn { display: inline-flex !important; }
          .mobile-search-btn { display: none !important; }
          .mobile-toggle-btn { display: none !important; }
          .nav-enquire-btn {
            height: 42px;
            padding: 0 1.4rem;
            font-size: 0.74rem;
            border-radius: 3px;
          }
        }

        .nav-link:hover, .nav-link-scrolled:hover {
          color: var(--color-pink-accent) !important;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: var(--color-pink-accent);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }

        @media (max-width: 380px) {
          .enquire-sparkle {
            display: none;
          }
          .nav-enquire-btn {
            padding: 0 0.75rem;
            font-size: 0.65rem;
            letter-spacing: 0.1em;
          }
        }
      `}</style>
    </>
  );
};
