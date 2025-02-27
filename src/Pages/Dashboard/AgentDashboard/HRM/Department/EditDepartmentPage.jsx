import React, { useState, useEffect ,useRef } from "react";
import { TextField, MenuItem, Button, Switch ,InputAdornment, IconButton  } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import { IoMdPersonAdd } from "react-icons/io";
import { IoCloudUpload } from "react-icons/io5";
import StaticLoader from '../../../../../Components/StaticLoader';
import { useNavigate, useParams } from 'react-router-dom';

const EditDepartmentPage = ({ update, setUpdate }) => {
    const { departmentId } = useParams();
    const { refetch: refetchDepartment, loading: loadingDepartment, data: dataDepartment } = useGet({ url:`https://travelta.online/agent/hrm/department/item/${departmentId}` });
    const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/hrm/department/update/${departmentId}` });

    const [name, setName] = useState("");
    const [status, setStatus] = useState(0);

    useEffect(() => {
    refetchDepartment();
    }, [refetchDepartment,update]);

    useEffect(() => {
        if (dataDepartment && dataDepartment.department) {
            const department = dataDepartment.department;
            setName(department.name || '')
            setStatus(department.status || 0)
        }
        console.log('dataDepartment', dataDepartment)
        }, [dataDepartment]); // Only run this effect when `data` changes
    

    const handleSwitchChange = () => {
        setStatus((prev) => (prev === 1 ? 0 : 1)); // Toggle between 1 and 0
    };   

    const handleReset = () => {
        setName('');
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
     
        const formData = new FormData();
        formData.append('name', name);
        formData.append('status', status || 0);

        postData(formData, 'Department Updated Success');
    };
    
    return (
        <>
        {(loadingPost )? (
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
              label="Department Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
        )}
        </>
    );
};

export default EditDepartmentPage;
