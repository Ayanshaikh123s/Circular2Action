import React, { useState, useEffect } from "react";
import { getExamNoticeData } from "./utils/circularClassifier";
import "./ExamTimetableModal.css";

export default function ExamTimetableModal({ circular, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!circular) return null;

  const examData = getExamNoticeData(circular);

  const handleCopySchedule = () => {
    let scheduleText = `📅 *${examData.title.toUpperCase()}*\n` +
      `══════════════════════════════════\n` +
      `🏛️ CIRCULAR2ACTION COLLEGE OF HIGHER EDUCATION\n` +
      `🏢 Office of the Controller of Examinations\n` +
      `📌 Notification No: ${examData.circularNumber}\n` +
      `🗓️ Exam Date / Schedule: ${examData.examDate}\n` +
      `🎯 Applicable For: ${examData.audience}\n` +
      `──────────────────────────────────\n` +
      `📝 *EXAMINATION DETAILS:*\n${examData.description}\n`;

    if (examData.actionRequired) {
      scheduleText += `──────────────────────────────────\n` +
        `⚡ *ACTION REQUIRED:* ${examData.actionRequired}\n` +
        `⏰ Due Date: ${examData.examDate}\n`;
    }

    scheduleText += `══════════════════════════════════\n` +
      `_Issued by Office of Controller of Examinations_ 🏛️`;

    navigator.clipboard.writeText(scheduleText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="exam-modal-backdrop" onClick={onClose}>
      <div
        className="exam-modal-wrapper"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Floating Close Button */}
        <button className="exam-close-floating" onClick={onClose} title="Close (Esc)">
          ✕
        </button>

        {/* Examination Notice Card */}
        <div className="exam-timetable-card" id="printable-exam-sheet">
          
          {/* Top College Masthead */}
          <header className="exam-header-masthead">
            <div className="exam-crest-box">
              <span className="exam-crest-icon">🏛️</span>
            </div>

            <div className="exam-masthead-titles">
              <span className="exam-sub-title">DEPARTMENT OF EVALUATION &amp; CENTRAL ACADEMIC BOARD</span>
              <h2 className="exam-college-name">CIRCULAR2ACTION COLLEGE OF HIGHER EDUCATION</h2>
              <p className="exam-board-name">OFFICE OF THE CONTROLLER OF EXAMINATIONS</p>
            </div>

            <div className="exam-ref-box">
              <span className="exam-ref-label">NOTIFICATION NO.</span>
              <strong>{examData.circularNumber}</strong>
              <small>Date: {examData.issueDate}</small>
            </div>
          </header>

          {/* Timetable Headline Banner */}
          <div className="exam-title-banner">
            <div className="exam-title-badge">
              <span>● OFFICIAL EXAMINATION NOTIFICATION ●</span>
            </div>
            <h1 className="exam-main-heading">{examData.title}</h1>
            <p className="exam-session-sub">
              Applicable For: <strong>{examData.audience}</strong> • Priority: <strong>{examData.priority}</strong>
            </p>
          </div>

          {/* Key Exam Details Highlight Strip (Admin Data) */}
          <div className="exam-meta-strip">
            <div className="meta-tile exam-date-tile">
              <small>EXAM DATE / SCHEDULE</small>
              <strong className="exam-highlight-date">{examData.examDate}</strong>
            </div>

            <div className="meta-tile">
              <small>TARGET AUDIENCE</small>
              <strong>{examData.audience}</strong>
            </div>

            <div className="meta-tile">
              <small>CATEGORY</small>
              <strong>Examination</strong>
            </div>

            <div className="meta-tile">
              <small>DATE OF ISSUE</small>
              <strong>{examData.issueDate}</strong>
            </div>
          </div>

          {/* Core Content: Real Description and Dates Entered by Admin */}
          <div className="exam-content-box">
            <div className="exam-content-header">
              <span className="content-header-icon">📋</span>
              <div>
                <h3>EXAMINATION SCHEDULE &amp; DETAILS</h3>
                <small>Official instructions and dates published by the administrator</small>
              </div>
            </div>

            <div className="exam-content-body">
              {examData.lines && examData.lines.length > 1 ? (
                <div className="exam-structured-lines">
                  {examData.lines.map((line, idx) => (
                    <div key={idx} className="exam-line-item">
                      <span className="line-bullet">📌</span>
                      <p className="line-text">{line}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="exam-plain-desc">
                  {examData.description || "The official examination schedule details have been published. Please review the dates and instructions carefully."}
                </p>
              )}
            </div>
          </div>

          {/* Action Required Callout Box (if set by admin) */}
          {examData.actionRequired && (
            <div className="exam-action-callout">
              <div className="action-callout-icon">⚡</div>
              <div className="action-callout-content">
                <h4>MANDATORY ACTION FOR CANDIDATES</h4>
                <p>{examData.actionRequired}</p>
                <span className="action-deadline-badge">
                  Due / Action Date: <strong>{examData.examDate}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Important Rules for Examinees */}
          <div className="exam-rules-box">
            <h4>📋 INSTRUCTIONS FOR EXAMINEES:</h4>
            <ul>
              <li>Physical College Photo ID Card &amp; Exam Admit Card are compulsory for entry.</li>
              <li>Report at the examination center at least 30 minutes prior to scheduled start.</li>
              <li>Mobile phones, smartwatches, digital devices, and bags are strictly forbidden inside the hall.</li>
              <li>For any discrepancy in dates or subjects, report immediately to the Department Examination Cell.</li>
            </ul>
          </div>

          {/* Footer Authority Sign-off */}
          <footer className="exam-footer-signature">
            <div className="exam-seal-wrapper">
              <div className="exam-official-seal">
                <span>CIRCULAR2ACTION</span>
                <strong>EXAMINATION BOARD</strong>
                <span>OFFICIAL SEAL</span>
              </div>
            </div>

            <div className="exam-signatory-block">
              <div className="sig-title">Dr. S. K. Ramanathan</div>
              <span className="sig-role">Controller of Examinations</span>
              <span className="sig-college">Central Examination Committee</span>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
