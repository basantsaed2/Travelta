import React, { useState , useEffect} from 'react';
import { TextField, MenuItem, Switch, selectClasses } from '@mui/material';
import { useGet } from '../../../Hooks/useGet';
import { usePost } from '../../../Hooks/usePostJson';
import { useAuth } from '../../../Context/Auth';
import axios from 'axios';
import { MdAttachMoney } from "react-icons/md";
import { FiPercent } from "react-icons/fi";

const ManualBooking = ({ refetch, setUpdate }) => {
    const { refetch: refetchBookingList, loading: loadingBookingList, data: bookingListData } = useGet({url:'https://travelta.online/agent/manual_booking/lists'});
    const { refetch: refetchSuppliers, loading: loadingSuppliers, data: suppliersData } = useGet({url:'https://travelta.online/agent/manual_booking/supplier_customer'});
    const [suppliers, setSuppliers] = useState([])
    const [customers, setCustomers] = useState([])
    const [secondMenuData, setSecondMenuData] = useState([]); // Data for the second dropdown
    const [category, setCategory] = useState(''); // To track B2B or B2C
    const [selectedToSupplier, setSelectedToSupplier] = useState(''); // To track the selected supplier or customer
    const [bookingList, setBookingList] = useState([])

    const [selectedService, setSelectedService] = useState(''); // Selected service
    const { refetch: refetchCustomerServices, loading: loadingCustomerServices, data: customerServicesData } = useGet({
        url: selectedService ? `https://travelta.online/agent/manual_booking/service_supplier?service_id=${selectedService}` : ''
    });    const [services, setServices] = useState([])
    const [customerServices, setCustomerServices] = useState([])
    const [selectedFromSupplier, setSelectedFromSupplier] = useState(''); // To track the selected supplier or customer

    const [cost, setCost] = useState(''); // To track the selected supplier or customer
    const [price, setPrice] = useState(''); // To track the selected supplier or customer
    const [totalPrice, setTotalPrice] = useState(''); // To track the selected supplier or customer

    const [selectedCountry, setSelectedCountry] = useState(''); // Selected service
    const { refetch: refetchTaxes, loading: loadingTaxes, data: taxesData } = useGet({
        url: selectedCountry ? `https://travelta.online/agent/manual_booking/taxes?country_id=${selectedCountry}` : ''
    });
    const [taxes, setTaxes] = useState([])
    const [countries, setCountries] = useState([])
    const [selectedTax, setSelectedTax] = useState('');

    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState([])


    const auth = useAuth();

    const [isPercentage, setIsPercentage] = useState(1); // 1 for %, 0 for $

    const handleSwitchChange = () => {
      setIsPercentage((prev) => (prev === 1 ? 0 : 1)); // Toggle between 1 and 0
    };


    const taxesType = [
        { value: 'include', label: 'Include' },
        { value: 'exclude', label: 'Exclude' },
    ];
    const [selectedTaxType, setSelectedTaxType] = useState('');

    const [details, setDetails] = useState({
    tour: false,
    bus: false,
    visa: false,
    hotel: false,
  });

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
          

    const [locations, setLocations] = useState({
        from: { value: '', details: '' },
        to: { value: '', details: '' },
    });

  const [visibleSection, setVisibleSection] = useState('');

  const toggleSection = (section) => {
    setVisibleSection(visibleSection === section ? '' : section);
  };

  const handleLocationChange = (key, field, value) => {
    setLocations({
      ...locations,
      [key]: { ...locations[key], [field]: value },
    });
  };

  const locationOptions = [
    { label: 'New York', value: 'new_york' },
    { label: 'Los Angeles', value: 'los_angeles' },
    { label: 'Chicago', value: 'chicago' },
    { label: 'Houston', value: 'houston' },
  ];

  return (
    <div className="bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg w-full p-8">
        {/* <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Manual Booking</h1> */}

        {/* To Section */}
        <button
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
                >
                {secondMenuData.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                    {item.name || item.agent}
                    </MenuItem>
                ))}
                </TextField>
          </div>
        )}


        {/* From Section */}
        <button
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
                className="mb-6"
                >
                {services.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                    {service.service_name}
                    </MenuItem>
                ))}
                </TextField>

                {/* Second Dropdown: Select Customer based on selected service */}
                <TextField
                select
                fullWidth
                variant="outlined"
                label="Select Customer"
                disabled={!selectedService} // Disable until service is selected
                className="mb-6"
                value={selectedFromSupplier}
                onChange={(e) => setSelectedFromSupplier(e.target.value)} // Update the selected service                }
                onClick={(e) => {
                    if (!selectedService) {
                      // Show alert if no service is selected
                      auth.toastError('Please select a service first');
                    }
                  }}                >
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
                    label="Cost"
                    variant="outlined"
                    fullWidth
                    required
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                />

                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)} // Update the selected service                }
                    label="Select Country"
                    className="mb-6"
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
                select
                fullWidth
                variant="outlined"
                label="Select Taxes"
                disabled={!selectedCountry} // Disable until service is selected
                className="mb-6"
                value={selectedTax}
                onChange={(e) => setSelectedTax(e.target.value)} // Update the selected service                }
                >
                {taxes.length > 0 ? (
                    taxes.map((tax) => (
                    <MenuItem key={tax.id} value={tax.id}>
                        {tax.name}
                    </MenuItem>
                    ))
                ) : (
                    <MenuItem value="">
                    <em>No Taxes available</em>
                    </MenuItem>
                )}
                </TextField>

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

                 {/* Switch Button with Icons */}
                <div className='flex items-center'>
                    <span className='text-mainColor font-semibold'>Mark Up : </span>
                    <MdAttachMoney  className={`ml-2 ${isPercentage ? 'text-gray-500' : 'text-green-500'}`}/>
                    <Switch
                    checked={isPercentage === 1}
                    onChange={handleSwitchChange}
                    color="primary"
                    />
                    <FiPercent className={`ml-2 ${isPercentage ? 'text-blue-500' : 'text-gray-500'}`} />
                </div>

                <TextField
                    label="Total Price"
                    variant="outlined"
                    fullWidth
                    required
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                />
          </div>
        )}

        {/* Details Section */}

        <button
          onClick={() => toggleSection('details')}
          className="w-full text-left px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md  hover:bg-gray-300 mb-4 transition-all duration-300"
        >
          Details
        </button>
        {visibleSection === 'details' && (
          <div>
            <div className="space-y-4">

            {/* Hotel Details */}
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <button
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
                        onAbort={(e) => setTotalNights(e.target.value)}
                        variant="outlined"
                        type="number"
                        placeholder="Enter total nights"
                        className="w-full"
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
                        />
                        
                    </div>
                    )}

              </div>

            {/* Bus Details */}
            <div className="border rounded-lg overflow-hidden shadow-lg">
                <button
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
                        variant="outlined"
                        placeholder="Enter departure city"
                        className="w-full"
                        />

                        {/* To */}
                        <TextField
                        fullWidth
                        label="To"
                        variant="outlined"
                        placeholder="Enter destination city"
                        className="w-full"
                        />

                        {/* Departure */}
                        <TextField
                        fullWidth
                        label="Departure Date & Time"
                        variant="outlined"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        className="w-full"
                        />

                        {/* Arrival */}
                        <TextField
                        fullWidth
                        label="Arrival Date & Time"
                        variant="outlined"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        className="w-full"
                        />

                        {/* Adults */}
                        <TextField
                        fullWidth
                        label="Adults"
                        variant="outlined"
                        type="number"
                        placeholder="Enter number of adults"
                        className="w-full"
                        />

                        {/* Children */}
                        <TextField
                        fullWidth
                        label="Children"
                        variant="outlined"
                        type="number"
                        placeholder="Enter number of children"
                        className="w-full"
                        />

                        {/* Adult Price */}
                        <TextField
                        fullWidth
                        label="Adult Price"
                        variant="outlined"
                        type="number"
                        placeholder="Enter price per adult"
                        className="w-full"
                        />

                        {/* Child Price */}
                        <TextField
                        fullWidth
                        label="Child Price"
                        variant="outlined"
                        type="number"
                        placeholder="Enter price per child"
                        className="w-full"
                        />

                        {/* Bus Name */}
                        <TextField
                        fullWidth
                        label="Bus Name"
                        variant="outlined"
                        placeholder="Enter bus name"
                        className="w-full"
                        />

                        {/* Bus Number */}
                        <TextField
                        fullWidth
                        label="Bus Number"
                        variant="outlined"
                        placeholder="Enter bus number"
                        className="w-full"
                        />

                        {/* Driver Phone */}
                        <TextField
                        fullWidth
                        label="Driver Phone"
                        variant="outlined"
                        placeholder="Enter driver phone number"
                        className="w-full"
                        />
                    </div>
                )}

              </div>


              {/* Tour Details */}
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <button
                  onClick={() => setDetails({ ...details, tour: !details.tour })}
                  className="w-full flex justify-between items-center px-6 py-3 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all duration-300"
                >
                  <span>Tour Details</span>
                  <span>{details.tour ? '-' : '+'}</span>
                </button>
                {details.tour && (
                  <div className="p-4 bg-gray-50">
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      placeholder="Enter tour details..."
                    ></textarea>
                  </div>
                )}
              </div>

              {/* Visa Details */}
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <button
                  onClick={() => setDetails({ ...details, visa: !details.visa })}
                  className="w-full flex justify-between items-center px-6 py-3 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all duration-300"
                >
                  <span>Visa Details</span>
                  <span>{details.visa ? '-' : '+'}</span>
                </button>
                {details.visa && (
                  <div className="p-4 bg-gray-50">
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      placeholder="Enter visa details..."
                    ></textarea>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600">
            Submit Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualBooking;
