import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import { FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa'; 
import StaticLoader from '../../../../Components/StaticLoader';

const Affilate = () => {
  const { refetch: refetchAffilate, loading: loadingAffilate, data: DataAffilate } = useGet({
    url: "https://www.travelta.online/api/super/affilates",
  });

  const { deleteData, loadingDelete, responseDelete } = useDelete();

  const [data, setData] = useState([]);
  const [expandedAffilateId, setExpandedAffilateId] = useState(null);

  useEffect(() => {
    refetchAffilate();
  }, [refetchAffilate]);

  useEffect(() => {
    if (DataAffilate) {
      setData(DataAffilate.affilate);
    }
  }, [DataAffilate]);

  const toggleAffilateDetails = (affilateId) => {
    setExpandedAffilateId((prevId) => (prevId === affilateId ? null : affilateId));
  };

  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/affilateFreelance/delete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setData(data.filter((affiliate) => affiliate.id !== id));
      refetchAffilate();
    }
  };

  if (loadingAffilate) {
    return (
      <div className="w-full h-56 flex justify-center items-center">
        <StaticLoader />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto py-8">
      <div className="max-w-6xl mx-auto p-6  rounded-lg">
        {data && data.length > 0 ? (
          data.map((a, index) => (
            <div key={index} className="bg-gray-100 p-8 rounded-lg mb-8 transition ">
              <div className="flex justify-between items-start mb-6">
                <div className="text-start">
                  <h3 className="text-3xl font-semibold text-gray-700 cursor-pointer" onClick={() => toggleAffilateDetails(a.id)}>
                    {a.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 mt-3"><strong>Email:</strong> {a.email}</p>
                  <p className="text-sm text-gray-500 mb-2"><strong>Phone:</strong>  {a.phone}</p>
                  <p className="text-sm text-gray-500 mb-2"><strong>Status:</strong>  {a.status}</p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 transition duration-300"
                  onClick={() => handleDelete(a.id, a.name)}
                  disabled={loadingDelete}
                >
                  <FaTrashAlt size={22} />
                </button>
              </div>
              <div className="cursor-pointer text-gray-600" onClick={() => toggleAffilateDetails(a.id)}>
                {expandedAffilateId === a.id ? <FaChevronUp size={22} /> : <FaChevronDown size={22} />}
              </div>

              {expandedAffilateId === a.id && (
          <div className="flex flex-wrap gap-6 mt-8">
          {/* Affiliate Information */}
          <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg flex-grow min-h-[300px] flex flex-col justify-between">
            <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>📋</span> Affiliate Information
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Full Name:</strong> {a.f_name} {a.l_name}</li>
              <li><strong>Email:</strong> {a.email}</li>
              <li><strong>Phone:</strong> {a.phone}</li>
              <li><strong>Status:</strong> {a.status}</li>
              <li><strong>Role:</strong> {a.role}</li>
              <li><strong>Start Date:</strong> {a.start_date}</li>
              <li><strong>End Date:</strong> {a.end_date}</li>
            </ul>
          </div>
        
          {/* Legal Papers */}
          {a.legal_papers && a.legal_papers.length > 0 && (
            <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-lg flex-grow min-h-[300px] flex flex-col justify-between">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>📜</span> Legal Papers
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {a.legal_papers.map((paper, index) => (
                  <div key={index} className="relative">
                    <img
                      src={paper.image}
                      alt={`Legal Paper ${paper.id}`}
                      className="w-full h-36 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg">
                      ID: {paper.id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        
          {/* Status and Total Commission */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg flex-grow min-h-[300px] flex flex-col justify-between">
            <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>💼</span> Status & Total Commission
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Total Bookings:</strong> {a.total_booking}</li>
              <li><strong>Total Commission:</strong> ${a.total_commission}</li>
            </ul>
          </div>
        
          {/* Plan Details */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg flex-grow min-h-[300px] flex flex-col justify-between">
            <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>📊</span> Plan Details
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Plan Name:</strong> {a.plan.name}</li>
              <li><strong>Description:</strong> {a.plan.description}</li>
              <li><strong>Price:</strong> ${a.plan.price}</li>
              <li><strong>Price After Discount:</strong> ${a.plan.price_after_discount}</li>
              <li><strong>Discount Type:</strong> {a.plan.discount_type}</li>
              <li><strong>Discount Value:</strong> ${a.plan.discount_value}</li>
              <li><strong>Branch Limit:</strong> {a.plan.branch_limit}</li>
              <li><strong>User Limit:</strong> {a.plan.user_limit}</li>
              <li><strong>Period (Days):</strong> {a.plan.period_in_days}</li>
              <li><strong>Admin Cost:</strong> ${a.plan.admin_cost}</li>
              <li><strong>Branch Cost:</strong> ${a.plan.branch_cost}</li>
            </ul>
          </div>
        </div>
        
            
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No affiliate data available</p>
        )}
      </div>
    </div>
  );
};

export default Affilate;
