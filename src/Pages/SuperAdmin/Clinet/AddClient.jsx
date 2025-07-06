import React, { useState } from "react";
import { usePost } from "../../../Hooks/usePostJson";
import { useAuth } from "../../../Context/Auth";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
const AddClient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [images, setImages] = useState([]);
  const auth = useAuth()
  const [inputCount, setInputCount] = useState(1);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const { postData, loadingPost, response } = usePost({
    url: "https://www.travelta.online/api/super/user/add ",
  });

    // Handle adding new image input fields
    const addImageInput = () => {
        setInputCount(inputCount + 1); // Increment input count to add a new input field
      };
    


  // Handle image file input change
  const handleImageChange = (e, index) => {
    const newImages = [...images]; // Copy current images state
    const file = e.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages[index] = { image: reader.result }; // Add image to the array
        setImages(newImages); // Update state with the new array of images
      };
      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
  };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name) {
            auth.toastError('Name is required');
          }
          if (!email) {
            auth.toastError('Email is required');
          }
          if (!phone) {
            auth.toastError('Phone is required');
          }
          if (!password) {
            auth.toastError('Password is required');
          }
          if (!emergencyPhone) {
            auth.toastError('EmergencyPhone is required');
          }
          if (images===null) {
            auth.toastError('images is required');
          }

          const formData = new FormData();
          formData.append('name', name);
          formData.append('email', email);
          formData.append('phone', phone);
          formData.append('password', password);
          formData.append('emergency_phone', emergencyPhone);
          images.forEach((image, index) => {
            formData.append('image[]', image.image); // Send image as array using 'image[]'
          });

          postData(formData,"Added Successful")
          console.log('all data client' ,formData)


    
    }






    return (
        <div className="flex items-center justify-center w-full ">
          <div className="flex flex-col w-full p-8 space-y-6 rounded-lg bg-opacity-80">
          <div className="flex items-center">
    <button
          onClick={handleBack}
          className="m-4"
          
        >
          <FaArrowLeft className="text-2xl text-mainColor" />
        </button>
        <h2 className="text-3xl text-center text-mainColor ">Add Hotels</h2>
        

    </div>
    
            <form onSubmit={handleSubmit} className="w-full p-6 mx-auto space-y-8 rounded-lg shadow-md">
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {/* Name Input */}
    <div>
      <label htmlFor="name" className="block font-semibold text-gray-700">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 mt-2 transition duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
    </div>

    {/* Email Input */}
    <div>
      <label htmlFor="email" className="block font-semibold text-gray-700">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mt-2 transition duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
    </div>

    {/* Phone Input */}
    <div>
      <label htmlFor="phone" className="block font-semibold text-gray-700">Phone</label>
      <input
        id="phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-3 mt-2 transition duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
    </div>

    {/* Password Input */}
    <div>
      <label htmlFor="password" className="block font-semibold text-gray-700">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mt-2 transition duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
    </div>

    {/* Emergency Phone Input */}
    <div>
      <label htmlFor="emergencyPhone" className="block font-semibold text-gray-700">Emergency Phone</label>
      <input
        id="emergencyPhone"
        type="text"
        value={emergencyPhone}
        onChange={(e) => setEmergencyPhone(e.target.value)}
        className="w-full p-3 mt-2 transition duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>

  {/* Image Upload Section */}
  <div>
    <label htmlFor="images" className="block font-semibold text-gray-700">Upload Images</label>
    <div className="space-y-4">
      {Array.from({ length: inputCount }).map((_, index) => (
        <div key={index} className="mt-3">
          <input
            id={`image-${index}`}
            type="file"
            onChange={(e) => handleImageChange(e, index)}
            className="w-full p-3 transition duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      ))}
    </div>
    <button
      type="button"
      onClick={addImageInput}
      className="px-4 py-2 mt-4 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
    >
      Add Another Image
    </button>
  </div>

  {/* Submit Button */}
  <div className="text-center">
    <button
      type="submit"
      className="w-full px-4 py-3 font-semibold text-white transition duration-300 rounded-lg bg-mainColor hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Add User
    </button>
  </div>
</form>

          </div>
        </div>
      );
  
};

export default AddClient;
