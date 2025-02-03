import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { useAuth } from '../../../../../Context/Auth';
import { MenuItem, TextField } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import StaticLoader from '../../../../../Components/StaticLoader';

const Tax = ({update}) => {
  const { refetch: refetchTax, loading: loadingTax, data: Tax } = useGet({
    url: `https://travelta.online/agent/settings/tax`,
  });

  const [tax, setTax] = useState([]);
  const [country, setCountry] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTax, setSelectedTax] = useState({
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
    setCountryId(country.country_id);
    setType(country.type);
    setAmount(country.amount);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedTax({ id: '', name: '', country_id: '', type: '', amount: '' });
    setNewName('');
    setCountryId('');
    setType('');
    setAmount('');
  };

  const handleUpdateSubmit = async () => {
    setLoadingUpdate(true);
    if (!amount || isNaN(amount)) {
      auth.toastError("Please enter a valid amount.");
      setLoadingUpdate(false);
      return;
    }

    try {
      const response = await fetch(
        `https://travelta.online/agent/settings/tax/update/${selectedTax.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${auth.user?.token || ''}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName, country_id: countryId, type, amount }),
        }
      );

      if (response.ok) {
        const updatedTax = await response.json();
        setTax((prevTax) =>
          prevTax.map((taxItem) =>
            taxItem.id === selectedTax.id
              ? { ...taxItem, name: newName, amount, type, country_id: countryId, updated_at: new Date().toISOString() }
              : taxItem
          )
        );

        setShowPopup(false);
        setSelectedTax({name: '', country_id: '', type: '', amount: '' });
        setNewName('');
        setAmount('');
        auth.toastSuccess("data updated successful")
        refetchTax();
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
  }, [refetchTax,update]);

  useEffect(() => {
    if (Tax) {
      setTax(Tax.tax);
      setCountry(Tax.countries);
    }
  }, [Tax]);

  const handleDelete = async (id, name) => {
    const success = await deleteData(
      `https://travelta.online/agent/settings/tax/delete/${id}`,
      `${name} Deleted Successfully.`
    );

    if (success) {
      setTax(tax.filter((taxItem) => taxItem.id !== id));
    }
  };

  if(loadingTax){
    return(<>{<StaticLoader/>}</>)
  }

  return (
    <div className="w-full custom-scrollbar overflow-x-auto rounded-lg shadow-md mt-5">
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

    
                   <td className="py-2 flex justify-center gap-3">
                                    <button type="button" onClick={() => handleUpdate(row)}>
                                      <FaEdit color="#4CAF50" size="24" />
                                    </button>
                                    <button type="button" onClick={() => handleDelete(row.id, row.name)}>
                                      <MdDelete color="#D01025" size="24" />
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
     <div className="fixed inset-0 flex justify-center items-center z-10 bg-gray-800 bg-opacity-50">
     <div className="bg-white p-6 rounded-md w-11/12 sm:w-3/4 md:w-1/3 lg:w-1/3 xl:w-1/4 flex flex-col gap-4">
       <h3 className="text-2xl font-semibold text-center">Update Tax</h3>
       <input
         type="text"
         value={newName}
         onChange={(e) => setNewName(e.target.value)}
         placeholder="Tax Name"
         className="w-full p-3 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
       />
       <TextField
         select
         fullWidth
         variant="outlined"
         value={countryId}
         onChange={(e) => setCountryId(e.target.value)}
         label="Select Country"
         size="small"
         className="mt-4"
       >
         {country.map((country) => (
           <MenuItem key={country.id} value={country.id}>
             {country.name}
           </MenuItem>
         ))}
       </TextField>
       <TextField
         select
         fullWidth
         variant="outlined"
         value={type}
         onChange={(e) => setType(e.target.value)}
         label="Select Type"
         size="small"
         className="mt-4"
       >
         <MenuItem value="precentage">Precentage</MenuItem>
         <MenuItem value="value">Value</MenuItem>
       </TextField>
       <TextField
         type="number"
         fullWidth
         variant="outlined"
         value={amount}
         onChange={(e) => setAmount(e.target.value)}
         label="Amount"
         size="small"
         className="mt-4"
       />

       <div className="mt-6 flex justify-between gap-4">
         <button
           onClick={handleUpdateSubmit}
           className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
           disabled={loadingUpdate}
         >
           {loadingUpdate ? 'Updating...' : 'Update'}
         </button>
         <button
           onClick={handlePopupClose}
           className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
