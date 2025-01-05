import React, { useEffect, useState } from 'react';
import StaticLoader from '../../../Components/StaticLoader';
import { useGet } from '../../../Hooks/useGet';
import { useAuth } from '../../../Context/Auth';
import { FaShoppingCart ,FaSignOutAlt } from "react-icons/fa";
import { addToCart, removeFromCart } from '../../../Redux/CartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Logo from "../../../Assets/Images/Logo.jsx";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PlanPage = ({ refetch, setUpdate }) => {
  const { refetch: refetchPlan, loading: loadingPlan, data: dataPlan } = useGet({
    url: 'https://travelta.online/agent/plan',
  });
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);  // New state to track selected plan
  const auth = useAuth(); // Assuming this provides user data including the role
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the cart count from Redux store
  const cartItems = useSelector((state) => state.cart);
  const cartCount = cartItems.length ;

  useEffect(() => {
    refetchPlan();
  }, [refetchPlan]);

  useEffect(() => {
    if (dataPlan) {
      console.log("Plan Data:", dataPlan);
      console.log("Auth Role:", auth.user.role);

      // Define an object mapping roles to their respective plan arrays
      const roleToPlans = {
        affiliate: dataPlan.affilatePlans,
        agent: dataPlan.agencyPlans,
        freelancer: dataPlan.freelancerPlans,
        supplier: dataPlan.suplierPlans,
      };

      // Use the role to fetch the corresponding plans
      const userPlans = roleToPlans[auth.user.role] || []; // Default to an empty array if no match

      setPlans(userPlans);
    }
  }, [dataPlan, auth.user.role]); // Re-run effect when dataPlan or user role changes


  const handleAddToCart = async (plan, event) => {
    if (event) event.preventDefault();

    const planWithPeriodAndPrice = {
      ...plan,
      period: plan.period_in_days,
      price: plan.price_after_discount?plan.price_after_discount : plan.price,
  };

  // Update cart based on the selected plan
  if (selectedPlan == plan.id) {
      setSelectedPlan(null);
      dispatch(removeFromCart(planWithPeriodAndPrice));
      localStorage.removeItem('selectedPlanId');
  } else {
      if (selectedPlan !== null) {
          const previousPlan = plans.find((p) => p.id == selectedPlan);
          const previousPlanWithPeriodAndPrice = {
              ...previousPlan,
              period: plan.period_in_days,
              price: plan.price_after_discount ? plan.price_after_discount : plan.price,
          };
          dispatch(removeFromCart(previousPlanWithPeriodAndPrice));
          localStorage.removeItem('selectedPlanId');
      }
      dispatch(addToCart(planWithPeriodAndPrice));
      setSelectedPlan(plan.id);
      localStorage.setItem('selectedPlanId', plan.id);   
  }
  console.log("Selected Plan:", selectedPlan);
};

useEffect(() => {
  const savedPlanId = localStorage.getItem('selectedPlanId');
  if (savedPlanId && plans.length > 0) {
      setSelectedPlan(savedPlanId);
  }
}, [plans]);

