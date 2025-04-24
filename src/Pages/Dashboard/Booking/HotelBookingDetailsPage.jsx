// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { FaBed, FaCalendarCheck, FaCalendarTimes, FaStar } from "react-icons/fa";
// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css'; // Import Splide styles
// import { FaTools, FaBath, FaCouch, FaRegGem } from "react-icons/fa";
// import { FaRegFileAlt, FaPaw, FaSmokingBan } from "react-icons/fa";
// import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, LinearProgress, Paper, Typography } from "@mui/material";

// const HotelBookingDetailsPage = () => {
//   const location = useLocation();
//   const hotel = location.state?.hotel;

//   useEffect(()=>{
//     console.log("Hotel",hotel)
//   },[hotel])

//   if (!hotel) {
//     return (
//       <div className="max-w-4xl mx-auto p-6 text-center">
//         <p>No hotel data available.</p>
//       </div>
//     );
//   }
//   const [mainSplide, setMainSplide] = useState(null);
//   const [thumbSplide, setThumbSplide] = useState(null);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [isPopupOpenGalley, setIsPopupOpenGalley] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const handleOpenPopupGalley = (images) => {
//     setSelectedImages(images);
//     setIsPopupOpenGalley(true);
//   };


//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   // Options for the main slider:
//   const mainOptions = {
//     type: 'fade',
//     heightRatio: 0.5,
//     pagination: false,
//     arrows: false,
//     // cover: true,
//   };

//   // Options for the thumbnail slider:
//   const thumbOptions = {
//     rewind: true,
//     fixedWidth: 104,
//     fixedHeight: 58,
//     isNavigation: true,
//     gap: 10,
//     focus: 'center',
//     pagination: false,
//     cover: true,
//     dragMinThreshold: {
//       mouse: 4,
//       touch: 10,
//     },
//     breakpoints: {
//       640: {
//         fixedWidth: 66,
//         fixedHeight: 38,
//       },
//     },
//   };

//   const ratings = {
//     Staff: 9.8,
//     Facilities: 8.9,
//     Cleanliness: 9.3,
//     Comfort: 9.3,
//     "Value for Money": 9.3,
//     "Free WiFi": 9.4,
//     Location: 9.7,
//   };
//   // Once both Splide instances are mounted, sync them:
//   useEffect(() => {
//     if (mainSplide && thumbSplide) {
//       mainSplide.sync(thumbSplide);
//     }
//   }, [mainSplide, thumbSplide]);
//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gray-50">
//       {/* Hotel Header */}
//       <div className="flex flex-col md:flex-row items-center border-b pb-6 mb-6">
//         <img
//           src={hotel.hotel_logo || hotel.thumbnail_link}
//           alt={hotel.hotel_name}
//           className="w-24 h-24 rounded-full object-cover mr-6"
//         />
//         <div>
//           <h1 className="text-3xl font-bold">{hotel.hotel_name}</h1>
//           <p className="text-gray-600">
//             {hotel.city}, {hotel.country}
//           </p>
//           <div className="flex items-center mt-2">
//             {Array.from({ length: hotel.hotel_stars }).map((_, i) => (
//               <FaStar key={i} className="text-yellow-500 mr-1" />
//             ))}
//             <span className="ml-2 text-gray-700">
//               {hotel.hotel_stars} stars
//             </span>
//           </div>
//           {hotel.hotel_themes && hotel.hotel_themes.length > 0 && (
//             <p className="text-sm text-gray-500 mt-1">
//               Theme: {hotel.hotel_themes[0].name}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Main Slider */}
//       <div className="w-full grid gap-2">
//       {/* First Row - Large Image + Two Medium Images */}
//       <div className="grid grid-cols-3 gap-2">
//         {/* Large Main Image */}
//         <img
//           src={hotel.images[0]}
//           alt="Main"
//           className="col-span-2 w-full h-96 object-cover rounded-lg cursor-pointer"
//           onClick={() => { setSelectedIndex(0); setIsPopupOpen(true); }}
//         />
//         {/* Two Medium Images */}
//         <div className="flex flex-col gap-2">
//           {hotel.images.slice(1, 3).map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Medium ${index + 1}`}
//               className="w-full h-48 object-cover rounded-lg cursor-pointer"
//               onClick={() => { setSelectedIndex(index + 1); setIsPopupOpen(true); }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Second Row - Three Small Images */}
//       <div className="grid grid-cols-3 gap-2">
//         {hotel.images.slice(3, 6).map((image, index) => (
//           <img
//             key={index + 3}
//             src={image}
//             alt={`Small ${index + 3}`}
//             className="w-full h-32 object-cover rounded-lg cursor-pointer"
//             onClick={() => { setSelectedIndex(index + 3); setIsPopupOpen(true); }}
//           />
//         ))}
//       </div>

//       {/* + View More Button (If More Than 6 Images) */}
//       {hotel.images.length > 6 && (
//         <button
//           className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-lg w-full text-center"
//           onClick={() => setIsPopupOpen(true)}
//         >
//           + View More
//         </button>
//       )}

//       {/* Popup Modal with Splide for Image Navigation */}
//       <Dialog 
//   open={isPopupOpen} 
//   onClose={() => setIsPopupOpen(false)} 
//   maxWidth="lg" 
//   fullWidth
//   PaperProps={{
//     sx: { 
//       backgroundColor: "rgba(255, 255, 255)", 
//       backdropFilter: "blur(12px)", 
//       borderRadius: "16px", 
//       padding: "24px",
//       boxShadow: "0px 10px 30px rgba(0,0,0,0.3)"
//     }
//   }}
// >
//   <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
    
