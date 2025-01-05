import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/global.css";

function AddInteraction() {
  const navigate = useNavigate();
  const [interactionTitle, setInteractionTitle] = useState("");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [selectedPocId, setSelectedPocId] = useState("");
  const [interactionType, setInteractionType] = useState("");
  const [details, setDetails] = useState("");
  const [outcome, setOutcome] = useState("");
  const [interactionDate, setInteractionDate] = useState(new Date());
  const [followUpDate, setFollowUpDate] = useState(new Date());
  const [restaurants, setRestaurants] = useState([]);
  const [pocs, setPocs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const interactionTypes = [
    "Phone Call",
    "Email",
    "Meeting",
    "Follow-up",
    "Demo",
    "Proposal Discussion",
    "Negotiation",
    "Contract Signing",
    "Feedback Collection",
    "Issue Resolution",
    "WhatsApp Chat",
    "SMS",
    "Video Conference",
    "Inquiry Response",
    "Contract Renewal Discussion",
    "Billing/Payment Discussion",
    "Complaint Handling",
  ];


  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:3000/api/leads", {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch restaurants");

        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError("Error fetching restaurants");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);


  useEffect(() => {
    const fetchPocs = async () => {
      if (!selectedRestaurantId) return;

      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          `http://localhost:3000/api/contacts/${selectedRestaurantId}`,
          {
            headers: {
              token,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch POCs");

        const data = await response.json();
        setPocs(data);
      } catch (err) {
        setError("Error fetching POCs");
      }
    };

    fetchPocs();
  }, [selectedRestaurantId]);


  const validateForm = () => {
    if (!interactionTitle.trim()) return "Interaction Title is required";
    if (!selectedRestaurantId) return "Restaurant selection is required";
    if (!selectedPocId) return "POC selection is required";
    return "";
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("jwtToken");

      const response = await fetch("http://localhost:3000/api/interactions", {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurant_id: selectedRestaurantId,
          interaction_title: interactionTitle,
          poc_id: selectedPocId,
          interaction_type: interactionType,
          details,
          outcome,
          interaction_date: interactionDate.toISOString(),
          follow_up_date: followUpDate.toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to create interaction");

      alert("Interaction Recorded Successfully!");
      navigate("/");
    } catch (err) {
      setError("Error creating interaction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add New Interaction</h2>
          <button className="close-button" onClick={() => navigate("/")}>
            &times;
          </button>
        </div>

        {error && <div className="error-alert">{error}</div>}

        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-text">Recording interaction...</div>
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <section className="section">
            <div className="form-row">
              <TextInput
                label="Interaction Title*"
                value={interactionTitle}
                onChange={(e) => setInteractionTitle(e.target.value)}
                placeholder="Enter the Interaction Title"
              />
              <SelectInput
                label="Choose Restaurant"
                value={selectedRestaurantId}
                onChange={(e) => setSelectedRestaurantId(e.target.value)}
                options={restaurants.map((r) => ({
                  value: r.restaurant_id,
                  label: r.name,
                }))}
              />
            </div>
            <div className="form-row">
              <SelectInput
                label="Choose POC"
                value={selectedPocId}
                onChange={(e) => setSelectedPocId(e.target.value)}
                options={pocs.map((poc) => ({
                  value: poc.poc_id,
                  label: poc.name,
                }))}
              />
              <SelectInput
                label="Interaction Type"
                value={interactionType}
                onChange={(e) => setInteractionType(e.target.value)}
                options={interactionTypes.map((type) => ({
                  value: type,
                  label: type,
                }))}
              />
            </div>
          </section>

          <section className="section">
            <div className="form-row">
              <div className="input-container">
                <label htmlFor="interactionDate" className="label">
                  Interaction Date
                </label>
                <DatePicker
                  id="interactionDate"
                  selected={interactionDate}
                  onChange={(date) => setInteractionDate(date)}
                  className="input date-picker"
                  dateFormat="dd/MM/yy"
                />
              </div>
              <div className="input-container">
                <label htmlFor="followUpDate" className="label">
                  Follow Up Date
                </label>
                <DatePicker
                  id="followUpDate"
                  selected={followUpDate}
                  onChange={(date) => setFollowUpDate(date)}
                  className="input date-picker"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  dateFormat="dd/MM/yy"
                />
              </div>
            </div>
          </section>


          <section className="section">
            <h3 className="section-title">Details</h3>
            <div className="form-row">
              <TextArea
                label="Summary"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Summary of interaction..."
              />
            </div>
            <div className="form-row">
              <TextArea
                label="Outcome"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                placeholder="Outcome of interaction..."
              />
            </div>
          </section>


          <div className="actions">
            <button className="button cancel-button" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button type="submit" className="button primary-button">
              Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInteraction;


function SelectInput({ label, value, onChange, options = [] }) {
  return (
    <div className="input-container">
      <label className="label">{label}</label>
      <select value={value} onChange={onChange} className="select">
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder }) {
  const id = label.replace(/\s+/g, "_").toLowerCase();
  return (
    <div className="input-container">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="textarea"
        rows={3}
      />
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder, type = "text" }) {
  const id = label.replace(/\s+/g, "_").toLowerCase();
  return (
    <div className="input-container">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
      />
    </div>
  );
}