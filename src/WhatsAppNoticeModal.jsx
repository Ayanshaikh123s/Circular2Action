import React, { useState, useEffect } from "react";
import "./WhatsAppNoticeModal.css";

export default function WhatsAppNoticeModal({ circular, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!circular) return null;

  const circNumber =
    circular.circularNumber ||
    `C2A/2026/${String(circular.id || circular._id || "045").slice(-3).padStart(3, "0")}`;

  const issueDate = circular.date || circular.issuedDate || "14 Oct 2026";
  const deadlineDate =
    circular.deadline && circular.deadline !== "—" && circular.deadline !== "Not set"
      ? circular.deadline
      : "No Deadline";

  const audience =
    circular.targetAudience ||
    circular.audience ||
    (circular.targetType === "semester"
      ? `Semester ${circular.targetValue}`
      : circular.targetType === "department"
      ? `${(circular.targetValue || "").toUpperCase()} Students`
      : "All Students");

  const category = circular.category || "General Notice";
  const priority = circular.priority || "Normal";

  const formattedWhatsAppText =
    `╔═══════════════════════════════╗\n` +
    `  🏛️ *CIRCULAR2ACTION COLLEGE NOTICE*\n` +
    `╚═══════════════════════════════╝\n\n` +
    `📅 *Date:* ${issueDate}\n` +
    `🔖 *Ref No:* ${circNumber}\n` +
    `👥 *For:* ${audience}\n` +
    `🏷️ *Category:* ${category}\n` +
    `⚡ *Priority:* ${priority}\n\n` +
    `*Dear Students,*\n\n` +
    `📌 *${circular.title}*\n\n` +
    `${circular.description}\n\n` +
    (circular.actionRequired
      ? `⚠️ *ACTION REQUIRED:*\n👉 ${circular.actionRequired}\n⏰ *Deadline:* ${deadlineDate}\n\n`
      : deadlineDate !== "No Deadline"
      ? `⏰ *Deadline:* ${deadlineDate}\n\n`
      : "") +
    `Kindly take note of the above and act accordingly.\n\n` +
    `_With regards,_\n` +
    `*Office of the Dean / Academic Coordinator*\n` +
    `Circular2Action Administration 🏛️`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedWhatsAppText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="wa-modal-backdrop" onClick={onClose}>
      <div
        className="wa-modal-wrapper"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button className="wa-close-floating" onClick={onClose} title="Close (Esc)">
          ✕
        </button>

        {/* WhatsApp Notice Window */}
        <div className="wa-window-card" id="printable-wa-notice">
          
          {/* WhatsApp Chat App Header */}
          <header className="wa-app-header">
            <div className="wa-avatar-box">
              <span className="wa-avatar-initial">C</span>
              <span className="wa-online-dot"></span>
            </div>

            <div className="wa-header-info">
              <div className="wa-header-name-row">
                <h3>Circular2Action Official Notice Board</h3>
                <span className="wa-verified-badge" title="Official Verified Broadcaster">✓</span>
              </div>
              <p>Faculty &amp; Academic Administration • Official Message</p>
            </div>

            <div className="wa-header-right">
              <span className="wa-status-pill">{category}</span>
            </div>
          </header>

          {/* WhatsApp Chat Body */}
          <div className="wa-chat-body">
            
            {/* Date Pill in Chat */}
            <div className="wa-date-divider">
              <span>TODAY • {issueDate}</span>
            </div>

            {/* Official Message Bubble */}
            <div className="wa-message-bubble">
              
              {/* College Masthead Header inside message */}
              <div className="wa-msg-masthead">
                <div className="wa-masthead-crest">🏛️</div>
                <div>
                  <h4>CIRCULAR2ACTION COLLEGE OF HIGHER EDUCATION</h4>
                  <span>OFFICIAL ACADEMIC NOTIFICATION &amp; MEMORANDUM</span>
                </div>
              </div>

              {/* Meta details bar */}
              <div className="wa-msg-meta-bar">
                <span>Ref: <strong>{circNumber}</strong></span>
                <span>•</span>
                <span>Audience: <strong>{audience}</strong></span>
                {priority === "High" || priority === "Urgent" ? (
                  <>
                    <span>•</span>
                    <span className="wa-priority-badge">{priority} Priority</span>
                  </>
                ) : null}
              </div>

              {/* Salutation */}
              <p className="wa-msg-salutation">Dear Students,</p>

              {/* Circular Title Headline */}
              <div className="wa-msg-title-banner">
                <span className="wa-pin">📌</span>
                <h2>{circular.title}</h2>
              </div>

              {/* Description Body */}
              <div className="wa-msg-text-content">
                <p>{circular.description}</p>
              </div>

              {/* Summary Highlight Box */}
              <div className="wa-msg-summary-box">
                <div className="wa-sum-item">
                  <small>CATEGORY</small>
                  <strong>{category}</strong>
                </div>
                <div className="wa-sum-item">
                  <small>PUBLISHED</small>
                  <strong>{issueDate}</strong>
                </div>
                <div className="wa-sum-item">
                  <small>APPLICABLE TO</small>
                  <strong>{audience}</strong>
                </div>
                <div className={`wa-sum-item ${deadlineDate !== "No Deadline" ? "wa-deadline-alert" : ""}`}>
                  <small>DEADLINE</small>
                  <strong>{deadlineDate}</strong>
                </div>
              </div>

              {/* Action Required Box (if any) */}
              {circular.actionRequired && (
                <div className="wa-action-box">
                  <div className="wa-action-title">
                    <span>⚡</span>
                    <strong>ACTION REQUIRED FOR STUDENTS:</strong>
                  </div>
                  <p>{circular.actionRequired}</p>
                  <div className="wa-action-due">
                    <span>Kindly complete before: <strong>{deadlineDate}</strong></span>
                  </div>
                </div>
              )}

              {/* Sign-off */}
              <div className="wa-msg-signoff">
                <p>Kindly acknowledge this notice and adhere to instructions given above.</p>
                <div className="wa-sign-block">
                  <strong>Office of the Dean / Academic Coordinator</strong>
                  <span>Circular2Action College Administration</span>
                </div>
              </div>

              {/* WhatsApp Message Timestamp & Double Ticks */}
              <div className="wa-msg-timestamp">
                <span>10:30 AM</span>
                <span className="wa-double-ticks">✓✓</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
