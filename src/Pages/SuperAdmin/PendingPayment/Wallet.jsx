import React, { useEffect, useState } from "react";
import { useGet } from "../../../Hooks/useGet";
import axios from "axios";
import { useAuth } from "../../../Context/Auth";
import StaticLoader from "../../../Components/StaticLoader";
const Wallet = () => {
  const {
    refetch: refetchPaymentMethod,
    loading: loadingPaymentMethod,
    data: paymentMethodData,
  } = useGet({
    url: "https://www.travelta.online/api/super/pendingRechargeWallet",
  });
  const auth = useAuth()
  const [data, setData] = useState([]);
  const [rejectPopup, setRejectPopup] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    refetchPaymentMethod();
  }, [refetchPaymentMethod]);

  useEffect(() => {
    if (paymentMethodData) {
      setData(paymentMethodData.pending_wallets);
    }
    console.log("data", paymentMethodData);
  }, [paymentMethodData]);

  // Handle Approve
  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `https://www.travelta.online/api/super/rechargeWallet/approve/${id}`,
        {}, // Empty body (if required, add payload here)
        {
          headers: {
            'Authorization': `Bearer ${auth.user?.token || ''}`, // Get token from localStorage or state
            "Content-Type": "application/json", // Set proper content type
          },
        }
      );
  
      auth.toastSuccess("Wallet recharge approved successfully!");
      refetchPaymentMethod(); // Refresh data after approval
    } catch (error) {
      console.error("Error approving recharge:", error);
      auth.toastError("Failed to approve wallet recharge.");
    }
  };


  const openRejectPopup = (id) => {
    setSelectedId(id);
    setRejectPopup(true);
  };

  const closeRejectPopup = () => {
    setRejectPopup(false);
    setRejectReason("");
    setSelectedId(null);
  };

  const submitReject = async () => {
    if (!rejectReason) {
      auth.toastError("Please enter a rejection reason.");
      return;
    }
  
    try {
      await axios.put(
        `https://www.travelta.online/api/super/rechargeWallet/reject/${selectedId}`,
        { rejected_reason: rejectReason }, // Send rejection reason in the request body
        {
          headers: {
            'Authorization': `Bearer ${auth.user?.token || ''}`, // Authentication token
            "Content-Type": "application/json",
          },
        }
      );
  
      auth.toastSuccess("Wallet recharge rejected successfully!");
      refetchPaymentMethod(); // Refresh data after rejection
      closeRejectPopup(); // Close rejection popup
      setRejectReason(""); // Reset reason input
    } catch (error) {
      console.error("Error rejecting recharge:", error);
      auth.toastError("Failed to reject wallet recharge.");
    }
  };
  
  return (
    <div>
      {loadingPaymentMethod ? (
          <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-mainColor text-white">
              <th className="px-4 py-2 border-b border-gray-300">#</th>
              <th className="px-4 py-2 border-b border-gray-300">Amount</th>
              <th className="px-4 py-2 border-b border-gray-300">Image</th>
              <th className="px-4 py-2 border-b border-gray-300">Rejected Reason</th>
              <th className="px-4 py-2 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                <td className="px-4 py-2 border border-gray-300">{item.amount}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={item.image}
                    alt="Payment Receipt"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.rejected_reason ? (
                    <span className="text-red-500">{item.rejected_reason}</span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => openRejectPopup(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Reject Popup */}
      {rejectPopup && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[50%]  p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Enter Rejection Reason</h2>
            <textarea
              className="w-full border p-2 rounded-md"
              rows="3"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Reason for rejection"
            ></textarea>
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={submitReject}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
              >
                Submit
              </button>
              <button
                onClick={closeRejectPopup}
                className="bg-gray-300 px-4 py-1 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
