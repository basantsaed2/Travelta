import React, { useEffect, useState } from "react";
import { useGet } from "../../../../../../Hooks/useGet";
import { useChangeState } from "../../../../../../Hooks/useChangeState";
import { useDelete } from "../../../../../../Hooks/useDelete";
import { FaCamera, FaChevronDown, FaChevronUp, FaTrash, FaEdit, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography, IconButton, Switch } from "@mui/material";
import StaticLoader from "../../../../../../Components/StaticLoader";

const TourPageInventory = () => {
  const { refetch: refetchTour,loading:loadData, data: dataTour } = useGet({
    url: "https://travelta.online/agent/tour",
  });

  const [Tour, setTour] = useState([]);
  const [openSections, setOpenSections] = useState({});
  const [selectCard,setSelectCard] = useState(false)
  useEffect(() => {
    refetchTour();
  }, []);

  useEffect(() => {
    if (dataTour?.tour) {
      setTour(dataTour.tour);
    }
  }, [dataTour]);

  const { changeState } = useChangeState();
  const handleChangeStaus = async (id, name, status) => {
    const response = await changeState(
            ` https://travelta.online/agent/tour/status/${id}`,
            `${name} Changed Status.`,
            { status } // Pass status as an object if changeState expects an object
    );
    if (response) {
      // Update categories only if changeState succeeded
      setTour((prevTourType) =>
        prevTourType.map((tour) =>
              tour.id === id ? { ...tour, status: status } : tour
          )
      );
    }
  };
  const handleChangeAcceptedStatus = async (id, name, accepted) => {
    const response = await changeState(
            ` https://travelta.online/agent/tour/accepted/${id}`,
            `${name} Changed Accepted.`,
            { accepted } // Pass status as an object if changeState expects an object
    );
    if (response) {
      setTour((prevTourType) =>
        prevTourType.map((tour) =>
              tour.id === id ? { ...tour, accepted: accepted } : tour
          )
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
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section], // Toggle only the clicked section
    }));
  };
  if(loadData){
    return <StaticLoader/>
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 rounded gap-2 p-4">
      {Tour.map((tour) => (
       <Card
       key={tour.id}
       className="shadow-xl  overflow-y-auto border-2 border-gray-300 rounded-2xl p-4 transition-all hover:shadow-2xl  scroll-smooth"

     >
          <CardContent className="bg-gradient-to-r from-blue-50  to-blue-100">

            <Typography variant="h5" className="font-bold text-start text-gray-800">
              {tour.name}
            </Typography>

            <div className="grid grid-cols-2 border-t-2 pt-4 gap-4  text-gray-600 mt-4">
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
    className="w-full flex justify-start items-start p-2  text-white rounded-lg shadow-md"
    onClick={() => toggleSection(`availability-${tour.id}`)}
  >
    Availability
    {openSections[`availability-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
  </Button>
  
  {openSections[`availability-${tour.id}`] && tour.availability?.length > 0 && (
    <div className="bg-blue-50 p-4 mt-2 rounded-lg">
      {tour.availability.map((item, index) => (
        <div key={index} className="mb-2 p-2 border-b ">
          <p><strong>Date:</strong> {item.date || "N/A"}</p>
          <p><strong>Quantity:</strong> {item.quantity || "N/A"}</p>
          <p><strong>Remaining:</strong> {item.remaining || "N/A"}</p>
        </div>
      ))}
    </div>
  )}

  {openSections["availability"] && (!tour.availability || tour.availability.length === 0) && (
    <div className="bg-blue-50 p-4 mt-2 rounded-lg">
      <p>No availability data found.</p>
    </div>
  )}
</div>


            {/* Cancellation Items */}
            <div className="mt-4">
              <Button
                className="w-full flex text-start justify-between items-center p-2  text-white rounded-lg shadow-md"
                onClick={() => toggleSection(`cancelation_items-${tour.id}`)}
              >
                Cancellation Policy
                {openSections[`cancelation_items-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
              {openSections[`cancelation_items-${tour.id}`] && tour.cancelation_items?.length > 0 && (
  <div className="bg-blue-50 p-4 mt-2 rounded-lg">
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
                className="w-full flex justify-between items-start p-2  text-white rounded-lg shadow-md"
                onClick={() => toggleSection(`includes-${tour.id}`)}
              >
                Includes
                {openSections[`includes-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
              {openSections[`includes-${tour.id}`] && (
                <div className="bg-blue-50 p-4 mt-2 rounded-lg">
              {tour?.includes?.length > 0 ? (
  <div className="bg-blue-50 p-4 mt-2 rounded-lg">
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
                className="w-full flex justify-between items-start p-2  text-white rounded-lg shadow-md"
                onClick={() => toggleSection(`excludes-${tour.id}`)}
              >
                Excludes
                {openSections[`excludes-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
              {openSections[`excludes-${tour.id}`] && (
                <div className="bg-blue-50 p-4 mt-2 rounded-lg">
              {tour?.excludes?.length > 0 ? (
  <div className="bg-blue-50 p-4 mt-2 rounded-lg">
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
                className="w-full flex justify-between items-center p-2  text-white rounded-lg shadow-md"
                onClick={() => toggleSection(`destinations-${tour.id}`)}
              >
                Destinations
                {openSections[`destinations-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
              {openSections[`destinations-${tour.id}`] && (
             <div className="bg-blue-50 p-4 mt-2 rounded-lg">
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
    className="w-full flex justify-between items-center p-2  text-white rounded-lg shadow-md  transition"
    onClick={() => toggleSection(`pick_up-${tour.id}`)}
  >
    Pick Up 
    {openSections[`pick_up-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
  </Button>
  {openSections[`pick_up-${tour.id}`] && (
    <div className="bg-blue-50 p-4 mt-2 rounded-lg">
      <p><strong>City:</strong> {tour.pick_up_city?.name || "N/A"}</p>
      <p><strong>Country:</strong> {tour.pick_up_country?.name || "N/A"}</p>
    </div>
  )}
</div>

          

            {/* Details Section */}
<div className="mt-4">
  <Button
    className="w-full flex justify-between items-center p-2 text-white rounded-lg shadow-md"
    onClick={() => toggleSection(`details-${tour.id}`)}
  >
    Details
    {openSections[`details-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
  </Button>
  {openSections[`details-${tour.id}`] && (
    <div className=" bg-blue-50 p-4 mt-2 rounded-lg">
      <p><strong>tax:</strong> {tour.tax}</p>
      <p><strong>Tax Type:</strong>{tour.tax_type}</p>
      <p><strong>tour_website:</strong> <a href="" className="text-blue underline">{tour.tour_website}</a> </p>
      <p><strong>Deposite Type:</strong>{tour.deposit_type}</p>
    
    </div>
  )}
</div>


            <div className="flex justify-between items-center gap-3 p-2 border-t border-gray-200">
              <div className="flex items-center gap-2">
                Status: 
                    <Switch
                        checked={tour.status === 1}  // This will evaluate to true or false
                        onChange={() => {
                            handleChangeStaus(tour.id, tour.name, tour.status === 1 ? 0 : 1);
                        }}
                        className={`${
                          tour.status === 1 ? "" : ""
                        } relative inline-flex h-7 w-14 items-center rounded-full transition-colors`}
                    >
                        <span
                            className={`${
                              tour.status === 1 ? "translate-x-7" : "translate-x-1"
                            } inline-block h-5 w-5 transform rounded-full bg-white shadow transition`}
                        />
                    </Switch>
              </div>
              <div className="flex items-center gap-2 p-1">
              {/* Accepted:  */}
                <div
                  className={`${
                    tour.accepted === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  } cursor-pointer p-2 rounded-full flex items-center gap-2`}
                  onClick={() => {
                      handleChangeAcceptedStatus(tour.id,tour.name,tour.accepted === 1 ? 0 : 1);
                  }}
                >
                  {tour.accepted === 1 ? (
                      <>
                          <FaCheckCircle size={20} />
                          Available
                      </>
                  ) : (
                      <>
                          <FaTimesCircle size={20} />
                          Not Available
                      </>
                  )}
                </div>
              </div>
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
                to={`edit/${tour.id}`}
                >
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
