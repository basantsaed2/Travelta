import React, { useState, useEffect ,useRef } from "react";
import { TextField, Button, Autocomplete,CircularProgress} from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useNavigate, useParams } from 'react-router-dom';

const EditOwnerPage = ({ update, setUpdate }) => {
    const { ownerId } = useParams();
    const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/accounting/owner/update/${ownerId}` });
    const { refetch: refetchOwner, loading: loadingOwner, data: dataOwner } = useGet({ url:`https://travelta.online/agent/accounting/owner/item/${ownerId}` });
    const {refetch:refetchList ,loading:loadingList, data: listData,} = useGet({ url: "https://travelta.online/agent/accounting/owner/lists" });
    const [currencies,setCurrencies]= useState([])
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [balance, setBalance] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        refetchList();
        refetchOwner();
    }, [refetchList,refetchOwner, update]);

    useEffect(() => {
        if (listData && listData.currencies) {
            setCurrencies(listData.currencies);
        }
    }, [listData]);

    useEffect(() => {
        if (dataOwner && dataOwner.owner) {
            const owner = dataOwner.owner;
            setName(owner.name || '')
            setPhone(owner.phone || '')
            setBalance(owner.balance || 0)
            setSelectedCurrency(owner.currency_id || '')
            }
        console.log('dataOwner', dataOwner)
    }, [dataOwner]); // Only run this effect when `data` changes

    const handleReset = () => {
        setName('');
        setPhone('');
        setBalance('');
        setSelectedCurrency('')
    };

    useEffect(() => {
         if (!loadingPost) {
             if (response) {
             navigate(-1); // Navigate back only when the response is successful
             }
         }
    }, [loadingPost, response, navigate]);
           
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('balance', balance || 0);
        formData.append('currency_id', selectedCurrency);

        postData(formData, 'Owner Updated Success');
    };

    return (
        <>
        {(loadingPost || loadingList )? (
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
                label="Owner Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
              />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <TextField
                label="Owner Phone"
                variant="outlined"
                type="tel"
                fullWidth
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
            />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <TextField
              label="Owner Balance"
              variant="outlined"
              type="number"
              fullWidth
              required
              value={balance}
              inputProps={{ min: 0 }}
              onChange={(e) => setBalance(e.target.value)}
              className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
            />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
        <Autocomplete
                options={Array.isArray(currencies) && currencies.length > 0 ? currencies : [{ id: "", name: "No Currencies" }]} 
                getOptionLabel={(option) => option.name} 
                value={currencies.find((currency) => currency.id === selectedCurrency) || null}
                onChange={(event, newValue) => {setSelectedCurrency(newValue ? newValue.id : ""); }}
                loading={loadingList} 
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
                        {loadingList ? <CircularProgress size={20} /> : null}
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
                    disabled={loadingPost || !name ||!phone || !selectedCurrency || !balance } // Ensure button is disabled if no currency is selected
                    >
                    {loadingPost ? "Submitting..." : "Submit"}
                    </Button>
                </div>
                </div>
        </form>
       </>
        )}
       </>
    );
}

export default EditOwnerPage;
