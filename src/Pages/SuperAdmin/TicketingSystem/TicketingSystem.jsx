import React, { useState } from 'react'
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const TicketingSystem = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      department: "IT Support",
      number_of_people: 5,
      ticket_name: "Network Issue",
      pending_tickets: 3,
      priority: "High",
      company_reporting: "Monki Travels",
      issue_type: "Network",
      issue_description: "Internet connectivity issue in the office.",
    },
    {
      id: 2,
      department: "Customer Service",
      number_of_people: 8,
      ticket_name: "Payment Dispute",
      pending_tickets: 1,
      priority: "Medium",
      company_reporting: "Sunny Adventures",
      issue_type: "Billing",
      issue_description: "Dispute regarding a double-charged invoice.",
    },
  ]);

  const handleView = (id) => {
    alert(`View details for ticket ID: ${id}`);
  };

  const navigate = useNavigate()

  const handleUpdate = (ticketId) => {
    navigate(`/super_admin/ticketing_system/update/${ticketId}`);
  };

  const handleDelete = (id, ticketName) => {
    if (window.confirm(`Are you sure you want to delete the ticket: ${ticketName}?`)) {
      setTickets(tickets.filter((ticket) => ticket.id !== id));
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
  
      <table className="w-full min-w-[1200px] border border-gray-200 text-left text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
            <th className="px-4 py-3 border-b">Department</th>
            <th className="px-4 py-3 border-b">Number Of People</th>
            <th className="px-4 py-3 border-b">Ticket Name</th>
            <th className="px-4 py-3 border-b">Pending Tickets</th>
            <th className="px-4 py-3 border-b">Priority</th>
            <th className="px-4 py-3 border-b">Company Reporting Issue</th>
            <th className="px-4 py-3 border-b">Issue Type</th>
            <th className="px-4 py-3 border-b">Issue Description</th>
            <th className="px-4 py-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="hover:bg-gray-50 transition-colors duration-200 border-b text-center"
            >
              <td className="px-4 py-3">{ticket.department}</td>
              <td className="px-4 py-3">{ticket.number_of_people}</td>
              <td className="px-4 py-3">{ticket.ticket_name}</td>
              <td className="px-4 py-3">{ticket.pending_tickets}</td>
              <td className="px-4 py-3">{ticket.priority}</td>
              <td className="px-4 py-3">{ticket.company_reporting}</td>
              <td className="px-4 py-3">{ticket.issue_type}</td>
              <td className="px-4 py-3">{ticket.issue_description}</td>
              <td className="px-4 py-3 flex justify-center items-center gap-2">
                <button
                  onClick={() => handleView(ticket.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleUpdate(ticket.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(ticket.id, ticket.ticket_name)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketingSystem