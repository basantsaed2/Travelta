import React, { useState ,useEffect} from "react";
import { TextField, MenuItem, Select, Checkbox, ListItemText, Button } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const EditSupplierPage = ({ update, setUpdate }) => {
    const { supplierId } = useParams();
    const { refetch: refetchAllSupplier, loading: loadingAllSupplier, data: allSupplierData } = useGet({url:'https://travelta.online/agent/supplier'});
    const { refetch: refetchSupplierData, loading: loadingSupplierData, data: supplierData } = useGet({ url:`https://travelta.online/agent/supplier/item/${supplierId}`});
    const { postData, loadingPost, response } = usePost({ url:`https://travelta.online/agent/supplier/update/${supplierId}`});
    const [suppliersServices, setSupplierServices] = useState([])
    const [selectedServices, setSelectedServices] = useState([]); // Holds the selected service ID
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("")
    const [additionalPhones, setAdditionalPhones] = useState([]);
    const [additionalEmails, setAdditionalEmails] = useState([]);
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
            setPhone(Array.isArray(supplier.phones) ? supplier.phones[0] : supplier.phones); // Check if phones is an array and set the first phone
              setEmail(Array.isArray(supplier.emails) ? supplier.emails[0] : supplier.emails); // Check if emails is an array and set the first email
            setAdminName(supplier.admin_name || '')
            setAdminPhone(supplier.admin_phone || '')
            setAdminEmail(supplier.admin_email || '')
            // setSelectedServices(supplier.services || [])
            // Set the remaining phones and emails as additional ones
            setAdditionalPhones(Array.isArray(supplier.phones) ? supplier.phones.slice(1) : []); // Remaining phones
            setAdditionalEmails(Array.isArray(supplier.emails) ? supplier.emails.slice(1) : []); // Remaining emails

            const selectedServiceIds = supplier.services.map(service => service.id); // Get the IDs of selected services
            setSelectedServices(selectedServiceIds); // Set these as the selected services
          }
          console.log('supplierData', supplierData)
        }, [supplierData]);
    

        const handleReset = () => {
          setName('')
          setPhone('')
          setAdditionalPhones([])
          setAdditionalEmails([])
          setEmail('')
          setAdminName('')
          setAdminPhone('')
          setAdminEmail('')
          setSelectedServices([])
      }

    //  useEffect(() => {
    //     if (!loadingPost) {
    //             handleReset()
    //             setUpdate(!update)
    //         }
    // }, [response])

    
    useEffect(() => {
        if (!loadingPost && response) {
              setUpdate(!update);
              navigate(-1, { replace: true });
        }
    }, [response]);


    const handleSubmitSupplier = async (e) => {
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
      const allPhones = [phone, ...additionalPhones];
      const allEmails = [email, ...additionalEmails];
  
      const formData = new FormData();
  
      formData.append('agent', name)
      formData.append('phones', JSON.stringify(allPhones))
      formData.append('emails', JSON.stringify(allEmails))
      formData.append('admin_name', adminName)
      formData.append('admin_phone', adminPhone)
      formData.append('admin_email', adminEmail)
  
      formData.append('services', JSON.stringify(selectedServices));
      // formData.append('emergency_phone', alternatePhone)
          
    
      console.log('formData', formData)
  
      postData(formData, 'Supplier Updated Success');
      }

  const handleAddPhoneField = () => {
    setAdditionalPhones([...additionalPhones, '']);
  };

  const handleAdditionalPhoneChange = (index, value) => {
    const updatedPhones = [...additionalPhones];
    updatedPhones[index] = value;
    setAdditionalPhones(updatedPhones);

    console.log('phone ', updatedPhones)
  };

  const handleRemovePhoneField = (index) => {
    const updatedPhones = additionalPhones.filter((_, i) => i !== index);
    setAdditionalPhones(updatedPhones);
  };

  const handleAddEmailField = () => {
    setAdditionalEmails([...additionalEmails, ""]);
  };
  
  const handleRemoveEmailField = (index) => {
    const updatedEmails = additionalEmails.filter((_, i) => i !== index);
    setAdditionalEmails(updatedEmails);
  };
  
  const handleAdditionalEmailChange = (index, value) => {
    const updatedEmails = [...additionalEmails];
    updatedEmails[index] = value;
    setAdditionalEmails(updatedEmails);
  };

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
    
            {/* Supplier Phone */}
            <div className="sm:w-full lg:w-[35%] flex flex-col items-start justify-center gap-y-1">
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
          </div>
    
          {/* Button to Add More Phone Fields */}
          <div className="w-full flex justify-start gap-4 mt-2">
            <Button
              type="button"
              variant="contained"
              className="bg-mainColor hover:bg-blue-600 text-white px-4 py-1 flex items-center gap-2"
              onClick={handleAddPhoneField}
            >
              <FaPlus /> Add More Phone
            </Button>
          </div>
    
          {additionalPhones.map((phone, index) => (
            <div
              key={index}
              className="w-full sm:w-full md:w-1/2 lg:w-1/2 flex sm:flex-col lg:flex-row gap-4 mt-2 bg-white p-3 rounded-lg shadow-lg"
            >
              {/* Phone Field */}
              <div className="sm:w-full lg:w-[70%] flex flex-col items-start justify-center gap-y-1">
                <TextField
                  label={`Phone ${index + 2}`}
                  variant="outlined"
                  type="tel"
                  fullWidth
                  value={phone}
                  onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
                  className="shadow-md border-mainColor hover:border-mainColor focus:border-mainColor p-2 rounded-lg"
                />
              </div>
    
              {/* Remove Phone Button */}
              <div className="flex items-center justify-center sm:w-full lg:w-[30%] mt-2 lg:mt-0">
                <Button
                  type="button"
                  variant="contained"
                  className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md"
                  onClick={() => handleRemovePhoneField(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
    
          {/* Email Fields Section */}
          <div className="w-full flex sm:flex-col lg:flex-row gap-4 mt-4">
            {/* Supplier Email */}
            <div className="sm:w-full lg:w-[35%] flex flex-col items-start justify-center gap-y-1">
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
          </div>
    
          {/* Button to Add More Email Fields */}
          <div className="w-full flex justify-start gap-4 mt-2">
            <Button
              type="button"
              variant="contained"
              className="bg-mainColor hover:bg-blue-600 text-white px-4 py-1 flex items-center gap-2"
              onClick={handleAddEmailField}
            >
              <FaPlus /> Add More Email
            </Button>
          </div>
    
          {additionalEmails.map((email, index) => (
            <div
              key={index}
              className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-[48%] flex sm:flex-col lg:flex-row gap-4 mt-2 bg-white p-3 rounded-lg shadow-lg"
            >
              <div className="sm:w-full lg:w-[70%] flex flex-col items-start justify-center gap-y-1">
                <TextField
                  label={`Email ${index + 2}`}
                  variant="outlined"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => handleAdditionalEmailChange(index, e.target.value)}
                  className="shadow-md border-mainColor hover:border-mainColor focus:border-mainColor p-2 rounded-lg"
                />
              </div>
              {/* Remove Email Button */}
              <div className="flex items-center justify-center sm:w-full lg:w-[30%] mt-2 lg:mt-0">
                <Button
                  type="button"
                  variant="contained"
                  className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md"
                  onClick={() => handleRemoveEmailField(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
    
          {/* Admin Fields Section */}
          <div className="w-full flex sm:flex-col lg:flex-row gap-4 mt-4">
            {/* Admin Name */}
            <div className="sm:w-full lg:w-[35%] flex flex-col items-start justify-center gap-y-1">
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
    
            {/* Admin Phone */}
            <div className="sm:w-full lg:w-[35%] flex flex-col items-start justify-center gap-y-1">
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
          </div>
    
          {/* Admin Email */}
          <div className="w-full flex sm:flex-col lg:flex-row gap-4 mt-2">
            <div className="sm:w-full lg:w-[35%] flex flex-col items-start justify-center gap-y-1">
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
          </div>
    
          {/* Services Section */}
          <div className="w-full flex sm:flex-col lg:flex-row gap-4 mt-4">
            <div className="sm:w-full lg:w-[35%] flex flex-col items-start justify-center gap-y-1">
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
                 <div className="">
                      <Button text={'Reset'} onClick={handleReset} className="bg-mainColor hover:bg-blue-600 hover:text-white">Reset</Button>
                  </div>
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

export default EditSupplierPage;
