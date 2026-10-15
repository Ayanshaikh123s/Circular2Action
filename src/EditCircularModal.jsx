import React, { useState, useEffect } from "react";
import { circularAPI } from "./api";
import "./EditCircularModal.css";

export default function EditCircularModal({ circular, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [circularNumber, setCircularNumber] = useState("");
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");
  const [targetType, setTargetType] = useState("all");
  const [targetValue, setTargetValue] = useState("");
  const [actionRequired, setActionRequired] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [status, setStatus] = useState("Published");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (circular) {
      setTitle(circular.title || "");
      setCircularNumber(circular.circularNumber || "");
      setCategory(circular.category || "General");
      setDescription(circular.description || "");
      setTargetType(circular.targetType || "all");
      setTargetValue(circular.targetValue || "");
      setActionRequired(circular.actionRequired || "");
      setPriority(circular.priority || "Normal");
      setStatus(circular.status || "Published");

      // Convert deadline string to input date if valid, else keep raw
      if (circular.deadline && circular.deadline !== "—" && circular.deadline !== "Not set") {
        setDeadline(circular.deadline);
      } else {
        setDeadline("");
      }
    }
  }, [circular]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!circular) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a circular title.");
      return;
    }
    if (!description.trim()) {
      setError("Please enter circular description/details.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      let computedAudience = "All Students";
      if (targetType === "semester" && targetValue) {
        computedAudience = `Semester ${targetValue}`;
      } else if (targetType === "department" && targetValue) {
        computedAudience = `${targetValue.toUpperCase()} Students`;
      }

      const payload = {
        title: title.trim(),
        circularNumber: circularNumber.trim(),
        category,
        description: description.trim(),
        targetType,
        targetValue,
        audience: computedAudience,
        actionRequired: actionRequired.trim(),
        deadline: deadline.trim() || "—",
        priority,
        status,
      };

      const circularId = circular._id || circular.id;
      const updated = await circularAPI.update(circularId, payload);

      if (onSuccess) {
        onSuccess(updated);
      }
      onClose();
    } catch (err) {
      console.error("Failed to update circular:", err);
      setError(err.message || "Failed to update circular. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal-backdrop" onClick={onClose}>
      <div
        className="edit-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="edit-modal-header">
          <div className="edit-header-title">
            <span className="edit-header-icon">✎</span>
            <div>
              <h3>Edit Circular</h3>
              <p>Update announcement details for students and faculty</p>
            </div>
          </div>
          <button className="edit-modal-close" onClick={onClose} title="Close (Esc)">
            ✕
          </button>
        </div>

        {error && <div className="edit-modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="edit-modal-form">
          <div className="edit-form-row">
            <div className="edit-form-group flex-2">
              <label>Circular Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mid-Term Examination Schedule 2026"
                required
              />
            </div>

            <div className="edit-form-group flex-1">
              <label>Circular Ref No.</label>
              <input
                type="text"
                value={circularNumber}
                onChange={(e) => setCircularNumber(e.target.value)}
                placeholder="e.g. C2A/2026/045"
              />
            </div>
          </div>

          <div className="edit-form-row">
            <div className="edit-form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Academic">Academic</option>
                <option value="Examination">Examination</option>
                <option value="Events">Events</option>
                <option value="Finance">Finance</option>
                <option value="Student Services">Student Services</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="edit-form-group">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Normal">Normal</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="edit-form-group">
              <label>Publish Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Published">Published (Live for Students)</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="edit-form-group">
            <label>Description &amp; Dates / Details *</label>
            <textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter full circular details, exam schedule, dates, or guidelines..."
              required
            ></textarea>
          </div>

          <div className="edit-form-row">
            <div className="edit-form-group">
              <label>Target Audience Type</label>
              <select
                value={targetType}
                onChange={(e) => {
                  setTargetType(e.target.value);
                  if (e.target.value === "all") setTargetValue("");
                  else if (e.target.value === "semester" && !targetValue) setTargetValue("1");
                  else if (e.target.value === "department" && !targetValue) setTargetValue("bca");
                }}
              >
                <option value="all">All Students</option>
                <option value="semester">Specific Semester</option>
                <option value="department">Specific Department</option>
              </select>
            </div>

            {targetType === "semester" && (
              <div className="edit-form-group">
                <label>Select Semester</label>
                <select value={targetValue} onChange={(e) => setTargetValue(e.target.value)}>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                </select>
              </div>
            )}

            {targetType === "department" && (
              <div className="edit-form-group">
                <label>Select Department</label>
                <select value={targetValue} onChange={(e) => setTargetValue(e.target.value)}>
                  <option value="bca">BCA</option>
                  <option value="bba">BBA</option>
                  <option value="bcom">B.Com</option>
                  <option value="mca">MCA</option>
                  <option value="mba">MBA</option>
                </select>
              </div>
            )}

            <div className="edit-form-group">
              <label>Deadline / Date</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. 25 Oct 2026 or 2026-10-25"
              />
            </div>
          </div>

          <div className="edit-form-group">
            <label>Action Required for Students (Optional)</label>
            <input
              type="text"
              value={actionRequired}
              onChange={(e) => setActionRequired(e.target.value)}
              placeholder="e.g. Collect Hall Ticket from Department Desk"
            />
          </div>

          <div className="edit-modal-footer">
            <button
              type="button"
              className="edit-btn btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="edit-btn btn-save"
              disabled={loading}
            >
              {loading ? "Saving Changes..." : "✓ Save & Update Circular"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