//     {/* Left - Image Slider */}
//     <div className="flex  flex-col items-center">
//       <Splide
//         options={{ type: "loop", perPage: 1, arrows: true, pagination: false, start: selectedIndex }}
//         onMoved={(splide) => setSelectedIndex(splide.index)}
//         className="w-full"
//       >
//         {hotel.images.map((image, index) => (
//           <SplideSlide key={index} className="flex justify-center">
//             <img 
//               src={image} 
//               alt={`Image ${index}`} 
//               className="w-[320px] h-[320px] object-cover rounded-md shadow-lg"
//             />
//           </SplideSlide>
//         ))}
//       </Splide>

//       {/* Thumbnails */}
//       <div className="flex mt-4 gap-2 ">
//         {hotel.images.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Thumbnail ${index}`}
//             className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition ${
//               selectedIndex === index ? " " : "border-gray-300 hover:border-gray-500"
//             }`}
//             onClick={() => setSelectedIndex(index)}
//           />
//         ))}
//       </div>
//     </div>

//  {/* Right - Highlights */}
// <div className="text-black px-4">
//   <h3 className="text-xl font-semibold mb-4">Hotel Highlights</h3>
//   <ul className="list-disc pl-5 space-y-3 text-sm">
//     <li className=" transition">📸 High-quality resolution</li>
//     <li className=" transition">🌅 Stunning view</li>
//     <li className=" transition">💡 Well-lit interiors</li>
//     <li className=" transition">🏡 Modern design</li>
//     <li className=" transition">🛋️ Spacious environment</li>
//   </ul>

//   {/* Hotel Advantages Section */}
//   <div className="mt-6">
//     <h3 className="text-xl font-semibold mb-4">Hotel Advantages</h3>

//     {/* Hotel Facilities */}
//     <div className="mb-4">
//       <h4 className="text-lg font-medium">🏢 Facilities</h4>
//       <ul className="list-disc pl-5 space-y-2">
//         {hotel.hotel_facilities.map((facility) => (
//           <li key={facility.id} className=" transition">
//             {facility.name}
//           </li>
//         ))}
//       </ul>
//     </div>

//     {/* Hotel Features */}
//     <div className="mb-4">
//       <h4 className="text-lg font-medium">✨ Features</h4>
//       <ul className="list-disc pl-5 space-y-2">
//         {hotel.hotel_features.map((feature) => (
//           <li key={feature.id} className=" transition">
//             {feature.name} - {feature.description}
//           </li>
//         ))}
//       </ul>
//     </div>

//     {/* Hotel Policies */}
//     <div className="mb-4">
//       <h4 className="text-lg font-medium">📜 Policies</h4>
//       <ul className="list-disc pl-5 space-y-2">
//         {hotel.hotel_policies.map((policy) => (
//           <li key={policy.id} className=" transition">
//             {policy.title}: {policy.description}
//           </li>
//         ))}
//       </ul>
//     </div>

//     {/* Hotel Themes */}
//     <div className="mb-4">
//       <h4 className="text-lg font-medium">🎭 Theme</h4>
//       <p className=" transition">
//         {hotel.hotel_themes.map((theme) => theme.name).join(", ")}
//       </p>
//     </div>

//     {/* Hotel Accepted Cards */}
//     <div className="mb-4">
//       <h4 className="text-lg font-medium">💳 Accepted Cards</h4>
//       <p className=" transition">
//         {hotel.hotel_accepted_cards.map((card) => card.card_name).join(", ")}
//       </p>
//     </div>
//   </div>
// </div>


//     {/* Close Button */}
//     <button 
//       onClick={() => setIsPopupOpen(false)}
//       className="absolute top-3 right-3 bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-md transition-all duration-300 hover:bg-red-600 hover:scale-105"
//     >
//       Close
//     </button>

//   </DialogContent>
// </Dialog>



//     </div>
      
//       {/* Thumbnail Slider
//       <Splide
//         options={thumbOptions}
//         onMounted={(splide) => setThumbSplide(splide)}
//         className="w-full"
//       >
//         {hotel.images.map((image, index) => (
//           <SplideSlide key={index}>
//             <img
//               src={image}
//               alt={`Thumbnail ${index}`}
//               className="w-full h-full object-contain"
//             />
//           </SplideSlide>
//         ))}
//       </Splide> */}

//       {/* Room Availability Section */}
//       <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>

//       {hotel.available_rooms?.length > 0 ? (
//           <div className="overflow-x-auto">
//           <table className="w-full border-collapse rounded-lg shadow-lg overflow-hidden">
//             {/* Table Header */}
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-left">
//                 <th className="border p-3">Room Type</th>
//                 <th className="border p-3">Price</th>
//                 <th className="border p-3  gap-2">
//                    Check-in
//                 </th>
//                 <th className="border p-3   gap-2">
//                    Check-out
//                 </th>
//                 <th className="border p-3   gap-2">
//                    Availability
//                 </th>
//               </tr>
//             </thead>
    
//             {/* Table Body */}
//             <tbody>
//               {hotel.available_rooms.map((room, index) => (
//                 <tr
//                   key={index}
//                   className={`text-center transition-all duration-300 hover:bg-blue-50 ${
//                     index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                   }`}
//                 >
//                   {/* Room Type */}
//                   <td
//                     className="border p-3 text-blue-600 font-medium cursor-pointer hover:text-blue-800"
//                     onClick={() => setSelectedRoom(room)}
//                   >
//                     {room.room_type}
//                   </td>
    
