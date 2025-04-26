import React from "react";
import MainLogo from "../../Assets/Images/MainLogo";
import Logo from "../../Assets/Images/Logo";

const Invoice = ({ bookingData }) => {
  return (
    <div className="p-6  bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex items-center bg-blue-100 p-4 rounded-t-lg">
       <Logo/>
        <h1 className="text-2xl font-bold text-blue-900 ml-4">Travelta</h1>
      </div>
      
      {/* Invoice Info */}
      <div className="bg-blue-900 text-white p-4 flex justify-between mt-4 rounded-lg">
        <div>
          <h2 className="font-bold">Invoice</h2>
          <p>{bookingData?.booking_payment?.created_at || "N/A"}</p>
        </div>
        <div>
          <h2 className="font-bold">Invoice Date</h2>
          <p>Tuesday, Jul 16, 2024</p>
        </div>
      </div>
      
      {/* Booking ID */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-blue-900">Booking ID</h3>
        <p>{bookingData?.booking_payment?.code || "N/A"}</p>
      </div>
      
      <hr className="my-4 border-blue-900" />
      
      {/* To & From Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-bold text-blue-900">To,</h3>
          <p>{bookingData.client?.name || "N/A"}</p>
          <p>{bookingData.client?.email || "N/A"}</p>
          <p>{bookingData.client?.phone || "N/A"}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-blue-900">From,</h3>
          <p>{bookingData?.agent_data?.name || "N/A"}</p>
          <p>{bookingData?.agent_data?.email || "N/A"}</p>
          <p>{bookingData?.agent_data?.phone || "N/A"}</p>
        </div>
      </div>
      
      <hr className="my-4 border-blue-900" />
      
      {/* Bus Booking Details */}
      {bookingData?.bus && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-blue-900">Bus Booking Details</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p>Bus Name: {bookingData?.bus?.bus_name || "N/A"}</p>
            <p>Bus Number: {bookingData?.bus?.bus_no || "N/A"}</p>
            <p>Code: {bookingData?.bus?.code || "N/A"}</p>
            <p>Departure: {bookingData?.bus?.depature || "N/A"}</p>
            <p>Arrival: {bookingData?.bus?.arrival || "N/A"}</p>
            <p>From: {bookingData?.bus?.from || "N/A"}</p>
            <p>Country: {bookingData?.bus?.country || "N/A"}</p>
            <p>Driver Phone: {bookingData?.bus?.driver_phone || "N/A"}</p>
            <p>Adults: {bookingData?.bus?.no_adults || "N/A"}</p>
            <p>Children: {bookingData?.bus?.no_children || "N/A"}</p>
            <p>Payment Status: {bookingData?.bus?.payment_status || "N/A"}</p>
            {/* <p>Status: {bookingData?.bus?.status || "N/A"}</p> */}
          </div>
        </div>
      )}
      
      {/* Hotel Booking Details */}
      {bookingData?.hotel && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Hotel Booking Details</h2>

          {/* Hotel Name */}
          <div className="flex mb-4">
            <div className="w-full">
              <p className="text-gray-800">Hotel Name: <span className="font-medium">{bookingData?.hotel?.hotel_name || "N/A"}</span></p>
            </div>
          </div>

          {/* Check-in & Check-out */}
          <div className="flex mb-4">
            <div className="w-1/2">
              <p className="text-gray-800">Check-in: <span className="font-medium">{bookingData?.hotel?.check_in || "N/A"}</span></p>
            </div>
            <div className="w-1/2">
              <p className="text-gray-800">Check-out: <span className="font-medium">{bookingData?.hotel?.check_out || "N/A"}</span></p>
            </div>
          </div>

          {/* Adults & Children */}
          <div className="flex mb-4">
            <div className="w-1/2">
              <p className="text-gray-800">Adults: <span className="font-medium">{bookingData?.hotel?.no_adults || "N/A"}</span></p>
            </div>
            <div className="w-1/2">
              <p className="text-gray-800">Children: <span className="font-medium">{bookingData?.hotel?.no_children || "N/A"}</span></p>
            </div>
          </div>

          {/* Nights & Room Type */}
          <div className="flex mb-4">
            <div className="w-1/2">
              <p className="text-gray-800">Nights: <span className="font-medium">{bookingData?.hotel?.no_nights || "N/A"}</span></p>
            </div>
            <div className="w-1/2">
              <p className="text-gray-800">Room Type: <span className="font-medium">{bookingData?.hotel?.room_type || "N/A"}</span></p>
            </div>
          </div>

          {/* Payment Status & Status */}
          <div className="flex mb-4">
            <div className="w-1/2">
              <p className="text-gray-800">Payment Status: <span className="font-medium">{bookingData?.hotel?.payment_status || "N/A"}</span></p>
            </div>
            {/* <div className="w-1/2">
              <p className="text-gray-800">Status: <span className="font-medium">{bookingData?.hotel?.status || "N/A"}</span></p>
            </div> */}
          </div>

          {/* Total Price & Special Request */}
          <div className="flex mb-4">
            <div className="w-1/2">
              <p className="text-gray-800">Total Price: <span className="font-medium">{bookingData?.hotel?.total_price || "N/A"} {bookingData?.hotel?.currency}</span></p>
            </div>
            {/* <div className="w-1/2">
              <p className="text-gray-800">Special Request: <span className="font-medium">{bookingData?.hotel?.special_request || "N/A"}</span></p>
            </div> */}
          </div>

          {/* Supplier Details */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Supplier Details</h2>

          {/* Supplier Name & Email */}
          <div className="flex mb-4">
            <div className="w-1/2">
              <p className="text-gray-800">Name: <span className="font-medium">{bookingData?.hotel?.supplier_from_name || "N/A"}</span></p>
            </div>
            <div className="w-1/2">
              <p className="text-gray-800">Email: <span className="font-medium">{bookingData?.hotel?.supplier_from_email || "N/A"}</span></p>
            </div>
          </div>

          {/* Supplier Phone */}
          <div className="flex mb-4">
            <div className="w-full">
              <p className="text-gray-800">Phone: <span className="font-medium">{bookingData?.hotel?.supplier_from_phone || "N/A"}</span></p>
            </div>
          </div>
        </div>
      )}

      {bookingData?.flight && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Flight Booking Details</h2>

          {/* Flight Code & Airline */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-800">Flight Code: <span className="font-medium">{bookingData?.flight?.code || "N/A"}</span></p>
            <p className="text-gray-800">Airline: <span className="font-medium">{bookingData?.flight?.airline || "N/A"}</span></p>
          </div>

          {/* Departure & Arrival */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-800">Departure: <span className="font-medium">{bookingData?.flight?.depature || "N/A"}</span></p>
            {
              bookingData?.flight?.arrival && (
                <p className="text-gray-800">Arrival: <span className="font-medium">{bookingData?.flight?.arrival || "N/A"}</span></p>
              )
            }
          </div>

          {/* Flight Type & Class */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-800">Flight Type: <span className="font-medium">{bookingData?.flight?.flight_type || "N/A"}</span></p>
            <p className="text-gray-800">Class: <span className="font-medium">{bookingData?.flight?.flight_class || "N/A"}</span></p>
          </div>

          {/* Flight Direction & Reference PNR */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-800">Direction: <span className="font-medium">{bookingData?.flight?.flight_direction || "N/A"}</span></p>
            <p className="text-gray-800">Ref PNR: <span className="font-medium">{bookingData?.flight?.ref_pnr || "N/A"}</span></p>
          </div>

          {/* Passengers Info */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-800">Adults: <span className="font-medium">{bookingData?.flight?.adults_no || "N/A"}</span></p>
            <p className="text-gray-800">Children: <span className="font-medium">{bookingData?.flight?.children_no || "N/A"}</span></p>
          </div>

          {/* Infants */}
          <div className="mb-4">
            <p className="text-gray-800">Infants: <span className="font-medium">{bookingData?.flight?.infants_no || "N/A"}</span></p>
          </div>

          {/* Payment Status & Status */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-800">Payment Status: <span className="font-medium">{bookingData?.flight?.payment_status || "N/A"}</span></p>
            {/* <p className="text-gray-800">Status: <span className="font-medium">{bookingData?.flight?.status || "N/A"}</span></p> */}
          </div>

          {/* Special Request */}
          {/* <div className="mb-4">
            <p className="text-gray-800">Special Request: <span className="font-medium">{bookingData?.flight?.special_request || "N/A"}</span></p>
          </div> */}

          {/* Supplier Details */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Supplier Details</h2>

          {/* Supplier Name & Email */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-800">Name: <span className="font-medium">{bookingData?.flight?.supplier_from_name || "N/A"}</span></p>
            <p className="text-gray-800">Email: <span className="font-medium">{bookingData?.flight?.supplier_from_email || "N/A"}</span></p>
          </div>

          {/* Supplier Phone */}
          <div className="mb-4">
            <p className="text-gray-800">Phone: <span className="font-medium">{bookingData?.flight?.supplier_from_phone || "N/A"}</span></p>
          </div>
        </div>
      )}

      {bookingData?.tour && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Tour Booking Details</h2>

          {/* Tour Name & Type */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-700">Tour Name: <span className="font-medium">{bookingData?.tour?.tour_name || "N/A"}</span></p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Tour Type: <span className="font-medium">{bookingData?.tour?.tour_type || "N/A"}</span></p>
            </div>
          </div>

          {/* Passengers Info */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-700">Adults: <span className="font-medium">{bookingData?.tour?.adults_no || "N/A"}</span></p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Children: <span className="font-medium">{bookingData?.tour?.children_no || "N/A"}</span></p>
            </div>
          </div>

          {/* Tour Hotels */}
          <h3 className="text-lg font-semibold mt-6 mb-4">Hotel Details</h3>
          {bookingData?.tour?.tour_hotels?.map((hotel, index) => (
            <div key={index} className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-700">Hotel Name: <span className="font-medium">{hotel.hotel_name || "N/A"}</span></p>
              </div>
              <div>
                <p className="text-sm text-gray-700">Destination: <span className="font-medium">{hotel.destination || "N/A"}</span></p>
              </div>
              <div>
                <p className="text-sm text-gray-700">Room Type: <span className="font-medium">{hotel.room_type || "N/A"}</span></p>
              </div>
              <div>
                <p className="text-sm text-gray-700">Check-in: <span className="font-medium">{hotel.check_in || "N/A"}</span></p>
              </div>
              <div>
                <p className="text-sm text-gray-700">Check-out: <span className="font-medium">{hotel.check_out || "N/A"}</span></p>
              </div>
            </div>
          ))}

          {/* Tour Buses */}
          <h3 className="text-lg font-semibold mt-6 mb-4">Transportation Details</h3>
          {bookingData?.tour?.tour_buses?.map((bus, index) => (
            <div key={index} className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-700">Transportation: <span className="font-medium">{bus.transportation || "N/A"}</span></p>
              </div>
              <div>
                <p className="text-sm text-gray-700">Seats: <span className="font-medium">{bus.seats || "N/A"}</span></p>
              </div>
            </div>
          ))}

          {/* Payment and Status */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-700">Total Price: <span className="font-medium">{bookingData?.tour?.total_price || "N/A"}</span></p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Payment Status: <span className="font-medium">{bookingData?.tour?.payment_status || "N/A"}</span></p>
            </div>
          </div>

          {/* <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-700">Status: <span className="font-medium">{bookingData?.tour?.status || "N/A"}</span></p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Special Request: <span className="font-medium">{bookingData?.tour?.special_request || "N/A"}</span></p>
            </div>
          </div> */}

          {/* Supplier Details */}
          <h3 className="text-lg font-semibold mt-6 mb-4">Supplier Details</h3>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-700">Name: <span className="font-medium">{bookingData?.tour?.supplier_from_name || "N/A"}</span></p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Email: <span className="font-medium">{bookingData?.tour?.supplier_from_email || "N/A"}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-700">Phone: <span className="font-medium">{bookingData?.tour?.supplier_from_phone || "N/A"}</span></p>
            </div>
          </div>
        </div>
      )}


      {bookingData?.visa && (
        <div className="p-4 rounded-lg">
          <h3 className="text-lg font-bold text-blue-900">Visa Appointment Details</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p>Appointment Date: {bookingData?.visa?.appointment || "N/A"}</p>
            <p>Visa Code: {bookingData?.visa?.code || "N/A"}</p>
            <p>Country: {bookingData?.visa?.country_name || "N/A"}</p>
            <p>Created At: {bookingData?.visa?.created_at || "N/A"}</p>
            <p>Adults: {bookingData?.visa?.no_adults || "N/A"}</p>
            <p>Children: {bookingData?.visa?.no_children || "N/A"}</p>
            <p>Notes: {bookingData?.visa?.notes || "N/A"}</p>
            {/* <p>Status: {bookingData?.visa?.status || "N/A"}</p> */}
            <p>Payment Status: {bookingData?.visa?.payment_status || "N/A"}</p>
            {/* <p>Special Request: {bookingData?.visa?.special_request || "N/A"}</p> */}
          </div>

          {/* Supplier Details Section */}
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-blue-900">Supplier Details</h4>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <p>Name: {bookingData?.visa?.supplier_from_name || "N/A"}</p>
              <p>Email: {bookingData?.visa?.supplier_from_email || "N/A"}</p>
              <p>Phone: {bookingData?.visa?.supplier_from_phone || "N/A"}</p>
            </div>
          </div>
        </div>
      )}

      <hr className="my-4 border-blue-900" />
      
      {/* Payment Details */}
      <div className="bg-blue-900 text-white p-4 rounded-lg">
        <h3 className="text-lg font-bold">Payment Details</h3>
        <p>Total Amount: {bookingData?.booking_payment?.amount || "N/A"} {bookingData?.visa?.currency}</p>
      </div>
      
      {/* Footer */}
      {/* <div className="mt-6 text-center text-gray-700 text-sm border-t pt-4">
        Our support team is always ready to help. Contact us at +1 234 567 890
      </div> */}
    </div>
  );
};

export default Invoice;
