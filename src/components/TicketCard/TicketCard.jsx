import React from 'react';
import './TicketCard.css';
const TicketCard = ({ ticket }) => {
    return (
        <div className="ticket-card">
            <h3>{ticket.title}</h3>
            <p><strong>Assigned to:</strong> {ticket.user}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p>{ticket.description}</p>
        </div>
    );
};

export default TicketCard;