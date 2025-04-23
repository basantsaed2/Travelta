import React from "react";
import { FaUser,FaPlaneDeparture ,FaRoute , FaPlane, FaMoneyBillWave, FaPhone, FaEnvelope ,FaTicketAlt,FaUsers ,FaUserCircle  ,FaBuilding ,FaFileDownload } from "react-icons/fa";

const FlightDetails = (flight) => {
   return (
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg w-full border border-gray-200 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
                  <div className="absolute top-12 left-0 w-8 h-8 rounded-full border-2 border-blue-400 opacity-20"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full border-2 border-blue-400 opacity-20"></div>
                  
                  {/* Header Section */}
                  <div className="relative z-10 flex items-start gap-4 mb-6 pb-6 border-b border-gray-200">
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                          <FaPlane className="text-blue-600 text-3xl" />
                      </div>
                      <div className="flex-1">
                          <div className="flex justify-between items-start">
                              <div>
                                  <h3 className="text-2xl font-bold text-gray-800">{flight.airline} Flight</h3>
                                  <p className="text-gray-500">Booking Code: {flight.code}</p>
                              </div>
                              <div className="flex gap-2">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      flight.status === 'confirmed' ? 'bg-green-100 text-green-800 border border-green-200' :
                                      flight.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                                      'bg-red-100 text-red-800 border border-red-200'
                                  }`}>
                                      {flight.status}
                                  </span>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      flight.payment_status === 'paid' ? 'bg-green-100 text-green-800 border border-green-200' :
                                      'bg-amber-100 text-amber-800 border border-amber-200'
                                  }`}>
                                      {flight.payment_status}
                                  </span>
                              </div>
                          </div>
                      </div>
                  </div>
      
                  {/* Main Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Flight Details Card */}
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 relative">
                          <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-500 rounded-full"></div>
                          <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                              <FaPlaneDeparture className="text-blue-500" />
                              Flight Details
                          </h4>
                          <div className="space-y-3">
                              <div className="flex justify-between">
                                  <span className="text-gray-500 font-medium">Class:</span>
                                  <span className="text-gray-800 font-medium">{flight.flight_class}</span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="text-gray-500 font-medium">Type:</span>
                                  <span className="text-gray-800">{flight.flight_type}</span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="text-gray-500 font-medium">Direction:</span>
                                  <span className="text-gray-800">{flight.flight_direction}</span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="text-gray-500 font-medium">Departure:</span>
                                  <span className="text-gray-800">{flight.depature}</span>
                              </div>
                          </div>
                      </div>
      
                      {/* Passengers Card */}
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                              <FaUsers className="text-blue-500" />
                              Passengers
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                              <div className="bg-blue-50 p-2 rounded-lg">
                                  <p className="text-blue-600 font-bold text-xl">{flight.adults_no}</p>
                                  <p className="text-gray-500 text-xs">Adults</p>
                              </div>
                              <div className="bg-amber-50 p-2 rounded-lg">
                                  <p className="text-amber-600 font-bold text-xl">{flight.children_no}</p>
                                  <p className="text-gray-500 text-xs">Children</p>
                              </div>
                              <div className="bg-purple-50 p-2 rounded-lg">
                                  <p className="text-purple-600 font-bold text-xl">{flight.infants_no}</p>
                                  <p className="text-gray-500 text-xs">Infants</p>
                              </div>
                          </div>
                      </div>
      
                      {/* Pricing Card */}
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                              <FaMoneyBillWave className="text-blue-500" />
                              Pricing
                          </h4>
                          <div className="flex justify-between items-center">
                              <span className="text-gray-500 font-medium">Total Price:</span>
                              <span className="text-2xl font-bold text-blue-600">
                                  {flight.total_price} {flight.currency || ''}
                              </span>
                          </div>
                      </div>
      
                      {/* Ticket Info Card */}
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                              <FaTicketAlt className="text-blue-500" />
                              Ticket Info
                          </h4>
                          <div className="space-y-3">
                              <div className="flex justify-between">
                                  <span className="text-gray-500 font-medium">PNR:</span>
                                  <span className="text-gray-800 font-medium">{flight.ref_pnr}</span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="text-gray-500 font-medium">Ticket No:</span>
                                  <span className="text-gray-800">{flight.ticket_no}</span>
                              </div>
                          </div>
                      </div>
                  </div>
      
                  {/* Flight Routes */}
                  {flight.from_to && flight.from_to.length > 0 && (
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
                          <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                              <FaRoute className="text-blue-500" />
                              Flight Routes
                          </h4>
                          <div className="space-y-3">
                              {flight.from_to.map((route, index) => (
                                  <div key={index} className="flex items-center gap-3">
                                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                          <FaPlane className="text-blue-500 text-sm" />
                                      </div>
                                      <div className="flex-1">
                                          <p className="font-medium text-gray-800">{route.from} → {route.to}</p>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
      
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Traveler Contact */}
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                              <FaUserCircle className="text-blue-500" />
                              Traveler Contact
                          </h4>
                          <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                  <FaUser className="text-gray-400 flex-shrink-0" />
                                  <span className="text-gray-800">{flight.to_name}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                  <FaPhone className="text-gray-400 flex-shrink-0" />
                                  <span className="text-gray-800">{flight.to_phone}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                  <FaEnvelope className="text-gray-400 flex-shrink-0" />
                                  <span className="text-gray-800">{flight.to_email}</span>
                              </div>
                          </div>
                      </div>
      
                      {/* Supplier Contact */}
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                              <FaBuilding className="text-blue-500" />
                              Supplier Contact
                          </h4>
                          <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                  <FaUser className="text-gray-400 flex-shrink-0" />
                                  <span className="text-gray-800">{flight.supplier_from_name}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                  <FaPhone className="text-gray-400 flex-shrink-0" />
                                  <span className="text-gray-800">{flight.supplier_from_phone}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                  <FaEnvelope className="text-gray-400 flex-shrink-0" />
                                  <span className="text-gray-800">{flight.supplier_from_email}</span>
                              </div>
                          </div>
                      </div>
                  </div>
      
                  {/* Special Request */}
                  {flight.special_request && (
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
                          <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                              <FaStar className="text-blue-500" />
                              Special Request
                          </h4>
                          <p className="text-gray-700 bg-blue-50 p-4 rounded-lg italic">
                              "{flight.special_request}"
                          </p>
                      </div>
                  )}
      
                  {/* Voucher Link */}
                  {flight.voucher && (
                      <div className="flex justify-center">
                          <a 
                              href={flight.voucher} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg shadow-md transition-all transform hover:scale-105"
                          >
                              <FaFileDownload className="text-lg" />
                              <span className="font-medium">Download Flight Ticket</span>
                          </a>
                      </div>
                  )}
              </div>
          );
};

export default FlightDetails;