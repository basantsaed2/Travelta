import React, { useState, useEffect,useRef } from "react";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import { TextField, MenuItem, Button, Switch ,InputAdornment, IconButton  } from "@mui/material";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import StaticLoader from '../../../../../Components/StaticLoader';
import { IoCloudUpload } from "react-icons/io5";

const EditFinancialAccountPage = ({ update, setUpdate }) => {
    const { accountId } = useParams();
    const { refetch: refetchAccount, loading: loadingAccount, data: dataAccount } = useGet({ url:`https://travelta.online/agent/financial/item/${accountId}` });
    const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/financial/update/${accountId}` });
    const { refetch: refetchFinancialAccount, loading: loadingFinancialAccount, data: financialAccountData } = useGet({url:'https://travelta.online/agent/financial'});
    const [currency, setCurrency] = useState([])
    const [financialAccount, setFinancialAccount] = useState([])
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
        refetchAccount();
    }, [refetchFinancialAccount,refetchAccount,update]);

     useEffect(() => {
           if (financialAccountData && financialAccountData.currencies) {
                   console.log("Financial Account Data:", financialAccountData);
                   setCurrency(financialAccountData.currencies);
           }
    }, [financialAccountData]);
    
    useEffect(() => {
        if (dataAccount && dataAccount.financial) {
          const financialAccount = dataAccount.financial;
          setName(financialAccount.name || '')
          setDetails(financialAccount.details || '')
          setBalance(financialAccount.balance || '')
          setLogoFile(financialAccount.logo_link || '')
          setSelectedCurrency(financialAccount.currency_id)
          setLogoName(financialAccount.logo || '')
          setLogoFile(financialAccount.logo_link || '')
          setStatus(financialAccount.status || 0)
        }
        console.log('financialAccount', dataAccount)
      }, [dataAccount]); // Only run this effect when `data` changes


    const handleSwitchChange = () => {
        setStatus((prev) => (prev === 1 ? 0 : 1)); // Toggle between 1 and 0
    };    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
               setLogoFile(file);
            //    setLogoName(file.name);
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
        formData.append('logo', logoFile);

        postData(formData, 'Financial Account Added Success');
    };
    
    
    return (
        <>
        {(loadingPost || loadingFinancialAccount )? (
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
                     inputProps={{
                        min: "0",
              }}
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
                 <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
          {/* File input hidden, triggered by custom button */}
                <input
                    type="file"
                    ref={ImageRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <div className="w-full flex flex-col items-start justify-center">
                        <TextField
                            label="Upload Logo"
                            variant="outlined"
                            fullWidth
                            value={logoName}
                            onClick={() => handleImageClick(ImageRef)} // Open file dialog when clicked
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton> 
                                    < IoCloudUpload/>
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                            className="w-full shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                            />
                    </div>
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
        )}
        </>
    );
};

export default EditFinancialAccountPage;
