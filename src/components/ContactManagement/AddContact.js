import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css"; 

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

  // Form Validation
  const validateForm = () => {
    if (!pocName.trim()) return "POC Name is required";
    if (!role.trim()) return "Role is required";
    if (!phoneNumber.trim()) return "Phone Number is required";
    return "";
  };

  // Fetch Restaurants
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
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching restaurants");
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Handle Form Submission
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
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) throw new Error("Failed to add POC");
      alert("POC Added Successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Error adding POC");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add POC</h2>
          <button
            aria-label="Close"
            className="close-button"
            onClick={() => navigate("/")}
          >
            &times;
          </button>
        </div>

        {error && <div className="error-alert">{error}</div>}

        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-text">Adding POC...</div>
          </div>
        )}

        <form className="form" onSubmit={handleAddPoc}>
          <section className="section">
            <div className="form-row">
              <TextInput
                label="Full Name*"
                value={pocName}
                onChange={(e) => setPocName(e.target.value)}
                placeholder="Enter POC Name"
              />
            </div>
          </section>

          <section className="section">
            <div className="form-row">
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

          <div className="actions">
            <button
              type="button"
              className="button cancel-button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button type="submit" className="button primary-button">
              Add POC
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// TextInput Component
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

// SelectInput Component
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

export default AddContact;
