import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { useAuth } from '../../../../../Context/Auth';
import StaticLoader from '../../../../../Components/StaticLoader';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Importing icons

const Currency = () => {
  const { refetch: refetchCurrency, loading: loadingCurrency, data: DataCurrency } = useGet({
    url: "https://travelta.online/api/super/currancy",
  });
  const [dataCurrency, setDataCurrency] = useState([]);
  const { deleteData, loadingDelete } = useDelete();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [updatedCurrency, setUpdatedCurrency] = useState({
    currancy_code: '',
    currancy_name: '',
    currancy_symbol: '',
  });
  const auth = useAuth();

  useEffect(() => {
    refetchCurrency();
  }, [refetchCurrency]);

  useEffect(() => {
    if (DataCurrency?.currancy) {
      setDataCurrency(DataCurrency.currancy);
    }
  }, [DataCurrency]);

  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://travelta.online/api/super/currancy/delete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setDataCurrency(dataCurrency.filter((currancy) => currancy.id !== id));
    }
  };

  const handleUpdate = (id) => {
    const currencyToUpdate = dataCurrency.find((currency) => currency.id === id);
    setUpdatedCurrency({
      currancy_code: currencyToUpdate.currancy_code,
      currancy_name: currencyToUpdate.currancy_name,
      currancy_symbol: currencyToUpdate.currancy_symbol,
    });
    setSelectedCurrency(currencyToUpdate);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedCurrency(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCurrency((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitUpdate = async () => {
    try {
      const success = await fetch(`https://travelta.online/api/super/currancy/update/${selectedCurrency.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user?.token || ''}`,
        },
        body: JSON.stringify(updatedCurrency),
      });

      if (success.ok) {
        auth.toastSuccess('Currency updated successfully.');
        setDataCurrency((prevState) =>
          prevState.map((currency) =>
            currency.id === selectedCurrency.id ? { ...currency, ...updatedCurrency } : currency
          )
        );
        setIsPopupOpen(false);
        setSelectedCurrency(null);
      } else {
        auth.toastError('Failed to update the currency.');
      }
    } catch (error) {
      auth.toastError('Error updating currency:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loadingCurrency ? (
        <div className="text-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="overflow-x-auto">     <table className="w-full min-w-[1200px] border border-gray-200 text-left text-sm">
          <thead className="bg-mainColor text-white">
            <tr>
              <th className="px-4 py-3 border-b">#</th>
              <th className="px-4 py-3 border-b">Currency Code</th>
              <th className="px-4 py-3 border-b">Currency Name</th>
              <th className="px-4 py-3 border-b">Symbol</th>
              <th className="px-4 py-3 border-b">Created At</th>
              <th className="px-4 py-3 border-b">Updated At</th>
              <th className="px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataCurrency.map((currency, index) => (
              <tr key={currency.id} className="text-center hover:bg-gray-100">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{currency.currancy_code}</td>
                <td className="px-4 py-2 border">{currency.currancy_name}</td>
                <td className="px-4 py-2 border">{currency.currancy_symbol}</td>
                <td className="px-4 py-2 border">
                  {currency.created_at ? new Date(currency.created_at).toLocaleString() : 'N/A'}
                </td>
                <td className="px-4 py-3 border-b">
                  {currency.updated_at ? new Date(currency.updated_at).toLocaleString() : 'N/A'}
                </td>
                <td className="px-4 py-3 border-b gap-3">
                  <button
                    onClick={() => handleUpdate(currency.id)}
                    aria-label={`Update ${currency.currancy_name}`}
                    className="text-blue-500 hover:text-blue-600 mr-3 transition-all duration-300"
                  >
                    <FaEdit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(currency.id, currency.currancy_name)}
                    disabled={loadingDelete}
                    aria-label={`Delete ${currency.currancy_name}`}
                    className={`text-red-500 hover:text-red-600 transition-all duration-300 ${
                      loadingDelete && "cursor-not-allowed"
                    }`}
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
     
      )}

      {/* Popup for updating currency */}
      {isPopupOpen && selectedCurrency && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Currency</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="currancy_code" className="block text-sm font-medium">Currency Code</label>
                <input
                  type="text"
                  id="currancy_code"
                  name="currancy_code"
                  value={updatedCurrency.currancy_code}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="currancy_name" className="block text-sm font-medium">Currency Name</label>
                <input
                  type="text"
                  id="currancy_name"
                  name="currancy_name"
                  value={updatedCurrency.currancy_name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="currancy_symbol" className="block text-sm font-medium">Currency Symbol</label>
                <input
                  type="text"
                  id="currancy_symbol"
                  name="currancy_symbol"
                  value={updatedCurrency.currancy_symbol}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handlePopupClose}
                  className="px-4 py-2 bg-gray-300 text-white rounded-md"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmitUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Currency;
