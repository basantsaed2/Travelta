import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Checkbox, FormControlLabel, Switch } from '@mui/material';
import { usePost } from '../../../Hooks/usePostJson';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
const AddPlan = () => {
  // Individual state for each input
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [userLimit, setUserLimit] = useState('');
  const [branchLimit, setBranchLimit] = useState('');
  const [periodInDays, setPeriodInDays] = useState('');
  const [moduleType, setModuleType] = useState('');
  const [price, setPrice] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [adminCost, setAdminCost] = useState('');
  const [branchCost, setBranchCost] = useState('');
  const [type, setType] = useState('');  // Dropdown for type
  const auth = useAuth()
  const { postData, loadingPost, response } = usePost({ url: `https://www.travelta.online/api/super/plan/add` });
  const navigate = useNavigate()
  const handleSwitchChange = (e) => {
    // This function can be used to toggle any switch (if needed)
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate each field separately and show specific error messages
    if (!name) {
      auth.toastError('Name is required.');
      return;
    }
    if (!description) {
      auth.toastError('Description is required.');
      return;
    }
    if (!userLimit) {
      auth.toastError('User Limit is required.');
      return;
    }
    if (!branchLimit) {
      auth.toastError('Branch Limit is required.');
      return;
    }
    if (!periodInDays) {
      auth.toastError('Period (in days) is required.');
      return;
    }
    if (!moduleType) {
      auth.toastError('Module Type is required.');
      return;
    }
    if (!price) {
      auth.toastError('Price is required.');
      return;
    }
    if (!discountType) {
      auth.toastError('Discount Type is required.');
      return;
    }
    if (!discountValue) {
      auth.toastError('Discount Value is required.');
      return;
    }
    if (!adminCost) {
      auth.toastError('Admin Cost is required.');
      return;
    }
    if (!branchCost) {
      auth.toastError('Branch Cost is required.');
      return;
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append the form data to the FormData object
    formData.append('name', name);
    formData.append('description', description);
    formData.append('user_limit', userLimit);
    formData.append('branch_limit', branchLimit);
    formData.append('period_in_days', periodInDays);
    formData.append('module_type', moduleType);
    formData.append('price', price);
    formData.append('discount_type', discountType);
    formData.append('discount_value', discountValue);
    formData.append('admin_cost', adminCost);
    formData.append('branch_cost', branchCost);
    formData.append('type', type); // Set the type (affiliate, freelancer, agency, supplier)

    // Reset the form after submission
    setName('');
    setDescription('');
    setUserLimit('');
    setBranchLimit('');
    setPeriodInDays('');
    setModuleType('');
    setPrice('');
    setDiscountType('');
    setDiscountValue('');
    setAdminCost('');
    setBranchCost('');
    setType(''); // Reset to default

    // Optionally, send the formData to the backend via postData function
    postData(formData,"Plan added successful");
    console.log('data form all' , formData)
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  
useEffect(() => {
        if (!loadingPost) {
            if (response) {
            navigate(-1);
            }
        }
        }, [loadingPost, response, navigate]);
  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
              <div className="flex items-center mb-10">
          <button
                onClick={handleBack}
                className="m-4"
                
              >
                <FaArrowLeft className="text-2xl text-mainColor" />
              </button>
              <h2 className="text-3xl text-center text-mainColor ">Add Plan</h2>
              
      
          </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
          required
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="User Limit"
            value={userLimit}
            onChange={(e) => setUserLimit(e.target.value)}
            fullWidth
            variant="outlined"
            type="number"
            required
            inputProps={{
              min: "0",
    }}
          />

          <TextField
            label="Branch Limit"
            value={branchLimit}
            onChange={(e) => setBranchLimit(e.target.value)}
            fullWidth
            variant="outlined"
            type="number"
            required
            inputProps={{
              min: "0",
    }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Period (in days)"
            value={periodInDays}
            onChange={(e) => setPeriodInDays(e.target.value)}
            fullWidth
            variant="outlined"
            type="number"
            inputProps={{
              min: "0",
    }}
            required
          />

          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            variant="outlined"
            type="number"
            inputProps={{
              min: "0",
    }}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Discount Type"
            select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="percentage">Percentage</MenuItem>
            <MenuItem value="fixed">Fixed</MenuItem>
          </TextField>

          <TextField
            label="Discount Value"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            fullWidth
            variant="outlined"
            type="number"
            required
            inputProps={{
              min: "0",
    }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Module Type"
            select
            value={moduleType}
            onChange={(e) => setModuleType(e.target.value)}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="hrm">Hrm</MenuItem>
            <MenuItem value="crm">Crm</MenuItem>
         
          </TextField>

          <TextField
            label="select type"
            select
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="affiliate">Affiliate</MenuItem>
            <MenuItem value="freelancer">Freelancer</MenuItem>
            <MenuItem value="agency">Agency</MenuItem>
            <MenuItem value="suplier">Supplier</MenuItem>
          </TextField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Admin Cost"
            value={adminCost}
            onChange={(e) => setAdminCost(e.target.value)}
            fullWidth
            variant="outlined"
            type="number"
            inputProps={{
              min: "0",
    }}
            required
          />

          <TextField
            label="Branch Cost"
            value={branchCost}
            onChange={(e) => setBranchCost(e.target.value)}
            fullWidth
            variant="outlined"
            type="number"
            inputProps={{
              min: "0",
    }}
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded"
          >
            Add Plan
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlan;
