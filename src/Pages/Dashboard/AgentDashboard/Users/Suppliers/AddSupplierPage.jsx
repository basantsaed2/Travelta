import React, { useState ,useEffect} from "react";
import { TextField, MenuItem, Select, Checkbox, ListItemText, Button,Autocomplete,CircularProgress  } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddSupplierPage = ({ update, setUpdate }) => {
    const { refetch: refetchSupplier, loading: loadingSupplier, data: dataSupplier } = useGet({url:'https://travelta.online/agent/supplier'});
    const { postData, loadingPost, response } = usePost({ url:'https://travelta.online/agent/supplier/add'});
    const [suppliersServices, setSupplierServices] = useState([])
    const [selectedServices, setSelectedServices] = useState([]); // Holds the selected service ID
    const [serviceDescriptions, setServiceDescriptions] = useState({});

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    // const [alternatePhone, setAlternatePhone] = useState("");
    const [email, setEmail] = useState("")
    const [additionalPhones, setAdditionalPhones] = useState([]);
    const [additionalEmails, setAdditionalEmails] = useState([]);
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

      const handleServiceChange = (event) => {
        const {
          target: { value },
        } = event;
      
        const selected = typeof value === 'string' ? value.split(',') : value;
      
        // Remove descriptions for unselected services
        const updatedDescriptions = Object.fromEntries(
          selected.map((id) => [id, serviceDescriptions[id] || ''])
        );
      
        setSelectedServices(selected);
        setServiceDescriptions(updatedDescriptions);
      };      

      const handleDescriptionChange = (serviceId, description) => {
        setServiceDescriptions((prev) => ({
          ...prev,
          [serviceId]: description,
        }));
      };      

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
        
  
    console.log('formData', formData)

    postData(formData, 'Supplier Added Success');
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
      className="w-full rounded-xl shadow-2xl p-8 space-y-10"
      onSubmit={handleSubmitSupplier}
    >  
      {/* Supplier Info Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2">Supplier Information</h3>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Supplier Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Supplier Phone"
            variant="outlined"
            type="tel"
            fullWidth
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
  
        {/* Additional Phone Fields */}
        {additionalPhones.map((phone, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4 items-center bg-gray-50 p-4 rounded-md shadow">
            <TextField
              label={`Phone ${index + 2}`}
              variant="outlined"
              type="tel"
              fullWidth
              value={phone}
              onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemovePhoneField(index)}
            >
              Remove
            </Button>
          </div>
        ))}
  
        <Button
          type="button"
          variant="outlined"
          color="primary"
          startIcon={<FaPlus />}
          onClick={handleAddPhoneField}
        >
          Add Phone
        </Button>
  
        {/* Supplier Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Supplier Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
  
        {/* Additional Email Fields */}
        {additionalEmails.map((email, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4 items-center bg-gray-50 p-4 rounded-md shadow">
            <TextField
              label={`Email ${index + 2}`}
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => handleAdditionalEmailChange(index, e.target.value)}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveEmailField(index)}
            >
              Remove
            </Button>
          </div>
        ))}
  
        <Button
          type="button"
          variant="outlined"
          color="primary"
          startIcon={<FaPlus />}
          onClick={handleAddEmailField}
        >
          Add Email
        </Button>
      </section>
  
      {/* Admin Info Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2">Admin Contact</h3>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Admin Name"
            variant="outlined"
            fullWidth
            required
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
          <TextField
            label="Admin Phone"
            variant="outlined"
            type="tel"
            fullWidth
            required
            value={adminPhone}
            onChange={(e) => setAdminPhone(e.target.value)}
          />
          <TextField
            label="Admin Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
        </div>
      </section>
  
      {/* Services */}
      <section className="space-y-6">
  <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2">Supplier Services</h3>

  <Autocomplete
  multiple
  options={Array.isArray(suppliersServices) && suppliersServices.length > 0 
    ? suppliersServices 
    : [{ id: "", service_name: "No Services" }]}
  getOptionLabel={(option) => option.service_name}
  value={selectedServices}
  onChange={(event, newValue) => {
    setSelectedServices(newValue);
    // Clean up removed descriptions
    const updatedDescriptions = {};
    newValue.forEach((service) => {
      updatedDescriptions[service.id] = serviceDescriptions[service.id] || '';
    });
    setServiceDescriptions(updatedDescriptions);
  }}
  loading={loadingSupplier}
  disableCloseOnSelect
  className="w-full shadow-md font-mainColor border-mainColor"
  renderInput={(params) => (
    <TextField
      {...params}
      label="Select Supplier Services"
      variant="outlined"
      fullWidth
      required
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {loadingSupplier ? <CircularProgress size={20} /> : null}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  )}
  isOptionEqualToValue={(option, value) => option.id === value.id}
/>

{/* Description fields for selected services */}
<div className="space-y-4 mt-4">
  {selectedServices.map((service) => (
    <TextField
      key={service.id}
      label={`Description for ${service.service_name}`}
      variant="outlined"
      fullWidth
      multiline
      rows={3}
      value={serviceDescriptions[service.id] || ''}
      onChange={(e) =>
        setServiceDescriptions((prev) => ({
          ...prev,
          [service.id]: e.target.value,
        }))
      }
    />
  ))}
</div>

      </section>

  
      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-end gap-4 mt-6">
        <Button
          variant="outlined"
          onClick={handleReset}
          className="text-mainColor border-mainColor hover:bg-mainColor hover:text-white"
        >
          Reset
        </Button>
        <Button
          type="submit"
          variant="contained"
          className="bg-mainColor hover:bg-blue-600 text-white"
        >
          Submit
        </Button>
      </div>
    </form>
  </>
  
  );
};

export default AddSupplierPage;
