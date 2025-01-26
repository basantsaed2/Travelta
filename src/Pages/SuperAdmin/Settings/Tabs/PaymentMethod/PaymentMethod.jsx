import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { FaEdit, FaTrash } from 'react-icons/fa';
import StaticLoader from '../../../../../Components/StaticLoader';

const PaymentMethod = () => {
  const {
    refetch: refetchPayMentMethod,
    loading: loadingPayMentMethod,
    data: DataPayMentMethod,
  } = useGet({
    url: 'https://www.travelta.online/api/super/paymentMethods',
  });
  const [dataPayMentMethod, setDataPayMentMethod] = useState([]);
  const { deleteData, loadingDelete, responseDelete } = useDelete();

  useEffect(() => {
    refetchPayMentMethod();
  }, [refetchPayMentMethod]);

  useEffect(() => {
    if (DataPayMentMethod) {
      setDataPayMentMethod(DataPayMentMethod.paymentMethods);
    }
  }, [DataPayMentMethod]);

  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://travelta.online/api/super/paymentMethod/delete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setDataPayMentMethod(dataPayMentMethod.filter((currancy) => currancy.id !== id));
    }
  };

  const handleUpdate = (id) => {
    // Implement the update logic
    console.log(`Update payment method with ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      {loadingPayMentMethod ? (
        <div className="text-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] border border-gray-200 text-left text-sm">
       <thead  className="bg-mainColor text-white">
        <tr>
          <th className="px-4 py-3 border-b">#</th>
          <th className="px-6  py-3 border-b ">Name</th>
          <th className="px-4 py-3 border-b ">Description</th>
          <th className="px-4 py-3 border-b ">Created At</th>
          <th className="px-4 py-3 border-b ">Updated At</th>
          <th className="px-4 py-3 border-b ">Image</th>
          <th className="px-4 py-3 border-b ">Actions</th>
        </tr>
      </thead>
      <tbody>
        {dataPayMentMethod.length > 0 ? (
          dataPayMentMethod.map((paymentMethod, index) => (
            <tr
              key={paymentMethod.id}
              className="text-center hover:bg-gray-100"
            >
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{paymentMethod.name}</td>
              <td className="px-4 py-2 border">{paymentMethod.description}</td>
              <td className="px-4 py-2 border">
                {paymentMethod.created_at
                  ? new Date(paymentMethod.created_at).toLocaleString()
                  : 'N/A'}
              </td>
              <td className="px-4 py-3 border">
                {paymentMethod.updated_at
                  ? new Date(paymentMethod.updated_at).toLocaleString()
                  : 'N/A'}
              </td>
              <td className="px-4 py-3 border">
                {paymentMethod.image_link ? (
                  <img
                    src={paymentMethod.image_link}
                    alt={paymentMethod.name}
                    className="w-10 h-10 object-cover mx-auto rounded-md"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="px-4 py-2 border">
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={() => handleDelete(paymentMethod.id, paymentMethod.name)}
                    disabled={loadingDelete}
                    aria-label={`Delete ${paymentMethod.name}`}
                    className={`text-red-500 hover:text-red-600 transition-all duration-300 ${
                      loadingDelete && 'cursor-not-allowed'
                    }`}
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="py-3 px-4 text-center text-gray-500">
              No payment methods available.
            </td>
          </tr>
        )}
      </tbody>
    </table></div>
    
      
      )}
    </div>
  );
};

export default PaymentMethod;
