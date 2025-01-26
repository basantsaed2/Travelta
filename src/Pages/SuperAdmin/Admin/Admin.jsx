import React, { useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      admin_name: "John Doe",
      email_address: "john.doe@example.com",
      phone_number: "+1234567890",
      personal_card: "1234-5678-9101",
      role: "Super Admin",
    },
    {
      id: 2,
      admin_name: "Jane Smith",
      email_address: "jane.smith@example.com",
      phone_number: "+9876543210",
      personal_card: "4321-8765-0912",
      role: "Admin",
    },
  ]);

  const navigate = useNavigate();

  const handleUpdate = (adminId) => {
    navigate(`/super_admin/admin/update/${adminId}`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setAdmins(admins.filter((admin) => admin.id !== id));
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <table className="w-full  border-collapse border border-gray-300 text-sm text-left">
        <thead className='bg-mainColor text-white'>
          <tr>
            <th className="px-4 py-2 border-b border-gray-300">Admin Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Email Address</th>
            <th className="px-4 py-2 border-b border-gray-300">Phone Number</th>
            <th className="px-4 py-2 border-b border-gray-300">Personal Card</th>
            <th className="px-4 py-2 border-b border-gray-300">Role</th>
            <th className="px-4 py-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="border border-gray-300 text-left">
              <td className="px-4 py-2 border border-gray-300">{admin.admin_name}</td>
              <td className="px-4 py-2 border border-gray-300">{admin.email_address}</td>
              <td className="px-4 py-2 border border-gray-300">{admin.phone_number}</td>
              <td className="px-4 py-2 border border-gray-300">{admin.personal_card}</td>
              <td className="px-4 py-2 border border-gray-300">{admin.role}</td>
              <td className="px-4 py-2 border  border-gray-300">
                <button
                  onClick={() => handleUpdate(admin.id)}
                  className="px-2 py-1 rounded"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(admin.id, admin.admin_name)}
                  className="px-2 py-1 rounded text-red-500 text-13sm"
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
};

export default Admin;
