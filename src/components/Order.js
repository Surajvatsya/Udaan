import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/global.css";

function AddLeadModal({ onClose }) {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [interactionDate, setInteractionDate] = useState(new Date());

  const [items, setItems] = useState([
    { itemName: "", quantity: 1, price: 0.0, instructions: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [pocs, setPocs] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [selectedPocId, setSelectedPocId] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:3000/api/leads", {
          headers: {
            token,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch restaurants");
        const data = await response.json();
        setRestaurants(
          data.map((r) => ({ value: r.restaurant_id, label: r.name }))
        );
      } catch (err) {
        setError("Error fetching restaurants");
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (!selectedRestaurantId) return;

    const fetchPocs = async () => {
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

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { itemName: "", quantity: 1, price: 0.0, instructions: "" },
    ]);
  };

  const validateForm = () => {
    if (!phoneNumber.trim()) return "Phone Number is required";
    return "";
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const orderData = {
      restaurant_id: selectedRestaurantId,
      order_by: selectedPocId,
      order_date: interactionDate.toISOString(),
      order_status: "Pending",
      items: items.map((item) => ({
        item_name: item.itemName,
        quantity: item.quantity,
        price: item.price,
        instructions: item.instructions,
      })),
    };

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to add order");
      alert("Order Added Successfully!");
      navigate("/");
    } catch (err) {
      setError("Error adding order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Add New Order</h2>
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
            <div className="loading-text">Adding lead...</div>
          </div>
        )}

        <form className="form" onSubmit={handleAddOrder}>
          <section className="section">
            <div className="form-row">
              <SelectInput
                label="Restaurant Name*"
                value={selectedRestaurantId}
                onChange={(e) => setSelectedRestaurantId(e.target.value)}
                options={restaurants}
              />
              <SelectInput
                label="Order By (POC)*"
                value={selectedPocId}
                onChange={(e) => setSelectedPocId(e.target.value)}
                options={pocs.map((poc) => ({
                  value: poc.poc_id,
                  label: poc.name,
                }))}
              />
            </div>
          </section>

          <section className="section">
            <div className="form-row">
              <TextInput
                label="Phone Number*"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. (123) 456-7890"
              />
              <div className="input-container">
                <label htmlFor="interactionDate" className="label">
                  Interaction Date
                </label>
                <DatePicker
                  id="interactionDate"
                  selected={interactionDate}
                  onChange={(date) => setInteractionDate(date)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  dateFormat="dd/MM/yy"
                />
              </div>
            </div>
          </section>

          <section className="section">
            <h3 className="section-title">Order Items</h3>
            {items.map((item, index) => (
              <div key={index} className="item-container" style={{ position: "relative" }}>
                <button
                  type="button"
                  aria-label="Remove item"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "10px",
                  }}
                  className="close-button"
                  onClick={() => handleRemoveItem(index)}
                >
                  &times;
                </button>
                <div className="form-row">
                  <TextInput
                    label="Item Name*"
                    value={item.itemName}
                    onChange={(e) =>
                      handleItemChange(index, "itemName", e.target.value)
                    }
                    placeholder="Enter item name"
                  />
                  <TextInput
                    label="Quantity*"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    type="number"
                  />
                  <TextInput
                    label="Price*"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value)
                    }
                    type="number"
                    step="0.01"
                  />
                  <TextInput
                    label="Instructions"
                    value={item.instructions}
                    onChange={(e) =>
                      handleItemChange(index, "instructions", e.target.value)
                    }
                    placeholder="Enter any instructions"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="button primary-button add-item"
              onClick={handleAddItem}
            >
              Add Item
            </button>
          </section>

          <div className="actions">
            <button
              type="button"
              className="button cancel-button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button primary-button"
            >
              Place Order
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

function SelectInput({ label, value, onChange, options }) {
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

export default AddLeadModal;
