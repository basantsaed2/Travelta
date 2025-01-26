import React, { useEffect, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { useAuth } from '../../../../../Context/Auth';

const City = () => {
  const { refetch: refetchCity, loading: loadingCity, data: DataCity } = useGet({
    url: "https://www.travelta.online/api/super/cities",
  });

  const { refetch: refetchCountry, loading: loadingCountry, data: DataCountry } = useGet({
    url: "https://www.travelta.online/api/super/countries",
  });

  const { deleteData, loadingDelete } = useDelete();
  const [dataCountry, setDataCountry] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const auth = useAuth();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState({ id: null, name: "", country_id: null });
  const [newName, setNewName] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    refetchCountry();
    refetchCity();
  }, [refetchCity, refetchCountry]);

  useEffect(() => {
    if (DataCity) {
      setDataCity(DataCity.city);
    }
  }, [DataCity]);

  useEffect(() => {
    if (DataCountry) {
      setDataCountry(DataCountry.country);
    }
  }, [DataCountry]);

  const handleUpdate = (city) => {
    setSelectedCity(city);
    setNewName(city.name);
    setSelectedCountryId(city.country_id);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedCity({ id: null, name: "", country_id: null });
    setNewName("");
    setSelectedCountryId(null);
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
          body: JSON.stringify({ name: newName, country_id: selectedCountryId }),
        }
      );

      if (response.ok) {
        setDataCity((prevCity) =>
          prevCity.map((city) =>
            city.id === selectedCity.id
              ? { ...city, name: newName, country_id: selectedCountryId }
              : city
          )
        );

        handlePopupClose();
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

  const getCountryName = (countryId) => {
    const country = dataCountry.find((country) => country.id === countryId);
    return country ? country.name : "Unknown Country";
  };

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
          <thead className=' bg-mainColor text-white'>
              <tr className="">
                <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                  City Name
                </th>
                <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                  Country Name
                </th>
                <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dataCity.map((city) => (
                <tr key={city.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                    {city.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                    {getCountryName(city.country_id)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleUpdate(city)}
                        className="bg-mainColor text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm md:text-base w-full md:w-auto"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(city.id, city.name)}
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
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center">
                Update City
              </h3>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4 text-sm md:text-base"
                placeholder="Enter new city name"
              />
              <TextField
                select
                fullWidth
                variant="outlined"
                value={selectedCountryId}
                onChange={(e) => setSelectedCountryId(e.target.value)}
                label="Select Country"
                size="small"
              >
                {dataCountry.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
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

export default City;
