import React, { useState, useEffect } from "react";
import { useGet } from "../../../../Hooks/useGet";
import { usePost } from "../../../../Hooks/usePostJson";
import { useAuth } from "../../../../Context/Auth";
import StaticLoader from "../../../../Components/StaticLoader";
import { useDelete } from "../../../../Hooks/useDelete";

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

    const updatedFeatures = selectedFeatures.map((feature) => ({
      ...feature,
      name: newFeature.name || feature.name,
      description: newFeature.description || feature.description,
      image: newFeature.image || feature.image,
    }));

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

  return (
    <div className="p-6 bg-gradient-to-t bg-white shadow-md rounded-lg">
    {loadingFeature ? (
      <div className="flex justify-center items-center h-64">
        <StaticLoader />
      </div>
    ) : (
      <div className="space-y-8">
        {/* Feature Cards */}
        <div className="flex flex-col gap-8">
          {dataFeature.map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white rounded-lg shadow-lg hover:shadow-xl overflow-auto p-6 border border-gray-300 transform transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                {/* Feature Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedFeatures.find((f) => f.id === feature.id)}
                  onChange={() => handleFeatureSelect(feature)}
                  className="h-5 w-5"
                />
  
                {/* Feature Image */}
                <img
                  src={feature.image_url}
                  alt={feature.name}
                  className="w-16 h-16 object-cover rounded-full border-4 border-indigo-500 cursor-pointer"
                  onClick={() => handleFeatureSelect(feature)}
                />
              </div>
  
              {/* Feature Details */}
              <div className="flex-1 ml-4">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">{feature.name}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
  
              {/* Buttons */}
              <div className="flex gap-4 ml-4">
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
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(feature.id, feature.name)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
  
        {/* Add Feature Form */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Add New Feature</h2>
          <input
            type="text"
            name="name"
            value={newFeature.name}
            onChange={handleFeatureChange}
            placeholder="Feature Name"
            className="px-4 py-2 border border-gray-300 rounded-md mb-4 w-full"
          />
          <textarea
            name="description"
            value={newFeature.description}
            onChange={handleFeatureChange}
            placeholder="Feature Description"
            className="px-4 py-2 border border-gray-300 rounded-md mb-4 w-full"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="px-4 py-2 border border-gray-300 rounded-md mb-4 w-full"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            disabled={loadingPost}
            className="px-6 py-3 rounded-md text-white transition-all duration-300 bg-blue-600 hover:bg-blue-700"
          >
            {loadingPost ? "Adding..." : "Add Feature"}
          </button>
        </div>
  
        {/* Update Feature Form (Popup) */}
        {showPopup && selectedFeatures.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-lg">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">Update Selected Features</h3>
              <input
                type="text"
                value={newFeature.name}
                onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md mb-4 w-full"
              />
              <textarea
                value={newFeature.description}
                onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md mb-4 w-full"
              />
              <input
                type="text"
                value={newFeature.image}
                onChange={(e) => setNewFeature({ ...newFeature, image: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md mb-4 w-full"
              />
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleUpdateSubmit}
                  disabled={loadingPut}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  {loadingPut ? "Updating..." : "Update Features"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
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
