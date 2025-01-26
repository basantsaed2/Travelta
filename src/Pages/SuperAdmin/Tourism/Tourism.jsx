import React, { useState } from 'react'
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Tourism = () => {
  const [dataHotel, setDataHotel] = useState([
    {
      id: 1,
      hotel_name: "Monki Tourism Hotel",
      email: "contact@monkitourism.com",
      phone_number: "+1234567890",
      zone: "North Zone",
      joined_date: "2024-01-01",
      total_commission: 5000,
      total_booking: 120,
      hotel_logo: "https://via.placeholder.com/150",
      wallet: 15000,
      status: "Approved",
    },
    {
      id: 2,
      hotel_name: "Sunset Paradise Inn",
      email: "info@sunsetparadise.com",
      phone_number: "+9876543210",
      zone: "South Zone",
      joined_date: "2024-02-15",
      total_commission: 3200,
      total_booking: 85,
      hotel_logo: "https://via.placeholder.com/150",
      wallet: 8000,
      status: "Pending",
    },
  ]);

  const navigate = useNavigate()

  const handleUpdate = (tourismId) => {
    navigate(`/super_admin/tourism/update/${tourismId}`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setDataHotel(dataHotel.filter((hotel) => hotel.id !== id));
    }
  };

  const handleApprove = (id) => {
    setDataHotel(
      dataHotel.map((hotel) =>
        hotel.id === id ? { ...hotel, status: "Approved" } : hotel
      )
    );
  };

  const handleReject = (id) => {
    setDataHotel(
      dataHotel.map((hotel) =>
        hotel.id === id ? { ...hotel, status: "Rejected" } : hotel
      )
    );
  };

  return (
    <div className="p-4 overflow-x-auto">
    
      <table className="w-full min-w-[800px] border border-gray-200 text-left text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
            <th className="px-4 py-3 border-b">Name</th>
            <th className="px-4 py-3 border-b">Email</th>
            <th className="px-4 py-3 border-b">Phone Number</th>
            <th className="px-4 py-3 border-b">Zone</th>
            <th className="px-4 py-3 border-b">Joined Date</th>
            <th className="px-4 py-3 border-b">Total Commission</th>
            <th className="px-4 py-3 border-b">Total Booking</th>
            <th className="px-4 py-3 border-b">Documents</th>
            <th className="px-4 py-3 border-b">Wallet</th>
            <th className="px-4 py-3 border-b">Status</th>
            <th className="px-4 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {dataHotel.map((hotel) => (
            <tr
              key={hotel.id}
              className="hover:bg-gray-50 transition-colors duration-200 border-b text-center"
            >
              <td className="px-4 py-3">{hotel.hotel_name}</td>
              <td className="px-4 py-3">{hotel.email}</td>
              <td className="px-4 py-3">{hotel.phone_number}</td>
              <td className="px-4 py-3">{hotel.zone}</td>
              <td className="px-4 py-3">{hotel.joined_date}</td>
              <td className="px-4 py-3">{hotel.total_commission}</td>
              <td className="px-4 py-3">{hotel.total_booking}</td>
              <td className="px-4 py-3">
                <img
                  src={hotel.hotel_logo}
                  alt={hotel.hotel_name}
                  className="w-16 h-16 mx-auto rounded"
                />
              </td>
              <td className="px-4 py-3">${hotel.wallet}</td>
              <td
                className={`px-4 py-3 font-semibold ${
                  hotel.status === "Approved"
                    ? "text-green-600"
                    : hotel.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {hotel.status}
              </td>
              <td className="px-4 py-3 flex justify-center items-center gap-2">
                <button
                  onClick={() => handleApprove(hotel.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleReject(hotel.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                >
                  <FaTimes />
                </button>
                <button
                  onClick={() => handleUpdate(hotel.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(hotel.id, hotel.hotel_name)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs"
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

export default Tourism