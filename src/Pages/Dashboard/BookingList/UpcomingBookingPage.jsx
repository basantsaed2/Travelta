import React, { useEffect, useState } from "react";
import StaticLoader from "../../../Components/StaticLoader";
import { useGet } from "../../../Hooks/useGet";

// Manual Booking
import Hotel from "./MenualBookingServices/HotelService";
import Flight from "./MenualBookingServices/FlightService";
import Visa from "./MenualBookingServices/VisaService";
import Tour from "./MenualBookingServices/TourService";
import Bus from "./MenualBookingServices/BusService";

// // Booking Engine
import RoomEngine from "./BookingEngineServices/RoomService";
import TourEngine from "./BookingEngineServices/TourService";

const UpcomingBookingPage = () => {
  const { refetch, loading: loadingUpcoming, data: upcomingData } = useGet({
    url: "https://travelta.online/agent/booking",
  });

  const [activeMainTab, setActiveMainTab] = useState("Manual Booking");
  const [activeSubTab, setActiveSubTab] = useState("Hotel");

  const [upcomingBusList, setUpcomingBusList] = useState([]);
  const [upcomingFlightList, setUpcomingFlightList] = useState([]);
  const [upcomingHotelList, setUpcomingHotelList] = useState([]);
  const [upcomingTourList, setUpcomingTourList] = useState([]);
  const [upcomingVisaList, setUpcomingVisaList] = useState([]);
  const [upcomingRoomList, setUpcomingRoomList] = useState([]);
  const [upcomingEngineTourList, setUpcomingEngineTourList] = useState([]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (upcomingData?.upcoming) {
      setUpcomingBusList(upcomingData.upcoming.buses || []);
      setUpcomingFlightList(upcomingData.upcoming.flights || []);
      setUpcomingHotelList(upcomingData.upcoming.hotels || []);
      setUpcomingTourList(upcomingData.upcoming.tours || []);
      setUpcomingVisaList(upcomingData.upcoming.visas || []);
      setUpcomingRoomList(upcomingData.booking_engine_upcoming.hotels || []);
      setUpcomingEngineTourList(upcomingData.booking_engine_upcoming.tour || []);
    }
  }, [upcomingData]);

  // Sub-tabs for each main tab
  const manualTabs = {
    Hotel: <Hotel data={upcomingHotelList} />,
    Flight: <Flight data={upcomingFlightList} />,
    Visa: <Visa data={upcomingVisaList} />,
    Tour: <Tour data={upcomingTourList} />,
    Bus: <Bus data={upcomingBusList} />,
  };

  const engineTabs = {
    Room: <RoomEngine data={upcomingRoomList} />,
    Tour: <TourEngine data={upcomingEngineTourList} />,
   };

  const currentTabComponents =
    activeMainTab === "Manual Booking" ? manualTabs : engineTabs;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow rounded-lg">

      {/* Main Tabs */}
      <div className="flex space-x-4 mb-4">
        {["Manual Booking", "Booking Engine"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveMainTab(tab);
              // Reset sub-tab to first key
              const firstKey = tab === "Manual Booking" ? "Hotel" : "Room";
              setActiveSubTab(firstKey);
            }}
            className={`py-2 px-4 rounded-t ${
              activeMainTab === tab
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-100 text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        {Object.keys(currentTabComponents).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`py-2 px-4 ${
              activeSubTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {loadingUpcoming ? (
        <StaticLoader />
      ) : (
        currentTabComponents[activeSubTab]
      )}
    </div>
  );
};

export default UpcomingBookingPage;
