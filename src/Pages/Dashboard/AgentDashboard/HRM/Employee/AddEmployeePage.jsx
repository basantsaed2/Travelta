import React, { useState, useEffect ,useRef } from "react";
import { TextField, MenuItem, Button, InputAdornment, IconButton} from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import { useNavigate } from 'react-router-dom';
import StaticLoader from '../../../../../Components/StaticLoader';
import { IoCloudUpload } from "react-icons/io5";

const AddEmployeePage = ({ update, setUpdate }) => {
    const { postData, loadingPost, response } = usePost({ url: 'https://travelta.online/agent/hrm/employee/add' });
    const { refetch: refetchDepartment, loading: loadingDepartment, data: departmentData } = useGet({url:'https://travelta.online/agent/hrm/employee'});
    const [departments, setDepartments] = useState([])
    const [selectDepartment, setSelectDepartment] = useState('')

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageName, setImageName] = useState("");
    const ImageRef = useRef();
    
    const navigate = useNavigate();
    
    useEffect(() => {
        refetchDepartment();
    }, [refetchDepartment,update]);

    useEffect(() => {
        if (departmentData && departmentData) {
                console.log("Department Data:", departmentData);
            setDepartments(departmentData.departments);
        }
    }, [departmentData]);
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageName(file.name);
        }
    }; 
    const handleImageClick = (ref) => {
        if (ref.current) {
               ref.current.click();
        }
    };

    const handleReset = () => {
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setImageFile('')
        setImageName('')
        setSelectDepartment('')
    };
    const handleGoBack = () => {
      navigate(-1, { replace: true });
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
            alert('Please Enter Name');
            return;
        }
        if (!phone) {
            alert('Please Enter Phone');
            return;
        }
        if (!email) {
            alert('Please Enter The Email');
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('department_id', selectDepartment);
        formData.append('image', imageFile);

        postData(formData, 'Employee Added Success');
    };

    return (
        <>
        {(loadingPost || loadingDepartment )? (
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
                label="Employee Name"
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
                label="Employee Phone"
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
              label="Employee Email"
              variant="outlined"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
            />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <TextField
                label="Employee Address"
                variant="outlined"
                fullWidth
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
              />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
           <TextField
                select
                fullWidth
                variant="outlined"
                value={selectDepartment}
                onChange={(e) => setSelectDepartment(e.target.value)} // Update the selected service                }
                label="Select Department"
                className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                >
                {departments.length > 0 ? (
                    departments.map((department) => (
                        <MenuItem key={department.id} value={department.id}>
                            {department.name}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No departments available</MenuItem>
                )}
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
                    label="Upload Image"
                    variant="outlined"
                    fullWidth
                    value={imageName}
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

export default AddEmployeePage;
