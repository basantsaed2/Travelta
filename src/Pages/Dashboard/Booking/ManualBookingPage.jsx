import React, { useState, useEffect} from "react";
import {TextField,MenuItem,Switch,Button,Checkbox,Autocomplete,CircularProgress} from "@mui/material";
import { useGet } from "../../../Hooks/useGet";
import { usePost } from "../../../Hooks/usePostJson";
import { useAuth } from "../../../Context/Auth";
import { AddSupplierPage } from "../../AllPages";
import { AddLeadPage } from "../../AllPages";
import { Link, useNavigate } from 'react-router-dom';
import VisaServicePage from "./Services/VisaServicePage";
import FlightServicePage from "./Services/FlightServicePage";
import HotelServicePage from "./Services/HotelServicePage";
import BusServicePage from "./Services/BusServicePage";
import TourServicePage from "./Services/TourServicePage";
const ManualBooking = () => {
  const {refetch: refetchBookingList,loading: loadingBookingList,data: bookingListData,} = useGet({ url: "https://travelta.online/agent/manual_booking/lists" });
  const {refetch: refetchSuppliers,loading: loadingSuppliers,data: suppliersData,} = useGet({url: "https://travelta.online/agent/manual_booking/supplier_customer",});
  const { postData, loadingPost, response } = usePost({url: "https://travelta.online/agent/manual_booking/cart",});
  const [selectedService, setSelectedService] = useState(""); // Selected service
  const {postData:postCustomerServices,loading:loadingPostCustomerServices,response:responseCustomerServicesData,} = usePost({url:`https://travelta.online/agent/manual_booking/service_supplier`});
  const [selectedCountry, setSelectedCountry] = useState(""); // Selected service
  const {postData: postTaxes,loading: loadingPostTaxes,response:responseTaxesData,} = usePost({url:`https://travelta.online/agent/manual_booking/taxes`});
  const auth = useAuth();
  const navigate = useNavigate();   

  const [showPopup, setShowPopup] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [secondMenuData, setSecondMenuData] = useState([]); // Data for the second dropdown
  const [category, setCategory] = useState(""); // To track B2B or B2C
  const [selectedToSupplier, setSelectedToSupplier] = useState(null); // To track the selected supplier or customer
  const [bookingList, setBookingList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [title, setTitle] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [visibleSection, setVisibleSection] = useState("");
  const [details, setDetails] = useState({
    flight: false,
    bus: false,
    visa: false,
    hotel: false,
    tour: false,
  });

  // From Data
    const [services, setServices] = useState([]);
    const [customerServices, setCustomerServices] = useState([]);
    const [selectedFromSupplier, setSelectedFromSupplier] = useState("");
    const [cost, setCost] = useState(""); 
    const [price, setPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(""); 
    const [isMarkupPercentage, setIsMarkupPercentage] = useState(1); // 1 for %, 0 for $
    const [markupValue, setMarkupValue] = useState(""); // 1 for %, 0 for $
    const [selectedTaxType, setSelectedTaxType] = useState("");
    const [selectedTaxAmount, setSelectedTaxAmount] = useState("");
    const taxesType = [
      { value: "include", label: "Include Tax" },
      { value: "exclude", label: "Exclude Tax" },
    ];
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState([]);
    const [taxes, setTaxes] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedTaxId, setSelectedTaxId] = useState([]);
    const [specialRequest, setSpecialRequest] = useState("");
    const [agents, setAgents] = useState([]);
    const [selectAgent, setSelectAgent] = useState('');

  // Visa state declarations
    const [visaCountry, setVisaCountry] = useState("");
    const [visaTravelDate, setVisaTravelDate] = useState("");
    const [visaAppointmentDate, setVisaAppointmentDate] = useState("");
    const [visaAdultsNumber, setVisaAdultsNumber] = useState('');
    const [visaChildrenNumber, setVisaChildrenNumber] = useState('');
    const [visaAdults, setVisaAdults] = useState([]);
    const [visaChildren, setVisaChildren] = useState([]);
    const [visaNotes, setVisaNotes] = useState("");

  // To track the flight details
    const flightType = [
      { value: "domestic", label: "Domestic" },
      { value: "international", label: "International" },
    ];
    const flightDirection = [
      { value: "one_way", label: "one Way" },
      { value: "round_trip", label: "Return Trip" },
      { value: "multi_city", label: "Multi City" },
    ];
    const [selectedFlightType, setSelectedFlightType] = useState("");
    const [selectedFlightDirection, setSelectedFlightDirection] = useState("");
    const [flightDeparture, setFlightDeparture] = useState("");
    const [flightArrival, setFlightArrival] = useState("");
    const [multiCityFlights, setMultiCityFlights] = useState([{ from: "", to: "" }]);
    const [flightChildrenNumber, setFlightChildrenNumber] = useState("");
    const [flightAdultsNumber, setFlightAdultsNumber] = useState("");
    const [flightAdults, setFlightAdults] = useState([]);
    const [flightChildren, setFlightChildren] = useState([]);
    const [flightInfants, setFlightInfants] = useState("");
    const [flightAdultPrice, setFlightAdultPrice] = useState("");
    const [flightChildPrice, setFlightChildPrice] = useState("");
    const [flightClass, setFlightClass] = useState("");
    const [flightAirline, setFlightAirline] = useState("");
    const [flightTicketNumber, setFlightTicketNumber] = useState("");
    const [flightRefPNR, setFlightRefPNR] = useState("");

  // To track the hotel details
    const [hotelName, setHotelName] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [totalNights, setTotalNights] = useState("");
    const [roomType, setRoomType] = useState("");
    const [roomQuantity, setRoomQuantity] = useState("");
    const [adultsHotelNumber, setAdultsHotelNumber] = useState('');
    const [childrenHotelNumber, setChildrenHotelNumber] = useState('');
    const [roomTypes, setRoomTypes] = useState([]); 
    const [hotelAdults, setHotelAdults] = useState([]);
    const [hotelChildren, setHotelChildren] = useState([]);

  // To track the bus details
    const [busFrom, setBusFrom] = useState("");
    const [busTo, setBusTo] = useState("");
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [busAdultsNumber, setBusAdultsNumber] = useState('');
    const [busChildrenNumber, setBusChildrenNumber] = useState('');
    const [adultPrice, setAdultPrice] = useState("");
    const [childPrice, setChildPrice] = useState("");
    const [busName, setBusName] = useState("");
    const [busNumber, setBusNumber] = useState("");
    const [driverPhone, setDriverPhone] = useState("");
    const [busAdults, setBusAdults] = useState([]);
    const [busChildren, setBusChildren] = useState([]);

  //To track the tour details
    const [tour, setTour] = useState("");
    const tourType = [
      { value: "domestic", label: "Domestic" },
      { value: "international", label: "International" },
    ];
    const [selectedTourType, setSelectedTourType] = useState("");
    // const [tourChildren, setTourChildren] = useState("");
    // const [tourAdults, setTourAdults] = useState("");
    const [tourAdultPrice, setTourAdultPrice] = useState("");
    const [tourChildPrice, setTourChildPrice] = useState("");
    const [transportationDeparture, setTransportationDeparture] = useState("");
    const [tourChildrenNumber, setTourChildrenNumber] = useState('');
    const [tourAdultsNumber, setTourAdultsNumber] = useState('');
    const [tourAdults, setTourAdults] = useState([]);
    const [tourChildren, setTourChildren] = useState([]);
    const [buses, setBuses] = useState([{ transportation: "", seats: "" }]);
    const [hotels, setHotels] = useState([
      {
        destination: "",
        hotel_name: "",
        room_type: "",
        check_in: "",
        check_out: "",
        nights: "",
      },
    ]);

    const today = new Date().toISOString().slice(0, 10);

    // Update the second dropdown based on the selected category
    useEffect(() => {
      if (category === "B2B") {
        setSecondMenuData(suppliers);
      } else if (category === "B2C") {
        setSecondMenuData(customers);
      } else {
        setSecondMenuData([]);
      }
    }, [category, suppliers, customers]);

    useEffect(() => {
      refetchBookingList();
      refetchSuppliers();
    }, [refetchBookingList, refetchSuppliers, update]);
  
    useEffect(() => {
      if (bookingListData && suppliersData) {
        console.log("Booking List Data:", bookingListData);
        console.log("Suppliers Data:", suppliersData);
        setServices(bookingListData.services);
        setCountries(bookingListData.contries);
        setCities(bookingListData.cities);
        setCurrencies(bookingListData.currencies);
        setTitle(bookingListData.adult_title);
        setSuppliers(suppliersData.suppliers);
        setCustomers(suppliersData.customers);
        setAgents(bookingListData.employees);
      }
    }, [bookingListData, suppliersData]); // Only run this effect when `data` changes
  
    useEffect(() => {
      if (selectedService) {
        setSelectedFromSupplier(null);
        postCustomerServices({ service_id: selectedService.id });
      } else {
        setCustomerServices([]); // Clear customer services if no service is selected
      }
    }, [selectedService,update]);
  
    useEffect(() => {
      if (selectedCountry) {
        postTaxes({ country_id: selectedCountry});
      } else {
        setTaxes([]); // Clear customer services if no service is selected
      }
    }, [selectedCountry]);
  
    useEffect(() => {
      if (selectedService && !loadingPostCustomerServices) {
        console.log("Response Data Supplier service:", responseCustomerServicesData.data?.supplier);
        if (responseCustomerServicesData.data?.supplier) {
          setCustomerServices(responseCustomerServicesData.data?.supplier); // Update the customers list
        }
      }
    }, [responseCustomerServicesData]); // Runs when data or loading state changes
  
    useEffect(() => {
      if (selectedCountry && !loadingPostTaxes) {
        console.log("Response Data Country Taxes:", responseTaxesData.data.taxes);
        if (responseTaxesData?.data?.taxes) {
          setTaxes(responseTaxesData?.data?.taxes); // Update the customers list
        }
        else{
          setTaxes([])
        }
      }
    }, [responseTaxesData]); // Runs when data or loading state changes
  
    useEffect(() => {
      // Parse cost and markupValue as floats, fallback to 0 if not set
      const parsedCost = parseFloat(cost || 0);
      const parsedMarkupValue = parseFloat(markupValue || 0);
  
      // Check if isMarkupPercentage is 1, treat markupValue as percentage
      const calculatedMarkupValue = isMarkupPercentage === 1
        ? (parsedMarkupValue / 100) * parsedCost // Calculate percentage of the cost
        : parsedMarkupValue; // Use markupValue directly if it's not a percentage
  
      const calculatedPrice = parsedCost + calculatedMarkupValue;
  
      // Calculate total tax amount
      let totalTaxAmount = 0;
  
      selectedTaxId.forEach((id) => {
        const tax = taxes?.find((tax) => tax.id === id); // Find tax object by ID
        if (tax) {
          if (tax.type === "precentage") {
            totalTaxAmount += (parseFloat(tax.amount) / 100) * parsedCost; // Apply percentage tax to calculated price
          } else if (tax.type === "value") {
            totalTaxAmount += parseFloat(tax.amount || 0); // Add fixed value tax
          }
        }
      });
      
      const calculatedTotalPrice = calculatedPrice + totalTaxAmount;    
  
      // Update the state with calculated values
      setPrice(calculatedPrice.toFixed(2));
      setTotalPrice(calculatedTotalPrice.toFixed(2));
    }, [cost, markupValue, selectedTaxId, isMarkupPercentage, taxes]);
  
    useEffect(() => {
      if (!loadingPost && response && response.data) {
        console.log('Response Submit:', response);
        navigate('/dashboard_agent/checkOut_process', { state: { cartData: response.data } });
      }
    }, [response, loadingPost, navigate]);

    // This function will toggle the section visibility
    const toggleSection = (section) => {
      setVisibleSection(visibleSection === section ? "" : section);
    };
    const handleSwitchChange = () => {
      setIsMarkupPercentage((prev) => (prev === 1 ? 0 : 1)); // Toggle between 1 and 0
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create FormData object to append the form data
    const formData = new FormData();
    console.log('from_supplier_id:', selectedFromSupplier);
    // Append form fields to FormData
    formData.append("from_supplier_id", selectedFromSupplier.id);
    formData.append("from_service_id", selectedService.id);
    if (isMarkupPercentage === 1) {
      formData.append("mark_up_type", "precentage");
    } else {
      formData.append("mark_up_type", "value");
    }
    formData.append("mark_up", markupValue);
    formData.append("price", price);
    formData.append("country_id", selectedCountry);
    // formData.append("city_id", ' ');
    formData.append("taxes", JSON.stringify(selectedTaxId));
    formData.append("tax_type", selectedTaxType);
    formData.append("currency_id", selectedCurrency.id);
    formData.append("cost", cost);
    formData.append("total_price", totalPrice);
    // Append To fields to FormData
    if (category === "B2B") {
      formData.append("to_supplier_id", selectedToSupplier.id);
    } else if (category === "B2C") {
      formData.append("to_customer_id", selectedToSupplier.id);
    }
    formData.append("special_request", '');
    formData.append("agent_sales_id", selectAgent.id);

    // Append Hotal fields to FormData
    if (selectedService.service_name === "Hotel") {
      formData.append("hotel_name", hotelName);
      formData.append("check_in", checkInDate);
      formData.append("check_out", checkOutDate);
      formData.append("nights", totalNights);
      formData.append("room_type", roomTypes);
      formData.append("room_quantity", roomQuantity);
      formData.append("adults", adultsHotelNumber);
      formData.append("childreen", childrenHotelNumber);

      // Prepare adult data for Hotel
      const adults_data = hotelAdults.map((adult) => ({
        title: adult.title,
        first_name: adult.firstName,
        last_name: adult.lastName,
      }));

      // Prepare children data for Hotel
      const children_data = hotelChildren.map((child) => ({
        age: child.age,
        first_name: child.firstName,
        last_name: child.lastName,
      }));

      // Append adults and children data for Hotel
      formData.append("adults_data", JSON.stringify(adults_data));
      formData.append("children_data", JSON.stringify(children_data));
    }
    else if (selectedService?.service_name === "Visa") {
      formData.append("country", visaCountry);
      formData.append("travel_date", visaTravelDate);
      formData.append("appointment_date", visaAppointmentDate);
      formData.append("notes", visaNotes);
      formData.append("childreen", visaChildrenNumber);
      formData.append("adults", visaAdultsNumber);
      const adults_data = visaAdults.map((adult) => ({
          title: adult.selectedTitle,
          first_name: adult.firstName,
          last_name: adult.lastName,
      }));
      const children_data = visaChildren.map((child) => ({
          age: child.age,
          first_name: child.firstName,
          last_name: child.lastName,
      }));
      formData.append("adults_data", JSON.stringify(adults_data));
      formData.append("children_data", JSON.stringify(children_data));
    }
    // Append Flight fields to FormData 
    else if (selectedService.service_name === 'Flight') {
      formData.append("type", selectedFlightType);
      formData.append("departure", flightDeparture);
      formData.append("direction", selectedFlightDirection);
      formData.append("childreen", flightChildrenNumber);
      formData.append("adults", flightAdultsNumber);
      formData.append("infants", flightInfants);
      formData.append("adult_price", flightAdultPrice);
      formData.append("child_price", flightChildPrice);
      formData.append("class", flightClass);
      formData.append("airline", flightAirline);
      formData.append("ticket_number", flightTicketNumber);
      formData.append("ref_pnr", flightRefPNR);

      const adults_data = flightAdults.map((adult) => ({
        title: adult.selectedTitle,
        first_name: adult.firstName,
        last_name: adult.lastName,
      }));
      const children_data = flightChildren.map((child) => ({
        age: child.age,
        first_name: child.firstName,
        last_name: child.lastName,
      }));
      formData.append("adults_data", JSON.stringify(adults_data));
      formData.append("children_data", JSON.stringify(children_data));

      if (selectedFlightDirection === "round_trip" || selectedFlightDirection === "multi_city") {
        formData.append("arrival", flightArrival);
      }
      const formattedFlights = JSON.stringify(
        multiCityFlights.map((flight) => ({
          from: flight.from,
          to: flight.to,
        }))
      );
      formData.append("from_to", formattedFlights);
    }
    // Append Bus fields to FormData
    else if (selectedService.service_name === "Bus") {
      formData.append("from", busFrom);
      formData.append("to", busTo);
      formData.append("departure", departure);
      formData.append("arrival", arrival);
      formData.append("adults", busAdultsNumber);
      formData.append("childreen", busChildrenNumber);
      formData.append("child_price", childPrice);
      formData.append("adult_price", adultPrice);
      formData.append("bus", busName);
      formData.append("bus_number", busNumber);
      formData.append("driver_phone", driverPhone);

      // Prepare adult data for Bus
      const adults_data = busAdults.map((adult) => ({
        title: adult.selectedTitle,
        first_name: adult.firstName,
        last_name: adult.lastName,
      }));

      // Prepare children data for Bus
      const children_data = busChildren.map((child) => ({
        age: child.age,
        first_name: child.firstName,
        last_name: child.lastName,
      }));

      // Append adults and children data for Bus
      formData.append("adults_data", JSON.stringify(adults_data));
      formData.append("children_data", JSON.stringify(children_data));
    }
    // Append Tour fields to FormData
    else if (selectedService.service_name === "Tour") {
      formData.append("tour", tour);
      formData.append("type", selectedTourType);
      formData.append('departure', transportationDeparture);
      formData.append("adult_price", tourAdultPrice);
      formData.append("child_price", tourChildPrice);
      formData.append('childreen', tourChildrenNumber);
      formData.append('adults', tourAdultsNumber);

      // formData.append("adults", tourAdults);
      // formData.append("childreen", tourChildren);

      const formattedBuses = JSON.stringify(
        buses.map((bus) => ({
          transportation: bus.transportation,
          seats: bus.seats,
          departure:bus.transportationDeparture,
        }))
      );
      const adults_data = tourAdults.map((adult) => ({
        title: adult.selectedTitle,
        first_name: adult.firstName,
        last_name: adult.lastName,
      }));

      // Prepare children_data
      const children_data = tourChildren.map((child) => ({
        age: child.age,
        first_name: child.firstName,
        last_name: child.lastName,
      }));
      formData.append("adults_data", JSON.stringify(adults_data));
      formData.append("children_data", JSON.stringify(children_data));


      formData.append("tour_buses", formattedBuses);
      // Format and append tour_hotels as a JSON string
      const formattedHotels = JSON.stringify(
        hotels.map((hotel) => ({
          destination: hotel.destination,
          hotel_name: hotel.hotel_name,
          room_type: hotel.room_type,
          check_in: hotel.check_in,
          check_out: hotel.check_out,
          nights: hotel.nights,
        }))
      );
      formData.append("tour_hotels", formattedHotels);
    }
    // Call the postData function to send the data to the backend
    postData(formData, "Booking Added Successfully");
  };
  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg w-full p-4 lg:p-8">
        {/* <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Manual Booking</h1> */}
        {/* To Section */}
        <button
          type="button"
          onClick={() => toggleSection("to")}
          className="w-full text-left px-4 py-2 bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 mb-4"
        >
          To
        </button>
        {visibleSection === "to" && (
          <>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 p-4 bg-gray-50 rounded-xl shadow-md">
           {/* First Dropdown for Category */}
           <TextField
             select
             variant="outlined"
             value={category}
             onChange={(e) => setCategory(e.target.value)}
             label="Select Category"
             fullWidth
             className="mb-6"
             InputProps={{
              sx: {
                "& fieldset": { borderRadius: "10px" }, // Rounded corners
                "&:hover fieldset": { borderColor: "#1E88E5" }, // Hover effect
                "&.Mui-focused fieldset": { borderColor: "#1565C0" }, // Focus effect
              },
            }}
           >
             <MenuItem value="B2B">B2B</MenuItem>
             <MenuItem value="B2C">B2C</MenuItem>
           </TextField>
   
           {/* Second Autocomplete for Supplier/Lead */}
           <Autocomplete
              fullWidth
              options={secondMenuData}
              getOptionLabel={(option) =>
                option?.name ? `${option.name}` : ""
              }
              value={selectedToSupplier}
              onChange={(e, newValue) => setSelectedToSupplier(newValue)}
              disabled={!category}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`Select ${category === "B2B" ? "Supplier" : "Customer"}`}
                  variant="outlined"
                  className="mb-6"
                  placeholder={`Search or Select ${
                    category === "B2B" ? "Supplier" : "Customer"
                  }`}
                  onClick={() => {
                    if (!category) {
                      auth.toastError("Please select a category first");
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      "& fieldset": { borderRadius: "10px" }, // Rounded corners
                      "&:hover fieldset": { borderColor: "#1E88E5" }, // Hover effect
                      "&.Mui-focused fieldset": { borderColor: "#1565C0" }, // Focus effect
                    },
                    endAdornment: (
                      <>
                        {loadingBookingList ? <CircularProgress size={20} /> : null}
                      </>
                    ),
                  }}
                />
              )}
            />

           {/* Conditional Add Button */}
           <Button
              type="button"
              variant="contained"
              onClick={() => setShowPopup(true)}
              fullWidth
              className={`relative flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
              text-white font-semibold text-lg transition-all duration-300 
              ${
                category
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 active:scale-95 shadow-lg"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!category}
          >
            {category === "B2B" ? (
              <>
                Add Supplier
              </>
            ) : (
              <>
                Add Lead
              </>
            )}
          </Button>

         </div>
         {/* Popup Modal */}
         {showPopup && (
          <div className="w-full fixed p-4 inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full overflow-y-auto max-w-4xl">
            <div className="flex justify-between items-center mt-4">
                <h2 className="text-2xl font-semibold">
                   {category === "B2B" ? "Add Supplier" : "Add Lead"}
                </h2>
                 <Button onClick={() => setShowPopup(false)} className="text-red-500">
                   Close
                 </Button>
               </div>
               {/* Conditionally render the AddSupplierPage or AddLeadPage */}
               {category === "B2B" ? (
                 <AddSupplierPage update={update} setUpdate={setUpdate} />
               ) : (
                 <AddLeadPage update={update} setUpdate={setUpdate} />
               )}
             </div>
           </div>
         )}
         </>
        )}
        {/* From Section */}
        <button
          type="button"
          onClick={() => toggleSection("from")}
          className="w-full text-left px-4 py-2 bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 mb-4"
        >
          From
        </button>
        {visibleSection === "from" && (
        <div className="p-6 bg-gray-50 rounded-xl shadow-md space-y-6">
          {/* First Row: Service, Supplier, Add Supplier */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
            {/* Service Selector */}
            <TextField
              select
              fullWidth
              variant="outlined"
              value={selectedService?.id || ""} // Ensure it's a valid value
              onChange={(e) => {
                const selectedId = e.target.value;
                const fullService = services.find(service => service.id === selectedId);
                setSelectedService(fullService);
              }}              
              // onChange={(e) => setSelectedService(e.target.value)}
              label="Select Service"
              required
              InputProps={{ sx: { "& fieldset": { borderRadius: "10px" } } }}
            >
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.service_name}
                </MenuItem>
              ))}
            </TextField>

            {/* Supplier Autocomplete */}
            <Autocomplete
              fullWidth
              options={customerServices.filter(
                (customer) => customer.id !== (selectedToSupplier?.id || "")
              )}
              getOptionLabel={(option) => option?.agent || ""}
              value={selectedFromSupplier}
              onChange={(e, newValue) => setSelectedFromSupplier(newValue)}
              disabled={!selectedService}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Supplier"
                  placeholder="Select or Search Supplier"
                  variant="outlined"
                  onClick={() => {
                    if (!selectedService) {
                      auth.toastError("Please select a service first");
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      "& fieldset": { borderRadius: "10px" },
                      "&:hover fieldset": { borderColor: "#1E88E5" },
                      "&.Mui-focused fieldset": { borderColor: "#1565C0" },
                    },
                    endAdornment: (
                      <>
                        {loadingPostCustomerServices ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />

            {/* Add Supplier Button */}
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => setShowPopup(true)}
              size="small"
              fullWidth
              className="shadow-md"
            >
              Add Supplier
            </Button>
          </div>

          {/* Second Row: Agent Sales and Country */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            {/* Agent Sales Autocomplete */}
            <Autocomplete
              fullWidth
              options={agents}
              getOptionLabel={(option) => option?.name || ""}
              value={selectAgent}
              onChange={(e, newValue) => setSelectAgent(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Agent Sales"
                  placeholder="Select or Search Agent Sales"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    sx: { "& fieldset": { borderRadius: "10px" } },
                  }}
                />
              )}
            />

            {/* Country Autocomplete */}
            <Autocomplete
              fullWidth
              options={countries}
              getOptionLabel={(option) => option.name || ""}
              value={
                countries.find((country) => country.id === selectedCountry) ||
                null
              }
              onChange={(e, newValue) =>
                setSelectedCountry(newValue ? newValue.id : null)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Country"
                  placeholder="Select or Search Country"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    sx: { "& fieldset": { borderRadius: "10px" } },
                  }}
                />
              )}
            />
          </div>

          {/* Popup Modal for Adding Supplier */}
          {showPopup && (
            <div className="fixed inset-0 z-50 p-4 bg-gray-600 bg-opacity-50 overflow-y-auto">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Add Supplier</h2>
                  <Button
                    onClick={() => setShowPopup(false)}
                    className="text-red-500"
                  >
                    Close
                  </Button>
                </div>
                <AddSupplierPage update={update} setUpdate={setUpdate} />
              </div>
            </div>
          )}

          {/* Cost & Markup Section (Appears under Agent & Country) */}
          <div className="p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
            <h3 className="text-lg font-bold text-blue-700 mb-2">
              Cost & Markup Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Currency Autocomplete */}
              <Autocomplete
                fullWidth
                options={currencies}
                getOptionLabel={(option) => option?.name || ""}
                // Look up the full object based on the stored value (if storing an id, adjust accordingly)
                value={selectedCurrency} 
                onChange={(e, newValue) => setSelectedCurrency(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Currency"
                    placeholder="Select or Search Currency"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      sx: { "& fieldset": { borderRadius: "10px" } },
                    }}
                  />
                )}
              />

              {/* Agent Cost */}
              <TextField
                label="Agent Cost"
                variant="outlined"
                fullWidth
                required
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                InputProps={{
                  sx: { "& fieldset": { borderRadius: "10px" } },
                }}
              />

              {/* Markup Value & Type */}
              <div className="flex flex-col space-y-2">
                <TextField
                  label="Markup Value"
                  variant="outlined"
                  fullWidth
                  required
                  value={markupValue}
                  onChange={(e) => setMarkupValue(e.target.value)}
                  InputProps={{
                    sx: { "& fieldset": { borderRadius: "10px" } },
                  }}
                />
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-700">
                    Markup Type:
                  </span>
                  <Switch
                    checked={isMarkupPercentage === 1}
                    onChange={handleSwitchChange}
                    color="primary"
                  />
                  <span className="text-sm text-gray-600">
                    {isMarkupPercentage ? "Percentage" : "Value"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-right text-blue-700 font-semibold">
              Total Cost: {price}{" "}
              {selectedCurrency ? selectedCurrency.name : ""}
            </div>
          </div>

          {/* Tax Details Section (Appears when a country is selected) */}
          {selectedCountry && (
            <div className="p-4 bg-yellow-50 rounded-lg shadow-sm border border-yellow-200 mt-6">
              <h3 className="text-lg font-bold text-yellow-700 mb-2">
                Tax Details
              </h3>
              {/* Tax Type & Taxes Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  value={selectedTaxType}
                  onChange={(e) => setSelectedTaxType(e.target.value)}
                  label="Select Tax Type"
                  InputProps={{
                    sx: { "& fieldset": { borderRadius: "10px" } },
                  }}
                >
                  {taxesType.map((tax) => (
                    <MenuItem key={tax.value} value={tax.value}>
                      {tax.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Autocomplete
                  multiple
                  fullWidth
                  options={taxes || []}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name || ""}
                  value={taxes.filter((tax) => selectedTaxId.includes(tax.id))}
                  onChange={(event, newValue) =>
                    setSelectedTaxId(newValue.map((tax) => tax.id))
                  }
                  disabled={!selectedCountry}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} key={option.id}>
                      <Checkbox
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Taxes"
                      variant="outlined"
                      placeholder="Search or select taxes"
                      InputProps={{
                        ...params.InputProps,
                        sx: { "& fieldset": { borderRadius: "10px" } },
                      }}
                    />
                  )}
                />
                </div>
              {/* Tax Summary */}
              <div className="mt-4 text-right text-yellow-800 font-semibold">
                Total Tax Amount:{" "}
                {selectedTaxId.length > 0 && taxes.length > 0
                  ? selectedTaxId
                      .reduce((acc, id) => {
                        const tax = taxes.find((tax) => tax.id === id);
                        if (tax) {
                          const taxValue =
                            tax.type === "precentage"
                              ? (parseFloat(tax.amount) / 100) *
                                parseFloat(cost || 0)
                              : parseFloat(tax.amount);
                          return acc + (isNaN(taxValue) ? 0 : taxValue);
                        }
                        return acc;
                      }, 0)
                      .toFixed(2)
                  : "0"}{" "}
                {selectedCurrency ? selectedCurrency.name : ""}
              </div>
            </div>
          )}

          {/* Final Overall Summary Section */}
          <div className="p-4 bg-green-50 rounded-lg shadow-md border border-green-200 mt-6">
            <div className="flex justify-between items-center">
              <span className="font-bold text-green-700">
                Total Taxes + Cost:
              </span>
              <span className="text-green-700">
                {(
                  parseFloat(cost || 0) +
                  (selectedTaxId.length > 0 && taxes.length > 0
                    ? selectedTaxId.reduce((acc, id) => {
                        const tax = taxes.find((tax) => tax.id === id);
                        if (tax) {
                          const taxValue =
                            tax.type === "precentage"
                              ? (parseFloat(tax.amount) / 100) *
                                parseFloat(cost || 0)
                              : parseFloat(tax.amount);
                          return acc + (isNaN(taxValue) ? 0 : taxValue);
                        }
                        return acc;
                      }, 0)
                    : 0)
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold text-green-700">
                Grand Total (Cost + Taxes + Markup):
              </span>
              <span className="text-green-700">
                {(
                  parseFloat(price || 0) +
                  (selectedTaxId.length > 0 && taxes.length > 0
                    ? selectedTaxId.reduce((acc, id) => {
                        const tax = taxes.find((tax) => tax.id === id);
                        if (tax) {
                          const taxValue =
                            tax.type === "precentage"
                              ? (parseFloat(tax.amount) / 100) *
                                parseFloat(cost || 0)
                              : parseFloat(tax.amount);
                          return acc + (isNaN(taxValue) ? 0 : taxValue);
                        }
                        return acc;
                      }, 0)
                    : 0) 
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        )}

        {/* Details Section */}
        <button
          type="button"
          onClick={() => toggleSection("details")}
          className="w-full text-left px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md  hover:bg-gray-300 mb-4 transition-all duration-300"
        >
          Details
        </button>
          {selectedService && (
            <div>
              <div className="space-y-4 p-2 lg:p-6">

              {/* Visa  Details */}
              {selectedService?.service_name === "Visa" && (
                  <VisaServicePage
                      countries={countries}
                      today={today}
                      title={title}
                      visaCountry={visaCountry}
                      setVisaCountry={setVisaCountry}
                      visaTravelDate={visaTravelDate}
                      setVisaTravelDate={setVisaTravelDate}
                      visaAppointmentDate={visaAppointmentDate}
                      setVisaAppointmentDate={setVisaAppointmentDate}
                      visaAdultsNumber={visaAdultsNumber}
                      setVisaAdultsNumber={setVisaAdultsNumber}
                      visaChildrenNumber={visaChildrenNumber}
                      setVisaChildrenNumber={setVisaChildrenNumber}
                      visaAdults={visaAdults}
                      setVisaAdults={setVisaAdults}
                      visaChildren={visaChildren}
                      setVisaChildren={setVisaChildren}
                      visaNotes={visaNotes}
                      setVisaNotes={setVisaNotes}
                  />
              )}

              {/* Flight  Details */}
              {selectedService?.service_name === "Flight" && (
                <FlightServicePage
                  today={today}
                  auth={auth}
                  title={title}
                  flightType={flightType}
                  flightDirection={flightDirection}
                  selectedFlightType={selectedFlightType}
                  setSelectedFlightType={setSelectedFlightType}
                  selectedFlightDirection={selectedFlightDirection}
                  setSelectedFlightDirection={setSelectedFlightDirection}
                  flightDeparture={flightDeparture}
                  setFlightDeparture={setFlightDeparture}
                  flightArrival={flightArrival}
                  setFlightArrival={setFlightArrival}
                  multiCityFlights={multiCityFlights}
                  setMultiCityFlights={setMultiCityFlights}
                  flightChildrenNumber={flightChildrenNumber}
                  setFlightChildrenNumber={setFlightChildrenNumber}
                  flightAdultsNumber={flightAdultsNumber}
                  setFlightAdultsNumber={setFlightAdultsNumber}
                  flightAdults={flightAdults}
                  setFlightAdults={setFlightAdults}
                  flightChildren={flightChildren}
                  setFlightChildren={setFlightChildren}
                  flightInfants={flightInfants}
                  setFlightInfants={setFlightInfants}
                  flightAdultPrice={flightAdultPrice}
                  setFlightAdultPrice={setFlightAdultPrice}
                  flightChildPrice={flightChildPrice}
                  setFlightChildPrice={setFlightChildPrice}
                  flightClass={flightClass}
                  setFlightClass={setFlightClass}
                  flightAirline={flightAirline}
                  setFlightAirline={setFlightAirline}
                  flightTicketNumber={flightTicketNumber}
                  setFlightTicketNumber={setFlightTicketNumber}
                  flightRefPNR={flightRefPNR}
                  setFlightRefPNR={setFlightRefPNR}
                />
              )}

              {/* Hotel Details */}
              {selectedService.service_name === "Hotel" && (
                <HotelServicePage
                today={today}
                hotelName={hotelName}
                setHotelName={setHotelName}
                checkInDate={checkInDate}
                setCheckInDate={setCheckInDate}
                checkOutDate={checkOutDate}
                setCheckOutDate={setCheckOutDate}
                totalNights={totalNights}
                setTotalNights={setTotalNights}
                roomQuantity={roomQuantity}
                setRoomQuantity={setRoomQuantity}
                roomTypes={roomTypes}
                setRoomTypes={setRoomTypes}
                adultsHotelNumber={adultsHotelNumber}
                setAdultsHotelNumber={setAdultsHotelNumber}
                childrenHotelNumber={childrenHotelNumber}
                setChildrenHotelNumber={setChildrenHotelNumber}
                hotelAdults={hotelAdults}
                setHotelAdults={setHotelAdults}
                hotelChildren={hotelChildren}
                setHotelChildren={setHotelChildren}
                title={title}
              />
              )}

              {/* Bus Details */}
              {selectedService?.service_name === "Bus" && (
                <BusServicePage
                  today={today}
                  details={details}
                  setDetails={setDetails}
                  busFrom={busFrom}
                  setBusFrom={setBusFrom}
                  busTo={busTo}
                  setBusTo={setBusTo}
                  departure={departure}
                  setDeparture={setDeparture}
                  arrival={arrival}
                  setArrival={setArrival}
                  busAdultsNumber={busAdultsNumber}
                  setBusAdultsNumber={setBusAdultsNumber}
                  busChildrenNumber={busChildrenNumber}
                  setBusChildrenNumber={setBusChildrenNumber}
                  adultPrice={adultPrice}
                  setAdultPrice={setAdultPrice}
                  childPrice={childPrice}
                  setChildPrice={setChildPrice}
                  busName={busName}
                  setBusName={setBusName}
                  busNumber={busNumber}
                  setBusNumber={setBusNumber}
                  driverPhone={driverPhone}
                  setDriverPhone={setDriverPhone}
                  busAdults={busAdults}
                  setBusAdults={setBusAdults}
                  busChildren={busChildren}
                  setBusChildren={setBusChildren}
                  title={title}
                />
              )}

              {/* Tour Details */}
              {selectedService?.service_name === "Tour" && (
                <TourServicePage
                  tour={tour}
                  setTour={setTour}
                  tourType={tourType}
                  selectedTourType={selectedTourType}
                  setSelectedTourType={setSelectedTourType}
                  tourAdultsNumber={tourAdultsNumber}
                  setTourAdultsNumber={setTourAdultsNumber}
                  tourChildrenNumber={tourChildrenNumber}
                  setTourChildrenNumber={setTourChildrenNumber}
                  tourAdultPrice={tourAdultPrice}
                  setTourAdultPrice={setTourAdultPrice}
                  tourChildPrice={tourChildPrice}
                  setTourChildPrice={setTourChildPrice}
                  tourAdults={tourAdults}
                  setTourAdults={setTourAdults}
                  tourChildren={tourChildren}
                  setTourChildren={setTourChildren}
                  title={title}
                  hotels={hotels}
                  setHotels={setHotels}
                  buses={buses}
                  setBuses={setBuses}
                  today={today}
                />
              )}

              </div>
            </div>
          )}
          {/* Submit Button */}
          <div className="mt-6 text-center">
            <Link to="/dashboard_agent/checkOut_process" type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600">
              Submit Booking
            </Link>
          </div>
      </div>
     </form>
  );
};

export default ManualBooking;
