import { useState } from "react";

const ImageFeature = () => {
  const [images, setImages] = useState([
    { id: 1, url: "https://via.placeholder.com/150" },
    { id: 2, url: "https://via.placeholder.com/150" },
    { id: 3, url: "https://via.placeholder.com/150" },
    // Add more images as needed
  ]);

  const [featureImages, setFeatureImages] = useState([]); // Store selected image IDs

  // Handle image selection
  const handleImageSelect = (id) => {
    setFeatureImages((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id]; // Add the image ID if it's not already selected
      }
      return prev;
    });
  };

  // Handle image removal
  const handleImageRemove = (id) => {
    setFeatureImages((prev) => prev.filter((imageId) => imageId !== id)); // Remove the image ID from the selected array
  };

  // Submit the selected images (in this case, image IDs)
  const handleSubmit = () => {
    const dataToSend = {
      featureImages, // This contains the selected image IDs
    };

    console.log("Data to be sent in POST request:", dataToSend);
    // You can send the dataToSend object as part of your POST request here.
  };

  return (
    <div className="p-6 max-w-lg mx-auto font-sans">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Image</h3>

      {/* Display Images */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.url}
              alt={`Image ${image.id}`}
              className="w-full h-24 object-cover rounded-md border border-gray-300"
              onClick={() => handleImageSelect(image.id)} // Select on click
            />
            <button
              onClick={() => handleImageRemove(image.id)} // Remove by ID
              className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 transition duration-300"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Display Selected Images */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800">Selected Images</h4>
        <div className="flex flex-wrap gap-4 mt-4">
          {featureImages.map((id) => {
            const selectedImage = images.find((img) => img.id === id); // Find image object by ID
            return selectedImage ? (
              <div key={selectedImage.id} className="relative group">
                <img
                  src={selectedImage.url}
                  alt={`Selected Image ${selectedImage.id}`}
                  className="w-24 h-24 object-cover rounded-md border border-gray-300"
                />
                <button
                  onClick={() => handleImageRemove(selectedImage.id)} // Remove by ID
                  className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 transition duration-300"
                >
                  ×
                </button>
              </div>
            ) : null;
          })}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ImageFeature;
