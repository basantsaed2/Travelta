import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../../Hooks/useGet';
import { FaTrashAlt, FaCamera } from 'react-icons/fa';
import { useDelete } from '../../../../../../Hooks/useDelete';

import StaticLoader from '../../../../../../Components/StaticLoader';

const TourGallery = ({update, id }) => {
  const { refetch: refetchGallery, loading: loadingGallery, data: DataGallery } = useGet({
    url: `https://travelta.online/agent/tour/gallery/${id}`,
  });

  const [gallery, setGallery] = useState([]);
  const { deleteData, loadingDelete } = useDelete();

  useEffect(() => {
    refetchGallery();
  }, [refetchGallery,update]);

  useEffect(() => {
    if (DataGallery) {
      setGallery(DataGallery.images || []);
    }
    console.log('DataGallery:', DataGallery);
  }, [DataGallery]);

  const handleDelete = async (id) => {
    const success = await deleteData(
      `https://travelta.online/agent/tour/delete_gallery/${id}`,
      `Image Deleted Successfully.`
    );
    if (success) {
      setGallery(gallery.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="">
          {loadingGallery ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (   <div className="p-5 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-mainColor flex items-center gap-2">
          <FaCamera className="text-blue-500" />
        </h1>
      </div>

      {loadingGallery ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : gallery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((image) => (
            <div
              key={image.id}
              className="relative rounded-lg shadow-md overflow-hidden group"
            >
              <img
                src={image.thumbnail_link || 'https://via.placeholder.com/150'}
                alt={`Thumbnail ${image.id}`}
                className="w-full h-48 object-cover transition-transform duration-300 "
              />
           
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 focus:outline-none"
              >
                <FaTrashAlt size={18} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No images found in the gallery.</p>
      )}
    </div>)}
    </div>
 
  );
};

export default TourGallery;
