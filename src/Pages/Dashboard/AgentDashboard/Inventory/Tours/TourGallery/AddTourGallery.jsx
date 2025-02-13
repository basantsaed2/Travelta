import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa"; // Importing icons from react-icons
import { Switch, FormControlLabel } from "@mui/material";
import { usePost } from "../../../../../../Hooks/usePostJson";
import StaticLoader from "../../../../../../Components/StaticLoader";

const AddTourGallery = ({ id, update, setUpdate }) => {

  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [status, setStatus] = useState(0);
  const { postData, loadingPost, response } = usePost({
    url: `https://travelta.online/agent/tour/add_gallery`,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!loadingPost) {
      setUpdate(!update);
    }
  }, [response]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleImageUpdate = () => {
    const updatedImages = images.map((img) =>
      img === selectedImage ? newImage : img
    );
    setImages(updatedImages);
    setShowModal(false);
  };

  const handleImageDelete = (image) => {
    const filteredImages = images.filter((img) => img !== image);
    setImages(filteredImages);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("tour_id", id);
    formData.append("status", status);
    images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

    try {
      postData(formData, "Images added successfully");
      setImages([]);
      setSelectedImage(null);
      setNewImage(null);
      setStatus(0);
    } catch (error) {
      console.error("Error adding images:", error);
    }
  };

  return (
    <div className="p-5 bg-gray-50">
      {loadingPost ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="flex flex-col">
              <div className="flex items-center gap-3 p-5 bg-white rounded-lg shadow-lg">
            <div className="flex-1">
            <button
            onClick={() => document.getElementById("fileInput").click()}
            className="flex w-full items-center bg-gradient-to-r from-blue-500 to-mainColor text-white px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <FaPlus className="mr-2" />
            Add Image
          </button>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          </div>
      

          {/* Status Toggle */}
        <div className="flex gap-2 items-center">
               <label htmlFor="status-toggle" className="text-lg font-semibold">
              Status:
            </label>
            <FormControlLabel
              control={
                <Switch
                  id="status-toggle"
                  checked={status === 1}
                  onChange={() =>
                    setStatus((prevStatus) => (prevStatus === 1 ? 0 : 1))
                  }
                  color="primary"
                />
              }
              label={status === 1 ? "On" : "Off"}
            />
            </div>
         
         

        

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-transform scale-95">
                <h2 className="text-xl font-semibold mb-4">Update Image</h2>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="mb-4 w-full p-2 rounded-lg border border-gray-300"
                />
                {newImage && (
                  <img
                    src={newImage}
                    alt="New image preview"
                    className="w-32 h-32 object-cover mx-auto rounded-lg shadow-md mb-4"
                  />
                )}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleImageUpdate}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg w-full shadow-md hover:bg-green-600 transition-all"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg w-full shadow-md hover:bg-red-600 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-6 mt-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group bg-gray-100 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={image}
                  alt={`Uploaded image ${index}`}
                  className="w-full h-40 object-cover transform transition-transform duration-300 group-hover:scale-105"
                  onClick={() => handleImageClick(image)}
                />
                <button
                  onClick={() => handleImageDelete(image)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition-all"
                >
                  <FaTrashAlt size={16} />
                </button>
              </div>
            ))}
          </div>

         {images.length>0 &&  <button
            onClick={handleSubmit}
            className="mt-6 bg-mainColor text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all self-start"
          >
            {loadingPost ? "Loading..." : "Submit"}
          </button>}
        </div>
      
      )}
    </div>
  );
};

export default AddTourGallery;
