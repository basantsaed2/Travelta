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
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="p-4 lg:p-8">
      <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-mainColor text-white">
            <th className="px-4 py-2 border-b border-gray-300 text-left">Hotel Name</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">City</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Country</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Stars</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Check-In</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Check-Out</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Phone</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Website</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Actions</th>
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
                <div className="flex flex-nowrap gap-2">
                  {/* View Icon */}
                  <button
                    onClick={() => openModal(hotel)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-400 text-sm md:text-base w-full md:w-auto"
                  >
                    <FaEye/>
                  </button>
                  <button
                    onClick={() => handleUpdate(hotel.id)}
                    className="bg-mainColor text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm md:text-base w-full md:w-auto"
                  >
                    <FaEdit/>
                  </button>
                  <button
                    onClick={() => handleDelete(hotel.id, hotel.hotel_name)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm md:text-base w-full md:w-auto"
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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-h-[80vh] overflow-y-auto transition-transform scale-100">
      
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{selectedHotel.hotel_name} Details</h3>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-mainColor hover:text-gray-700 text-xl"
        >
          ✖
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
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
          <ul className="list-disc pl-5 text-gray-700">
            {selectedHotel.facilities?.map((facility, index) => (
              <li key={index}>{facility.name}</li>
            )) || <p>No facilities available.</p>}
          </ul>
        )}

        {/* Themes */}
        {activeTab === "themes" && (
          <ul className="list-disc pl-5 text-gray-700">
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
                <div key={feature.id} className="relative flex flex-col bg-white shadow-lg rounded-xl overflow-hidden">
                  <div className="relative w-full h-40">
                    <img
                      src={feature.image}
                      alt="Feature"
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 transition-all "></div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-mainColor truncate w-full">
                      {feature.name}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No features available.</p>
            )}
          </div>
        )}

        {/* Accepted Cards */}
        {activeTab === "accepted_cards" && (
          <ul className="list-disc pl-5 text-gray-700">
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
