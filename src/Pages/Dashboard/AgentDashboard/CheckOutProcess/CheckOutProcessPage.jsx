import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { useGet } from '../../../../Hooks/useGet';

const CheckOutProcessPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const location = useLocation(); 
    const cartId = location.state?.cartData;   
    const { refetch: refetchCartData, loading: loadingCartData, data: cartData } = useGet({
            url: `https://travelta.online/agent/manual_booking/${cartId.cart_id}`,
        });

        const [paymentType, setPaymentType] = useState('Full');
        const [serviceDetails, setServiceDetails] = useState({
            serviceName: 'Sample Service',
            servicePrice: 100,
        });
        const [partialPayment, setPartialPayment] = useState({
            initialAmount: '',
            remainingPayments: [{ date: '', amount: '' }],
        });
        const [laterPayments, setLaterPayments] = useState([{ date: '', amount: '' }]);

    useEffect(() => {
        if (cartId) {
            console.log("Cart Data: ", cartId);
            refetchCartData();

            setServiceDetails({
                serviceName: cartId?.serviceName || 'Sample Service',
                servicePrice: cartId?.servicePrice || 100,
            });
        }
    }, [cartData,refetchCartData]);

    const handleNextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); // Move to the next step, max of 3
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1)); // Move to the previous step, min of 1
    };

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
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Step Indicator */}
            <div className="flex items-center justify-between w-full relative">
                {[1, 2, 3].map((step, index) => (
                    <div key={step} className="relative flex items-center justify-center w-full">
                        {/* Line Before Circle */}
                        {index > 0 && (
                            <div
                                className={`absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-1 ${
                                    currentStep >= step ? 'bg-mainColor' : 'bg-[#C6C6C6]'
                                }`}
                                style={{ zIndex: 1 }}
                            ></div>
                        )}

                        {/* Circle */}
                        <div
                            className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                                currentStep === step
                                    ? 'bg-mainColor text-white shadow-lg border-mainColor'
                                    : currentStep > step
                                    ? 'bg-mainColor border-mainColor text-white'
                                    : 'bg-gray-200 border-gray-300 text-gray-500'
                            } border-2`}
                        >
                            {step}
                        </div>

                        {/* Line After Circle */}
                        {index < 2 && (
                            <div
                                className={`absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-1 ${
                                    currentStep > step ? 'bg-mainColor' : 'bg-[#C6C6C6]'
                                }`}
                                style={{ zIndex: 1 }}
                            ></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Step 1: Cart Summary */}
            {currentStep === 1 && (
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
            )}

            {/* Step 2: Payment Type */}
            {currentStep === 2 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Type</h3>
                    <div className="flex space-x-4 mt-2">
                        {['Full', 'Partial', 'Later'].map((type) => (
                            <label key={type} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentType"
                                    value={type}
                                    checked={paymentType === type}
                                    onChange={() => handlePaymentTypeChange(type)}
                                    className="mr-2"
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                    <button
                        onClick={handleNextStep}
                        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && paymentType === 'Full' && (
                <div>
                    <h4 className="text-md font-medium mb-4">Select Payment Method</h4>
                    {/* Add payment method selection here */}
                    <button
                        onClick={handleNextStep}
                        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Confirm
                    </button>
                </div>
            )}

            {/* Partial Payment Details */}
            {currentStep === 3 && paymentType === 'Partial' && (
                <div>
                    <label className="block text-sm font-medium mb-2">Initial Amount</label>
                    <input
                        type="number"
                        name="initialAmount"
                        value={partialPayment.initialAmount}
                        onChange={handlePartialPaymentChange}
                        className="w-full p-2 border rounded mb-4"
                    />
                    <div className="mt-4">
                        <h4 className="text-md font-medium mb-4">Remaining Payments</h4>
                        {partialPayment.remainingPayments.map((payment, index) => (
                            <div key={index} className="flex space-x-4 mt-2">
                                <input
                                    type="date"
                                    name={`date-${index}`}
                                    value={payment.date}
                                    onChange={(e) => handleLaterPaymentChange(index, 'date', e.target.value)}
                                    className="p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    name={`amount-${index}`}
                                    value={payment.amount}
                                    onChange={(e) => handleLaterPaymentChange(index, 'amount', e.target.value)}
                                    className="p-2 border rounded"
                                />
                            </div>
                        ))}
                        <button
                            onClick={handleAddRemainingPayment}
                            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Payment
                        </button>
                    </div>
                    <button
                        onClick={handleNextStep}
                        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Confirm
                    </button>
                </div>
            )}

            {/* Later Payment Details */}
            {currentStep === 3 && paymentType === 'Later' && (
                <div>
                    <h4 className="text-md font-medium mb-4">Payment Schedule</h4>
                    {laterPayments.map((payment, index) => (
                        <div key={index} className="flex space-x-4 mt-2">
                            <input
                                type="date"
                                value={payment.date}
                                onChange={(e) => handleLaterPaymentChange(index, 'date', e.target.value)}
                                className="p-2 border rounded"
                            />
                            <input
                                type="number"
                                value={payment.amount}
                                onChange={(e) => handleLaterPaymentChange(index, 'amount', e.target.value)}
                                className="p-2 border rounded"
                            />
                        </div>
                    ))}
                    <button
                        onClick={handleAddLaterPayment}
                        className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Payment
                    </button>
                    <button
                        onClick={handleNextStep}
                        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Confirm
                    </button>
                </div>
            )}

            {/* Back Button */}
            {currentStep > 1 && (
                <button
                    onClick={handlePreviousStep}
                    className="mt-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Back
                </button>
            )}
        </div>
    );
};

export default CheckOutProcessPage;

