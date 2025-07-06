import React, { useState, useEffect } from "react";
import { useGet } from "../../../../Hooks/useGet";
import { usePost } from "../../../../Hooks/usePostJson";
import { useAuth } from "../../../../Context/Auth";
import StaticLoader from "../../../../Components/StaticLoader";
import { useDelete } from "../../../../Hooks/useDelete";
import { FaCloudUploadAlt } from "react-icons/fa";

const Feature = ({ selectedFeatures, setSelectedFeatures }) => {
  const { refetch: refetchFeature, loading: loadingFeature, data: DataFeature } = useGet({
    url: "https://www.travelta.online/api/super/Features",
  });

  const { postData, loadingPost, response } = usePost({
    url: "https://www.travelta.online/api/super/Feature/adD",
  });

  const { deleteData, loadingDelete, responseDelete } = useDelete();

  const { putData, loadingPut } = usePost({
    url: "https://www.travelta.online/api/super/Feature/Update",
  });

  const auth = useAuth();
  const [dataFeature, setDataFeature] = useState([]);
  const [newFeature, setNewFeature] = useState({ name: "", description: "", image: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(""); // For error handling
  const [showAddFeature, setShowAddFeature] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    refetchFeature();
  }, [refetchFeature]);

  useEffect(() => {
    if (DataFeature) {
      setDataFeature(DataFeature.features);
    }
    console.log("data feature", DataFeature);
  }, [DataFeature]);

  useEffect(() => {
    refetchFeature();
  }, [response]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewFeature({ ...newFeature, image: reader.result }); // Base64 Image
    };
    if (file) {
      reader.readAsDataURL(file); // Convert file to Base64
      setSelectedFileName(file.name); // Store the file name
    }
  };

  const handleAddFeature = async () => {
    const existingFeatureName = dataFeature.find(
      (feature) => feature.name === newFeature.name 
    );

    const existingFeatureDescription = dataFeature.find(
        (feature) => feature.description === newFeature.description
    );

    if (existingFeatureName) {
      auth.toastError("Feature name already exists.");
      return;
    }

    if (existingFeatureDescription) {
      auth.toastError("Feature description already exists.");
      return;
    }

    if (!newFeature.name || !newFeature.description || !newFeature.image) {
      auth.toastError("Please fill in all fields!");
      return;
    }

    setError(""); // Clear any previous error
    postData(newFeature, "Feature Added Successfully");
    handleReset();
  };

  const handleReset = () => {
    setNewFeature({ name: "", description: "", image: "" });
  };

  const handleUpdateSubmit = async () => {
    if (!selectedFeatures.length) {
      auth.toastError("Please select features to update!");
      return;
    }

  const updatedFeatures = selectedFeatures.map((feature) => {
  const updatedFeature = {
    ...feature,
    name: newFeature.name || feature.name,
    description: newFeature.description || feature.description,
  };

  // فقط إذا كانت الصورة جديدة بصيغة Base64
  if (newFeature.image.startsWith("data:image/")) {
    updatedFeature.image = newFeature.image;
  }

  return updatedFeature;
});


    try {
      for (const feature of updatedFeatures) {
        const response = await fetch(
          `https://www.travelta.online/api/super/Feature/Update/${feature.id}`, 
          {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${auth.user?.token || ""}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(feature),
          }
        );

        if (response.ok) {
          const updatedFeatureData = await response.json();
          refetchFeature();
          setDataFeature((prevFeature) =>
            prevFeature.map((f) =>
              f.id === feature.id
                ? { ...f, ...updatedFeatureData, updated_at: new Date().toISOString() }
                : f
            )
          );
        } else {
          console.error("Update failed.");
        }
      }

      setShowPopup(false);
      setSelectedFeatures([]);
      setNewFeature({ name: "", description: "", image: "" });
    } catch (error) {
      console.error("Update Error:", error);
      auth.toastError("Error updating feature.");
    }
  };

  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/Feature/dElete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setDataFeature(dataFeature.filter((feature) => feature.id !== id));
    }
  };

  const handleFeatureChange = (e) => {
    setNewFeature({ ...newFeature, [e.target.name]: e.target.value });
  };

  const handleFeatureSelect = (feature) => {
    if (selectedFeatures.find((selectedFeature) => selectedFeature.id === feature.id)) {
      setSelectedFeatures(selectedFeatures.filter((selectedFeature) => selectedFeature.id !== feature.id));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setNewFeature({ ...newFeature, image: reader.result }); // Store as Base64
      };
      
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };
  
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md bg-gradient-to-t">
    {loadingFeature ? (
      <div className="flex items-center justify-center h-64">
        <StaticLoader />
      </div>
    ) : (
      <div className="space-y-8">
        {/* Feature Cards */}
        <div className="flex flex-col gap-6">
  {dataFeature.map((feature, index) => (
    <div
      key={index}
      className="flex flex-col items-center justify-between p-4 overflow-hidden transition-all duration-300 transform bg-white border border-gray-300 rounded-lg shadow-lg md:flex-row hover:shadow-xl md:p-6"
    >
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        {/* Feature Checkbox */}
        <input
          type="checkbox"
          checked={selectedFeatures.find((f) => f.id === feature.id)}
          onChange={() => handleFeatureSelect(feature)}
          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
        />

        {/* Feature Image */}
        <img
          src={feature.image_url}
          alt={feature.name}
          className="object-cover w-16 h-16 border-4 border-indigo-500 rounded-full cursor-pointer"
          onClick={() => handleFeatureSelect(feature)}
        />
      </div>

      {/* Feature Details */}
      <div className="flex-1 mb-4 ml-0 text-center md:ml-4 md:mb-0 md:text-left">
        <h3 className="mb-2 text-lg font-semibold text-indigo-600">{feature.name}</h3>
        <p className="text-sm text-gray-600 transition-all duration-200 line-clamp-2 hover:line-clamp-none">
          {feature.description}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => {
            setNewFeature({
              name: feature.name,
              description: feature.description,
              image: feature.image_url,
            });
            setSelectedFeatures([feature]);
            setShowPopup(true);
          }}
          className="px-4 py-2 text-white transition bg-yellow-500 rounded-md hover:bg-yellow-600"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => handleDelete(feature.id, feature.name)}
          className="px-4 py-2 text-white transition bg-red-500 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>


  
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
  
        {/* Add Feature Form */}
<div className=""> 
<div
        onClick={() => setShowAddFeature(!showAddFeature)}
        className="flex items-center gap-2 mb-4 text-xl font-semibold text-indigo-600 cursor-pointer"
      >
        <span>Add Feature</span>
        <span>{showAddFeature ? "▲" : "▼"}</span>
      </div>
  
        {showAddFeature &&
         <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold text-indigo-600">Add New Feature</h2>
          <input
            type="text"
            name="name"
            value={newFeature.name}
            onChange={handleFeatureChange}
            placeholder="Feature Name"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          />
          <textarea
            name="description"
            value={newFeature.description}
            onChange={handleFeatureChange}
            placeholder="Feature Description"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          />

      {/* Upload Input */}
      <label className="flex items-center justify-center w-full gap-3 px-4 py-3 mb-4 transition bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200">
        <FaCloudUploadAlt className="text-2xl text-gray-600" />
        <span className="text-sm text-gray-600">
          {selectedFileName ? selectedFileName : "Upload Icon"}
        </span>
        <input type="file" onChange={handleImageChange} className="hidden" />
      </label>
   
          <button
            type="button"
            onClick={handleAddFeature}
            disabled={loadingPost}
            className="px-6 py-3 text-white transition-all duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {loadingPost ? "Adding..." : "Add Feature"}
          </button>
        </div>
        }
        </div>

        {/* Update Feature Form (Popup) */}
        {showPopup && selectedFeatures.length > 0 && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="max-w-lg p-8 bg-white rounded-lg">
      <h3 className="mb-4 text-xl font-semibold text-indigo-600">Update Selected Features</h3>
      
      {/* Feature Name */}
      <input
        type="text"
        value={newFeature.name}
        onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
      />

      {/* Feature Description */}
      <textarea
        value={newFeature.description}
        onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
      />

<input
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUpload(e)}
  className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
/>


      {/* Preview Uploaded Image */}
      {newFeature.image && (
        <img
          src={newFeature.image}
          alt="Preview"
          className="object-cover w-full h-40 mb-4 rounded-md"
        />
      )}

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          type="button"
          onClick={handleUpdateSubmit}
          disabled={loadingPut}
          className="px-4 py-2 text-white bg-blue-600 rounded-md"
        >
          {loadingPut ? "Updating..." : "Update Features"}
        </button>
        <button
          type="button"
          onClick={() => setShowPopup(false)}
          className="px-4 py-2 text-white bg-gray-400 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    )}
  </div>
  
  );
};

export default Feature;
