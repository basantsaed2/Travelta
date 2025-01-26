import React, { useEffect, useState } from 'react';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from '@mui/material';

const AddCurrency = () => {
  const [currancyName, setCurrancyName] = useState('');
  const [currancySymbol, setCurrancySymbol] = useState('');
  const [currancyCode, setCurrancyCode] = useState('');

  const { postData, loadingPost, response } = usePost({
    url: `https://www.travelta.online/api/super/currancy/add`,
  });
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingPost) {
      navigate(-1);
    }
  }, [loadingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currancyName) {
      auth.toastError("Please Enter Currency Name");
      return;
    }
    if (!currancySymbol) {
      auth.toastError("Please Enter Currency Symbol");
      return;
    }
    if (!currancyCode) {
      auth.toastError("Please Enter Currency Code");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('currancy_name', currancyName);
    formData.append('currancy_symbol', currancySymbol);
    formData.append('currancy_code', currancyCode);

    try {
      await postData(formData); // Send the FormData object to the API
      auth.toastSuccess('Currency added successfully!');
      // Reset inputs
      setCurrancyName('');
      setCurrancySymbol('');
      setCurrancyCode('');
    } catch (error) {
      auth.setError('Failed to add currency. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex items-center p-6 bg-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full text-2xl transition-all"
        >
          <FaArrowLeft className="text-mainColor" />
        </button>
        <h2 className="text-2xl font-bold  text-mainColor">Add Currency</h2>
      </div>

      <div className="flex flex-1 justify-start items-start p-6">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <TextField
              id="currancyName"
              label="Currency Name"
              value={currancyName}
              onChange={(e) => setCurrancyName(e.target.value)}
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
          <div>
            <TextField
              id="currancySymbol"
              label="Currency Symbol"
              value={currancySymbol}
              onChange={(e) => setCurrancySymbol(e.target.value)}
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
          <div>
            <TextField
              id="currancyCode"
              label="Currency Code"
              value={currancyCode}
              onChange={(e) => setCurrancyCode(e.target.value)}
              fullWidth
              variant="outlined"
              required
              className="rounded-md"
              inputProps={{ maxLength: 3 }}
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loadingPost}
            className="mt-4"
            size="large"
            sx={{
              '&.Mui-disabled': {
                backgroundColor: '#90caf9',
              },
            }}
            endIcon={loadingPost ? <CircularProgress size={24} /> : null}
          >
            {loadingPost ? 'Adding...' : 'Add Currency'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddCurrency;
