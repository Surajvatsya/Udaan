import React, { useEffect, useState } from "react";
import "../../styles/LeadDetails.css";

function LeadDetails({ leadId }) {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeadDetails() {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          `http://your-backend-api/leads/${leadId}`,
          {
            headers: {
              token,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch lead details.");
        }
        const data = await response.json();
        setLead(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLeadDetails();
  }, [leadId]);

  if (loading) {
    return <p>Loading lead details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="lead-details">
      <h2>Lead Details</h2>
      <div className="lead-info">
        <p>
          <strong>Name:</strong> {lead.name}
        </p>
        <p>
          <strong>Status:</strong> {lead.status}
        </p>
        <p>
          <strong>Description:</strong> {lead.description}
        </p>
      </div>

      <div className="lead-contacts">
        <h3>Contacts</h3>
        {lead.contacts && lead.contacts.length > 0 ? (
          <ul>
            {lead.contacts.map((contact) => (
              <li key={contact.id}>
                <strong>{contact.name}</strong> - {contact.role} -{" "}
                {contact.phone}
              </li>
            ))}
          </ul>
        ) : (
          <p>No contacts available.</p>
        )}
      </div>

      <div className="lead-interactions">
        <h3>Interactions</h3>
        {lead.interactions && lead.interactions.length > 0 ? (
          <ul>
            {lead.interactions.map((interaction) => (
              <li key={interaction.id}>
                <p>
                  <strong>Date:</strong> {interaction.date}
                </p>
                <p>
                  <strong>Details:</strong> {interaction.details}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No interactions recorded yet.</p>
        )}
      </div>
    </div>
  );
}

export default LeadDetails;
