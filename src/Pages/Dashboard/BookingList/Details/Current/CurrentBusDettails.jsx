import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGet } from "../../../../../Hooks/useGet";

const tabs = ["Actions", "Agent Data", "Payment", "Traveler", "Invoice"];

const CurrentBusDetails = () => {
  const { current_id } = useParams();
  const { refetch: refetchDetails, loading: loadingDetails, data: dataDetails } = useGet({
    url: `https://travelta.online/agent/booking/details/${current_id}`,
  });
  const { refetch: refetchCurrent, loading: loadingCurrent, data: currentData } = useGet({
    url: "https://travelta.online/agent/booking",
  });

  const [currentBusList, setCurrentBusList] = useState([]);
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Actions");

  useEffect(() => {
    refetchDetails();
    refetchCurrent();
  }, []);

  useEffect(() => {
    if (dataDetails) {
      setData(dataDetails);
    }
  }, [dataDetails]);

  useEffect(() => {
    if (currentData) {
      setCurrentBusList(currentData.current?.buses || []);
    }
  }, [currentData]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full  bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-mainColor mb-4">Booking Details</h1>

        {/* Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Actions</h2>
          <div className="mt-2 space-y-2">
            <div className="p-3 bg-red-100 border-l-4 border-red-500 rounded">
              <p><strong>Canceled Reason:</strong> {data.actions?.canceled?.[0]?.cancelation_reason || "N/A"}</p>
            </div>
            <div className="p-3 bg-green-100 border-l-4 border-green-500 rounded">
              <p><strong>Confirmed:</strong> {data.actions?.confirmed?.length > 0 ? "Yes" : "No"}</p>
            </div>
            <div className="p-3 bg-blue-100 border-l-4 border-blue-500 rounded">
              <p><strong>Vouchered:</strong> {data.actions?.vouchered?.[0]?.confirmation_num || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Agent Data */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Agent Data</h2>
          <div className="p-4 bg-gray-50 rounded-md border">
            <p><strong>Name:</strong> {data.agent_data?.name}</p>
            <p><strong>Email:</strong> {data.agent_data?.email}</p>
            <p><strong>Phone:</strong> {data.agent_data?.phone}</p>
          </div>
        </div>

        {/* Payments */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Payments</h2>
          {data.payments?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Amount</th>
                    <th className="border border-gray-300 p-2">Code</th>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Financial Name</th>
                  </tr>
                </thead>
                <tbody>
                  {data.payments.map((payment, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 p-2">${payment.amount}</td>
                      <td className="border border-gray-300 p-2">{payment.code}</td>
                      <td className="border border-gray-300 p-2">{payment.date}</td>
                      <td className="border border-gray-300 p-2">{payment.financial?.name || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No payment data available.</p>
          )}
        </div>

        {/* Traveler Data */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Traveler</h2>
          <div className="p-4 bg-gray-50 rounded-md border">
            <p><strong>Name:</strong> {data.traveler?.name}</p>
            <p><strong>Email:</strong> {data.traveler?.email}</p>
            <p><strong>Phone:</strong> {data.traveler?.phone}</p>
            <p><strong>Position:</strong> {data.traveler?.position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBusDetails;
