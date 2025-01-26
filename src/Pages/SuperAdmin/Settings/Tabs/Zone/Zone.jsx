import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { useAuth } from '../../../../../Context/Auth';
import { MenuItem, TextField } from '@mui/material';
import StaticLoader from '../../../../../Components/StaticLoader';

const Zone = () => {
  const navigate = useNavigate();
  const { refetch: refetchCity, loading:loadingCity, data: DataCity } = useGet({
    url: "https://www.travelta.online/api/super/cities",
  });
  const { refetch: refetchCountry,loading:loadingCountry, data: DataCountry } = useGet({
    url: "https://www.travelta.online/api/super/countries",
  });
  const { refetch: refetchZone, data: DataZone } = useGet({
    url: "https://www.travelta.online/api/super/zones",
  });
  const { deleteData } = useDelete();
  const auth = useAuth();

  const [dataCountry, setDataCountry] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [dataZone, setDataZone] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedZone, setSelectedZone] = useState({ id: null, name: "" });
  const [newName, setNewName] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [cityId, setCityId] = useState(null);
  const [countryId, setCountryId] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    refetchCountry();
    refetchCity();
    refetchZone();
  }, [refetchCity, refetchCountry, refetchZone]);

  useEffect(() => {
    if (DataCity) setDataCity(DataCity.city || []);
  }, [DataCity]);

  useEffect(() => {
    if (DataCountry) setDataCountry(DataCountry.country || []);
  }, [DataCountry]);

  useEffect(() => {
    if (DataZone) setDataZone(DataZone.zone || []);
  }, [DataZone]);

  // Handle update initiation
  const handleUpdate = (zone) => {
    setSelectedZone(zone);
    setNewName(zone.name);
    setCityId(zone.city_id);
    setCountryId(zone.country_id);
    setShowPopup(true);
  };

  // Close update popup
  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedZone({ id: null, name: "" });
    setNewName("");
    setCityId(null);
    setCountryId(null);
  };

// Handle update submission
const handleUpdateSubmit = async () => {
  setLoadingUpdate(true); // Indicate loading state
  try {
    const response = await fetch(
      `https://www.travelta.online/api/super/zone/update/${selectedZone.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.user?.token || ''}`, // Include authorization token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName, 
          country_id: countryId, 
          city_id: cityId,
        }),
      }
    );

    if (response.ok) {
      // Parse the updated zone data from the response
      const updatedZone = await response.json();

      // Update the zone in the state
      setDataZone((prev) =>
        prev.map((zone) =>
          zone.id === selectedZone.id
            ? { ...zone,name: newName, country_id: countryId, city_id:cityId, updated_at: new Date().toISOString()}
            : zone
        )
      );

      handlePopupClose(); // Close the popup
    } else {
      const errorData = await response.json();
      console.error("Failed to update zone:", errorData.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error updating zone:", error);
  } finally {
    setLoadingUpdate(false); // Reset loading state
  }
};


  // Handle delete
  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/zone/delete/${id}`, `${name} Deleted Success.`);
    if (success) setDataZone(dataZone.filter((zone) => zone.id !== id));
  };

  // Get country and city names
  const getCountryName = (id) => dataCountry.find((c) => c.id === id)?.name || "Unknown Country";
  const getCityName = (id) => dataCity.find((c) => c.id === id)?.name || "Unknown City";

  return (
<div className="w-full overflow-x-auto scrollSection">
  {loadingCountry || loadingCity ? (
    <div className="w-full h-56 flex justify-center items-center">
      <StaticLoader />
    </div>
  ) : (
    <div className="p-4 lg:p-8">
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-200 min-w-full text-left">
        <thead className='bg-mainColor text-white'>
            <tr className="">
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">Zone Name</th>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">Country Name</th>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">City Name</th>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataZone.map((zone) => (
              <tr key={zone.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">{zone.name}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                  {getCountryName(zone.country_id)}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                  {getCityName(zone.city_id)}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleUpdate(zone)}
                      className="bg-mainColor text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm md:text-base w-full md:w-auto"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(zone.id, zone.name)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm md:text-base w-full md:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-xs sm:max-w-md">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center">Update Zone</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4 text-sm md:text-base"
              placeholder="Enter new zone name"
            />
            <TextField
              select
              fullWidth
              variant="outlined"
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
              label="Select Country"
              size="small"
            >
              {dataCountry.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              label="Select City"
              size="small"
            >
              {dataCity.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </TextField>
            <div className="flex flex-wrap justify-end gap-2 mt-4">
              <button
                onClick={handlePopupClose}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm md:text-base w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                disabled={loadingUpdate}
                className={`px-4 py-2 rounded-lg font-bold text-sm md:text-base w-full sm:w-auto ${
                  loadingUpdate
                    ? "bg-gray-300 text-gray-500"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {loadingUpdate ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )}
</div>

  );
};

export default Zone;
