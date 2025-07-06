import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { FaArrowLeft } from "react-icons/fa";
import { usePost } from "../../../Hooks/usePostJson";
import { useAuth } from "../../../Context/Auth";
import { useGet } from "../../../Hooks/useGet";
import { MenuItem, TextField, CircularProgress, Button } from "@mui/material";

const AddMealPlan = () => {
  const navigate = useNavigate();
  const [mealName, setMealName] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [dataHotel, setDataHotel] = useState([]);
  const auth = useAuth();

  const { postData, loadingPost, response } = usePost({
    url: `https://www.travelta.online/api/super/meal_plan/add`,
  });
  const {
    refetch: refetchMealplan,
    loading: loadingMealplan,
    data: DataMealplan,
  } = useGet({
    url: "https://www.travelta.online/api/super/meal_plan",
  });

   useEffect(() => {
    refetchMealplan();
  }, [refetchMealplan]);
 
  
    useEffect(() => {
      if (DataMealplan) {
        setDataHotel(DataMealplan.hotels); // Set country data
      }
    }, [DataMealplan]);

      const handleSubmit = (e) => {
    e.preventDefault();

    if (!mealName || !hotelId) {
      auth.toastError('Enter both Meal Name  and Hotel');
      return; // Stop execution if either is missing
    }
const formData = new FormData();
    formData.append('meal_name', mealName);
    formData.append('hotel_id', hotelId);
    postData(formData, 'Meal plan Added Successfully');
setHotelId("");
setMealName("");
 };
 const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
 
  useEffect(() => {
    if (loadingPost) {
      navigate(-1); // Redirect after posting the data
      setSnackbarMessage('Meal Plan Added Successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }
  }, [loadingPost, navigate]);

   useEffect(() => {
    if (response && response.error) {
      setSnackbarMessage(response.error);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [response]);

   const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex items-start justify-start min-h-screen">
      <div className="w-full p-8 rounded-2xl">

 <div className="flex items-center mb-6 space-x-2">
          <button onClick={handleBack} className="text-2xl text-mainColor">
            <FaArrowLeft />
          </button>
          <h2 className="text-3xl font-semibold text-mainColor">Add Meal Plan</h2>
        </div>

        <form onSubmit={handleSubmit}>
                    {/* meal plan Name Input */}

   <div className="mb-6">
            <TextField
              id="MealName"
              label="Meal  Name"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="Enter Meal name"
              fullWidth
              variant="outlined"
              required
              className="rounded-xl"
              sx={{
                '& .MuiInputBase-root': {
                 
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1rem',
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </div>
          
 {/* Country Dropdown */}
          <div className="mb-6">
            <TextField
              select
              fullWidth
              variant="outlined"
              value={hotelId}
              onChange={(e) => setHotelId(e.target.value)}
              label="Select Hotel"
              className="border-gray-300 shadow-lg rounded-xl"
              required
            >
              {loadingMealplan ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                dataHotel.map((hotel) => (
                  <MenuItem key={hotel.id} value={hotel.id}>
                    {hotel.hotel_name}
                  </MenuItem>
                ))
              )}
            </TextField>
          </div>
           {/* Submit Button */}
          <div className="flex justify-center mb-4">
          <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full py-3 text-lg font-semibold transition duration-300 ease-in-out rounded-full"
              disabled={loadingPost}
            >
              {loadingPost ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </div>
        </form>


     </div>
     </div>
    )
};

export default AddMealPlan;
