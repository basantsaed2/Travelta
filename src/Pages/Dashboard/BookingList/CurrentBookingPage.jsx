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

const CurrentBookingPage = () => {
  const { refetch, loading: loadingUpcoming, data: currentData } = useGet({
    url: "https://travelta.online/agent/booking",
  });

  const [activeMainTab, setActiveMainTab] = useState("Manual Booking");
  const [activeSubTab, setActiveSubTab] = useState("Hotel");

  const [currentBusList, setUpcomingBusList] = useState([]);
  const [currentFlightList, setUpcomingFlightList] = useState([]);
  const [currentHotelList, setUpcomingHotelList] = useState([]);
  const [currentTourList, setUpcomingTourList] = useState([]);
  const [currentVisaList, setUpcomingVisaList] = useState([]);
  const [currentRoomList, setUpcomingRoomList] = useState([]);
  const [currentEngineTourList, setUpcomingEngineTourList] = useState([]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (currentData?.current) {
      setUpcomingBusList(currentData.current.buses || []);
      setUpcomingFlightList(currentData.current.flights || []);
      setUpcomingHotelList(currentData.current.hotels || []);
      setUpcomingTourList(currentData.current.tours || []);
      setUpcomingVisaList(currentData.current.visas || []);
      setUpcomingRoomList(currentData.booking_engine_current.hotels || []);
      setUpcomingEngineTourList(currentData.booking_engine_current.tour || []);
    }
  }, [currentData]);

  // Sub-tabs for each main tab
  const manualTabs = {
    Hotel: <Hotel data={currentHotelList} />,
    Flight: <Flight data={currentFlightList} />,
    Visa: <Visa data={currentVisaList} />,
    Tour: <Tour data={currentTourList} />,
    Bus: <Bus data={currentBusList} />,
  };

  const engineTabs = {
    Room: <RoomEngine data={currentRoomList} />,
    Tour: <TourEngine data={currentEngineTourList} />,
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

export default CurrentBookingPage;
