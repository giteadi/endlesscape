import { useState, useEffect, useCallback } from 'react';

import { Plus, Trash2, Edit3, ArrowLeft, RefreshCw, X, UploadCloud, Image as ImageIcon, AlertCircle, Loader2, Check, LogOut } from 'lucide-react';
import type { Itinerary } from '../types/travel';
import { uploadMultipleImages } from '../utils/imageOptimizer';
import { useAppDispatch } from '../store/store';
import { logout } from '../store/slices/authSlice';

interface Enquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  travelParty: string;
  feeling: string;
  travelMonth: string;
  notes: string;
  status: 'New' | 'Under Review' | 'Proposal Sent' | 'Confirmed' | 'Archived';
  createdAt: string;
}

interface AdminPanelProps {
  onBackToSite: () => void;
  onRefreshPublicData: (updatedList?: Itinerary[]) => void;
}

import { API_BASE } from '../config/api';

export const AdminPanel = ({ onBackToSite, onRefreshPublicData }: AdminPanelProps) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'enquiries' | 'itineraries' | 'analytics'>('enquiries');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    newEnquiries: 0,
    proposalsSent: 0,
    totalItineraries: 0,
    estimatedPipeline: '£0',
  });
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Modal for creating/editing itinerary
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Itinerary | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    country: '',
    nights: 7,
    region: 'mediterranean' as 'polar' | 'mediterranean' | 'asia' | 'latin' | 'africa',
    tagline: '',
    tag: 'PRIVATE EXPEDITION',
    startingPrice: '£10,500 per person',
    bestSeason: 'May to October',
    image: '',
    gallery: [] as string[],
    highlights: 'Private helicopter transfer, 5-star Relais & Châteaux villa, Michelin dining',
    description: 'An extraordinary tailor-made journey crafted around feeling.',
  });

  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUrlInputVisible, setIsUrlInputVisible] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');

  const [isApiConnected, setIsApiConnected] = useState<boolean>(true);

  const refreshStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/stats?_t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // Ignore background refresh errors
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const cacheBust = `_t=${Date.now()}`;
      const [statsRes, enqRes, itinRes] = await Promise.all([
        fetch(`${API_BASE}/stats?${cacheBust}`, { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null),
        fetch(`${API_BASE}/enquiries?${cacheBust}`, { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null),
        fetch(`${API_BASE}/itineraries?${cacheBust}`, { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null),
      ]);

      if (statsRes && enqRes && itinRes) {
        setIsApiConnected(true);
        setStats(statsRes);
        setEnquiries(enqRes);
        setItineraries(itinRes);
      } else {
        setIsApiConnected(false);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setIsApiConnected(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (enquiryId: string, newStatus: Enquiry['status']) => {
    try {
      const res = await fetch(`${API_BASE}/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, status: newStatus } : e));
        refreshStats();
      }
    } catch (err) {
      console.error('Error updating enquiry status:', err);
    }
  };

  const handleDeleteEnquiry = async (enquiryId: string) => {
    if (!confirm('Are you sure you want to delete this client enquiry?')) return;
    try {
      await fetch(`${API_BASE}/enquiries/${enquiryId}`, { method: 'DELETE' });
      setEnquiries(prev => prev.filter(e => e.id !== enquiryId));
      refreshStats();
    } catch (err) {
      console.error('Error deleting enquiry:', err);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setUploadError(null);
    setIsUrlInputVisible(false);
    setCustomUrlInput('');
    setFormData({
      title: '',
      country: '',
      nights: 7,
      region: 'mediterranean',
      tagline: '',
      tag: 'PRIVATE EXPEDITION',
      startingPrice: '£10,500 per person',
      bestSeason: 'May to October',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=85',
      ],
      highlights: 'Private helicopter transfer, Relais & Châteaux villa, Michelin dining',
      description: 'An extraordinary tailor-made journey crafted around feeling.',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Itinerary) => {
    setEditingItem(item);
    setUploadError(null);
    setIsUrlInputVisible(false);
    setCustomUrlInput('');
    const existingGallery = (item.gallery && item.gallery.length > 0)
      ? item.gallery
      : (item.image ? [item.image] : []);

    setFormData({
      title: item.title,
      country: item.country,
      nights: item.nights,
      region: item.region,
      tagline: item.tagline,
      tag: item.tag,
      startingPrice: item.startingPrice,
      bestSeason: item.bestSeason,
      image: item.image || existingGallery[0] || '',
      gallery: existingGallery,
      highlights: item.highlights.join(', '),
      description: item.description,
    });
    setIsModalOpen(true);
  };

  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploadingImages(true);
    setUploadError(null);
    try {
      const fileArray = Array.from(files);
      const uploadedUrls = await uploadMultipleImages(fileArray);

      setFormData(prev => {
        const updatedGallery = [...prev.gallery, ...uploadedUrls];
        return {
          ...prev,
          image: prev.image || updatedGallery[0] || '',
          gallery: updatedGallery,
        };
      });
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setUploadError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setIsUploadingImages(false);
    }
  };

  const handleSetHeroImage = (selectedImgUrl: string) => {
    setFormData(prev => {
      const filtered = prev.gallery.filter(u => u !== selectedImgUrl);
      return {
        ...prev,
        image: selectedImgUrl,
        gallery: [selectedImgUrl, ...filtered],
      };
    });
  };

  const handleRemoveImage = (imgUrlToRemove: string) => {
    setFormData(prev => {
      const updatedGallery = prev.gallery.filter(u => u !== imgUrlToRemove);
      const newHero = prev.image === imgUrlToRemove ? (updatedGallery[0] || '') : prev.image;
      return {
        ...prev,
        image: newHero,
        gallery: updatedGallery,
      };
    });
  };

  const handleAddImageUrl = () => {
    const trimmed = customUrlInput.trim();
    if (!trimmed) return;
    setFormData(prev => {
      const updatedGallery = [...prev.gallery, trimmed];
      return {
        ...prev,
        image: prev.image || trimmed,
        gallery: updatedGallery,
      };
    });
    setCustomUrlInput('');
  };

  const handleSaveItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    const heroImg = formData.image || formData.gallery[0] || 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=85';
    const finalGallery = formData.gallery.length > 0 ? formData.gallery : [heroImg];

    const payload = {
      ...formData,
      image: heroImg,
      gallery: finalGallery,
      nights: Number(formData.nights),
      highlights: formData.highlights.split(',').map(s => s.trim()).filter(Boolean),
    };

    try {
      let updatedList = itineraries;
      if (editingItem) {
        // Update
        const res = await fetch(`${API_BASE}/itineraries/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          updatedList = itineraries.map(it => it.id === updated.id ? updated : it);
          setItineraries(updatedList);
          setSuccessToast(`✓ Updated "${payload.title}" successfully!`);
        }
      } else {
        // Create
        const res = await fetch(`${API_BASE}/itineraries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          updatedList = [created, ...itineraries];
          setItineraries(updatedList);
          setSuccessToast(`✓ Published "${payload.title}" live to website!`);
        }
      }
      setIsModalOpen(false);
      setActiveTab('itineraries');
      onRefreshPublicData(updatedList);
      refreshStats();
      setTimeout(() => setSuccessToast(null), 5000);
    } catch (err) {
      console.error('Error saving itinerary:', err);
    }
  };

  const handleDeleteItinerary = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this luxury itinerary from the website?')) return;
    try {
      await fetch(`${API_BASE}/itineraries/${id}`, { method: 'DELETE' });
      const filtered = itineraries.filter(it => it.id !== id);
      setItineraries(filtered);
      onRefreshPublicData(filtered);
      refreshStats();
      setSuccessToast('✓ Itinerary removed from website portfolio.');
      setTimeout(() => setSuccessToast(null), 4000);
    } catch (err) {
      console.error('Error deleting itinerary:', err);
    }
  };

  const filteredEnquiries = filterStatus === 'all'
    ? enquiries
    : enquiries.filter(e => e.status === filterStatus);

  return (
    <div style={{ backgroundColor: '#090a0d', color: '#ffffff', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Top Admin Header Bar */}
      <header
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#0f1116',
          padding: '1rem clamp(1rem, 3vw, 2rem)',
          paddingTop: 'calc(1rem + var(--safe-top))',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onBackToSite}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                padding: '0.5rem 0.95rem',
                borderRadius: '3px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                touchAction: 'manipulation',
              }}
            >
              <ArrowLeft size={14} /> Back to Live Website
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <img
                  src="/assets/images/logo-symbol.webp"
                  alt="Endlesscape"
                  style={{ width: '22px', height: '22px', objectFit: 'contain' }}
                />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', letterSpacing: '0.12em' }}>
                  ENDLESSCAPE
                </span>
                <span style={{ backgroundColor: 'var(--color-pink-accent)', color: '#fff', fontSize: '0.62rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '2px', letterSpacing: '0.1em' }}>
                  CONCIERGE BACKEND
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                Private Operations & Bespoke Portfolio Management Engine
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: isApiConnected ? '#10b981' : '#ef4444' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isApiConnected ? '#10b981' : '#ef4444', display: 'inline-block' }} />
              {isApiConnected ? 'Database Connected (Port 5001)' : 'Database Disconnected'}
            </div>

            <button
              onClick={fetchData}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.8)',
                padding: '0.5rem 0.75rem',
                borderRadius: '3px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                touchAction: 'manipulation',
              }}
            >
              <RefreshCw size={12} /> Sync
            </button>

            <button
              onClick={() => {
                dispatch(logout());
                onBackToSite();
              }}
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                padding: '0.5rem 0.85rem',
                borderRadius: '3px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                touchAction: 'manipulation',
                transition: 'all 0.2s ease',
              }}
              title="Logout from Admin Concierge Suite"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: '1440px', margin: '1.5rem auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
        {/* Instant Success Toast Notification */}
        {successToast && (
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10b981',
              color: '#10b981',
              padding: '0.75rem 1.25rem',
              borderRadius: '3px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              animation: 'slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Check size={16} />
              <span>{successToast}</span>
            </div>
            <button
              onClick={() => setSuccessToast(null)}
              style={{ background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer', padding: '2px' }}
              title="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* KPI Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ backgroundColor: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', borderRadius: '3px' }}>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Total VIP Inquiries
            </span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 700, margin: '0.2rem 0', color: '#ffffff' }}>
              {stats.totalEnquiries}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-pink-accent)' }}>
              {stats.newEnquiries} New leads
            </span>
          </div>

          <div style={{ backgroundColor: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', borderRadius: '3px' }}>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Pipeline Estimate
            </span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 700, margin: '0.2rem 0', color: '#ffffff' }}>
              {stats.estimatedPipeline}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#10b981' }}>
              Avg. £12,500 booking
            </span>
          </div>

          <div style={{ backgroundColor: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', borderRadius: '3px' }}>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Published Expeditions
            </span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 700, margin: '0.2rem 0', color: '#ffffff' }}>
              {itineraries.length}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Live in portfolio
            </span>
          </div>

          <div style={{ backgroundColor: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', borderRadius: '3px' }}>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Proposals Sent
            </span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 700, margin: '0.2rem 0', color: '#ffffff' }}>
              {stats.proposalsSent}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>
              Specialists assigned
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} className="no-scrollbar">
            <button
              onClick={() => setActiveTab('enquiries')}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'enquiries' ? '2px solid var(--color-pink-accent)' : '2px solid transparent',
                color: activeTab === 'enquiries' ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.92rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                touchAction: 'manipulation',
              }}
            >
              Guest Inquiries ({enquiries.length})
            </button>

            <button
              onClick={() => setActiveTab('itineraries')}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'itineraries' ? '2px solid var(--color-pink-accent)' : '2px solid transparent',
                color: activeTab === 'itineraries' ? '#ffffff' : 'rgba(255, 255, 255, 0.55)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.92rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                touchAction: 'manipulation',
              }}
            >
              Itinerary Portfolio ({itineraries.length})
            </button>
          </div>

          {activeTab === 'itineraries' && (
            <button
              onClick={handleOpenCreateModal}
              className="btn-primary-pink"
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem' }}
            >
              <Plus size={14} /> Add New Expedition
            </button>
          )}

          {activeTab === 'enquiries' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflowX: 'auto', maxWidth: '100%', paddingBottom: '4px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} className="no-scrollbar">
              <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Filter:</span>
              {['all', 'New', 'Under Review', 'Proposal Sent', 'Confirmed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  style={{
                    backgroundColor: filterStatus === st ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: filterStatus === st ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '2px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    touchAction: 'manipulation',
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab 1: Guest Inquiries Management */}
        {activeTab === 'enquiries' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredEnquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                No enquiries found in this category.
              </div>
            ) : (
              filteredEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  style={{
                    backgroundColor: '#12141a',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '3px',
                    padding: '1.5rem 1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                          {enq.fullName}
                        </h3>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '2px',
                            backgroundColor:
                              enq.status === 'New' ? 'rgba(230, 27, 101, 0.15)' :
                              enq.status === 'Under Review' ? 'rgba(245, 158, 11, 0.15)' :
                              enq.status === 'Proposal Sent' ? 'rgba(56, 189, 248, 0.15)' :
                              enq.status === 'Confirmed' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                            color:
                              enq.status === 'New' ? 'var(--color-pink-accent)' :
                              enq.status === 'Under Review' ? '#f59e0b' :
                              enq.status === 'Proposal Sent' ? '#38bdf8' :
                              enq.status === 'Confirmed' ? '#10b981' : 'rgba(255, 255, 255, 0.6)',
                          }}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                        <span>✉ {enq.email}</span>
                        <span>☎ {enq.phone}</span>
                        <span>📅 {new Date(enq.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Actions: Change Status & Delete */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value as Enquiry['status'])}
                        style={{
                          backgroundColor: '#1b1d24',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          color: '#ffffff',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '2px',
                          fontSize: '0.78rem',
                          outline: 'none',
                        }}
                      >
                        <option value="New">Status: New</option>
                        <option value="Under Review">Status: Under Review</option>
                        <option value="Proposal Sent">Status: Proposal Sent</option>
                        <option value="Confirmed">Status: Confirmed</option>
                        <option value="Archived">Status: Archived</option>
                      </select>

                      <button
                        onClick={() => handleDeleteEnquiry(enq.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'rgba(255, 255, 255, 0.4)',
                          cursor: 'pointer',
                          padding: '6px',
                        }}
                        title="Delete Enquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Criteria badges */}
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem 1rem', borderRadius: '2px' }}>
                    <div style={{ fontSize: '0.75rem' }}>
                      <strong style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Destination: </strong>
                      <span style={{ color: '#ffffff' }}>{enq.destination}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem' }}>
                      <strong style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Party: </strong>
                      <span style={{ color: '#ffffff' }}>{enq.travelParty}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem' }}>
                      <strong style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Desired Feeling: </strong>
                      <span style={{ color: 'var(--color-pink-accent)' }}>{enq.feeling}</span>
                    </div>
                    {enq.travelMonth && (
                      <div style={{ fontSize: '0.75rem' }}>
                        <strong style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Season: </strong>
                        <span style={{ color: '#ffffff' }}>{enq.travelMonth}</span>
                      </div>
                    )}
                  </div>

                  {enq.notes && (
                    <div style={{ fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.8)', fontStyle: 'italic', borderLeft: '2px solid var(--color-pink-accent)', paddingLeft: '1rem' }}>
                      “{enq.notes}”
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Itineraries Portfolio Management */}
        {activeTab === 'itineraries' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {itineraries.map((trip) => (
              <div
                key={trip.id}
                style={{
                  backgroundColor: '#12141a',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ position: 'relative', height: '180px', backgroundImage: `url(${trip.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <span style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', backgroundColor: 'rgba(0,0,0,0.7)', padding: '0.25rem 0.65rem', fontSize: '0.7rem', fontWeight: 700, borderRadius: '2px' }}>
                    {trip.nights} NIGHTS
                  </span>
                  <span style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', backgroundColor: 'var(--color-pink-accent)', padding: '0.2rem 0.6rem', fontSize: '0.68rem', fontWeight: 700, borderRadius: '2px', textTransform: 'uppercase' }}>
                    {trip.country}
                  </span>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#ffffff' }}>
                    {trip.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.5, margin: '0 0 1rem 0', flex: 1 }}>
                    {trip.tagline}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-pink-accent)' }}>
                      {trip.startingPrice}
                    </span>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEditModal(trip)}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#ffffff',
                          padding: '0.4rem 0.75rem',
                          borderRadius: '2px',
                          fontSize: '0.72rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <Edit3 size={13} /> Edit
                      </button>

                      <button
                        onClick={() => handleDeleteItinerary(trip.id)}
                        style={{
                          backgroundColor: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#ef4444',
                          padding: '0.4rem 0.65rem',
                          borderRadius: '2px',
                          fontSize: '0.72rem',
                          cursor: 'pointer',
                        }}
                        title="Delete from homepage"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Creating or Editing Itinerary */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(0.5rem, 3vw, 1.5rem)',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#12141a',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '4px',
              width: '100%',
              maxWidth: '720px',
              maxHeight: '92vh',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: 'clamp(1.2rem, 3.5vw, 2.5rem)',
              color: '#ffffff',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85)',
              animation: 'slideUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.15rem, 3vw, 1.4rem)', fontWeight: 700, margin: 0 }}>
                {editingItem ? 'Edit Luxury Expedition' : 'Add New Bespoke Expedition'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                  touchAction: 'manipulation',
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveItinerary} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.35rem' }}>
                    Destination Country *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.country}
                    placeholder="e.g. NORWAY"
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#1a1d24', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', borderRadius: '2px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.35rem' }}>
                    Region Collection *
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value as any })}
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#1a1d24', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', borderRadius: '2px' }}
                  >
                    <option value="polar">Polar & Arctic</option>
                    <option value="mediterranean">Mediterranean & Europe</option>
                    <option value="asia">Asia & Far East</option>
                    <option value="latin">Latin America</option>
                    <option value="africa">Wild Africa & Arabia</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.35rem' }}>
                  Itinerary Title *
                </label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  placeholder="e.g. NORWAY: THE LOFOTEN ISLANDS & ARCTIC FJORD EXPEDITION"
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#1a1d24', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', borderRadius: '2px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.35rem' }}>
                    Nights *
                  </label>
                  <input
                    type="number"
                    value={formData.nights}
                    onChange={(e) => setFormData({ ...formData, nights: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#1a1d24', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', borderRadius: '2px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.35rem' }}>
                    Starting Price *
                  </label>
                  <input
                    type="text"
                    value={formData.startingPrice}
                    placeholder="£9,500 per person"
                    onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#1a1d24', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', borderRadius: '2px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.35rem' }}>
                    Best Season
                  </label>
                  <input
                    type="text"
                    value={formData.bestSeason}
                    placeholder="September to April"
                    onChange={(e) => setFormData({ ...formData, bestSeason: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', backgroundColor: '#1a1d24', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', borderRadius: '2px' }}
                  />
                </div>
              </div>

              {/* Luxury Multi-Image Expedition Gallery & Cover Hub */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '3px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700, letterSpacing: '0.08em' }}>
                      <ImageIcon size={14} style={{ color: 'var(--color-pink-accent)' }} />
                      Expedition Photography & Gallery (Multi-Select)
                    </label>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.45)' }}>
                      Select photos from your device. Auto-converted to high-res WebP. First photo serves as Hero Cover.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsUrlInputVisible(prev => !prev)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.68rem',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    {isUrlInputVisible ? '✕ Hide URL Input' : '+ Add via Image URL'}
                  </button>
                </div>

                {/* Drag & Drop Local Device Upload Zone */}
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    padding: '1.5rem 1rem',
                    backgroundColor: isUploadingImages ? 'rgba(255, 0, 127, 0.05)' : '#161922',
                    border: '1px dashed rgba(255, 255, 255, 0.25)',
                    borderRadius: '3px',
                    cursor: isUploadingImages ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = 'var(--color-pink-accent)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 0, 127, 0.08)';
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.backgroundColor = '#161922';
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.backgroundColor = '#161922';
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      handleFilesSelected(e.dataTransfer.files);
                    }
                  }}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    disabled={isUploadingImages}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFilesSelected(e.target.files)}
                  />

                  {isUploadingImages ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-pink-accent)', fontSize: '0.82rem' }}>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Optimizing & Uploading to Server (/api/uploads)...</span>
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-pink-accent)',
                        }}
                      >
                        <UploadCloud size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff', letterSpacing: '0.02em' }}>
                          Click to select multiple local images or drag & drop here
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.45)', marginTop: '0.15rem' }}>
                          JPG, PNG, WEBP, HEIC • Auto-compressed for 60fps web performance
                        </div>
                      </div>
                    </>
                  )}
                </label>

                {uploadError && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem 0.75rem', borderRadius: '2px' }}>
                    <AlertCircle size={14} />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Optional URL Input if toggled */}
                {isUrlInputVisible && (
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
                    <input
                      type="url"
                      value={customUrlInput}
                      placeholder="https://images.unsplash.com/photo-..."
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddImageUrl();
                        }
                      }}
                      style={{ flex: 1, padding: '0.55rem', backgroundColor: '#1a1d24', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', borderRadius: '2px', fontSize: '0.78rem' }}
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                        padding: '0.55rem 0.95rem',
                        borderRadius: '2px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      + Add URL
                    </button>
                  </div>
                )}

                {/* Gallery Thumbnails List */}
                {formData.gallery.length > 0 && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Selected Gallery ({formData.gallery.length} Images)
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--color-pink-accent)' }}>
                        ★ Click 'Set Hero' on any photo to make it the primary cover
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                        gap: '0.75rem',
                        maxHeight: '260px',
                        overflowY: 'auto',
                        padding: '0.35rem',
                        backgroundColor: '#0c0d12',
                        borderRadius: '3px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                      className="no-scrollbar"
                    >
                      {formData.gallery.map((imgUrl, index) => {
                        const isHero = formData.image === imgUrl || (index === 0 && !formData.image);
                        return (
                          <div
                            key={`${imgUrl}-${index}`}
                            style={{
                              position: 'relative',
                              height: '96px',
                              borderRadius: '2px',
                              overflow: 'hidden',
                              border: isHero ? '2px solid var(--color-pink-accent)' : '1px solid rgba(255, 255, 255, 0.12)',
                              backgroundImage: `url(${imgUrl})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          >
                            {/* Hero Cover Badge */}
                            {isHero ? (
                              <span
                                style={{
                                  position: 'absolute',
                                  top: '4px',
                                  left: '4px',
                                  backgroundColor: 'var(--color-pink-accent)',
                                  color: '#fff',
                                  fontSize: '0.58rem',
                                  fontWeight: 800,
                                  padding: '0.15rem 0.4rem',
                                  borderRadius: '2px',
                                  letterSpacing: '0.08em',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
                                }}
                              >
                                ★ HERO COVER
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleSetHeroImage(imgUrl)}
                                style={{
                                  position: 'absolute',
                                  top: '4px',
                                  left: '4px',
                                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                  color: 'rgba(255, 255, 255, 0.85)',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  fontSize: '0.58rem',
                                  fontWeight: 600,
                                  padding: '0.15rem 0.35rem',
                                  borderRadius: '2px',
                                  cursor: 'pointer',
                                }}
                                title="Set as primary hero cover"
                              >
                                Set Hero
                              </button>
                            )}

                            {/* Remove Image Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(imgUrl)}
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                border: 'none',
                                color: '#ef4444',
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                              title="Remove image from gallery"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.35rem' }}>
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  placeholder="Private glass domes, arctic wildlife, and Michelin dining."
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#1a1d24', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', borderRadius: '2px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.35rem' }}>
                  Key Inclusions (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.highlights}
                  placeholder="Helicopter transfer, Relais & Châteaux villa, Michelin chef dinner"
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#1a1d24', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', borderRadius: '2px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.35rem' }}>
                  Editorial Overview Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', backgroundColor: '#1a1d24', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#fff', borderRadius: '2px', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#fff', padding: '0.65rem 1.4rem', borderRadius: '2px', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-pink">
                  {editingItem ? 'Save Updates' : 'Publish to Website'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
