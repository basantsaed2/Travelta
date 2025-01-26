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
    <div className="w-full overflow-x-auto scrollSection">
    {loadingPayMentMethod ? (
      <div className="text-center">
        <StaticLoader />
      </div>
    ) : (
      <div className="p-4 lg:p-8">
      <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-200 min-w-full text-left">
          <thead className=' bg-mainColor text-white'>
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">#</th>
              <th className="pborder border-gray-200 px-4 py-2 text-sm md:text-base">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">Description</th>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">Created At</th>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">Updated At</th>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">Image</th>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataPayMentMethod.length > 0 ? (
              dataPayMentMethod.map((paymentMethod, index) => (
                <tr
                  key={paymentMethod.id}
                  className="hover:bg-gray-50"
                >
                  <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">{paymentMethod.name}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">{paymentMethod.description}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                    {paymentMethod.created_at
                      ? new Date(paymentMethod.created_at).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                    {paymentMethod.updated_at
                      ? new Date(paymentMethod.updated_at).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">
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
                    
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm md:text-base w-full md:w-auto"
                      >
                        Delete
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
        </table>
      </div>
      </div>
    )}
  </div>
  
  );
};

export default PaymentMethod;
