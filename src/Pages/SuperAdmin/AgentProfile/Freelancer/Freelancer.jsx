import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import StaticLoader from '../../../../Components/StaticLoader';
import { FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Freelancer = () => {
  const { refetch: refetchFreelancer, loading: loadingFreelancer, data: DataFreelancer } = useGet({
    url: "https://www.travelta.online/api/super/freelancers", // Replace with your API URL
  });

  const [openIndex, setOpenIndex] = useState(null);
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [data, setData] = useState([]);

  useEffect(() => {
    refetchFreelancer(); // Refetch data when the component mounts
  }, [refetchFreelancer]);

  useEffect(() => {
    if (DataFreelancer) {
      setData(DataFreelancer.freelancer); // Set freelancer data
    }
    console.log("data freelancer", DataFreelancer);
  }, [DataFreelancer]);

  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/affilateFreelance/delete/${id}`, `${name} Deleted Successfully.`);
    if (success) {
      setData(data.filter((freelancer) => freelancer.id !== id)); // Remove deleted freelancer from the state
    }
    refetchFreelancer();
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loadingFreelancer) {
    return (
      <div className="w-full h-56 flex justify-center items-center">
        <StaticLoader />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-scroll">
      {data && data.length > 0 ? (
        <div className="max-w-6xl mx-auto p-6 ">
          
          {/* Loop through each freelancer and display their details */}
          {data.map((freelancer, index) => (
            <div key={index} className="bg-gray-50 bg-gradient-to-r from-indigo-50 p-6 rounded-lg shadow-md mb-6 hover:shadow-xl transition duration-300 ease-in-out">
              {/* Freelancer Info */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-start">
                  <h3 className="text-2xl font-bold text-gray-800">{freelancer.f_name} {freelancer.l_name}</h3>
                  <p className="text-sm text-gray-500">Name: {freelancer.name}</p>
                  <p className="text-sm text-gray-500">Phone: {freelancer.phone}</p>
                  <p className="text-sm text-gray-500">Email: {freelancer.email}</p>
                  
                </div>

                {/* Delete Button */}
                <button
                  className="text-red-600 hover:text-red-800 transition duration-300"
                  onClick={() => handleDelete(freelancer.id, freelancer.f_name)}
                  disabled={loadingDelete}
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>

              {/* Toggle Plan Info */}
              <div className="cursor-pointer" onClick={() => handleToggle(index)}>
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-800">Plan Info</h4>
                  {openIndex === index ? (
                    <FaChevronUp size={20} className="text-gray-600" />
                  ) : (
                    <FaChevronDown size={20} className="text-gray-600" />
                  )}
                </div>
              </div>
              {openIndex === index && (
                <div className="mt-4 text-gray-700">
                  <p><strong>Plan Name:</strong> {freelancer.plan.name}</p>
                  <p><strong>Price:</strong> {freelancer.plan.price}</p>
                  <p><strong>Price After Discount:</strong> {freelancer.plan.price_after_discount}</p>
                  <p><strong>Discount Type:</strong> {freelancer.plan.discount_type}</p>
                  <p><strong>Discount Value:</strong> {freelancer.plan.discount_value}</p>
                  <p><strong>Admin Cost:</strong> {freelancer.plan.admin_cost}</p>
                  <p><strong>Branch Cost:</strong> {freelancer.plan.branch_cost}</p>
                  <p><strong>Branch Limit:</strong> {freelancer.plan.branch_limit}</p>
                  <p><strong>User Limit:</strong> {freelancer.plan.user_limit}</p>
                  <p><strong>Module Type:</strong> {freelancer.plan.module_type}</p>
                  <p><strong>Period (Days):</strong> {freelancer.plan.period_in_days}</p>
                </div>
              )}

              {/* Toggle Legal Papers */}
              {freelancer.legal_papers && freelancer.legal_papers.length > 0 && (
                <div>
                  <div className="cursor-pointer mt-4" onClick={() => handleToggle(`legal-${index}`)}>
                    <div className="flex items-center justify-between">
                      <h5 className="text-lg font-semibold text-gray-800">Legal Papers</h5>
                      {openIndex === `legal-${index}` ? (
                        <FaChevronUp size={20} className="text-gray-600" />
                      ) : (
                        <FaChevronDown size={20} className="text-gray-600" />
                      )}
                    </div>
                  </div>
                  {openIndex === `legal-${index}` && (
                    <div className="space-y-4 mt-2">
                      {freelancer.legal_papers.map((paper, idx) => (
                        <div key={idx} className="flex items-center space-x-4">
                          <span className="font-medium text-gray-600">{paper.image}</span>
                          <img
                            src={paper.image}
                            alt={`Legal Paper ${paper.id}`}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Freelancer Status */}
              <div className="mt-4 text-gray-700">
                <p><strong>Status:</strong> {freelancer.status}</p>
                <p><strong>Role:</strong> {freelancer.role}</p>
                <p><strong>Start Date:</strong> {freelancer.start_date}</p>
                <p><strong>End Date:</strong> {freelancer.end_date}</p>
                <p><strong>Total Booking:</strong> {freelancer.total_booking}</p>
                <p><strong>Total Commission:</strong> {freelancer.total_commission}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-12">
          <p className="text-center text-gray-500">No freelancer data available</p>
        </div>
      )}
    </div>
  );
};

export default Freelancer;
