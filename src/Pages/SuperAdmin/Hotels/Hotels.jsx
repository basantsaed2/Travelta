import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useGet } from '../../../Hooks/useGet';
import { useDelete } from '../../../Hooks/useDelete';
import StaticLoader from '../../../Components/StaticLoader';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const auth = useAuth();
  const { refetch: refetchHotel, loading: loadingHotel, data: DataHotel } = useGet({ url: 'https://www.travelta.online/api/super/hotels' });
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("facilities");

  const openModal = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
    setActiveTab("facilities");
  };
  useEffect(() => {
    refetchHotel();
  }, [refetchHotel]);

  useEffect(() => {
    if (DataHotel) {
      setHotels(DataHotel.hotels);
    }
    console.log('all data', DataHotel);
  }, [DataHotel]);

  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/hotel/delete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setHotels(hotels.filter((hotel) => hotel.id !== id));
    }
    console.log('data hotel', hotels);
  };

  const navigate = useNavigate();

  const handleUpdate = (hotelId) => {
    navigate(`/super_admin/hotels/update/${hotelId}`);
  };

  return (
    <div className="w-full overflow-x-auto scrollSection">
      {loadingHotel ? (
        <div className="flex items-center justify-center w-full h-56">
          <StaticLoader />
        </div>
      ) : (
        <div className="p-4 lg:p-8">
      <div className="overflow-x-auto">
      <table className="min-w-full border border-collapse border-gray-300">
        <thead>
          <tr className="text-white bg-mainColor">
            <th className="px-4 py-2 text-left border-b border-gray-300">Hotel Name</th>
            <th className="px-4 py-2 text-left border-b border-gray-300">City</th>
            <th className="px-4 py-2 text-left border-b border-gray-300">Country</th>
            <th className="px-4 py-2 text-left border-b border-gray-300">Stars</th>
            <th className="px-4 py-2 text-left border-b border-gray-300">Check-In</th>
            <th className="px-4 py-2 text-left border-b border-gray-300">Check-Out</th>
            <th className="px-4 py-2 text-left border-b border-gray-300">Phone</th>
            <th className="px-4 py-2 text-left border-b border-gray-300">Website</th>
            <th className="px-4 py-2 text-left border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id}>
              <td className="px-4 py-2 border border-gray-300">{hotel.hotel_name}</td>
              <td className="px-4 py-2 border border-gray-300">{hotel.city?.name}</td>
              <td className="px-4 py-2 border border-gray-300">{hotel.country?.name}</td>
              <td className="px-4 py-2 border border-gray-300">{hotel.stars}</td>
              <td className="px-4 py-2 border border-gray-300">{hotel.check_in}</td>
              <td className="px-4 py-2 border border-gray-300">{hotel.check_out}</td>
              <td className="px-4 py-2 border border-gray-300">{hotel.phone_number}</td>
              <td className="px-4 py-2 border border-gray-300">
                <a
                  href={hotel.hotel_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Website
                </a>
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <div className="flex gap-2 flex-nowrap">
                  {/* View Icon */}
                  <button
                    onClick={() => openModal(hotel)}
                    className="w-full px-3 py-1 text-sm text-white bg-gray-500 rounded-lg hover:bg-gray-400 md:text-base md:w-auto"
                  >
                    <FaEye/>
                  </button>
                  {/* <button
                    onClick={() => handleUpdate(hotel.id)}
                    className="w-full px-3 py-1 text-sm text-white rounded-lg bg-mainColor hover:bg-blue-600 md:text-base md:w-auto"
                  >
                    <FaEdit/>
                  </button> */}
                  <button
                    onClick={() => handleDelete(hotel.id, hotel.hotel_name)}
                    className="w-full px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 md:text-base md:w-auto"
                  >
                    <FaTrash/>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup */}
      {isModalOpen && selectedHotel && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-h-[80vh] overflow-y-auto transition-transform scale-100">
      
      {/* Modal Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{selectedHotel.hotel_name} Details</h3>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-xl text-mainColor hover:text-gray-700"
        >
          ✖
        </button>
      </div>

      {/* Tabs */}
      <div className="flex mb-4 border-b">
        {["facilities", "themes", "features", "accepted_cards"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2 transition-all ${
              activeTab === tab ? "border-b-2 border-mainColor font-semibold text-mainColor" : "text-gray-600"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="h-[300px] overflow-y-auto px-2">
        
        {/* Facilities */}
        {activeTab === "facilities" && (
          <ul className="pl-5 text-gray-700 list-disc">
            {selectedHotel.facilities?.map((facility, index) => (
              <li key={index}>{facility.name}</li>
            )) || <p>No facilities available.</p>}
          </ul>
        )}

        {/* Themes */}
        {activeTab === "themes" && (
          <ul className="pl-5 text-gray-700 list-disc">
            {selectedHotel.themes?.map((theme, index) => (
              <li key={index}>{theme.name}</li>
            )) || <p>No themes available.</p>}
          </ul>
        )}

        {/* Features */}
        {activeTab === "features" && (
          <div className="flex flex-col gap-4">
            {selectedHotel.features?.length > 0 ? (
              selectedHotel.features.map((feature) => (
                <div key={feature.id} className="relative flex flex-col overflow-hidden bg-white shadow-lg rounded-xl">
                  <div className="relative w-full h-40">
                    <img
                      src={feature.image}
                      alt="Feature"
                      className="object-cover w-full h-full rounded-t-xl"
                    />
                    <div className="absolute inset-0 transition-all bg-black bg-opacity-20 "></div>
                  </div>
                  <div className="p-4">
                    <h3 className="w-full text-lg font-bold truncate text-mainColor">
                      {feature.name}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No features available.</p>
            )}
          </div>
        )}

        {/* Accepted Cards */}
        {activeTab === "accepted_cards" && (
          <ul className="pl-5 text-gray-700 list-disc">
            {selectedHotel.accepted_cards?.map((card, index) => (
              <li key={index}>{card.card_name}</li>
            )) || <p>No cards available.</p>}
          </ul>
        )}

      </div>
    </div>
  </div>
)}

  </div>
</div>

      )}
    </div>
  );
};

export default Hotels;
