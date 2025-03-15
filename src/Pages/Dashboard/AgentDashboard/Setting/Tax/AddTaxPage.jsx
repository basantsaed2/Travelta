import { Button, CircularProgress, MenuItem, TextField ,Autocomplete} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGet } from '../../../../../Hooks/useGet';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useNavigate } from 'react-router-dom';
import StaticLoader from '../../../../../Components/StaticLoader';

const AddTaxPage = ({update,setUpdate}) => {

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
    }, [refetchTax,update])

    useEffect(() => {
      if(Tax){
          setCountry(Tax.countries)
      }
      console.log("data tax" , Tax)
    }, [Tax])

    useEffect(() => {
      if (!loadingPost) {
        setUpdate(!update);
      }
    }, [response]);
              
    useEffect(() => {
    
      if (!loadingPost) {
        if (response) {
          navigate(-1); // Navigate back only when the response is successful
        } else {
          console.error("Response does not indicate success:", response);
        }
      }
    }, [response]);
    const handleReset = () => {
      setName('');
      setCountryId('');
      setType('');
      setAmount('');
    };
    const handleSubmit = () => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('country_id', countryId);
      formData.append('type', type);
      formData.append('amount', amount);
    
      postData(formData, 'Tax added successfully')
    }

  return (
      <>
          {(loadingPost || loadingTax )? (
                 <div className="w-full h-56 flex justify-center items-center">
                        <StaticLoader />
                 </div>
          ) : (
          <>
          <form
            className="w-full flex flex-col gap-5 p-6"
            onSubmit={handleSubmit}
            >
            <div
              className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-5"
            >
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
              <TextField
                label="Tax Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                variant="outlined"
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
              />
            </div>
            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
              <TextField
                label="Amount"
                value={amount}
                type='number'
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                variant="outlined"
                inputProps={{ min: 0 }}
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
              />
            </div>
            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
              <TextField
                label="Select Type"
                select
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                variant="outlined"
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
              >
                <MenuItem value="precentage">Percentage</MenuItem>
                <MenuItem value="value">Value</MenuItem>
              </TextField>
            </div>
            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
              <Autocomplete
                options={country} // Country list
                getOptionLabel={(option) => option.name} // Show country name in dropdown
                value={country.find((c) => c.id === countryId) || null} // Match selected country
                onChange={(event, newValue) => setCountryId(newValue ? newValue.id : "")} // Update ID
                loading={loadingTax} // Show loader if fetching data
                className="w-full shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Country"
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingTax ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </div>
            </div>
            <div className="w-full flex items-center gap-x-4">
              <div className="">
                  <Button text={'Reset'} onClick={handleReset} className="bg-mainColor hover:bg-blue-600 hover:text-white">Reset</Button>
              </div>
              <div className="">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="bg-mainColor hover:bg-blue-600 text-white"
                color="primary"
                onClick={handleSubmit}
                disabled={loadingPost || !countryId || !name || !amount || !type} // Ensure button is disabled if no currency is selected
              >
                {loadingPost ? "Submitting..." : "Submit"}
              </Button>
              </div>
            </div>
          </form>
         </>
          )}
      </>
  )
}

export default AddTaxPage;