import React, { useState, useEffect} from "react";
import {TextField,MenuItem,Autocomplete,CircularProgress} from "@mui/material";
import { useGet } from "../../../../Hooks/useGet";
import { usePost } from "../../../../Hooks/usePostJson";
import { useAuth } from "../../../../Context/Auth";
import { AddLeadPage } from "../../../AllPages";
import { Link, useNavigate } from 'react-router-dom';
import VisaServicePage from "../../Booking/Services/VisaServicePage";
import FlightServicePage from "../../Booking/Services/FlightServicePage";
import HotelServicePage from "../../Booking/Services/HotelServicePage";
import BusServicePage from "../../Booking/Services/BusServicePage";
import TourServicePage from "../../Booking/Services/TourServicePage";
import { createFilterOptions } from "@mui/material/Autocomplete";

const AddRequestPage = () => {
  const auth = useAuth();
  const { refetch: refetchList,loading: loadingList,data: requestList,} = useGet({ url: "https://travelta.online/agent/request/lists" });
  const {postData: postDataHotel,loadingPost: loadingPostHotel,response: responseHotel,} = usePost({ url: "https://travelta.online/agent/request/add_hotel" });
  const {postData: postDataBus,loadingPost: loadingPostBus,response: responseBus,} = usePost({ url: "https://travelta.online/agent/request/add_bus" });
  const {postData: postDataVisa,loadingPost: loadingPostVisa,response: responseVisa,} = usePost({ url: "https://travelta.online/agent/request/add_visa" });
  const {postData: postDataFlight,loadingPost: loadingPostFlight,response: responseFlight,} = usePost({ url: "https://travelta.online/agent/request/add_flight" });
  const {postData: postDataTour,loadingPost: loadingPostTour,response: responseTour,} = usePost({ url: "https://travelta.online/agent/request/add_tour" });
  const filter = createFilterOptions();
  const today = new Date().toISOString().slice(0, 10);

  const [services, setServices] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [countries, setCountries] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [adminsAgent, setAdminsAgent] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const [selectedService, setSelectedService] = useState("");
  const [selectedCustomer, setSelectCustomer] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [expectedRevenue, setExpectedRevenue] = useState("");

  const title = ["Mr", "Mrs", "Ms"];

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
  const [tourAdultPrice, setTourAdultPrice] = useState("");
  const [tourChildPrice, setTourChildPrice] = useState("");
  const [tourChildrenNumber, setTourChildrenNumber] = useState('');
  const [tourAdultsNumber, setTourAdultsNumber] = useState('');
  const [tourAdults, setTourAdults] = useState([]);
  const [tourChildren, setTourChildren] = useState([]);
  const [notesTour, setNotesTour] = useState("");
  const [buses, setBuses] = useState([{ transportation: "", seats: "" ,departure :""}]);
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

  useEffect(() => {
    refetchList();
  }, [refetchList]);

  useEffect(() => {
    if (requestList) {
      setCustomers(requestList.customers);
      setAdminsAgent(requestList.admins_agent);
      setCurrencies(requestList.currencies);
      setPriorities(requestList.priority);
      setServices(requestList.services);
      setCountries(requestList.countries);
    }
    console.log("data", requestList);
  }, [requestList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("customer_id", selectedCustomer?.id || "");  
    formData.append("admin_agent_id", selectedAgent?.id || ""); 
    formData.append("currency_id", selectedCurrency?.id || ""); 
    formData.append("service_id", selectedService.id || "");
    formData.append("expected_revenue", expectedRevenue);
    formData.append("priority", selectedPriority);

    // Append Hotel fields to FormData
    if (selectedService?.service_name.toLowerCase() === "hotel") {
      formData.append("hotel_name", hotelName);
      formData.append("check_in", checkInDate);
      formData.append("check_out", checkOutDate);
      formData.append("nights", totalNights);
      formData.append("room_type", roomTypes);
      formData.append("room_quantity", roomQuantity);
      formData.append("adults", adultsHotelNumber);
      formData.append("childreen", childrenHotelNumber);
      // formData.append("notes", notes);
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
      formData.append("adult_data", JSON.stringify(adults_data));
      formData.append("child_data", JSON.stringify(children_data));
      postDataHotel(formData, "Hotel Request Added successful");
    }
    // Append Bus fields to FormData
    else if (selectedService.service_name.toLowerCase() === "bus") {
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
      // formData.append("notes", notesBus);

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
      formData.append("adult_data", JSON.stringify(adults_data));
      formData.append("child_data", JSON.stringify(children_data));
      postDataBus(formData, "Bus Request Added successful");
    }
    // Append Visa fields to FormData
    else if (selectedService?.service_name.toLowerCase() === "visa") {
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
      formData.append("adult_data", JSON.stringify(adults_data));
      formData.append("child_data", JSON.stringify(children_data));
      postDataVisa(formData, "Visa Request Added successful");
    }
    // Append Flight fields to FormData
    else if (selectedService.service_name.toLowerCase() === "flight") {
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
      // formData.append("notes", notesFlight);

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
      formData.append("adult_data", JSON.stringify(adults_data));
      formData.append("child_data", JSON.stringify(children_data));

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
      postDataFlight(formData, "Flight Request Added successful");
    }
    // Append Tour fields to FormData
    else if (selectedService.service_name.toLowerCase() === "tour") {
      formData.append("tour", tour);
      formData.append("type", selectedTourType);
      formData.append("adult_price", tourAdultPrice);
      formData.append("child_price", tourChildPrice);
      formData.append('childreen', tourChildrenNumber);
      formData.append('adults', tourAdultsNumber);
      formData.append("notes", notesTour);

      const formattedBuses = JSON.stringify(
        buses.map((bus) => ({
          transportation: bus.transportation,
          seats: bus.seats,
          ...(bus.transportation === 'flight' ? { departure: bus.departure } : {}),
        }))
      );
      formData.append("tour_bus", formattedBuses);
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
      formData.append("adult_data", JSON.stringify(adults_data));
      formData.append("child_data", JSON.stringify(children_data));
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
      postDataTour(formData,'Tour Request Added successful');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 flex justify-center items-center">
    <div className="bg-white shadow-lg rounded-lg w-full p-4 lg:p-8">

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <Autocomplete
                fullWidth
                options={customers}
                getOptionLabel={(option) =>
                  option.name && option.phone ? `${option.name} (${option.phone})` : ""
                }
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const query = params.inputValue.toLowerCase();
                  return filtered.filter(
                    (option) =>
                      option.name?.toLowerCase().includes(query) ||
                      option.phone?.toString().includes(query)
                  );
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={selectedCustomer}
                onChange={(e, newValue) => setSelectCustomer(newValue)}
                renderOption={(props, option) => (
                  <li {...props} key={`${option.id}-${option.phone}`}>
                    {option.name} ({option.phone})
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Customer/Lead"
                    placeholder="Search by name or phone"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      sx: { "& fieldset": { borderRadius: "10px" } },
                    }}
                  />
                )}
            />
            <Autocomplete
                fullWidth
                options={adminsAgent}
                getOptionLabel={(option) =>
                  option.name && option.phone ? `${option.name} (${option.phone})` : ""
                }
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const query = params.inputValue.toLowerCase();
                  return filtered.filter(
                    (option) =>
                      option.name?.toLowerCase().includes(query) ||
                      option.phone?.toString().includes(query)
                  );
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={selectedAgent}
                onChange={(e, newValue) => setSelectedAgent(newValue)}
                renderOption={(props, option) => (
                  <li {...props} key={`${option.id}-${option.phone}`}>
                    {option.name} ({option.phone})
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Agent"
                    placeholder="Search by name or phone"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      sx: { "& fieldset": { borderRadius: "10px" } },
                    }}
                  />
                )}
            />
            <TextField
              select
              fullWidth
              variant="outlined"
              value={selectedPriority}
              onChange={(e) => {setSelectedPriority(e.target.value)}}
              label="Select Priority"
              className="border-gray-300"
              InputProps={{
                sx: { "& fieldset": { borderRadius: "10px" } },
              }}
            >
              {priorities.map((priority, index) => (
                  <MenuItem key={index} value={priority}>
                    {priority}
                  </MenuItem>
                )
              )}
            </TextField>
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
                    required
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
              <TextField
                label="Expected Revenue"
                variant="outlined"
                fullWidth
                required
                value={expectedRevenue}
                onChange={(e) => setExpectedRevenue(e.target.value)}
                InputProps={{
                  sx: { "& fieldset": { borderRadius: "10px" } },
                }}
              />
      </div>

      {selectedService && (
      <div>
        <div className="space-y-4 lg:p-4 mt-3">

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
            notesTour={notesTour}
            setNotesTour={setNotesTour}
          />
        )}
        
        </div>
      </div>
      )}

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <Link to="/dashboard_agent/checkOut_process" type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600">
          Submit Request
        </Link>
      </div>

    </div>
    </form>
  );
};

export default AddRequestPage;
