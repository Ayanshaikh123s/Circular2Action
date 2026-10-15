import React, { useState, useEffect } from "react";
import { getEventPosterArtwork, generateAiEventAction } from "./utils/circularClassifier";
import "./RealEventPosterModal.css";

export default function RealEventPosterModal({ circular, onClose }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!circular) return null;

  const artwork = getEventPosterArtwork(circular);
  const actionGuidelines = generateAiEventAction(circular);
  const posterImageUrl = artwork.heroImage;

  const circNumber =
    circular.circularNumber ||
    `C2A/EVENT/${String(circular.id || circular._id || "101").slice(-3).padStart(3, "0")}`;

  const issueDate = circular.date || circular.issuedDate || "14 Oct 2026";
  const deadlineDate =
    circular.deadline && circular.deadline !== "—" && circular.deadline !== "Not set"
      ? circular.deadline
      : "Open Registration";

  const audience =
    circular.targetAudience ||
    circular.audience ||
    (circular.targetType === "semester"
      ? `Semester ${circular.targetValue}`
      : circular.targetType === "department"
      ? `${(circular.targetValue || "").toUpperCase()} Students`
      : "All Students & Staff");

  const priority = circular.priority || "High";

  return (
    <div className="real-event-modal-backdrop" onClick={onClose}>
      <div
        className="real-event-modal-wrapper"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Floating Close Button */}
        <button
          className="real-event-close-btn"
          onClick={onClose}
          title="Close (Esc)"
        >
          ✕
        </button>

        {/* The Real Event Poster Flyer */}
        <div
          className="real-event-poster-card"
          id="printable-event-poster"
          style={{ borderColor: artwork.accent }}
        >
          {/* Background Poster Visual (AI / Curated Event Artwork) */}
          <div className="poster-artwork-layer">
            <img
              src={posterImageUrl}
              alt={circular.title}
              className={`poster-artwork-img ${imgLoaded ? "loaded" : "loading"}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => {
                if (!useFallback) {
                  setUseFallback(true);
                  setImgLoaded(true);
                }
              }}
            />
            <div
              className="poster-artwork-overlay"
              style={{ background: artwork.gradient ? `${artwork.gradient.replace("135deg", "180deg")}, linear-gradient(180deg, rgba(10,15,28,0.88) 0%, rgba(10,15,28,0.6) 30%, rgba(10,15,28,0.95) 100%)` : undefined }}
            ></div>
            <div
              className="poster-glow-radial"
              style={{ background: `radial-gradient(circle, ${artwork.accent}40 0%, transparent 70%)` }}
            ></div>
          </div>

          {/* Poster Content Overlay */}
          <div className="poster-content-layer">
            
            {/* Top College Crest & Header Banner */}
            <header className="poster-header-bar">
              <div
                className="college-seal-box"
                style={{ background: `linear-gradient(135deg, ${artwork.accent}, ${artwork.secondary})` }}
              >
                <span className="seal-c">C2A</span>
              </div>
              <div className="college-header-text">
                <span className="college-tag">CIRCULAR2ACTION COLLEGE OF HIGHER EDUCATION</span>
                <span className="college-dept" style={{ color: artwork.accent }}>
                  CAMPUS EVENTS &amp; CULTURAL COMMITTEE
                </span>
              </div>
              <div className="poster-ref-chip">
                <span>{circNumber}</span>
              </div>
            </header>

            {/* Poster Hero Title Block */}
            <div className="poster-hero-block">
              <div
                className="hero-badge-pill"
                style={{
                  borderColor: artwork.accent,
                  color: artwork.accent,
                  boxShadow: `0 0 20px ${artwork.accent}33`,
                }}
              >
                <span className="badge-sparkle">✨</span>
                <span>{artwork.badge}</span>
                <span className="badge-sparkle">✨</span>
              </div>

              <h1 className="poster-main-title">{circular.title}</h1>

              <p className="poster-subtitle">{artwork.tagline}</p>
            </div>

            {/* Event Key Highlights Strip (Date, Venue, Audience, Deadline) */}
            <div className="poster-details-grid">
              <div className="event-detail-item">
                <span className="edi-icon">📅</span>
                <div className="edi-text">
                  <small>EVENT DATE</small>
                  <strong>{issueDate}</strong>
                </div>
              </div>

              <div className="event-detail-item">
                <span className="edi-icon">📍</span>
                <div className="edi-text">
                  <small>VENUE</small>
                  <strong>Central Campus</strong>
                </div>
              </div>

              <div className="event-detail-item">
                <span className="edi-icon">👥</span>
                <div className="edi-text">
                  <small>ELIGIBILITY</small>
                  <strong>{audience}</strong>
                </div>
              </div>

              <div className="event-detail-item highlight-deadline">
                <span className="edi-icon">⏰</span>
                <div className="edi-text">
                  <small>REGISTRATION DUE</small>
                  <strong>{deadlineDate}</strong>
                </div>
              </div>
            </div>

            {/* Event Description Card */}
            <div className="poster-desc-box">
              <div className="desc-heading-row">
                <span className="desc-icon">📢</span>
                <h3>About This Event</h3>
                <span
                  className="priority-tag"
                  style={{ background: artwork.secondary }}
                >
                  {priority.toUpperCase()} PRIORITY
                </span>
              </div>
              <p className="desc-paragraph">{circular.description}</p>
            </div>

            {/* Action Required: Event Guidelines & Instructions */}
            <div
              className="poster-action-banner"
              style={{
                borderColor: artwork.accent,
                background: `linear-gradient(135deg, rgba(15,23,42,0.82), ${artwork.accent}20)`,
              }}
            >
              <div className="action-banner-icon" style={{ color: artwork.accent }}>⚡</div>
              <div className="action-banner-content">
                <div className="action-banner-header-row">
                  <h4 style={{ color: artwork.accent }}>ATTENDEE GUIDELINES &amp; ACTION REQUIRED</h4>
                </div>
                <div className="action-ai-bullets">
                  {actionGuidelines.map((guideline, i) => (
                    <div key={i} className="ai-bullet-item">
                      <span className="bullet-arrow" style={{ color: artwork.accent }}>▸</span>
                      <span>{guideline}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="action-banner-due">
                <span>Registration / Due: <strong>{deadlineDate}</strong></span>
              </div>
            </div>

            {/* Poster Footer Authority */}
            <footer className="poster-footer-strip">
              <div className="event-council-seal">
                <div
                  className="seal-circle"
                  style={{ borderColor: artwork.accent, color: artwork.accent }}
                >
                  <span>★ OFFICIAL ★</span>
                  <strong>EVENT PASS</strong>
                  <span>VERIFIED</span>
                </div>
              </div>

              <div className="event-authority-text">
                <span className="auth-sign">Events &amp; Cultural Council</span>
                <small>Office of the Dean of Student Welfare • Central Administration</small>
              </div>
            </footer>

          </div>
        </div>

      </div>
    </div>
  );
}
