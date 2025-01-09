import React, { useState ,useEffect} from "react";
import { TextField, MenuItem, Select, Checkbox, ListItemText, Button } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';

const AddSupplierPage = ({ update, setUpdate }) => {
    const { refetch: refetchSupplier, loading: loadingSupplier, data: dataSupplier } = useGet({url:'https://travelta.online/agent/supplier'});
    const { postData, loadingPost, response } = usePost({ url:'https://travelta.online/agent/supplier/add'});
    const [suppliersServices, setSupplierServices] = useState([])
    const [selectedServices, setSelectedServices] = useState([]); // Holds the selected service ID
    
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [alternatePhone, setAlternatePhone] = useState("");
    const [email, setEmail] = useState("");
    const [adminName, setAdminName] = useState("");
    const [adminPhone, setAdminPhone] = useState("");
    const [adminEmail, setAdminEmail] = useState("");

    useEffect(() => {
            refetchSupplier();
        }, [refetchSupplier]);
    
        useEffect(() => {
            if (dataSupplier && dataSupplier.services) {
                    console.log("Suppliers Data:", dataSupplier);
                    setSupplierServices(dataSupplier.services);
            }
            console.log('response', selectedServices)

        }, [dataSupplier]); // Only run this effect when `data` changes
    

    const handleReset = () => {
        setName('')
        setPhone('')
        setAlternatePhone('')
        setEmail('')
        setAdminName('')
        setAdminPhone('')
        setAdminEmail('')
        setSelectedServices([])
    }

     useEffect(() => {
        if (!loadingPost) {
                handleReset()
                setUpdate(!update)
                
            }
    }, [response])


    const handleSubmitSupplier = async (e) => {
    e.preventDefault();

    // const newSupplier = {
    //   name, phone, alternatePhone, email, adminName, adminPhone, adminEmail, selectedServices 
    // };

    // // Call the onSubmit function passed from the parent, passing the new supplier data
    // onSubmit(newSupplier);

    if (!name) {
           auth.toastError('please Enter Name')
           return;
    }
    if (!phone) {
           auth.toastError('please Enter phone')
           return;
    }
    if (!email) {
           auth.toastError('please Enter Email')
           return;
    }
    if (!adminName) {
        auth.toastError('please Enter Admin Name')
        return;
    }
    if (!adminPhone) {
            auth.toastError('please Enter Admin phone')
            return;
    }
    if (!adminEmail) {
            auth.toastError('please Enter Admin Email')
            return;
    }
    if (!selectedServices || selectedServices.length === 0) {
        auth.toastError('please Select Service')
        return;
    }
    const formData = new FormData();

    formData.append('agent', name)
    formData.append('phones', phone)
    formData.append('emails', email)
    formData.append('admin_name', adminName)
    formData.append('admin_phone', adminPhone)
    formData.append('admin_email', adminEmail)
    formData.append('services', JSON.stringify(selectedServices));
    formData.append('emergency_phone', alternatePhone)

    console.log('formData', formData)

    postData(formData, 'Lead Added Success');
    }

  return (
    <>
    <form
    className="w-full flex flex-col gap-10 p-6"
    onSubmit={handleSubmitSupplier}
    >
        <div
            className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-5"
        >
        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
            <TextField
            label="Supplier Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
            />
        </div>
        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
            <TextField
            label="Supplier Phone"
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
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
            <TextField
            label="Alternate Supplier Phone"
            variant="outlined"
            type="tel"
            fullWidth
            value={alternatePhone}
            onChange={(e) => setAlternatePhone(e.target.value)}
            className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
          />
        </div>
        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
            <TextField
            label="Supplier Email"
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
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
            <TextField
            label="Admin Name"
            variant="outlined"
            fullWidth
            required
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
            />
        </div>
        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
            <TextField
            label="Admin Phone"
            variant="outlined"
            type="tel"
            fullWidth
            required
            value={adminPhone}
            onChange={(e) => setAdminPhone(e.target.value)}
            className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
          />
        </div>
        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
            <TextField
            label="Admin Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
          />
        </div>
        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
            <TextField
              label="Services"
              fullWidth
              select
              value={selectedServices}
              onChange={(e) => setSelectedServices(e.target.value)}
              SelectProps={{
                multiple: true,
                renderValue: (selected) =>
                  selected
                    .map((id) => suppliersServices.find((service) => service.id === id)?.service_name)
                    .join(", "),
              }}
              variant="outlined"
              className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
            >
              {suppliersServices.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  <Checkbox checked={selectedServices.includes(service.id)} />
                  <ListItemText primary={service.service_name} />
                </MenuItem>
              ))}
            </TextField>
        </div>
        </div>
          <div className="w-full flex items-center gap-x-4">
            {/* <div className="">
                <StaticButton text={'Reset'} handleClick={handleReset} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
            </div> */}
            <div className="">
                <Button
                type="submit"
                variant="contained"
                fullWidth
                className="bg-mainColor hover:bg-blue-600 text-white"
                onClick={handleSubmitSupplier}
            >
                Submit
            </Button>
            </div>
        </div>
    </form>
    </>
  );
};

export default AddSupplierPage;
