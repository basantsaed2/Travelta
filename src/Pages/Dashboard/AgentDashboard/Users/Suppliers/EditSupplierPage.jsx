import React, { useState ,useEffect} from "react";
import { TextField, MenuItem, Select, Checkbox, ListItemText, Button } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import { useNavigate, useParams } from 'react-router-dom';

const EditSupplierPage = ({ update, setUpdate }) => {
    const { supplierId } = useParams();
    const { refetch: refetchAllSupplier, loading: loadingAllSupplier, data: allSupplierData } = useGet({url:'https://travelta.online/agent/supplier'});
    const { refetch: refetchSupplierData, loading: loadingSupplierData, data: supplierData } = useGet({ url:`https://travelta.online/agent/supplier/item/${supplierId}`});
    const { postData, loadingPost, response } = usePost({ url:`https://travelta.online/agent/supplier/update/${supplierId}`});
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
      refetchAllSupplier();
      refetchSupplierData();
        }, [refetchAllSupplier,refetchSupplierData]);
    
        useEffect(() => {
            if (allSupplierData && allSupplierData.services) {
                    console.log("All Suppliers Data:", allSupplierData);
                    setSupplierServices(allSupplierData.services);
            }
        }, [allSupplierData]); // Only run this effect when `data` changes

        useEffect(() => {
          if (supplierData && supplierData.supplier_agent) {
            const supplier = supplierData.supplier_agent;
            setName(supplier.agent || '')
            setPhone(supplier.phones || '')
            setAlternatePhone(supplier.emergency_phone || '')
            setEmail(supplier.emails || '')
            setAdminName(supplier.admin_name || '')
            setAdminPhone(supplier.admin_phone || '')
            setAdminEmail(supplier.admin_email || '')
            // setSelectedServices(supplier.services || [])

            const selectedServiceIds = supplier.services.map(service => service.id); // Get the IDs of selected services
            setSelectedServices(selectedServiceIds); // Set these as the selected services
          }
          console.log('supplierData', supplierData)
        }, [supplierData]);
    

    const handleReset = () => {
        setName('')
        setPhone('')
        setEmail('')
        setAdminName('')
        setAdminPhone('')
        setAdminEmail('')
        setSelectedServices([])
        setAlternatePhone('')
      }

     useEffect(() => {
        if (!loadingPost) {
                handleReset()
                setUpdate(!update)
            }
    }, [response])


    const handleSubmit = async (e) => {
    e.preventDefault();

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

  postData(formData, 'Lead Updated Success');
  }

  return (
    <>
    <form
    className="w-full flex flex-col gap-10 p-6"
    onSubmit={handleSubmit}
    >
        <div
            className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-5"
        >
        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
            <TextField
            label="Agent Name"
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
            label="Agent Phone"
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
            label="Alternate Agent Phone"
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
            label="Agent Email"
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
            >
                Submit
            </Button>
            </div>
        </div>
    </form>
    </>
  );
};

export default EditSupplierPage;
