import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../../../Context/Auth";
import { useLocation ,useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearCart} from '../../../Redux/CartSlice.js';
import StaticLoader from "../../../Components/StaticLoader.jsx";
import { useGet } from "../../../Hooks/useGet.jsx";
import { TextField, MenuItem, Select, Checkbox, ListItemText, Button } from "@mui/material";
import { FiUpload } from "react-icons/fi"; // Import an upload icon from react-icons
import Logo from "../../../Assets/Images/Logo.jsx";

const CheckoutPage = ({ refetch, setUpdate }) => {

     const { refetch: refetchPaymentMethod, loading: loadingPaymentMethod, data: PaymentMethodData } = useGet({
        url: 'https://travelta.online/agent/payment/payment_methods',
      });
      const [paymentMethods, setPaymentMethods] = useState([]);
        useEffect(() => {
            refetchPaymentMethod();
        }, [refetchPaymentMethod]);

        useEffect(() => {
            if (PaymentMethodData && PaymentMethodData.Payment_Methods) {
            console.log("PaymentMethod Data:", PaymentMethodData);
            setPaymentMethods(PaymentMethodData.Payment_Methods);
            }
        }, [PaymentMethodData]); // Re-run effect when dataPlan or user role changes

        const auth = useAuth();
        const location = useLocation();
        const { cartItems } = location.state || {};
        const { totalPrice } = location.state || {};
        const [isLoading, setIsLoading] = useState(false);
        const [selectedMethod, setSelectedMethod] = useState("");
        const [thumbnails, setThumbnails] = useState("");
        const [thumbnailFile, setThumbnailFile] = useState(null);
        const [discountedPrice, setDiscountedPrice] = useState(totalPrice);
        const [discount, setDiscount] = useState(0); // State to store the discount amount
        const uploadRef = useRef(null);
        const navigate = useNavigate();
        const [showSuccessModal, setShowSuccessModal] = useState(false);
        const dispatch = useDispatch();

        useEffect(() => {
            console.log("cartItems", cartItems);
            console.log("totalPrice", totalPrice);
            console.log("selectedMehod", selectedMethod);
          }, []);


    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleInputClick = () => {
        if (uploadRef.current) {
        uploadRef.current.click();
        }
    };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setThumbnailFile(file);
      setThumbnails(file.name);
    }
  };


  const handleSubmit = async () => {
    if (selectedMethod.name === "Vodafone Cash") {

        if (!thumbnailFile) {
            auth.toastError("Please upload a receipt image.");
            return;
        }
      const formData = new FormData();
      const planIds = cartItems.map(item => item.id); // Create a comma-separated string of IDs
      formData.append("plan_id", planIds); // Append the string to formData
      
      // Append basic data (payment method, amount)
      formData.append("payment_method_id", selectedMethod.id);

        // Append invoice image (file)
        if (thumbnailFile) {
        formData.append("receipt", thumbnailFile);
        }

    for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    } 

    try {
        setIsLoading(true); // Set loading state
        const response = await axios.post(
          "https://travelta.online/agent/payment/make_payment",
          // requestData, 
          formData,
          {
            headers: {
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        );
  
        if (response.status === 200) {
          console.log(response.data);
           // Show success modal
          setShowSuccessModal(true);
          dispatch(clearCart());

          // Set timeout to ensure modal shows before navigation
          setTimeout(() => {
            handleGoBack(); // Optional, if you need to go back
            navigate("/dashboard_user/cart"); // Navigate to the cart page
          }, 3000); // Allow time for modal before navigating
      
        } 
    } catch (error) {
        console.error("Error during order submission:", error);
        // alert("An error occurred while submitting the order.");
    } finally {
    setIsLoading(false); // Reset loading state
    }
    } 
    
  };
  
//   if (!PaymentMethodData) {
//     return (
//       <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">
//        No payment methods data available
//       </div>
//     );
//   }

  return (
    <>
    <div className="w-full flex flex-col h-screen">
    <nav className="bg-mainColor shadow-md px-4 py-2 flex items-center justify-around">
        <div className='flex items-center space-x-4'>
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <Logo />
        </div>
        <span className="text-xl font-semibold text-white">Travelta</span>
        </div>

        {/* Sidebar Toggle Button */}
        <h1 className="text-xl font-semibold text-white">Hello, <span>{auth.user.name}</span></h1>

        </nav>

        {loadingPaymentMethod ? (
              <div className="w-full h-screen flex justify-center items-center">
                <StaticLoader />
              </div>
            ) : (
            <div className="flex flex-col gap-5 p-6 bg-gray-50 rounded-lg shadow-lg h-screen">
      <div className="w-full flex flex-col xl:flex-row-reverse gap-5">
        <div className="bg-white sm-w-full xl:w-1/2 shadow-md p-4 rounded-lg ">
  

      <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
       Order Summary
      </h3>

      <div className="flex justify-between text-lg text-gray-700 mb-3">
        <span className="font-medium">Total Price:</span>
        <span className="font-semibold text-mainColor">{totalPrice} EGP</span>
      </div>

      <div className="flex justify-between text-lg text-gray-700 mb-3">
        <span className="font-medium">Discount:</span>
        <span className="font-semibold text-red-600">{discount} EGP</span>
      </div>

      <div className="flex justify-between text-lg font-bold text-gray-900">
        <span>Total Price After Discount:</span>
        <span className="text-green-600">{discountedPrice} EGP</span>
      </div>
        </div>

      <div className="flex flex-col gap-5 sm-w-full xl:w-1/2">
      <label className="font-semibold text-xl xl:text-3xl text-mainColor">
        Select Payment Method:
      </label>

      {paymentMethods.map((method) => (
  <div
    key={method.id}
    className={`shadow bg-white p-6 w-full ${
      selectedMethod?.id === method.id ? 'border-2 border-green-700' : ''
    }`} // Apply green border if this method is selected
  >
    <label className="text-2xl flex items-center gap-3 cursor-pointer text-mainColor">
      <input
        type="radio"
        name="paymentMethod"
        className="w-6 h-6 border-2 text-mainColor border-mainColor"
        value={method.name}
        onChange={() => setSelectedMethod(method)} // Set the selected method
      />
      {/* <img src={method.thumbnailUrl} alt={method.name} className="w-16" /> */}
      {method.name}
    </label>

    {/* Additional Input for Vodafone Cash */}
    {selectedMethod &&
      selectedMethod.name === 'Vodafone Cash' &&
      method.name === 'Vodafone Cash' && (
        <div className="relative w-full mt-2">
          <input
            type="text"
            className="w-full p-2 border border-green-700 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700"
            value={thumbnails ? thumbnails.name : 'No file selected'}
            readOnly={true}
            onClick={handleInputClick} // Open file input dialog when clicked
            placeholder="Upload Receipt"
          />

          {/* Upload Icon */}
          <FiUpload
            onClick={handleInputClick} // Allow the icon to trigger file selection too
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mainColor cursor-pointer"
          />

          {/* Hidden File Input */}
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            ref={uploadRef}
            accept="image/*" // Optional: restrict to image file types
          />
        </div>
      )}
  </div>
))}


              
      </div>

      </div>
       {/* Submit Button */}
       <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 mt-6 text-xl bg-green-500 text-white font-bold rounded-lg hover:bg-green-700 transition-all ease-in-out duration-300"
          disabled={!selectedMethod}
        >
          Submit Order
          
        </button>
       </div>

        {/* Success Modal */}
        {showSuccessModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 shadow-xl max-w-md mx-auto transition-transform transform scale-95 hover:scale-100">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-green-600 mb-4">
                Order Request Successful!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for your order! We’ll be in touch with you shortly to confirm the details.
              </p>
              <button
                // onClick={() => setShowSuccessModal(false)}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}

            </div>
            )}
    </div>
    </>
  );
};

export default CheckoutPage;
