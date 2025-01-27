import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { useGet } from "../../../Hooks/useGet";
import { usePost } from "../../../Hooks/usePostJson";
import axios from 'axios';
import { useAuth } from "../../../Context/Auth";
const SignUpApprove = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState({});
  const { refetch: refetchSignUp, loading: loadingSignUp, data: DataSignUp } = useGet({
    url: "https://www.travelta.online/api/super/signupLists",
  });

  const auth = useAuth()
  // const { postData: approveUser } = usePost();
  // const { postData: rejectUser } = usePost();

  useEffect(() => {
    refetchSignUp();
  }, [refetchSignUp]);

  useEffect(() => {
    if (DataSignUp) {
      const { affilates = [], freelancers = [], agency = [], supplier = [] } = DataSignUp;

      const combinedData = [
        ...affilates.map((item) => ({ ...item, role: "affiliate" })),
        ...freelancers.map((item) => ({ ...item, role: "freelancer" })),
        ...agency.map((item) => ({ ...item, role: "agency" })),
        ...supplier.map((item) => ({ ...item, role: "supplier" })),
      ];

      setUsers(combinedData);
    }
  }, [DataSignUp]);

 
  const handleApprove = async (id, role) => {
    let apiUrl;
  
    // Determine the correct API endpoint based on the role
    if (role === "freelancer" || role === "affiliate") {
      apiUrl = `https://www.travelta.online/api/super/affiliate/approve/${id}`;
    } else if (role === "agent" || role === "supplier") {
      apiUrl = `https://www.travelta.online/api/super/agent/approve/${id}`;
    } else {
      console.error("Invalid role for approval:", role);
      auth.toastError("Invalid role for approval.");
      return; // Exit the function if the role is invalid
    }
  
    console.log(`Approving user with ID: ${id} and Role: ${role}`); // Debugging log
  
    try {
      const response = await axios.put(apiUrl, { id, role }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user?.token || ''}`,
        },
      });
  
      if (response.status === 200) {
        // Update the user's status to "Approved" in the state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, status: "Approved" } : user
          )
        );
  
        refetchSignUp();
  
        auth.toastSuccess("User approved successfully!");
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Error approving user:", error);
      auth.toastError("Failed to approve user. Please try again.");
    }
  };
  
  
  const handleReject = async (id, role) => {
    let apiUrl;
  
    // Determine the correct API endpoint based on the role
    if (role === "freelancer" || role === "affiliate") {
      apiUrl = `https://www.travelta.online/api/super/affiliate/reject/${id}`;
    } else if (role === "agent" || role === "supplier") {
      apiUrl = `https://www.travelta.online/api/super/agent/reject/${id}`;
    } else {
      console.error("Invalid role for rejection:", role);
      auth.toastError("Invalid role for rejection.");
      return; // Exit the function if the role is invalid
    }
  
    console.log(`Rejecting user with ID: ${id} and Role: ${role}`); // Debugging log
  
    try {
      const response = await axios.put(apiUrl, { id, role }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user?.token || ''}`,
        },
      });
  
      if (response.status === 200) {
        // Remove the user from the state after a successful rejection
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        auth.toastSuccess("User rejected successfully!");
      } else {
        // Handle cases where the API returns a non-200 status
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
      auth.toastError("Failed to reject user. Please try again.");
    }
  };
  
  
  


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Combined User Data</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm">
          <thead className="bg-gray-100">
            <tr className="bg-mainColor">
              <th className="px-4 py-2 border text-left text-sm font-medium text-white">ID</th>
              <th className="px-4 py-2 border text-left text-sm font-medium text-white">Name</th>
              <th className="px-4 py-2 border text-left text-sm font-medium text-white">Email</th>
              <th className="px-4 py-2 border text-left text-sm font-medium text-white">Phone</th>
              <th className="px-4 py-2 border text-left text-sm font-medium text-white">Role</th>
              <th className="px-4 py-2 border text-left text-sm font-medium text-white">Status</th>
              <th className="px-4 py-2 border text-center text-sm font-medium text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2 border text-sm text-gray-800">
                    {item.id || "N/A"}
                  </td>
                  <td className="px-4 py-2 border text-sm text-gray-800">
                    {item.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 border text-sm text-gray-800">
                    {item.email || "N/A"}
                  </td>
                  <td className="px-4 py-2 border text-sm text-gray-800">
                    {item.phone || "N/A"}
                  </td>
                  <td className="px-4 py-2 border text-sm text-gray-800">
                    {item.role || "N/A"}
                  </td>
                  <td className="px-4 py-2 border text-sm text-gray-800">
                    {item.status || "Pending"}
                  </td>
                  <td className="px-4 py-2 border text-center text-sm text-gray-800">
                    <button
                      className={`text-green-500 hover:text-green-700 mr-4 ${
                        loadingUsers[item.id] ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => handleApprove(  item.id,
                        (item.role === "agent" || item.role === "supplier") ? "agent" : "affiliate")}
                      disabled={loadingUsers[item.id]}
                    >
                      <FaCheckCircle />
                    </button>
                    <button
                      className={`text-red-500 hover:text-red-700 ${
                        loadingUsers[item.id] ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => handleReject(item.id, (item.role==="agent"|| item.role==="supplier") ? "agent" :"affiliate")}
                      disabled={loadingUsers[item.id]}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-4 text-center text-sm text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignUpApprove;