//                   {/* Price */}
//                   <td className="border p-3 text-lg font-semibold text-blue-600">
//                     ${hotel.price} {hotel.price_type}
//                   </td>
    
//                   {/* Check-in */}
//                   <td className="border p-3">{room.room_details.check_in}</td>
    
//                   {/* Check-out */}
//                   <td className="border p-3">{room.room_details.check_out}</td>
    
//                   {/* Availability with Badge */}
//                   <td className="border p-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
//                         room.available_quantity > 0 ? "bg-green-500" : "bg-red-500"
//                       }`}
//                     >
//                       {room.available_quantity > 0
//                         ? `${room.available_quantity} Available`
//                         : "Sold Out"}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-gray-700">No rooms available.</p>
//       )}

//       {/* Popup Modal */}
//       <Dialog open={!!selectedRoom} onClose={() => setSelectedRoom(null)} fullWidth maxWidth="md">
//       {/* Dialog Title with Close Button */}
//       <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Typography variant="h6">{selectedRoom?.room_type} Room</Typography>
//         <IconButton onClick={() => setSelectedRoom(null)} autoFocus>
//         &times;
//         </IconButton>
//       </DialogTitle>

//       {/* Dialog Content */}
//       <DialogContent dividers>
//         <Grid container spacing={3}>
//               {/* Left: Gallery with Thumbnails */}
//               <Grid item xs={12} md={6}>
//             <Box>
//               {/* Main Image Slider */}
//               <Splide options={{ type: "loop", autoplay: true, interval: 3000 }} id="main-slider">
//                 {selectedRoom?.room_details?.gallery?.map((img) => (
//                   <SplideSlide key={img.id}>
//                     <img src={img.thumbnail_link} alt="Room" className="w-full h-60 object-cover rounded-lg" />
//                   </SplideSlide>
//                 ))}
//               </Splide>

//               {/* Thumbnail Navigation */}
//               <Box sx={{ display: "flex", gap: 1, mt: 2, overflowX: "auto", pb: 1 }}>
//                 {selectedRoom?.room_details?.gallery?.map((img, index) => (
//                   <button
//                     key={img.id}
//                     onClick={() => {
//                       document
//                         .querySelector(`#main-slider .splide__slide:nth-child(${index + 1})`)
//                         ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
//                     }}
//                     style={{
//                       width: "80px",
//                       height: "60px",
//                       border: "2px solid transparent",
//                       borderRadius: "8px",
//                       overflow: "hidden",
//                       transition: "border 0.3s",
//                       cursor: "pointer",
//                     }}
//                     onMouseOver={(e) => (e.currentTarget.style.border = "2px solid #000")}
//                     onMouseOut={(e) => (e.currentTarget.style.border = "2px solid transparent")}
//                   >
//                     <img src={img.thumbnail_link} alt="Thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//                   </button>
//                 ))}
//               </Box>
//             </Box>
//           </Grid>

//           {/* Right Section: Room Details */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="subtitle1" fontWeight="bold">✨ Room Advantages</Typography>
//             <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//               {selectedRoom?.room_details?.description}
//             </Typography>

//             <Typography variant="subtitle1" fontWeight="bold">🏠 Amenities</Typography>
//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//               {selectedRoom?.room_details?.amenity?.map((a) => (
//                 <Paper key={a.id} variant="outlined" sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
//                   {a.selected === "yes" && "✅"} {a.name}
//                 </Paper>
//               ))}
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Pricing & Capacity Details */}
//         <Box sx={{ mt: 3 }}>
//           <Typography variant="subtitle1" fontWeight="bold">💰 Pricing Details</Typography>
//           <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 2 }}>
//             <Typography variant="body2"><strong>B2B Markup:</strong> {selectedRoom?.room_details?.b2b_markup}%</Typography>
//             <Typography variant="body2"><strong>B2C Markup:</strong> {selectedRoom?.room_details?.b2c_markup}%</Typography>
//             <Typography variant="body2"><strong>B2E Markup:</strong> {selectedRoom?.room_details?.b2e_markup}%</Typography>
//             <Typography variant="body2"><strong>Cancellation:</strong> {selectedRoom?.room_details?.cancelation}</Typography>
//             <Typography variant="body2"><strong>Price:</strong> ${selectedRoom?.room_details?.price} ({selectedRoom?.room_details?.price_type})</Typography>
//             <Typography variant="body2"><strong>Tax Type:</strong> {selectedRoom?.room_details?.tax_type}</Typography>
//           </Box>
//         </Box>

//         {/* Room Capacity */}
//         <Box sx={{ mt: 3 }}>
//           <Typography variant="subtitle1" fontWeight="bold">👨‍👩‍👧‍👦 Room Capacity</Typography>
//           <Grid container spacing={2} sx={{ p: 2, bgcolor: "grey.100", borderRadius: 2 }}>
//             <Grid item xs={6}><Typography variant="body2"><strong>Max Adults:</strong> {selectedRoom?.room_details?.max_adults}</Typography></Grid>
//             <Grid item xs={6}><Typography variant="body2"><strong>Max Children:</strong> {selectedRoom?.room_details?.max_children}</Typography></Grid>
//             <Grid item xs={6}><Typography variant="body2"><strong>Max Capacity:</strong> {selectedRoom?.room_details?.max_capacity}</Typography></Grid>
//             <Grid item xs={6}><Typography variant="body2"><strong>Min Stay:</strong> {selectedRoom?.room_details?.min_stay} nights</Typography></Grid>
//           </Grid>
//         </Box>

