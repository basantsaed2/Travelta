import React, { useState , useEffect} from 'react';
import { TextField, MenuItem, Switch, selectClasses ,Button,Checkbox , ListItemText } from '@mui/material';
import { useGet } from '../../../Hooks/useGet';
import { usePost } from '../../../Hooks/usePostJson';
import { useAuth } from '../../../Context/Auth';
import axios from 'axios';
import { MdAttachMoney } from "react-icons/md";
import { FiPercent } from "react-icons/fi";

const ManualBooking = ({ refetch, setUpdate }) => {
    const { refetch: refetchBookingList, loading: loadingBookingList, data: bookingListData } = useGet({url:'https://travelta.online/agent/manual_booking/lists'});
    const { refetch: refetchSuppliers, loading: loadingSuppliers, data: suppliersData } = useGet({url:'https://travelta.online/agent/manual_booking/supplier_customer'});
    const { postData, loadingPost, response } = usePost({ url:'https://travelta.online/agent/manual_booking'});
    const auth = useAuth();

    const [suppliers, setSuppliers] = useState([])
    const [customers, setCustomers] = useState([])
    const [secondMenuData, setSecondMenuData] = useState([]); // Data for the second dropdown
    const [category, setCategory] = useState(''); // To track B2B or B2C
    const [selectedToSupplier, setSelectedToSupplier] = useState(''); // To track the selected supplier or customer
    const [bookingList, setBookingList] = useState([])

    const [selectedService, setSelectedService] = useState(''); // Selected service
    const { refetch: refetchCustomerServices, loading: loadingCustomerServices, data: customerServicesData } = useGet({
        url: selectedService ? `https://travelta.online/agent/manual_booking/service_supplier?service_id=${selectedService.id}` : ''
    });
        
    const [selectedCountry, setSelectedCountry] = useState(''); // Selected service
    const { refetch: refetchTaxes, loading: loadingTaxes, data: taxesData } = useGet({
        url: selectedCountry ? `https://travelta.online/agent/manual_booking/taxes?country_id=${selectedCountry}` : ''
    });

    const [details, setDetails] = useState({
    flight : false,
    bus: false,
    visa: false,
    hotel: false,
    tour:false,
  });

  
  const [visibleSection, setVisibleSection] = useState('');

  // This function will toggle the section visibility
  const toggleSection = (section) => {
    setVisibleSection(visibleSection === section ? '' : section);
  };


    // From Data
    const [services, setServices] = useState([])
    const [customerServices, setCustomerServices] = useState([])
    const [selectedFromSupplier, setSelectedFromSupplier] = useState(''); // To track the selected supplier or customer
    const [cost, setCost] = useState(''); // To track the selected supplier or customer
    const [price, setPrice] = useState(0); // To track the selected supplier or customer
    const [totalPrice, setTotalPrice] = useState(''); // To track the selected supplier or customer
    const [isMarkupPercentage, setIsMarkupPercentage] = useState(1); // 1 for %, 0 for $
    const [markupValue, setMarkupValue] = useState(''); // 1 for %, 0 for $
    const [selectedTaxType, setSelectedTaxType] = useState('');
    const [selectedTaxAmount, setSelectedTaxAmount] = useState('');
    const taxesType = [
      { value: 'include', label: 'Include' },
      { value: 'exclude', label: 'Exclude' },
    ];
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [selectedCurrency, setSelectedCurrency] = useState([])
    const [taxes, setTaxes] = useState([])
    const [countries, setCountries] = useState([])
    const [selectedTaxId, setSelectedTaxId] = useState([]);

    const handleSwitchChange = () => {
      setIsMarkupPercentage((prev) => (prev === 1 ? 0 : 1)); // Toggle between 1 and 0
    };


    // To track the hotel details
    const [hotelName, setHotelName] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [totalNights, setTotalNights] = useState('');
    const [roomType, setRoomType] = useState('');
    const [roomQuantity, setRoomQuantity] = useState('');
    const [adults, setAdults] = useState('');
    const [children, setChildren] = useState('');

    // To track the bus details 
    const [busFrom, setBusFrom] = useState('');
    const [busTo, setBusTo] = useState('');
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [busAdults, setBusAdults] = useState('');
    const [busChildren, setBusChildren] = useState('');
    const [adultPrice, setAdultPrice] = useState('');
    const [childPrice, setChildPrice] = useState('');
    const [busName, setBusName] = useState('');
    const [busNumber, setBusNumber] = useState('');
    const [driverPhone, setDriverPhone] = useState('');

    // To track the flight details
    const flightType = [
      { value: 'domestic', label: 'Domestic' },
      { value: 'international', label: 'International' },
    ];
    const [selectedFlightType, setSelectedFlightType] = useState('');

    const flightDirection = [
      { value: 'one_way', label: 'one Way' },
      { value: 'round_trip', label: 'Round Trip' },
      { value: 'multi_city', label: 'Multi City' },
    ];
    const [selectedFlightDirection, setselectedFlightDirection] = useState('');
    const [flightDeparture, setFlightDeparture] = useState('');
    const [flightArrival, setFlightArrival] = useState('');
    const [flightFrom, setFlightFrom] = useState('');
    const [flightTo, setFlightTo] = useState('');

    const [multiCityFlights, setMultiCityFlights] = useState([
      { from: "", to: ""},
    ]);
  
    const handleMultiCityChange = (index, field, value) => {
      setMultiCityFlights((prev) =>
        prev.map((flight, i) =>
          i === index ? { ...flight, [field]: value } : flight
        )
      );
    };
  
    const addNewMultiCityFlight = () => {
      setMultiCityFlights((prev) => [
        ...prev,
        { from: "", to: ""},
      ]);
    };
    const [flightNumber, setFlightNumber] = useState('');
    const [flightCustomers, setFlightCustomers] = useState([]);
    const [flightChildren, setFlightChildren] = useState('');
    const [flightAdults, setFlightAdults] = useState('');
    const [flightInfants, setFlightInfants] = useState('');
    const [flightAdultPrice, setFlightAdultPrice] = useState('');
    const [flightChildPrice, setFlightChildPrice] = useState('');
    const [flightClass, setFlightClass] = useState('');
    const [flightAirline, setFlightAirline] = useState('');
    const [flightTicketNumber, setFlightTicketNumber] = useState('');
    const [flightRefPNR, setFlightRefPNR] = useState('');

    // To track the visa details
    const [visaCountry, setVisaCountry] = useState('');
    const [visaTravelDate, setVisaTravelDate] = useState('');
    const [visaAppointmentDate, setVisaAppointmentDate] = useState('');
    const [visaNumber, setVisaNumber] = useState('');
    const [visaCustomers, setVisaCustomers] = useState([]);
    const [visaNotes, setVisaNotes] = useState('');

    //To track the tour details
    const [tour,setTour]=useState('')
    const tourType = [
      { value: 'domestic', label: 'Domestic' },
      { value: 'international', label: 'International' },
    ];
    const [selectedTourType, setSelectedTourType] = useState('');    
    const [tourChildren, setTourChildren] = useState('');
    const [tourAdults, setTourAdults] = useState('');
    const [tourAdultPrice, setTourAdultPrice] = useState('');
    const [tourChildPrice, setTourChildPrice] = useState('');
    const [hotels, setHotels] = useState([
      { destination: "", hotel_name: "", room_type: "", check_in: "", check_out: "", nights: "" },
    ]);
    
    const [buses, setBuses] = useState([{ transportation: "", seats: "" }]);
    
    // Handle changes in hotel fields
    const handleHotelChange = (index, field, value) => {
      setHotels((prev) =>
        prev.map((hotel, i) => (i === index ? { ...hotel, [field]: value } : hotel))
      );
    };
    
    // Handle changes in bus fields
    const handleBusChange = (index, field, value) => {
      setBuses((prev) =>
        prev.map((bus, i) => (i === index ? { ...bus, [field]: value } : bus))
      );
    };
    
    // Add a new hotel
    const addNewHotel = () => {
      setHotels((prev) => [
        ...prev,
        { destination: "", hotel_name: "", room_type: "", check_in: "", check_out: "", nights: "" },
      ]);
    };
    
    // Add a new bus
    const addNewBus = () => {
      setBuses((prev) => [...prev, { transportation: "", seats: "" }]);
    };
    
    // Remove hotel (only removes newly added hotels, not the first one)
    const removeHotel = (index) => {
      if (index !== 0) { // Don't allow removal of the first hotel
        setHotels((prev) => prev.filter((hotel, i) => i !== index));
      }
    };
    
    // Remove bus (only removes newly added buses, not the first one)
    const removeBus = (index) => {
      if (index !== 0) { // Don't allow removal of the first bus
        setBuses((prev) => prev.filter((bus, i) => i !== index));
      }
    };
    

    const handleVisaNumberChange = (e) => {
      const number = parseInt(e.target.value, 10) || 0;
      setVisaNumber(number);
  
      // Adjust the customer inputs dynamically based on the number entered
      setVisaCustomers(Array(number).fill(''));
    };
  
    const handleVisaCustomerNameChange = (index, value) => {
      const updatedCustomers = [...visaCustomers];
      updatedCustomers[index] = value;
      setVisaCustomers(updatedCustomers);
    };

    const handleFlightNumberChange = (e) => {
      const number = parseInt(e.target.value, 10) || 0;
      setFlightNumber(number);
  
      // Adjust the customer inputs dynamically based on the number entered
      setFlightCustomers(Array(number).fill(''));
    };
  
    const handleFlightCustomerNameChange = (index, value) => {
      const updatedCustomers = [...flightCustomers];
      updatedCustomers[index] = value;
      setFlightCustomers(updatedCustomers);
    };

   useEffect(() => {
        refetchBookingList();
        refetchSuppliers();
    }, [refetchBookingList,refetchSuppliers, refetch]);

    useEffect(() => {
            if (bookingListData && suppliersData) {
                    console.log("Booking List Data:", bookingListData);
                    console.log("Suppliers Data:", suppliersData);
                    setServices(bookingListData.services);
                    setCountries(bookingListData.contries);
                    setCities(bookingListData.cities);
                    setCurrencies(bookingListData.currencies);
                    setSuppliers(suppliersData.suppliers);
                    setCustomers(suppliersData.customers);
            }
    }, [bookingListData,suppliersData]); // Only run this effect when `data` changes
  
    // Update the second dropdown based on the selected category
    useEffect(() => {
        if (category === 'B2B') {
        setSecondMenuData(suppliers);
        } else if (category === 'B2C') {
        setSecondMenuData(customers);
        } else {
        setSecondMenuData([]);
        }
    }, [category, suppliers, customers]);

    useEffect(() => {
        if (selectedService) {
          // Call the refetch function when selectedService is available
          refetchCustomerServices();
        }
         else {
          setCustomerServices([]);  // Clear customer services if no service is selected
        }
      }, [selectedService, refetchCustomerServices]);

      useEffect(() => {
        if (selectedCountry) {
            refetchTaxes();
          }
           else {
            setTaxes([]);  // Clear customer services if no service is selected
          }
      }, [selectedCountry, refetchTaxes]);

      useEffect(() => {
        if (selectedService && !loadingCustomerServices && customerServicesData) {
          console.log('Response Data Supplier service:', customerServicesData);
          if (customerServicesData.supplier) {
            setCustomerServices(customerServicesData.supplier); // Update the customers list
          }
        }
      }, [loadingCustomerServices, customerServicesData]); // Runs when data or loading state changes

      useEffect(() => {
        if (selectedCountry && !loadingTaxes && taxesData) {
          console.log('Response Data Country Taxes:', taxesData);
          if (taxesData.taxes) {
            setTaxes(taxesData.taxes); // Update the customers list
          }
        }
      }, [loadingTaxes, taxesData]); // Runs when data or loading state changes
          

  // const [visibleSection, setVisibleSection] = useState('');

  // const toggleSection = (section) => {
  //   setVisibleSection(visibleSection === section ? '' : section);
  // };

    const selectedTaxes = taxes.filter((tax) => selectedTaxId.includes(tax.id));

    useEffect(() => {
      // Parse cost and markupValue as floats, fallback to 0 if not set
      const parsedCost = parseFloat(cost || 0);
      const parsedMarkupValue = parseFloat(markupValue || 0);
    
      // Check if isMarkupPercentage is 1, treat markupValue as percentage
      const calculatedMarkupValue = isMarkupPercentage === 1 
        ? (parsedMarkupValue / 100) // Calculate percentage of cost
        : parsedMarkupValue; // Use markupValue directly if it's not a percentage
    
      const calculatedPrice = parsedCost + calculatedMarkupValue;
    
      // Calculate total tax amount
      let totalTaxAmount = 0;
      selectedTaxId.forEach((id) => {
        const tax = taxes.find((tax) => tax.id === id); // Find tax object by ID
        if (tax) {
          if (tax.type === "precentage") {
            totalTaxAmount += (parseFloat(tax.amount) / 100); // Apply percentage tax
          } else if (tax.type === "value") {
            totalTaxAmount += parseFloat(tax.amount || 0); // Apply fixed value tax
          }
        }
      });
    
      const calculatedTotalPrice = calculatedPrice + totalTaxAmount;
    
      // Update the state with calculated values
      setPrice(calculatedPrice.toFixed(2));
      setTotalPrice(calculatedTotalPrice.toFixed(2));
    }, [cost, markupValue, selectedTaxId, isMarkupPercentage, taxes]);
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create FormData object to append the form data
    const formData = new FormData();
    // console.log('service:', selectedService);

    // Append form fields to FormData 
    formData.append('from_supplier_id', selectedFromSupplier);
    formData.append('from_service_id', selectedService.id);
    if(isMarkupPercentage === 1){
      formData.append('mark_up_type', 'precentage');
    }else{
      formData.append('mark_up_type', 'value');
    }
    formData.append('mark_up', markupValue);
    formData.append('price', price);
    formData.append('country_id', selectedCountry);
    formData.append('city_id', selectedCity);
    formData.append("taxes", JSON.stringify(selectedTaxId)); 
    formData.append('tax_type', selectedTaxType);
    formData.append('currency_id', selectedCurrency);
    formData.append('cost', cost);
    formData.append('total_price', totalPrice);
    // Append To fields to FormData 
    if (category === 'B2B') {
      formData.append('to_supplier_id', selectedToSupplier);
    }else if (category === 'B2C') {
      formData.append('to_customer_id', selectedToSupplier);
    } 

    // Append Hotal fields to FormData 
    if(selectedService.service_name === 'Hotel'){
      formData.append('hotel_name', hotelName);
      formData.append('check_in', checkInDate);
      formData.append('check_out', checkOutDate)
      formData.append('nights', totalNights)
      formData.append('room_type', roomType)
      formData.append('room_quantity', roomQuantity)
      formData.append('adults', adults)
      formData.append('childreen', children)
    }
    // Append Bus fields to FormData 
    else if(selectedService.service_name === 'Bus'){
      formData.append('from', busFrom);
      formData.append('to', busTo);
      formData.append('departure', departure);
      formData.append('arrival', arrival);
      formData.append('adults', busAdults);
      formData.append('childreen', busChildren);
      formData.append('child_price', childPrice);
      formData.append('adult_price', adultPrice);
      formData.append('bus', busName);
      formData.append('bus_number', busNumber);
      formData.append('driver_phone', driverPhone);
    }
    // Append Visa fields to FormData 
    else if(selectedService.service_name === 'Visa'){
      formData.append('country', visaCountry);
      formData.append('travel_date', visaTravelDate);
      formData.append('appointment_date', visaAppointmentDate);
      formData.append('number', visaNumber);
      formData.append("customers", JSON.stringify(visaCustomers)); // Serialize array to JSON
      formData.append('notes', visaNotes);
    }
    // Append Flight fields to FormData 
    else if(selectedService.service_name === 'Flight'){
      formData.append('type', selectedFlightType);
      formData.append('departure', flightDeparture);
      formData.append('direction', selectedFlightDirection);
      formData.append("customers", JSON.stringify(flightCustomers)); // Serialize array to JSON
      formData.append('childreen', flightChildren);
      formData.append('adults', flightAdults);
      formData.append('infants', flightInfants);
      formData.append('adult_price', flightAdultPrice);
      formData.append('child_price', flightChildPrice);
      formData.append('class', flightClass);
      formData.append('airline', flightAirline);
      formData.append('ticket_number', flightTicketNumber);
      formData.append('ref_pnr', flightRefPNR);
      if (selectedFlightDirection === 'round_trip' || selectedFlightDirection === 'multi_city') {
        formData.append('arrival', flightArrival);
      }
      const formattedFlights = JSON.stringify(
        multiCityFlights.map((flight) => ({
          from: flight.from,
          to: flight.to,
        }))
      );  
      formData.append('from_to', formattedFlights);
    }
    // Append Tour fields to FormData 
    else if(selectedService.service_name === 'Tour'){
      formData.append('tour', tour);
      formData.append('type', selectedTourType);
      formData.append('adult_price', tourAdultPrice);
      formData.append('child_price', tourChildPrice);
      formData.append('adults', tourAdults);
      formData.append('childreen', tourChildren);

      const formattedBuses = JSON.stringify(
        buses.map((bus) => ({
          transportation: bus.transportation,
          seats: bus.seats,
        }))
      );
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
    postData(formData, 'Booking Added Successfully');
  };


  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg w-full p-4 lg:p-8">
        {/* <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Manual Booking</h1> */}


        {/* From Section */}
        <button type='button'
          onClick={() => toggleSection('from')}
          className="w-full text-left px-4 py-2 bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 mb-4"
        >
          From
        </button>
        {visibleSection === 'from' && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
             {/* First Dropdown: Select Service */}
                <TextField
                select
                fullWidth
                variant="outlined"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)} // Update the selected service                }
                label="Select Service"
                required
                >
                {services.map((service) => (
                    <MenuItem key={service.id} value={service}>
                    {service.service_name}
                    </MenuItem>
                ))}
                </TextField>

                {/* Second Dropdown: Select Customer based on selected service */}
                <TextField
                select
                fullWidth
                variant="outlined"
                label="Select Supplier"
                disabled={!selectedService} // Disable until service is selected
                className="mb-6"
                // required
                value={selectedFromSupplier}
                onChange={(e) => setSelectedFromSupplier(e.target.value)} // Update the selected service                }
                onClick={(e) => {
                    if (!selectedService) {
                      // Show alert if no service is selected
                      auth.toastError('Please select a service first');
                    }
                  }}
                >
                {customerServices.length > 0 ? (
                    customerServices.map((customer) => (
                    <MenuItem key={customer.id} value={customer.id}>
                        {customer.agent}
                    </MenuItem>
                    ))
                ) : (
                    <MenuItem value="">
                    <em>No supplier available</em>
                    </MenuItem>
                )}
                </TextField>

                <TextField
                    label="Agent Cost"
                    variant="outlined"
                    fullWidth
                    required
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                />

                  {/* Switch Button with Icons */}
                  <div className='flex items-center'>
                    <span className='text-mainColor font-semibold'>Mark Up : </span>
                    <MdAttachMoney  className={`ml-2 ${isMarkupPercentage ? 'text-gray-500' : 'text-green-500'}`}/>
                    <Switch
                    checked={isMarkupPercentage === 1}
                    onChange={handleSwitchChange}
                    color="primary"
                    />
                    <FiPercent className={`ml-2 ${isMarkupPercentage ? 'text-blue-500' : 'text-gray-500'}`} />
                </div>

                <TextField
                    label="MarkUp Value"
                    variant="outlined"
                    fullWidth
                    required
                    value={markupValue}
                    onChange={(e) => setMarkupValue(e.target.value)}
                />
                <strong className='flex text-mainColor justify-center items-center'>Price :{price}</strong>

                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)} // Update the selected service                }
                    label="Select Country"
                    className="mb-6"
                    required
                    >
                    {countries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                        {country.name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)} // Update the selected service                }
                    label="Select City"
                    className="mb-6"
                    >
                    {cities.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                        {city.name}
                        </MenuItem>
                    ))}
                </TextField>

                  <TextField
                    label="Select Taxes"
                    disabled={!selectedCountry} // Disable until service is selected
                    fullWidth
                    select
                    value={selectedTaxId}  // Array of selected tax IDs
                    onChange={(e) => setSelectedTaxId(e.target.value)}  // Update selected tax IDs
                    onClick={(e) => {
                      if (!selectedCountry) {
                        // Show alert if no service is selected
                        auth.toastError('Please select a country first');
                      }
                    }}     
                    SelectProps={{
                      multiple: true,
                      renderValue: (selected) =>
                        selected
                          .map((id) => taxes.find((tax) => tax.id === id)?.name) // Get the tax names based on selected IDs
                          .join(" , "), // Join the selected tax names with a comma
                    }}
                    variant="outlined"
                    // className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                  >
                    {taxes.length > 0 ? (
                      taxes.map((tax) => (
                        <MenuItem key={tax.id} value={tax.id}>
                          <Checkbox checked={selectedTaxId.includes(tax.id)} /> {/* Check if the tax is selected */}
                          <ListItemText primary={tax.name} /> {/* Display the tax name */}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">
                        <em>No Taxes available</em>
                      </MenuItem>
                    )}
                  </TextField>

                  {selectedTaxId.length > 0 && (
                    <TextField
                      label="Tax Amount"
                      variant="outlined"
                      fullWidth
                      required
                      value={`${
                        selectedTaxId
                          .map((id) => {
                            const tax = taxes.find((tax) => tax.id === id);
                            return tax.type === "precentage" 
                              ? `${tax.amount}%`
                              : `${tax.amount}`;
                          })
                          .join(" , ")
                      }`}
                      // disabled
                    />
                  )}

                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    value={selectedTaxType}
                    onChange={(e) => setSelectedTaxType(e.target.value)} // Update the selected service                }
                    label="Select Tax Type"
                    className="mb-6"
                    >
                    {taxesType.map((tax) => (
                        <MenuItem key={tax.value} value={tax.value}>
                        {tax.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)} // Update the selected service                }
                    label="Select Currency"
                    className="mb-6"
                    >
                    {currencies.map((Currency) => (
                        <MenuItem key={Currency.id} value={Currency.id}>
                        {Currency.name}
                        </MenuItem>
                    ))}
                </TextField>

                <strong className='flex text-green-700 justify-center items-center'>Total Price :{totalPrice}</strong>

          </div>
        )}

         {/* To Section */}
         <button type='button'
          onClick={() => toggleSection('to')}
          className="w-full text-left px-4 py-2 bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 mb-4"
        >
          To
        </button>
        {visibleSection === 'to' && (
          <div className="flex flex-col xl:flex-row items-center gap-6 mb-5">
             {/* First Dropdown */}
                <TextField
                select
                fullWidth
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Select Category"
                className="mb-6"
                >
                <MenuItem value="B2B">B2B</MenuItem>
                <MenuItem value="B2C">B2C</MenuItem>
                </TextField>

                {/* Second Dropdown */}
                <TextField
                select
                fullWidth
                variant="outlined"
                value={selectedToSupplier}
                onChange={(e) => setSelectedToSupplier(e.target.value)}
                label={`Select ${category === 'B2B' ? 'Supplier' : 'Customer'}`}
                disabled={!category} // Disable until category is selected
                className="mb-6"
                onClick={(e) => {
                  if (!category) {
                    // Show alert if no service is selected
                    auth.toastError('Please select a category first');
                  }
                }}
                >
                {secondMenuData.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                    {item.name || item.agent}
                    </MenuItem>
                ))}
                </TextField>
          </div>
        )}

        {/* Details Section */}
        <button type='button'
          onClick={() => toggleSection('details')}
          className="w-full text-left px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md  hover:bg-gray-300 mb-4 transition-all duration-300"
        >
          Details
        </button>
        {visibleSection === 'details' && (
          <div>
            <div className="space-y-4 p-2 lg:p-6">  

            {/* Hotel Details */}
            {selectedService.service_name === "Hotel" && (
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <button type='button'
                  onClick={() => setDetails({ ...details, hotel: !details.hotel })}
                  className="w-full flex justify-between items-center px-6 py-3 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all duration-300"
                >
                  <span>Hotel Details</span>
                  <span>{details.hotel ? '-' : '+'}</span>
                </button>
                {details.hotel && (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {/* Hotel Name */}
                        <TextField
                          fullWidth
                          label="Hotel Name"
                          value={hotelName}
                          onChange={(e) => setHotelName(e.target.value)}
                          variant="outlined"
                          placeholder="Enter hotel name"
                          className="w-full"
                        />

                        {/* Check-in Date */}
                        <TextField
                          fullWidth
                          label="Check-in Date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          variant="outlined"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          className="w-full"
                        />

                        {/* Check-out Date */}
                        <TextField
                          fullWidth
                          label="Check-out Date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          variant="outlined"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          className="w-full"
                        />

                        {/* Total Nights */}
                        <TextField
                            fullWidth
                            label="Total Nights"
                            value={totalNights}
                            onChange={(e) => setTotalNights(e.target.value)}
                            variant="outlined"
                            type="number"
                            placeholder="Enter total nights"
                            className="w-full"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                        />

                        {/* Room Type */}
                        <TextField
                            fullWidth
                            label="Room Type"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            variant="outlined"
                            type="number"
                            placeholder="Enter room type (e.g., 1 for single, 2 for double)"
                            className="w-full"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                        />

                        {/* Room Quantity */}
                        <TextField
                            fullWidth
                            label="Room Quantity"
                            value={roomQuantity}
                            onChange={(e) => setRoomQuantity(e.target.value)}
                            variant="outlined"
                            type="number"
                            placeholder="Enter number of rooms"
                            className="w-full"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                        />

                        {/* Adults */}
                        <TextField
                            fullWidth
                            label="Adults"
                            value={adults}
                            onChange={(e) => setAdults(e.target.value)}
                            variant="outlined"
                            type="number"
                            placeholder="Enter number of adults"
                            className="w-full"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                        />

                        {/* Children */}
                            <TextField
                            fullWidth
                            label="Children"
                            value={children}
                            onChange={(e) => setChildren(e.target.value)}
                            variant="outlined"
                            type="number"
                            placeholder="Enter number of children"
                            className="w-full"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                        />
                        
                    </div>
                    )}

              </div>
            )}

            {/* Bus Details */}
            {selectedService.service_name === "Bus" && (
              <div className="border rounded-lg overflow-hidden shadow-lg">
                    <button type='button'
                    onClick={() => setDetails({ ...details, bus: !details.bus })}
                    className="w-full flex justify-between items-center px-6 py-3 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all duration-300"
                    >
                    <span>Bus Details</span>
                    <span>{details.bus ? '-' : '+'}</span>
                    </button>
                    {details.bus && (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50">
                            {/* From */}
                            <TextField
                            fullWidth
                            label="From"
                            value={busFrom}
                            onChange={(e) => setBusFrom(e.target.value)}
                            variant="outlined"
                            placeholder="Enter departure city"
                            className="w-full"
                            />

                            {/* To */}
                            <TextField
                            fullWidth
                            label="To"
                            value={busTo}
                            onChange={(e) => setBusTo(e.target.value)}
                            variant="outlined"
                            placeholder="Enter destination city"
                            className="w-full"
                            />

                            {/* Departure */}
                            <TextField
                            fullWidth
                            label="Departure Date & Time"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            variant="outlined"
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            className="w-full"
                            />

                            {/* Arrival */}
                            <TextField
                            fullWidth
                            label="Arrival Date & Time"
                            value={arrival}
                            onChange={(e) => setArrival(e.target.value)}
                            variant="outlined"
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            className="w-full"
                            />

                            {/* Adults */}
                            <TextField
                            fullWidth
                            label="Adults"
                            value={busAdults}
                            onChange={(e) => setBusAdults(e.target.value)}
                            variant="outlined"
                            type="number"
                            placeholder="Enter number of adults"
                            className="w-full"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                            />

                            {/* Children */}
                            <TextField
                            fullWidth
                            label="Children"
                            value={busChildren}
                            onChange={(e) => setBusChildren(e.target.value)}
                            variant="outlined"
                            type="number"
                            placeholder="Enter number of children"
                            className="w-full"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                            />

                            {/* Adult Price */}
                            <TextField
                            fullWidth
                            label="Adult Price"
                            value={adultPrice}
                            onChange={(e) => setAdultPrice(e.target.value)}
                            variant="outlined"
                            type="number"
                            placeholder="Enter price per adult"
                            className="w-full"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                            />

                            {/* Child Price */}
                            <TextField
                            fullWidth
                            label="Child Price"
                            value={childPrice}
                            onChange={(e) => setChildPrice(e.target.value)}
                            variant="outlined"
                            type="number"
                            placeholder="Enter price per child"
                            className="w-full"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                            />

                            {/* Bus Name */}
                            <TextField
                            fullWidth
                            label="Bus Name"
                            value={busName}
                            onChange={(e) => setBusName(e.target.value)}
                            variant="outlined"
                            placeholder="Enter bus name"
                            className="w-full"
                            />

                            {/* Bus Number */}
                            <TextField
                            fullWidth
                            label="Bus Number"
                            value={busNumber}
                            onChange={(e) => setBusNumber(e.target.value)}
                            variant="outlined"
                            placeholder="Enter bus number"
                            className="w-full"
                            />

                            {/* Driver Phone */}
                            <TextField
                            fullWidth
                            label="Driver Phone"
                            value={driverPhone}
                            onChange={(e) => setDriverPhone(e.target.value)}
                            variant="outlined"
                            placeholder="Enter driver phone number"
                            className="w-full"
                            />
                        </div>
                    )}

              </div>
            )}

            {/* Visa Details */}
            {selectedService.service_name === "Visa" && (
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <button type='button'
                  onClick={() => setDetails({ ...details, visa: !details.visa })}
                  className="w-full flex justify-between items-center px-6 py-3 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all duration-300"
                >
                  <span>Visa Details</span>
                  <span>{details.visa ? '-' : '+'}</span>
                </button>
                {details.visa && (
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50">
                    {/* Country */}
                    <div className="mb-4">
                      <TextField
                        label="Country"
                        variant="outlined"
                        fullWidth
                        className="w-full"
                        value={visaCountry}
                        onChange={(e) => setVisaCountry(e.target.value)}
                        placeholder="Enter country name"
                      />
                    </div>

                    {/* Travel Date */}
                    <div className="mb-4">
                      <TextField
                        label="Travel Date & Time"
                        variant="outlined"
                        fullWidth
                        className="w-full"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        value={visaTravelDate}
                        onChange={(e) => setVisaTravelDate(e.target.value)}
                        placeholder='Enter Travel Date'
                      />
                    </div>

                    {/* Appointment Date */}
                    <div className="mb-4">
                      <TextField
                        label="Appointment Date & Time"
                        variant="outlined"
                        fullWidth
                        className="w-full"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        value={visaAppointmentDate}
                        onChange={(e) => setVisaAppointmentDate(e.target.value)}
                        placeholder='Enter Appointment Date'
                      />
                    </div>

                     {/* Number of Customers */}
                      <div className="mb-4">
                        <TextField
                          label="Customer Number"
                          type="number"
                          variant="outlined"
                          fullWidth
                          className="w-full"
                          value={visaNumber}
                          onChange={handleVisaNumberChange}
                          placeholder="Enter number of customers"
                          inputProps={{ min: 0 }} // Prevent typing values below 0
                        />
                      </div>

                      {/* Customer Names */}
                      {visaCustomers.map((customer, index) => (
                        <div className="mb-4" key={index}>
                          <TextField
                            label={`Customer Name ${index + 1}`}
                            variant="outlined"
                            fullWidth
                            className="w-full"
                            value={customer}
                            onChange={(e) => handleVisaCustomerNameChange(index, e.target.value)}
                            placeholder={`Enter name for customer ${index + 1}`}
                          />
                        </div>
                      ))}

                    {/* Notes */}
                    <div className="mb-4">
                      <TextField
                        label="Notes"
                        multiline
                        variant="outlined"
                        fullWidth
                        className="w-full"
                        value={visaNotes}
                        onChange={(e) => setVisaNotes(e.target.value)}
                        placeholder="Enter additional notes"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Flight  Details */}
            {selectedService.service_name === "Flight" && (
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <button type='button'
                  onClick={() => setDetails({ ...details, flight : !details.flight  })}
                  className="w-full flex justify-between items-center px-6 py-3 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all duration-300"
                >
                  <span>Flight Details</span>
                  <span>{details.flight ? '-' : '+'}</span>
                </button>
                {details.flight && (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50">

                      {/* Flight Type */}
                      <TextField
                        select
                        fullWidth
                        variant="outlined"
                        value={selectedFlightType}
                        onChange={(e) => setSelectedFlightType(e.target.value)}
                        label={'Select Flight Type'}
                        className="w-full"
                        placeholder="Enter Flight Type"
                        >
                        {flightType.map((flight) => (
                            <MenuItem key={flight.value} value={flight.value}>
                            {flight.label}
                            </MenuItem>
                        ))}
                        </TextField>

                      <TextField
                        select
                        fullWidth
                        variant="outlined"
                        value={selectedFlightDirection}
                        onChange={(e) => setselectedFlightDirection(e.target.value)}
                        label="Select Flight Direction"
                        className="w-full"
                        placeholder="Select Flight Direction"
                      >
                        {flightDirection.map((flight) => (
                          <MenuItem key={flight.value} value={flight.value}>
                            {flight.label}
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* Departure Date */}
                      <div className="mb-4">
                        <TextField
                          type="datetime-local"
                          label="Departure Date & Time"
                          value={flightDeparture}
                          onChange={(e) => setFlightDeparture(e.target.value)}
                          placeholder="Enter Departure Date & Time"
                          className="w-full"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                        />
                      </div>

                      {/* Conditionally Render Fields */}
                      {(selectedFlightDirection === "round_trip" ||
                        selectedFlightDirection === "multi_city"  )&& (
                        <div className="mb-4">
                          <TextField
                            type="datetime-local"
                            label="Arrival Date & Time"
                            value={flightArrival}
                            onChange={(e) => setFlightArrival(e.target.value)}
                            placeholder="Enter Arrival Date & Time"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            className="w-full"
                          />
                        </div>
                      )}

                      {/* From and To Inputs */}
                      {(selectedFlightDirection === "one_way" || selectedFlightDirection === "round_trip") && (
                        <>
                          <div className="mb-4">
                            <TextField
                              label="From"
                              variant="outlined"
                              fullWidth
                              className="w-full"
                              value={multiCityFlights[0].from}
                              onChange={(e) => handleMultiCityChange(0, "from", e.target.value)}
                              placeholder="Enter Flight From"
                            />
                          </div>
                          <div className="mb-4">
                            <TextField
                              label="To"
                              variant="outlined"
                              fullWidth
                              className="w-full"
                              value={multiCityFlights[0].to}
                              onChange={(e) => handleMultiCityChange(0, "to", e.target.value)}
                              placeholder="Enter Flight To"
                            />
                          </div>
                        </>
                      )}

                      {/* Multi-City Inputs */}
                      {selectedFlightDirection === "multi_city" && (
                        <>
                          {multiCityFlights.map((flight, index) => (
                            <div key={index} className="flex lg:flex-row flex-col gap-2">
                              <TextField
                                label={`From (${index + 1})`}
                                variant="outlined"
                                fullWidth
                                className="w-full"
                                value={flight.from}
                                onChange={(e) => handleMultiCityChange(index, "from", e.target.value)}
                                placeholder={`Enter From (${index + 1})`}
                              />
                              <TextField
                                label={`To (${index + 1})`}
                                variant="outlined"
                                fullWidth
                                className="w-full"
                                value={flight.to}
                                onChange={(e) => handleMultiCityChange(index, "to", e.target.value)}
                                placeholder={`Enter To (${index + 1})`}
                              />
                            </div>
                          ))}
                        <button
                        type="button"
                        onClick={addNewMultiCityFlight}
                        className="bg-mainColor w-full h-14 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out"
                      >
                        + Add Another Trip
                      </button>

                        </>
                      )}

                       {/* Number of Customers */}
                       <div className="mb-4">
                        <TextField
                          label="Customer Number"
                          type="number"
                          required
                          variant="outlined"
                          fullWidth
                          className="w-full"
                          value={flightNumber}
                          onChange={handleFlightNumberChange}
                          placeholder="Enter number of customers"
                          inputProps={{ min: 0 }} // Prevent typing values below 0
                        />
                      </div>

                      {/* Customer Names */}
                      {flightCustomers.map((customer, index) => (
                        <div className="mb-4" key={index}>
                          <TextField
                            label={`Customer Name ${index + 1}`}
                            variant="outlined"
                            fullWidth
                            className="w-full"
                            value={customer}
                            onChange={(e) => handleFlightCustomerNameChange(index, e.target.value)}
                            placeholder={`Enter name for customer ${index + 1}`}
                          />
                        </div>
                      ))}


                      {/* Children */}
                      <div className="mb-4">
                        <TextField
                          label="Children"
                          type="number"
                          variant="outlined"
                          fullWidth
                          className='w-full'
                          value={flightChildren}  
                          onChange={(e) => setFlightChildren(e.target.value)}
                          placeholder="Enter number of children"
                          inputProps={{ min: 0 }} // Prevent typing values below 0
                        />
                      </div>

                      {/* Adults */}
                      <div className="mb-4">
                        <TextField
                          label="Adults"
                          type="number"
                          variant="outlined"
                          fullWidth
                          className='w-full'
                          value={flightAdults}
                          onChange={(e) => setFlightAdults(e.target.value)}
                          placeholder="Enter number of adults"
                          inputProps={{ min: 0 }} // Prevent typing values below 0
                        />
                      </div>

                      {/* Infants */}
                      <div className="mb-4">
                        <TextField
                          label="Infants"
                          type="number"
                          variant="outlined"
                          fullWidth
                          className='w-full'
                          value={flightInfants}
                          onChange={(e) => setFlightInfants(e.target.value)}
                          placeholder="Enter number of infants"
                          inputProps={{ min: 0 }} // Prevent typing values below 0
                        />
                      </div>

                      {/* Adult Price */}
                      <div className="mb-4">
                        <TextField
                          label="Adult Price"
                          type="number"
                          variant="outlined"
                          fullWidth
                          className='w-full'
                          value={flightAdultPrice}
                          onChange={(e) => setFlightAdultPrice(e.target.value)}
                          placeholder="Enter Adult Price"
                          inputProps={{ min: 0 }} // Prevent typing values below 0
                        />
                      </div>

                      {/* Child Price */}
                      <div className="mb-4">
                        <TextField
                          label="Child Price"
                          type="number"
                          variant="outlined"
                          fullWidth
                          className='w-full'
                          value={flightChildPrice}
                          onChange={(e) => setFlightChildPrice(e.target.value)}
                          placeholder="Enter Child Price"
                          inputProps={{ min: 0 }} // Prevent typing values below 0
                        />
                      </div>

                      {/* Class */}
                      <div className="mb-4">
                        <TextField
                          label="Flight Class"
                          variant="outlined"
                          fullWidth
                          className='w-full'
                          value={flightClass}
                          onChange={(e) => setFlightClass(e.target.value)}
                          placeholder="Enter Class"
                        />
                      </div>

                      {/* Airline */}
                      <div className="mb-4">
                        <TextField
                          label="Airline"
                          variant="outlined"
                          fullWidth
                          className='w-full'
                          value={flightAirline}
                          onChange={(e) => setFlightAirline(e.target.value)}
                          placeholder="Enter Airline"
                        />
                      </div>

                      {/* Ticket Number */}
                      <div className="mb-4">
                        <TextField
                          label="Ticket Number"
                          variant="outlined"
                          fullWidth
                          className='w-full'
                          value={flightTicketNumber}
                          onChange={(e) => setFlightTicketNumber(e.target.value)}
                          placeholder="Enter Ticket Number"
                        />
                      </div>

                      {/* Ref PNR */}
                      <div className="mb-4">
                        <TextField
                          label="Ref PNR"
                          variant="outlined"
                          fullWidth
                          className='w-full'
                          value={flightRefPNR}
                          onChange={(e) => setFlightRefPNR(e.target.value)}
                          placeholder="Enter Ref PNR"
                        />
                      </div>
                    </div>
                )}

              </div>
            )}

            {/* Tour  Details */}
            {selectedService.service_name === "Tour" && (
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <button
                  type="button"
                  onClick={() => setDetails({ ...details, tour: !details.tour })}
                  className="w-full flex justify-between items-center px-6 py-3 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all duration-300"
                >
                  <span>Tour Details</span>
                  <span>{details.tour ? '-' : '+'}</span>
                </button>

                {details.tour && (
                  <div className='flex flex-col'>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50">

                      {/* Tour */}
                      <div className="mb-4">
                          <TextField
                            label="Tour Name"
                            variant="outlined"
                            fullWidth
                            className='w-full'
                            value={tour}  
                            onChange={(e) => setTour(e.target.value)}
                            placeholder="Enter Tour Name"
                          />
                        </div>

                        <TextField
                          select
                          fullWidth
                          variant="outlined"
                          value={selectedTourType}
                          onChange={(e) => setSelectedTourType(e.target.value)}
                          label={'Select Tour Type'}
                          className="w-full"
                          placeholder="Enter Tour Type"
                          >
                          {tourType.map((tour) => (
                              <MenuItem key={tour.value} value={tour.value}>
                              {tour.label}
                              </MenuItem>
                          ))}
                        </TextField>

                        {/* Children */}
                        <div className="mb-4">
                          <TextField
                            label="Children"
                            type="number"
                            variant="outlined"
                            fullWidth
                            className='w-full'
                            value={tourChildren}  
                            onChange={(e) => setTourChildren(e.target.value)}
                            placeholder="Enter number of children"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                          />
                        </div>

                        {/* Adults */}
                        <div className="mb-4">
                          <TextField
                            label="Adults"
                            type="number"
                            variant="outlined"
                            fullWidth
                            className='w-full'
                            value={tourAdults}
                            onChange={(e) => setTourAdults(e.target.value)}
                            placeholder="Enter number of adults"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                          />
                        </div>

                        {/* Child Price */}
                        <div className="mb-4">
                          <TextField
                            label="Child Price"
                            type="number"
                            variant="outlined"
                            fullWidth
                            className='w-full'
                            value={tourChildPrice}
                            onChange={(e) => setTourChildPrice(e.target.value)}
                            placeholder="Enter Child Price"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                          />
                        </div>

                        {/* Adult Price */}
                        <div className="mb-4">
                          <TextField
                            label="Adult Price"
                            type="number"
                            variant="outlined"
                            fullWidth
                            className='w-full'
                            value={tourAdultPrice}
                            onChange={(e) => setTourAdultPrice(e.target.value)}
                            placeholder="Enter Adult Price"
                            inputProps={{ min: 0 }} // Prevent typing values below 0
                          />
                        </div>
                    </div>

  {/* Hotel Inputs */}
  {hotels.map((hotel, index) => (
    <div key={index} className="p-4 bg-gray-50">
      <h1 className="bg-gray-100 p-2 font-semibold text-mainColor flex justify-center">
        Hotel Details
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextField
          label="Destination"
          value={hotel.destination}
          onChange={(e) => handleHotelChange(index, "destination", e.target.value)}
          fullWidth
          className="mb-2"
        />
        <TextField
          label="Hotel Name"
          value={hotel.hotel_name}
          onChange={(e) => handleHotelChange(index, "hotel_name", e.target.value)}
          fullWidth
          className="mb-2"
        />
        <TextField
          label="Room Type"
          value={hotel.room_type}
          onChange={(e) => handleHotelChange(index, "room_type", e.target.value)}
          fullWidth
          className="mb-2"
        />
        <TextField
          label="Check-In Date"
          type="date"
          value={hotel.check_in}
          onChange={(e) => handleHotelChange(index, "check_in", e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          className="mb-2"
        />
        <TextField
          label="Check-Out Date"
          type="date"
          value={hotel.check_out}
          onChange={(e) => handleHotelChange(index, "check_out", e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          className="mb-2"
        />
        <TextField
          label="Nights"
          type="number"
          value={hotel.nights}
          onChange={(e) => handleHotelChange(index, "nights", e.target.value)}
          fullWidth
          className="mb-2"
        />
      </div>

      {/* Buttons (Add and Remove) */}
      <div className="flex justify-between mt-2">
        {/* Remove button is shown only if there are more than 1 hotel */}
        {index !== 0 && hotels.length > 1 && (
          <button
          variant="contained"
          // color="secondary"
          className='bg-red-500 text-white p-2'
          onClick={() => removeHotel(index)}
        >
          Remove Hotel
        </button>
        )}

        {/* Add button shown only for the last hotel */}
        {index === hotels.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={addNewHotel}
          >
            + Add Another Hotel
          </Button>
        )}
      </div>
    </div>
  ))}



  {/* Bus Inputs */}
  {buses.map((bus, index) => (
    <div key={index} className="p-4 bg-gray-50">
      <h1 className="bg-gray-100 p-2 font-semibold text-mainColor flex justify-center">
        Bus Details
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TextField
          label="Transportation"
          value={bus.transportation}
          onChange={(e) => handleBusChange(index, "transportation", e.target.value)}
          fullWidth
          className="mb-2"
        />
        <TextField
          label="Seats"
          type="number"
          value={bus.seats}
          onChange={(e) => handleBusChange(index, "seats", e.target.value)}
          fullWidth
          className="mb-2"
        />
      </div>

      {/* Buttons (Add and Remove) */}
      <div className="flex justify-between mt-2">
        {/* Remove button is shown only if there are more than 1 bus */}
        {index !== 0 && buses.length > 1 && (
          <button
            variant="contained"
            // color="secondary"
            className='bg-red-500 text-white p-2'
            onClick={() => removeBus(index)}
          >
            Remove Bus
          </button>
        )}

        {/* Add button shown only for the last bus */}
        {index === buses.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={addNewBus}
          >
            + Add Another Bus
          </Button>
        )}
      </div>
    </div>
  ))}



                    {/* Bus Inputs */}
                    {/* {buses.map((bus, index) => (
                      <>
                      <h1 className='bg-gray-100 p-2 font-semibold text-mainColor flex justify-center'>Bus Details</h1>
                      <div key={index} className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-50">
                        
                        <TextField
                          label="Transportation"
                          value={bus.transportation}
                          onChange={(e) => handleBusChange(index, "transportation", e.target.value)}
                          fullWidth
                          className="mb-2"
                        />
                        <TextField
                          label="Seats"
                          type="number"
                          value={bus.seats}
                          onChange={(e) => handleBusChange(index, "seats", e.target.value)}
                          fullWidth
                          className="mb-2"
                        />
                        </div>
                      </>
                    ))}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addNewBus}
                      className="mb-4"
                    >
                      + Add Another Bus
                    </Button> */}

                  </div>
                )}
              </div>
            )}

            </div>
          </div>
        )}
        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600">
            Submit Booking
          </button>
        </div>
      </div>
    </form>
  );
};

export default ManualBooking;
