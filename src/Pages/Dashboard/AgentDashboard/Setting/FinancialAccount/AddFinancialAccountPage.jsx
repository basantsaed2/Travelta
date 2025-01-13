import React, { useState, useEffect ,useRef } from "react";
import { TextField, MenuItem, Button, Switch ,Input } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import IconButton from '@mui/material/IconButton';
import { IoMdPersonAdd } from "react-icons/io";

const AddFinancialAccountPage = ({ update, setUpdate }) => {
    const { postData, loadingPost, response } = usePost({ url: 'https://travelta.online/agent/financial/add' });
    const { refetch: refetchFinancialAccount, loading: loadingFinancialAccount, data: financialAccountData } = useGet({url:'https://travelta.online/agent/financial'});
    const [currency, setCurrency] = useState([])
    const ImageRef = useRef();

    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [balance, setBalance] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [status, setStatus] = useState(0);
    const [logoFile, setLogoFile] = useState(null);
    const [logoName, setLogoName] = useState("");

    useEffect(() => {
        refetchFinancialAccount();
    }, [refetchFinancialAccount,update]);

     useEffect(() => {
           if (financialAccountData && financialAccountData.currencies) {
                   console.log("Financial Account Data:", financialAccountData);
                   setCurrency(financialAccountData.currencies);
           }
    }, [financialAccountData]); 

    const handleSwitchChange = () => {
        setStatus((prev) => (prev === 1 ? 0 : 1)); // Toggle between 1 and 0
    };   
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
               setLogoFile(file);
               setLogoName(file.name);
        }
    }; 
    const handleImageClick = (ref) => {
        if (ref.current) {
               ref.current.click();
        }
    };

    const handleReset = () => {
        setName('');
        setDetails('');
        setBalance('');
        setSelectedCurrency('');
        setStatus(0)
        setLogoFile(null);
        setLogoName('')
    };

    useEffect(() => {
        if (!loadingPost) {
            handleReset();
            setUpdate(!update);
        }
    }, [response]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            auth.toastError('Please Enter Name');
            return;
        }
        if (!balance) {
            auth.toastError('Please Enter Balance');
            return;
        }
        if (!selectedCurrency) {
            auth.toastError('Please Select Currency');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('details', details);
        formData.append('balance', balance);
        formData.append('currency_id', selectedCurrency);
        formData.append('status', status);
        formData.append('logo', logo);

        postData(formData, 'Financial Account Added Success');
    };
    
    return (
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
              label="Account Name"
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
              label="Account Details"
              variant="outlined"
              type="tel"
              fullWidth
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
            />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <TextField
              label="Balance"
              variant="outlined"
              type="number"
              fullWidth
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
            />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <TextField
                select
                fullWidth
                variant="outlined"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)} // Update the selected service                }
                label="Select Currancy"
                className="mb-6"
                >
                {currency.map((currancy) => (
                    <MenuItem key={currancy.id} value={currancy.id}>
                    {currancy.name}
                    </MenuItem>
                ))}
            </TextField>
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center">
            <TextField
                id="logo-upload"
                fullWidth
                type="file"
                label="Logo"
                variant="outlined"
                // value={logoName}
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: 'image/*' }}
                onChange={handleImageChange}
                onClick={() => handleImageClick(ImageRef)}
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
            />
        </div>
          <div className="sm:w-full lg:w-[30%] flex items-center ml-5 mt-2">
             <span className="text-mainColor text-lg font-semibold">Status : </span>
                <Switch
                    checked={status === 1}
                    onChange={handleSwitchChange}
                    color="primary"
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
                variant="contained"
                fullWidth
                className="bg-mainColor hover:bg-blue-600 text-white"
            >
                Submit
            </Button>
            </div>
          </div>
        </form>
       </>
    );
};

export default AddFinancialAccountPage;
