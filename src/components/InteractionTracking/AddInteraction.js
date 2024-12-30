import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

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
  const [followUpDate, setFollowUpDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const restaurantTypes = ['Fast Food', 'Casual Dining', 'Fine Dining', 'Cafe'];
  const leadStatuses = ['New', 'Contacted', 'Qualified', 'Converted'];

  const validateForm = () => {
    if (!restaurantName.trim()) return 'Restaurant Name is required';
    if (!primaryContactName.trim()) return 'Primary Contact Name is required';
    if (!role.trim()) return 'Role is required';
    if (!phoneNumber.trim()) return 'Phone Number is required';
    if (!address.trim()) return 'Address is required';
    return '';
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      alert('Lead Added Successfully!');
      setIsLoading(false);

      setRestaurantName('');
      setRestaurantType('');
      setLeadStatus('');
      setPrimaryContactName('');
      setRole('');
      setPhoneNumber('');
      setEmailAddress('');
      setAddress('');
      setNotes('');
      setInteractionDate(new Date());
      setFollowUpDate(new Date());

      navigate('/');
    }, 1500);
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modalContainer}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Add New Interaction</h2>
          <button aria-label="Close" style={styles.closeButton} onClick={() => navigate('/')}>
            &times;
          </button>
        </div>

        {error && <div style={styles.errorAlert}>{error}</div>}

        {isLoading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingText}>Adding lead...</div>
          </div>
        )}

        <form style={styles.form} onSubmit={handleAddLead}>
          <section style={styles.section}>
            <div style={styles.formRow}>
              <TextInput
                label="Interaction Title*"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="Enter the Interaction Title"
              />
            </div>
            <div style={styles.formRow}>
              <SelectInput
                label="Choose POC"
                value={restaurantType}
                onChange={(e) => setRestaurantType(e.target.value)}
                options={restaurantTypes}
              />
              <SelectInput
                label="Interaction Type"
                value={leadStatus}
                onChange={(e) => setLeadStatus(e.target.value)}
                options={leadStatuses}
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
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button type="submit" style={{ ...styles.button, ...styles.primaryButton }}>
              Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder, type = 'text' }) {
  const id = label.replace(/\s+/g, '_').toLowerCase();
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

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.5)',
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
    width: 'calc(100% - 3rem)',
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

export default AddLeadModal;
