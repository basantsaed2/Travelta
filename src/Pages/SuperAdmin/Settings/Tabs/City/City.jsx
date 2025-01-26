import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { useAuth } from '../../../../../Context/Auth';
import { MenuItem, TextField } from '@mui/material';
import StaticLoader from '../../../../../Components/StaticLoader';

const City = () => {
  // States for storing cities and countries data

  // Fetch city and country data from API
  const { refetch: refetchCity, loading: loadingCity, data: DataCity } = useGet({
    url: "https://www.travelta.online/api/super/cities",
  });

  const { refetch: refetchCountry, loading: loadingCountry, data: DataCountry } = useGet({
    url: "https://www.travelta.online/api/super/countries",
  });

  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [dataCountry, setDataCountry] = useState([]);
  const [dataCity, setDataCity] = useState([]);

  const auth = useAuth()
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState({ id: null, name: "", country_id: null });
  const [newName, setNewName] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState(null); // Store selected country ID
  // const [countryId, setCountryId] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    refetchCountry();
    refetchCity();
  }, [refetchCity, refetchCountry]);

  useEffect(() => {
    if (DataCity) {
      setDataCity(DataCity.city); // Set city data
    }
  }, [DataCity]);

  useEffect(() => {
    if (DataCountry) {
      setDataCountry(DataCountry.country); // Set country data
    }
  }, [DataCountry]);

  const navigate = useNavigate();

  const handleUpdate = (city) => {
    setSelectedCity(city);
    setNewName(city.name);
    setSelectedCountryId(city.country_id); // Set country ID when updating city
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedCity({ id: null, name: "", country_id: null });
    setNewName("");
    setSelectedCountryId(null); // Reset country ID
  };

  const handleUpdateSubmit = async () => {
    setLoadingUpdate(true);
    try {
      const response = await fetch(
        `https://www.travelta.online/api/super/city/update/${selectedCity.id}`,
        {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${auth.user?.token || ''}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName, country_id: selectedCountryId }), // Send selected country ID
        }
      );

      if (response.ok) {
        const updatedCity = await response.json();

        // Update the local state with the new country details
        setDataCity((prevCity) =>
          prevCity.map((city) =>
            city.id === selectedCity.id
              ? { ...city, name: newName, country_id: selectedCountryId, updated_at: new Date().toISOString() }
              : city
          )
        );

        setShowPopup(false);
        setSelectedCity({ id: null, name: "", country_id: null });
        setNewName("");
        setSelectedCountryId(null);
      } else {
        console.error("Update failed.");
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
    setLoadingUpdate(false);
  };

  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/city/delete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setDataCity(dataCity.filter((city) => city.id !== id));
    }
  };

  // Function to get country name based on country ID
  const getCountryName = (countryId) => {
    const country = dataCountry.find((country) => country.id === countryId);
    return country ? country.name : "Unknown Country";
  };

  return (
    <div className="w-full overflow-x-scroll scrollSection">
    {loadingCountry || loadingCity ?  (
        <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
        </div>
) :

 (  
  
<div className="mx-auto p-8">
  <div className="flex flex-col flex-wrap lg:flex-row gap-6">
    {dataCity.map((city) => (
      <div
        key={city.id}
        className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
      >
        {/* City Header */}
        <div className="h-32 bg-gradient-to-r from-mainColor to-gray-600 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
            {city.name}
          </h3>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <p className="">
            <strong>ID:</strong> {city.id}
          </p>
          <p className="">
            <strong>Created At:</strong>{" "}
            {city.created_at ? city.created_at : "Not Available"}
          </p>
          <p className="">
            <strong>Updated At:</strong>{" "}
            {city.updated_at ? city.updated_at : "Not Available"}
          </p>
          <p className="">
            <strong>Country:</strong> {getCountryName(city.country_id)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between px-6 py-4 bg-gray-50">
          <button
            onClick={() => handleUpdate(city)}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(city.id, city.name)}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 ml-4"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Popup Modal */}
  {showPopup && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Update City
        </h3>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-6"
          placeholder="Enter new city name"
        />
        {/* Country Dropdown */}
        <div className="mb-6">
          <TextField
            select
            fullWidth
            variant="outlined"
            value={selectedCountryId}
            onChange={(e) => setSelectedCountryId(e.target.value)}
            label="Select Country"
            className="shadow-lg border-gray-300"
          >
            {dataCountry.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={handlePopupClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateSubmit}
            disabled={loadingUpdate}
            className={`px-4 py-2 rounded-lg font-bold ${
              loadingUpdate
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } transition`}
          >
            {loadingUpdate ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  )}
</div>


  
  ) }
    </div>
  );
};

export default City;
