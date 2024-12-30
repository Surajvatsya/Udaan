import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddLeadModal({ onClose }) {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantType, setRestaurantType] = useState('');
  const [leadStatus, setLeadStatus] = useState('');
  const [primaryContactName, setPrimaryContactName] = useState('');
  const [role, setRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [interactionDate, setInteractionDate] = useState(new Date());

  // Items state
  const [items, setItems] = useState([{ itemName: '', quantity: 1, price: 0.0, instructions: '' }]);

  // Sample loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample data for selection fields
  const restaurantTypes = ['Fast Food', 'Casual Dining', 'Fine Dining', 'Cafe'];
  const leadStatuses = ['New', 'Contacted', 'Qualified', 'Converted'];

  /**
   * Simple form validation for required fields
   * Returns an error message if any required field is empty.
   */
  const validateForm = () => {
    if (!restaurantName.trim()) return 'Restaurant Name is required';
    if (!primaryContactName.trim()) return 'Primary Contact Name is required';
    if (!role.trim()) return 'Role is required';
    if (!phoneNumber.trim()) return 'Phone Number is required';
    if (!address.trim()) return 'Address is required';
    return '';
  };

  /**
   * Handle form submission
   */
  const handleAddLead = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate an API request
    setTimeout(() => {
      alert('Lead Added Successfully!');
      setIsLoading(false);

      // Reset form fields
      setRestaurantName('');
      setRestaurantType('');
      setLeadStatus('');
      setPrimaryContactName('');
      setRole('');
      setPhoneNumber('');
      setEmailAddress('');
      setAddress('');
      setNotes('');
      setItems([{ itemName: '', quantity: 1, price: 0.0, instructions: '' }]);

      // You could also close the modal after successful submission
      // onClose();
    }, 1500);
  };

  /**
   * Handle item change
   */
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  /**
   * Add a new item row
   */
  const handleAddItem = () => {
    setItems([...items, { itemName: '', quantity: 1, price: 0.0, instructions: '' }]);
  };

  /**
   * Remove an item row
   */
  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modalContainer}>
        {/* Modal Header */}
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Add New Order</h2>
          <button aria-label="Close" style={styles.closeButton} onClick={() => navigate('/')}>
            &times;
          </button>
        </div>

        {/* Error Alert */}
        {error && <div style={styles.errorAlert}>{error}</div>}

        {/* Loading Indicator */}
        {isLoading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingText}>Adding lead...</div>
          </div>
        )}

        {/* Form */}
        <form style={styles.form} onSubmit={handleAddLead}>
          {/* BASIC INFORMATION */}
          <section style={styles.section}>
            <div style={styles.formRow}>
              <TextInput
                label="Order Title*"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="Enter the Order name"
              />
              <SelectInput
                label="Restaurant Name*"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                options={restaurantTypes}
              />
            </div>
          </section>

          {/* CONTACT INFORMATION */}
          <section style={styles.section}>
            <div style={styles.formRow}>
              <SelectInput
                label="Order By (POC)*"
                value={restaurantType}
                onChange={(e) => setPrimaryContactName(e.target.value)}
                options={restaurantTypes}
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
            </div>
          </section>

          {/* ITEMS SECTION */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Order Items</h3>
            {items.map((item, index) => (
              <div key={index} style={{ ...styles.itemContainer, position: 'relative' }}>
                <button
                  type="button"
                  aria-label="Remove item"
                  style={{ ...styles.closeButton, position: 'absolute', top: '-10px', right: '10px' }}
                  onClick={() => handleRemoveItem(index)}
                >
                  &times;
                </button>
                <div style={styles.formRow}>
                  <TextInput
                    label="Item Name*"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                    placeholder="Enter item name"
                  />
                  <TextInput
                    label="Quantity*"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    type="number"
                  />
                  <TextInput
                    label="Price*"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    type="number"
                    step="0.01"
                  />
                  <TextInput
                    label="Instructions*"
                    value={item.instructions}
                    onChange={(e) => handleItemChange(index, 'instructions', e.target.value)}
                    placeholder="Enter any instructions"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              style={{ ...styles.button, ...styles.primaryButton }}
              onClick={handleAddItem}
            >
              Add Item
            </button>
          </section>

          {/* ACTION BUTTONS */}
          <div style={styles.actions}>
            <button
              type="button"
              style={{ ...styles.button, ...styles.cancelButton }}
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button type="submit" style={{ ...styles.button, ...styles.primaryButton }}>
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
function TextInput({ label, value, onChange, placeholder, type = 'text' }) {
  const id = label.replace(/\s+/g, '_').toLowerCase(); // For associating label & input
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
  const id = label.replace(/\s+/g, '_').toLowerCase();
  return (
    <div style={styles.inputContainer}>
      <label htmlFor={id} style={styles.label}>
        {label}
      </label>
      <select id={id} value={value} onChange={onChange} style={styles.select}>
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
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
  const id = label.replace(/\s+/g, '_').toLowerCase();
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

/**
 * Inline styling for simplicity.
 * In a production app, consider using a separate CSS/SCSS file,
 * CSS Modules, or a CSS-in-JS library (Styled Components, etc.).
 */
const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.5)',
    // Simple fade-in animation
    animation: 'fadeIn 0.3s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modalContainer: {
    background: '#fff',
    width: '90%',
    maxWidth: '600px',
    borderRadius: '8px',
    padding: '1.5rem',
    position: 'relative',
    boxSizing: 'border-box',
    maxHeight: '90vh',
    overflowY: 'auto',
    // Simple fade-in scaling
    animation: 'scaleIn 0.3s ease-in-out',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    lineHeight: 1,
    color: '#999',
    transition: 'color 0.2s',
  },
  errorAlert: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    padding: '0.75rem',
    marginBottom: '1rem',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'calc(100% - 3rem)', // account for container padding
    height: 'calc(100% - 3rem)',
    background: 'rgba(255,255,255,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
  },
  loadingText: {
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    marginBottom: '1rem',
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  formRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '1rem',
  },
  inputContainer: {
    flex: 1,
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.25rem',
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '0.9rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
  },
  select: {
    padding: '0.5rem',
    fontSize: '0.9rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
  },
  textarea: {
    padding: '0.5rem',
    fontSize: '0.9rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    resize: 'vertical',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1rem',
  },
  button: {
    cursor: 'pointer',
    padding: '0.6rem 1.2rem',
    fontSize: '0.9rem',
    borderRadius: '4px',
    border: 'none',
    transition: 'background-color 0.2s',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#0d6efd',
    color: '#fff',
  },
};

// Optional keyframe animations (could be in a CSS file)
const fadeInStyle = document.createElement('style');
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

export default AddLeadModal;
