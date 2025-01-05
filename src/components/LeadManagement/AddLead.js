import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css"; // Import global CSS file

function AddLeadModal() {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantType, setRestaurantType] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [primaryContactName, setPrimaryContactName] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const restaurantTypes = ["Fast Food", "Casual Dining", "Fine Dining", "Cafe"];
  const leadStatuses = ["New", "Contacted", "Qualified", "Converted"];

  const validateForm = () => {
    if (!restaurantName.trim()) return "Restaurant Name is required";
    if (!primaryContactName.trim()) return "Primary Contact Name is required";
    if (!role.trim()) return "Role is required";
    if (!phoneNumber.trim()) return "Phone Number is required";
    if (!address.trim()) return "Address is required";
    return "";
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsLoading(true);
    setTimeout(() => {
      alert("Lead Added Successfully!");
      setIsLoading(false);
      setRestaurantName("");
      setRestaurantType("");
      setLeadStatus("");
      setPrimaryContactName("");
      setRole("");
      setPhoneNumber("");
      setEmailAddress("");
      setAddress("");
      setNotes("");
      navigate("/leads");
    }, 1500);
  };

  return (
    <div className="backdrop">
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">Add New Lead</h2>
          <button
            aria-label="Close"
            className="close-button"
            onClick={() => navigate("/leads")}
          >
            &times;
          </button>
        </div>

        {/* Error Alert */}
        {error && <div className="error-alert">{error}</div>}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-text">Adding lead...</div>
          </div>
        )}

        {/* Form */}
        <form className="form" onSubmit={handleAddLead}>
          {/* Basic Information */}
          <section className="section">
            <h3 className="section-title">Basic Information</h3>
            <div className="form-row">
              <TextInput
                label="Restaurant Name*"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="Enter the restaurant name"
              />
            </div>
            <div className="form-row">
              <SelectInput
                label="Restaurant Type"
                value={restaurantType}
                onChange={(e) => setRestaurantType(e.target.value)}
                options={restaurantTypes}
              />
              <SelectInput
                label="Lead Status"
                value={leadStatus}
                onChange={(e) => setLeadStatus(e.target.value)}
                options={leadStatuses}
              />
            </div>
          </section>

          {/* Contact Information */}
          <section className="section">
            <h3 className="section-title">Contact Information</h3>
            <div className="form-row">
              <TextInput
                label="Primary Contact Name*"
                value={primaryContactName}
                onChange={(e) => setPrimaryContactName(e.target.value)}
                placeholder="e.g. John Doe"
              />
              <TextInput
                label="Role*"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Manager"
              />
            </div>
            <div className="form-row">
              <TextInput
                label="Phone Number*"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. (123) 456-7890"
              />
              <TextInput
                label="Email Address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="e.g. example@mail.com"
                type="email"
              />
            </div>
          </section>

          {/* Additional Details */}
          <section className="section">
            <h3 className="section-title">Additional Details</h3>
            <div className="form-row">
              <TextArea
                label="Address*"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter the address"
              />
            </div>
            <div className="form-row">
              <TextArea
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional information..."
              />
            </div>
          </section>

          {/* Action Buttons */}
          <div className="actions">
            <button
              type="button"
              className="button cancel-button"
              onClick={() => navigate("/leads")}
            >
              Cancel
            </button>
            <button type="submit" className="button primary-button">
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * A reusable text input component.
 */
function TextInput({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="input-container">
      <label className="label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
      />
    </div>
  );
}

/**
 * A reusable select component.
 */
function SelectInput({ label, value, onChange, options = [] }) {
  return (
    <div className="input-container">
      <label className="label">{label}</label>
      <select value={value} onChange={onChange} className="select">
        <option value="">Select...</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * A reusable textarea component.
 */
function TextArea({ label, value, onChange, placeholder }) {
  return (
    <div className="input-container">
      <label className="label">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="textarea"
        rows={3}
      />
    </div>
  );
}

export default AddLeadModal;
