import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { useGet } from '../../../../Hooks/useGet';
import { TextField } from '@mui/material';

const CheckOutProcessPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const location = useLocation(); 
    const cartId = location.state?.cartData;   
    const { refetch: refetchCartData, loading: loadingCartData, data: cartData } = useGet({
            url: `https://travelta.online/agent/manual_booking/cart_data/${cartId.cart_id}`,
        });
    const [cartDetails, setCartDetails] = useState([])
    // const [paymentType, setPaymentType] = useState('');
    // const [amountPaid, setAmountPaid] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0); // Ensure totalPrice is initialized
    // const [paymentDate, setPaymentDate] = ('');
    // const [paymentAmount, setPaymentAmount] =useState(0)
    // const [remainingBalance, setRemainingBalance] = useState(0); // New state for remaining balance
    // const [payments, setPayments] = useState([]); // Store the list of payments made so far

    const [paymentType, setPaymentType] = useState('');
const [amountPaid, setAmountPaid] = useState(0);
const [paymentDate, setPaymentDate] = useState('');  // Correctly initialize with useState
const [paymentAmount, setPaymentAmount] = useState(0);
const [remainingBalance, setRemainingBalance] = useState(0);
const [payments, setPayments] = useState([]); // Store the list of payments made so far

    
    useEffect(() => {
        if (cartId) {
            console.log("Cart Id: ", cartId);
            refetchCartData();
        }
    }, [refetchCartData]); 

    useEffect(() => {
            if (cartData && cartData.data) {
                    console.log("Cart Data:", cartData);
                    setCartDetails(cartData.data);
                    setTotalPrice(cartData.data.total_price); // Set the total price from cart data
            }
    }, [cartData]); 


    // Calculate remaining balance based on payments
    useEffect(() => {
        const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, amountPaid);
        const balance = totalPrice - totalPaid;
        setRemainingBalance(balance > 0 ? balance : 0);
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

    // Handle amount paid input change
    const handleAmountPaidChange = (e) => {
        setAmountPaid(Number(e.target.value) || 0); // Ensure it's a number and defaults to 0 if invalid
    };
 // Get the current date in 'YYYY-MM-DD' format
 const currentDate = new Date().toISOString().split('T')[0];
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
      };
      


    

    








        // const [paymentType, setPaymentType] = useState('Full');
     
        const [partialPayment, setPartialPayment] = useState({
            initialAmount: '',
            remainingPayments: [{ date: '', amount: '' }],
        });
        const [laterPayments, setLaterPayments] = useState([{ date: '', amount: '' }]);

   

    // const handleNextStep = () => {
    //     setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); // Move to the next step, max of 3
    // };

    // const handlePreviousStep = () => {
    //     setCurrentStep((prevStep) => Math.max(prevStep - 1, 1)); // Move to the previous step, min of 1
    // };

    const handlePaymentTypeChange = (type) => {
        setPaymentType(type);
    };

    const handlePartialPaymentChange = (e) => {
        const { name, value } = e.target;
        setPartialPayment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLaterPaymentChange = (index, field, value) => {
        const updatedPayments = [...laterPayments];
        updatedPayments[index][field] = value;
        setLaterPayments(updatedPayments);
    };

    const handleAddRemainingPayment = () => {
        setPartialPayment((prev) => ({
            ...prev,
            remainingPayments: [...prev.remainingPayments, { date: '', amount: '' }],
        }));
    };

    const handleAddLaterPayment = () => {
        setLaterPayments([...laterPayments, { date: '', amount: '' }]);
    };

    return (
        <div className="h-full mx-auto p-6 bg-white rounded-lg shadow-md">
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

            {/* Step 1: Booking Summary */}
            {/* {currentStep === 1 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
                    <p><strong>Service Name:</strong> {serviceDetails.serviceName}</p>
                    <p><strong>Service Price:</strong> ${serviceDetails.servicePrice}</p>
                    <button
                        onClick={handleNextStep}
                        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Next
                    </button>
                </div>
            )} */}

           {/* Step 2: Payment Type */}
{currentStep === 2 && (
    <div>
       <h3 className="text-2xl pl-4 font-semibold text-[#0D47A1] mt-8 ">
    Payment Type
</h3>
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
            <div className="w-6 h-6 rounded-full border-2 border-[#0D47A1] flex items-center justify-center group-hover:border-[#1565C0] transition-all duration-300 ease-in-out">
                <div
                    className={`w-4 h-4 rounded-full bg-[#0D47A1] transform transition-all duration-300 ease-in-out ${
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
                <div className="p-6 bg-white shadow-lg rounded-lg space-y-3">
                    {/* Total Price Display */}
                    <p className="text-xl font-semibold text-center text-[#0D47A1]">
                        Total Price: {totalPrice} EGP
                    </p>     
                </div>
            )}
            {paymentType === 'Partial' && (
                <div className="p-6 bg-white shadow-lg rounded-lg space-y-3">
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
                            onChange={handleAmountPaidChange}
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
                    <div className="p-6 bg-white shadow-lg rounded-lg space-y-3">
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

            {/* Buttons */}
            <div className="flex p-4 pt-0 justify-between">
                {/* Previous Button */}
                {currentStep > 1 && (
                    <button
                    onClick={handlePrevStep}
                    className="bg-white text-[#747474] border border-[#747474] px-6 py-2 rounded-full font-semibold"
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
                    } text-white px-6 py-2 rounded-full font-semibold ml-auto`}
                >
                    {currentStep === 3 ? "Apply" : "Next"} {/* Apply on Step 3, Next on other steps */}
                </button>
            </div>
        
        </div>
    );
};

export default CheckOutProcessPage;

