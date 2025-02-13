import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { useGet } from '../../../../Hooks/useGet';
import { TextField } from '@mui/material';
import StaticLoader from '../../../../Components/StaticLoader';
import { usePost } from "../../../../Hooks/usePostJson";
import InvoicePage from '../../../../Components/Agent Components/InvoicePage';

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
    const [finalPrice, setFinalPrice] = useState(0); 

    // Get the current date in 'YYYY-MM-DD' format
    const currentDate = new Date().toISOString().split('T')[0];
    // Format price to display with currency
    const formatPrice = (price) => `$${parseFloat(price).toFixed(2)}`;
    // Format date
    const formatDate = (date) => new Date(date).toLocaleString();
        

//     useEffect(() => {
//     if(!loadingPost){
// return <InvoicePage bookingData={}/>
//     }
//     }, [loadingPost,response])

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
            if (paymentMehodData && paymentMehodData.financial_accounting) {
                setPaymentMethod(paymentMehodData.financial_accounting);
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

    useEffect(() => {
        if (paymentType === 'Full') {
            setFinalPrice(totalPrice);
        } else if (paymentType === 'Partial') {
            setFinalPrice(amountPaid);
        } 
        // else if (type === 'Later') {
        //     setFinalPrice(totalPrice);
        // }
    },[paymentType,totalPrice,amountPaid])

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
        }
        //  else {
        //   const newEmployee = { name, phone, email, role, startDate, image, active: activeStatus };
        //   employees.push(newEmployee); // Add the new employee to the data array
        //   localStorage.setItem('employees', JSON.stringify(employees)); // Save to localStorage
        //   alert("Employee added successfully");
        //   setShowModel(false);
        //   resetForm();
        // }
    };   
    // Handle previous step
    const handlePrevStep = () => {
        if (currentStep > 1) {
          setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (remainingAmount !== 0) {
            alert("Please complete the payment before proceeding.");
            return;
        }
        const formData = new FormData();
        formData.append('cart_id', cartId.cart_id);
        // formData.append('payment_method_id', selectedPaymentMethod);
        formData.append('total_cart', totalPrice);

        if(paymentType === "Full"){
            formData.append('payment_type', 'full');
            formData.append("payment_methods", JSON.stringify(selectedPaymentMethods.map((method) => ({
                payment_method_id: method.id,
                amount: method.amount,
              }))));
        }
        else if (paymentType === "Partial"){
            formData.append('payment_type', 'partial');
            formData.append('payments', JSON.stringify(payments));
            // formData.append('amount', amountPaid);
            formData.append("payment_methods", JSON.stringify(selectedPaymentMethods.map((method) => ({
                payment_method_id: method.id,
                amount: method.amount,
              }))));
        }
        else{
            formData.append('payment_type', 'later');
            formData.append('payments', JSON.stringify(payments));
        }

        postData(formData, "Booking Checkout Added Successfully");

    };

    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
    const [remainingAmount, setRemainingAmount] = useState(finalPrice);
    
    const handleSelectMethod = (method) => {
        if (!selectedPaymentMethods.some((item) => item.id === method.id)) {
          // When selecting a method, add it with an initial amount of 0
          const newSelected = [...selectedPaymentMethods, { ...method, amount: 0 }];
          setSelectedPaymentMethods(newSelected);
          // Optionally, update remainingAmount here if needed
        } else {
          // When unselecting, remove the method and update the remaining amount
          const updatedMethods = selectedPaymentMethods.filter((item) => item.id !== method.id);
          const totalAssigned = updatedMethods.reduce((sum, item) => sum + item.amount, 0);
          setSelectedPaymentMethods(updatedMethods);
          setRemainingAmount(finalPrice - totalAssigned);
        }
      };
    const handleAmountChange = (id, value) => {
      const amount = parseFloat(value) || 0;
      const updatedMethods = selectedPaymentMethods.map((item) =>
        item.id === id ? { ...item, amount } : item
      );
    
      const totalAssigned = updatedMethods.reduce((sum, item) => sum + item.amount, 0);
    
      if (totalAssigned <= finalPrice) {
        setSelectedPaymentMethods(updatedMethods);
        setRemainingAmount(finalPrice - totalAssigned);
      }
    };
    
    const handlePayment = () => {
      if (remainingAmount === 0) {
        console.log("Payment processed", selectedPaymentMethods);
        // Proceed with API request
      }
    };
    

      
    return (
        <div className="w-full overflow-x-scroll scrollSection">
            {loadingCartData && loadingPaymentMehod  ? (
                <div className="w-full h-56 flex justify-center items-center">
                    <StaticLoader />
                </div>
        ) : (
            <div className="h-full p-3 xl:p-6 flex flex-col gap-5">
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
                            <div className="p-4 xl:p-8 space-y-8">
                                <h2 className="text-3xl font-bold text-[#0D47A1] text-center mb-6">Booking Preview</h2>

                                {/* Cart Details Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                
                                {/* Service-specific Details */}
                                {cartDetails.from_service === "Visa" && (
                                    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-2xl font-semibold text-[#0D47A1] mb-4">Visa Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                        <i className="fas fa-passport text-[#0D47A1] mr-3"></i>
                                        <p><strong>Visa Country:</strong> {cartDetails.visa.country_visa}</p>
                                        </div>
                                        <div className="flex items-center">
                                        <i className="fas fa-calendar-day text-[#0D47A1] mr-3"></i>
                                        <p><strong>Appointment Date:</strong> {formatDate(cartDetails.visa.appointment_date)}</p>
                                        </div>
                                        <div className="flex items-center">
                                        <i className="fas fa-calendar-alt text-[#0D47A1] mr-3"></i>
                                        <p><strong>Travel Date:</strong> {formatDate(cartDetails.visa.travel_date)}</p>
                                        </div>
                                        <div className="flex items-center">
                                        <i className="fas fa-child text-[#0D47A1] mr-3"></i>
                                        <p><strong>Number of Children:</strong> {cartDetails.visa.children_data.length}</p>
                                        </div>
                                        <div className="flex items-center">
                                        <i className="fas fa-users text-[#0D47A1] mr-3"></i>
                                        <p><strong>Number of Adults:</strong> {cartDetails.visa.adults_data.length}</p>
                                        </div>
                                        <div className="flex items-center">
                                        <i className="fas fa-sticky-note text-[#0D47A1] mr-3"></i>
                                        <p><strong>Notes:</strong> {cartDetails.visa.notes}</p>
                                        </div>
                                    </div>
                                    </div>
                                )}
                                {cartDetails.from_service === "Flight" && (
                                    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <h3 className="text-2xl font-semibold text-[#0D47A1] mb-4">Flight Details</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <i className="fas fa-plane-departure text-[#0D47A1] mr-3"></i>
                                                <p><strong>Airline:</strong> {cartDetails.flight.airline}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-calendar-day text-[#0D47A1] mr-3"></i>
                                                <p><strong>Departure Date:</strong> {formatDate(cartDetails.flight.departure)}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-calendar-alt text-[#0D47A1] mr-3"></i>
                                                <p><strong>Arrival Date:</strong> {cartDetails.flight.arrival ? formatDate(cartDetails.flight.arrival) : "TBD"}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-map-marker-alt text-[#0D47A1] mr-3"></i>
                                                <p><strong>From/To:</strong> {cartDetails.flight.from_to[0].from} to {cartDetails.flight.from_to[0].to}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-users text-[#0D47A1] mr-3"></i>
                                                <p><strong>Number of Adults:</strong> {cartDetails.flight.adults_data.length}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-child text-[#0D47A1] mr-3"></i>
                                                <p><strong>Number of Children:</strong> {cartDetails.flight.children_data.length}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-baby text-[#0D47A1] mr-3"></i>
                                                <p><strong>Number of Infants:</strong> {cartDetails.flight.infants}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-ticket-alt text-[#0D47A1] mr-3"></i>
                                                <p><strong>Ticket Number:</strong> {cartDetails.flight.ticket_number}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-sticky-note text-[#0D47A1] mr-3"></i>
                                                <p><strong>Notes:</strong> {cartDetails.flight.notes || "No additional notes"}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {cartDetails.from_service === "Hotel" && (
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-2xl font-semibold text-[#0D47A1] mb-4">Hotel Details</h3>
                                    <div className="space-y-3">
                                    <div className="flex items-center">
                                        <i className="fas fa-hotel text-[#0D47A1] mr-3"></i>
                                        <p><strong>Hotel Name:</strong> {cartDetails.hotel.hotel_name}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-calendar-day text-[#0D47A1] mr-3"></i>
                                        <p><strong>Check-in Date:</strong> {formatDate(cartDetails.hotel.check_in)}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-calendar-alt text-[#0D47A1] mr-3"></i>
                                        <p><strong>Check-out Date:</strong> {formatDate(cartDetails.hotel.check_out)}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-moon text-[#0D47A1] mr-3"></i>
                                        <p><strong>Nights:</strong> {cartDetails.hotel.nights}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-bed text-[#0D47A1] mr-3"></i>
                                        <p><strong>Room Type:</strong> {cartDetails.hotel.room_type}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-door-closed text-[#0D47A1] mr-3"></i>
                                        <p><strong>Room Quantity:</strong> {cartDetails.hotel.room_quantity}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-users text-[#0D47A1] mr-3"></i>
                                        <p><strong>Number of Adults:</strong> {cartDetails.hotel.adults}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-child text-[#0D47A1] mr-3"></i>
                                        <p><strong>Number of Children:</strong> {cartDetails.hotel.childreen}</p>
                                    </div>
                                    </div>
                                </div>
                                )}
                                {cartDetails.from_service === "Bus" && (
                                    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <h3 className="text-2xl font-semibold text-[#0D47A1] mb-4">Bus Details</h3>
                                        <div className="space-y-3">
                                        <div className="flex items-center">
                                            <i className="fas fa-map-marker-alt text-[#0D47A1] mr-3"></i>
                                            <p><strong>From:</strong> {cartDetails.bus.from}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <i className="fas fa-map-marker-alt text-[#0D47A1] mr-3"></i>
                                            <p><strong>To:</strong> {cartDetails.bus.to}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <i className="fas fa-calendar-day text-[#0D47A1] mr-3"></i>
                                            <p><strong>Departure Date:</strong> {formatDate(cartDetails.bus.departure)}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <i className="fas fa-calendar-alt text-[#0D47A1] mr-3"></i>
                                            <p><strong>Arrival Date:</strong> {formatDate(cartDetails.bus.arrival)}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <i className="fas fa-bus text-[#0D47A1] mr-3"></i>
                                            <p><strong>Bus Service:</strong> {cartDetails.bus.bus}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <i className="fas fa-list-ol text-[#0D47A1] mr-3"></i>
                                            <p><strong>Bus Number:</strong> {cartDetails.bus_number}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <i className="fas fa-phone text-[#0D47A1] mr-3"></i>
                                            <p><strong>Driver Contact:</strong> {cartDetails.bus.driver_phone}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <i className="fas fa-users text-[#0D47A1] mr-3"></i>
                                            <p><strong>Adults:</strong> {cartDetails.bus.adults_data.length}</p>
                                        </div>
                                        {cartDetails.bus.adults_data.map((adult, index) => (
                                            <div key={index} className="flex items-center ml-6">
                                            <i className="fas fa-user text-[#0D47A1] mr-3"></i>
                                            <p>{adult.title} {adult.first_name} {adult.last_name}</p>
                                            </div>
                                        ))}
                                        <div className="flex items-center">
                                            <i className="fas fa-child text-[#0D47A1] mr-3"></i>
                                            <p><strong>Children:</strong> {cartDetails.bus.children_data.length}</p>
                                        </div>
                                        </div>
                                    </div>
                                )}
                                {cartDetails.from_service === "Tour" && (
                                    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <h3 className="text-2xl font-semibold text-[#0D47A1] mb-4">Tour Details</h3>
                                        <div className="space-y-3">
                                        <div className="flex items-center">
                                            <i className="fas fa-globe text-[#0D47A1] mr-3"></i>
                                            <p><strong>Tour Name:</strong> {cartDetails.tour.tour}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <i className="fas fa-plane text-[#0D47A1] mr-3"></i>
                                            <p><strong>Flight Date:</strong> {cartDetails.tour.flight_date ? formatDate(cartDetails.flight_date) : "No flight included"}</p>
                                        </div>
                                        
                                        {/* Transportation Details */}
                                        <h4 className="text-lg font-semibold text-[#0D47A1] mt-4">Transportation</h4>
                                        {cartDetails.tour.tour_buses.map((bus, index) => (
                                            <div key={index} className="flex items-center ml-4">
                                            <i className={`fas ${bus.transportation === "bus" ? "fa-bus" : "fa-plane"} text-[#0D47A1] mr-3`}></i>
                                            <p><strong>{bus.transportation.charAt(0).toUpperCase() + bus.transportation.slice(1)}:</strong> {bus.seats} seats</p>
                                            </div>
                                        ))}

                                        {/* Hotel Details */}
                                        <h4 className="text-lg font-semibold text-[#0D47A1] mt-4">Hotel Details</h4>
                                        {cartDetails.tour.tour_hotels.map((hotel, index) => (
                                            <div key={index} className="space-y-2 ml-4">
                                            <div className="flex items-center">
                                                <i className="fas fa-hotel text-[#0D47A1] mr-3"></i>
                                                <p><strong>Hotel:</strong> {hotel.hotel_name}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-map-marker-alt text-[#0D47A1] mr-3"></i>
                                                <p><strong>Destination:</strong> {hotel.destination}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-door-closed text-[#0D47A1] mr-3"></i>
                                                <p><strong>Room Type:</strong> {hotel.room_type}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-moon text-[#0D47A1] mr-3"></i>
                                                <p><strong>Nights:</strong> {hotel.nights}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-calendar-check text-[#0D47A1] mr-3"></i>
                                                <p><strong>Check-in:</strong> {formatDate(hotel.check_in)}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <i className="fas fa-calendar-times text-[#0D47A1] mr-3"></i>
                                                <p><strong>Check-out:</strong> {formatDate(hotel.check_out)}</p>
                                            </div>
                                            </div>
                                        ))}

                                        {/* Travelers */}
                                        <h4 className="text-lg font-semibold text-[#0D47A1] mt-4">Travelers</h4>
                                        <div className="flex items-center">
                                            <i className="fas fa-users text-[#0D47A1] mr-3"></i>
                                            <p><strong>Adults:</strong> {cartDetails.tour.adults_data.length}</p>
                                        </div>
                                        {cartDetails.tour.adults_data.map((adult, index) => (
                                            <div key={index} className="flex items-center ml-6">
                                            <i className="fas fa-user text-[#0D47A1] mr-3"></i>
                                            <p>{adult.title} {adult.first_name} {adult.last_name}</p>
                                            </div>
                                        ))}
                                        <div className="flex items-center">
                                            <i className="fas fa-child text-[#0D47A1] mr-3"></i>
                                            <p><strong>Children:</strong> {cartDetails.tour.children_data.length}</p>
                                        </div>
                                        </div>
                                    </div>
                                )}


                                {/* Price & Costs Card */}
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-2xl font-semibold text-[#0D47A1] mb-4">Price & Costs</h3>
                                    <div className="space-y-3">
                                    <div className="flex items-center">
                                        <i className="fas fa-dollar-sign text-[#0D47A1] mr-3"></i>
                                        <p><strong>Currency:</strong> {cartDetails.currency}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-dollar-sign text-[#0D47A1] mr-3"></i>
                                        <p><strong>Cost:</strong> {formatPrice(cartDetails.cost)}</p>
                                    </div>

                                    {/* Mark-Up Handling */}
                                    <div className="flex items-center">
                                        <i className="fas fa-percentage text-[#0D47A1] mr-3"></i>
                                        {cartDetails.mark_up_type === "value" ? (
                                        <p><strong>Mark Up:</strong> {formatPrice(cartDetails.mark_up)} ({cartDetails.mark_up_type})</p>
                                        ) : (
                                        <p><strong>Mark Up:</strong> {cartDetails.mark_up}%</p>
                                        )}
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-tag text-[#0D47A1] mr-3"></i>
                                        <p><strong>Price:</strong> {formatPrice(cartDetails.price)}</p>
                                    </div>

                                    <div className="flex items-center">
                                        <i className="fas fa-cogs text-[#0D47A1] mr-3"></i>
                                        <p><strong>Tax Type:</strong> {cartDetails.tax_type}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-credit-card text-[#0D47A1] mr-3"></i>
                                        <p><strong>Total Price:</strong> {formatPrice(cartDetails.total_price)}</p>
                                    </div>
                                    </div>
                                </div>

                                {/* Customer & Supplier Information Card */}
                                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-2xl font-semibold text-[#0D47A1] mb-4">Customer & Supplier Information</h3>
                                    <div className="space-y-3">
                                    <div className="flex items-center">
                                        <i className="fas fa-users text-[#0D47A1] mr-3"></i>
                                        <p><strong>Supplier:</strong> {cartDetails.from_supplier}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-globe-americas text-[#0D47A1] mr-3"></i>
                                        <p><strong>Country:</strong> {cartDetails.country}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-map-marker-alt text-[#0D47A1] mr-3"></i>
                                        <p><strong>City:</strong> {cartDetails.city}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-building text-[#0D47A1] mr-3"></i>
                                        <p><strong>To Client:</strong> {cartDetails.to_client}</p>
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
                            {/* Partial Payment */}
                            {paymentType === 'Partial' && (
                                <div className="p-6 space-y-3">
                                    <h2 className="text-xl md:text-2xl font-semibold text-center text-[#0D47A1]">Partial Payment</h2>
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
                                    <p className="text-xl font-bold text-[#0D47A1] text-center">
                                        Remaining Balance: <span className="text-gray-800">{remainingBalance} EGP</span>
                                    </p>
                                    <div className="flex flex-col lg:flex-row gap-5">
                                        {remainingBalance > 0 && (
                                            <div className="w-full md:w-1/2 bg-[#E3F2FD] p-4 rounded-lg shadow-sm space-y-3">
                                                {/* Payment date and amount fields */}
                                                <div className="space-y-2">
                                                    <label className="block text-lg font-medium text-gray-700">Enter Payment Date:</label>
                                                    <TextField
                                                        label="Payment Date"
                                                        variant="outlined"
                                                        fullWidth
                                                        required
                                                        type="date"
                                                        InputLabelProps={{ shrink: true }}
                                                        value={paymentDate}
                                                        onChange={(e) => setPaymentDate(e.target.value)}
                                                        inputProps={{ min: currentDate }}
                                                        className="w-full border border-[#0D47A1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] transition duration-300"
                                                    />
                                                </div>

                                                {/* <div className="space-y-2">
                                                    <label className="block text-lg font-medium text-gray-700">Enter Payment Amount:</label>
                                                    <TextField
                                                        label="Payment Amount"
                                                        variant="outlined"
                                                        fullWidth
                                                        required
                                                        type="number"
                                                        min="1"
                                                        max={remainingBalance + (paymentAmount || 0)}
                                                        value={paymentAmount || ''}
                                                        onChange={(e) => setPaymentAmount(Number(e.target.value) || 0)}
                                                        className="w-full border border-[#0D47A1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] transition duration-300"
                                                    />
                                                </div> */}
                                                <TextField
                                                    label="Payment Amount"
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                    type="number"
                                                    min="1"
                                                    max={remainingBalance} // Directly set max to remainingBalance
                                                    value={paymentAmount || ''}
                                                    onChange={(e) => {
                                                        let value = Number(e.target.value) || 0;
                                                        if (value > remainingBalance) value = remainingBalance; // Prevent exceeding balance
                                                        setPaymentAmount(value);
                                                    }}
                                                    className="w-full border border-[#0D47A1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D47A1] transition duration-300"
                                                />          
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
                                        {/* Show added payments */}
                                        {payments.length > 0 && (
                                            <div className="w-full md:w-1/2  bg-[#E3F2FD] p-6 rounded-lg shadow-sm">
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
                                                            max={remainingBalance} // Directly set max to remainingBalance
                                                                value={paymentAmount || ''}
                                                                onChange={(e) => {
                                                                    let value = Number(e.target.value) || 0;
                                                                    if (value > remainingBalance) value = remainingBalance; // Prevent exceeding balance
                                                                    setPaymentAmount(value);
                                                                }}
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
{currentStep === 3 && (
  <div className="p-6 space-y-6">
    <h2 className="text-3xl font-bold text-[#0D47A1] text-center mb-6">
      Select Payment Method
    </h2>

    {/* Total Price & Remaining Amount */}
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-gray-700">Total: ${finalPrice}</h3>
      <h3 className="text-xl font-semibold text-[#D32F2F]">
        Remaining: ${remainingAmount}
      </h3>
    </div>

    {/* Payment Methods List with Checkboxes and Amount Input */}
    <div className="space-y-4">
      {paymentMethod.map((method, index) => {
        // Get the selected method object (if exists) to retrieve its updated amount
        const selectedMethod = selectedPaymentMethods.find(item => item.id === method.id);
        return (
          <label
            key={index}
            className="flex flex-col md:flex-row gap-4 p-4 border-2 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <div className='flex items-center gap-4'>
            <input
              type="checkbox"
              name="paymentMethod"
              className="w-5 h-5 accent-[#0D47A1]"
              checked={selectedPaymentMethods.some((item) => item.id === method.id)}
              onChange={() => handleSelectMethod(method)}
            />
            <img
              src={method.image_link}
              alt={method.name}
              className="w-12 h-12 object-contain"
            />
            <span className="text-lg font-semibold text-[#0D47A1]">{method.name}</span>
            </div>
            <div className='flex items-center gap-4'>
            {/* Amount Input for selected payment methods */}
            {selectedPaymentMethods.some((item) => item.id === method.id) && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 text-sm">Amount:</span>
                <input
                  type="number"
                  min="1"
                  // Use the updated amount from the selectedMethod object.
                  max={remainingAmount + (selectedMethod ? selectedMethod.amount : 0)}
                  value={selectedMethod ? selectedMethod.amount : ""}
                  onChange={(e) => handleAmountChange(method.id, e.target.value)}
                  className="w-28 p-2 border border-mainColor rounded-lg text-center text-gray-700 font-semibold focus:ring focus:ring-blue-300 outline-none"
                />
              </div>
            )}
            </div>
          </label>
        );
      })}
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

                        {/* <button
                        onClick={currentStep === 3 || paymentType === 'Later'? handleSubmit : handleNextStep}
                        className={`text-white px-8 py-2 rounded-full font-semibold ml-auto ${
                            remainingAmount === 0 || remainingBalance ===0 ? "bg-[#0D47A1] hover:bg-[#08357C]" : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={remainingAmount !== 0 || remainingBalance !== 0} // Disabled if remainingAmount is not 0
                        >
                        {currentStep === 3  || paymentType === 'Later' ? "Apply" : "Next"}
                        </button> */}
                        <button
                                onClick={currentStep === 3 || paymentType === 'Later' ? handleSubmit : handleNextStep}
                                className={`text-white px-8 py-2 rounded-full font-semibold ml-auto ${
                                    (currentStep === 3 || paymentType === 'Later') 
                                        ? (remainingAmount === 0 ? "bg-[#0D47A1] hover:bg-[#08357C]" : "bg-gray-400 cursor-not-allowed")
                                        : (remainingAmount === 0 ? "bg-[#0D47A1] hover:bg-[#08357C]" : "bg-gray-400 cursor-not-allowed")
                                }`}
                                disabled={remainingAmount !== 0} // Disabled if remainingAmount is not 0

                                // disabled={(currentStep === 3 || paymentType === 'Later') ? remainingBalance !== 0 : remainingAmount !== 0}
                            >
                                {currentStep === 3 || paymentType === 'Later' ? "Apply" : "Next"}
                        </button>


                    </div>

                </div>
            
            </div>
        )}
        </div>
    );
};

export default CheckOutProcessPage;

