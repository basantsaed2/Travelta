import React, { useEffect, useState } from "react";
import { useGet } from "../../../Hooks/useGet";
import { useDelete } from "../../../Hooks/useDelete";
import StaticLoader from "../../../Components/StaticLoader";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { FaUser, FaBuilding, FaTag, FaMoneyBillWave, FaPercent, FaBalanceScale } from "react-icons/fa"; // Import specific icons
import { MdOutlineDiscount } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
const Plans = () => {
  const navigate = useNavigate();
  const { refetch: refetchPlan, loading: loadingPlan, data: DataPlan } = useGet({
    url: "https://www.travelta.online/api/super/plans",
  });

  const { deleteData, loadingDelete } = useDelete();

  const [data, setData] = useState({
    affilatePlans: [],
    freelancerPlans: [],
    agencyPlans: [],
    suplierPlans: [],
  });

  const [selectedCategory, setSelectedCategory] = useState("affilatePlans");

  useEffect(() => {
    refetchPlan();
  }, [refetchPlan]);

  useEffect(() => {
    if (DataPlan) {
      setData({
        affilatePlans: DataPlan.affilatePlans || [],
        freelancerPlans: DataPlan.freelancerPlans || [],
        agencyPlans: DataPlan.agencyPlans || [],
        suplierPlans: DataPlan.suplierPlans || [],
      });
    }
  }, [DataPlan]);

  const deletePlan = async (type, id, name) => {
    try {
      const success = await deleteData(
        `https://www.travelta.online/api/super/plan/delete/${id}`,
        `${name} Deleted Successfully.`
      );

      if (success) {
        setData((prevData) => ({
          ...prevData,
          [type]: prevData[type].filter((plan) => plan.id !== id),
        }));
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const handleUpdate = (planId) => {
    navigate(`/super_admin/plans/update/${planId}`, { state: { planId } });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-4">Compare Plans</h2>
      <p className="text-lg text-center mb-8">
        Choose your workspace plan according to your organizational needs.
      </p>

      {/* Dropdown to select plan category */}
          {/* Dropdown with MUI */}
          <FormControl fullWidth className="mb-6">
       
        <Select
          labelId="plan-category-label"
          id="planCategory"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full"
        >
          <MenuItem value="affilatePlans">Affiliate Plans</MenuItem>
          <MenuItem value="freelancerPlans">Freelancer Plans</MenuItem>
          <MenuItem value="agencyPlans">Agency Plans</MenuItem>
          <MenuItem value="suplierPlans">Supplier Plans</MenuItem>
        </Select>
      </FormControl>

      {loadingPlan ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
<div
  className="grid grid-cols-1 gap-3 mt-7 
    sm:grid-cols-1 
    md:grid-cols-3 
    lg:grid-cols-3"
>
        {data[selectedCategory].map((plan) => (
          <div
            key={plan.id}
            className=" shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow border border-blue-200 w-full max-w-sm mx-auto"
          >
            <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">{plan.name}</h3>
            <p className="text-gray-600 mb-6 text-sm text-center">{plan.description}</p>
      
            <ul className="text-3sm text-gray-800 space-y-3">
              <li className="flex items-center">
                <FaUser className="text-blue-600 mr-2" /> <strong>User Limit:</strong> {plan.user_limit}
              </li>
              <li className="flex items-center">
                <FaBuilding className="text-blue-600 mr-2" /> <strong>Branch Limit:</strong> {plan.branch_limit}
              </li>
              <li className="flex items-center">
                <FaMoneyBillWave className="text-blue-600 mr-2" /> <strong>Price:</strong> ${plan.price}
              </li>
              <li className="flex items-center">
                <FaTag className="text-blue-600 mr-2" /> <strong>Price After Discount:</strong> ${plan.price_after_discount}
              </li>
              <li className="flex items-center">
                <FaBalanceScale className="text-blue-600 mr-2" /> <strong>Admin Cost:</strong> ${plan.admin_cost}
              </li>
              <li className="flex items-center">
                <FaBuilding className="text-blue-600 mr-2" /> <strong>Branch Cost:</strong> ${plan.branch_cost}
              </li>
              <li className="flex items-center">
                <MdOutlineDiscount className="text-blue-600 mr-2" /> <strong>Discount Type:</strong> {plan.discount_type || "N/A"}
              </li>
              <li className="flex items-center">
                <FaPercent className="text-blue-600 mr-2" /> <strong>Discount Value:</strong> {plan.discount_value || "N/A"}
              </li>
            </ul>
      
            <div className="mt-6 flex gap-5  items-start">
              {/* Update Button */}
              <button
                onClick={() => handleUpdate(plan.id)}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center"
              >
                <FaEdit className="mr-2" /> Update
              </button>
      
              {/* Delete Button */}
              <button
                onClick={() => deletePlan(selectedCategory, plan.id, plan.name)}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center"
              >
                <FaTrashAlt className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      
      )}
    </div>
  );
};

export default Plans;