//         {/* Room Policy */}
//         <Box sx={{ mt: 3 }}>
//           <Typography variant="subtitle1" fontWeight="bold">📜 Room Policy</Typography>
//           <Paper variant="outlined" sx={{ p: 2, maxHeight: 150, overflow: "auto", borderLeft: "4px solid #1976D2" }}>
//             <Typography variant="body2" color="textSecondary">{selectedRoom?.room_details?.policy}</Typography>
//           </Paper>
//         </Box>
//       </DialogContent>

//       {/* Close Button */}
//       {/* <DialogActions>
//         <IconButton onClick={() => setSelectedRoom(null)} sx={{ m: 1 }}>
//           Close
//         </IconButton>
//       </DialogActions> */}
//     </Dialog>


//     </div>

//     <Box sx={{ p: 3 }}>
//       {/* Ratings Section */}
//       <Typography variant="h6" fontWeight="bold">
//         Categories:
//       </Typography>
//       <Grid container spacing={2} sx={{ mt: 1 }}>
//         {Object.entries(ratings).map(([key, value], index) => (
//           <Grid item xs={12} md={6} key={index}>
//             <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between" }}>
//               {key} <strong>{value}</strong>
//             </Typography>
//             <LinearProgress
//               variant="determinate"
//               value={(value / 10) * 100}
//               sx={{
//                 height: 8,
//                 borderRadius: 5,
//                 bgcolor: "#ddd",
//                 "& .MuiLinearProgress-bar": { bgcolor: index % 2 === 0 ? "green" : "blue" },
//               }}
//             />
//           </Grid>
//         ))}
//       </Grid>






//     </Box>

//       {/* Additional Information Section */}
//       <div className="mb-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {/* Hotel Policies */}      
//         <div className="p-4 border rounded-lg bg-white shadow-sm">
//       <h2 className="text-xl font-semibold mb-2 flex items-center">
//         <FaRegFileAlt className="text-red-500 mr-2" /> Hotel Policies
//       </h2>
//       <ul className="space-y-2">
//         {hotel.hotel_policies && hotel.hotel_policies.length > 0 ? (
//           hotel.hotel_policies.map((policy) => (
//             <li key={policy.id} className="flex items-center space-x-2 text-gray-700">
//               {policy.logo ? (
//                 <img src={policy.logo} alt={policy.title} className="w-6 h-6" />
//               ) : (
//                 getPolicyIcon(policy.title)
//               )}
//               <span>
//                 <strong>{policy.title}:</strong> {policy.description}
//               </span>
//             </li>
//           ))
//         ) : (
//           <p className="text-gray-700">No policies available.</p>
//         )}
//       </ul>
//         </div>
//         {/* Hotel Facilities Section */}
//         <div className="p-4 border rounded-lg bg-white shadow-sm">
//             <h2 className="text-xl font-semibold mb-2 flex items-center">
//             <FaTools className="text-blue-500 mr-2" /> Facilities
//             </h2>
//             <ul className="space-y-2">
//             {hotel.hotel_facilities && hotel.hotel_facilities.length > 0 ? (
//                 hotel.hotel_facilities.map((facility) => (
//                 <li key={facility.id} className="flex items-center space-x-2">
//                     {facility.logo ? (
//                     <img
//                         src={facility.logo}
//                         alt={facility.name}
//                         className="w-6 h-6"
//                     />
//                     ) : facility.name.toLowerCase().includes("bath") ? (
//                     <FaBath className="text-blue-500 w-6 h-6" />
//                     ) : facility.name.toLowerCase().includes("sofa") ||
//                     facility.name.toLowerCase().includes("chair") ? (
//                     <FaCouch className="text-green-500 w-6 h-6" />
//                     ) : (
//                     <FaTools className="text-gray-500 w-6 h-6" />
//                     )}
//                     <span>{facility.name}</span>
//                 </li>
//                 ))
//             ) : (
//                 <p className="text-gray-700">No facilities available.</p>
//             )}
//             </ul>
//         </div>

//         {/* Hotel Features Section */}
//         <div className="p-4 border rounded-lg bg-white shadow-sm">
//             <h2 className="text-xl font-semibold mb-2 flex items-center">
//             <FaRegGem className="text-purple-500 mr-2" /> Features
//             </h2>
//             <ul className="space-y-2">
//             {hotel.hotel_features && hotel.hotel_features.length > 0 ? (
//                 hotel.hotel_features.map((feature) => (
//                 <li key={feature.id} className="flex items-center space-x-2">
//                     {feature.image ? (
//                     <img
//                         src={feature.image}
//                         alt={feature.name}
//                         className="w-6 h-6"
//                     />
//                     ) : (
//                     <FaRegGem className="text-purple-500 w-6 h-6" />
//                     )}
//                     <span className="font-semibold">{feature.name}:</span>
//                     <span>{feature.description}</span>
//                 </li>
//                 ))
//             ) : (
//                 <p className="text-gray-700">No features available.</p>
//             )}
//             </ul>
//         </div>



//       </div>

