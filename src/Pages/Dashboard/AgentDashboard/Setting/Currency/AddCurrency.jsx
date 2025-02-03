import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';
import { useNavigate } from 'react-router-dom';

const AddCurrency = () => {
  const { refetch: refetchCurrecy, loading: loadingCurrecy, data: Currency } = useGet({
    url: 'https://travelta.online/agent/settings/currency',
  });
  const { postData: postCurrency, loadingPost: loadingCurrency, response: responseCurrency } = usePost({
    url: 'https://travelta.online/agent/settings/currency/add',
  });
  const [currency, setCurrency] = useState([]);
  const [currencyId, setCurrencyId] = useState('');
  const [currencyName, setCurrencyName] = useState('');
  const auth = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    refetchCurrecy();
  }, [refetchCurrecy]);

  useEffect(() => {
    if (Currency) {
      setCurrency(Currency.currencies);
    }
    console.log('data currency', Currency);
  }, [Currency]);

  useEffect(() => {
  
    if (!loadingCurrency) {
      if (responseCurrency) {
        navigate(-1); // Navigate back only when the response is successful
      } else {
        console.error("Response does not indicate success:", responseCurrency);
      }
    }
  }, [loadingCurrency, responseCurrency, navigate]);


  const handleCurrencyChange = (e) => {
    const selectedCurrencyId = e.target.value;
    setCurrencyId(selectedCurrencyId);

    // Set the currency name automatically based on selected currency ID
    const selectedCurrency = currency.find((cur) => cur.id === selectedCurrencyId);
    setCurrencyName(selectedCurrency ? selectedCurrency.currancy_name : ''); // Fixed here to use correct key
  };

 
  const handleSubmit = () => {
    if (!currencyName) {
      auth.toastError('Please select a currency');
      return; // Ensure function stops if no currency is selected
    }

    const formData = new FormData();
    formData.append('currancy_id', currencyId);
    formData.append('name', currencyName);

    postCurrency(formData, 'Currency added successfully');
  };

  return (
    <div>
      {/* Currency Section */}
      <div className="flex flex-wrap items-center gap-5">
        {/* Currency Dropdown */}
        <div className="w-[40%]">
          <TextField
            select
            fullWidth
            variant="outlined"
            value={currencyId}
            onChange={handleCurrencyChange} // Call function to update both ID and name
            label="Select Currency"
            className="shadow-lg border-gray-300"
            required
          >
            {loadingCurrecy ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              currency.map((cur) => (
                <MenuItem key={cur.id} value={cur.id}>
                  {cur.currancy_name} {/* Display the name of the currency */}
                </MenuItem>
              ))
            )}
          </TextField>
        </div>

          {/* Submit Button */}
      <div className="flex justify-end">
        <Button
        
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loadingCurrecy || !currencyId} // Ensure button is disabled if no currency is selected
        >
          {loadingCurrency ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
      </div>

    
    </div>
  );
};

export default AddCurrency;
