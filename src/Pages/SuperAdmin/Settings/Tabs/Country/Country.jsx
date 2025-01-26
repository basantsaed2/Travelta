import React, { useEffect, useState } from "react";
import { useGet } from "../../../../../Hooks/useGet";
import { useDelete } from "../../../../../Hooks/useDelete";
import { useAuth } from "../../../../../Context/Auth";
import StaticLoader from "../../../../../Components/StaticLoader";


const CountryList = () => {
  const { refetch: refetchCountry, loading: loadingCountry, data: DataCountry } = useGet({
    url: "https://www.travelta.online/api/super/countries",
  });
  const [dataCountry, setDataCountry] = useState([]);
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const auth = useAuth()
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ id: null, name: "" });
  const [newName, setNewName] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    refetchCountry();
  }, [refetchCountry]);

  useEffect(() => {
    if (DataCountry) {
      setDataCountry(DataCountry.country);
    }
    console.log("DataCountry", DataCountry);
  }, [DataCountry]);

  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/country/delete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setDataCountry(dataCountry.filter((country) => country.id !== id));
    }
  };

  const handleUpdate = (country) => {
    setSelectedCountry(country);
    setNewName(country.name);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedCountry({ id: null, name: "" });
    setNewName("");
  };

  const handleUpdateSubmit = async () => {
    setLoadingUpdate(true);
    try {
      const response = await fetch(
        `https://www.travelta.online/api/super/country/update/${selectedCountry.id}`,
        {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${auth.user?.token || ''}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }),
        }
      );

      if (response.ok) {
        const updatedCountry = await response.json();

        // Update the local state with the new country details
        setDataCountry((prevCountries) =>
          prevCountries.map((country) =>
            country.id === selectedCountry.id
              ? { ...country, name: newName, updated_at: new Date().toISOString() }
              : country
          )
        );

        setShowPopup(false);
        setSelectedCountry({ id: null, name: "" });
        setNewName("");
      } else {
        console.error("Update failed.");
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
    setLoadingUpdate(false);
  };

  return (

    <div className="w-full overflow-x-scroll scrollSection">
    {loadingCountry  ?  (
        <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
        </div>
) :

   (
<div className="mx-auto p-8">
  <div className="flex flex-col flex-wrap lg:flex-row gap-6">
    {dataCountry.map((country) => (
      <div
        key={country.id}
        className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
      >
        {/* Country Header */}
        <div className="h-32 bg-gradient-to-r from-mainColor to-gray-600 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
            {country.name}
          </h3>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <p className="">
            <strong>ID:</strong> {country.id}
          </p>
          <p className="">
            <strong>Created At:</strong>{" "}
            {country.created_at ? country.created_at : "Not Available"}
          </p>
          <p className="">
            <strong>Updated At:</strong>{" "}
            {country.updated_at ? country.updated_at : "Not Available"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between px-6 py-4 bg-gray-50">
          <button
            onClick={() => handleUpdate(country)}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(country.id, country.name)}
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
          Update Country
        </h3>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-6"
          placeholder="Enter new country name"
        />
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

export default CountryList;