//       {/* Accepted Payment Methods Section */}      
//       {/* <div className="p-4 border rounded-lg bg-white shadow-sm mb-6">
//         <h2 className="text-xl font-semibold mb-2">Accepted Payment Methods</h2>
//         <div className="flex items-center gap-4">
//           {hotel.hotel_accepted_cards && hotel.hotel_accepted_cards.length > 0 ? (
//             hotel.hotel_accepted_cards.map((card) => (
//               <div key={card.id} className="flex flex-col items-center">
//                 <img
//                   src={card.logo}
//                   alt={card.card_name}
//                   className="w-12 h-12 object-contain"
//                 />
//                 <span className="text-sm text-gray-700">
//                   {card.card_name}
//                 </span>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-700">No payment methods available.</p>
//           )}
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default HotelBookingDetailsPage;


// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { FaStar, FaMapMarkerAlt, FaWifi, FaParking, FaSwimmingPool, FaUtensils, FaSnowflake, FaDog, FaSmokingBan, FaRegSnowflake } from "react-icons/fa";
// import { IoIosPeople, IoMdTime } from "react-icons/io";
// import { MdMeetingRoom, MdBathtub, MdBedroomParent, MdAirlineSeatReclineExtra } from "react-icons/md";
// import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css';
// import { Box, Dialog, DialogContent, Grid, Typography, Button, Chip, Divider, Paper, IconButton } from "@mui/material";
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { usePost } from "../../../Hooks/usePostJson";
// const HotelBookingDetailsPage = () => {
//   const location = useLocation();
//   const hotel = location.state?.hotel;
//   const { postData, loadingPost, response} = usePost({
//     url: "https://travelta.online/agent/bookRoom",
//   });
//   const { checkIn, checkOut, adults, children } = location.state || {};
//   const availableQuantity = hotel.available_rooms[0]?.available_quantity || 1;
//   const [roomQuantity, setRoomQuantity] = useState(1);
  
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);
//   // const [adults, setAdults] = useState(2);
//   // const [children, setChildren] = useState(0);

//   useEffect(() => {
//     console.log("Hotel", hotel);
//   }, [hotel]);

//   if (!hotel) {
//     return (
//       <div className="max-w-4xl mx-auto p-6 text-center">
//         <p>No hotel data available.</p>
//       </div>
//     );
//   }


//   const handleImageClick = (index) => {
//     setSelectedImageIndex(index);
//     setIsImageModalOpen(true);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       {/* Hotel Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">{hotel.hotel_name}</h1>
//         <div className="flex items-center mt-1">
//           <FaMapMarkerAlt className="text-gray-500 mr-1" />
//           <span className="text-gray-600">
//             {hotel.city}, {hotel.country}
//           </span>
//         </div>
//         <div className="flex items-center mt-2">
//           {Array.from({ length: hotel.hotel_stars }).map((_, i) => (
//             <FaStar key={i} className="text-yellow-400 mr-1" />
//           ))}
//           <span className="ml-2 text-gray-700">
//             {hotel.hotel_stars}-star hotel
//           </span>
//         </div>
//       </div>

//       {/* Image Gallery */}
//       <div className="grid grid-cols-4 gap-2 mb-6">
//         {/* Main Image */}
//         <div 
//           className="col-span-2 row-span-2 cursor-pointer" 
//           onClick={() => handleImageClick(0)}
//         >
//           <img
//             src={hotel.images[0]}
//             alt="Main hotel"
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>
//         {/* Secondary Images */}
//         {hotel.images.slice(1, 5).map((image, index) => (
//           <div 
//             key={index} 
//             className="cursor-pointer"
//             onClick={() => handleImageClick(index + 1)}
//           >
//             <img
//               src={image}
//               alt={`Hotel view ${index + 1}`}
//               className="w-full h-full object-cover rounded-lg"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Image Modal */}
//       <Dialog
//         open={isImageModalOpen}
//         onClose={() => setIsImageModalOpen(false)}
//         maxWidth="lg"
//         fullWidth
//       >
//         <DialogContent>
//           <IconButton
//             onClick={() => setIsImageModalOpen(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <IoMdCloseCircleOutline />
//           </IconButton>
//           <Splide
//             options={{
//               start: selectedImageIndex,
//               rewind: true,
//               gap: '1rem',
//             }}
//           >
//             {hotel.images.map((image, index) => (
//               <SplideSlide key={index}>
//                 <img
//                   src={image}
//                   alt={`Hotel image ${index}`}
//                   className="w-full h-auto max-h-[80vh] object-contain"
//                 />
//               </SplideSlide>
//             ))}
//           </Splide>
//         </DialogContent>
//       </Dialog>

//       {/* Main Content */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Left Column */}
//         <div className="lg:w-2/3">
//           {/* Property Highlights */}
//           {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-xl font-bold mb-4">Property Highlights</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {amenities.map((amenity, index) => (
//                 <div key={index} className="flex items-center">
//                   <span className="text-blue-500 mr-2">{amenity.icon}</span>
//                   <span>{amenity.name}</span>
//                 </div>
//               ))}
//             </div>
//           </div> */}

//           {/* Description */}
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-xl font-bold mb-4">Description</h2>
//             <p className="text-gray-700">
//               {hotel.available_rooms[0]?.room_details?.description || 
//                "This hotel offers comfortable accommodations with modern amenities. Enjoy a pleasant stay with excellent service."}
//             </p>
//           </div>

