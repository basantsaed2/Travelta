import { TextField,MenuItem,Button,Checkbox,ListItemText,Autocomplete} from "@mui/material";
import React, { useEffect, useState } from 'react'
import { useGet } from '../../../../../Hooks/useGet';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useNavigate } from 'react-router-dom';
import StaticLoader from '../../../../../Components/StaticLoader';

const AddCurrencyPage = ({update,setUpdate}) => {
    const { refetch: refetchCurrecy, loading: loadingCurrecy, data: Currency } = useGet({
      url: 'https://travelta.online/agent/settings/currency',
    });
    const { postData, loadingPost, response} = usePost({
      url: 'https://travelta.online/agent/settings/currency/add',
    });            
    const [currency, setCurrency] = useState([]);
    const [currencyId, setCurrencyId] = useState('');
    const [currencyName, setCurrencyName] = useState('');
    const [point, setPoint] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
      refetchCurrecy();
    }, [refetchCurrecy,update]);

    useEffect(() => {
      if (Currency) {
        setCurrency(Currency.currencies);
      }
      console.log('data currency', Currency);
    }, [Currency]);  

    useEffect(() => {
    
      if (!loadingPost) {
        if (response) {
          navigate(-1); // Navigate back only when the response is successful
        } else {
          console.error("Response does not indicate success:", response);
        }
      }
    }, [loadingPost, response, navigate]);

    const handleReset = () => {
      setCurrencyName('');
      setCurrencyId('');
      setPoint('');
    };

    const handleSubmit = () => {
      const formData = new FormData();
      formData.append('currancy_id', currencyId);
      formData.append('name', currencyName);
      formData.append('point', point);

      postData(formData, 'Currency added successfully')
    }

  return (
      <>
          {(loadingPost || loadingCurrecy )? (
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
                <Autocomplete
                  options={currency} // Currency list
                  getOptionLabel={(option) => option.currancy_name} // Show currency name in dropdown
                  value={currency.find((c) => c.id === currencyId) || null} // Match selected currency
                  onChange={(event, newValue) => {
                    setCurrencyId(newValue ? newValue.id : ""); // Update currency ID
                    setCurrencyName(newValue ? newValue.currancy_name : ""); // Update currency name
                  }}
                  loading={loadingCurrecy} // Show loader if fetching data
                  className="w-full shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Currency"
                      variant="outlined"
                      fullWidth
                      required
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingCurrecy ? <CircularProgress size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </div>
              <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
              <TextField
                label="Currency Decimal Precision"
                value={point}
                type="number"
                onChange={(e) => setPoint(e.target.value)}
                fullWidth
                variant="outlined"
                inputProps={{ min: 0 }}
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
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
                  disabled={loadingPost || !currencyId} // Ensure button is disabled if no currency is selected
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

export default AddCurrencyPage;
