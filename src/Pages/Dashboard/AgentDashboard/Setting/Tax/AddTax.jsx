import { Button, CircularProgress, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGet } from '../../../../../Hooks/useGet';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useNavigate } from 'react-router-dom';

const AddTax = () => {

             const { refetch: refetchTax, loading: loadingTax, data: Tax } = useGet({
                      url: `https://travelta.online/agent/settings/tax`,
              });
               const { postData, loadingPost, response } = usePost({
                  url: 'https://travelta.online/agent/settings/tax/add',
                });
              const [country, setCountry] = useState([])
              const [countryId, setCountryId] = useState('')
              const [name,setName] = useState("")
              const [amount,setAmount] = useState("")
              const [type,setType] = useState("")
              const navigate = useNavigate()
              useEffect(() => {
                refetchTax()
              }, [refetchTax])
        
              useEffect(() => {
                if(Tax){
                    setCountry(Tax.countries)
                }
                console.log("data tax" , Tax)
              }, [Tax])

              
                useEffect(() => {
                
                  if (!loadingPost) {
                    if (response) {
                      navigate(-1); // Navigate back only when the response is successful
                    } else {
                      console.error("Response does not indicate success:", response);
                    }
                  }
                }, [loadingPost, response, navigate]);
              const handleCountryChange = (e) => {
                const selectedCountryId = e.target.value;
                setCountryId(selectedCountryId);
            
                // Set the currency name automatically based on selected currency ID
                const selectedCurrency = country.find((cur) => cur.id === selectedCountryId);
                setCountryName(selectedCurrency ? selectedCurrency.name : ''); // Fixed here to use correct key
              };

              const handleSubmit = () => {
               
            
                const formData = new FormData();
                formData.append('name', name);
                formData.append('country_id', countryId);
                formData.append('type', type);
                formData.append('amount', amount);
            
                postData(formData, 'Currency added successfully');
              };

  return (
    <div>
    {/* Currency Section */}
    <div className="flex flex-wrap items-center gap-5">
      {/* Currency Dropdown */}
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-3">
        <TextField
          select
          fullWidth
          variant="outlined"
          value={countryId}
          onChange={(e)=>setCountryId(e.target.value)} // Call function to update both ID and name
          label="Select Country"
          className="shadow-lg border-gray-300"
          required
        >
          {loadingTax ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            country.map((cur) => (
              <MenuItem key={cur.id} value={cur.id}>
                {cur.name} {/* Display the name of the currency */}
              </MenuItem>
            ))
          )}
        </TextField>

              <TextField
                    label="Type"
                    select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="shadow-lg border-gray-300"
                  >
                    <MenuItem value="precentage">Percentage</MenuItem>
                    <MenuItem value="value">Value</MenuItem>
                  </TextField>
                  <TextField
                    label="Name tax"
                  
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="shadow-lg border-gray-300"
                    
                  />

                  <TextField
                    label="Amount"
                  
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="shadow-lg border-gray-300"
                    
                  />
                   
         

      </div>

        {/* Submit Button */}
    <div className="flex justify-end">
      <Button
      
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loadingPost || !countryId} // Ensure button is disabled if no currency is selected
      >
        {loadingPost ? 'Submitting...' : 'Submit'}
      </Button>
    </div>
    </div>

  
  </div>
  )
}

export default AddTax