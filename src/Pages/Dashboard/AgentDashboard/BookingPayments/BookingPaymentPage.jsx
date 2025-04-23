import React, { useState, useEffect } from "react";
import { usePost } from "../../../../Hooks/usePostJson";
import { FaCalendar, FaCity, FaHotel, FaListOl, FaMoon, FaPlaneDeparture, FaRoute, FaSearch, FaShapes } from "react-icons/fa";
import { Button, TextField, CircularProgress, Card, CardContent, Typography, Divider } from "@mui/material";
import StaticLoader from '../../../../Components/StaticLoader';
import { FaBus, FaMapMarkerAlt, FaUser, FaCalendarAlt, FaPhone, FaTicketAlt } from "react-icons/fa";
import { FaEnvelope, FaMoneyBillWave, FaWallet, FaGlobe,FaCheck  } from "react-icons/fa";
import {
  Box,
  Paper,
  Grid,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
const BookingPaymentPage = () => {
  const { postData: postSearch, loadingPost: loadingSearch, response: responseSearch } = usePost({
    url: "https://travelta.online/agent/accounting/booking/search",
  });
  const { postData, loadingPost, response } = usePost({url: "https://travelta.online/agent/accounting/booking/payment",});
  const [referenceCode, setReferenceCode] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!loadingSearch && responseSearch) {
      console.log("response Search", responseSearch?.data);
      setData(responseSearch?.data);
    }
  }, [responseSearch, loadingSearch]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!referenceCode) {
      alert("Please Enter Reference Code");
      return;
    }
    const formData = new FormData();
    formData.append("code", referenceCode);

    postSearch(formData, "Searching...");
  };

  const headersPaid = ['SL','Code', 'Date','Amount', 'Finacial Account',"Invoice"];
  const [selectedItems, setSelectedItems] = useState({});
  // State to track selected financial account for each remaining_list item
  const [selectedFinancialAccounts, setSelectedFinancialAccounts] = useState({});

  // Handler for checkbox change
  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => {
      const newSelected = { ...prev };
      if (newSelected[id]) {
        delete newSelected[id];
      } else {
        newSelected[id] = true;
      }
      return newSelected;
    });
  };

  // Handler for dropdown selection change
  const handleAccountChange = (id, value) => {
    setSelectedFinancialAccounts((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Check if at least one item is selected
  const isAnySelected = Object.keys(selectedItems).length > 0;

  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (data?.booking?.id) {
      formData.append("manuel_booking_id", data?.booking?.id);
    }
    const payments = data.remaining_list
      .filter((item) => selectedItems[item.id])
      .map((item) => ({
        date: item.date,
        amount: item.due_payment,
        financial_accounting_id: selectedFinancialAccounts[item.id] || null,
      }));
    // Append the payments array as a JSON string
    formData.append("payments", JSON.stringify(payments));
    postData(formData, "Payment Done");
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="max-w-lg p-4 rounded-lg shadow-md bg-gray-100">
        <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
          <div className="relative w-full">
            <TextField
              label="Reference Code"
              variant="outlined"
              size="small"
              fullWidth
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
              className="pr-12"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
              <FaSearch className="text-gray-500 text-xl" onClick={handleSearch} />
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="px-6 py-2 text-sm"
            disabled={loadingSearch}
          >
            {loadingSearch ? <CircularProgress size={24} color="inherit" /> : "Search"}
          </Button>
        </form>
      </div>


      {data?.booking && (
        data?.booking && (
          <div className="w-full bg-white p-4 rounded-3xl shadow-lg">
            {/* Grouped Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* From Information */}
              <div className="bg-gradient-to-r from-blue-200 to-blue-400 p-4 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold mb-4">Agent Information</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: <FaUser />, label: "Name", value: data.booking.from_name },
                    { icon: <FaEnvelope />, label: "Email", value: data.booking.from_email },
                    { icon: <FaPhone />, label: "Phone", value: data.booking.from_phone },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-white p-2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-white to-transparent rounded-full shadow-lg mr-6 p-2">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{item.label}</h4>
                        <p className="text-gray-600">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Information */}
              <div className="bg-gradient-to-r from-blue-200 to-blue-400 p-4 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold mb-4">Client Information</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: <FaUser />, label: "Client", value: data.booking.to_client },
                    { icon: <FaEnvelope />, label: "Email", value: data.booking.to_email },
                    { icon: <FaPhone />, label: "Phone", value: data.booking.to_phone },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-white p-2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-white to-transparent rounded-full shadow-lg mr-6 p-2">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{item.label}</h4>
                        <p className="text-gray-600">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gradient-to-r from-blue-200 to-blue-400 p-4 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: <FaMoneyBillWave />, label: "Total Payment", value: `${data.total} ${data.currency}` },
                    { icon: <FaWallet />, label: "Due Payment", value: `${data.due_payment} ${data.currency}` },
                    { icon: <FaWallet />, label: "Remaining Payment", value: `${data.remaining_payment} ${data.currency}` },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-white p-2 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-white to-transparent rounded-full shadow-lg mr-6 p-2">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{item.label}</h4>
                        <p className="text-gray-600">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {data?.booking && (
        <div className="w-full bg-fourthColor p-4 rounded-2xl shadow-md">
          {data?.booking?.bus && (
            <>
            <h1 className="w-full font-semibold text-2xl text-center p-4">Bus Details</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              
              {/* Bus Type */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaBus className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Bus Name</h3>
                  <p className="text-gray-600">{data.booking.bus.bus}</p>
                </div>
              </div>

              {/* From - To */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaMapMarkerAlt className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Route</h3>
                  <p className="text-gray-600">{data.booking.bus.from} → {data.booking.bus.to}</p>
                </div>
              </div>

              {/* Departure & Arrival */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaCalendarAlt className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Departure</h3>
                  <p className="text-gray-600">{data.booking.bus.departure}</p>
                </div>
              </div>

              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaCalendarAlt className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Arrival</h3>
                  <p className="text-gray-600">{data.booking.bus.arrival}</p>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaUser className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Passengers</h3>
                  <p className="text-gray-600">Adults: {data.booking.bus.adults}, Children: {data.booking.bus.childreen}</p>
                </div>
              </div>

              {/* Ticket Prices */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaTicketAlt className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Ticket Prices</h3>
                  <p className="text-gray-600">Adult: {data.booking.bus.adult_price}, Child: {data.booking.bus.child_price}</p>
                </div>
              </div>

              {/* Driver Contact */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaPhone className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Driver Contact</h3>
                  <p className="text-gray-600">{data.booking.bus.driver_phone}</p>
                </div>
              </div>
              
            </div>
            </>
          )}
             {data?.booking?.hotel && (
            <>
            <h1 className="w-full font-semibold text-2xl text-center p-4">Hotel Details</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              
              {/* Hotel Type */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaHotel className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Hotel Name</h3>
                  <p className="text-gray-600">{data.booking.hotel.hotel_name}</p>
                </div>
              </div>

           

       

        

              {/* Passenger Details */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaUser className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Passengers</h3>
                  <p className="text-gray-600">Adults: {data.booking.hotel.adults}, Children: {data.booking.hotel.childreen}</p>
                </div>
              </div>


              {/* Quantity */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaListOl className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Room Quantity</h3>
                  <p className="text-gray-600">{data.booking.hotel.room_quantity}</p>
                </div>
              </div>

                  {/* Nights */}
                  <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaMoon className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Hotel Nights</h3>
                  <p className="text-gray-600">{data.booking.hotel.nights}</p>
                </div>
              </div>
              
            </div>
            </>
          )}
         {data?.booking?.tour&& (
            <>
            <h1 className="w-full font-semibold text-2xl text-center p-4">Tour Details</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              
              {/* Bus Type */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaRoute className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Tour Name</h3>
                  <p className="text-gray-600">{data.booking.tour.tour}</p>
                </div>
              </div>



        
              {/* Passenger Details */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaUser className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Passengers</h3>
                  <p className="text-gray-600">Adults: {data.booking.tour.adults}, Children: {data.booking.tour.childreen}</p>
                </div>
              </div>

              {/* Ticket Prices */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaTicketAlt className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Tour Prices</h3>
                  <p className="text-gray-600">Adult: {data.booking.tour.adult_price}, Child: {data.booking.tour.child_price}</p>
                </div>
              </div>

              {/* Driver Contact */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaShapes className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Tour Type</h3>
                  <p className="text-gray-600">{data.booking.tour.type}</p>
                </div>
              </div>
              
            </div>
            </>
          )}

{data?.booking?.flight && (
            <>
            <h1 className="w-full font-semibold text-2xl text-center p-4">Flight Details</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              
              {/* Bus Type */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaBus className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Flight Name</h3>
                  <p className="text-gray-600">{data.booking.flight.class}</p>
                </div>
              </div>

              {/* From - To */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaMapMarkerAlt className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Route</h3>
                  <p className="text-gray-600">{data.booking.flight.from_to[0].from} → {data.booking.flight.from_to[0].to}</p>
                </div>
              </div>

              {/* Departure & Arrival */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaPlaneDeparture className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Departure</h3>
                  <p className="text-gray-600">{data.booking.flight.departure}</p>
                </div>
              </div>

              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaCalendarAlt className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Arrival</h3>
                  <p className="text-gray-600">{data.booking.flight.arrival}</p>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaUser className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Passengers</h3>
                  <p className="text-gray-600">Adults: {data.booking.flight.adults}, Children: {data.booking.flight.childreen}</p>
                </div>
              </div>

              {/* Ticket Prices */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaTicketAlt className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Ticket Prices</h3>
                  <p className="text-gray-600">Adult: {data.booking.flight.adult_price}, Child: {data.booking.flight.child_price}</p>
                </div>
              </div>

              {/* Driver Contact
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaPhone className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Driver Contact</h3>
                  <p className="text-gray-600">{data.booking.bus.driver_phone}</p>
                </div>
              </div> */}
              
            </div>
            </>
          )}

{data?.booking?.visa && (
            <>
            <h1 className="w-full font-semibold text-2xl text-center p-4">Visa Details</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              
       

      

        

      
              {/* Passenger Details */}
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaUser className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Passengers</h3>
                  <p className="text-gray-600">Adults: {data.booking.visa.adults}, Children: {data.booking.visa.childreen}</p>
                </div>
              </div>

                 {/* Note*/}
                 <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaTicketAlt className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Note</h3>
                  <p className="text-gray-600">{data.booking.visa.notes}</p>
                </div>
              </div>

                     {/* country*/}
                     <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaCity className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Country</h3>
                  <p className="text-gray-600">{data.booking.visa.country}</p>
                </div>
              </div>

                        {/* date*/}
                        <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaCalendarAlt className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Appointment Date</h3>
                  <p className="text-gray-600">{data.booking.visa.appointment_date}</p>
                </div>
              </div>



              {/* Driver Contact
              <div className="flex items-center bg-white p-2 rounded-xl shadow">
                <FaPhone className="text-mainColor text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Driver Contact</h3>
                  <p className="text-gray-600">{data.booking.bus.driver_phone}</p>
                </div>
              </div> */}
              
            </div>
            </>
          )}

        </div>
      )}

      {data && 
        <div className="w-full bg-fourthColor rounded-2xl shadow-md p-4 mt-5 flex flex-col gap-5 items-start justify-start overflow-x-scroll scrollSection">
            {loadingSearch ? (
              <div className="w-full h-56 flex justify-center items-center">
                <StaticLoader />
              </div>
            ) : (data?.payments && data?.payments.length > 0) && (
              <>
              <h1 className="w-full font-semibold text-2xl text-center p-2">Payments</h1>
              <table className="w-full sm:min-w-0">
                <thead className="w-full">
                  <tr className="w-full border-b-2">
                    {headersPaid.map((name, index) => (
                      <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="w-full">
                  {data.payments.length === 0 ? (
                    <tr>
                      <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find payments</td>
                    </tr>
                  ) : (
                    data?.payments.map((payment, index) => ( 
                      <tr className="w-full border-b-2" key={index}>
                        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {index + 1}
                        </td>
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {payment?.code|| '-'}
                        </td>
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {payment?.date || '-'}
                        </td>
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {payment?.amount || '-'}
                        </td>
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                          {payment?.financial?.name || '-'}
                        </td>

                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
  {payment?.id ? (
    <Link to={`/dashboard_agent/booking_payments/invoice/${payment?.id}`} className="text-blue-500 underline hover:text-blue-700">
      View
    </Link>
  ) : (
    '-'
  )}
</td>
                        {/* <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        <button
                              type="button"
                            >
                                  <FaUserCircle
                                    className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
                                    onClick={() => navigate(`/dashboard_agent/users/customers/profiles/${customer?.id}`)}
                                  />
                                </button>
                        </td> */}
                      </tr>
                    ))

                  )}
                </tbody>
              </table>
              </>
            )}
        </div>
      }

      {data && data.remaining_list &&
          <div className="w-full flex flex-col gap-3">
          <Typography variant="h5" component="h3" gutterBottom>
            Remaining Payments
          </Typography>

          <div className="w-full flex flex-col gap-2">
            {data.remaining_list.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                  }}
                >
                  {/* Rounded Checkbox */}
                  <Checkbox
                    checked={!!selectedItems[item.id]}
                    onChange={() => handleCheckboxChange(item.id)}
                    sx={{ mr: 2 }}
                  />

                  {/* Payment Details */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" color="text.primary">
                      {item.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Due Payment: {item.due_payment} {data.currency || ""}
                    </Typography>
                  </Box>

                  {/* Dropdown for Financial Accounts */}
                  <FormControl sx={{ minWidth: 220 }} size="small">
                    <InputLabel id={`account-select-label-${item.id}`}>
                      Account
                    </InputLabel>
                    <Select
                      labelId={`account-select-label-${item.id}`}
                      value={selectedFinancialAccounts[item.id] || ""}
                      label="Account"
                      onChange={(e) =>
                        handleAccountChange(item.id, e.target.value)
                      }
                    >
                      <MenuItem value="">
                        <em>Select Account</em>
                      </MenuItem>
                      {data.financial_accounting.map((account) => (
                        <MenuItem key={account.id} value={account.id}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              src={account.logo_link}
                              alt={account.name}
                              sx={{ width: 24, height: 24, mr: 1 }}
                            />
                            <Typography variant="body2">
                              {account.name} ({account.details})
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
            ))}
          </div>

          {/* "Pay" button appears only when at least one item is selected */}
          {isAnySelected && (
            <div className="w-full text-center">
              <Button variant="contained" color="primary" onClick={handleSubmitPayment}>
                Pay
              </Button>
            </div>
          )}
        </div>
      }



      
    </div>
  );
};

export default BookingPaymentPage;
