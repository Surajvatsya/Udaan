import React from "react";
import "./ContactList.css";

function ContactList({ contacts }) {
  return (
    <div className="contact-list">
      <h3>Contacts</h3>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.name}</strong> - {contact.role} <br />
            {contact.phone ? `📞 ${contact.phone}` : ""}{" "}
            {contact.email ? `✉️ ${contact.email}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