//           {/* Ratings */}
//           {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-xl font-bold mb-4">Ratings</h2>
//             <div className="space-y-3">
//               {Object.entries(ratings).map(([category, score]) => (
//                 <div key={category} className="flex items-center">
//                   <span className="w-40 font-medium">{category}</span>
//                   <div className="flex-1 mx-2">
//                     <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                       <div 
//                         className="h-full bg-blue-500" 
//                         style={{ width: `${(score / 10) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                   <span className="font-bold">{score}</span>
//                 </div>
//               ))}
//             </div>
//           </div> */}

//           {/* Room Details */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-bold mb-4">Room Types</h2>
//             {hotel.available_rooms.map((room, index) => (
//               <Paper key={index} className="p-4 mb-4">
//                 <div className="flex flex-col md:flex-row gap-4">
//                   <div className="md:w-1/3">
//                     <img
//                       src={room.room_details.thumbnail_link}
//                       alt={room.room_type}
//                       className="w-full h-48 object-cover rounded-lg"
//                     />
//                   </div>
//                   <div className="md:w-2/3">
//                     <h3 className="text-lg font-semibold">{room.room_type} Room</h3>
//                     <div className="flex flex-wrap gap-2 my-2">
//                       {/* {roomFacilities.map((facility, idx) => (
//                         <Chip 
//                           key={idx} 
//                           icon={facility.icon} 
//                           label={facility.name} 
//                           size="small"
//                         />
//                       ))} */}
//                     </div>
//                     <div className="grid grid-cols-2 gap-2 my-2">
//                       <div className="flex items-center">
//                         <IoIosPeople className="mr-2" />
//                         <span>Max {room.room_details.max_adults} adults</span>
//                       </div>
//                       <div className="flex items-center">
//                         <MdBedroomParent className="mr-2" />
//                         <span>{room.room_details.max_capacity} people</span>
//                       </div>
//                     </div>
//                     <Divider className="my-2" />
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <span className="text-2xl font-bold text-blue-600">
//                           ${room.room_details.price}
//                         </span>
//                         <span className="text-gray-500 ml-1">per night</span>
//                       </div>
//                       <Button 
//                         variant="contained" 
//                         color="primary"
//                         onClick={() => setSelectedRoom(room)}
//                       >
//                         Select Room
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </Paper>
//             ))}
//           </div>
//         </div>

//         {/* Right Column - Booking Widget */}
//         <div className="lg:w-1/3">
//           <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
//             <h2 className="text-xl font-bold mb-4">Your Reservation</h2>

//             {/* Show Check-in & Check-out Dates */}
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Check-in</label>
//                 <div className="border rounded-md p-2 bg-gray-50">{checkIn}</div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Check-out</label>
//                 <div className="border rounded-md p-2 bg-gray-50">{checkOut}</div>
//               </div>
//             </div>

//             {/* Show Adults & Children */}
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Adults</label>
//                 <div className="border rounded-md p-2 bg-gray-50">{adults}</div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Children</label>
//                 <div className="border rounded-md p-2 bg-gray-50">{children}</div>
//               </div>
//             </div>

//             {/* Room Quantity Selection */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-1">Room Quantity</label>
//               <select 
//                 className="w-full border rounded-md p-2"
//                 value={roomQuantity}
//                 onChange={(e) => setRoomQuantity(Number(e.target.value))}
//               >
//                 {Array.from(
//                   { length: hotel.available_rooms[0]?.available_quantity || 1 },
//                   (_, i) => i + 1
//                 ).map(num => (
//                   <option key={num} value={num}>{num}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Price Summary */}
//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between">
//                 <span>Room Price (1 night)</span>
//                 <span className="font-medium">${hotel.available_rooms[0]?.room_details?.price}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Taxes and fees</span>
//                 <span className="font-medium">$0</span>
//               </div>
//               <Divider />
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span>
//                 <span>${hotel.available_rooms[0]?.room_details?.price * roomQuantity}</span>
//               </div>
//             </div>

//             <Button 
//               variant="contained" 
//               color="primary" 
//               fullWidth
//               size="large"
//               disabled={hotel.available_rooms[0]?.available_quantity === 0}
//             >
//               {hotel.available_rooms[0]?.available_quantity === 0 ? 'Sold Out' : 'Reserve Now'}
//             </Button>
//           </div>
//         </div>


//       </div>

//       {/* Room Details Modal */}
//       <Dialog
//         open={!!selectedRoom}
//         onClose={() => setSelectedRoom(null)}
//         maxWidth="md"
//         fullWidth
//       >
//         {selectedRoom && (
//           <>
//             <DialogContent>
//               <IconButton
//                 onClick={() => setSelectedRoom(null)}
//                 sx={{ position: 'absolute', right: 8, top: 8 }}
//               >
//                 <IoMdCloseCircleOutline />
//               </IconButton>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <img
//                     src={selectedRoom.room_details.thumbnail_link}
//                     alt={selectedRoom.room_type}
//                     className="w-full h-auto rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Typography variant="h5" gutterBottom>
//                     {selectedRoom.room_type} Room
//                   </Typography>
//                   <Typography variant="body1" paragraph>
//                     {selectedRoom.room_details.description}
//                   </Typography>
                  
//                   <Divider sx={{ my: 2 }} />
                  
