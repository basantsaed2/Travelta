import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox, FormControlLabel,
} from '@mui/material';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';

const NewRequest = () => {
  const [service, setService] = useState('');
  const [priority, setPriority] = useState('');

  const [stage, setStage] = useState('');

const [customerId, setCustomerId] = useState('');
const [adminAgentId, setAdminAgentId] = useState('');
const [serviceId, setServiceId] = useState('');
const [currencyId, setCurrencyId] = useState('');
const [expectedRevenue, setExpectedRevenue] = useState('');


  const {refetch: refetchList,loading: loadingList,data: paymentList,} = useGet({ url: "https://travelta.online/agent/request/lists" }); 
  const { postData:postDataHotel, loadingPost:loadingPostHotel, response:responseHotel } = usePost({url:"https://travelta.online/agent/request/add_hotel",});
  const { postData:postDataBus, loadingPost:loadingPostBus, response:responseBus } = usePost({url:"https://travelta.online/agent/request/add_bus",});
  const { postData:postDataVisa, loadingPost:loadingPostVisa, response:responseVisa } = usePost({url:"https://travelta.online/agent/request/add_visa",});
  const { postData:postDataFlight, loadingPost:loadingPostFlight, response:responseFlight } = usePost({url:"https://travelta.online/agent/request/add_flight",});
  const { postData:postDataTour, loadingPost:loadingPostTour, response:responseTour } = usePost({url:"https://travelta.online/agent/request/add_tour",});
  const [data,setData] = useState([]);
  const [customer,setCustomer] = useState([]);
  const [adminsAgent,setAdminsAgent] = useState([]);
  const [currencies,setCurrencies] = useState([]);
  const [priorities,setPriorities] = useState([]);
  const [stagies,setStagies] = useState([]);
  const [services,setServices] = useState([]);
  const [countries,setCounties] = useState([])
  const selectedService = services.find((service) => service.id === serviceId);

// hotel data 

const [checkIn, setCheckIn] = useState("");
const [checkOut, setCheckOut] = useState("");
const [nights, setNights] = useState("");
const [hotelName, setHotelName] = useState("");
const [roomType, setRoomType] = useState("");
const [roomQuantity, setRoomQuantity] = useState("");
const [adults, setAdults] = useState(false);
const [children, setChildren] = useState(false);
const [notes, setNotes] = useState("");

const [bookingData, setBookingData] = useState({
  adults: 0,
  children: 0,
  adult_data: [],
  child_data: [],
});

// Handle Adults Change
const handleAdultsChange = (e) => {
  const count = parseInt(e.target.value, 10) || 0;
  setBookingData((prev) => ({
    ...prev,
    adults: count,
    adult_data: Array.from({ length: count }, (_, i) => prev.adult_data[i] || { title: "", first_name: "", last_name: "" }),
  }));
};

// Handle Children Change
const handleChildrenChange = (e) => {
  const count = parseInt(e.target.value, 10) || 0;
  setBookingData((prev) => ({
    ...prev,
    children: count,
    child_data: Array.from({ length: count }, (_, i) => prev.child_data[i] || { age: "", first_name: "", last_name: "" }),
  }));
};


// Bus data 

const [from, setFrom] = useState('');
const [to, setTo] = useState('');
const [departure, setDeparture] = useState('');
const [arrival, setArrival] = useState('');
const [adultPrice, setAdultPrice] = useState(0);
const [childPrice, setChildPrice] = useState(0);
const [bus, setBus] = useState('');
const [busNumber, setBusNumber] = useState('');
const [driverPhone, setDriverPhone] = useState('');
const [notesBus, setNotesBus] = useState('');

const [bookingDataBus, setBookingDataBus] = useState({
  adults: 0,
  children: 0,
  adult_data: [],
  child_data: [],
});


  // Handlers for updating adults and children
  const handleAdultsBusChange = (e) => {
    const newAdults = e.target.value;
    setBookingDataBus((prevData) => {
      const updatedAdults = [...prevData.adult_data];
      if (newAdults > updatedAdults.length) {
        for (let i = updatedAdults.length; i < newAdults; i++) {
          updatedAdults.push({ title: '', first_name: '', last_name: '' });
        }
      } else {
        updatedAdults.splice(newAdults);
      }
      return { ...prevData, adults: newAdults, adult_data: updatedAdults };
    });
  };

  const handleChildrenBusChange = (e) => {
    const newChildren = e.target.value;
    setBookingDataBus((prevData) => {
      const updatedChildren = [...prevData.child_data];
      if (newChildren > updatedChildren.length) {
        for (let i = updatedChildren.length; i < newChildren; i++) {
          updatedChildren.push({ age: '', first_name: '', last_name: '' });
        }
      } else {
        updatedChildren.splice(newChildren);
      }
      return { ...prevData, children: newChildren, child_data: updatedChildren };
    });
  };

//data visa 

const [country, setCountry] = useState('');
const [travelDate, setTravelDate] = useState('');
const [appointmentDate, setAppointmentDate] = useState('');
const [notesVisa, setNotesVisa] = useState('');

const [bookingDataVisa, setBookingDataVisa] = useState({
  adults: 0,
  children: 0,
  adult_data: [],
  child_data: [],
});

const handleAdultsVisaChange = (e) => {
  const newAdults = e.target.value;
  setBookingDataVisa((prevData) => {
    const updatedAdults = [...prevData.adult_data];
    if (newAdults > updatedAdults.length) {
      for (let i = updatedAdults.length; i < newAdults; i++) {
        updatedAdults.push({ title: '', first_name: '', last_name: '' });
      }
    } else {
      updatedAdults.splice(newAdults);
    }
    return { ...prevData, adults: newAdults, adult_data: updatedAdults };
  });
};

const handleChildrenVisaChange = (e) => {
  const newChildren = e.target.value;
  setBookingDataVisa((prevData) => {
    const updatedChildren = [...prevData.child_data];
    if (newChildren > updatedChildren.length) {
      for (let i = updatedChildren.length; i < newChildren; i++) {
        updatedChildren.push({ age: '', first_name: '', last_name: '' });
      }
    } else {
      updatedChildren.splice(newChildren);
    }
    return { ...prevData, children: newChildren, child_data: updatedChildren };
  });
};

// data flight

const [typeFlight, setTypeFlight] = useState("");
const [directionFlight, setDirectionFlight] = useState("");
const [fromToFlight, setFromToFlight] = useState([{ from: "", to: "" }]);
const [departureFlight, setDepartureFlight] = useState("");
const [arrivalFlight, setArrivalFlight] = useState("");
const [flightClass, setFlightClass] = useState("");

const [infantsFlight, setInfantsFlight] = useState(0);
const [airlineFlight, setAirlineFlight] = useState("");
const [ticketNumberFlight, setTicketNumberFlight] = useState("");
const [adultPriceFlight, setAdultPriceFlight] = useState("");
const [childPriceFlight, setChildPriceFlight] = useState("");
const [refPnrFlight, setRefPnrFlight] = useState("");
const [notesFlight, setNotesFlight] = useState("");

const [bookingDataFlight, setBookingDataFlight] = useState({
  adults: 0,
  children: 0,
  adult_data: [],
  child_data: [],
});


const handleAdultsFlightChange = (e) => {
  const newAdults = e.target.value;
  setBookingDataFlight((prevData) => {
    const updatedAdults = [...prevData.adult_data];
    if (newAdults > updatedAdults.length) {
      for (let i = updatedAdults.length; i < newAdults; i++) {
        updatedAdults.push({ title: '', first_name: '', last_name: '' });
      }
    } else {
      updatedAdults.splice(newAdults);
    }
    return { ...prevData, adults: newAdults, adult_data: updatedAdults };
  });
};

const handleChildrenFlightChange = (e) => {
  const newChildren = e.target.value;
  setBookingDataFlight((prevData) => {
    const updatedChildren = [...prevData.child_data];
    if (newChildren > updatedChildren.length) {
      for (let i = updatedChildren.length; i < newChildren; i++) {
        updatedChildren.push({ age: '', first_name: '', last_name: '' });
      }
    } else {
      updatedChildren.splice(newChildren);
    }
    return { ...prevData, children: newChildren, child_data: updatedChildren };
  });
};

// data tour




useEffect(() => {
  refetchList()
}, [refetchList])

useEffect(() => {
  if(paymentList){
    setData(paymentList)
    setCustomer(paymentList.customers)
    setAdminsAgent(paymentList.admins_agent)
    setCurrencies(paymentList.currencies)
    setPriorities(paymentList.priority)
    setStagies(paymentList.stages)
    setServices(paymentList.services)
    setCounties(paymentList.countries);
  }
  console.log("data",paymentList)
}, [paymentList])

const handlePriorityChange = (e) => {
  setPriority(e.target.value);
};

const handleStageChange = (e) => {
  setStage(e.target.value);
};

const handleSubmit= (e) =>{
  e.preventDefault();
  const formData = new FormData();
  formData.append("customer_id", customerId);
  formData.append("admin_agent_id", adminAgentId);
  formData.append("currency_id", currencyId);
  formData.append("service_id", serviceId);
  formData.append("expected_revenue", expectedRevenue);
  formData.append("priority", priority);
  formData.append("stages", stage);
  // hotel
  if(selectedService?.service_name.toLowerCase() === 'hotel'){
    formData.append("check_in", checkIn);
    formData.append("check_out", checkOut);
    formData.append("nights", nights);
    formData.append("hotel_name", hotelName);
    formData.append("room_type", roomType);
    formData.append("room_quantity", roomQuantity);
    formData.append("adults",bookingData.adults );
    formData.append("childreen", bookingData.children);
  
    formData.append("notes", notes);
    formData.append("adult_data", JSON.stringify(bookingData.adult_data));
    formData.append("child_data", JSON.stringify(bookingData.child_data));
    postDataHotel(formData,"Hotel Added successful")
  }
  else if(selectedService?.service_name.toLowerCase() === 'bus'){
    formData.append("from", from);
    formData.append("to", to);
    formData.append("departure", departure);
    formData.append("arrival", arrival);
    formData.append("adults", bookingDataBus.adults);
    formData.append("childreen", bookingDataBus.children);
    formData.append("adult_price",adultPrice );
    formData.append("child_price", childPrice);

    formData.append("bus", bus);
    formData.append("bus_number",busNumber );
    formData.append("driver_phone", driverPhone);
  
    formData.append("notes", notesBus);
    formData.append("adult_data", JSON.stringify(bookingDataBus.adult_data));
    formData.append("child_data", JSON.stringify(bookingDataBus.child_data));
    postDataBus(formData,"Bus Added successful")
  }
  else if(selectedService?.service_name.toLowerCase() === 'visa'){
    formData.append("country", country);
    formData.append("travel_date", travelDate);
    formData.append("appointment_date", appointmentDate);
    formData.append("notes", notesVisa);
    formData.append("adults",bookingDataVisa.adults );
    formData.append("childreen", bookingDataVisa.children);

    formData.append("adult_data", JSON.stringify(bookingDataVisa.adult_data));
    formData.append("child_data", JSON.stringify(bookingDataVisa.child_data));
    postDataVisa(formData,"Visa Added successful")
  }
  else if(selectedService?.service_name.toLowerCase() === 'flight'){

    formData.append("type", typeFlight);
    formData.append("direction", directionFlight);
    formData.append("from_to", JSON.stringify(fromToFlight));
    formData.append("departure", departureFlight);
    formData.append("adults",bookingDataFlight.adults );
    formData.append("childreen", bookingDataFlight.children);

    formData.append("arrival", arrivalFlight);
    formData.append("class", flightClass);
    formData.append("infants", infantsFlight);

    formData.append("airline", airlineFlight);
    formData.append("ticket_number", ticketNumberFlight);

    formData.append("adult_price", adultPriceFlight);
    formData.append("child_price", childPriceFlight);

    
    formData.append("ref_pnr", refPnrFlight);
    formData.append("notes", notesFlight);

    formData.append("adult_data", JSON.stringify(bookingDataFlight.adult_data));
    formData.append("child_data", JSON.stringify(bookingDataFlight.child_data));
    postDataFlight(formData,"Flight Added successful")

  }



  

}


  return (
    <div className=" p-6 shadow-4xl mt-7 rounded-lg space-y-6">
      {/* Header */}
      <div className="mb-6">
    <div className="flex justify-between items-center">
    <p className="text-2xl mt-4 font-semibold">New Request</p>
    <button
         
          className="text-white w-[30%] p-3 bg-mainColor py-5 rounded-md font-bold"
          
        >
          + Add New Lead
        </button>
        
    </div>
        <div className="border-b-2 border-gray-300 mt-2"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6  space-y-6">
        {/* Lead/Customer */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium w-1/4">Lead/Customer:</label>
          <div className=" w-full">
            <TextField
              select
              fullWidth
              variant="outlined"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              label="Select Customer"
              className=" shadow-lg border-gray-300"
              required
            >
              {loadingList ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                customer.map((cus) => (
                  <MenuItem key={cus.id} value={cus.id}>
                    {cus.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </div>
        </div>

        {/* Agent */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium w-1/4">Agent:</label>
          {/* admin Dropdown */}
          <div className=" w-full">
            <TextField
              select
              fullWidth
              variant="outlined"
              value={adminAgentId}
              onChange={(e) => setAdminAgentId(e.target.value)}
              label="Select Admin agent"
              className=" shadow-lg border-gray-300"
              required
            >
              {loadingList ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                adminsAgent.map((admin) => (
                  <MenuItem key={admin.id} value={admin.id}>
                    {admin.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center md:items-start sm:items-start gap-4">
      <label className="text-lg font-medium lg:w-1/4">Expected Revenue:</label>
      <TextField
      type='number'
        variant="outlined"
        placeholder="Expected revenue"
        fullWidth
        value={expectedRevenue}
        onChange={(e) => setExpectedRevenue(e.target.value)}
      />
    </div>

        {/* Currency */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium w-1/4">Currency:</label>
        {/* currency Dropdown */}
        <div className=" w-full">
            <TextField
              select
              fullWidth
              variant="outlined"
              value={currencyId}
              onChange={(e) => setCurrencyId(e.target.value)}
              label="Select currency"
              className=" shadow-lg border-gray-300"
              required
            >
              {loadingList ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                currencies.map((cur) => (
                  <MenuItem key={cur.id} value={cur.id}>
                    {cur.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </div>
        </div>

        {/* Priority */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center md:items-start sm:items-start gap-4">
      <label className="text-lg font-medium w-1/4">Priority:</label>
      {/* Priority Dropdown */}
      <div className="w-full">
        <TextField
          select
          fullWidth
          variant="outlined"
          value={priority}
          onChange={handlePriorityChange}
          label="Select Priority"
          className="shadow-lg border-gray-300"
          required
        >
          {loadingList ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            priorities.map((pri, index) => (
              <MenuItem key={index} value={pri}>
                {pri}
              </MenuItem>
            ))
          )}
        </TextField>
      </div>
    </div>
 
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center md:items-start sm:items-start gap-4">
      <label className="text-lg font-medium w-1/4">Stage:</label>
      {/* Priority Dropdown */}
      <div className="w-full">
        <TextField
          select
          fullWidth
          variant="outlined"
          value={stage}
          onChange={handleStageChange}
          label="Select Stage"
          className="shadow-lg border-gray-300"
          required
        >
          {loadingList ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            stagies.map((sta, index) => (
              <MenuItem key={index} value={sta}>
                {sta}
              </MenuItem>
            ))
          )}
        </TextField>
      </div>
  
        </div>

        {/* Service */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium w-1/4">Select Service:</label>
          <div className=" w-full">
            <TextField
              select
              fullWidth
              variant="outlined"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              label="Select Services"
              className=" shadow-lg border-gray-300"
              required
            >
              {loadingList ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                services.map((ser) => (
                  <MenuItem key={ser.id} value={ser.id}>
                    {ser.service_name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </div>
        </div>

      {/* Conditionally render content based on service_name */}
      {selectedService?.service_name.toLowerCase() === 'visa' && (
        <div>
   <div className="space-y-6 p-4">
  {/* Country */}
  {/* Country Dropdown */}
  <div className="mb-6 w-full">
            <TextField
              select
              fullWidth
              variant="outlined"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              label="Select Country"
              className="mb-6 shadow-lg border-gray-300"
              required
            >
              {loadingList ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                countries.map((country) => (
                  <MenuItem key={country.id} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </div>

  {/* Travel Date */}
  <div>
    <TextField
      label="Travel Date"
      variant="outlined"
      type="date"
      fullWidth
      value={travelDate}
      onChange={(e) => setTravelDate(e.target.value)}
      className="mt-2"
      InputLabelProps={{
        shrink: true,
      }}
    />
  </div>

  {/* Appointment Date */}
  <div>
    <TextField
      label="Appointment Date"
      variant="outlined"
      type="date"
      fullWidth
      value={appointmentDate}
      onChange={(e) => setAppointmentDate(e.target.value)}
      className="mt-2"
      InputLabelProps={{
        shrink: true,
      }}
    />
  </div>

  {/* Notes */}
  <div>
    <TextField
      label="Notes"
      variant="outlined"
      multiline
      rows={4}
      fullWidth
      value={notesVisa}
      onChange={(e) => setNotesVisa(e.target.value)}
      className="mt-2"
    />
  </div>

  {/* Number of Adults */}
  <div>
    <TextField
      label="Number of Adults"
      variant="outlined"
      type="number"
      fullWidth
      value={bookingDataVisa.adults}
      onChange={handleAdultsVisaChange}
      min="0"
      className="mt-2"
    />
  </div>

   {/* Adult Data */}
   {bookingDataVisa.adults > 0 &&
    bookingDataVisa.adult_data.map((adult, index) => (
      <div className='' key={index}>
        <h4 className="text-lg font-semibold">Adult {index + 1}</h4>
        <TextField
              select
              fullWidth
              label="Title"
              value={adult.title}
              onChange={(e) => {
                const updatedAdults = [...bookingDataVisa.adult_data];
                updatedAdults[index].title = e.target.value;
                setBookingDataVisa((prevData) => ({ ...prevData, adult_data: updatedAdults }));
              }}
              margin="normal"
            >
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Mrs">Mrs</MenuItem>
              <MenuItem value="Ms">Ms</MenuItem>
            </TextField>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          value={adult.first_name}
          onChange={(e) => {
            const updatedAdults = [...bookingDataVisa.adult_data];
            updatedAdults[index].first_name = e.target.value;
            setBookingDataVisa((prevData) => ({
              ...prevData,
              adult_data: updatedAdults,
            }));
          }}
          className="mt-2"
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          value={adult.last_name}
          onChange={(e) => {
            const updatedAdults = [...bookingDataVisa.adult_data];
            updatedAdults[index].last_name = e.target.value;
            setBookingDataVisa((prevData) => ({
              ...prevData,
              adult_data: updatedAdults,
            }));
          }}
          className="mt-2"
        />
      </div>
    ))}

  {/* Number of Children */}
  <div>
    <TextField
      label="Number of Children"
      variant="outlined"
      type="number"
      fullWidth
      value={bookingDataVisa.children}
      onChange={handleChildrenVisaChange}
      min="0"
      className="mt-2"
    />
  </div>

 

  {/* Child Data */}
  {bookingDataVisa.children > 0 &&
    bookingDataVisa.child_data.map((child, index) => (
      <div key={index}>
        <h4 className="text-lg font-semibold">Child {index + 1}</h4>
        <TextField
          label="Age"
          variant="outlined"
          type="number"
          fullWidth
          value={child.age}
          onChange={(e) => {
            const updatedChildren = [...bookingDataVisa.child_data];
            updatedChildren[index].age = e.target.value;
            setBookingDataVisa((prevData) => ({
              ...prevData,
              child_data: updatedChildren,
            }));
          }}
          className="mt-2"
        />
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          value={child.first_name}
          onChange={(e) => {
            const updatedChildren = [...bookingDataVisa.child_data];
            updatedChildren[index].first_name = e.target.value;
            setBookingDataVisa((prevData) => ({
              ...prevData,
              child_data: updatedChildren,
            }));
          }}
          className="mt-2"
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          value={child.last_name}
          onChange={(e) => {
            const updatedChildren = [...bookingDataVisa.child_data];
            updatedChildren[index].last_name = e.target.value;
            setBookingDataVisa((prevData) => ({
              ...prevData,
              child_data: updatedChildren,
            }));
          }}
          className="mt-2"
        />
      </div>
    ))}
</div>
        </div>
      )}

{selectedService?.service_name.toLowerCase() === 'flight' && (
  <div>
    <div>
      {/* Flight Type */}
      <TextField
        fullWidth
        select
        label="Flight Type"
        value={typeFlight}
        onChange={(e) => setTypeFlight(e.target.value)}
        margin="normal"
      >
        <MenuItem value="domestic">Domestic</MenuItem>
        <MenuItem value="international">International</MenuItem>
      </TextField>

      {/* Flight Direction */}
      <TextField
        fullWidth
        select
        label="Direction"
        value={directionFlight}
        onChange={(e) => setDirectionFlight(e.target.value)}
        margin="normal"
      >
        <MenuItem value="one_way">One Way</MenuItem>
        <MenuItem value="round_trip">Round Trip</MenuItem>
        <MenuItem value="multi_city">Multi-City</MenuItem>
      </TextField>

      {/* From-To Inputs */}
      {fromToFlight.map((flight, index) => (
        <div key={index} className="p-2 border rounded my-2">
          <TextField
            fullWidth
            label="From"
            value={flight.from}
            onChange={(e) => {
              const updatedFlights = [...fromToFlight];
              updatedFlights[index].from = e.target.value;
              setFromToFlight(updatedFlights);
            }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="To"
            value={flight.to}
            onChange={(e) => {
              const updatedFlights = [...fromToFlight];
              updatedFlights[index].to = e.target.value;
              setFromToFlight(updatedFlights);
            }}
            margin="normal"
          />
          {directionFlight === 'multi_city' && (
            <Button onClick={() => setFromToFlight(fromToFlight.filter((_, i) => i !== index))}>
              Remove Trip
            </Button>
          )}
        </div>
      ))}

      {directionFlight === 'multi_city' && (
        <Button onClick={() => setFromToFlight([...fromToFlight, { from: '', to: '' }])}>
          Add Trip
        </Button>
      )}

      {/* Date Inputs */}
      <TextField
        fullWidth
        label="Departure"
        type="datetime-local"
        value={departureFlight}
        onChange={(e) => setDepartureFlight(e.target.value)}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      {directionFlight === 'round_trip' && (
        <TextField
          fullWidth
          label="Arrival"
          type="datetime-local"
          value={arrivalFlight}
          onChange={(e) => setArrivalFlight(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      )}
       {directionFlight === 'multi_city' && (
        <TextField
          fullWidth
          label="Arrival"
          type="datetime-local"
          value={arrivalFlight}
          onChange={(e) => setArrivalFlight(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      )}

      {/* Other Flight Details */}
      <TextField fullWidth label="Class" value={flightClass} onChange={(e) => setFlightClass(e.target.value)} margin="normal" />
      <TextField fullWidth label="Airline" value={airlineFlight} onChange={(e) => setAirlineFlight(e.target.value)} margin="normal" />
      <TextField fullWidth label="Ticket Number" value={ticketNumberFlight} onChange={(e) => setTicketNumberFlight(e.target.value)} margin="normal" />
      
      <TextField fullWidth label="Infants" value={infantsFlight} onChange={(e) => setInfantsFlight(e.target.value)} margin="normal" />
      <TextField fullWidth label="Ref Pnr" value={refPnrFlight} onChange={(e) => setRefPnrFlight(e.target.value)} margin="normal" />
      {/* Price Inputs */}
      <TextField fullWidth label="Adult Price" type="number" value={adultPriceFlight} onChange={(e) => setAdultPriceFlight(e.target.value)} margin="normal" />
      <TextField fullWidth label="Child Price" type="number" value={childPriceFlight} onChange={(e) => setChildPriceFlight(e.target.value)} margin="normal" />
      
      {/* Passenger Inputs */}
      <TextField fullWidth label="Number of Adults" type="number" value={bookingDataFlight.adults} onChange={handleAdultsFlightChange} margin="normal" />
      {bookingDataFlight.adults > 0 && bookingDataFlight.adult_data.map((adult, index) => (
        <div key={index} className="p-2 border rounded my-2">
          <h4>Adult {index + 1}</h4>
          <TextField
              select
              fullWidth
              label="Title"
              value={adult.title}
              onChange={(e) => {
                const updatedAdults = [...bookingDataFlight.adult_data];
                updatedAdults[index].title = e.target.value;
                setBookingDataFlight((prevData) => ({ ...prevData, adult_data: updatedAdults }));
              }}
              margin="normal"
            >
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Mrs">Mrs</MenuItem>
              <MenuItem value="Ms">Ms</MenuItem>
            </TextField>


          <TextField fullWidth label="First Name" value={adult.first_name} onChange={(e) => {
            const updatedAdults = [...bookingDataFlight.adult_data];
            updatedAdults[index].first_name = e.target.value;
            setBookingDataFlight((prevData) => ({ ...prevData, adult_data: updatedAdults }));
          }} margin="normal" />
          <TextField fullWidth label="Last Name" value={adult.last_name} onChange={(e) => {
            const updatedAdults = [...bookingDataFlight.adult_data];
            updatedAdults[index].last_name = e.target.value;
            setBookingDataFlight((prevData) => ({ ...prevData, adult_data: updatedAdults }));
          }} margin="normal" />
        </div>
      ))}
      
      <TextField fullWidth label="Number of Children" type="number" value={bookingDataFlight.children} onChange={handleChildrenFlightChange} margin="normal" />
      {bookingDataFlight.children > 0 && bookingDataFlight.child_data.map((child, index) => (
        <div key={index} className="p-2 border rounded my-2">
          <h4>Child {index + 1}</h4>
          <TextField fullWidth label="Age" type="number" value={child.age} onChange={(e) => {
            const updatedChildren = [...bookingDataFlight.child_data];
            updatedChildren[index].age = e.target.value;
            setBookingDataFlight((prevData) => ({ ...prevData, child_data: updatedChildren }));
          }} margin="normal" />
          <TextField fullWidth label="First Name" value={child.first_name} onChange={(e) => {
            const updatedChildren = [...bookingDataFlight.child_data];
            updatedChildren[index].first_name = e.target.value;
            setBookingDataFlight((prevData) => ({ ...prevData, child_data: updatedChildren }));
          }} margin="normal" />
          <TextField fullWidth label="Last Name" value={child.last_name} onChange={(e) => {
            const updatedChildren = [...bookingDataFlight.child_data];
            updatedChildren[index].last_name = e.target.value;
            setBookingDataFlight((prevData) => ({ ...prevData, child_data: updatedChildren }));
          }} margin="normal" />
        </div>
      ))}
      
      {/* Notes */}
      <TextField fullWidth label="Notes" multiline rows={3} value={notesFlight} onChange={(e) => setNotesFlight(e.target.value)} margin="normal" />
    </div>
  </div>
)}


      {selectedService?.service_name.toLowerCase() === 'hotel' && (
        <div>

      {/* Basic Inputs */}
      <TextField fullWidth label="Check-in Date" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} margin="normal" InputLabelProps={{ shrink: true }}/>
      <TextField fullWidth label="Check-out Date" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} margin="normal" InputLabelProps={{ shrink: true }}/>
      <TextField fullWidth label="Nights" type="number" value={nights} onChange={(e) => setNights(e.target.value)} margin="normal"/>
      <TextField fullWidth label="Hotel Name" value={hotelName} onChange={(e) => setHotelName(e.target.value)} margin="normal"/>
      <TextField fullWidth label="Room Type" value={roomType} onChange={(e) => setRoomType(e.target.value)} margin="normal"/>
      <TextField fullWidth label="Room Quantity" type="number" value={roomQuantity} onChange={(e) => setRoomQuantity(e.target.value)} margin="normal" />

      {/* Adults Input */}
      <TextField fullWidth label="Number of Adults" type="number" value={bookingData.adults} onChange={handleAdultsChange} margin="normal" />

      {/* Adult Inputs */}
      {bookingData.adults > 0 &&
        bookingData.adult_data.map((adult, index) => (
          <div key={index} className="p-2 border rounded my-2">
            <h4 className="font-semibold">Adult {index + 1}</h4>
            <TextField select fullWidth label="Title" value={adult.title} onChange={(e) => {
              const updatedAdults = [...bookingData.adult_data];
              updatedAdults[index].title = e.target.value;
              setBookingData({ ...bookingData, adult_data: updatedAdults });
            }} margin="normal">
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Mrs">Mrs</MenuItem>
              <MenuItem value="Ms">Ms</MenuItem>
            </TextField>
            
            <TextField fullWidth label="First Name" value={adult.first_name} onChange={(e) => {
              const updatedAdults = [...bookingData.adult_data];
              updatedAdults[index].first_name = e.target.value;
              setBookingData({ ...bookingData, adult_data: updatedAdults });
            }} margin="normal" />

            <TextField fullWidth label="Last Name" value={adult.last_name} onChange={(e) => {
              const updatedAdults = [...bookingData.adult_data];
              updatedAdults[index].last_name = e.target.value;
              setBookingData({ ...bookingData, adult_data: updatedAdults });
            }} margin="normal" />

          </div>
        ))}

      {/* Children Input */}
      <TextField fullWidth label="Number of Children" type="number" value={bookingData.children} onChange={handleChildrenChange} margin="normal" />

      {/* Child Inputs */}
      {bookingData.children > 0 &&
        bookingData.child_data.map((child, index) => (
          <div key={index} className="p-2 border rounded my-2">
            <h4 className="font-semibold">Child {index + 1}</h4>
            <TextField fullWidth label="Age" type="number" value={child.age} onChange={(e) => {
              const updatedChildren = [...bookingData.child_data];
              updatedChildren[index].age = e.target.value;
              setBookingData({ ...bookingData, child_data: updatedChildren });
            }} margin="normal" />

            <TextField fullWidth label="First Name" value={child.first_name} onChange={(e) => {
              const updatedChildren = [...bookingData.child_data];
              updatedChildren[index].first_name = e.target.value;
              setBookingData({ ...bookingData, child_data: updatedChildren });
            }} margin="normal" />

            <TextField fullWidth label="Last Name" value={child.last_name} onChange={(e) => {
              const updatedChildren = [...bookingData.child_data];
              updatedChildren[index].last_name = e.target.value;
              setBookingData({ ...bookingData, child_data: updatedChildren });
            }} margin="normal" />

          </div>
        ))}

      {/* Notes */}
      <TextField fullWidth label="Notes" multiline rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} margin="normal" />

        </div>
      )}

     {selectedService?.service_name.toLowerCase() === 'tour' && (
        <div>
          <h2>Hotel Reservations</h2>
          <p>Find and book hotels at great rates.</p>
        </div>
      )}
    {selectedService?.service_name.toLowerCase() === 'bus' && (
  <div>
     <div>
      {/* Basic Inputs */}
      <TextField
        fullWidth
        label="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Departure"
        type="datetime-local"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        label="Arrival"
        type="datetime-local"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      {/* Price Inputs */}
      <TextField
        fullWidth
        label="Adult Price"
        type="number"
        value={adultPrice}
        onChange={(e) => setAdultPrice(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Child Price"
        type="number"
        value={childPrice}
        onChange={(e) => setChildPrice(e.target.value)}
        margin="normal"
      />

      {/* Bus Details */}
      <TextField
        fullWidth
        label="Bus"
        value={bus}
        onChange={(e) => setBus(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Bus Number"
        value={busNumber}
        onChange={(e) => setBusNumber(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Driver Phone"
        value={driverPhone}
        onChange={(e) => setDriverPhone(e.target.value)}
        margin="normal"
      />

      {/* Adults Input */}
      <TextField
        fullWidth
        label="Number of Adults"
        type="number"
        value={bookingDataBus.adults}
        onChange={handleAdultsBusChange}
        margin="normal"
      />

      {/* Adult Inputs */}
      {bookingDataBus.adults > 0 &&
        bookingDataBus.adult_data.map((adult, index) => (
          <div key={index} className="p-2 border rounded my-2">
            <h4 className="font-semibold">Adult {index + 1}</h4>
            <TextField
              select
              fullWidth
              label="Title"
              value={adult.title}
              onChange={(e) => {
                const updatedAdults = [...bookingDataBus.adult_data];
                updatedAdults[index].title = e.target.value;
                setBookingDataBus((prevData) => ({ ...prevData, adult_data: updatedAdults }));
              }}
              margin="normal"
            >
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Mrs">Mrs</MenuItem>
              <MenuItem value="Ms">Ms</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="First Name"
              value={adult.first_name}
              onChange={(e) => {
                const updatedAdults = [...bookingDataBus.adult_data];
                updatedAdults[index].first_name = e.target.value;
                setBookingDataBus((prevData) => ({ ...prevData, adult_data: updatedAdults }));
              }}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Last Name"
              value={adult.last_name}
              onChange={(e) => {
                const updatedAdults = [...bookingDataBus.adult_data];
                updatedAdults[index].last_name = e.target.value;
                setBookingDataBus((prevData) => ({ ...prevData, adult_data: updatedAdults }));
              }}
              margin="normal"
            />
          </div>
        ))}

      {/* Children Input */}
      <TextField
        fullWidth
        label="Number of Children"
        type="number"
        value={bookingDataBus.children}
        onChange={handleChildrenBusChange}
        margin="normal"
      />

      {/* Child Inputs */}
      {bookingDataBus.children > 0 &&
        bookingDataBus.child_data.map((child, index) => (
          <div key={index} className="p-2 border rounded my-2">
            <h4 className="font-semibold">Child {index + 1}</h4>
            <TextField
              fullWidth
              label="Age"
              type="number"
              value={child.age}
              onChange={(e) => {
                const updatedChildren = [...bookingDataBus.child_data];
                updatedChildren[index].age = e.target.value;
                setBookingDataBus((prevData) => ({ ...prevData, child_data: updatedChildren }));
              }}
              margin="normal"
            />

            <TextField
              fullWidth
              label="First Name"
              value={child.first_name}
              onChange={(e) => {
                const updatedChildren = [...bookingDataBus.child_data];
                updatedChildren[index].first_name = e.target.value;
                setBookingDataBus((prevData) => ({ ...prevData, child_data: updatedChildren }));
              }}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Last Name"
              value={child.last_name}
              onChange={(e) => {
                const updatedChildren = [...bookingDataBus.child_data];
                updatedChildren[index].last_name = e.target.value;
                setBookingDataBus((prevData) => ({ ...prevData, child_data: updatedChildren }));
              }}
              margin="normal"
            />
          </div>
        ))}

      {/* Notes */}
      <TextField
        fullWidth
        label="Notes"
        multiline
        rows={3}
        value={notesBus}
        onChange={(e) => setNotesBus(e.target.value)}
        margin="normal"
      />
    </div>
  </div>
)}
        {/* Details */}
        {/* <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium w-1/4">Details:</label>
          <TextField
            variant="outlined"
            placeholder="Enter details"
            multiline
            rows={3}
            fullWidth
          />
        </div> */}

  

        {/* Stages */}
 
       <div className="flex flex-end justify-end">
       <button type='submit' className='bg-mainColor text-white py-2 px-8 rounded-md'>
            Submit
        </button>
       </div>
      </form>
    </div>
  );
};

export default NewRequest;
