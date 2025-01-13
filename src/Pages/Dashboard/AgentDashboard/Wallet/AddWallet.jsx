import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../Context/Auth';
import { usePost } from '../../../../Hooks/usePostJson';
import { useGet } from '../../../../Hooks/useGet';

const AddWallet = () => {
  // State to hold form data
  const [currencyId, setCurrencyId] = useState('');
  const [message, setMessage] = useState('');
  const [wallet, setWallet] = useState(null); // State to hold the wallet data
  const [currencyList, setCurrencyList] = useState([]);
  const auth = useAuth();
    const { postData, loadingPost, response } = usePost({
        url: 'https://travelta.online/agent/wallet/add',
      });
       const {
          refetch: refetchAddWallet,
          loading,
          data: dataAddWallet,
        } = useGet({
          url: "https://travelta.online/agent/wallet",
        });

         useEffect(() => {
            refetchAddWallet()
          
          }, [refetchAddWallet])
        
          useEffect(() => {
            if(dataAddWallet){
                setCurrencyList(dataAddWallet.currencies)
              
                console.log(`data wallet ${dataAddWallet} `)
            }
            console.log(`data wallet ${dataAddWallet} `)
          }, [dataAddWallet])

          
  // Handle form submission
  useEffect(() => {
    if(!loadingPost){
        console.log(response)
    }
  
  }, [loadingPost,response])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currencyId) {
      auth.toastError('Please select a currency');
      return;
    }

    const formData = new FormData();
    formData.append('currancy_id', currencyId);
    postData(formData ,'added successful');
    // console.log('all data' , formData)

    // try {
    //   // Make the POST request to add the wallet, sending only currency_id
    //   const response = await axios.post('https://travelta.online/agent/wallet/add', {
    //     currancy_id: currencyId,
    //   });

    //   if (response.status === 200) {
    //     auth.toastSuccess('Wallet added successfully');
    //     setWallet(response.data); 
    //     setCurrencyId('');
    //   } else {
    //     auth.toastError('Failed to add wallet');
    //   }
    // } catch (error) {
    //   auth.toastError('Error adding wallet');
    //   console.error(error);
    // }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Wallet</h2>

      {/* Message */}
      {message && (
        <div className="mb-4 p-2 text-white bg-red-500 rounded">
          {message}
        </div>
      )}

      {/* Wallet Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        {/* Currency ID */}
        <div className="mb-4">
          <label htmlFor="currencyId" className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            id="currencyId"
            value={currencyId}
            onChange={(e) => setCurrencyId(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          >
             <option value="">Select Currency</option>
        {currencyList.map((currency) => (
          <option key={currency.id} value={currency.id}>
            {currency.name} 
          </option>
        )
        )
    }
            
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-mainColor text-white py-2 px-4 rounded-lg w-full"
        >
          Add Wallet
        </button>
      </form>

    </div>
  );
};

export default AddWallet;
