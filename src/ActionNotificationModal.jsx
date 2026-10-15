import React, { useState, useEffect } from "react";
import { actionAPI } from "./api";
import "./ActionNotificationModal.css";

export default function ActionNotificationModal({ action, onClose, onStatusChange }) {
  const [currentStatus, setCurrentStatus] = useState(action?.status || "Pending");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (action) {
      setCurrentStatus(action.status || "Pending");
    }
  }, [action]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!action) return null;

  const handleStatusUpdate = async (newStatus) => {
    if (newStatus === currentStatus || isUpdating) return;

    try {
      setIsUpdating(true);
      const actionId = action._id || action.id;
      const updated = await actionAPI.updateStatus(actionId, newStatus);
      setCurrentStatus(newStatus);
      setToastMessage(`Status changed to ${newStatus}!`);

      if (onStatusChange) {
        onStatusChange({ ...(action || {}), status: newStatus });
      }

      setTimeout(() => {
        setToastMessage("");
      }, 3000);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const priority = action.priority || "Normal";
  const priorityClass = priority.toLowerCase().replace(" ", "-");
  const statusClass = currentStatus.toLowerCase().replace(" ", "-");

  return (
    <div className="action-notif-backdrop" onClick={onClose}>
      <div className="action-notif-card" onClick={(e) => e.stopPropagation()}>
        {/* Floating top-right close button */}
        <button
          className="action-notif-close-btn"
          onClick={onClose}
          title="Close Notification"
        >
          ✕
        </button>

        {/* Top Notification Bar Header */}
        <div className="action-notif-topbar">
          <div className="action-notif-badge-row">
            <span className="action-live-indicator">
              <span className="live-pulse-dot" />
              DIRECTIVE NOTIFICATION
            </span>

            <div className="action-notif-meta-tags">
              <span className={`action-notif-pill priority-${priorityClass}`}>
                {priority} Priority
              </span>
              <span className={`action-notif-pill status-${statusClass}`}>
                {currentStatus}
              </span>
            </div>
          </div>

          <h2 className="action-notif-title">{action.title}</h2>
        </div>

        {/* Notification Body Content */}
        <div className="action-notif-body">
          {/* Associated Circular Reference */}
          <div className="action-origin-banner">
            <div className="action-origin-icon">📋</div>
            <div className="action-origin-info">
              <span className="action-origin-label">Originating Circular Notice</span>
              <span className="action-origin-text">
                {action.circular || "General Institutional Circular"}
              </span>
            </div>
          </div>

          {/* Key Task Parameters Grid */}
          <div className="action-notif-grid">
            <div className="action-grid-card">
              <span className="action-grid-label">
                <span>📅</span> Deadline
              </span>
              <span
                className={`action-grid-value ${
                  priority === "High" || priority === "Urgent" ? "deadline-urgent" : ""
                }`}
              >
                {action.deadline || "Not Specified"}
              </span>
            </div>

            <div className="action-grid-card">
              <span className="action-grid-label">
                <span>👥</span> Target Audience
              </span>
              <span className="action-grid-value">
                {action.audience || action.targetAudience || "All Students"}
              </span>
            </div>

            <div className="action-grid-card">
              <span className="action-grid-label">
                <span>🏷️</span> Category
              </span>
              <span className="action-grid-value">
                {action.category || "General"}
              </span>
            </div>
          </div>

          {/* Task Guidance / Directive Details */}
          <div className="action-directive-section">
            <span className="action-directive-heading">
              <span>📌</span> Directive Instructions & Guidelines
            </span>
            <div className="action-directive-box">
              {action.description ? (
                action.description
              ) : (
                <>
                  Please review the requirements for this action item carefully. Ensure all
                  supporting documents, approvals, or form submissions are finalized prior to the
                  deadline ({action.deadline || "indicated date"}).
                </>
              )}
            </div>
          </div>

          {/* Interactive Status Bar (Student Quick-Action) */}
          <div className="action-interactive-bar">
            <div className="action-interactive-text">
              <span className="action-interactive-label">Update Your Action Progress</span>
              <span className="action-interactive-sub">
                Marking tasks helps keep your progress synchronized with the institution.
              </span>
            </div>

            <div className="action-status-btn-group">
              {currentStatus !== "In Progress" && currentStatus !== "Completed" && (
                <button
                  type="button"
                  className="status-toggle-btn btn-in-progress"
                  onClick={() => handleStatusUpdate("In Progress")}
                  disabled={isUpdating}
                >
                  ⚙️ In Progress
                </button>
              )}

              {currentStatus !== "Completed" && (
                <button
                  type="button"
                  className="status-toggle-btn btn-completed"
                  onClick={() => handleStatusUpdate("Completed")}
                  disabled={isUpdating}
                >
                  ✓ Mark Completed
                </button>
              )}

              {currentStatus === "Completed" && (
                <button
                  type="button"
                  className="status-toggle-btn btn-pending"
                  onClick={() => handleStatusUpdate("Pending")}
                  disabled={isUpdating}
                >
                  ↩ Reopen Task
                </button>
              )}
            </div>
          </div>

          {toastMessage && (
            <div className="status-update-toast">
              ✓ {toastMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
