import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function AddLeadModal({ onClose }) {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [interactionDate, setInteractionDate] = useState(new Date());
  const [followUpDate, setFollowUpDate] = useState(new Date());
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pocs, setPocs] = useState([]);
  const [interactionTitle, setInteractionTitle] = useState("");
  const [selectedPocId, setSelectedPocId] = useState("");
  const [interactionType, setInteractionType] = useState("");
  const [details, setDetails] = useState("");
  const [outcome, setOutcome] = useState("");
  const [restaurants, setRestaurants] = useState([]);

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

        // Fetch token from localStorage or any secure storage
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cmFqMy5nbWFpbC5jb20iLCJyb2xlIjoia20ucm9sZTEiLCJpYXQiOjE3MzU5NTEwMTMsImV4cCI6MTczNjIxMDIxM30.7wX8ShxYl8BxqMx0rh0YQPUOww8JE6sjNCMyG6VEGE4"
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:3000/api/leads", {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch restaurants");

        const data = await response.json();
        setRestaurants(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching restaurants");
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Fetch POCs based on the selected restaurant
  useEffect(() => {
    const fetchPOCs = async () => {
      if (!selectedRestaurantId) return;

      try {
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cmFqMy5nbWFpbC5jb20iLCJyb2xlIjoia20ucm9sZTEiLCJpYXQiOjE3MzU5NTEwMTMsImV4cCI6MTczNjIxMDIxM30.7wX8ShxYl8BxqMx0rh0YQPUOww8JE6sjNCMyG6VEGE4"
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          `http://localhost:3000/api/contacts/${selectedRestaurantId}`,
          {
            headers: {
              token: token,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) throw new Error("Failed to fetch POCs");

        const data = await response.json();
        setPocs(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching POCs");
      }
    };

    fetchPOCs();
  }, [selectedRestaurantId]);

  const validateForm = () => {
    if (!restaurantName.trim()) return "Restaurant Name is required";
    return "";
  };
  // Handle restaurant selection
  const handleRestaurantChange = (e) => {
    const selectedRestaurant = restaurants.find(
      (r) => r.name === e.target.value,
    );
    if (selectedRestaurant) {
      setSelectedRestaurantId(selectedRestaurant.restaurant_id);
    }
    setRestaurantName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cmFqMy5nbWFpbC5jb20iLCJyb2xlIjoia20ucm9sZTEiLCJpYXQiOjE3MzU5NTEwMTMsImV4cCI6MTczNjIxMDIxM30.7wX8ShxYl8BxqMx0rh0YQPUOww8JE6sjNCMyG6VEGE4"
      const token = localStorage.getItem("jwtToken");
      console.log("selectedRestaurantId", selectedRestaurantId);
      console.log("poc_id", selectedPocId);

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
      console.error(err);
      setError("Error creating interaction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modalContainer}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Add New Interaction</h2>
          <button
            aria-label="Close"
            style={styles.closeButton}
            onClick={() => navigate("/")}
          >
            &times;
          </button>
        </div>

        {error && <div style={styles.errorAlert}>{error}</div>}

        {isLoading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingText}>Recording interaction...</div>
          </div>
        )}

        <form style={styles.form} onSubmit={handleSubmit}>
          <section style={styles.section}>
            <div style={styles.formRow}>
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
            <div style={styles.formRow}>
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

          <section style={styles.section}>
            <div style={styles.formRow}>
              <div style={styles.inputContainer}>
                <label htmlFor="interactionDate" style={styles.label}>
                  Interaction Date
                </label>
                <DatePicker
                  id="interactionDate"
                  selected={interactionDate}
                  onChange={(date) => setInteractionDate(date)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  dateFormat="dd/MM/yy"
                />
              </div>
              <div style={styles.inputContainer}>
                <label htmlFor="followUpDate" style={styles.label}>
                  Follow Up Date
                </label>
                <DatePicker
                  id="followUpDate"
                  selected={followUpDate}
                  onChange={(date) => setFollowUpDate(date)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  dateFormat="dd/MM/yy"
                />
              </div>
            </div>
          </section>

          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Details</h3>
            <div style={styles.formRow}>
              <TextArea
                label="Summary*"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Summary of interaction..."
              />
            </div>
            <div style={styles.formRow}>
              <TextArea
                label="Outcome"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Outcome of interaction..."
              />
            </div>
          </section>

          <div style={styles.actions}>
            <button
              type="button"
              style={{ ...styles.button, ...styles.cancelButton }}
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.primaryButton }}
            >
              Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder, type = "text" }) {
  const id = label.replace(/\s+/g, "_").toLowerCase();
  return (
    <div style={styles.inputContainer}>
      <label htmlFor={id} style={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={styles.input}
      />
    </div>
  );
}

function SelectInput({ label, value, onChange, options = [] }) {
  const id = label.replace(/\s+/g, "_").toLowerCase();
  return (
    <div style={styles.inputContainer}>
      <label htmlFor={id} style={styles.label}>
        {label}
      </label>
      <select id={id} value={value} onChange={onChange} style={styles.select}>
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
    <div style={styles.inputContainer}>
      <label htmlFor={id} style={styles.label}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={styles.textarea}
        rows={3}
      />
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modalContainer: {
    background: "#fff",
    width: "90%",
    maxWidth: "600px",
    borderRadius: "8px",
    padding: "1.5rem",
    position: "relative",
    boxSizing: "border-box",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  modalTitle: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "600",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    lineHeight: 1,
    color: "#999",
    transition: "color 0.2s",
  },
  errorAlert: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    borderRadius: "4px",
    padding: "0.75rem",
    marginBottom: "1rem",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "calc(100% - 3rem)",
    height: "calc(100% - 3rem)",
    background: "rgba(255,255,255,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
  },
  loadingText: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  section: {
    marginBottom: "1rem",
  },
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },
  formRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1rem",
  },
  inputContainer: {
    flex: 1,
    minWidth: "200px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.25rem",
    fontWeight: 500,
    fontSize: "0.9rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "0.9rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
  },
  select: {
    padding: "0.5rem",
    fontSize: "0.9rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
  },
  textarea: {
    padding: "0.5rem",
    fontSize: "0.9rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    resize: "vertical",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
    marginTop: "1rem",
  },
  button: {
    cursor: "pointer",
    padding: "0.6rem 1.2rem",
    fontSize: "0.9rem",
    borderRadius: "4px",
    border: "none",
    transition: "background-color 0.2s",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    color: "#333",
  },
  primaryButton: {
    backgroundColor: "#0d6efd",
    color: "#fff",
  },
};

export default AddLeadModal;
