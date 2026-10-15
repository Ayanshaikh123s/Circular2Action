import React, { useState, useEffect } from "react";
import { actionAPI } from "./api";
import "./EditActionModal.css";

export default function EditActionModal({ action, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [circular, setCircular] = useState("");
  const [audience, setAudience] = useState("All Students");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [status, setStatus] = useState("Pending");
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (action) {
      setTitle(action.title || "");
      setCircular(action.circular || "");
      setAudience(action.audience || action.targetAudience || "All Students");
      setDeadline(action.deadline || "");
      setPriority(action.priority || "Normal");
      setStatus(action.status || "Pending");
      setCategory(action.category || "General");
      setDescription(action.description || "");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter an action title.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        title: title.trim(),
        circular: circular.trim() || "General Circular",
        audience: audience.trim() || "All Students",
        deadline: deadline.trim() || "Not set",
        priority,
        status,
        category,
        description: description.trim(),
      };

      const actionId = action._id || action.id;
      const updated = await actionAPI.update(actionId, payload);

      if (onSuccess) {
        onSuccess(updated);
      }
      onClose();
    } catch (err) {
      console.error("Failed to update action:", err);
      setError(err.message || "Failed to update action item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal-backdrop" onClick={onClose}>
      <div className="edit-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="edit-modal-header">
          <div className="edit-header-title">
            <div className="edit-header-icon">✎</div>
            <div>
              <h3>Edit Action Item</h3>
              <p>Update task details, deadline, priority, and audience</p>
            </div>
          </div>
          <button className="edit-close-btn" onClick={onClose} title="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-modal-form">
          {error && <div className="edit-form-error">{error}</div>}

          <div className="edit-form-body">
            <div className="edit-form-group">
              <label>Action Title *</label>
              <input
                type="text"
                placeholder="e.g. Submit Examination Form"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="edit-form-row">
              <div className="edit-form-group">
                <label>Associated Circular</label>
                <input
                  type="text"
                  placeholder="e.g. Internal Examination Schedule"
                  value={circular}
                  onChange={(e) => setCircular(e.target.value)}
                />
              </div>

              <div className="edit-form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="Examination">Examination</option>
                  <option value="Academic">Academic</option>
                  <option value="Fee Submission">Fee Submission</option>
                  <option value="Events">Events</option>
                  <option value="Student Services">Student Services</option>
                  <option value="Placement">Placement</option>
                </select>
              </div>
            </div>

            <div className="edit-form-row">
              <div className="edit-form-group">
                <label>Target Audience</label>
                <input
                  type="text"
                  placeholder="e.g. All Students, Semester 5, BCA"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                />
              </div>

              <div className="edit-form-group">
                <label>Deadline</label>
                <input
                  type="text"
                  placeholder="e.g. 25 Oct 2026 or 2026-10-25"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>

            <div className="edit-form-row">
              <div className="edit-form-group">
                <label>Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div className="edit-form-group">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="edit-form-group">
              <label>Action Instructions / Description</label>
              <textarea
                rows="4"
                placeholder="Specify the exact instructions students need to complete this action..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="edit-modal-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Action Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
