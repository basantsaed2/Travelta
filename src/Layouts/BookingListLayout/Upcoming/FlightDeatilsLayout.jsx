import React from "react";
import { useParams } from "react-router-dom";
import FlightProfile from "../../../Pages/Dashboard/BookingList/Profile/Upcoming/FlightProfile";

const FlightProfileLayout = () => {
  const { id } = useParams(); 

  return (
    <div>
      <FlightProfile flightId={id} />
    </div>
  );
};

export default FlightProfileLayout;
