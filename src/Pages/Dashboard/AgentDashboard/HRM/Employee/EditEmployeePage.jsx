import React, { useState, useEffect ,useRef } from "react";
import { TextField, MenuItem, Button, InputAdornment, IconButton ,Autocomplete,CircularProgress} from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { IoCloudUpload } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployeePage = ({ update, setUpdate }) => {
    const { employeeId } = useParams();

    const { refetch: refetchEmployee, loading: loadingEmployee, data: dataEmployee } = useGet({ url:`https://travelta.online/agent/hrm/employee/item/${employeeId}` });
    const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/hrm/employee/update/${employeeId}` });
    const { refetch: refetchDepartment, loading: loadingDepartment, data: departmentData } = useGet({url:'https://travelta.online/agent/hrm/department'});
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
        refetchEmployee();
    }, [refetchDepartment,refetchEmployee,update]);

    useEffect(() => {
        if (departmentData && departmentData.departments) {
                console.log("Department Data:", departmentData);
            setDepartments(departmentData.departments);
        }
    }, [departmentData]);

    useEffect(() => {
        if (dataEmployee && dataEmployee.employee) {
            const employee = dataEmployee.employee;
            setName(employee.name || '')
            setPhone(employee.phone || '')
            setAddress(employee.address || '')
            setEmail(employee.email || '')
            setSelectDepartment(employee.department_id || '')
            setImageName(employee.image || '')
            setImageFile(employee.image_link || '') 
            }
        console.log('dataEmployee', dataEmployee)
    }, [dataEmployee]); // Only run this effect when `data` changes
        
    
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
        formData.append('email', email);
        formData.append('address', address);
        formData.append('department_id', selectDepartment);
        formData.append('image', imageFile);

        postData(formData, 'Employee Updated Success');
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
                <Autocomplete
                    options={Array.isArray(departments) && departments.length > 0 ? departments : [{ id: "", name: "No Departments" }]} 
                    getOptionLabel={(option) => option.name} 
                    value={departments.find((department) => department.id === selectDepartment) || null}
                    onChange={(event, newValue) => {setSelectDepartment(newValue ? newValue.id : ""); }}
                    loading={loadingDepartment} 
                    className="w-full shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Department"
                        variant="outlined"
                        fullWidth
                        required
                        InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                            {loadingDepartment ? <CircularProgress size={20} /> : null}
                            {params.InputProps.endAdornment}
                            </>
                        ),
                        }}
                    />
                    )}
                />
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
            fullWidth
            variant="contained"
            className="bg-mainColor hover:bg-blue-600 text-white"
            color="primary"
            onClick={handleSubmit}
            disabled={loadingPost || !name ||!phone ||!selectDepartment} // Ensure button is disabled if no currency is selected
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

export default EditEmployeePage;
