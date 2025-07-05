import React, { useState ,useEffect} from "react";
import { TextField, Button,Autocomplete,CircularProgress  } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useAuth } from "../../../../../Context/Auth";
import StaticLoader from "../../../../../Components/StaticLoader";

const EditSupplierPage = ({ update, setUpdate }) => {
    const { supplierId } = useParams();
    const { refetch: refetchAllSupplier, loading: loadingAllSupplier, data: allSupplierData } = useGet({url:'https://travelta.online/agent/supplier'});
    const { refetch: refetchSupplierData, loading: loadingSupplierData, data: supplierData } = useGet({ url:`https://travelta.online/agent/supplier/item/${supplierId}`});
    const { postData, loadingPost, response } = usePost({ url:`https://travelta.online/agent/supplier/update/${supplierId}`});
    const [suppliersServices, setSupplierServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [serviceDescriptions, setServiceDescriptions] = useState({});
    
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    // const [alternatePhone, setAlternatePhone] = useState("");
    const [email, setEmail] = useState("")
    const [additionalPhones, setAdditionalPhones] = useState([]);
    const [additionalEmails, setAdditionalEmails] = useState([]);
    const [adminName, setAdminName] = useState("");
    const [adminPhone, setAdminPhone] = useState("");
    const [adminEmail, setAdminEmail] = useState("");  

    useEffect(() => {
      refetchAllSupplier();
      refetchSupplierData();
    }, [refetchAllSupplier, refetchSupplierData]);
    
    useEffect(() => {
      if (allSupplierData?.services) {
        console.log("All Suppliers Data:", allSupplierData);
        setSupplierServices(allSupplierData.services);
      }
    }, [allSupplierData]);
    
    useEffect(() => {
      if (supplierData?.supplier_agent) {
        const supplier = supplierData.supplier_agent;
        console.log('Supplier Data:', supplier);
        
        // Basic info
        setName(supplier.agent || '');
        setPhone(Array.isArray(supplier.phones) ? supplier.phones[0] : supplier.phones || '');
        setEmail(Array.isArray(supplier.emails) ? supplier.emails[0] : supplier.emails || '');
        setAdminName(supplier.admin_name || '');
        setAdminPhone(supplier.admin_phone || '');
        setAdminEmail(supplier.admin_email || '');
        
        // Additional contact info
        setAdditionalPhones(Array.isArray(supplier.phones) ? supplier.phones.slice(1) : []);
        setAdditionalEmails(Array.isArray(supplier.emails) ? supplier.emails.slice(1) : []);
    
        // Handle services
        if (supplier.services && supplier.services.length > 0) {
          // Map the service objects from the supplier
          const services = supplier.services.map(service => ({
            id: service.id,
            service_name: service.service_name || service.description || 'Unnamed Service'
          }));
          
          setSelectedServices(services);
          
          // Initialize descriptions if they exist in the service data
          const initialDescriptions = {};
          supplier.services.forEach(service => {
            if (service?.description) {
              initialDescriptions[service.id] = service.description;
            }
          });
          setServiceDescriptions(initialDescriptions);
        } else {
          setSelectedServices([]);
          setServiceDescriptions({});
        }
      }
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
       useEffect(() => {
          if (!loadingPost && response) {
                setUpdate(!update);
                navigate(-1, { replace: true });
          }
      }, [response]);

      const handleDescriptionChange = (serviceId, description) => {
        setServiceDescriptions((prev) => ({
          ...prev,
          [serviceId]: description,
        }));
      };      

  const handleSubmitSupplier = async (e) => {
        e.preventDefault();
      
        // Validation checks
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
        if (!adminName) {
          auth.toastError('Please Enter Admin Name');
          return;
        }
        if (!adminPhone) {
          auth.toastError('Please Enter Admin Phone');
          return;
        }
        if (!adminEmail) {
          auth.toastError('Please Enter Admin Email');
          return;
        }
        if (!selectedServices || selectedServices.length === 0) {
          auth.toastError('Please Select At Least One Service');
          return;
        }
      
        // Combine all contact information
        const allPhones = [phone, ...additionalPhones.filter(p => p)]; // Filter out empty values
        const allEmails = [email, ...additionalEmails.filter(e => e)]; // Filter out empty values
      
        // Prepare services data with descriptions
        const servicesWithDescriptions = selectedServices.map(service => ({
          id: service.id,
          description: serviceDescriptions[service.id] || '' // Fallback to empty string if no description
        }));
      
        // Create FormData
        const formData = new FormData();
        formData.append('agent', name);
        formData.append('phones', JSON.stringify(allPhones));
        formData.append('emails', JSON.stringify(allEmails));
        formData.append('admin_name', adminName);
        formData.append('admin_phone', adminPhone);
        formData.append('admin_email', adminEmail);
        formData.append('services', JSON.stringify(servicesWithDescriptions)); // Now includes both id and description
    
         postData(formData, 'Supplier Updated Success');
      };

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

  if(loadingAllSupplier || loadingSupplierData || loadingPost){
    return <StaticLoader/>
  }

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
            : [{ id: "", service_name: "No Services Available" }]}
          getOptionLabel={(option) => option.service_name || "No Services Available"}
          value={selectedServices}
          onChange={(event, newValue) => {
            setSelectedServices(newValue);
            // Update descriptions only for selected services
            const updatedDescriptions = {};
            newValue.forEach((service) => {
              updatedDescriptions[service.id] = serviceDescriptions[service.id] || '';
            });
            setServiceDescriptions(updatedDescriptions);
          }}
          loading={loadingAllSupplier}
          disableCloseOnSelect
          className="w-full shadow-md font-mainColor border-mainColor"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Supplier Services"
              variant="outlined"
              fullWidth
              required={selectedServices.length === 0} // Only require if empty
              error={selectedServices.length === 0}
              helperText={selectedServices.length === 0 ? "Please select at least one service" : ""}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingAllSupplier ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          noOptionsText="No services available"
          getOptionDisabled={(option) => option.id === ""} // Disable the "No Services" option
        />

        {/* Description fields for selected services */}
        <div className="space-y-4 mt-4">
          {selectedServices.map((service) => (
            service.id && ( // Only render for valid services
              <TextField
                key={service.id}
                label={`Description for ${service.service_name}`}
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={serviceDescriptions[service.id] || ''}
                onChange={(e) => handleDescriptionChange(service.id, e.target.value)}
                // required
                // error={!serviceDescriptions[service.id]}
                // helperText={!serviceDescriptions[service.id] ? "Please add a description" : ""}
              />
            )
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

export default EditSupplierPage;
