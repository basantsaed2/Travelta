import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles
import { FaTools, FaBath, FaCouch, FaRegGem } from "react-icons/fa";
import { FaRegFileAlt, FaPaw, FaSmokingBan } from "react-icons/fa";

const HotelBookingDetailsPage = () => {
  const location = useLocation();
  const hotel = location.state?.hotel;

  useEffect(()=>{
    console.log("Hotel",hotel)
  },[hotel])

  if (!hotel) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p>No hotel data available.</p>
      </div>
    );
  }
  const [mainSplide, setMainSplide] = useState(null);
  const [thumbSplide, setThumbSplide] = useState(null);

  // Options for the main slider:
  const mainOptions = {
    type: 'fade',
    heightRatio: 0.5,
    pagination: false,
    arrows: false,
    // cover: true,
  };

  // Options for the thumbnail slider:
  const thumbOptions = {
    rewind: true,
    fixedWidth: 104,
    fixedHeight: 58,
    isNavigation: true,
    gap: 10,
    focus: 'center',
    pagination: false,
    cover: true,
    dragMinThreshold: {
      mouse: 4,
      touch: 10,
    },
    breakpoints: {
      640: {
        fixedWidth: 66,
        fixedHeight: 38,
      },
    },
  };

  // Once both Splide instances are mounted, sync them:
  useEffect(() => {
    if (mainSplide && thumbSplide) {
      mainSplide.sync(thumbSplide);
    }
  }, [mainSplide, thumbSplide]);
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Hotel Header */}
      <div className="flex flex-col md:flex-row items-center border-b pb-6 mb-6">
        <img
          src={hotel.hotel_logo || hotel.thumbnail_link}
          alt={hotel.hotel_name}
          className="w-24 h-24 rounded-full object-cover mr-6"
        />
        <div>
          <h1 className="text-3xl font-bold">{hotel.hotel_name}</h1>
          <p className="text-gray-600">
            {hotel.city}, {hotel.country}
          </p>
          <div className="flex items-center mt-2">
            {Array.from({ length: hotel.hotel_stars }).map((_, i) => (
              <FaStar key={i} className="text-yellow-500 mr-1" />
            ))}
            <span className="ml-2 text-gray-700">
              {hotel.hotel_stars} stars
            </span>
          </div>
          {hotel.hotel_themes && hotel.hotel_themes.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Theme: {hotel.hotel_themes[0].name}
            </p>
          )}
        </div>
      </div>

      {/* Main Slider */}
      <Splide
        options={mainOptions}
        onMounted={(splide) => setMainSplide(splide)}
        className="w-full mb-4"
      >
        {hotel.images.map((image, index) => (
    <SplideSlide key={index} className="w-full">
            <img
                src={image}
                alt={hotel.hotel_name}
                className="w-full h-full object-fit" // Or object-cover depending on your needs
            />
          </SplideSlide>
        ))}
      </Splide>
      
      {/* Thumbnail Slider */}
      <Splide
        options={thumbOptions}
        onMounted={(splide) => setThumbSplide(splide)}
        className="w-full"
      >
        {hotel.images.map((image, index) => (
          <SplideSlide key={index}>
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-contain"
            />
          </SplideSlide>
        ))}
      </Splide>

      {/* Room Availability Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
        {hotel.available_rooms && hotel.available_rooms.length > 0 ? (
          hotel.available_rooms.map((room, index) => {
            const details = room.room_details;
            return (
              <div
                key={index}
                className="mb-6 p-4 border rounded-lg bg-white shadow-sm"
              >
                {/* Room Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">
                    {room.room_type} Room
                  </h3>
                  <span className="text-sm text-gray-600">
                    {room.available_quantity} available
                  </span>
                </div>

                {/* Check-In/Check-Out and Price */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-700">
                      <strong>Check-in:</strong> {details.check_in}
                    </p>
                    <p className="text-gray-700">
                      <strong>Check-out:</strong> {details.check_out}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-blue-600 font-semibold">
                      ${hotel.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      {hotel.price_type}
                    </p>
                  </div>
                </div>

                {/* Markups and Cancellation */}
                <div className="mb-4 border-t pt-4">
                  <p className="text-gray-700">
                    <strong>B2B Markup:</strong> {details.b2b_markup}%
                  </p>
                  <p className="text-gray-700">
                    <strong>B2C Markup:</strong> {details.b2c_markup}%
                  </p>
                  <p className="text-gray-700">
                    <strong>B2E Markup:</strong> {details.b2e_markup}%
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Cancellation:</strong> {details.cancelation}
                  </p>
                </div>

                {/* Room Amenities */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">Amenities</h4>
                  <ul className="grid grid-cols-2 gap-2 text-gray-700">
                    {details.amenity && details.amenity.length > 0 ? (
                      details.amenity.map((amenity) => (
                        <li key={amenity.id}>• {amenity.name}</li>
                      ))
                    ) : (
                      <li>No amenities available.</li>
                    )}
                  </ul>
                </div>

                {/* Room Description */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">Description</h4>
                  <p className="text-gray-700">{details.description}</p>
                </div>

                {/* Room Gallery */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">Gallery</h4>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {details.gallery && details.gallery.length > 0 ? (
                      details.gallery.map((img) => (
                        <img
                          key={img.id}
                          src={img.thumbnail_link}
                          alt={`Gallery ${img.id}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))
                    ) : (
                      <p className="text-gray-700">No images available.</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-700">No rooms available.</p>
        )}
      </div>

      {/* Additional Information Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Hotel Policies */}      
        <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-2 flex items-center">
        <FaRegFileAlt className="text-red-500 mr-2" /> Hotel Policies
      </h2>
      <ul className="space-y-2">
        {hotel.hotel_policies && hotel.hotel_policies.length > 0 ? (
          hotel.hotel_policies.map((policy) => (
            <li key={policy.id} className="flex items-center space-x-2 text-gray-700">
              {policy.logo ? (
                <img src={policy.logo} alt={policy.title} className="w-6 h-6" />
              ) : (
                getPolicyIcon(policy.title)
              )}
              <span>
                <strong>{policy.title}:</strong> {policy.description}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-700">No policies available.</p>
        )}
      </ul>
        </div>
        {/* Hotel Facilities Section */}
        <div className="p-4 border rounded-lg bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaTools className="text-blue-500 mr-2" /> Facilities
            </h2>
            <ul className="space-y-2">
            {hotel.hotel_facilities && hotel.hotel_facilities.length > 0 ? (
                hotel.hotel_facilities.map((facility) => (
                <li key={facility.id} className="flex items-center space-x-2">
                    {facility.logo ? (
                    <img
                        src={facility.logo}
                        alt={facility.name}
                        className="w-6 h-6"
                    />
                    ) : facility.name.toLowerCase().includes("bath") ? (
                    <FaBath className="text-blue-500 w-6 h-6" />
                    ) : facility.name.toLowerCase().includes("sofa") ||
                    facility.name.toLowerCase().includes("chair") ? (
                    <FaCouch className="text-green-500 w-6 h-6" />
                    ) : (
                    <FaTools className="text-gray-500 w-6 h-6" />
                    )}
                    <span>{facility.name}</span>
                </li>
                ))
            ) : (
                <p className="text-gray-700">No facilities available.</p>
            )}
            </ul>
        </div>

        {/* Hotel Features Section */}
        <div className="p-4 border rounded-lg bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaRegGem className="text-purple-500 mr-2" /> Features
            </h2>
            <ul className="space-y-2">
            {hotel.hotel_features && hotel.hotel_features.length > 0 ? (
                hotel.hotel_features.map((feature) => (
                <li key={feature.id} className="flex items-center space-x-2">
                    {feature.image ? (
                    <img
                        src={feature.image}
                        alt={feature.name}
                        className="w-6 h-6"
                    />
                    ) : (
                    <FaRegGem className="text-purple-500 w-6 h-6" />
                    )}
                    <span className="font-semibold">{feature.name}:</span>
                    <span>{feature.description}</span>
                </li>
                ))
            ) : (
                <p className="text-gray-700">No features available.</p>
            )}
            </ul>
        </div>



      </div>

      {/* Accepted Payment Methods Section */}      
      {/* <div className="p-4 border rounded-lg bg-white shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-2">Accepted Payment Methods</h2>
        <div className="flex items-center gap-4">
          {hotel.hotel_accepted_cards && hotel.hotel_accepted_cards.length > 0 ? (
            hotel.hotel_accepted_cards.map((card) => (
              <div key={card.id} className="flex flex-col items-center">
                <img
                  src={card.logo}
                  alt={card.card_name}
                  className="w-12 h-12 object-contain"
                />
                <span className="text-sm text-gray-700">
                  {card.card_name}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No payment methods available.</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default HotelBookingDetailsPage;
