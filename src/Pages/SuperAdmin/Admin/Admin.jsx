import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGet } from "../../../Hooks/useGet";
import StaticLoader from '../../../Components/StaticLoader'
import { useDelete } from '../../../Hooks/useDelete';
import { useAuth } from "../../../Context/Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Admin = () => {
    const [admins, setAdmins] = useState([])
const [updata,setUpdata]=useState(true)
  const [showPopup, setShowPopup] = useState(false);
      const [loadingUpdate, setLoadingUpdate] = useState(false);
 const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
        const auth = useAuth()
  const [Id,SetId]=useState('')
   const {
      refetch: refetcadmin,
      loading: loadingadmin,
      data: Dataadmin,
    } = useGet({ url: "https://www.travelta.online/api/super/admin"});
        const { deleteData, loadingDelete, responseDelete } = useDelete();
    
     useEffect(() => {
        refetcadmin();
      }, [refetcadmin,updata]);
      useEffect(() => {
          if (Dataadmin) {
            setAdmins(Dataadmin.admin);
          }
        }, [Dataadmin,updata]);
 
  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/admin/delete/${id}`, `${name} Deleted Success.`);
    if (success) {
setUpdata(prev=>!prev)   
 }
  };
    const handlePopupClose = () => {
    setShowPopup(false);
  };
  const handleUpdate = (id) => {
  const admin = admins.find(a => a.id === id);
  if (admin) {
    setName(admin.name || "");
    setEmail(admin.email || "");
    setPhone(admin.phone || "");
    setPassword("");
    SetId(id);
    setShowPopup(true);
  }
};
   const handleUpdateSubmit = async () => {
    setLoadingUpdate(true);
    try {
      const response = await fetch(
        `https://www.travelta.online/api/super/admin/update/${Id}`,
        {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${auth.user?.token || ''}`,
            "Content-Type": "application/json",
          },
body: JSON.stringify(
  password
    ? { name, email, phone, password }
    : { name, email, phone }
)        }
      );

      if (response.ok) {
    setUpdata(prve=>!prve)
          setShowPopup(false); // 👈 close the popup here
  toast.success("Admin updated successfully!");

      } else {
        toast.error("Update failed.");
      }
    } catch (error) {
      toast.error("Update Error:", error);
    }
    setLoadingUpdate(false);
  };
 if(loadingadmin){
    <div className="flex items-center justify-center w-full h-56">
        <StaticLoader />
      </div>}
  return (
    <div className="p-4 overflow-x-auto">
      <table className="w-full text-sm text-left border border-collapse border-gray-300">
        <thead className='text-white bg-mainColor'>
          <tr>
            <th className="px-4 py-2 border-b border-gray-300">Admin Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Email </th>
            <th className="px-4 py-2 border-b border-gray-300">Phone </th>
            <th className="px-4 py-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="text-left border border-gray-300">
              <td className="px-4 py-2 border border-gray-300">{admin.name}</td>
              <td className="px-4 py-2 border border-gray-300">{admin.email}</td>
              <td className="px-4 py-2 border border-gray-300">{admin.phone}</td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  onClick={() => handleUpdate(admin.id)}
                  className="px-2 py-1 rounded"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(admin.id, admin.name)}
                  className="px-2 py-1 text-red-500 rounded text-13sm"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        {showPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <div className="w-full max-w-xs p-4 bg-white rounded-lg shadow-xl sm:max-w-md">
                  <h3 className="mb-4 text-lg font-semibold text-center text-gray-800 md:text-xl">
                    Update Admin 
                  </h3>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4 text-sm border border-gray-300 rounded-lg md:p-3 focus:ring-2 focus:ring-blue-500 md:text-base"
                    placeholder="Enter Admin Name"
                  />
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 mb-4 text-sm border border-gray-300 rounded-lg md:p-3 focus:ring-2 focus:ring-blue-500 md:text-base"
                    placeholder="Enter Admin Phone"
                  />
                  <input
                    type="number"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 text-sm border border-gray-300 rounded-lg md:p-3 focus:ring-2 focus:ring-blue-500 md:text-base"
                    placeholder="Enter Admin Password"
                  />
              
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 text-sm border border-gray-300 rounded-lg md:p-3 focus:ring-2 focus:ring-blue-500 md:text-base"
                    placeholder="Enter Admin Email"
                  />
              
                  <div className="flex flex-wrap justify-end gap-2 mt-4">
                    <button
                      onClick={handlePopupClose}
                      className="w-full px-4 py-2 text-sm text-white bg-gray-400 rounded-lg hover:bg-gray-500 md:text-base sm:w-auto"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateSubmit}
                      disabled={loadingUpdate}
                      className={`px-4 py-2 rounded-lg font-bold text-sm md:text-base w-full sm:w-auto ${
                        loadingUpdate
                          ? "bg-gray-300 text-gray-500"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {loadingUpdate ? "Updating..." : "Update"}
                    </button>
                  </div>
                </div>
              </div>
            )}
            <ToastContainer/>
    </div>
  );
};

export default Admin;
