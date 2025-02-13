import React, { useEffect, useState } from "react";
import { useGet } from "../../../../../../Hooks/useGet";
import { useChangeState } from "../../../../../../Hooks/useChangeState";
import { useDelete } from "../../../../../../Hooks/useDelete";
import { FaCamera, FaChevronDown, FaChevronUp, FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography, IconButton } from "@mui/material";

const TourPageInventory = () => {
  const { refetch: refetchTour, data: dataTour } = useGet({
    url: "https://travelta.online/agent/tour",
  });

  const [Tour, setTour] = useState([]);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    refetchTour();
  }, []);

  useEffect(() => {
    if (dataTour?.tour) {
      setTour(dataTour.tour);
    }
  }, [dataTour]);

  const { changeState } = useChangeState();
  const handleChangeStatus = async (id, name, status) => {
    const response = await changeState(
      `https://travelta.online/agent/tour/status/${id}`,
      `${name} Changed Status.`,
      { status }
    );
    if (response) {
      setTour((prevTour) =>
        prevTour.map((tour) => (tour.id === id ? { ...tour, status } : tour))
      );
    }
  };

  const { deleteData } = useDelete();
  const handleDelete = async (id, name) => {
    const success = await deleteData(
      `https://travelta.online/agent/tour/delete/${id}`,
      `${name} Deleted.`
    );
    if (success) {
      setTour((prevTour) => prevTour.filter((tour) => tour.id !== id));
    }
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 rounded gap-6 p-6">
      {Tour.map((tour) => (
        <Card key={tour.id} className="shadow-3xl rounded-2xl overflow-hidden bg-white">
          <CardContent>
            <Typography variant="h5" className="font-bold text-center text-gray-800">
              {tour.name}
            </Typography>

            <div className="grid grid-cols-2 gap-4 text-gray-600 mt-4">
              <p><strong>Arrival:</strong> {tour.arrival}</p>
              <p><strong>Description</strong> {tour.description}</p>
              <p><strong>Nights:</strong> {tour.nights}</p>
              <p><strong>Deposit:</strong> {tour.deposit} {tour.deposit_type}</p>
              <p><strong>Featured:</strong> {tour.featured}</p>
              <p><strong>Destination Type:</strong> {tour.destination_type}</p>
              <p><strong>Featured From:</strong> {tour.featured_from}</p>
              <p><strong>Featured To:</strong> {tour.featured_to}</p>
            </div>

            {/* Availability Section */}

<div className="mt-6">
  <Button
    className="w-full flex justify-start items-start p-2 bg-blue-500 text-white rounded-lg shadow-md"
    onClick={() => toggleSection("availability")}
  >
    Availability
    {openSections["availability"] ? <FaChevronUp /> : <FaChevronDown />}
  </Button>
  
  {openSections["availability"] && tour.availability?.length > 0 && (
    <div className="bg-blue-100 p-4 mt-2 rounded-lg">
      {tour.availability.map((item, index) => (
        <div key={index} className="mb-2 p-2 border-b border-blue-300">
          <p><strong>Date:</strong> {item.date || "N/A"}</p>
          <p><strong>Quantity:</strong> {item.quantity || "N/A"}</p>
          <p><strong>Remaining:</strong> {item.remaining || "N/A"}</p>
        </div>
      ))}
    </div>
  )}

  {openSections["availability"] && (!tour.availability || tour.availability.length === 0) && (
    <div className="bg-blue-100 p-4 mt-2 rounded-lg">
      <p>No availability data found.</p>
    </div>
  )}
</div>


            {/* Cancellation Items */}
            <div className="mt-4">
              <Button
                className="w-full flex justify-between items-center p-2 bg-red-500 text-white rounded-lg shadow-md"
                onClick={() => toggleSection("cancelation_items")}
              >
                Cancellation Policy
                {openSections["cancelation_items"] ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
              {openSections["cancelation_items"] && tour.cancelation_items?.length > 0 && (
  <div className="bg-red-100 p-4 mt-2 rounded-lg">
    {tour.cancelation_items.map((item, index) => (
      <div key={index} className="mb-2 border-b pb-2">
        <p><strong>Amount:</strong> {item.amount || "N/A"}</p>
        <p><strong>Days:</strong> {item.days || "N/A"}</p>
        <p><strong>Type:</strong> {item.type || "N/A"}</p>
      </div>
    ))}
  </div>
)}

            </div>

                        {/* include Section */}
                        <div className="mt-6">
              <Button
                className="w-full flex justify-between items-start p-2 bg-blue-500 text-white rounded-lg shadow-md"
                onClick={() => toggleSection("includes")}
              >
                Includes
                {openSections["includes"] ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
              {openSections["includes"] && (
                <div className="bg-blue-100 p-4 mt-2 rounded-lg">
              {tour?.includes?.length > 0 ? (
  <div className="bg-green-100 p-4 mt-2 rounded-lg">
    {tour.includes.map((item, index) => (
      <p key={index} className="mb-1">
        <strong>Name:</strong> {item.name || "N/A"}
      </p>
    ))}
  </div>
) : (
  <p className="text-gray-500">No included items available</p>
)}

                </div>
              )}
            </div>

                         {/* include Section */}
                         <div className="mt-6">
              <Button
                className="w-full flex justify-between items-start p-2 bg-blue-500 text-white rounded-lg shadow-md"
                onClick={() => toggleSection("excludes")}
              >
                Excludes
                {openSections["excludes"] ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
              {openSections["excludes"] && (
                <div className="bg-blue-100 p-4 mt-2 rounded-lg">
              {tour?.excludes?.length > 0 ? (
  <div className="bg-green-100 p-4 mt-2 rounded-lg">
    {tour.excludes.map((item, index) => (
      <p key={index} className="mb-1">
        <strong>Name:</strong> {item.name || "N/A"}
      </p>
    ))}
  </div>
) : (
  <p className="text-gray-500">No included items available</p>
)}

                </div>
              )}
            </div>

            {/* Destinations */}
            <div className="mt-4">
              <Button
                className="w-full flex justify-between items-center p-2 bg-green-500 text-white rounded-lg shadow-md"
                onClick={() => toggleSection("destinations")}
              >
                Destinations
                {openSections["destinations"] ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
              {openSections["destinations"] && (
             <div className="bg-green-100 p-4 mt-2 rounded-lg">
             {tour.destinations?.length > 0 ? (
               tour.destinations.map((dest, index) => (
                 <div key={index} className="mb-2">
                   <p><strong>Country:</strong> {dest.country?.name || "N/A"}</p>
                   <p><strong>City:</strong> {dest.city?.name || "N/A"}</p>
                   <p><strong>Arrival Map:</strong> {dest.arrival_map|| "N/A"}</p>
                 </div>
               ))
             ) : (
               <p className="text-gray-500">No destinations available</p>
             )}
           </div>
           
              )}
            </div>

            {/* Pick Up City */}
            <div className="mt-4">
              <Button
                className="w-full flex justify-between items-center p-2 bg-purple-500 text-white rounded-lg shadow-md"
                onClick={() => toggleSection("Pick up")}
              >
                Pick Up 
                {openSections["Pick up"] ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
              {openSections["Pick up"] && (
                <div className="bg-purple-100 p-4 mt-2 rounded-lg">
                  <p><strong>City:</strong> {tour.pick_up_city?.name || "N/A"}</p>
                  <p><strong>Country:</strong> {tour.pick_up_country?.name || "N/A"}</p>
                </div>
              )}
            </div>
          

            {/* Details Section */}
<div className="mt-4">
  <Button
    className="w-full flex justify-between items-center p-2 bg-gray-500 text-white rounded-lg shadow-md"
    onClick={() => toggleSection("details")}
  >
    Details
    {openSections["details"] ? <FaChevronUp /> : <FaChevronDown />}
  </Button>
  {openSections["details"] && (
    <div className="bg-gray-100 p-4 mt-2 rounded-lg">
      <p><strong>tax:</strong> {tour.tax}</p>
      <p><strong>Tax Type:</strong>{tour.tax_type}</p>
      <p><strong>tour_website:</strong> <a href="" className="text-blue underline">{tour.tour_website}</a> </p>
      <p><strong>Deposite Type:</strong>{tour.deposit_type}</p>
    
    </div>
  )}
</div>

            {/* Gallery Link */}
            <div className="flex justify-between items-center mt-6 bg-gray-100 py-2 px-4 rounded-lg">
              <span className="text-lg font-semibold text-gray-700">Tour Gallery:</span>
              <Link
                to={`gallery/${tour.id}`}
                className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
              >
                <FaCamera className="text-lg" />
                <span>Gallery</span>
              </Link>
            </div>

            {/* Delete & Edit Actions */}
            <div className="flex justify-between mt-4">
              <IconButton className="text-red-500" onClick={() => handleDelete(tour.id, tour.name)}>
                <FaTrash />
              </IconButton>
              <Link
                to={`edit/${tour.id}`}>
              <IconButton className="text-blue-500">
                <FaEdit />
              </IconButton>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TourPageInventory;
