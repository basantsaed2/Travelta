import React, { useEffect, useState } from "react";
import { useGet } from "../../../Hooks/useGet";
import StaticLoader from "../../../Components/StaticLoader";
// import { useNavigate } from "react-router-dom";
import { useDelete } from '../../../Hooks/useDelete';
import { useAuth } from "../../../Context/Auth";
import { MenuItem, TextField } from '@mui/material';
function MealPlan() {
  const {
    refetch: refetcmealplan,
    loading: loadingmealplan,
    data: Datamealplan,
  } = useGet({ url: "https://www.travelta.online/api/super/meal_plan"});
  const [dataMealplan, setDataMealplan] = useState([]);
  const [dataHotel,setDataHotel]=useState([])
  const [id,setId]=useState(null)
  // const navigate = useNavigate();
    const { deleteData, loadingDelete, responseDelete } = useDelete();
  useEffect(() => {
    refetcmealplan();
  }, [refetcmealplan]);
  useEffect(() => {
      if (Datamealplan) {
        setDataHotel(Datamealplan.hotels);
      }
    }, [Datamealplan]);
  
  useEffect(() => {
    if (Datamealplan) {
      setDataMealplan(Datamealplan.hotel_meal_planss);
    }
    console.log("setDataMealplan", Datamealplan);
  }, [Datamealplan]);
  

  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/meal_plan/delete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setDataMealplan(dataMealplan.filter((meal) => meal.id !== id));
    }
    console.log('data mael plan', dataMealplan);
  };
  const [showPopup, setShowPopup] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState({ id: null, name: "",hotel_id:null });
      const [selectedHotelId, setSelectedHotelId] = useState(null);
    
    const [newName, setNewName] = useState("");
      const [loadingUpdate, setLoadingUpdate] = useState(false);
      const auth = useAuth()
    
    const handleUpdate = (hotel) => {
    setSelectedHotel(hotel.hotel.hotel_name);
    setNewName(hotel.meal_name);
    setShowPopup(true);
    setId(hotel.id)
    setSelectedHotelId(hotel.hotel_id);
  };
  
  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedHotel({ id: null, name: "" ,hotel_id:null });
    setNewName("");
    setId(null)
    setSelectedHotelId(null)

  };
//   useEffect(()=>{
//   console.log(selectedHotelId)
// },[selectedHotelId])
  const handleUpdateSubmit = async () => {
    setLoadingUpdate(true);
    try {
      const response = await fetch(
        `https://www.travelta.online/api/super/meal_plan/update/${id}`,
        {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${auth.user?.token || ''}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ meal_name: newName,hotel_id:selectedHotelId }),
        }
      );

      if (response.ok) {
      const updatedMeal = {
        id,
        meal_name: newName,
        hotel_id: selectedHotelId,
        hotel: dataHotel.find(h => h.id === selectedHotelId) || {}, // جلب معلومات الفندق الجديد
      };

      setDataMealplan(prev =>
        prev.map(item => item.id === id ? updatedMeal : item)
      );
setSelectedHotelId(null)
        setShowPopup(false);
        setSelectedHotel({ id: null, name: "" });
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
       <div className="w-full overflow-x-auto">
    {loadingmealplan ? (
      <div className="flex items-center justify-center w-full h-56">
        <StaticLoader />
      </div>
    ) : 
 ( 
      <div className="p-4 lg:p-8">

    <div className="overflow-x-auto ">
     <table className="min-w-full text-left border border-collapse border-gray-200 table-auto">
     <thead className='text-white bg-mainColor'>
        <tr className="text-xs uppercase ">
          <th className="px-4 py-3 border-b">Meal Name</th>
          <th className="px-4 py-3 border-b">Hotel</th>
          <th className="px-4 py-3 border-b">Action</th>
        </tr>
      </thead>
      <tbody className="text-gray-600">
{Array.isArray(dataMealplan) && dataMealplan.map((meal) => (
          <tr
            key={meal.id}
            className="hover:bg-gray-50"
          >
            <td className="px-4 py-2 text-sm border border-gray-200 md:text-base">{meal.meal_name??"NA"}</td>
            <td className="px-4 py-2 text-sm border border-gray-200 md:text-base">{meal?.hotel?.hotel_name??"NA"}</td>
       <td className="px-4 py-2 border border-gray-200">
            <div className="flex flex-wrap gap-2">
   <button
                onClick={() => handleUpdate(meal)}
                
                className="w-full px-3 py-1 text-sm text-white rounded-lg bg-mainColor hover:bg-blue-600 md:text-base md:w-auto"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(meal.id, meal.name)}
                
                className="w-full px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 md:text-base md:w-auto"
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
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <div className="w-full max-w-xs p-4 bg-white rounded-lg shadow-xl sm:max-w-md">
                  <h3 className="mb-4 text-lg font-semibold text-center text-gray-800 md:text-xl">
                    Update Meal Plan
                  </h3>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 mb-4 text-sm border border-gray-300 rounded-lg md:p-3 focus:ring-2 focus:ring-blue-500 md:text-base"
                    placeholder="Enter new city name"
                  />
                  <TextField
                    select
                    fullWidth
                    variant="outlined"
                    value={selectedHotelId}
                    onChange={(e) => setSelectedHotelId(e.target.value)}
                    label="Select Hotel"
                    size="small"
                  >
                    {dataHotel.map((hotel) => (
                      <MenuItem key={hotel.id} value={hotel.id}>
                        {hotel.hotel_name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <div className="flex flex-wrap justify-end gap-2 mt-4">
                    <button
                      onClick={handlePopupClose}
                      className="w-full px-4 py-2 text-sm text-white bg-gray-400 rounded-lg hover:bg-gray-500 md:text-base sm:w-auto"
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


) }
  </div>
  )
  
}

export default MealPlan;
