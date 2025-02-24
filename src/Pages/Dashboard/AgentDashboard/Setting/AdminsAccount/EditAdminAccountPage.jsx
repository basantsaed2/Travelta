import React, { useState, useEffect ,useRef } from "react";
import { TextField, MenuItem, Button, Switch ,InputAdornment, IconButton  } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useAuth } from '../../../../../Context/Auth';
import { useNavigate, useParams } from 'react-router-dom';

const EditAdminAccountPage = ({ update, setUpdate }) => {
    const { adminAccountId } = useParams();
    const { refetch: refetchAccount, loading: loadingAccount, data: dataAccount } = useGet({ url:`https://travelta.online/agent/admin/item/${adminAccountId}` });
    const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/admin/update/${adminAccountId}` });
    const { refetch: refetchAdminAccount, loading: loadingAdminAccount, data: adminAccountData } = useGet({url:'https://travelta.online/agent/admin'});
    const auth = useAuth()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [roles, setRoles] = useState("");   
    const [status, setStatus] = useState(0);
    const [selectedRole, setSelectedRole] = useState("");

    useEffect(() => {
        refetchAdminAccount();
        refetchAccount();
    }, [refetchAdminAccount,refetchAccount,update]);

     useEffect(() => {
           if (adminAccountData && adminAccountData.positions) {
                   console.log("Admin Account Data:", adminAccountData);
                   setRoles(adminAccountData.positions);
           }
    }, [adminAccountData]); 

    useEffect(() => {
        if (dataAccount && dataAccount.admin) {
            const adminAccount = dataAccount.admin;
            setName(adminAccount.name || '')
            setEmail(adminAccount.email || '')
            setPhone(adminAccount.phone || '')
            setPassword(adminAccount.password || '')
            setSelectedRole(adminAccount.position_id)
            setStatus(adminAccount.status || 0)
        }
        console.log('financialAccount', dataAccount)
    }, [dataAccount]);

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
        formData.append('status', status);
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
              label="Account Phone"
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
              label="Account Email"
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
              label="Account Password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
            />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <TextField
                select
                fullWidth
                variant="outlined"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)} // Update the selected service                }
                label="Select Role"
                className="mb-6"
                >
               {roles.length > 0 ? (
                    roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                            {role.name}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No roles available</MenuItem>
                )}
            </TextField>
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

export default EditAdminAccountPage;
