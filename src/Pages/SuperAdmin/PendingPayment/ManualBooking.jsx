import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from "react-icons/fa";
import { useGet } from '../../../Hooks/useGet';
import axios from 'axios';
import { useAuth } from '../../../Context/Auth';
import StaticLoader from '../../../Components/StaticLoader';

const ManualBooking = () => {
  const { refetch: refetchPending, loading: loadingPending, data: DataPending } = useGet({
    url: 'https://www.travelta.online/api/super/pendingPayments',
  });
  const [dataPending, setDataPending] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    refetchPending();
  }, [refetchPending]);

  useEffect(() => {
    if (DataPending) {
      setDataPending(DataPending.payments || []);
    }
  }, [DataPending]);

  const handleAccept = async (planId, id) => {
    try {
      const response = await axios.put(
        `https://www.travelta.online/api/super/accept-payment/${planId}/${id}`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.user?.token || ''}`,
          },
        }
      );

      if (response.status === 200) {
        auth.toastSuccess(`Payment ID: ${id} has been accepted.`);
        refetchPending();
      }
    } catch (error) {
      console.error("Error accepting payment:", error);
      auth.toastError("Failed to accept payment. Please try again.");
    }
  };

  const handleReject = async (id, name) => {
    try {
      const response = await axios.put(
        `https://www.travelta.online/api/super/payment/reject/${id}`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.user?.token || ''}`,
          },
        }
      );

      if (response.status === 200) {
        auth.toastSuccess(`Payment: ${name} has been rejected.`);
        refetchPending();
      }
    } catch (error) {
      console.error("Error rejecting payment:", error);
      auth.toastError("Failed to reject payment. Please try again.");
    }
  };

  return (
    <div className="w-full overflow-x-auto scrollSection">
      {loadingPending ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="p-6 overflow-x-auto rounded-lg shadow-lg">
          <div className="flex flex-wrap flex-col lg:flex-row gap-6">
            {dataPending.length > 0 ? (
              dataPending.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-gradient-to-r border border-blue-300 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between"
                  style={{ minHeight: '450px', maxWidth: '100%' }}
                >
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">{payment.plan_name || "No Plan Name"}</h3>

                  <div className="text-sm text-gray-700 mb-4 space-y-2">
                    <p><strong>Payment ID:</strong> {payment.payment_id || "No Payment ID"}</p>
                    <p><strong>Affiliate Agent:</strong> {payment.affilate_agent_name || "No Affiliate Agent Name"}</p>
                    <p><strong>Agent:</strong> {payment.agent_name || "N/A"}</p>
                    <p><strong>Amount:</strong> {payment.plan_price}</p>
                    <p><strong>Payment Method:</strong> {payment.payment_method_name || "No Payment Method"}</p>
                    <p><strong>Affiliate Agent Email:</strong> {payment.affilate_agent_email || "No Email"}</p>
                    <p><strong>Start Date:</strong> {payment.start_date || "No Start Date"}</p>
                    <p><strong>End Date:</strong> {payment.end_date || "No End Date"}</p>
                    <p><strong>Receipt:</strong> {payment.receipt || "No Receipt"}</p>
                  </div>

                  <div className="flex justify-between mt-auto gap-4">
                    <button
                      onClick={() => handleAccept(payment.plan_id, payment.payment_id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300"
                      aria-label="Accept Payment"
                    >
                      <FaCheck /> Accept
                    </button>
                    <button
                      onClick={() => handleReject(payment.payment_id, payment.plan_name)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300"
                      aria-label="Reject Payment"
                    >
                      <FaTimes /> Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full py-4">
                <span className="text-lg text-gray-500">No pending payments found.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualBooking;
