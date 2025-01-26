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

<div className="w-full overflow-x-auto scrollSection">
  {loadingCountry ? (
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
                Country Name
              </th>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                Created At
              </th>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                Updated At
              </th>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {dataCountry.map((country) => (
              <tr key={country.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                  {country.name}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                  {country.created_at ? country.created_at : "Not Available"}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                  {country.updated_at ? country.updated_at : "Not Available"}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleUpdate(country)}
                      className="bg-mainColor text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm md:text-base w-full md:w-auto"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(country.id, country.name)}
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
              Update Country
            </h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4 text-sm md:text-base"
              placeholder="Enter new country name"
            />
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

export default CountryList;
