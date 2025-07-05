import React, { useEffect, useState } from "react";
import { useGet } from "../../../../../../Hooks/useGet";
import { useChangeState } from "../../../../../../Hooks/useChangeState";
import { useDelete } from "../../../../../../Hooks/useDelete";
import { 
  FaCamera, FaChevronDown, FaChevronUp, FaTrash, FaEdit, 
  FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaCalendarAlt, 
  FaMoon, FaMoneyBillWave, FaStar, FaGlobeAmericas, FaInfoCircle, 
  FaExchangeAlt, FaHotel, FaUsers, FaChild, FaBed 
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { 
  Button, Card, CardContent, Typography, IconButton, 
  Switch, Chip, Tooltip, Divider, Box 
} from "@mui/material";
import StaticLoader from "../../../../../../Components/StaticLoader";
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { PiWarningCircle } from "react-icons/pi";

const TourPageInventory = () => {
  const { refetch: refetchTour, loading: loadData, data: dataTour } = useGet({
    url: "https://travelta.online/agent/tour",
  });

  const [Tour, setTour] = useState([]);
  const [openSections, setOpenSections] = useState({});
  const [openDelete, setOpenDelete] = useState(null);
  const [tourToDelete, setTourToDelete] = useState(null);

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
      `${name} status changed to ${status === 1 ? 'active' : 'inactive'}.`,
      { status }
    );
    if (response) {
      setTour((prevTourType) =>
        prevTourType.map((tour) =>
          tour.id === id ? { ...tour, status: status } : tour
        )
      );
    }
  };

  const handleChangeAcceptedStatus = async (id, name, accepted) => {
    const response = await changeState(
      `https://travelta.online/agent/tour/accepted/${id}`,
      `${name} availability changed to ${accepted === 1 ? 'available' : 'unavailable'}.`,
      { accepted }
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
      `${name} deleted successfully.`
    );
    if (success) {
      setTour((prevTour) => prevTour.filter((tour) => tour.id !== id));
    }
    handleCloseDelete();
  };

  const handleOpenDelete = (id, name) => {
    setTourToDelete({ id, name });
    setOpenDelete(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(null);
    setTourToDelete(null);
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loadData) {
    return <StaticLoader />;
  }

  if (Tour.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Typography variant="h6" className="text-gray-500 mb-4">
          No tours available
        </Typography>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
      {Tour.map((tour) => (
        <Card
          key={tour.id}
          className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-xl overflow-hidden"
          elevation={3}
        >
          <CardContent className="bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            {/* Tour Header */}
            <div className="flex justify-between items-start mb-4">
              <Typography 
                variant="h5" 
                className="font-bold text-gray-800 truncate"
                title={tour.name}
              >
                {tour.name}
              </Typography>
              <div className="flex space-x-2">
                <Chip
                  label={tour.status === 1 ? 'Active' : 'Inactive'}
                  color={tour.status === 1 ? 'success' : 'default'}
                  size="small"
                />
                <Chip
                  label={tour.accepted === 1 ? 'Available' : 'Unavailable'}
                  color={tour.accepted === 1 ? 'primary' : 'default'}
                  size="small"
                />
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                <span>{formatDate(tour.arrival)}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <FaMoon className="mr-2 text-blue-500" />
                <span>{tour.nights} nights</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <FaMoneyBillWave className="mr-2 text-blue-500" />
                <span>Deposit: {tour.deposit} {tour.deposit_type}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <FaStar className={`mr-2 ${tour.featured ? 'text-yellow-500' : 'text-gray-400'}`} />
                <span>Featured: {tour.featured ? 'Yes' : 'No'}</span>
              </div>
            </div>

            {/* Description */}
            {tour.description && (
              <div className="mb-4">
                <Typography variant="body2" className="text-gray-600 line-clamp-3">
                  {tour.description}
                </Typography>
              </div>
            )}

            {/* Collapsible Sections */}
            <div className="space-y-3">
              {/* Destination Cities & Countries */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <Button
                  fullWidth
                  className="flex justify-between items-center px-3 py-2 text-left"
                  onClick={() => toggleSection(`destinations_full-${tour.id}`)}
                  startIcon={<FaGlobeAmericas className="text-blue-500" />}
                  endIcon={openSections[`destinations_full-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
                >
                  Destination Cities & Countries
                </Button>
                
                {openSections[`destinations_full-${tour.id}`] && (
                  <div className="px-4 py-3 bg-gray-50">
                    {/* Destination Cities */}
                    <div className="mb-4">
                      <Typography variant="subtitle2" className="font-medium mb-2">
                        Destination Cities
                      </Typography>
                      {tour.to_cities?.length > 0 ? (
                        <div className="space-y-2">
                          {tour.to_cities.map((city, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
                              <FaMapMarkerAlt className="text-blue-400" />
                              <span>{city.name}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Typography variant="body2" className="text-gray-500 italic">
                          No destination cities set
                        </Typography>
                      )}
                    </div>

                    {/* Destination Countries */}
                    <div>
                      <Typography variant="subtitle2" className="font-medium mb-2">
                        Destination Countries
                      </Typography>
                      {tour.to_countries?.length > 0 ? (
                        <div className="space-y-2">
                          {tour.to_countries.map((country, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
                              <FaGlobeAmericas className="text-blue-400" />
                              <span>{country.name}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Typography variant="body2" className="text-gray-500 italic">
                          No destination countries set
                        </Typography>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Room Configuration */}
              {tour.tour_room?.length > 0 && (
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <Button
                    fullWidth
                    className="flex justify-between items-center px-3 py-2 text-left"
                    onClick={() => toggleSection(`room_config-${tour.id}`)}
                    startIcon={<FaBed className="text-blue-500" />}
                    endIcon={openSections[`room_config-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
                  >
                    Room Configuration
                  </Button>
                  
                  {openSections[`room_config-${tour.id}`] && (
                    <div className="px-4 py-3 bg-gray-50">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Adult Configurations */}
                        <div>
                          <Typography variant="subtitle2" className="font-medium mb-2 flex items-center">
                            <FaUsers className="mr-2" /> Adults
                          </Typography>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Single:</span>
                              <span>{tour.tour_room[0].adult_single}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Double:</span>
                              <span>{tour.tour_room[0].adult_double}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Triple:</span>
                              <span>{tour.tour_room[0].adult_triple}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quadruple:</span>
                              <span>{tour.tour_room[0].adult_quadruple}</span>
                            </div>
                          </div>
                        </div>

                        {/* Children Configurations */}
                        <div>
                          <Typography variant="subtitle2" className="font-medium mb-2 flex items-center">
                            <FaChild className="mr-2" /> Children
                          </Typography>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Single:</span>
                              <span>{tour.tour_room[0].children_single}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Double:</span>
                              <span>{tour.tour_room[0].children_double}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Triple:</span>
                              <span>{tour.tour_room[0].children_triple}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quadruple:</span>
                              <span>{tour.tour_room[0].children_quadruple}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Availability Section */}
              {/* <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <Button
                  fullWidth
                  className="flex justify-between items-center px-3 py-2 text-left"
                  onClick={() => toggleSection(`availability-${tour.id}`)}
                  startIcon={<FaCalendarAlt className="text-blue-500" />}
                  endIcon={openSections[`availability-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
                >
                  Availability
                </Button>
                
                {openSections[`availability-${tour.id}`] && (
                  <div className="px-4 py-3 bg-gray-50">
                    {tour.availability?.length > 0 ? (
                      tour.availability.map((item, index) => (
                        <div key={index} className="mb-3 last:mb-0 pb-2 border-b last:border-b-0">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{formatDate(item.date)}</span>
                            <Chip 
                              label={`${item.remaining}/${item.quantity}`} 
                              size="small" 
                              color={item.remaining > 0 ? 'success' : 'error'}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <Typography variant="body2" className="text-gray-500 italic">
                        No availability data
                      </Typography>
                    )}
                  </div>
                )}
              </div> */}

              {/* Cancellation Policy */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <Button
                  fullWidth
                  className="flex justify-between items-center px-3 py-2 text-left"
                  onClick={() => toggleSection(`cancelation_items-${tour.id}`)}
                  startIcon={<FaExchangeAlt className="text-blue-500" />}
                  endIcon={openSections[`cancelation_items-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
                >
                  Cancellation Policy
                </Button>
                
                {openSections[`cancelation_items-${tour.id}`] && (
                  <div className="px-4 py-3 bg-gray-50">
                    {tour.cancelation_items?.length > 0 ? (
                      tour.cancelation_items.map((item, index) => (
                        <div key={index} className="mb-3 last:mb-0 pb-2 border-b last:border-b-0">
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="font-medium">Days:</span> {item.days || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Type:</span> {item.type || "N/A"}
                            </div>
                            <div>
                              <span className="font-medium">Amount:</span> {item.amount || "N/A"}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <Typography variant="body2" className="text-gray-500 italic">
                        No cancellation policy set
                      </Typography>
                    )}
                  </div>
                )}
              </div>

              {/* Includes/Excludes */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <Button
                    fullWidth
                    className="flex justify-between items-center px-3 py-2 text-left"
                    onClick={() => toggleSection(`includes-${tour.id}`)}
                    startIcon={<FaCheckCircle className="text-green-500" />}
                    endIcon={openSections[`includes-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
                  >
                    Includes
                  </Button>
                  
                  {openSections[`includes-${tour.id}`] && (
                    <div className="px-4 py-3 bg-gray-50">
                      {tour.includes?.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {tour.includes.map((item, index) => (
                            <li key={index} className="text-sm">
                              {item.name || "N/A"}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Typography variant="body2" className="text-gray-500 italic">
                          No items included
                        </Typography>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <Button
                    fullWidth
                    className="flex justify-between items-center px-3 py-2 text-left"
                    onClick={() => toggleSection(`excludes-${tour.id}`)}
                    startIcon={<FaTimesCircle className="text-red-500" />}
                    endIcon={openSections[`excludes-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
                  >
                    Excludes
                  </Button>
                  
                  {openSections[`excludes-${tour.id}`] && (
                    <div className="px-4 py-3 bg-gray-50">
                      {tour.excludes?.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {tour.excludes.map((item, index) => (
                            <li key={index} className="text-sm">
                              {item.name || "N/A"}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Typography variant="body2" className="text-gray-500 italic">
                          No items excluded
                        </Typography>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Destinations */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <Button
                  fullWidth
                  className="flex justify-between items-center px-3 py-2 text-left"
                  onClick={() => toggleSection(`destinations-${tour.id}`)}
                  startIcon={<FaMapMarkerAlt className="text-blue-500" />}
                  endIcon={openSections[`destinations-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
                >
                  Destinations
                </Button>
                
                {openSections[`destinations-${tour.id}`] && (
                  <div className="px-4 py-3 bg-gray-50">
                    {tour.destinations?.length > 0 ? (
                      tour.destinations.map((dest, index) => (
                        <div key={index} className="mb-3 last:mb-0 pb-2 border-b last:border-b-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <FaGlobeAmericas className="text-blue-400" />
                            <span className="font-medium">{dest.country?.name || "N/A"}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaMapMarkerAlt className="text-blue-400" />
                            <span>{dest.city?.name || "N/A"}</span>
                          </div>
                          {dest.arrival_map && (
                            <div className="mt-1 text-sm text-gray-500 truncate">
                              <span className="font-medium">Map:</span> {dest.arrival_map}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <Typography variant="body2" className="text-gray-500 italic">
                        No destinations set
                      </Typography>
                    )}
                  </div>
                )}
              </div>

              {/* Pick Up Location */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <Button
                  fullWidth
                  className="flex justify-between items-center px-3 py-2 text-left"
                  onClick={() => toggleSection(`pick_up-${tour.id}`)}
                  startIcon={<FaHotel className="text-blue-500" />}
                  endIcon={openSections[`pick_up-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
                >
                  Pick Up Location
                </Button>
                
                {openSections[`pick_up-${tour.id}`] && (
                  <div className="px-4 py-3 bg-gray-50">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-blue-400" />
                        <span>
                          <span className="font-medium">City:</span> {tour.pick_up_city?.name || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaGlobeAmericas className="text-blue-400" />
                        <span>
                          <span className="font-medium">Country:</span> {tour.pick_up_country?.name || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <Button
                  fullWidth
                  className="flex justify-between items-center px-3 py-2 text-left"
                  onClick={() => toggleSection(`details-${tour.id}`)}
                  startIcon={<FaInfoCircle className="text-blue-500" />}
                  endIcon={openSections[`details-${tour.id}`] ? <FaChevronUp /> : <FaChevronDown />}
                >
                  Additional Details
                </Button>
                
                {openSections[`details-${tour.id}`] && (
                  <div className="px-4 py-3 bg-gray-50">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Tax:</span> {tour.tax || "N/A"}
                      </div>
                      <div>
                        <span className="font-medium">Tax Type:</span> {tour.tax_type || "N/A"}
                      </div>
                      <div>
                        <span className="font-medium">Deposit Type:</span> {tour.deposit_type || "N/A"}
                      </div>
                      {tour.tour_website && (
                        <div className="col-span-2">
                          <span className="font-medium">Website:</span>{" "}
                          <a 
                            href={tour.tour_website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {tour.tour_website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Controls */}
            <div className="mt-4 flex justify-between items-center p-2 bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-2">
                <Typography variant="body2">Status:</Typography>
                <Tooltip title={tour.status === 1 ? "Deactivate tour" : "Activate tour"}>
                  <Switch
                    checked={tour.status === 1}
                    onChange={() => handleChangeStatus(tour.id, tour.name, tour.status === 1 ? 0 : 1)}
                    color="primary"
                  />
                </Tooltip>
              </div>
              
              <div className="flex items-center space-x-2">
                <Typography variant="body2">Availability:</Typography>
                <Tooltip title={tour.accepted === 1 ? "Mark as unavailable" : "Mark as available"}>
                  <IconButton
                    onClick={() => handleChangeAcceptedStatus(tour.id, tour.name, tour.accepted === 1 ? 0 : 1)}
                    color={tour.accepted === 1 ? "primary" : "default"}
                    size="small"
                  >
                    {tour.accepted === 1 ? <FaCheckCircle /> : <FaTimesCircle />}
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between">
              <Button
                variant="contained"
                color="primary"
                size="small"
                component={Link}
                to={`gallery/${tour.id}`}
                startIcon={<FaCamera />}
                className="flex-1 mr-2"
              >
                Gallery
              </Button>
              
              <div className="flex space-x-1">
                <Tooltip title="Edit tour">
                  <IconButton
                    component={Link}
                    to={`edit/${tour.id}`}
                    color="primary"
                    size="small"
                  >
                    <FaEdit />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Delete tour">
                  <IconButton
                    onClick={() => handleOpenDelete(tour.id, tour.name)}
                    color="error"
                    size="small"
                  >
                    <FaTrash />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            {/* Delete Confirmation Dialog */}
            {openDelete === tour.id && (
              <Dialog
                open={true}
                onClose={handleCloseDelete}
                className="relative z-10"
              >
                <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <PiWarningCircle 
                          color='#0D47A1'
                          size="60"
                        />
                        <div className="flex items-center">
                          <div className="mt-2 text-center">
                            You will delete tour "{tourToDelete?.name || "-"}"
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button 
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto" 
                          onClick={() => handleDelete(tourToDelete.id, tourToDelete.name)}
                        >
                          Delete
                        </button>

                        <button
                          type="button"
                          data-autofocus
                          onClick={handleCloseDelete}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </Dialog>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TourPageInventory;