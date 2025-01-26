import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import StaticLoader from '../../../../Components/StaticLoader';
import { FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Supplier = () => {
  const { refetch: refetchSupplier, loading: loadingSupplier, data: DataSupplier } = useGet({
    url: "https://www.travelta.online/api/super/supliers", // Replace with your API URL
  });

  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    refetchSupplier(); // Refetch data when the component mounts
  }, [refetchSupplier]);

  useEffect(() => {
    if (DataSupplier) {
      setData(DataSupplier.supliers); // Set the supplier data
    }
    console.log("data supplier", DataSupplier);
  }, [DataSupplier]);

  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/agent/delete/${id}`, `${name} Deleted Successfully.`);
    if (success) {
      setData(data.filter((supplier) => supplier.suplier_id !== id)); // Remove deleted supplier from the state
    }
    refetchSupplier();
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loadingSupplier) {
    return (
      <div className="w-full h-56 flex justify-center items-center">
        <StaticLoader />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-scroll">
      {data && data.length > 0 ? (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">

          {/* Loop through each supplier and display their details */}
          {data.map((supplier, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md mb-6 hover:shadow-xl transition duration-300 ease-in-out">
              {/* Supplier Info */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-start">
                  <h3 className="text-2xl font-bold text-gray-800">Name: {supplier.suplier_name}</h3>
                  <p className="text-sm text-gray-500">Email: {supplier.suplier_email}</p>
                  <p className="text-sm text-gray-500">Phone: {supplier.suplier_phone}</p>
                  <p className="text-sm text-gray-500">Address: {supplier.suplier_address}</p>
                </div>

                {/* Delete Button */}
                <button
                  className="text-red-600 hover:text-red-800 transition duration-300"
                  onClick={() => handleDelete(supplier.suplier_id, supplier.suplier_name)}
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
                  <p><strong>Plan Name:</strong> {supplier.plans.plan_name}</p>
                  <p><strong>Plan Price After Discount:</strong> {supplier.plans.plan_price_after_discount}</p>
                  <p><strong>Discount Type:</strong> {supplier.plans.discount_type}</p>
                  <p><strong>Discount Value:</strong> {supplier.plans.discount_value}</p>
                  <p><strong>User Cost:</strong> {supplier.plans.user_cost}</p>
                  <p><strong>User Limit:</strong> {supplier.plans.user_limit}</p>
                  <p><strong>Branch Cost:</strong> {supplier.plans.branch_cost}</p>
                  <p><strong>Branch Limit:</strong> {supplier.plans.branch_limit}</p>
                  <p><strong>Period (Days):</strong> {supplier.plans.period_in_days}</p>
                  <p><strong>Module Type:</strong> {supplier.plans.module_type}</p>
                </div>
              )}

              {/* Toggle Legal Papers */}
              {supplier.legal_papers && supplier.legal_papers.length > 0 && (
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
                      {supplier.legal_papers.map((paper, idx) => (
                        <div key={idx} className="flex items-center space-x-4">
                          <span className="font-medium text-gray-600">{paper.image_type}:</span>
                          <img
                            src={paper.image}
                            alt={`${paper.image_type}`}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Additional Supplier Information */}
              <div className="mt-4 text-gray-700">
                <p><strong>City Name:</strong> {supplier.city_name}</p>
                <p><strong>Country Name:</strong> {supplier.country_name}</p>
              </div>

              {/* Owner Details */}
              <div className="mt-4 text-gray-700">
                <p><strong>Owner Name:</strong> {supplier.owner_name}</p>
                <p><strong>Owner Email:</strong> {supplier.owner_email}</p>
                <p><strong>Owner Phone:</strong> {supplier.owner_phone}</p>
              </div>

              {/* Additional Information */}
              <div className="mt-4 text-gray-700">
                <p><strong>Status:</strong> {supplier.status}</p>
                <p><strong>Total Booking:</strong> {supplier.total_bookking}</p>
                <p><strong>Total Commission:</strong> {supplier.total_commision}</p>
                <p><strong>Zone Name:</strong> {supplier.zone_name || "Not assigned"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-12">
          <p className="text-center text-gray-500">No supplier data available</p>
        </div>
      )}
    </div>
  );
};

export default Supplier;
