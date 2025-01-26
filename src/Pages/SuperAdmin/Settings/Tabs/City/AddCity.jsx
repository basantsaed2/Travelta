import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { FaArrowLeft } from 'react-icons/fa';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';
import { useGet } from '../../../../../Hooks/useGet';
import { MenuItem, TextField, CircularProgress, Snackbar, Alert ,Button } from '@mui/material';

const AddCity = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [cityName, setCityName] = useState('');
  const [countryId, setCountryId] = useState('');
  const { postData, loadingPost, response } = usePost({
    url: `https://www.travelta.online/api/super/city/add`,
  });
  const { refetch: refetchCountry, loading: loadingCountry, data: DataCountry } = useGet({
    url: "https://www.travelta.online/api/super/countries",
  });

  const [dataCountry, setDataCountry] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  const auth = useAuth();

  useEffect(() => {
    refetchCountry();
  }, [refetchCountry]);

  useEffect(() => {
    if (DataCountry) {
      setDataCountry(DataCountry.country); // Set country data
    }
  }, [DataCountry]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cityName || !countryId) {
      auth.toastError('Enter both City Name and Country');
      return; // Stop execution if either is missing
    }

    const formData = new FormData();
    formData.append('name', cityName);
    formData.append('country_id', countryId);

    // Posting the data
    postData(formData, 'City Added Successfully');

    // Reset the fields
    setCityName('');
    setCountryId('');
  };

  useEffect(() => {
    if (loadingPost) {
      navigate(-1); // Redirect after posting the data
      setSnackbarMessage('City Added Successfully');
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

  // Handle the back button click
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="min-h-screen flex items-start justify-start">
      <div className=" p-8 rounded-2xl  w-full ">
        <div className="flex items-center mb-6 space-x-2">
          <button onClick={handleBack} className="text-mainColor text-2xl">
            <FaArrowLeft />
          </button>
          <h2 className="text-3xl font-semibold text-mainColor">Add City</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* City Name Input */}
          <div className="mb-6">
            <TextField
              id="cityName"
              label="City Name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Enter city name"
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
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
              label="Select Country"
              className="shadow-lg border-gray-300 rounded-xl"
              required
            >
              {loadingCountry ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                dataCountry.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
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
              className="w-full py-3 rounded-full text-lg font-semibold transition duration-300 ease-in-out"
              disabled={loadingPost}
            >
              {loadingPost ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
            }
            
export default AddCity;
