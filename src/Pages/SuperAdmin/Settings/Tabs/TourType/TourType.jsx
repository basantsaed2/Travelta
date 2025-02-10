import React, { useEffect, useState } from "react";
import { useGet } from "../../../../../Hooks/useGet";
import { useDelete } from "../../../../../Hooks/useDelete";
import { useAuth } from "../../../../../Context/Auth";
import StaticLoader from "../../../../../Components/StaticLoader";


const TourType = () => {
  const { refetch: refetchTour, loading: loadingTour, data: DataTour } = useGet({
    url: "https://www.travelta.online/api/super/getTourtype ",
  });
  const [dataTour, setDataTour] = useState([]);
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const auth = useAuth()
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTour, setSelectedTour] = useState({ id: null, name: "" });
  const [newName, setNewName] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    refetchTour();
  }, [refetchTour]);

  useEffect(() => {
    if (DataTour) {
      setDataTour(DataTour.tourtype);
    }
    console.log("DataTour", DataTour);
  }, [DataTour]);

  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/delete/tourtype/${id}`, `${name} Deleted Success.`);
    if (success) {
      setDataTour(dataTour.filter((tour) => tour.id !== id));
    }
  };

  const handleUpdate = (tour) => {
    setSelectedTour(tour);
    setNewName(tour.name);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedTour({ id: null, name: "" });
    setNewName("");
  };

  const handleUpdateSubmit = async () => {
    setLoadingUpdate(true);
    try {
      const response = await fetch(
        `https://www.travelta.online/api/super/update/tourtype/${selectedTour.id}`,
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
        const updatedTour = await response.json();

        // Update the local state with the new country details
        setDataTour((prevTour) =>
          prevTour.map((tour) =>
            tour.id === selectedTour.id
              ? { ...tour, name: newName, updated_at: new Date().toISOString() }
              : tour
          )
        );

        auth.toastSuccess("updated successful")

        setShowPopup(false);
        setSelectedTour({ id: null, name: "" });
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
  {loadingTour ? (
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
              #
              </th>
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">
              Tour Name
              </th>
            
              <th className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {dataTour.map((tour,index) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                   <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                  {index+1}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm md:text-base">
                  {tour.name}
                </td>
          
                <td className="border border-gray-200 px-4 py-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleUpdate(tour)}
                      className="bg-mainColor text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm md:text-base w-full md:w-auto"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(tour.id, tour.name)}
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
              Update Tour
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

export default TourType;
