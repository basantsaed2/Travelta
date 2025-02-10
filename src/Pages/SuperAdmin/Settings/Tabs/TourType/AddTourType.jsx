import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AddTourType = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [tourName, setTourName] = useState('');
  const { postData, loadingPost, response } = usePost({
    url: `https://www.travelta.online/api/super/add/tourtype`,
  });
  const auth = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tourName) {
      auth.toastError('Enter Tour Name');
      return; // Stop execution if country name is not provided
    }

    const formData = new FormData();
    formData.append('name', tourName);

    // Posting the data
    await postData(formData, 'tour Added Successfully');

    if (response?.status === 'success') {
      setSnackbarSeverity('success');
     
      setOpenSnackbar(true);
    } else {
  
      setOpenSnackbar(true);
    }

    // Reset the country name field
    setTourName('');
  };

  useEffect(() => {
    if (loadingPost) {
      navigate(-1);
    }
  }, [loadingPost]);

  // Handle the back button click
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen flex items-start justify-start  py-6">
      <div className=" p-8 rounded-xl w-full ">
        <div className="flex items-center mb-6 space-x-2">
          <button onClick={handleBack} className="text-mainColor text-2xl ">
            <FaArrowLeft />
          </button>
          <h2 className="text-3xl font-semibold text-mainColor">Add Country</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <TextField
              id="countryName"
              label="Country Name"
              value={tourName}
              onChange={(e) => setTourName(e.target.value)}
              fullWidth
              variant="outlined"
              required
              className="rounded-md"
              inputProps={{ maxLength: 50 }}
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AddTourType;
