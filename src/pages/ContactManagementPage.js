import React, { useState, useEffect } from "react";
import AddContacts from "../components/ContactManagement/AddContact";

function ContactManagementPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts from the backend
    async function fetchContacts() {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch("http://13.127.185.23:4000/api/contacts", {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setContacts(data);
    }
    fetchContacts();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <AddContacts
        onAdd={(newContact) => setContacts([...contacts, newContact])}
      />
    </div>
  );
}

export default ContactManagementPage;
