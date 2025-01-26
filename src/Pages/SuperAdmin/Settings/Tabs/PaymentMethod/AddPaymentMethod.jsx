import React, { useEffect, useState } from 'react';
import { usePost } from '../../../../../Hooks/usePostJson';
import { useAuth } from '../../../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from '@mui/material';

const AddPaymentMethod = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const { postData, loadingPost, response } = usePost({
    url: `https://www.travelta.online/api/super/paymentMethod/add`,
  });
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingPost) {
      navigate(-1);
    }
  }, [loadingPost]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  // Set the Base64 string
        setImagePreview(URL.createObjectURL(file)); // Set the preview URL for image display
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      auth.toastError("Please Enter PaymentMethod Name");
      return;
    }
    if (!description) {
      auth.toastError("Please Enter PaymentMethod Description");
      return;
    }
    if (!image) {
      auth.toastError("Please Enter PaymentMethod image");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);  // Sending the Base64 image string

    try {
      await postData(formData); // Send the FormData object to the API
      auth.toastSuccess('Payment Method added successfully!');
      // Reset inputs
      setName('');
      setDescription('');
      setImage('');
      setImagePreview('');
    } catch (error) {
      auth.setError('Failed to add payment method. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex items-center justify-start p-6 bg-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="p-2  rounded-full text-2xl transition-all"
        >
          <FaArrowLeft className="text-mainColor" />
        </button>
        <h2 className="text-2xl font-bold ml-4 text-mainColor">Add Payment Method</h2>
      </div>

      <div className="flex flex-1 w-[full]  justify-start items-start p-6">
        <form onSubmit={handleSubmit} className="w-full  space-y-6">
          <div>
            <TextField
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              id="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="outlined"
              required
              className="rounded-md"
              inputProps={{ maxLength: 10 }}
              sx={{
                '& .MuiInputBase-root': {
                  padding: '10px 12px',
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

          {/* File Input for Image */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full p-2 rounded-md border border-gray-300"
              required
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
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
            {loadingPost ? 'Adding...' : 'Add Payment Method'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentMethod;
