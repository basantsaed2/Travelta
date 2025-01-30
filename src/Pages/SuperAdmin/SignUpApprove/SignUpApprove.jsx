import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { useGet } from "../../../Hooks/useGet";
import { usePost } from "../../../Hooks/usePostJson";
import axios from 'axios';
import { useAuth } from "../../../Context/Auth";
import StaticLoader from "../../../Components/StaticLoader";
import { FaEllipsisV } from "react-icons/fa";
const SignUpApprove = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState({});
  const { refetch: refetchSignUp, loading: loadingSignUp, data: DataSignUp } = useGet({
    url: "https://www.travelta.online/api/super/signupLists",
  });
 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPapers, setSelectedPapers] = useState([]);

  const [expandedUser, setExpandedUser] = useState(null);
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
        ...affilates.map((item) => ({ ...item, role: "affilate" })),
        ...freelancers.map((item) => ({ ...item, role: "freelancer" })),
        ...agency.map((item) => ({ ...item, role: "agent" })),
        ...supplier.map((item) => ({ ...item, role: "supplier" })),
      ];

      setUsers(combinedData);
    }
  }, [DataSignUp]);


  
  const toggleExpand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };
  const handleApprove = async (id, role) => {
    let apiUrl;
  
    // Determine the correct API endpoint based on the role
    if (role === "freelancer" || role === "affilate") {
      apiUrl = `https://www.travelta.online/api/super/affilate/approve/${id}`;
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



const openModal = (papers) => {
  setSelectedPapers(papers);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
  setSelectedPapers([]);
};
  
  
  const handleReject = async (id, role) => {
    let apiUrl;
  
    // Determine the correct API endpoint based on the role
    if (role === "freelancer" || role === "affilate") {
      apiUrl = `https://www.travelta.online/api/super/affilate/reject/${id}`;
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
  
  
  


  return(
    <div className="p-8">
    {loadingSignUp ? (
    <div className="w-full h-56 flex justify-center items-center">
      <StaticLoader />
    </div>
  ) : (  <div className="overflow-x-auto">
    <h2 className="text-3xl text-mainColor mb-5">Data SignUp</h2>
    <div className="overflow-x-auto">
  <table className="w-full min-w-[800px] bg-white border border-gray-200 shadow-sm">
    <thead className="bg-gray-100">
      <tr className="bg-mainColor text-white">
        <th className="px-4 py-4 border text-left text-sm font-medium">ID</th>
        <th className="px-4 py-2 border text-left text-sm font-medium">Name</th>
        <th className="px-4 py-2 border text-left text-sm font-medium">Email</th>
        <th className="px-4 py-2 border text-left text-sm font-medium">Phone</th>
        <th className="px-4 py-2 border text-left text-sm font-medium">Role</th>
        <th className="px-4 py-2 border text-left text-sm font-medium">Status</th>
        <th className="px-4 py-2 border text-left text-sm font-medium">Legal Papers</th>
        <th className="px-4 py-2 border text-center text-sm font-medium">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? (
        users.map((item, index) => (
          <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
            <td className="px-4 py-2 border text-md text-gray-800">{item.id || "N/A"}</td>
            <td className="px-4 py-2 border text-md text-gray-800">{item.name || "N/A"}</td>
            <td className="px-4 py-2 border text-md text-gray-800">{item.email || "N/A"}</td>
            <td className="px-4 py-2 border text-md text-gray-800">{item.phone || "N/A"}</td>
            <td className="px-4 py-2 border text-md text-gray-800">{item.role || "N/A"}</td>
            <td className="px-4 py-2 border text-md text-gray-800">{item.status || "Pending"}</td>
            <td className="px-4 py-2 border text-md text-gray-800">
              {item.legal_papers?.length ? (
                <div className="flex items-center gap-2">
                  <img
                    src={item.legal_papers[0].image}
                    alt="Legal Document"
                    className="w-14 h-14 object-cover border rounded shadow"
                  />
                  {item.legal_papers.length > 1 && (
                    <button
                      onClick={() => openModal(item.legal_papers)}
                      className="w-8 h-8 bg-gray-300 rounded-full hover:bg-gray-400 flex items-center justify-center"
                    >
                      <FaEllipsisV className="text-gray-700" />
                    </button>
                  )}
                </div>
              ) : (
                "No Documents"
              )}
            </td>
            <td className="px-4 py-2 border text-center text-sm">
              <button
                className={`text-green-500 hover:text-green-700 mr-4 ${
                  loadingUsers[item.id] ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() =>
                  handleApprove(
                    item.id,
                    item.role === "agent" || item.role === "supplier" ? "agent" : "affilate"
                  )
                }
                disabled={loadingUsers[item.id]}
              >
                <FaCheckCircle />
              </button>
              <button
                className={`text-red-500 hover:text-red-700 ${
                  loadingUsers[item.id] ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() =>
                  handleReject(
                    item.id,
                    item.role === "agent" || item.role === "supplier" ? "agent" : "affilate"
                  )
                }
                disabled={loadingUsers[item.id]}
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="px-4 py-4 text-center text-sm text-gray-500">
            No users found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

{/* Modal for Legal Papers */}
{modalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
      <h2 className="text-lg font-semibold mb-3">Legal Documents</h2>
      <div className="flex flex-wrap gap-4">
        {selectedPapers.map((paper, idx) => (
          <div className="flex flex-col items-center" key={idx}>
            <img
              src={paper.image}
              alt={`Legal Paper ${idx + 1}`}
              className="w-24 h-24 object-cover border rounded shadow"
            />
            <p className="text-sm text-gray-800 mt-1">{paper.type}</p>
          </div>
        ))}
      </div>
      <button
        onClick={closeModal}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Close
      </button>
    </div>
  </div>
)}

      </div>)
}
    </div>
  );
};

export default SignUpApprove;
