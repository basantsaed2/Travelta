import { Button, CircularProgress, MenuItem, TextField ,Autocomplete} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGet } from '../../../../../Hooks/useGet';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useNavigate } from 'react-router-dom';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useAuth } from "../../../../../Context/Auth";

const AddWalletPage = ({update,setUpdate}) => {

    const {refetch: refetchAddWallet,loading:loadingWallet,data: dataAddWallet,} = useGet({url: "https://travelta.online/agent/wallet",});
    const { postData, loadingPost, response } = usePost({url: 'https://travelta.online/agent/wallet/add',});         
    const [currencyId, setCurrencyId] = useState('');
    const [currencyList, setCurrencyList] = useState([]);
    const auth = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
      refetchAddWallet()
    }, [refetchAddWallet,update])
  
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
        if (response) {
          navigate(-1); // Navigate back only when the response is successful
        } else {
          console.error("Response does not indicate success:", response);
        }      }
    
    }, [loadingPost,response])

    const handleReset = () => {
      setCurrencyId('');
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!currencyId) {
        auth.toastError('Please select a currency');
        return;
      }
      const formData = new FormData();
      formData.append('currancy_id', currencyId);
      postData(formData ,'Wallet added successfully');
  
    };

  return (
      <>
          {(loadingPost || loadingWallet )? (
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
                options={currencyList} // Country list
                getOptionLabel={(option) => option.name} // Show country name in dropdown
                value={currencyList.find((c) => c.id === currencyId) || null} // Match selected country
                onChange={(event, newValue) => setCurrencyId(newValue ? newValue.id : "")} // Update ID
                loading={loadingWallet} // Show loader if fetching data
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
                          {loadingWallet ? <CircularProgress size={20} /> : null}
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
                disabled={loadingPost || !currencyId } // Ensure button is disabled if no currency is selected
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

export default AddWalletPage;
