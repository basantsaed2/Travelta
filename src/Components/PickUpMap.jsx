// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix default marker issue in React Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// const PickUpMap = ({ tourPickUp, setTourPickUp }) => {
//   const [position, setPosition] = useState([tourPickUp.lat, tourPickUp.lng]);

//   // Handle map clicks to set new pickup location
//   const LocationMarker = () => {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setPosition([lat, lng]); // Update state
//         setTourPickUp((prev) => ({
//           ...prev,
//           lat,
//           lng,
//           pick_up_map: `https://www.google.com/maps?q=${lat},${lng}`, // Google Maps link
//         }));
//       },
//     });

//     return position ? <Marker position={position} /> : null;
//   };

//   return (
//     <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <LocationMarker />
//     </MapContainer>
//   );
// };

// export default PickUpMap;


import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const PickUpMap = ({ tourPickUp, setTourPickUp }) => {
  const [position, setPosition] = useState([tourPickUp.lat, tourPickUp.lng]);

  // Function to move the map view when lat/lng changes
  const ChangeView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(coords, 13, { animate: true });
    }, [coords, map]);
    return null;
  };

  // Handle map clicks to set new pickup location
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]); // Update local position state
        setTourPickUp((prev) => ({
          ...prev,
          lat,
          lng,
          pick_up_map: `https://www.google.com/maps?q=${lat},${lng}`, // Google Maps link
        }));
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  // Update position if tourPickUp changes (e.g., user enters a Google Maps link)
  useEffect(() => {
    setPosition([tourPickUp.lat, tourPickUp.lng]);
  }, [tourPickUp.lat, tourPickUp.lng]);

  return (
    <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
      <ChangeView coords={position} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
      <Marker position={position} />
    </MapContainer>
  );
};

export default PickUpMap;
