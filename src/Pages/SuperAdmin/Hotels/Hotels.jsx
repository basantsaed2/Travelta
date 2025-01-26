import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
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
    <div className="w-full overflow-x-auto">
      {loadingHotel ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className='bg-mainColor text-white'>
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
              <button
                onClick={() => handleUpdate(hotel.id)}
                className="px-2 py-1  rounded bg-green-500 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(hotel.id, hotel.hotel_name)}
                className="px-2 py-1  rounded ml-2 bg-red-600 text-white"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      )}
    </div>
  );
};

export default Hotels;
