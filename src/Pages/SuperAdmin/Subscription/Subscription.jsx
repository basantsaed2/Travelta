import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGet } from '../../../Hooks/useGet';
import StaticLoader from '../../../Components/StaticLoader';
const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      company_name: "Monki Travels",
      company_plan: "Premium",
      start_date: "2025-01-01",
      renew_date: "2025-12-31",
      plan: "Yearly Plan",
      duration: "12 Months",
      payment_method: "Credit Card",
    },
    {
      id: 2,
      company_name: "Sunny Adventures",
      company_plan: "Standard",
      start_date: "2025-02-15",
      renew_date: "2026-02-14",
      plan: "Yearly Plan",
      duration: "12 Months",
      payment_method: "PayPal",
    },
  ]);
    const { refetch: refetchSubscription, loading: loadingSubscription, data: DataSubscription } = useGet({url: "https://travelta.online/api/super/subscribers"});
      const [dataSubscription, setDataSubscription] = useState([]);

  const navigate = useNavigate()

         useEffect(() => {
          refetchSubscription();
          }, [refetchSubscription]);
        
          useEffect(() => {
            if (DataSubscription) {
              setDataSubscription(DataSubscription.subscribers);
            }
            console.log("setDataSubscription", DataSubscription);
          }, [DataSubscription]);

  const handleUpdate = (subId) => {
    navigate(`/super_admin/subscriptions/update/${subId}`);
  };

  const handleDelete = (id, companyName) => {
    if (window.confirm(`Are you sure you want to delete the subscription for ${companyName}?`)) {
      setSubscriptions(subscriptions.filter((subscription) => subscription.id !== id));
    }
  };

  return (

    <div className="w-full overflow-x-auto">
    {loadingSubscription ? (
      <div className="w-full h-56 flex justify-center items-center">
        <StaticLoader />
      </div>
    ) : 
 (   <div className="p-4 overflow-x-auto">
       <table className="min-w-full bg-white shadow-lg rounded-lg border-collapse border border-gray-300">
       <thead className="bg-mainColor text-white">
        <tr className=" uppercase text-xs">
          <th className="px-4 py-3 border-b">Name</th>
          <th className="px-4 py-3 border-b">Email</th>
          <th className="px-4 py-3 border-b">Phone</th>
          <th className="px-4 py-3 border-b">Plan</th>
          <th className="px-4 py-3 border-b">Role</th>
          <th className="px-4 py-3 border-b">Price</th>
          <th className="px-4 py-3 border-b">Start Date</th>
          <th className="px-4 py-3 border-b">End Date</th>
          <th className="px-4 py-3 border-b">Action</th>
        </tr>
      </thead>
      <tbody className="text-gray-600">
        {dataSubscription.map((subscription) => (
          <tr
            key={subscription.id}
            className="hover:bg-gray-50 transition-colors duration-200 border-b text-center"
          >
            <td className="px-4 py-3">{subscription.name}</td>
            <td className="px-4 py-3">{subscription.email}</td>
            <td className="px-4 py-3">{subscription.phone}</td>
            <td className="px-4 py-3">{subscription.plan}</td>
            <td className="px-4 py-3">{subscription.role}</td>
            <td className="px-4 py-3">${subscription.price}</td>
            <td className="px-4 py-3">{subscription.startDate}</td>
            <td className="px-4 py-3">{subscription.endDate}</td>
            <td className="px-4 py-3 flex justify-center items-center gap-2">
              <button
                onClick={() => handleUpdate(subscription.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(subscription.id, subscription.name)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>) }
  </div>
  
  );
}

export default Subscription