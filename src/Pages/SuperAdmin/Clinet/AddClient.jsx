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
        <div className=" w-full flex items-center justify-center ">
          <div className="w-full  p-8 bg-opacity-80 rounded-lg  flex flex-col space-y-6">
          <div className="flex items-center">
    <button
          onClick={handleBack}
          className="m-4"
          
        >
          <FaArrowLeft className="text-mainColor text-2xl" />
        </button>
        <h2 className="text-center text-mainColor text-3xl ">Add Hotels</h2>
        

    </div>
    
            <form onSubmit={handleSubmit} className="space-y-8 p-6  rounded-lg shadow-md w-full mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Name Input */}
    <div>
      <label htmlFor="name" className="block text-gray-700 font-semibold">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        required
      />
    </div>

    {/* Email Input */}
    <div>
      <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        required
      />
    </div>

    {/* Phone Input */}
    <div>
      <label htmlFor="phone" className="block text-gray-700 font-semibold">Phone</label>
      <input
        id="phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        required
      />
    </div>

    {/* Password Input */}
    <div>
      <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        required
      />
    </div>

    {/* Emergency Phone Input */}
    <div>
      <label htmlFor="emergencyPhone" className="block text-gray-700 font-semibold">Emergency Phone</label>
      <input
        id="emergencyPhone"
        type="text"
        value={emergencyPhone}
        onChange={(e) => setEmergencyPhone(e.target.value)}
        className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      />
    </div>
  </div>

  {/* Image Upload Section */}
  <div>
    <label htmlFor="images" className="block text-gray-700 font-semibold">Upload Images</label>
    <div className="space-y-4">
      {Array.from({ length: inputCount }).map((_, index) => (
        <div key={index} className="mt-3">
          <input
            id={`image-${index}`}
            type="file"
            onChange={(e) => handleImageChange(e, index)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>
      ))}
    </div>
    <button
      type="button"
      onClick={addImageInput}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
    >
      Add Another Image
    </button>
  </div>

  {/* Submit Button */}
  <div className="text-center">
    <button
      type="submit"
      className="w-full py-3 px-4 bg-mainColor text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
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
