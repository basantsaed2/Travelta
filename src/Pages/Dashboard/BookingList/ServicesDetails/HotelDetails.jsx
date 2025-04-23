import React from "react";
import { FaHotel,FaClipboardList ,FaBed ,FaBuilding ,FaFileDownload,FaUser,FaPhone,FaEnvelope  } from 'react-icons/fa';

const HotelDetails = (hotel) => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-white p-4 md:p-6 rounded-xl shadow-lg w-full border border-gray-100">
            {/* Header Section */}
            <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                    <FaHotel className="text-blue-600 text-3xl" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{hotel.hotel_name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            hotel.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            hotel.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {hotel.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            hotel.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                            'bg-amber-100 text-amber-800'
                        }`}>
                            {hotel.payment_status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Booking Information Card */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                        <FaClipboardList className="text-blue-500" />
                        Booking Information
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-medium">Booking Code:</span>
                            <span className="text-gray-800 font-semibold">{hotel.code}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-medium">Country:</span>
                            <span className="text-gray-800">{hotel.country}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-medium">Check-in:</span>
                            <span className="text-gray-800">{hotel.check_in}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-medium">Check-out:</span>
                            <span className="text-gray-800">{hotel.check_out}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-medium">Nights:</span>
                            <span className="text-gray-800">{hotel.no_nights}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-100">
                            <span className="text-gray-500 font-medium">Total Price:</span>
                            <span className="text-blue-600 font-bold">{hotel.total_price} {hotel.currency || ''}</span>
                        </div>
                    </div>
                </div>

                {/* Room Details Card */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                        <FaBed className="text-blue-500" />
                        Room Details
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <p className="text-gray-500 font-medium">Room Type</p>
                            <p className="text-gray-800">{hotel.room_type}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500 font-medium">Quantity</p>
                            <p className="text-gray-800">{hotel.room_quantity}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500 font-medium">Adults</p>
                            <p className="text-gray-800">{hotel.no_adults}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500 font-medium">Children</p>
                            <p className="text-gray-800">{hotel.no_children}</p>
                        </div>
                    </div>
                </div>

                {/* Guest Contact Card */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                        <FaUser className="text-blue-500" />
                        Guest Information
                    </h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <FaUser className="text-gray-400 flex-shrink-0" />
                            <span className="text-gray-800">{hotel.to_name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaPhone className="text-gray-400 flex-shrink-0" />
                            <span className="text-gray-800">{hotel.to_phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-gray-400 flex-shrink-0" />
                            <span className="text-gray-800">{hotel.to_email}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Supplier Information */}
            <div className="mt-6 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                    <FaBuilding className="text-blue-500" />
                    Supplier Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-gray-500 font-medium">Contact Person</p>
                        <p className="text-gray-800">{hotel.supplier_from_name}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 font-medium">Phone</p>
                        <p className="text-gray-800">{hotel.supplier_from_phone}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 font-medium">Email</p>
                        <p className="text-gray-800">{hotel.supplier_from_email}</p>
                    </div>
                </div>
            </div>

            {/* Special Request */}
            {hotel.special_request && (
                <div className="mt-6 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                        <FaStar className="text-blue-500" />
                        Special Requests
                    </h4>
                    <p className="text-gray-700 italic">"{hotel.special_request}"</p>
                </div>
            )}

            {/* Voucher Link */}
            {hotel.voucher && (
                <div className="mt-6 flex justify-end">
                    <a 
                        href={hotel.voucher} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        <FaFileDownload />
                        Download Voucher
                    </a>
                </div>
            )}
        </div>
    );
};

export default HotelDetails;