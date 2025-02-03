import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { useAuth } from '../../../../../Context/Auth';

const Tax = () => {
  const { refetch: refetchTax, loading: loadingTax, data: Tax } = useGet({
    url: `https://travelta.online/agent/settings/tax`,
  });

  const [tax, setTax] = useState([]);
  const [country, setCountry] = useState([]);
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTax, setSelectedTax] = useState({
    id: '',
    name: '',
    country_id: '',
    type: '',
    amount: '',
  });
  const [newName, setNewName] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const auth = useAuth();

  const handleUpdate = (country) => {
    setSelectedTax(country);
    setNewName(country.name);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedTax({ id: '', name: '', country_id: '', type: '', amount: '' });
    setNewName('');
  };

  const handleUpdateSubmit = async () => {
    setLoadingUpdate(true);
    try {
      const response = await fetch(
        `https://travelta.online/agent/settings/tax/update/${selectedTax.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${auth.user?.token || ''}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName }),
        }
      );

      if (response.ok) {
        const updatedTax = await response.json();

        // Update the local state with the updated tax details
        setTax((prevTax) =>
          prevTax.map((taxItem) =>
            taxItem.id === selectedTax.id
              ? { ...taxItem, name: newName, updated_at: new Date().toISOString() }
              : taxItem
          )
        );

        setShowPopup(false);
        setSelectedTax({ id: '', name: '', country_id: '', type: '', amount: '' });
        setNewName('');
      } else {
        console.error('Update failed.');
      }
    } catch (error) {
      console.error('Update Error:', error);
    }
    setLoadingUpdate(false);
  };

  useEffect(() => {
    refetchTax();
  }, [refetchTax]);

  useEffect(() => {
    if (Tax) {
      setTax(Tax.tax);
      setCountry(Tax.countries)
    }
    console.log('data tax', Tax);
  }, [Tax]);

  // Delete Tax
  const handleDelete = async (id, name) => {
    const success = await deleteData(
      `https://travelta.online/agent/settings/tax/delete/${id}`,
      `${name} Deleted Successfully.`
    );

    if (success) {
      setTax(tax.filter((taxItem) => taxItem.id !== id));
    }
  };

  return (
    <div className="w-full custom-scrollbar overflow-x-auto rounded-lg shadow-md bg-white">
      <table className="w-full sm:min-w-0">
        <thead className="w-full">
          <tr className="w-full border-b-2">
            {['Name', 'Amount', 'Type', 'Country', 'Action'].map((heading) => (
              <th
                key={heading}
                className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {tax.length > 0 ? (
            tax.map((row, index) => (
              <tr key={index} className={`even:bg-gray-100 text-sm sm:text-base hover:bg-gray-200`}>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {row.name || 'N/A'}
                </td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {row.amount || 'N/A'}
                </td>
                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {row.type || 'N/A'}
                </td>

                <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                  {row.country.name || 'N/A'}
                </td>

                <td className="min-w-[150px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor gap-1">
                  <button
                    onClick={() => handleDelete(row.id, row.name)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(row)}
                    className="px-3 py-1 ml-2 bg-green-600 text-white rounded-md hover:bg-green-600 transition duration-200"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Popup for Update */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h3 className="text-xl font-semibold">Update Tax</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Tax Name"
              className="w-full p-2 border border-gray-300 rounded-md mt-4"
            />

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={loadingUpdate}
              >
                {loadingUpdate ? 'Updating...' : 'Update'}
              </button>
              <button
                onClick={handlePopupClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tax;
