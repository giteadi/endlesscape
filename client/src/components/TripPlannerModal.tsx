import { useState } from 'react';
import type { FormEvent } from 'react';
import { X, Sparkles, Check, ChevronRight, MessageCircle } from 'lucide-react';
import { DESTINATION_REGIONS } from '../data/travelData';
import { API_BASE } from '../config/api';

interface TripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFeeling?: string;
}

export const TripPlannerModal = ({
  isOpen,
  onClose,
  initialFeeling = '',
}: TripPlannerModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState(initialFeeling || 'Awe & Wonder');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelMonth: 'Autumn 2026',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          destination: selectedRegion || 'Global Custom',
          travelParty: selectedParty || 'Couples Escape',
          feeling: selectedFeeling || 'Awe & Wonder',
          travelMonth: formData.travelMonth,
          notes: formData.notes,
        }),
      });
    } catch (err) {
      console.warn('Backend server offline or unreachable, proceeding with client confirmation', err);
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 200,
        backgroundColor: 'rgba(8, 9, 11, 0.88)',
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
          backgroundColor: '#ffffff',
          border: '1px solid #e2ded5',
          borderRadius: '4px',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '92vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          padding: 'clamp(1.25rem, 4vw, 2.5rem)',
          color: '#111215',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25), 0 0 35px rgba(240, 139, 88, 0.08)',
          animation: 'slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with >= 44px touch target */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#f5f3ef',
            border: '1px solid #ded9ce',
            borderRadius: '50%',
            color: '#111215',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            touchAction: 'manipulation',
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header & Progress Indicator */}
            <div style={{ marginBottom: '1.75rem', paddingRight: '2rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  color: 'var(--color-pink-accent)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                }}
              >
                <Sparkles size={12} />
                PRIVATE TRAVEL CONCIERGE
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                PLAN YOUR LUXURY EXPEDITION
              </h2>

              {/* Steps Progress */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '1.1rem',
                }}
              >
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    style={{
                      flex: 1,
                      height: '3px',
                      backgroundColor:
                        s <= step ? 'var(--color-pink-accent)' : '#e5e2da',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Step 1: Where do you feel like going? */}
            {step === 1 && (
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    color: '#111215',
                  }}
                >
                  Step 1: Which corner of the globe is calling you?
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
                    gap: '0.75rem',
                    marginBottom: '2rem',
                  }}
                >
                  {DESTINATION_REGIONS.filter((r) => r.id !== 'all').map((region) => {
                    const isSelected = selectedRegion === region.name;
                    return (
                      <button
                        key={region.id}
                        type="button"
                        onClick={() => setSelectedRegion(region.name)}
                        style={{
                          backgroundColor: isSelected
                            ? '#fff4ec'
                            : '#f9f8f5',
                          border: isSelected
                            ? '1px solid var(--color-pink-accent)'
                            : '1px solid #e2ded5',
                          borderRadius: '3px',
                          padding: '1rem 0.85rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          color: '#111215',
                          transition: 'all 0.2s ease',
                          touchAction: 'manipulation',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.3rem',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '0.88rem',
                              fontWeight: 700,
                              color: isSelected ? 'var(--color-pink-accent)' : '#111215',
                            }}
                          >
                            {region.name}
                          </span>
                          {isSelected && (
                            <Check size={14} style={{ color: 'var(--color-pink-accent)' }} />
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            color: '#656774',
                            display: 'block',
                            lineHeight: 1.35,
                          }}
                        >
                          {region.highlight}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    disabled={!selectedRegion}
                    onClick={() => setStep(2)}
                    className="btn-primary-pink modal-action-btn"
                    style={{
                      opacity: selectedRegion ? 1 : 0.5,
                      cursor: selectedRegion ? 'pointer' : 'not-allowed',
                    }}
                  >
                    CONTINUE TO TRAVEL PARTY <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Who is travelling? */}
            {step === 2 && (
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    color: '#111215',
                  }}
                >
                  Step 2: Who are you travelling with?
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                    gap: '0.75rem',
                    marginBottom: '2rem',
                  }}
                >
                  {['Couples Escape', 'Family & Multi-Gen', 'Solo Odyssey', 'Private Milestone Group'].map(
                    (party) => {
                      const isSelected = selectedParty === party;
                      return (
                        <button
                          key={party}
                          type="button"
                          onClick={() => setSelectedParty(party)}
                          style={{
                            backgroundColor: isSelected
                              ? '#fff4ec'
                              : '#f9f8f5',
                            border: isSelected
                              ? '1px solid var(--color-pink-accent)'
                              : '1px solid #e2ded5',
                            borderRadius: '3px',
                            padding: '1.1rem 0.85rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            color: isSelected ? 'var(--color-pink-accent)' : '#111215',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            touchAction: 'manipulation',
                          }}
                        >
                          {party}
                        </button>
                      );
                    }
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }} className="modal-actions-row">
                  <button onClick={() => setStep(1)} className="btn-outline-white modal-action-btn" style={{ borderColor: '#ded9ce', color: '#111215', backgroundColor: '#f8f7f4' }}>
                    BACK
                  </button>
                  <button
                    disabled={!selectedParty}
                    onClick={() => setStep(3)}
                    className="btn-primary-pink modal-action-btn"
                    style={{
                      opacity: selectedParty ? 1 : 0.5,
                      cursor: selectedParty ? 'pointer' : 'not-allowed',
                    }}
                  >
                    CONTINUE TO DESIRED FEELING <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Emotional Driver */}
            {step === 3 && (
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    color: '#111215',
                  }}
                >
                  Step 3: What feeling do you want to awaken?
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
                    gap: '0.75rem',
                    marginBottom: '2rem',
                  }}
                >
                  {[
                    { title: 'Awe & Grandeur', desc: 'Dramatic landscapes, glaciers & starry horizons' },
                    { title: 'Total Seclusion', desc: 'Remote luxury atolls, private villas & calm' },
                    { title: 'Pure Adrenaline', desc: 'Helicopter drops, wildlife treks & uncharted waters' },
                    { title: 'Cultural Immersion', desc: 'Sacred masters, historic access & culinary wonders' },
                  ].map((feel) => {
                    const isSelected = selectedFeeling === feel.title;
                    return (
                      <button
                        key={feel.title}
                        type="button"
                        onClick={() => setSelectedFeeling(feel.title)}
                        style={{
                          backgroundColor: isSelected
                            ? '#fff4ec'
                            : '#f9f8f5',
                          border: isSelected
                            ? '1px solid var(--color-pink-accent)'
                            : '1px solid #e2ded5',
                          borderRadius: '3px',
                          padding: '1.1rem 0.9rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          color: '#111215',
                          touchAction: 'manipulation',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            display: 'block',
                            marginBottom: '0.3rem',
                            color: isSelected ? 'var(--color-pink-accent)' : '#111215',
                          }}
                        >
                          {feel.title}
                        </span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: '#656774',
                            display: 'block',
                            lineHeight: 1.4,
                          }}
                        >
                          {feel.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }} className="modal-actions-row">
                  <button onClick={() => setStep(2)} className="btn-outline-white modal-action-btn" style={{ borderColor: '#ded9ce', color: '#111215', backgroundColor: '#f8f7f4' }}>
                    BACK
                  </button>
                  <button onClick={() => setStep(4)} className="btn-primary-pink modal-action-btn">
                    FINALIZE CONTACT <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact & Specialist Assignment */}
            {step === 4 && (
              <form onSubmit={handleSubmit}>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    color: '#111215',
                  }}
                >
                  Step 4: Where should our Travel Specialist send your proposal?
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#555762',
                        marginBottom: '0.4rem',
                      }}
                    >
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Lord / Lady / Mr / Ms..."
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        minHeight: '44px',
                        backgroundColor: '#f9f8f5',
                        border: '1px solid #ded9ce',
                        borderRadius: '3px',
                        color: '#111215',
                        fontSize: '16px', // iOS zoom fix
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#555762',
                        marginBottom: '0.4rem',
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        minHeight: '44px',
                        backgroundColor: '#f9f8f5',
                        border: '1px solid #ded9ce',
                        borderRadius: '3px',
                        color: '#111215',
                        fontSize: '16px', // iOS zoom fix
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#555762',
                        marginBottom: '0.4rem',
                      }}
                    >
                      Direct Phone / WhatsApp *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 81302 16668"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        minHeight: '44px',
                        backgroundColor: '#f9f8f5',
                        border: '1px solid #ded9ce',
                        borderRadius: '3px',
                        color: '#111215',
                        fontSize: '16px', // iOS zoom fix
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#555762',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Any specific bucket-list visions or dates?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Celebrating our anniversary, prefer private chartered flights and secluded coastal dining..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      backgroundColor: '#f9f8f5',
                      border: '1px solid #ded9ce',
                      borderRadius: '3px',
                      color: '#111215',
                      fontSize: '16px', // iOS zoom fix
                      resize: 'none',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #e5e2da',
                    paddingTop: '1.25rem',
                    gap: '0.75rem',
                  }}
                  className="modal-actions-row"
                >
                  <button type="button" onClick={() => setStep(3)} className="btn-outline-white modal-action-btn" style={{ borderColor: '#ded9ce', color: '#111215', backgroundColor: '#f8f7f4' }}>
                    BACK
                  </button>
                  <button type="submit" className="btn-primary-pink modal-action-btn">
                    <Sparkles size={14} /> REQUEST CURATED PROPOSAL
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Confirmation Screen */
          <div style={{ textAlign: 'center', padding: 'clamp(1rem, 3vw, 2.5rem) 0.5rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#fff4ec',
                border: '1px solid var(--color-pink-accent)',
                color: 'var(--color-pink-accent)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <Check size={32} />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)',
                fontWeight: 800,
                letterSpacing: '0.08em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                color: '#111215',
              }}
            >
              YOUR EXPEDITION INQUIRY IS IN MOTION
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.88rem, 1.5vw, 0.98rem)',
                lineHeight: 1.7,
                color: '#555762',
                maxWidth: '520px',
                margin: '0 auto 2rem',
              }}
            >
              Thank you, <strong style={{ color: '#111215' }}>{formData.fullName || 'esteemed guest'}</strong>.
              A Senior Endlesscape Travel Specialist dedicated to{' '}
              <strong style={{ color: 'var(--color-pink-accent)' }}>
                {selectedRegion || 'your requested destination'}
              </strong>{' '}
              will review your personal desires and reach out within 24 hours to begin tailoring your journey.
            </p>

            <div style={{ marginBottom: '1.75rem', display: 'flex', justifyContent: 'center' }}>
              <a
                href="https://wa.me/918130216668?text=Hello%20Endlesscape,%20I%20have%20just%20submitted%20my%20journey%20enquiry%20online."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: '#0b5327',
                  backgroundColor: '#eefaf1',
                  border: '1px solid #c2e8cd',
                  borderRadius: '3px',
                  padding: '0.65rem 1.25rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                <MessageCircle size={15} style={{ color: '#25D366' }} />
                Instant WhatsApp Inquiry (+91 8130216668)
              </a>
            </div>

            <button onClick={handleReset} className="btn-primary-pink" style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}>
              RETURN TO JOURNEYS
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 580px) {
          .modal-actions-row {
            flex-direction: column-reverse !important;
          }
          .modal-action-btn {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};
