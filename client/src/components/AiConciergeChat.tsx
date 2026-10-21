import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  toggleChat,
  closeChat,
  minimizeChat,
  clearChat,
  sendChatMessage,
} from '../store/slices/chatSlice';
import type { ChatPackage } from '../types/chat';
import { MessageCircle } from 'lucide-react';
import './AiConciergeChat.css';

interface AiConciergeChatProps {
  onSelectItineraryById?: (id: string) => void;
  onEnquire?: (tripTitle?: string) => void;
}

/**
 * Lightweight helper to format markdown-like text safely:
 * - Bold: **word**
 * - Bullet lists: lines starting with * or -
 * - Paragraphs
 */
function FormattedMessageText({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`}>
          {currentList.map((item, idx) => (
            <li key={idx}>
              <FormattedInlineText text={item} />
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      currentList.push(trimmed.slice(2));
    } else {
      flushList();
      if (trimmed.length > 0) {
        elements.push(
          <p key={`p-${index}`}>
            <FormattedInlineText text={trimmed} />
          </p>
        );
      }
    }
  });

  flushList();

  return <div className="aura-formatted-text">{elements}</div>;
}

function FormattedInlineText({ text }: { text: string }) {
  // Regex to split on **bold**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export const AiConciergeChat: React.FC<AiConciergeChatProps> = ({
  onSelectItineraryById,
  onEnquire,
}) => {
  const dispatch = useAppDispatch();
  const { isOpen, isMinimized, messages, isLoading, activeSuggestions, hasUnread } =
    useAppSelector((state) => state.chat);

  const [inputQuery, setInputQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when new messages arrive or loading changes
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputQuery.trim();
    if (!query || isLoading) return;

    setInputQuery('');
    dispatch(sendChatMessage(query));
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (isLoading) return;
    dispatch(sendChatMessage(suggestion));
  };

  const handlePackageSelect = (pkg: ChatPackage) => {
    if (onSelectItineraryById) {
      onSelectItineraryById(pkg.id);
    }
  };

  const handlePackageEnquire = (pkg: ChatPackage) => {
    if (onEnquire) {
      onEnquire(pkg.title);
    }
  };

  return (
    <>
      {/* 1. Floating Trigger Button (Always visible when chat window is closed) */}
      {!isOpen && (
        <button
          className="aura-trigger-btn"
          onClick={() => dispatch(toggleChat())}
          aria-label="Consult Aura — Private Travel Concierge"
          title="Consult Aura — Private Travel Concierge"
        >
          <div className="aura-trigger-icon-wrap">
            <span className="aura-icon-pulse" />
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            {hasUnread && <span className="aura-unread-dot" />}
          </div>
          <div className="aura-trigger-content">
            <span className="aura-trigger-title">Ask Aura</span>
            <span className="aura-trigger-subtitle">Private Travel Concierge</span>
          </div>
        </button>
      )}

      {/* 2. Floating Obsidian Chat Drawer */}
      {isOpen && (
        <div className={`aura-chat-container ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="aura-chat-header">
            <div className="aura-header-left">
              <div className="aura-avatar">A</div>
              <div className="aura-header-info">
                <div className="aura-header-name">
                  Aura
                  <span className="aura-status-badge">
                    <span className="aura-status-dot" /> Online
                  </span>
                </div>
                <span className="aura-header-sub">Bespoke Travel Specialist</span>
              </div>
            </div>

            <div className="aura-header-actions">
              {/* WhatsApp direct concierge link */}
              <a
                href="https://wa.me/918130216668?text=Hello%20Aura,%20I%20would%20like%20to%20consult%20with%20Endlesscape%20on%20WhatsApp."
                target="_blank"
                rel="noopener noreferrer"
                className="aura-header-btn"
                title="Chat with Concierge on WhatsApp (+91 8130216668)"
                aria-label="Chat on WhatsApp"
                style={{ color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <MessageCircle size={14} />
              </a>

              {/* Reset / Clear */}
              <button
                className="aura-header-btn"
                onClick={() => dispatch(clearChat())}
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
              </button>

              {/* Minimize / Restore */}
              <button
                className="aura-header-btn"
                onClick={() => dispatch(minimizeChat())}
                title={isMinimized ? 'Expand concierge' : 'Minimize'}
                aria-label="Minimize or Expand"
              >
                {isMinimized ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                )}
              </button>

              {/* Close */}
              <button
                className="aura-header-btn"
                onClick={() => dispatch(closeChat())}
                title="Close concierge"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages View (Hidden if minimized) */}
          {!isMinimized && (
            <>
              <div className="aura-messages-view">
                {messages.map((msg) => (
                  <div key={msg.id} className={`aura-msg-row ${msg.sender}`}>
                    {msg.sender === 'assistant' && (
                      <div className="aura-msg-avatar-col">A</div>
                    )}
                    <div className="aura-msg-bubble-wrap">
                      <div className="aura-msg-bubble">
                        <FormattedMessageText content={msg.text} />

                        {/* Interactive Matched Package Cards */}
                        {msg.relevantPackages && msg.relevantPackages.length > 0 && (
                          <div className="aura-packages-tray">
                            {msg.relevantPackages.slice(0, 3).map((pkg) => (
                              <div key={pkg.id} className="aura-pkg-card">
                                <div className="aura-pkg-thumb">
                                  <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    loading="lazy"
                                    onError={(e) => {
                                      // Fallback image if remote url fails
                                      (e.target as HTMLImageElement).src =
                                        'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80';
                                    }}
                                  />
                                </div>
                                <div className="aura-pkg-details">
                                  <div>
                                    <div className="aura-pkg-meta">{pkg.country} • {pkg.nights} Nights</div>
                                    <h4 className="aura-pkg-title">{pkg.title}</h4>
                                  </div>
                                  <div>
                                    <div className="aura-pkg-price-row">
                                      <span className="aura-pkg-price">{pkg.startingPrice}</span>
                                    </div>
                                    <div className="aura-pkg-actions">
                                      <button
                                        type="button"
                                        className="aura-pkg-action-btn primary"
                                        onClick={() => handlePackageSelect(pkg)}
                                      >
                                        View Details
                                      </button>
                                      <button
                                        type="button"
                                        className="aura-pkg-action-btn"
                                        onClick={() => handlePackageEnquire(pkg)}
                                      >
                                        Enquire
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Follow-up Suggestion Chips inside assistant message */}
                        {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                          <div className="aura-suggestions-tray">
                            {msg.suggestedQuestions.map((sug, sIdx) => (
                              <button
                                key={sIdx}
                                type="button"
                                className="aura-suggestion-chip"
                                onClick={() => handleSuggestionClick(sug)}
                              >
                                {sug}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="aura-msg-time">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="aura-msg-row assistant">
                    <div className="aura-msg-avatar-col">A</div>
                    <div className="aura-typing-bubble">
                      <div className="aura-typing-dots">
                        <span className="aura-typing-dot" />
                        <span className="aura-typing-dot" />
                        <span className="aura-typing-dot" />
                      </div>
                      <span className="aura-typing-text">Aura is curating bespoke insights...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Footer Input Bar */}
              <div className="aura-chat-footer">
                {/* Active Global Suggestions */}
                {activeSuggestions.length > 0 && !isLoading && (
                  <div className="aura-suggestions-tray" style={{ marginBottom: 4 }}>
                    {activeSuggestions.slice(0, 2).map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="aura-suggestion-chip"
                        onClick={() => handleSuggestionClick(sug)}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}

                <form className="aura-input-form" onSubmit={handleSubmit}>
                  <input
                    ref={inputRef}
                    type="text"
                    className="aura-input-field"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Ask Aura about packages, dates, pricing..."
                    disabled={isLoading}
                    aria-label="Message to Aura"
                  />
                  <button
                    type="submit"
                    className="aura-send-btn"
                    disabled={!inputQuery.trim() || isLoading}
                    aria-label="Send Message"
                    title="Send"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </form>

                <div className="aura-footer-tagline">
                  Endlesscape Tailor-Made Luxury Concierge
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default AiConciergeChat;
