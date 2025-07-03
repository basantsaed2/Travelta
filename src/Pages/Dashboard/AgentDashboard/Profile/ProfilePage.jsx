import React, { useEffect, useState } from "react";
import { useGet } from "../../../../Hooks/useGet";
import { usePost } from "../../../../Hooks/usePostJson";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';

const ProfilePage = () => {
  // --- State Management ---
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [imageFile, setImageFile] = useState(null); // State for selected image file
  const [imagePreview, setImagePreview] = useState(null); // State for image preview URL

  // --- API Hooks ---
  const { refetch: refetchProfile, loading: loadingProfile, data: profileData, error: profileError } = useGet({
    url: 'https://travelta.online/agent/my_profile'
  });
  const { postData, loading: loadingPost, response: postResponse, error: postError } = usePost({
    url: `https://travelta.online/agent/update_profile`
  });

  // --- Effects ---

  // Fetch profile data on component mount and on re-fetch
  useEffect(() => {
    refetchProfile();
  }, [refetchProfile]);

  // Populate form data and image preview when profileData is fetched or updated
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
      });
      // Assuming profileData contains an image URL (e.g., profileData.image_url)
      setImagePreview(profileData.image || null);
    }
  }, [profileData]);

  // Handle post response and show a toast notification
  useEffect(() => {
    if (postResponse) {
      toast.success("Profile updated successfully!");
      refetchProfile(); // Refresh data after a successful update
      setIsEditing(false); // Exit editing mode
      setImageFile(null); // Clear selected image after successful update
    }
  }, [postResponse, refetchProfile]);

  // Handle API errors and show a toast notification
  useEffect(() => {
    if (profileError) {
      toast.error("Failed to load profile data.");
    }
  }, [profileError]);
  
  useEffect(() => {
    if (postError) {
      toast.error("Failed to update profile. Please check your network and try again.");
    }
  }, [postError]);

  // --- Event Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleEditClick = () => {
    if (profileData) {
      setFormData({
        name: profileData.name || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
      });
      setImagePreview(profileData.image || null);
    }
    setImageFile(null); // Reset image file when entering edit mode
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (profileData) {
      setFormData({
        name: profileData.name || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
      });
      setImagePreview(profileData.image || null);
    }
    setImageFile(null); // Clear selected image on cancel
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview); // Clean up preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    if (imageFile) {
      submitData.append('image', imageFile); // Append image with key 'image'
    }

    await postData(submitData);
  };

  // --- Render Logic ---

  const renderProfileContent = () => {
    if (loadingProfile) {
      return (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-4 text-lg text-gray-700">Loading profile...</span>
        </div>
      );
    }

    if (profileError) {
      return (
        <div className="text-center text-red-600 p-8">
          <p className="text-xl font-semibold">Oops! Something went wrong.</p>
          <p className="text-gray-600">Could not load profile data. Please try again later.</p>
        </div>
      );
    }

    if (!profileData) {
      return (
        <div className="text-center text-gray-600 p-8">
          <p className="text-xl font-semibold">No profile data available.</p>
          <p className="text-gray-600">Please contact support if this issue persists.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 !w-full bg-white p-8 rounded-2xl shadow-lg">
        {/* Profile Header */}
        <div className="flex flex-col mb-8">
          <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center text-blue-600 mb-4 shadow-inner overflow-hidden">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <FaUserCircle className="w-24 h-24" />
            )}
          </div>
          <h2 className="text-4xl font-bold text-gray-900">{profileData.name}</h2>
          <p className="text-md text-gray-500 capitalize mt-1">{profileData.role}</p>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField
            icon={<FaEnvelope />}
            label="Email Address"
            value={profileData.email}
          />
          <ProfileField
            icon={<FaPhoneAlt />}
            label="Phone Number"
            value={profileData.phone}
          />
        </div>

        {/* Update Button */}
        <div className="mt-8">
          <button
            onClick={handleEditClick}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaEdit />
            Update Profile
          </button>
        </div>
      </div>
    );
  };

  const renderEditForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-white animate-fadeIn p-8 rounded-2xl shadow-lg transition-transform transform hover:scale-[1.02]">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Edit Profile</h2>

      {/* Image Upload Field */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden">
          {imagePreview ? (
            <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
          ) : (
            <FaUserCircle className="w-24 h-24 text-blue-600" />
          )}
        </div>
        <label className="flex items-center gap-2 bg-blue-100 text-blue-700 py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors">
          <FaCamera />
          <span>Choose Profile Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <InputField
        label="Phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleInputChange}
        required
      />

      <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
        <button
          type="button"
          onClick={handleCancelEdit}
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <FaTimes />
          Cancel
        </button>
        <button
          type="submit"
          disabled={loadingPost}
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loadingPost ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <FaSave />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );

  return (
    <div className="bg-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="w-full flex justify-center rounded-3xl">
        {isEditing ? renderEditForm() : renderProfileContent()}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

/**
 * Displays a single profile field with an icon and label.
 */
const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl shadow-inner">
    <div className="text-blue-600 text-2xl">{icon}</div>
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
      <span className="text-lg font-medium text-gray-800 break-words mt-1">{value || 'N/A'}</span>
    </div>
  </div>
);

/**
 * A styled input field component with an icon.
 */
const InputField = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
        placeholder={`Enter your ${label.toLowerCase()}`}
        required={required}
      />
    </div>
  </div>
);

export default ProfilePage;