//                   <Typography variant="h6" gutterBottom>
//                     Room Facilities
//                   </Typography>
//                   <Grid container spacing={1}>
//                     {/* {roomFacilities.map((facility, index) => (
//                       <Grid item xs={6} key={index}>
//                         <div className="flex items-center">
//                           <span className="text-blue-500 mr-2">{facility.icon}</span>
//                           <span>{facility.name}</span>
//                         </div>
//                       </Grid>
//                     ))} */}
//                   </Grid>
                  
//                   <Divider sx={{ my: 2 }} />
                  
//                   <Typography variant="h6" gutterBottom>
//                     Pricing Details
//                   </Typography>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span>Base Price:</span>
//                       <span>${selectedRoom.room_details.price}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Taxes:</span>
//                       <span>Included</span>
//                     </div>
//                     <div className="flex justify-between font-bold">
//                       <span>Total per night:</span>
//                       <span>${selectedRoom.room_details.price}</span>
//                     </div>
//                   </div>
//                 </Grid>
//               </Grid>
              
//               <Divider sx={{ my: 3 }} />
              
//               <Typography variant="h6" gutterBottom>
//                 Policies
//               </Typography>
//               <Grid container spacing={2}>
//                 {/* {policies.map((policy, index) => (
//                   <Grid item xs={6} key={index}>
//                     <Paper elevation={0} className="p-2">
//                       <div className="flex items-center">
//                         <span className="text-blue-500 mr-2">{policy.icon}</span>
//                         <div>
//                           <div className="font-medium">{policy.title}</div>
//                           <div className="text-sm">{policy.time || policy.policy}</div>
//                         </div>
//                       </div>
//                     </Paper>
//                   </Grid>
//                 ))} */}
//               </Grid>
//             </DialogContent>
//           </>
//         )}
//       </Dialog>
//     </div>
//   );
// };

// export default HotelBookingDetailsPage;


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaWifi, FaParking, FaSwimmingPool, FaUtensils, FaSnowflake, FaDog, FaSmokingBan, FaRegSnowflake, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosPeople, IoMdTime } from "react-icons/io";
import { MdMeetingRoom, MdBathtub, MdBedroomParent, MdAirlineSeatReclineExtra } from "react-icons/md";
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Box, Dialog, DialogContent, Grid, Typography, Button, Chip, Divider, Paper, IconButton, TextField } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { usePost } from "../../../Hooks/usePostJson";

