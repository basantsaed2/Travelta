import React, { useEffect, useState } from "react";

const HotelPolicy = ({ onPoliciesChange }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    onPoliciesChange(policies);
  }, [policies, onPoliciesChange]);

  // Convert selected images to Base64
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(imagePromises)
      .then((base64Images) => setImages([...images, ...base64Images]))
      .catch((err) => console.error("Error converting images:", err));
  };

  // Remove an image before saving
  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSavePolicy = () => {
    if (!title.trim() || !description.trim()) return;

    const newPolicy = { title, description, images };
    setPolicies([...policies, newPolicy]);
    
    // Clear input fields
    setTitle("");
    setDescription("");
    setImages([]);
    setIsAdding(false);
  };

  const handleDeletePolicy = (index) => {
    setPolicies(policies.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-white mt-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Hotel Policy</h2>

      <div className="flex justify-between items-center mb-6">
        <label className="text-lg text-gray-700">Enter Hotel Policy:</label>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600"
          >
            Add Policy
          </button>
        )}
      </div>

      {isAdding && (
        <div className="flex flex-col gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter Policy Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Enter Policy Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>

          {/* Image Upload Section */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="border border-gray-300 p-2 rounded-md w-full"
          />

          {/* Preview Uploaded Images */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt="Preview" className="w-24 h-24 object-cover rounded-md border" />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSavePolicy}
            className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600"
          >
            Save Policy
          </button>
        </div>
      )}

      {/* Display Saved Policies */}
      {policies.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Saved Policies:</h3>
          {policies.map((policy, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-md mb-4 shadow-sm bg-gray-50"
            >
              <div>
                <h4 className="font-bold text-gray-800">Title: {policy.title}</h4>
                <p className="text-gray-700">Description: {policy.description}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {policy.images.map((img, imgIndex) => (
                    <img key={imgIndex} src={img} alt="Policy" className="w-24 h-24 object-cover rounded-md border" />
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleDeletePolicy(index)}
                className="text-red-500 hover:text-red-600 mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelPolicy;
