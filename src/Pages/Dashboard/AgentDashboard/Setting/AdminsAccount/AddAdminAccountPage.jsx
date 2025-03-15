import React, { useState, useEffect ,useRef } from "react";
import { TextField, MenuItem, Button, Switch ,InputAdornment, IconButton ,Autocomplete } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useAuth } from '../../../../../Context/Auth';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const AddAdminAccountPage = ({ update, setUpdate }) => {
    const { postData, loadingPost, response } = usePost({ url: 'https://travelta.online/agent/admin/add' });
    const { refetch: refetchAdminAccount, loading: loadingAdminAccount, data: adminAccountData } = useGet({url:'https://travelta.online/agent/admin'});
    const auth = useAuth()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [roles, setRoles] = useState([]);   
    const [status, setStatus] = useState(0);
    const [selectedRole, setSelectedRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        refetchAdminAccount();
    }, [refetchAdminAccount,update]);

     useEffect(() => {
           if (adminAccountData && adminAccountData.positions) {
                   console.log("Admin Account Data:", adminAccountData);
                   setRoles(adminAccountData.positions);
           }
    }, [adminAccountData]); 

    const handleSwitchChange = () => {
        setStatus((prev) => (prev === 1 ? 0 : 1)); // Toggle between 1 and 0
    };   

    const handleReset = () => {
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setSelectedRole('');
        setStatus(0)
    };

    useEffect(() => {
    if (!loadingPost) {
        if (response) {
          navigate(-1); // Navigate back only when the response is successful
        } else {
          console.error("Response does not indicate success:", response);
        }
      }
    }, [loadingPost, response, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            auth.toastError('Please Enter Name');
            return;
        }
        if (!phone) {
            auth.toastError('Please Enter Phone');
            return;
        }
        if (!email) {
            auth.toastError('Please Enter Email');
            return;
        }
        if (!password) {
            auth.toastError('Please Enter Password');
            return;
        }
        if (!selectedRole) {
            auth.toastError('Please Select Role');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('status', status || 0);
        formData.append('position_id', selectedRole);

        postData(formData, 'Admin Account Added Success');
    };
    
    return (
        <>
        {(loadingPost || loadingAdminAccount )? (
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
              label="Admin Name"
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
              label="Admin Phone"
              variant="outlined"
              fullWidth
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
              />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <TextField
              label="Admin Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
              />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
             <TextField
                label="Admin Password"
                variant="outlined"
                type={showPassword ? "text" : "password"} // Toggle type
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </IconButton>
                    </InputAdornment>
                ),
                }}
                />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <Autocomplete
                options={Array.isArray(roles) && roles.length > 0 ? roles : [{ id: "", name: "No Roles" }]} 
                getOptionLabel={(option) => option.name} // Show currency name in dropdown
                value={roles.find((role) => role.id === selectedRole) || null} // Match selected currency
                onChange={(event, newValue) => {setSelectedRole(newValue ? newValue.id : ""); }}
                loading={loadingAdminAccount} // Show loader if fetching data
                className="w-full shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Admin Role"
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <>
                        {loadingAdminAccount ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                        </>
                    ),
                    }}
                />
                )}
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
                fullWidth
                variant="contained"
                className="bg-mainColor hover:bg-blue-600 text-white"
                color="primary"
                onClick={handleSubmit}
                disabled={loadingPost || !selectedRole || !name || !phone || !password || !email} // Ensure button is disabled if no currency is selected
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
};

export default AddAdminAccountPage;
