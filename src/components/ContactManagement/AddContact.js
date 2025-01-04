import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddContact({ onClose }) {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [pocName, setPocName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!pocName.trim()) return "POC Name is required";
    if (!role.trim()) return "Role is required";
    if (!phoneNumber.trim()) return "Phone Number is required";
    return "";
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
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

  /**
   * Handle form submission
   */
  const handleAddPoc = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("jwtToken");
      const reqBody = {
        restaurant_id: selectedRestaurantId,
        name: pocName,
        role,
        phone_number: phoneNumber,
        email: emailAddress,
      };

      const response = await fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) throw new Error("Failed to add POC");

      alert("POC Added Successfully!");
      setIsLoading(false);

      // Reset form fields
      setSelectedRestaurantId("");
      setPocName("");
      setRole("");
      setPhoneNumber("");
      setEmailAddress("");

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Error adding POC");
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modalContainer}>
        {/* Modal Header */}
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Add POC</h2>
          <button
            aria-label="Close"
            style={styles.closeButton}
            onClick={() => navigate("/")}
          >
            &times;
          </button>
        </div>

        {/* Error Alert */}
        {error && <div style={styles.errorAlert}>{error}</div>}

        {/* Loading Indicator */}
        {isLoading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingText}>Adding Poc...</div>
          </div>
        )}

        {/* Form */}
        <form style={styles.form} onSubmit={handleAddPoc}>
          {/* BASIC INFORMATION */}
          <section style={styles.section}>
            {/* <h3 style={styles.sectionTitle}>Basic Information</h3> */}
            <div style={styles.formRow}>
              <TextInput
                label="Full Name*"
                value={pocName}
                onChange={(e) => setPocName(e.target.value)}
                placeholder="Enter POC Name"
              />
            </div>
          </section>

          {/* CONTACT INFORMATION */}
          <section style={styles.section}>
            {/* <h3 style={styles.sectionTitle}>Contact Information</h3> */}
            <div style={styles.formRow}>
              <SelectInput
                label="Choose Restaurant"
                value={selectedRestaurantId}
                onChange={(e) => setSelectedRestaurantId(e.target.value)}
                options={restaurants.map((r) => ({
                  value: r.restaurant_id,
                  label: r.name,
                }))}
              />
              <TextInput
                label="Role*"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Manager"
              />
            </div>
            <div style={styles.formRow}>
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

          {/* ADDITIONAL DETAILS
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Additional Details</h3>
            <div style={styles.formRow}>
              <TextArea
                label="Address*"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter the address"
              />
            </div>
            <div style={styles.formRow}>
              <TextArea
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional information..."
              />
            </div>
          </section> */}

          {/* ACTION BUTTONS */}
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
              Add Poc
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
  const id = label.replace(/\s+/g, "_").toLowerCase(); // For associating label & input
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

/**
 * A reusable select component.
 */
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

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)",
    // Simple fade-in animation
    animation: "fadeIn 0.3s ease-in-out",
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
    // Simple fade-in scaling
    animation: "scaleIn 0.3s ease-in-out",
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
    width: "calc(100% - 3rem)", // account for container padding
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

// Optional keyframe animations (could be in a CSS file)
const fadeInStyle = document.createElement("style");
fadeInStyle.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleIn {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}
`;
document.head.appendChild(fadeInStyle);

export default AddContact;
