import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { useGet } from '../../../../Hooks/useGet';
import { TextField } from '@mui/material';
import StaticLoader from '../../../../Components/StaticLoader';
import { usePost } from "../../../../Hooks/usePostJson";

const CheckOutProcessPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const location = useLocation(); 
    const cartId = location.state?.cartData;   
    const { refetch: refetchCartData, loading: loadingCartData, data: cartData } = useGet({
            url: `https://travelta.online/agent/manual_booking/cart_data/${cartId.cart_id}`,
    });
    const {refetch: refetchPaymentMehod,loading: loadingPaymentMehod,data: paymentMehodData,} = useGet({ url: "https://travelta.online/agent/manual_booking/lists" });
    const { postData, loadingPost, response } = usePost({url:"https://travelta.online/agent/manual_booking",});
    const [cartDetails, setCartDetails] = useState([])
    const [paymentMethod, setPaymentMethod] = useState([])
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentType, setPaymentType] = useState('');
    const [amountPaid, setAmountPaid] = useState(0);
    const [paymentDate, setPaymentDate] = useState('');
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [remainingBalance, setRemainingBalance] = useState(0);
    const [payments, setPayments] = useState([]); 

    // Get the current date in 'YYYY-MM-DD' format
    const currentDate = new Date().toISOString().split('T')[0];
    // Format price to display with currency
    const formatPrice = (price) => `$${parseFloat(price).toFixed(2)}`;
    // Format date
    const formatDate = (date) => new Date(date).toLocaleString();
        
    useEffect(() => {
        if (cartId) {
            console.log("Cart Id: ", cartId);
            refetchCartData();
            refetchPaymentMehod();
        }
    }, [refetchCartData,refetchPaymentMehod]); 

    useEffect(() => {
        if (cartData && cartData.data) {
            console.log("Cart Data:", cartData);
            const total = parseFloat(cartData.data.total_price);
            if (!isNaN(total)) {
                setCartDetails(cartData.data);
                setTotalPrice(total); 
            }
            if (paymentMehodData && paymentMehodData.payment_methods) {
                setPaymentMethod(paymentMehodData.payment_methods);
            }
        }
    }, [cartData, paymentMehodData]);
    
    // Calculate remaining balance based on payments
    useEffect(() => {
        if(totalPrice){
        const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, amountPaid);
        const balance = totalPrice - totalPaid;
        setRemainingBalance(balance > 0 ? balance : 0);
        }
        console.log(payments)
    }, [amountPaid, payments, totalPrice]);

    // Function to handle the addition of a new payment
    const handleAddPayment = () => {
        if (paymentAmount > 0 && paymentDate) {
            const newPayment = { date: paymentDate, amount: paymentAmount };
            setPayments((prevPayments) => [...prevPayments, newPayment]); // Add new payment to the list

            // Calculate the remaining balance after this payment
            const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, amountPaid) + paymentAmount;
            const balance = totalPrice - totalPaid;
            setRemainingBalance(balance > 0 ? balance : 0); // Update remaining balance

            // Reset the payment fields
            setPaymentAmount(0);
            setPaymentDate('');

            // Check if the remaining balance is zero, if not, prompt for another payment
            if (remainingBalance > 0) {
                // Trigger another set of inputs (date and amount) if balance is still > 0
            }
        }
    };   
     // Handle next step (add employee or navigate)
    const handleNextStep = () => {
        if (currentStep < 3) {
          setCurrentStep(currentStep + 1);
        } else {
          const newEmployee = { name, phone, email, role, startDate, image, active: activeStatus };
          employees.push(newEmployee); // Add the new employee to the data array
          localStorage.setItem('employees', JSON.stringify(employees)); // Save to localStorage
          alert("Employee added successfully");
          setShowModel(false);
          resetForm();
        }
    };   
    // Handle previous step
    const handlePrevStep = () => {
        if (currentStep > 1) {
          setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('cart_id', cartId.cart_id);
        formData.append('payment_method_id', selectedPaymentMethod);
        formData.append('total_cart', totalPrice);

        if(paymentType === "Full"){
            formData.append('payment_type', 'full');
            // formData.append('amount', totalPrice);
        }
        else if (paymentType === "Partial"){
            formData.append('payment_type', 'partial');
            formData.append('payments', JSON.stringify(payments));
            formData.append('amount', amountPaid);
        }
        else{
            formData.append('payment_type', 'later');
            formData.append('payments', JSON.stringify(payments));
        }

        postData(formData, "Booking Checkout Added Successfully");

    };
      
    return (
        <div className="w-full overflow-x-scroll scrollSection">
            {loadingCartData && loadingPaymentMehod  ? (
                <div className="w-full h-56 flex justify-center items-center">
                    <StaticLoader />
                </div>
        ) : (
            <div className="h-full p-6 flex flex-col gap-5">
                {/* Step Indicator */}
                <div className="stepper flex fixed items-center justify-between w-full relative">
                    {[1, 2, 3].map((step, index) => {
                        // Define step names
                        const stepNames = ["Preview Booking", "Payment Type", "Payment Method"];
                        return (
                        <div key={step} className="relative flex items-center justify-center w-full">
                            {/* Line Before Circle */}
                            {index > 0 && (
                            <div
                                className={`absolute left-0 right-1/2 top-1/3 -translate-y-1/2 h-1 border-t-2 ${currentStep >= step ? "border-mainColor" : "border-[#CACACA]"} border-dashed`}
                                style={{ zIndex: 1 }}
                            ></div>
                            )}

                            <div className="flex flex-col items-center">
                            {/* Circle */}
                            <div
                                className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${currentStep === step
                                ? "text-white shadow-lg border-mainColor"
                                : currentStep > step
                                ? "bg-mainColor border-mainColor text-white"
                                : "bg-[#747474] border-[#747474] text-[#747474]"
                                } border-2`}
                            >
                                {currentStep === step && (
                                    <div className="w-8 h-8 bg-mainColor rounded-full flex items-center justify-center">
                                    <span className="text-xs text-gray-500"></span>
                                    </div>
                                )}
                            </div>

                            {/* Step Name */}
                            <span className="mt-3 text-mainColor font-semibold text-sm text-center">
                                {stepNames[index]}
                            </span>
                            </div>

                            {/* Line After Circle */}
                            {index < 2 && (
                            <div
                                className={`absolute left-1/2 right-0 top-1/3 -translate-y-1/2 h-1 border-t-2 ${currentStep > step ? "border-mainColor" : "border-[#CACACA]"} border-dashed `}
                                style={{ zIndex: 1 }}
                            ></div>
                            )}
                        </div>
                        );
                    })}
                </div>

                <div className=' bg-white rounded-lg shadow-md'>
                    <div>
                        {/* Step 1: Booking Summary */}
                        {currentStep === 1 && (
                            <div className="p-8 space-y-8">
                                <h2 className="text-3xl font-bold text-[#0D47A1] text-center mb-6">Booking Preview</h2>

                                {/* Cart Details Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Appointment Information Card */}
                                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-2xl font-semibold text-[#0D47A1] mb-4">Appointment Information</h3>
                                    <div className="space-y-3">
                                    <div className="flex items-center">
                                        <i className="fas fa-calendar-day text-[#0D47A1] mr-3"></i>
                                        <p><strong>Appointment Date:</strong> {formatDate(cartDetails.appointment_date)}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-calendar-alt text-[#0D47A1] mr-3"></i>
                                        <p><strong>Travel Date:</strong> {formatDate(cartDetails.travel_date)}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-hashtag text-[#0D47A1] mr-3"></i>
                                        <p><strong>Number:</strong> {cartDetails.number}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-sticky-note text-[#0D47A1] mr-3"></i>
                                        <p><strong>Notes:</strong> {cartDetails.notes}</p>
                                    </div>
                                    </div>
                                </div>

                                {/* Price & Costs Card */}
                                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-2xl font-semibold text-[#0D47A1] mb-4">Price & Costs</h3>
                                    <div className="space-y-3">
                                    <div className="flex items-center">
                                        <i className="fas fa-dollar-sign text-[#0D47A1] mr-3"></i>
                                        <p><strong>Cost:</strong> {formatPrice(cartDetails.cost)}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-tag text-[#0D47A1] mr-3"></i>
                                        <p><strong>Price:</strong> {formatPrice(cartDetails.price)}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-credit-card text-[#0D47A1] mr-3"></i>
                                        <p><strong>Total Price:</strong> {formatPrice(totalPrice)}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-percentage text-[#0D47A1] mr-3"></i>
                                        <p><strong>Mark Up:</strong> {cartDetails.mark_up}% ({cartDetails.mark_up_type})</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-cogs text-[#0D47A1] mr-3"></i>
                                        <p><strong>Tax Type:</strong> {cartDetails.tax_type}</p>
                                    </div>
                                    </div>
                                </div>

                                {/* Customer & Supplier Information Card */}
                                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-2xl font-semibold text-[#0D47A1] mb-4">Customer & Supplier Information</h3>
                                    <div className="space-y-3">
                                    <div className="flex items-center">
                                        <i className="fas fa-users text-[#0D47A1] mr-3"></i>
                                        <p><strong>Customers:</strong> {cartDetails.customers ? JSON.parse(cartDetails.customers).join(", ") : "No customers listed"}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-globe-americas text-[#0D47A1] mr-3"></i>
                                        <p><strong>Country:</strong> {cartDetails.country}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-map-marker-alt text-[#0D47A1] mr-3"></i>
                                        <p><strong>City ID:</strong> {cartDetails.city_id}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-building text-[#0D47A1] mr-3"></i>
                                        <p><strong>From Supplier ID:</strong> {cartDetails.from_supplier_id}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-building text-[#0D47A1] mr-3"></i>
                                        <p><strong>To Supplier ID:</strong> {cartDetails.to_supplier_id}</p>
                                    </div>
                                    </div>
                                </div>
                                </div>

                            
                            </div>
                        )}

                        {/* Step 2: Payment Type */}
                        {currentStep === 2 && (
                            <div className='p-8 space-y-8'>
                                <h2 className="text-3xl font-bold text-[#0D47A1] text-center mb-6">Payment Type</h2>
                                <div className="flex pl-4 pt-0  space-x-3 ">
                                {['Full', 'Partial', 'Later'].map((type) => (
                                    <label key={type} className="cursor-pointer flex  items-center space-y-2 group">
                                        <input
                                            type="radio"
                                            name="paymentType"
                                            value={type}
                                            checked={paymentType === type}
                                            onChange={() => setPaymentType(type)}
                                            className="hidden"
                                        />
                                        <div className="w-5 h-5 rounded-full border-2 border-[#0D47A1] flex items-center justify-center group-hover:border-[#1565C0] transition-all duration-300 ease-in-out">
                                            <div
                                                className={`w-3 h-3 rounded-full bg-[#0D47A1] transform transition-all duration-300 ease-in-out ${
                                                    paymentType === type ? 'scale-100' : 'scale-0'
                                                }`}
                                            ></div>
                                        </div>
                                        <span className="text-xl ml-1 font-semibold text-gray-700 group-hover:text-[#0D47A1] transition-all duration-300 ease-in-out">
                                            {type}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {paymentType === 'Full' && (
                                <div className="p-6 space-y-3">
                                    {/* Total Price Display */}
                                    <p className="text-xl font-semibold text-center text-[#0D47A1]">
                                        Total Price: {totalPrice} EGP
                                    </p>     
                                </div>
                            )}
                            {paymentType === 'Partial' && (
                                <div className="p-6 space-y-3">
                                    {/* Section Title */}
                                    <h2 className="text-xl md:text-2xl font-semibold text-center text-[#0D47A1]">Partial Payment</h2>

                                    {/* Initial Amount Paid */}
                                    <div className="space-y-3">
                                        <label className="block text-lg font-medium text-gray-700">
                                            Enter Initial Amount Paid:
                                        </label>
                                        <TextField
                                            label="Initial Amount"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            type="number"
                                            value={amountPaid}
                                            onChange={(e) => setAmountPaid(Number(e.target.value) || 0)}
                                            className="w-full border border-[#0D47A1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] transition duration-300"
                                        />
                                    </div>

                                    {/* Remaining Balance */}
                                    <p className="text-xl font-bold text-[#0D47A1] text-center ">
                                        Remaining Balance: <span className="text-gray-800">{remainingBalance} EGP</span>
                                    </p>

                                    <div className='flex flex-col lg:flex-row gap-5'>
                                    {/* If there is remaining balance, show payment date and amount fields */}
                                    {remainingBalance > 0 && (
                                        <div className="w-full md:w-1/2 bg-[#E3F2FD] p-4 rounded-lg shadow-sm space-y-3">
                                            <div className="space-y-2">
                                                <label className="block text-lg font-medium text-gray-700">
                                                    Enter Payment Date:
                                                </label>
                                                <TextField
                                                    label="Initial Amount"
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                    InputLabelProps={{ shrink: true }}
                                                    type="date"
                                                    value={paymentDate}
                                                    onChange={(e) => setPaymentDate(e.target.value)}
                                                    inputProps={{ min: currentDate }}
                                                    className="w-full border border-[#0D47A1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] transition duration-300"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-lg font-medium text-gray-700">
                                                    Enter Payment Amount:
                                                </label>
                                                <TextField
                                                    label="Initial Amount"
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                    type="number"
                                                    value={paymentAmount}
                                                    onChange={(e) => setPaymentAmount(Number(e.target.value) || 0)}
                                                    className="w-full border border-[#0D47A1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] transition duration-300"
                                                />
                                            </div>

                                            {/* Add Payment Button */}
                                            <div className="mt-6">
                                                <button
                                                    onClick={handleAddPayment}
                                                    className="w-full px-2 py-4 font-semibold bg-[#0D47A1] text-white rounded-lg hover:bg-[#1565C0] focus:outline-none focus:ring-4 focus:ring-[#0D47A1] transition duration-300"
                                                >
                                                    Add Payment
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Show added payments dynamically */}
                                    {payments.length > 0 && (
                                        <div className="w-full md:w-1/2  bg-[#E3F2FD] p-6 rounded-lg shadow-sm ">
                                            <h4 className="text-2xl font-semibold text-[#0D47A1] mb-4">Payments Made:</h4>
                                            <ul className="space-y-3">
                                                {payments.map((payment, index) => (
                                                    <li key={index} className="text-lg text-gray-800 flex justify-between items-center">
                                                        <span className="font-medium">{payment.date}:</span>
                                                        <span className="text-[#0D47A1]">{payment.amount} EGP</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    </div>
                                </div>
                            )}
                            {paymentType === 'Later' && (
                                    <div className="p-6 space-y-3">
                                        {/* Section Title */}
                                        <h2 className="text-xl md:text-2xl font-semibold text-center text-[#0D47A1]">Later Payment</h2>

                                        {/* Remaining Balance */}
                                        <p className="text-xl font-bold text-[#0D47A1] text-center">
                                            Remaining Balance: <span className="text-gray-800">{remainingBalance} EGP</span>
                                        </p>

                                        <div className="flex flex-col lg:flex-row gap-5">
                                            {/* If there is remaining balance, show payment date and amount fields */}
                                            {remainingBalance > 0 && (
                                                <div className="w-full md:w-1/2 bg-[#E3F2FD] p-4 rounded-lg shadow-sm space-y-3">
                                                    <div className="space-y-2">
                                                        <label className="block text-lg font-medium text-gray-700">
                                                            Enter Payment Date:
                                                        </label>
                                                        <TextField
                                                            label="Payment Date"
                                                            variant="outlined"
                                                            fullWidth
                                                            required
                                                            InputLabelProps={{ shrink: true }}
                                                            type="date"
                                                            value={paymentDate}
                                                            onChange={(e) => setPaymentDate(e.target.value)}
                                                            inputProps={{ min: currentDate }}
                                                            className="w-full border border-[#0D47A1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] transition duration-300"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="block text-lg font-medium text-gray-700">
                                                            Enter Payment Amount:
                                                        </label>
                                                        <TextField
                                                            label="Payment Amount"
                                                            variant="outlined"
                                                            fullWidth
                                                            required
                                                            type="number"
                                                            value={paymentAmount}
                                                            onChange={(e) => setPaymentAmount(Number(e.target.value) || 0)}
                                                            className="w-full border border-[#0D47A1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] transition duration-300"
                                                        />
                                                    </div>

                                                    {/* Add Payment Button */}
                                                    <div className="mt-6">
                                                        <button
                                                            onClick={handleAddPayment}
                                                            className="w-full px-2 py-4 font-semibold bg-[#0D47A1] text-white rounded-lg hover:bg-[#1565C0] focus:outline-none focus:ring-4 focus:ring-[#0D47A1] transition duration-300"
                                                        >
                                                            Add Payment
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Show added payments dynamically */}
                                            {payments.length > 0 && (
                                                <div className="w-full md:w-1/2 bg-[#E3F2FD] p-6 rounded-lg shadow-sm">
                                                    <h4 className="text-2xl font-semibold text-[#0D47A1] mb-4">Payments Made:</h4>
                                                    <ul className="space-y-3">
                                                        {payments.map((payment, index) => (
                                                            <li key={index} className="text-lg text-gray-800 flex justify-between items-center">
                                                                <span className="font-medium">{payment.date}:</span>
                                                                <span className="text-[#0D47A1]">{payment.amount} EGP</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                            )}

                            </div>
                        )}
                        {/* Step 3: Payment Method */}
                        {currentStep === 3 && (
                        <div className="p-6 space-y-6">
                        <h2 className="text-3xl font-bold text-[#0D47A1] text-center mb-6">Select Payment Method</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paymentMethod.map((method, index) => (
                            <div
                                key={index}
                                className="cursor-pointer border-2 border-[#0D47A1] p-6 rounded-lg flex flex-col items-center justify-center bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                onClick={() => setSelectedPaymentMethod(method.id)} // Handle payment method selection
                            >
                                <img
                                src={method.image_link} // Ensure your API returns a correct URL for the image
                                alt={method.name}
                                className="w-24 h-24 mb-4 object-contain"
                                />
                                <span className="text-xl font-semibold text-[#0D47A1]">{method.name}</span>
                            </div>
                            ))}
                        </div>
                        </div>
                        
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex p-4 justify-between">
                        {/* Previous Button */}
                        {currentStep > 1 && (
                            <button
                            onClick={handlePrevStep}
                            className="bg-white text-[#747474] border border-[#747474] px-8 py-2 rounded-full font-semibold"
                            disabled={currentStep === 1}
                            >
                            Back
                            </button>
                        )}

                        {/* Next / Apply Button */}
                        <button
                            onClick={currentStep === 3 ? handleSubmit : handleNextStep} // Conditional to call submit on Step 3
                            className={`${
                            currentStep === 3 ? 'bg-mainColor' : 'bg-mainColor'
                            } text-white px-8 py-2 rounded-full font-semibold ml-auto`}
                        >
                            {currentStep === 3 ? "Apply" : "Next"} {/* Apply on Step 3, Next on other steps */}
                        </button>
                    </div>

                </div>
            
            </div>
        )}
        </div>
    );
};

export default CheckOutProcessPage;

