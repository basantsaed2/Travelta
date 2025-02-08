import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGet } from "../../../Hooks/useGet";
import StaticLoader from "../../../Components/StaticLoader";

const tabs = [
  "Booking Info",
  "Passenger",
  "Voucher",
  "Invoice",
  "Notes",
  "Payments",
  "Actions",
];

const DetailsCurrent = () => {
  const { current_id } = useParams();
  const {
    refetch: refetchDetails,
    loading: loadingDetails,
    data: dataDetails,
  } = useGet({
    url: `https://travelta.online/agent/booking/details/${current_id}`,
  });
  const {
    refetch: refetchCurrent,
    loading: loadingCurrent,
    data: currentData,
  } = useGet({
    url: "https://travelta.online/agent/booking",
  });
  //   const { refetch: refetchInvoice, loading: loadingInvoice, data: currentDataInvoice } = useGet({
  //     url: `https://travelta.online/agent/accounting/booking/invoice/${current_id}`,
  //   });

  const [selectedPaymentId, setSelectedPaymentId] = useState(null); // Store selected payment ID

  const {
    refetch: refetchInvoice,
    loading: loadingInvoice,
    data: currentDataInvoice,
  } = useGet({
    url: selectedPaymentId
      ? `https://travelta.online/agent/accounting/booking/invoice/${selectedPaymentId}`
      : null, // Dynamically set the API URL
  });

  const location = useLocation();
  const type = location.state?.type || "No data passed";
  const [activeTab, setActiveTab] = useState("Booking Info");
  const [data, setData] = useState([]);
  const [dataInvoice, setDataInvoice] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  useEffect(() => {
    refetchDetails();
    refetchCurrent();
    refetchInvoice();
  }, []);

  useEffect(() => {
    if (dataDetails) {
      setData(dataDetails);
    }
  }, [dataDetails]);

  useEffect(() => {
    if (currentDataInvoice) {
      setDataInvoice(currentDataInvoice);
    }
    console.log("data invoice", currentDataInvoice);
  }, [currentDataInvoice]);

  useEffect(() => {
    if (currentData) {
      setCurrentList(currentData.current || []);
    }
    console.log(currentData?.current[type]);
  }, [currentData, type]);

//   if(dataDetails){
//     return(<>{<StaticLoader/>}</>)
//   }

//   if(currentDataInvoice){
//     return(<>{<StaticLoader/>}</>)
//   }

//   if(currentData){
//     return(<>{<StaticLoader/>}</>)
//   }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full bg-white shadow-lg rounded-lg flex p-6">
{/* Sidebar (Vertical Tabs) */}
<div className="w-1/4 border-r border-gray-300 p-5 bg-gray-50 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-mainColor mb-6">Booking Details</h2>
  <ul className="space-y-3">
    {tabs.map((tab) => (
      <li
        key={tab}
        className={`flex items-center gap-3 p-4 text-lg font-medium cursor-pointer rounded-lg transition-all duration-300 ${
          activeTab === tab
            ? "bg-mainColor text-white shadow-md scale-105"
            : "text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => setActiveTab(tab)}
      >
        <span className="text-xl"></span> {/* Example Icon (Replace as needed) */}
        {tab}
      </li>
    ))}
  </ul>
</div>


        {/* Main Content */}
        <div className="w-3/4 pl-6">
          {activeTab === "Booking Info" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Booking Info
              </h2>
              {currentList ? (
                <>
                  {/* Hotels Table */}
                  {type === "hotels" && currentList.hotels?.length > 0 && (
                    <>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                        🏨 Hotel Information
                      </h2>
                      {currentList.hotels.map((hotel, index) => (
                        <div
                          key={index}
                          className="mb-6 p-5 border border-gray-200 shadow-lg rounded-lg bg-white"
                        >
                          {/* Hotel Details */}
                          <div className="grid grid-cols-2 gap-4 text-gray-700">
                            <p>
                              <span className="font-semibold">Hotel Name:</span>{" "}
                              {hotel.hotel_name}
                            </p>
                            <p>
                              <span className="font-semibold">Hotel ID:</span>{" "}
                              {hotel.id}
                            </p>
                            <p>
                              <span className="font-semibold">Room Type:</span>{" "}
                              {hotel.room_type}
                            </p>
                            <p>
                              <span className="font-semibold">Nights:</span>{" "}
                              {hotel.no_nights}
                            </p>
                            <p>
                              <span className="font-semibold">Adults:</span>{" "}
                              {hotel.no_adults}
                            </p>
                            <p>
                              <span className="font-semibold">Children:</span>{" "}
                              {hotel.no_children}
                            </p>
                          </div>

                          {/* Supplier Info */}
                          <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                              📞 Supplier Info
                            </h3>
                            <p>
                              <span className="font-semibold">
                                Supplier Name:
                              </span>{" "}
                              {hotel.supplier_from_name}
                            </p>

                            {/* Supplier Emails */}
                            <p className="font-semibold mt-2">📧 Emails:</p>
                            <ul className="list-disc list-inside text-gray-700">
                              {hotel.supplier_from_email?.map((email, i) => (
                                <li key={i} className="ml-4">
                                  {email}
                                </li>
                              ))}
                            </ul>

                            {/* Supplier Phones */}
                            <p className="font-semibold mt-2">
                              📱 Phone Numbers:
                            </p>
                            <ul className="list-disc list-inside text-gray-700">
                              {hotel.supplier_from_phone?.map((phone, i) => (
                                <li key={i} className="ml-4">
                                  {phone}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Status Tag */}
                          <div className="mt-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                hotel.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : hotel.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {hotel.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Buses Info */}
                  {type === "buses" && currentList.buses?.length > 0 && (
                    <>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                        🚌 Bus Information
                      </h2>
                      {currentList.buses.map((bus, index) => (
                        <div
                          key={index}
                          className="mb-6 p-5 border border-gray-200 shadow-lg rounded-lg bg-white"
                        >
                          {/* Bus Details */}
                          <div className="grid grid-cols-2 gap-4 text-gray-700">
                            <p>
                              <span className="font-semibold">Bus Name:</span>{" "}
                              {bus.bus_name}
                            </p>
                            <p>
                              <span className="font-semibold">Bus No:</span>{" "}
                              {bus.bus_no}
                            </p>
                            <p>
                              <span className="font-semibold">From:</span>{" "}
                              {bus.from}
                            </p>
                            <p>
                              <span className="font-semibold">To:</span>{" "}
                              {bus.to}
                            </p>
                            <p>
                              <span className="font-semibold">Departure:</span>{" "}
                              {bus.depature}
                            </p>
                            <p>
                              <span className="font-semibold">Arrival:</span>{" "}
                              {bus.arrival}
                            </p>
                            <p>
                              <span className="font-semibold">Adults:</span>{" "}
                              {bus.no_adults}
                            </p>
                            <p>
                              <span className="font-semibold">Children:</span>{" "}
                              {bus.no_children}
                            </p>
                          </div>

                          {/* Supplier Info */}
                          <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                              📞 Supplier Info
                            </h3>
                            <p>
                              <span className="font-semibold">
                                Supplier Name:
                              </span>{" "}
                              {bus.supplier_from_name}
                            </p>

                            {/* Supplier Emails */}
                            <p className="font-semibold mt-2">📧 Emails:</p>
                            <ul className="list-disc list-inside text-gray-700">
                              {bus.supplier_from_email?.map((email, i) => (
                                <li key={i} className="ml-4">
                                  {email}
                                </li>
                              ))}
                            </ul>

                            {/* Supplier Phones */}
                            <p className="font-semibold mt-2">
                              📱 Phone Numbers:
                            </p>
                            <ul className="list-disc list-inside text-gray-700">
                              {bus.supplier_from_phone?.map((phone, i) => (
                                <li key={i} className="ml-4">
                                  {phone}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Status Tag */}
                          <div className="mt-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                bus.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : bus.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {bus.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Flights Table */}
                  {type === "flights" && currentList.flights?.length > 0 && (
                    <>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                        ✈️ Flight Information
                      </h2>
                      {currentList.flights
                        //   .filter((flight) => flight.id === current_id)
                        .map((flight, index) => (
                          <div
                            key={index}
                            className="mb-6 p-5 border border-gray-200 shadow-lg rounded-lg bg-white"
                          >
                            <div className="grid grid-cols-2 gap-4 text-gray-700">
                              <p>
                                <span className="font-semibold">
                                  Departure:
                                </span>{" "}
                                {flight.depature}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Flight Class:
                                </span>{" "}
                                {flight.flight_class}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Flight Direction:
                                </span>{" "}
                                {flight.flight_direction}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Flight Type:
                                </span>{" "}
                                {flight.flight_type}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  PNR Reference:
                                </span>{" "}
                                {flight.ref_pnr}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Ticket No:
                                </span>{" "}
                                {flight.ticket_no}
                              </p>
                              <p>
                                <span className="font-semibold">Infants:</span>{" "}
                                {flight.infants_no}
                              </p>
                              <p>
                                <span className="font-semibold">Status:</span>
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    flight.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : flight.status === "confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {flight.status}
                                </span>
                              </p>
                            </div>

                            {/* From-To Details */}
                            <div className="mt-4">
                              <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                                🌍 Route
                              </h3>
                              {flight.from_to?.map((route, i) => (
                                <p key={i}>
                                  <span className="font-semibold">From:</span>{" "}
                                  {route.from} →
                                  <span className="font-semibold"> To:</span>{" "}
                                  {route.to}
                                </p>
                              ))}
                            </div>

                            {/* Supplier Info */}
                            <div className="mt-4">
                              <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                                📞 Supplier Info
                              </h3>
                              <p>
                                <span className="font-semibold">
                                  Supplier Name:
                                </span>{" "}
                                {flight.supplier_from_name}
                              </p>

                              {/* Supplier Emails */}
                              <p className="font-semibold mt-2">📧 Emails:</p>
                              <ul className="list-disc list-inside text-gray-700">
                                {flight.supplier_from_email?.map((email, i) => (
                                  <li key={i} className="ml-4">
                                    {email}
                                  </li>
                                ))}
                              </ul>

                              {/* Supplier Phones */}
                              <p className="font-semibold mt-2">
                                📱 Phone Numbers:
                              </p>
                              <ul className="list-disc list-inside text-gray-700">
                                {flight.supplier_from_phone?.map((phone, i) => (
                                  <li key={i} className="ml-4">
                                    {phone}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                    </>
                  )}

                  {/* Tours Table */}
                  {type === "tours" && currentList.tours?.length > 0 && (
                    <>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                        🎒 Tour Information
                      </h2>
                      {currentList.tours
                        //   .filter((tour) => tour.id === current_id)
                        .map((tour, index) => (
                          <div
                            key={index}
                            className="mb-6 p-5 border border-gray-200 shadow-lg rounded-lg bg-white"
                          >
                            {/* Tour Details */}
                            <div className="grid grid-cols-2 gap-4 text-gray-700">
                              <p>
                                <span className="font-semibold">
                                  Tour Name:
                                </span>{" "}
                                {tour.tour_name}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Tour Type:
                                </span>{" "}
                                {tour.tour_type}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Total Price:
                                </span>{" "}
                                ${tour.total_price}
                              </p>
                            </div>

                            {/* Tour Hotels */}
                            {tour.tour_hotels?.length > 0 && (
                              <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                                  🏨 Tour Hotels
                                </h3>
                                {tour.tour_hotels.map((hotel, i) => (
                                  <div key={i} className="mt-2">
                                    <p>
                                      <span className="font-semibold">
                                        Hotel Name:
                                      </span>{" "}
                                      {hotel.hotel_name}
                                    </p>
                                    <p>
                                      <span className="font-semibold">
                                        Destination:
                                      </span>{" "}
                                      {hotel.destination}
                                    </p>
                                    <p>
                                      <span className="font-semibold">
                                        Room Type:
                                      </span>{" "}
                                      {hotel.room_type}
                                    </p>
                                    <p>
                                      <span className="font-semibold">
                                        Check-in:
                                      </span>{" "}
                                      {hotel.check_in}
                                    </p>
                                    <p>
                                      <span className="font-semibold">
                                        Check-out:
                                      </span>{" "}
                                      {hotel.check_out}
                                    </p>
                                    <p>
                                      <span className="font-semibold">
                                        Nights:
                                      </span>{" "}
                                      {hotel.nights}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Tour Buses */}
                            {tour.tour_buses?.length > 0 && (
                              <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                                  🚌 Transportation
                                </h3>
                                {tour.tour_buses.map((bus, i) => (
                                  <p key={i}>
                                    <span className="font-semibold">Type:</span>{" "}
                                    {bus.transportation},
                                    <span className="font-semibold">
                                      {" "}
                                      Seats:
                                    </span>{" "}
                                    {bus.seats}
                                  </p>
                                ))}
                              </div>
                            )}

                            {/* Contact Person */}
                            <div className="mt-4">
                              <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                                📞 Contact Person
                              </h3>
                              <p>
                                <span className="font-semibold">Name:</span>{" "}
                                {tour.to_name}
                              </p>
                              <p>
                                <span className="font-semibold">Role:</span>{" "}
                                {tour.to_role}
                              </p>
                              <p>
                                <span className="font-semibold">Email:</span>{" "}
                                {tour.to_email}
                              </p>
                              <p>
                                <span className="font-semibold">Phone:</span>{" "}
                                {tour.to_phone}
                              </p>
                            </div>

                            {/* Supplier Info */}
                            <div className="mt-4">
                              <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                                📦 Supplier Info
                              </h3>
                              <p>
                                <span className="font-semibold">
                                  Supplier Name:
                                </span>{" "}
                                {tour.supplier_from_name}
                              </p>

                              {/* Supplier Emails */}
                              <p className="font-semibold mt-2">📧 Emails:</p>
                              <ul className="list-disc list-inside text-gray-700">
                                {tour.supplier_from_email?.map((email, i) => (
                                  <li key={i} className="ml-4">
                                    {email}
                                  </li>
                                ))}
                              </ul>

                              {/* Supplier Phones */}
                              <p className="font-semibold mt-2">
                                📱 Phone Numbers:
                              </p>
                              <ul className="list-disc list-inside text-gray-700">
                                {tour.supplier_from_phone?.map((phone, i) => (
                                  <li key={i} className="ml-4">
                                    {phone}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Payment & Status */}
                            <div className="mt-4">
                              <p>
                                <span className="font-semibold">
                                  Payment Status:
                                </span>{" "}
                                {tour.payment_status || "N/A"}
                              </p>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  tour.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : tour.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {tour.status}
                              </span>
                            </div>
                          </div>
                        ))}
                    </>
                  )}

                  {/* Visas Table */}
                  {type === "visas" && currentList.visas?.length > 0 && (
                    <>
                      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                        🛂 Visa Information
                      </h2>
                      {currentList.visas
                        .filter((visa) => visa.id === current_id)
                        .map((visa, index) => (
                          <div
                            key={index}
                            className="mb-6 p-5 border border-gray-200 shadow-lg rounded-lg bg-white"
                          >
                            {/* Visa Details */}
                            <div className="grid grid-cols-2 gap-4 text-gray-700">
                              <p>
                                <span className="font-semibold">
                                  Visa Code:
                                </span>{" "}
                                {visa.code}
                              </p>
                              <p>
                                <span className="font-semibold">Country:</span>{" "}
                                {visa.country_name || "N/A"}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Appointment Date:
                                </span>{" "}
                                {visa.appointment}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Created At:
                                </span>{" "}
                                {visa.created_at}
                              </p>
                              <p>
                                <span className="font-semibold">Notes:</span>{" "}
                                {visa.notes || "N/A"}
                              </p>
                              <p>
                                <span className="font-semibold">Adults:</span>{" "}
                                {visa.no_adults}
                              </p>
                              <p>
                                <span className="font-semibold">Children:</span>{" "}
                                {visa.no_children}
                              </p>
                            </div>

                            {/* Supplier Info */}
                            <div className="mt-4">
                              <h3 className="text-lg font-semibold text-gray-800 border-b pb-1">
                                📦 Supplier Info
                              </h3>
                              <p>
                                <span className="font-semibold">
                                  Supplier Name:
                                </span>{" "}
                                {visa.supplier_from_name}
                              </p>

                              {/* Supplier Emails */}
                              <p className="font-semibold mt-2">📧 Emails:</p>
                              <ul className="list-disc list-inside text-gray-700">
                                {visa.supplier_from_email?.map((email, i) => (
                                  <li key={i} className="ml-4">
                                    {email}
                                  </li>
                                ))}
                              </ul>

                              {/* Supplier Phones */}
                              <p className="font-semibold mt-2">
                                📱 Phone Numbers:
                              </p>
                              <ul className="list-disc list-inside text-gray-700">
                                {visa.supplier_from_phone?.map((phone, i) => (
                                  <li key={i} className="ml-4">
                                    {phone}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Payment & Status */}
                            <div className="mt-4">
                              <p>
                                <span className="font-semibold">
                                  Payment Status:
                                </span>{" "}
                                {visa.payment_status || "N/A"}
                              </p>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  visa.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : visa.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {visa.status}
                              </span>
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </>
              ) : (
                <p className="text-gray-600">No booking info available.</p>
              )}
            </div>
          )}

          {activeTab === "Passenger" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5 border-b-2 pb-2">
                🧍 Passenger Info
              </h2>

              {type === "hotels" &&
                currentList?.hotels?.length > 0 &&
                currentList.hotels
                  // .filter(hotel => hotel.id === current_id) // Filter hotels by current_id
                  .map((hotel, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-gray-100 shadow-md rounded-lg"
                    >
                      <h3 className="text-lg font-semibold text-yellow-700">
                        🏨 Hotel Info
                      </h3>
                      <p>
                        <strong>Hotel Name:</strong> {hotel.hotel_name ?? "N/A"}
                      </p>
                      <p>
                        <strong>Room Type:</strong> {hotel.room_type ?? "N/A"}
                      </p>
                      <p>
                        <strong>Nights:</strong> {hotel.no_nights ?? "N/A"}
                      </p>
                      <p>
                        <strong>Adults:</strong> {hotel.no_adults ?? "N/A"}
                      </p>
                      <p>
                        <strong>Children:</strong> {hotel.no_children ?? "N/A"}
                      </p>
                    </div>
                  ))}

              {type === "buses" &&
                currentList?.buses?.length > 0 &&
                currentList.buses
                  // .filter(bus => bus.id === current_id) // Filter buses by current_id
                  .map((bus, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-gray-100 shadow-md rounded-lg"
                    >
                      <h3 className="text-lg font-semibold text-purple-700">
                        🚌 Bus Info
                      </h3>
                      <p>
                        <strong>Route:</strong> {bus.route ?? "N/A"}
                      </p>
                      <p>
                        <strong>Departure:</strong> {bus.departure ?? "N/A"}
                      </p>
                      <p>
                        <strong>Arrival:</strong> {bus.arrival ?? "N/A"}
                      </p>
                      <p>
                        <strong>Seats:</strong> {bus.seats ?? "N/A"}
                      </p>
                      <p>
                        <strong>Passengers:</strong>{" "}
                        {bus.no_adults + (bus.no_children || 0) ?? "N/A"}
                      </p>
                    </div>
                  ))}

              {type === "tours" &&
                currentList?.tours?.length > 0 &&
                currentList.tours
                  // .filter(tour => tour.id === current_id) // Filter tours by current_id
                  .map((tour, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-gray-100 shadow-md rounded-lg"
                    >
                      <h3 className="text-lg font-semibold text-blue-700">
                        🚍 Tour Info
                      </h3>
                      <p>
                        <strong>Adults:</strong> {tour.no_adults ?? "N/A"}
                      </p>
                      <p>
                        <strong>Children:</strong> {tour.no_children ?? "N/A"}
                      </p>
                    </div>
                  ))}

              {type === "visas" &&
                currentList?.visas?.length > 0 &&
                currentList.visas
                  // .filter(visa => visa.id === current_id) // Filter visas by current_id
                  .map((visa, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-gray-100 shadow-md rounded-lg"
                    >
                      <h3 className="text-lg font-semibold text-green-700">
                        🛂 Visa Info
                      </h3>
                      <p>
                        <strong>Adults:</strong> {visa.no_adults ?? "N/A"}
                      </p>
                      <p>
                        <strong>Children:</strong> {visa.no_children ?? "N/A"}
                      </p>
                    </div>
                  ))}

              {type === "flights" &&
                currentList?.flights?.length > 0 &&
                currentList.flights
                  // .filter(flight => flight.id === current_id) // Filter flights by current_id
                  .map((flight, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-gray-100 shadow-md rounded-lg"
                    >
                      <h3 className="text-lg font-semibold text-red-700">
                        ✈️ Flight Info
                      </h3>
                      <p>
                        <strong>Adults:</strong> {flight.no_adults ?? "N/A"}
                      </p>
                      <p>
                        <strong>Children:</strong> {flight.no_children ?? "N/A"}
                      </p>
                    </div>
                  ))}

              {!["tours", "visas", "flights"].includes(currentData?.type) && (
                <p className="text-gray-600">
                  No passenger data available for this type.
                </p>
              )}
            </div>
          )}

          {activeTab === "Voucher" && (
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                🎟️ Voucher Details
              </h2>

              {/* Agent Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700">
                  Agent Information
                </h3>
                <div className="mt-2 bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p>
                    <strong>Name:</strong> {data.agent_data.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {data.agent_data.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {data.agent_data.phone}
                  </p>
                </div>
              </div>

              {/* Manual Booking Code
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700">Manual Booking Code</h3>
      <div className="mt-2 bg-gray-100 p-4 rounded-lg shadow-sm">
        <p><strong>Code:</strong> <span className="text-blue-600 font-medium">{voucherData.manualBooking.code}</span></p>
      </div>
    </div> */}
            </div>
          )}

          {activeTab === "Notes" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Notes
              </h2>
              <p className="text-gray-600">No notes available.</p>
            </div>
          )}

          {activeTab === "Invoice" &&
            currentDataInvoice &&
            (selectedPaymentId ? (
              <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                  🧾 Invoice Report
                </h2>

                {/* Client Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Client Information
                  </h3>
                  <div className="mt-2 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <p>
                      <strong>Name:</strong> {currentDataInvoice.client?.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {currentDataInvoice.client?.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {currentDataInvoice.client?.phone}
                    </p>
                  </div>
                </div>

                {/* Booking Payment Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Payment Details
                  </h3>
                  <div className="mt-2 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <p>
                      <strong>Amount:</strong>{" "}
                      <span className="text-green-600 font-bold">
                        ${currentDataInvoice.booking_payment?.amount}
                      </span>
                    </p>
                    <p>
                      <strong>Code:</strong>{" "}
                      <span className="text-blue-600 font-medium">
                        {currentDataInvoice.booking_payment?.code}
                      </span>
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {currentDataInvoice.booking_payment?.date}
                    </p>
                    <p>
                      <strong>Details:</strong>{" "}
                      {currentDataInvoice.booking_payment?.financial?.details}
                    </p>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Financial Institution
                  </h3>
                  <div className="mt-2 flex items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                    {currentDataInvoice.booking_payment?.financial.logo_link ? (
                      <img
                        src={
                          currentDataInvoice.booking_payment?.financial
                            .logo_link
                        }
                        alt="Financial Logo"
                        className="w-16 h-16 rounded-full shadow-md mr-4"
                      />
                    ) : (
                      <span className="text-gray-500">No Logo Available</span>
                    )}
                    <div>
                      <p>
                        <strong>Name:</strong>{" "}
                        {currentDataInvoice.booking_payment?.financial.name}
                      </p>
                      <p>
                        <strong>Balance:</strong> $
                        {currentDataInvoice.booking_payment?.financial.balance}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center text-lg">
                No data available
              </p>
            ))}

          {activeTab === "Payments" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5 border-b-2 pb-2">
                💳 Payments
              </h2>
              {dataDetails?.payments?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 shadow-lg rounded-lg bg-white">
                    {/* Table Header */}
                    <thead>
                      <tr className="bg-blue-500 text-white">
                        <th className="border border-gray-300 p-3">Amount</th>
                        <th className="border border-gray-300 p-3">Code</th>
                        <th className="border border-gray-300 p-3">Date</th>
                        <th className="border border-gray-300 p-3">
                          Financial Name
                        </th>
                        <th className="border border-gray-300 p-3">Logo</th>
                        <th className="border border-gray-300 p-3">
                          Invoice
                        </th>{" "}
                        {/* New Column */}
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {dataDetails.payments.map((payment, index) => (
                        <tr
                          key={index}
                          className="text-center border-b hover:bg-gray-100 transition duration-200"
                        >
                          <td className="border border-gray-300 p-3 font-semibold text-green-600">
                            ${payment.amount}
                          </td>
                          <td className="border border-gray-300 p-3 text-blue-600 font-medium">
                            {payment.code}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {payment.date}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {payment.financial?.name || "N/A"}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {payment.financial?.logo_link ? (
                              <img
                                src={payment.financial.logo_link}
                                alt="Logo"
                                className="w-12 h-12 mx-auto rounded-full shadow-md"
                              />
                            ) : (
                              <span className="text-gray-500">No Logo</span>
                            )}
                          </td>
                          {/* Invoice Icon Button */}
                          <td className="border border-gray-300 p-3">
                            <button
                              onClick={() => {
                                setSelectedPaymentId(payment.id); // Store the clicked payment ID
                                setActiveTab("Invoice"); // Switch tab
                                refetchInvoice(); // Fetch invoice data with new ID
                              }}
                              className="text-blue-500 hover:text-blue-700 transition duration-200"
                            >
                              🧾 {/* Invoice Icon */}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-center text-lg">
                  No payment data available.
                </p>
              )}
            </div>
          )}

          {activeTab === "Actions" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Actions
              </h2>
              <div className="mt-2 space-y-2">
                <div className="p-3 bg-red-100 border-l-4 border-red-500 rounded">
                  <p>
                    <strong>Canceled Reason:</strong>{" "}
                    {dataDetails?.actions?.canceled?.[0]?.cancelation_reason ||
                      "N/A"}
                  </p>
                </div>
                <div className="p-3 bg-green-100 border-l-4 border-green-500 rounded">
                  <p>
                    <strong>Confirmed:</strong>{" "}
                    {dataDetails?.actions?.confirmed?.length > 0 ? "Yes" : "No"}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 border-l-4 border-blue-500 rounded">
                  <p>
                    <strong>Vouchered:</strong>{" "}
                    {dataDetails?.actions?.vouchered?.[0]?.confirmation_num ||
                      "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsCurrent;
