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
      <table className="min-w-full text-left border border-collapse border-gray-200 table-auto">
          <thead className='text-white  bg-mainColor'>
            <tr>
              <th className="px-4 py-2 text-sm border border-gray-200 md:text-base">#</th>
              <th className="px-4 py-2 text-sm border-gray-200 pborder md:text-base">Name</th>
              <th className="px-4 py-2 text-sm border border-gray-200 md:text-base">Description</th>
              <th className="px-4 py-2 text-sm border border-gray-200 md:text-base">Created At</th>
              <th className="px-4 py-2 text-sm border border-gray-200 md:text-base">Updated At</th>
              <th className="px-4 py-2 text-sm border border-gray-200 md:text-base">Image</th>
              <th className="px-4 py-2 text-sm border border-gray-200 md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataPayMentMethod.length > 0 ? (
              dataPayMentMethod.map((paymentMethod, index) => (
                <tr
                  key={paymentMethod.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-sm border border-gray-200 md:text-base">{index + 1}</td>
                  <td className="px-4 py-2 text-sm border border-gray-200 md:text-base">{paymentMethod.name}</td>
                  <td className="px-4 py-2 text-sm border border-gray-200 md:text-base">{paymentMethod.description}</td>
                  <td className="px-4 py-2 text-sm border border-gray-200 md:text-base">
                    {paymentMethod.created_at
                      ? new Date(paymentMethod.created_at).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-200 md:text-base">
                    {paymentMethod.updated_at
                      ? new Date(paymentMethod.updated_at).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-200 md:text-base">
                    {paymentMethod.image_link ? (
                      <img
                        src={paymentMethod.image}
                        alt={paymentMethod.name}
                        className="object-cover w-10 h-10 mx-auto rounded-md"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => handleDelete(paymentMethod.id, paymentMethod.name)}
                    
                      className="w-full px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 md:text-base md:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-3 text-center text-gray-500">
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
