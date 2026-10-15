import { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface HeroProps {
  onExploreTrips: () => void;
  onPlanTrip: () => void;
}

export const Hero = ({ onExploreTrips, onPlanTrip }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Responsive video source: 1920x1080 widescreen for desktop, 720x1280 portrait for mobile
  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      const isMob = window.innerWidth <= 768;
      setIsMobileScreen(isMob);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const videoSrc = isMobileScreen ? '/assets/videos/hero-mobile.mp4' : '/assets/videos/hero-desktop.mp4';
  const cdnFallbackSrc = isMobileScreen
    ? 'https://media.blacktomato.com/2025/02/black-tomato-mob-home.mp4'
    : 'https://media.blacktomato.com/2025%2F02%2Fblack-tomato-homepage.mp4';

  // Autoplay handler on mount or source change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented or deferred:', err);
      });
    }
  }, [videoSrc]);

  const toggleSound = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        height: '100svh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 'calc(var(--safe-top) + 80px)',
        paddingBottom: 'calc(var(--safe-bottom) + 50px)',
        backgroundColor: '#08090b',
      }}
      className="hero-section"
    >
      {/* 1. Cinematic Luxury Video Background (1920x1080 Widescreen on Desktop, 720x1280 on Mobile) */}
      <video
        ref={videoRef}
        key={videoSrc}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        poster="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2000&q=85"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={cdnFallbackSrc} type="video/mp4" />
      </video>

      {/* 2. Atmospheric Vignette & Contrast Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          background:
            'radial-gradient(circle at center, rgba(8, 9, 11, 0.18) 0%, rgba(8, 9, 11, 0.6) 100%), linear-gradient(to bottom, rgba(8, 9, 11, 0.5) 0%, rgba(8, 9, 11, 0.05) 40%, rgba(8, 9, 11, 0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* 3. Center Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '920px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Subtle Luxury Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.95rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            marginBottom: '1.25rem',
            fontSize: 'clamp(0.62rem, 1.8vw, 0.72rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Sparkles size={12} style={{ color: 'var(--color-pink-accent)' }} />
          Bespoke Journeys Designed Around Feeling
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: 'clamp(2.1rem, 7.5vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            lineHeight: 1.08,
            color: '#ffffff',
            textTransform: 'uppercase',
            margin: '0 0 1rem 0',
            textShadow: '0 4px 28px rgba(0, 0, 0, 0.75)',
          }}
        >
          THE LUXURY TRAVEL EXPERTS
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.72rem, 2vw, 0.92rem)',
            fontWeight: 500,
            letterSpacing: 'clamp(0.12em, 1.2vw, 0.22em)',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.88)',
            marginBottom: '2rem',
            lineHeight: 1.5,
            maxWidth: '680px',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.65)',
          }}
        >
          TAILOR-MADE TRIPS, AWARD WINNING SERVICE. EST. 2026.
        </p>

        {/* Dual CTA Buttons (Responsive row on desktop, full-width touch stack on mobile) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            width: '100%',
          }}
          className="hero-cta-group"
        >
          <button onClick={onExploreTrips} className="btn-outline-white hero-btn">
            EXPLORE OUR TRIPS
          </button>
          <button onClick={onPlanTrip} className="btn-solid-dark hero-btn">
            PLAN MY TRIP
          </button>
        </div>

        {/* Live Video Ambient Controls Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '2.5rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '999px',
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-pink-accent)',
                animation: 'pulse 1.8s infinite',
              }}
            />
            CINEMATIC EXPEDITIONS
          </span>

          <span style={{ width: '1px', height: '12px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '2px 4px',
              touchAction: 'manipulation',
            }}
            title={isMuted ? 'Turn on sound' : 'Mute sound'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} color="var(--color-pink-accent)" />}
            <span>{isMuted ? 'SOUND' : 'AUDIO ON'}</span>
          </button>

          {/* Play/Pause toggle */}
          <button
            onClick={togglePlay}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
              touchAction: 'manipulation',
            }}
            title={isPlaying ? 'Pause film' : 'Play film'}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <a
        href="#philosophy"
        style={{
          position: 'absolute',
          bottom: 'max(1.2rem, var(--safe-bottom))',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textDecoration: 'none',
          color: 'rgba(255, 255, 255, 0.75)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          transition: 'var(--transition-fast)',
        }}
        className="scroll-cue"
      >
        <span>SCROLL</span>
        <div
          style={{
            width: '1px',
            height: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              backgroundColor: 'var(--color-pink-accent)',
              animation: 'floatIndicator 1.8s infinite',
            }}
          />
        </div>
      </a>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
          100% { opacity: 0.4; transform: scale(0.9); }
        }

        @media (max-width: 640px) {
          .hero-section {
            min-height: 92vh;
          }
          .hero-cta-group {
            flex-direction: column !important;
            max-width: 290px;
          }
          .hero-btn {
            width: 100% !important;
          }
          .scroll-cue {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
