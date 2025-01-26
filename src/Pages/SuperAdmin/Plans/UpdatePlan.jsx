import React, { useState, useEffect, useLayoutEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { usePost } from '../../../Hooks/usePostJson';
import { useAuth } from '../../../Context/Auth';
import { useGet } from '../../../Hooks/useGet';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import StaticLoader from '../../../Components/StaticLoader';
import axios from 'axios';
const UpdatePlan = () => {
  // Initial state for form fields
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
  const [type, setType] = useState('affiliate');  // Dropdown for type
  const [validPlan, setValidPlan] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const { planId } = location.state;
  const navigate = useNavigate()
  const { postData, loadingPost, response } = usePost({
    url: `https://www.travelta.online/api/super/plan/update/${planId}`,
  });

    const { refetch: refetchPlan, loading: loadingPlan, data: DataPlan } = useGet({
      url: 'https://www.travelta.online/api/super/plans',
    });
  

  
    const [data, setData] = useState({
      affilatePlans: [],
      freelancerPlans: [],
      agencyPlans: [],
      suplierPlans: [],
    });
  
    useEffect(() => {
      refetchPlan();
    }, [refetchPlan]);

 
    useEffect(() => {
      refetchPlan();
    }, [refetchPlan]);
  
    useEffect(() => {
      if (DataPlan) {
        const planCategories = [
          ...(DataPlan.affilatePlans || []),
          ...(DataPlan.freelancerPlans || []),
          ...(DataPlan.agencyPlans || []),
          ...(DataPlan.suplierPlans || []),
        ];
        const plan = planCategories.find((plan) => plan.id === planId);
        console.log("plan",planId)
        if (plan) {
          setValidPlan(true);
          setName(plan.name);
          setDescription(plan.description);
          setUserLimit(plan.user_limit);
          setBranchLimit(plan.branch_limit);
          setPeriodInDays(plan.period_in_days);
          setModuleType(plan.module_type);
          setPrice(plan.price);
          setDiscountType(plan.discount_type);
          setDiscountValue(plan.discount_value);
          setAdminCost(plan.admin_cost);
          setBranchCost(plan.branch_cost);
          setType(plan.type);
        } else {
          setValidPlan(false);
        }
      }
    }, [planId, DataPlan]);
  // Handle form submission
  
  
  const handleSubmit = async (e) => {
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
  
    // Create an object with the updated data
    const updatedData = {
      name,
      description,
      user_limit: userLimit,
      branch_limit: branchLimit,
      period_in_days: periodInDays,
      module_type: moduleType,
      price,
      discount_type: discountType,
      discount_value: discountValue,
      admin_cost: adminCost,
      branch_cost: branchCost,
      type, // Set the type (affiliate, freelancer, agency, supplier)
    };
  
    try {
      // Assuming you're updating a plan with the ID (replace `planId` with your actual ID)
      const response = await axios.put(`https://www.travelta.online/api/super/plan/update/${planId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user?.token || ''}`,
        },
      });
  
      if (response.status === 200) {
        auth.toastSuccess("Plan updated successfully!");
        
        // Reset the form after submission (optional)
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
        setType('affiliate'); // Reset to default
      } else {
        throw new Error("Failed to update plan");
      }
    } catch (error) {
      console.error("Error updating plan:", error);
      auth.toastError("Failed to update plan. Please try again.");
    }
  };
  
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="flex items-center mb-10">
                <button
                      onClick={handleBack}
                      className="m-4"
                      
                    >
                      <FaArrowLeft className="text-mainColor text-2xl" />
                    </button>
                    <h2 className="text-center text-mainColor text-3xl ">Edit Plan</h2>
                    
            
                </div>

                <div className="">

{loadingPlan?  (
        <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
        </div>
) :(  <form onSubmit={handleSubmit} className="space-y-6">
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
          />

          <TextField
            label="Branch Limit"
            value={branchLimit}
            onChange={(e) => setBranchLimit(e.target.value)}
            fullWidth
            variant="outlined"
            type="number"
            required
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
            required
          />

          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            variant="outlined"
            type="number"
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
            label="Type"
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
            required
          />

          <TextField
            label="Branch Cost"
            value={branchCost}
            onChange={(e) => setBranchCost(e.target.value)}
            fullWidth
            variant="outlined"
            type="number"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Update Plan
          </button>
        </div>
      </form>
    
    )}

</div>
    
    </div>
  );
};

export default UpdatePlan;