const HotelBookingDetailsPage = () => {
  const location = useLocation();
  const hotel = location.state?.hotel;
  const { postData, loadingPost, response } = usePost({
    url: "https://travelta.online/agent/bookRoom",
  });
  const { checkIn, checkOut, adults, children } = location.state || {};
  
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState(checkIn ? new Date(checkIn) : null);
  const [checkOutDate, setCheckOutDate] = useState(checkOut ? new Date(checkOut) : null);
  const [totalAdults, setTotalAdults] = useState(adults || 2);
  const [totalChildren, setTotalChildren] = useState(children || 0);
  const [expandedRoomIndex, setExpandedRoomIndex] = useState(null);

  useEffect(() => {
    console.log("Hotel", hotel);
  }, [hotel]);

  if (!hotel) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p>No hotel data available.</p>
      </div>
    );
  }

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const toggleRoomExpansion = (index) => {
    setExpandedRoomIndex(expandedRoomIndex === index ? null : index);
  };

  const handleSelectRoom = (room) => {
    // Check if room is already selected
    const isSelected = selectedRooms.some(r => r.room_id === room.room_id);
    
    if (isSelected) {
      // Remove room if already selected
      setSelectedRooms(selectedRooms.filter(r => r.room_id !== room.room_id));
    } else {
      // Add room with default quantity 1
      setSelectedRooms([...selectedRooms, {
        ...room,
        quantity: 1,
        totalPrice: room.room_details.price
      }]);
    }
  };

  const handleQuantityChange = (roomId, newQuantity) => {
    setSelectedRooms(selectedRooms.map(room => {
      if (room.room_id === roomId) {
        const availableQty = room.available_quantity;
        const validatedQty = Math.min(Math.max(1, newQuantity), availableQty);
        return {
          ...room,
          quantity: validatedQty,
          totalPrice: validatedQty * room.room_details.price
        };
      }
      return room;
    }));
  };

  const calculateTotalPrice = () => {
    return selectedRooms.reduce((sum, room) => sum + room.totalPrice, 0);
  };

  const renderAmenities = (amenities) => {
    if (!amenities || amenities.length === 0) {
      return <p className="text-gray-500">No amenities listed</p>;
    }
    return (
      <div className="flex flex-wrap gap-2">
        {amenities.map((amenity, index) => (
          <Chip key={index} label={amenity} size="small" className="bg-blue-50 text-blue-600" />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto pt-0 px-4 py-6">
      {/* Hotel Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{hotel.hotel_name}</h1>
        <div className="flex items-center mt-1">
          <FaMapMarkerAlt className="text-gray-500 mr-1" />
          <span className="text-gray-600">
            {hotel.city}, {hotel.country}
          </span>
        </div>
        <div className="flex items-center mt-2">
          {Array.from({ length: hotel.hotel_stars }).map((_, i) => (
            <FaStar key={i} className="text-yellow-400 mr-1" />
          ))}
          <span className="ml-2 text-gray-700">
            {hotel.hotel_stars}-star hotel
          </span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {/* Main Image */}
        <div 
          className="col-span-2 row-span-2 cursor-pointer" 
          onClick={() => handleImageClick(0)}
        >
          <img
            src={hotel.images[0]}
            alt="Main hotel"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Secondary Images */}
        {hotel.images.slice(1, 5).map((image, index) => (
          <div 
            key={index} 
            className="cursor-pointer"
            onClick={() => handleImageClick(index + 1)}
          >
            <img
              src={image}
              alt={`Hotel view ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <Dialog
        open={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <IconButton
            onClick={() => setIsImageModalOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <IoMdCloseCircleOutline />
          </IconButton>
          <Splide
            options={{
              start: selectedImageIndex,
              rewind: true,
              gap: '1rem',
            }}
          >
            {hotel.images.map((image, index) => (
              <SplideSlide key={index}>
                <img
                  src={image}
                  alt={`Hotel image ${index}`}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              </SplideSlide>
            ))}
          </Splide>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="lg:w-2/3">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-700">
              {hotel.hotel_description || 
               "This hotel offers comfortable accommodations with modern amenities. Enjoy a pleasant stay with excellent service."}
            </p>
          </div>

          {/* Hotel Facilities */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Hotel Facilities</h2>
            {renderAmenities(hotel.hotel_facilities)}
          </div>

          {/* Room Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Available Rooms</h2>
            {hotel.available_rooms.map((room, index) => (
              <Paper key={index} className="p-4 mb-4 border border-gray-200 rounded-lg">
                <div className="flex flex-col">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3">
                      <img
                        src={room.room_details.thumbnail_link}
                        alt={room.room_type}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{room.room_type} Room</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            ${room.room_details.price}
                          </div>
                          <span className="text-gray-500 text-sm">per night</span>
                        </div>
                      </div>
                      
                      <div className="my-2">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <IoIosPeople className="mr-2" />
                          <span>Max {room.room_details.max_adults} adults, {room.room_details.max_children} children</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MdMeetingRoom className="mr-2" />
                          <span>{room.available_quantity} rooms available</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button 
                          variant={selectedRooms.some(r => r.room_id === room.room_id) ? "outlined" : "contained"}
                          color={selectedRooms.some(r => r.room_id === room.room_id) ? "secondary" : "primary"}
                          onClick={() => handleSelectRoom(room)}
                          size="small"
                        >
                          {selectedRooms.some(r => r.room_id === room.room_id) ? 'Selected' : 'Select Room'}
                        </Button>
                        
                        <Button 
                          variant="text" 
                          color="primary" 
                          size="small" 
                          className="ml-2"
                          onClick={() => toggleRoomExpansion(index)}
                          endIcon={expandedRoomIndex === index ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                        >
                          {expandedRoomIndex === index ? 'Less details' : 'More details'}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Room Details */}
                  {expandedRoomIndex === index && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium mb-2">Room Description</h4>
                      <p className="text-gray-700 mb-4">
                        {room.room_details.description || "Comfortable room with modern amenities."}
                      </p>
                      
                      <h4 className="font-medium mb-2">Room Amenities</h4>
                      {renderAmenities(room.room_details.amenity)}
                      
                      <h4 className="font-medium mt-4 mb-2">Policies</h4>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Cancellation:</strong> {room.room_details.cancelation}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Check-in/out:</strong> {room.room_details.check_in} / {room.room_details.check_out}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Paper>
            ))}
          </div>
        </div>

        {/* Right Column - Booking Widget */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4 border border-blue-100">
            <h2 className="text-xl font-bold mb-4">Your Booking Details</h2>

            {/* Dates */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Your stay</h3>
              <div className="grid grid-cols-2 gap-2 bg-blue-50 p-2 rounded-md">
                <div>
                  <p className="text-xs text-gray-500">Check-in</p>
                  <p className="font-medium">{checkInDate?.toLocaleDateString() || checkIn}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Check-out</p>
                  <p className="font-medium">{checkOutDate?.toLocaleDateString() || checkOut}</p>
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Guests</h3>
              <div className="bg-blue-50 p-2 rounded-md">
                <p className="text-sm">
                  {totalAdults} {totalAdults === 1 ? 'Adult' : 'Adults'}, {totalChildren} {totalChildren === 1 ? 'Child' : 'Children'}
                </p>
              </div>
            </div>

            {/* Selected Rooms */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Selected Rooms</h3>
              {selectedRooms.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No rooms selected yet</p>
              ) : (
                <div className="space-y-3">
                  {selectedRooms.map((room, index) => (
                    <div key={index} className="border-b pb-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{room.room_type}</span>
                        <span className="text-blue-600">${room.room_details.price}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <select 
                          className="border rounded p-1 text-sm"
                          value={room.quantity}
                          onChange={(e) => handleQuantityChange(room.room_id, parseInt(e.target.value))}
                        >
                          {Array.from({ length: room.available_quantity }, (_, i) => (
                            <option key={i+1} value={i+1}>{i+1}</option>
                          ))}
                        </select>
                      </div>
                      <div className="text-right mt-1">
                        <Button 
                          variant="text" 
                          color="error" 
                          size="small"
                          onClick={() => handleSelectRoom(room)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-700 mb-2">Price Summary</h3>
              <div className="space-y-2">
                {selectedRooms.map((room, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{room.quantity}x {room.room_type}</span>
                    <span>${room.totalPrice}</span>
                  </div>
                ))}
                <Divider />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotalPrice()}</span>
                </div>
              </div>
            </div>

            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
              className="mt-6"
              disabled={selectedRooms.length === 0}
              sx={{ py: 1.5, fontWeight: 'bold' }}
            >
              Reserve Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingDetailsPage;