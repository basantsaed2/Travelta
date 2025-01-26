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
     <table className="table-auto border-collapse border border-gray-200 min-w-full text-left">
     <thead className=' bg-mainColor text-white'>
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
            className="hover:bg-gray-50"
          >
            <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">{subscription.name}</td>
            <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">{subscription.email}</td>
            <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">{subscription.phone}</td>
            <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">{subscription.plan}</td>
            <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">{subscription.role}</td>
            <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">${subscription.price}</td>
            <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">{subscription.startDate}</td>
            <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">{subscription.endDate}</td>
            <td className="border border-gray-200 px-4 py-2">
            <div className="flex flex-wrap gap-2">
   <button
                onClick={() => handleUpdate(subscription.id)}
                
                className="bg-mainColor text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm md:text-base w-full md:w-auto"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(subscription.id, subscription.name)}
                
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm md:text-base w-full md:w-auto"
              >
                Delete
              </button>

              </div>
           
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