const handleLogout = () => {
  auth.logout();
  navigate("/login", { replace: true });
  }


  return (
    <>
      <div className="w-full flex flex-col h-screen">
          {/* <nav className="bg-mainColor shadow-md px-4 py-2 flex items-center justify-around">

          <div className='flex items-center space-x-4'>
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <Logo />
            </div>
            <span className="text-xl font-semibold text-white">Travelta</span>
          </div>

          <h1 className="text-xl font-semibold text-white">Hello, <span>{auth.user.name}</span></h1>

          <div className="relative">
            <Link to="/dashboard/cart">
              <FaShoppingCart className='text-white' size={32} />
              {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                {cartCount}
              </span>
              )}
            </Link>
          </div>
          </nav> */}
           <nav className="bg-mainColor shadow-md px-4 py-2 flex items-center justify-around">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        <Logo />
      </div>
      <span className="text-xl font-semibold text-white">Travelta</span>
    </div>

    {/* Sidebar Toggle Button */}
    <h1 className="text-xl font-semibold text-white">Hello, <span>{auth.user.name}</span></h1>

    <div className="relative">
      <Link to="/dashboard/cart">
        <FaShoppingCart className="text-white" size={32} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
            {cartCount}
          </span>
        )}
      </Link>
    </div>

    {/* Logout Button */}
    <button onClick={handleLogout} className="flex items-center space-x-2 text-white hover:text-gray-300">
      <FaSignOutAlt size={24} />
      <span>Logout</span>
    </button>
  </nav>

          <div className="w-full flex flex-col items-center justify-start p-4 xl:p-12 bg-gray-100">
            <div className="max-w-4xl w-full text-center mb-10">
              <h2 className="text-3xl xl:text-5xl font-extrabold text-gray-800 mb-4">Choose Your Perfect Plan</h2>
              <p className="text-md xl:text-xl text-gray-600">
                Find the plan that fits your business goals and budget. Unlock exclusive features and grow your business with ease.
              </p>
            </div>

            {loadingPlan ? (
              <div className="w-full h-screen flex justify-center items-center">
                <StaticLoader />
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10">
                {plans.length > 0 ? (
                  plans.map((plan, index) => (      
                    <div
                      key={index}
                      className={`bg-white shadow-xl rounded-xl transform hover:scale-90 transition-all duration-700 overflow-hidden relative ${
                        selectedPlan == plan.id ? 'scale-105 border-4 border-indigo-600 shadow-2xl' : ''
                      }`}
                    >
                      <div
                        className={`bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-8 px-6 text-center ${
                          selectedPlan == plan.id ? 'bg-gradient-to-r from-indigo-600 to-blue-500' : ''
                        }`}
                      >
                        <h3 className="text-4xl font-bold mb-3">{plan.name}</h3>
                        <p className="text-lg italic mb-4">{plan.module_type}</p>
                        {plan.discount_value && (
                          <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
                            {`${plan.discount_value}% OFF`}
                          </div>
                        )}
                      </div>
                      <div className="px-4 py-2">
                        <p className="text-lg text-gray-700 mb-6 font-medium">{plan.description}</p>

                        <div className="flex items-center justify-between mb-6">
                          <div className="text-lg font-semibold text-gray-800">
                            {plan.price_after_discount ? (
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500 line-through mr-2">${plan.price}</span>
                                <span className="text-3xl font-bold text-green-600">${plan.price_after_discount}</span>
                              </div>
                            ) : (
                              <span className="text-3xl font-bold text-green-600">${plan.price}</span>
                            )}
                          </div>
                          {plan.discount_value && plan.discount_type === 'fixed' && (
                            <div className="bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-full shadow-lg">
                              {plan.discount_value} Off
                            </div>
                          )}
                        </div>

                        <div className="space-y-2 mb-2">
                          {/* User Limit */}
                          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-md hover:shadow-lg transition-all duration-300">
                            <i className="fas fa-users text-mainColor text-xl"></i>
                            <div className="flex-1">
                              <p className="text-gray-800 text-sm font-semibold inline">{`User Limit:`}</p>
                              <span className="text-lg font-bold text-gray-700 inline ml-2">{plan.user_limit}</span>
                            </div>
                          </div>

                          {/* Branch Limit */}
                          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-md hover:shadow-lg transition-all duration-300">
                            <i className="fas fa-building text-mainColor text-xl"></i>
                            <div className="flex-1">
                              <p className="text-gray-800 text-sm font-semibold inline">{`Branch Limit:`}</p>
                              <span className="text-lg font-bold text-gray-700 inline ml-2">{plan.branch_limit}</span>
                            </div>
                          </div>

                          {/* Period */}
                          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-md hover:shadow-lg transition-all duration-300">
                            <i className="fas fa-calendar-alt text-mainColor text-xl"></i>
                            <div className="flex-1">
                              <p className="text-gray-800 text-sm font-semibold inline">{`Period:`}</p>
                              <span className="text-lg font-bold text-gray-700 inline ml-2">{plan.period_in_days} days</span>
                            </div>
                          </div>

                          {/* Admin Cost */}
                          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-md hover:shadow-lg transition-all duration-300">
                            <i className="fas fa-cogs text-mainColor text-xl"></i>
                            <div className="flex-1">
                              <p className="text-gray-800 text-sm font-semibold inline">{`Admin Cost:`}</p>
                              <span className="text-lg font-bold text-gray-700 inline ml-2">${plan.admin_cost}</span>
                            </div>
                          </div>

                          {/* Branch Cost */}
                          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-md hover:shadow-lg transition-all duration-300">
                            <i className="fas fa-briefcase text-mainColor text-xl"></i>
                            <div className="flex-1">
                              <p className="text-gray-800 text-sm font-semibold inline">{`Branch Cost:`}</p>
                              <span className="text-lg font-bold text-gray-700 inline ml-2">${plan.branch_cost}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-center mt-8 mb-4">
                          {selectedPlan == plan.id ? (
                            <div className="flex justify-center space-x-4">
                              <button
                              onClick={() => handleAddToCart(plan)}
                              className="bg-red-500 text-white px-4 py-2 rounded-full w-full transition duration-300 transform hover:scale-105 hover:bg-opacity-90 text-lg font-semibold shadow-lg"
                              >
                                Remove Plan
                              </button>
                              <Link to="/dashboard/cart" className="bg-blue-500 text-white px-4 py-2 rounded-full w-full transition duration-300 transform hover:scale-105 hover:bg-opacity-90 text-lg font-semibold shadow-lg"                        >
                              <button
                              >
                                Go to Cart
                              </button>
                              </Link>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddToCart(plan)}
                              className="flex items-center justify-center  gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full w-full transition duration-300 transform hover:scale-105 hover:bg-opacity-90 text-lg font-semibold shadow-lg"
                            >
                              <FaShoppingCart />
                              Choose Plan
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xl text-gray-500">No plans available for your role.</p>
                )}
              </div>
            )}
          </div>
      </div>
    </>
  );
};

export default PlanPage;
