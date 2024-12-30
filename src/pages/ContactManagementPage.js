import React, { useState, useEffect } from "react";
import AddContacts from "../components/ContactManagement/AddContact";
// import ContactList from "../components/ContactManagement/ContactList";

function ContactManagementPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts from the backend
    async function fetchContacts() {
      const response = await fetch("http://localhost:3000/api/contacts");
      const data = await response.json();
      setContacts(data);
    }
    fetchContacts();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* <h2>Contact Management</h2> */}
      <AddContacts onAdd={(newContact) => setContacts([...contacts, newContact])} />
      {/* <ContactList contacts={contacts} /> */}
    </div>
  );
}

export default ContactManagementPage;
