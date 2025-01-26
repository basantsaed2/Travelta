import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { FaArrowLeft } from 'react-icons/fa';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';
import { MenuItem, TextField, CircularProgress, Snackbar, Alert,Button } from '@mui/material';
import { useGet } from '../../../../../Hooks/useGet';

const AddZone = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [zoneName, setZoneName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [cityId, setCityId] = useState('');
  const { postData, loadingPost, response } = usePost({
    url: `https://www.travelta.online/api/super/zone/add`,
  });
  
  // Fetch city and country data from API
  const { refetch: refetchCity, loading: loadingCity, data: DataCity } = useGet({
    url: "https://www.travelta.online/api/super/cities",
  });

  const { refetch: refetchCountry, loading: loadingCountry, data: DataCountry } = useGet({
    url: "https://www.travelta.online/api/super/countries",
  });

  const [dataCountry, setDataCountry] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  const auth = useAuth();

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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!zoneName || !countryId || !cityId) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return; // Stop execution if any field is missing
    }

    const formData = new FormData();
    formData.append('name', zoneName);
    formData.append('country_id', countryId);
    formData.append('city_id', cityId);

    // Posting the data
    postData(formData, 'Zone Added Successfully');

    // Reset the fields
    setZoneName('');
    setCountryId('');
    setCityId('');
  };

  useEffect(() => {
    if (loadingPost) {
      setSnackbarMessage('Zone Added Successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate(-1); // Redirect after posting the data
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
    <div className=" flex items-start justify-start ">
      <div className=" p-8 rounded-2xl w-full">
        <div className="flex items-center mb-6 space-x-2">
          <button onClick={handleBack} className="text-mainColor text-xl">
            <FaArrowLeft />
          </button>
          <h2 className="text-3xl font-semibold text-mainColor">Add Zone</h2>
        </div>

        <form onSubmit={handleSubmit} className=''>
          {/* Zone Name Input */}
          <div className="mb-6 w-full">
            <TextField
                      id="zoneName"
                      label="Zone Name"
                      value={zoneName}
                      onChange={(e) => setZoneName(e.target.value)}
                      fullWidth
                      variant="outlined"
                      required
                      className="rounded-md"
                      inputProps={{ maxLength: 10 }}
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
          <div className="mb-6 w-full">
            <TextField
              select
              fullWidth
              variant="outlined"
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
              label="Select Country"
              className="mb-6 shadow-lg border-gray-300"
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

          {/* City Dropdown */}
          <div className="mb-6 w-full">
            <TextField
              select
              fullWidth
              variant="outlined"
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              label="Select City"
              className="mb-6 shadow-lg border-gray-300"
              required
            >
              {loadingCity ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                dataCity.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
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

      {/* Snackbar for success/error messages */}

    </div>
  );
};

export default AddZone;
