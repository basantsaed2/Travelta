import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';

const Payment = () => {
  const { refetch: refetchPayment, loading: loadingPayment, data: DataPayment } = useGet({
    url: 'https://www.travelta.online/api/super/approvedPayments',
  });

  const [dataPayment, setDataPayment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(17); // Show 17 items per page
  const navigate = useNavigate();

  const handleUpdate = (paymentId) => {
    navigate(`/super_admin/settings/payment/edit/${paymentId}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete Payment with ID: ${id}?`)) {
      alert(`Deleted Payment with ID: ${id}`);
    }
  };

  const paginateData = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  useEffect(() => {
    refetchPayment();
  }, [refetchPayment]);

  useEffect(() => {
    if (DataPayment) {
      setDataPayment(DataPayment.payments || []);
    }
  }, [DataPayment]);

  const totalPages = Math.ceil(dataPayment.length / itemsPerPage); // Calculate total number of pages
  const displayedPayments = paginateData(dataPayment, currentPage, itemsPerPage); // Get items for the current page

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {loadingPayment ? (
        <div className="flex justify-center items-center h-64">
          <StaticLoader />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-start gap-8">
            {displayedPayments.map((item, index) => (
              <div
                key={index}
                className="w-80  rounded-lg shadow-lg p-6 border text-mainColor border-blue-400 hover:scale-105 transform transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-mainColor mb-4">
                  Payment #{item.payment_id || index + 1}
                </h3>
                <div className="space-y-4">
                  <DetailRow label="Affiliate Email" value={item.affilate_agent_email || 'N/A'} />
                  <DetailRow label="Affiliate ID" value={item.affilate_agent_id || 'N/A'} />
                  <DetailRow label="Affiliate Name" value={item.affilate_agent_name || 'N/A'} />
                  <DetailRow label="Affiliate Phone" value={item.affilate_agent_phone || 'N/A'} />
                  <DetailRow label="Agent Email" value={item.agent_email || 'N/A'} />
                  <DetailRow label="Agent ID" value={item.agent_id || 'N/A'} />
                  <DetailRow label="Agent Name" value={item.agent_name || 'N/A'} />
                  <DetailRow label="Agent Phone" value={item.agent_phone || 'N/A'} />
                  <DetailRow label="Start Date" value={item.start_date} />
                  <DetailRow label="End Date" value={item.end_date} />
                  <DetailRow label="Payment Method" value={item.payment_method_name} />
                  <DetailRow label="Plan Name" value={item.plan_name} />
                  <DetailRow label="Plan Price" value={`$${item.plan_price}`} />
                  <DetailRow label="Receipt" value={item.receipt} />
                </div>
                {/* <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => handleUpdate(item.payment_id)}
                    className="text-sm px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-200"
                  >
                    <FaEdit className="inline mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.payment_id)}
                    className="text-sm px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200"
                  >
                    <FaTrashAlt className="inline mr-2" />
                    Delete
                  </button>
                </div> */}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-6 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 disabled:opacity-50 transition-all duration-200"
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <span className="px-6 py-3 text-lg text-indigo-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-6 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 disabled:opacity-50 transition-all duration-200"
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm text-mainColor">
    <span className="font-medium text-mainColor">{label}:</span>
    <span className="truncate text-gray-500">{value}</span>
  </div>
);

export default Payment;
