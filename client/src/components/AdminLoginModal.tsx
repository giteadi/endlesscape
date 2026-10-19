import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loginAdmin, closeLoginModal, clearAuthError } from '../store/slices/authSlice';
import { setPageState } from '../store/slices/uiSlice';

export const AdminLoginModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoginModalOpen, isLoading, error } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoginModalOpen) {
      const timer = setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoginModalOpen]);


  const handleClose = useCallback(() => {
    setPassword('');
    dispatch(clearAuthError());
    dispatch(closeLoginModal());
  }, [dispatch]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLoginModalOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoginModalOpen, handleClose]);


  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || !username.trim()) return;

    const result = await dispatch(loginAdmin({ username, password }));
    if (loginAdmin.fulfilled.match(result)) {
      setPassword('');
      // Transition directly to Admin Panel upon successful login
      dispatch(setPageState('admin'));
    }
  };


  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(5, 6, 8, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-heading"
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#0c0e12',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '4px',
          padding: '2.5rem 2.2rem',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(255, 0, 127, 0.08)',
          position: 'relative',
          animation: 'fadeInModal 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.7)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <X size={15} />
        </button>

        {/* Brand Crest & Heading */}
        <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              margin: '0 auto 1rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 0, 127, 0.12)',
              border: '1px solid rgba(255, 0, 127, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-pink-accent)',
            }}
          >
            <Lock size={20} />
          </div>

          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-pink-accent)',
              fontWeight: 700,
              marginBottom: '0.4rem',
            }}
          >
            Restricted Access
          </div>

          <h2
            id="admin-login-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: '0 0 0.5rem 0',
            }}
          >
            CONCIERGE PORTAL LOGIN
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '0.92rem',
              color: 'rgba(255, 255, 255, 0.65)',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Authenticate to access the Endlesscape operations & itinerary suite.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '3px',
              padding: '0.65rem 0.85rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.78rem',
              color: '#fca5a5',
            }}
          >
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: '1.1rem' }}>
            <label
              htmlFor="admin-username"
              style={{
                display: 'block',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '0.45rem',
              }}
            >
              Concierge Username
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '3px',
                  color: '#ffffff',
                  padding: '0.75rem 1rem 0.75rem 2.4rem',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-sans)',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-pink-accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)')}
              />
              <User
                size={15}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="admin-password"
              style={{
                display: 'block',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '0.45rem',
              }}
            >
              Access Key / Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                ref={passwordInputRef}
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '3px',
                  color: '#ffffff',
                  padding: '0.75rem 2.6rem 0.75rem 2.4rem',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-sans)',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-pink-accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)')}
              />
              <Lock
                size={15}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.45rem',
                fontSize: '0.68rem',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              <span>Default key: <code style={{ color: 'var(--color-pink-accent)' }}>endlesscape2026</code></span>
              <span>256-Bit Encrypted</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: 'var(--color-pink-accent)',
              color: '#ffffff',
              border: 'none',
              padding: '0.85rem',
              borderRadius: '2px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'opacity 0.2s ease, transform 0.15s ease',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="spin-animation" />
                VERIFYING CONCIERGE ACCESS...
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                ENTER CONCIERGE SUITE
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeInModal {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
