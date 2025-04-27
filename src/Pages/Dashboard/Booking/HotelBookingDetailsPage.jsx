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
import { FaStar, FaTags, FaTrashAlt, FaBuilding, FaUser, FaPlusCircle, FaShieldAlt, FaHandshake, FaUserTie, FaUserFriends, FaBed, FaBookmark, FaCheck, FaCalendarAlt, FaTimes, FaReceipt, FaCalendarDay, FaUsers, FaChild, FaMapMarkerAlt, FaWifi, FaParking, FaSwimmingPool, FaUtensils, FaSnowflake, FaDog, FaSmokingBan, FaRegSnowflake, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosPeople, IoMdTime } from "react-icons/io";
import { MdMeetingRoom, MdSquareFoot, MdBathtub, MdBedroomParent, MdAirlineSeatReclineExtra, MdRoomService } from "react-icons/md";
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Chip, Divider, Paper, IconButton, TextField, MenuItem, Autocomplete, CircularProgress } from "@mui/material";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { usePost } from "../../../Hooks/usePostJson";
import { useGet } from "../../../Hooks/useGet";
import { RiHotelLine } from "react-icons/ri";
import { MdOutlineSpa } from "react-icons/md";
import { MdKingBed } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AddSupplierPage, AddLeadPage } from "../../AllPages";
const HotelBookingDetailsPage = () => {
  const location = useLocation();
  const hotel = location.state?.hotel;
  const { refetch: refetchSuppliers, loading: loadingSuppliers, data: suppliersData, } = useGet({ url: "https://travelta.online/agent/manual_booking/supplier_customer", });
  const { postData, loadingPost, response } = usePost({ url: "https://travelta.online/agent/agent/bookingEngine", });
  const { checkIn, checkOut, adults, children ,selectedCountry,selectedCity} = location.state || {};
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState(checkIn ? new Date(checkIn) : null);
  const [checkOutDate, setCheckOutDate] = useState(checkOut ? new Date(checkOut) : null);
  const [totalAdults, setTotalAdults] = useState(adults || 2);
  const [totalChildren, setTotalChildren] = useState(children || 0);
  const [isRoomDetailsModalOpen, setIsRoomDetailsModalOpen] = useState(false);
  const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);

  const [category, setCategory] = useState(""); // To track B2B or B2C
  const [showPopup, setShowPopup] = useState(false);
  const [update, setUpdate] = useState(false);

  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [secondMenuData, setSecondMenuData] = useState([]); // Data for the second dropdown
  const [selectedToSupplier, setSelectedToSupplier] = useState(null); // To track the selected supplier or customer

  useEffect(() => {
    console.log("Hotel", hotel);
  }, [hotel]);

  useEffect(() => {
    if (suppliersData) {
      setSuppliers(suppliersData.suppliers);
      setCustomers(suppliersData.customers);
    }
  }, [suppliersData]);

  // Update the second dropdown based on the selected category
  useEffect(() => {
    if (category === "B2B") {
      setSecondMenuData(suppliers);
    } else if (category === "B2C") {
      setSecondMenuData(customers);
    } else {
      setSecondMenuData([]);
    }
  }, [category, suppliers, customers]);



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

  const handleViewRoomDetails = (room) => {
    setSelectedRoomDetails(room);
    setIsRoomDetailsModalOpen(true);
  };

  const handleSelectRoom = (room) => {
    if (selectedRoom && selectedRoom.room_id === room.room_id) {
      setSelectedRoom(null);
    } else {
      setSelectedRoom({
        ...room,
        quantity: 1,
        totalPrice: room.room_details.price
      });
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (!selectedRoom) return;

    const availableQty = selectedRoom.available_quantity;
    const validatedQty = Math.min(Math.max(1, newQuantity), availableQty);

    setSelectedRoom({
      ...selectedRoom,
      quantity: validatedQty,
      totalPrice: validatedQty * selectedRoom.room_details.price
    });
  };

  const calculateTotalPrice = () => {
    return selectedRoom ? selectedRoom.totalPrice : 0;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRoom) return;

    console.log("Booking data:", selectedRoom);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    // const bookingData = {
    //   room_id: selectedRoom.room_id,
    //   check_in: checkInDate.toISOString().split('T')[0],
    //   check_out: checkOutDate.toISOString().split('T')[0],
    //   quantity: selectedRoom.quantity,
    //   // from_supplier_id: selectedRoom.room_details.supplier_id,
    //   // to_customer_id: null,
    //   // country_id: selectedRoom.room_details.country_id,
    //   // city_id: selectedRoom.room_details.city_id,
    //   hotel_id: selectedRoom.room_details.hotel_id,
    //   to_agent_id: selectedRoom.room_details.agent_id, // Replace with actual agent ID if needed
    //   room_type: selectedRoom.room_type,
    //   no_of_adults: totalAdults,
    //   no_of_children: totalChildren,
    //   no_of_nights: nights,
      // currency_id: selectedRoom.room_details.currency_id, // Assuming USD
    //   amount: calculateTotalPrice()
    // };
    const bookingData = {
      room_id: selectedRoom.room_id,
      check_in: checkInDate.toISOString().split('T')[0],
      check_out: checkOutDate.toISOString().split('T')[0],
      quantity: selectedRoom.quantity,
      hotel_id: selectedRoom.room_details.hotel_id,
      to_agent_id: selectedRoom.room_details.agent_id,
      room_type: selectedRoom.room_type,
      no_of_adults: totalAdults,
      no_of_children: totalChildren,
      no_of_nights: nights,
      amount: calculateTotalPrice(),
      // Conditionally include supplier or customer ID
      ...(category === "B2B" && selectedToSupplier && { 
        from_supplier_id: selectedToSupplier.id 
      }),
      ...(category === "B2C" && selectedToSupplier && { 
        to_customer_id: selectedToSupplier.id 
      }),
      currency_id: selectedRoom.room_details.currency_id, // Assuming USD
      city_id: '',
      country_id: '',
      from_supplier_id:selectedToSupplier?.id || null,

    };
      
    postData(bookingData);
  };

  return (
    <div className="max-w-7xl mx-auto pt-0 py-6">
      {/* Hotel Header with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">{hotel.hotel_name}</h1>
        <div className="flex items-center mt-2">
          <FaMapMarkerAlt className="text-blue-200 mr-2" />
          <span className="text-blue-100">
            {hotel.city}, {hotel.country}
          </span>
        </div>
        <div className="flex items-center mt-3">
          {Array.from({ length: hotel.hotel_stars }).map((_, i) => (
            <FaStar key={i} className="text-yellow-300 mr-1 text-lg" />
          ))}
          <span className="ml-2 text-blue-100 font-medium">
            {hotel.hotel_stars}-star luxury hotel
          </span>
        </div>
      </div>

      {/* Enhanced Image Gallery with Hover Effects */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <div
          className="col-span-2 row-span-2 cursor-pointer group relative overflow-hidden rounded-xl"
          onClick={() => handleImageClick(0)}
        >
          <img
            src={hotel.images[0]}
            alt="Main hotel"
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
        </div>
        {hotel.images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="cursor-pointer group relative overflow-hidden rounded-xl"
            onClick={() => handleImageClick(index + 1)}
          >
            <img
              src={image}
              alt={`Hotel view ${index + 1}`}
              className="w-full h-32 md:h-40 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
            {index === 3 && hotel.images.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white font-bold text-lg">
                +{hotel.images.length - 5} more
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <Dialog
        open={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: 'white'
          }
        }}
      >
        <DialogContent className="p-0">
          <IconButton
            onClick={() => setIsImageModalOpen(false)}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            <IoMdCloseCircleOutline className="text-2xl" />
          </IconButton>
          <Splide
            options={{
              start: selectedImageIndex,
              rewind: true,
              gap: '1rem',
              arrows: true,
              pagination: false
            }}
          >
            {hotel.images.map((image, index) => (
              <SplideSlide key={index}>
                <div className="flex items-center justify-center h-[80vh]">
                  <img
                    src={image}
                    alt={`Hotel image ${index}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </DialogContent>
      </Dialog>

      {/* Main Content with Improved Layout */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left Column - Hotel Details */}
        <div className="lg:w-2/3 space-y-6">
          {/* Description Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <RiHotelLine className="mr-2 text-blue-600" />
              About This Hotel
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {hotel.hotel_description ||
                "Experience unparalleled comfort at our luxurious hotel. Our property combines modern elegance with exceptional service to ensure a memorable stay. Enjoy premium amenities, exquisite dining options, and thoughtfully designed accommodations."}
            </p>
          </div>

          {/* Facilities with Icons */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <MdOutlineSpa className="mr-2 text-blue-600" />
              Hotel Facilities
            </h2>
            {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {renderAmenities(hotel.hotel_facilities).map((amenity, index) => (
            <div key={index} className="flex items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-blue-600 mr-2">{amenity.icon}</span>
              <span className="text-gray-700">{amenity.label}</span>
            </div>
          ))}
        </div> */}
          </div>

          {/* Room Cards with Enhanced Design */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <MdKingBed className="mr-2 text-blue-600" />
              Available Rooms
            </h2>
            <div className="space-y-6">
              {hotel.available_rooms.map((room, index) => (
                <div
                  key={index}
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${selectedRoom?.room_id === room.room_id
                    ? "border-blue-500 ring-2 ring-blue-200 shadow-md"
                    : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 relative group">
                      <img
                        src={room.room_details.thumbnail_link}
                        alt={room.room_type}
                        className="w-full h-48 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={() => handleViewRoomDetails(room)}
                        className="absolute bottom-3 right-3 bg-white bg-opacity-90 text-blue-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-opacity-100 transition-all"
                      >
                        View Photos
                      </button>
                    </div>
                    <div className="md:w-3/5 p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{room.room_type}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            ${room.room_details.price}
                          </div>
                          <span className="text-gray-500 text-sm">per night</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 my-3">
                        <span className="flex items-center text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          <IoIosPeople className="mr-1" />
                          {room.room_details.max_adults} adults
                        </span>
                        <span className="flex items-center text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          <FaChild className="mr-1" />
                          {room.room_details.max_children} children
                        </span>
                        <span className="flex items-center text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          <MdMeetingRoom className="mr-1" />
                          {room.available_quantity} available
                        </span>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <button
                          onClick={() => handleViewRoomDetails(room)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                        >
                          <BsInfoCircle className="mr-1" />
                          View details
                        </button>

                        <Button
                          variant={selectedRoom?.room_id === room.room_id ? "outlined" : "contained"}
                          color="primary"
                          size="medium"
                          startIcon={selectedRoom?.room_id === room.room_id ? <FaCheck /> : <FaBed />}
                          onClick={() => handleSelectRoom(room)}
                          sx={{
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: '600',
                            ...(selectedRoom?.room_id === room.room_id && {
                              borderColor: '#1E88E5',
                              color: '#1E88E5'
                            })
                          }}
                        >
                          {selectedRoom?.room_id === room.room_id ? 'Selected' : 'Select Room'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Widget */}
        <div className="lg:w-1/3 flex flex-col gap-5">
          {/* Booking Form Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FaUserFriends className="mr-3 text-blue-600" />
                Booking Details
              </h3>
              <p className="text-gray-600 text-sm">
                {!category
                  ? "Select booking type to continue"
                  : category === "B2B"
                    ? "Choose a supplier from your network"
                    : "Select a customer for this booking"}
              </p>
            </div>

            {/* Form Content */}
            <div className="p-2 space-y-3">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaTags className="mr-2 text-blue-500" />
                  Booking Type
                </label>
                <TextField
                  select
                  variant="outlined"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                  InputProps={{
                    sx: {
                      "& fieldset": { borderRadius: "12px" },
                      "&:hover fieldset": { borderColor: "#1E88E5" },
                      "&.Mui-focused fieldset": { borderColor: "#1565C0" },
                      backgroundColor: "white"
                    },
                  }}
                  // Display placeholder when no value is selected
                  displayEmpty
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: category !== "" ? undefined : () => (
                      <span className="text-gray-400">Choose booking type</span>
                    )
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Choose booking type</em>
                  </MenuItem>
                  <MenuItem value="B2B" className="flex items-center">
                    <FaBuilding className="mr-2 text-gray-500" />
                    Business Partner (B2B)
                  </MenuItem>
                  <MenuItem value="B2C" className="flex items-center">
                    <FaUser className="mr-2 text-gray-500" />
                    Direct Customer (B2C)
                  </MenuItem>
                </TextField>
              </div>

              {/* Partner Selection */}
              {category && (
                <div className="transition-all duration-300 ease-in-out">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    {category === "B2B" ? (
                      <FaHandshake className="mr-2 text-blue-500" />
                    ) : (
                      <FaUserTie className="mr-2 text-blue-500" />
                    )}
                    {category === "B2B" ? "Select Supplier" : "Select Customer"}
                  </label>
                  <Autocomplete
                    fullWidth
                    options={secondMenuData}
                    getOptionLabel={(option) => option?.name || ""}
                    value={selectedToSupplier}
                    onChange={(e, newValue) => setSelectedToSupplier(newValue)}
                    disabled={!category}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder={`Search ${category === "B2B" ? "suppliers..." : "customers..."}`}
                        InputProps={{
                          ...params.InputProps,
                          sx: {
                            "& fieldset": { borderRadius: "12px" },
                            "&:hover fieldset": { borderColor: "#1E88E5" },
                            "&.Mui-focused fieldset": { borderColor: "#1565C0" },
                            backgroundColor: "white"
                          },
                          endAdornment: (
                            <>
                              {loadingSuppliers && <CircularProgress size={20} color="inherit" />}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                    renderOption={(props, option) => (
                      <li {...props} className="flex items-center p-3 hover:bg-blue-50">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          {category === "B2B" ? (
                            <FaBuilding className="text-blue-600" />
                          ) : (
                            <FaUser className="text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{option.name}</p>
                          <p className="text-xs text-gray-500">{option.email}</p>
                        </div>
                      </li>
                    )}
                  />
                </div>
              )}

              {/* Add Button */}
              <Button
                variant="contained"
                onClick={() => setShowPopup(true)}
                fullWidth
                size="large"
                disabled={!category}
                startIcon={<FaPlusCircle />}
                sx={{
                  py: 1,
                  borderRadius: '12px',
                  fontWeight: '600',
                  textTransform: 'none',
                  fontSize: '1rem',
                  background: category
                    ? 'linear-gradient(to right, #3B82F6, #2563EB)'
                    : '#E5E7EB',
                  color: category ? 'white' : '#9CA3AF',
                  '&:hover': {
                    background: category
                      ? 'linear-gradient(to right, #2563EB, #1E40AF)'
                      : '#E5E7EB',
                    boxShadow: category ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {category === "B2B" ? "Add New Supplier" : "Add New Customer"}
              </Button>
            </div>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 sticky overflow-hidden">
            {/* Summary Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
              <h2 className="text-2xl font-bold flex items-center">
                <FaCalendarAlt className="mr-3" />
                Booking Summary
              </h2>
              <p className="text-blue-100 mt-1 text-sm">
                Review your reservation details
              </p>
            </div>

            {/* Summary Content */}
            <div className="p-4 space-y-3">
              {/* Dates Section */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <FaCalendarDay className="mr-2 text-blue-600" />
                  Stay Dates
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">CHECK-IN</p>
                    <p className="font-bold text-gray-800 mt-1">
                      {checkInDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) || 'Not selected'}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">CHECK-OUT</p>
                    <p className="font-bold text-gray-800 mt-1">
                      {checkOutDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) || 'Not selected'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Guests Section */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <FaUsers className="mr-2 text-blue-600" />
                  Guests
                </h3>
                <div className="bg-blue-50 p-2 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">ADULTS</p>
                      <p className="font-medium text-gray-800">
                        {totalAdults} {totalAdults === 1 ? 'Adult' : 'Adults'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">CHILDREN</p>
                      <p className="font-medium text-gray-800">
                        {totalChildren} {totalChildren === 1 ? 'Child' : 'Children'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Room Section */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <MdRoomService className="mr-2 text-blue-600" />
                  Selected Room
                </h3>
                {!selectedRoom ? (
                  <div className="bg-yellow-50 border border-yellow-200 p-2 rounded-lg text-center">
                    <FaBed className="mx-auto text-yellow-500 text-3xl mb-3" />
                    <p className="text-gray-700 font-medium">No room selected</p>
                    <p className="text-gray-500 text-sm">
                      Please select a room from the options
                    </p>
                  </div>
                ) : (
                  <div className="border border-blue-200 bg-blue-50 rounded-lg overflow-hidden">
                    <div className="p-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800">{selectedRoom.room_type}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {selectedRoom.room_details.bed_type || 'Standard bed'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-blue-600 font-bold text-xl">
                            ${selectedRoom.room_details.price}
                          </p>
                          <p className="text-gray-500 text-xs">per night</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Quantity</p>
                        </div>
                        <select
                          className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={selectedRoom.quantity}
                          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                        >
                          {Array.from({ length: selectedRoom.available_quantity }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="bg-white px-2 py-3 border-t border-blue-200 flex justify-end">
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<FaTrashAlt />}
                        onClick={() => setSelectedRoom(null)}
                        sx={{
                          borderRadius: '8px',
                          fontWeight: '500',
                          textTransform: 'none'
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <FaReceipt className="mr-2 text-blue-600" />
                  Price Summary
                </h3>
                <div className="space-y-3">
                  {selectedRoom && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {selectedRoom.quantity}x {selectedRoom.room_type}
                      </span>
                      <span className="font-medium">${selectedRoom.totalPrice}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Taxes & Fees</span>
                    <span>${(selectedRoom?.totalPrice ? selectedRoom.totalPrice * 0.12 : 0).toFixed(2)}</span>
                  </div>
                  <Divider />
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total Amount</span>
                    <span>${calculateTotalPrice()}</span>
                  </div>
                </div>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={!selectedRoom}
                  startIcon={<FaBookmark />}
                  onClick={handleSubmit}
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textTransform: 'none',
                    background: selectedRoom
                      ? 'linear-gradient(to right, #3B82F6, #2563EB)'
                      : '#E5E7EB',
                    color: selectedRoom ? 'white' : '#9CA3AF',
                    '&:hover': {
                      background: selectedRoom
                        ? 'linear-gradient(to right, #2563EB, #1E40AF)'
                        : '#E5E7EB',
                      boxShadow: selectedRoom ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {selectedRoom ? 'Confirm Booking' : 'Select a Room'}
                </Button>

                <div className="text-center text-sm text-gray-500 mt-3">
                  <p className="flex items-center justify-center">
                    <FaShieldAlt className="mr-2 text-green-500" />
                    Free cancellation until 24 hours before check-in
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Popup Modal */}
          {showPopup && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {category === "B2B" ? "Add New Supplier" : "Add New Customer"}
                  </h2>
                  <IconButton onClick={() => setShowPopup(false)}>
                    <IoMdCloseCircleOutline className="text-2xl text-gray-500 hover:text-red-500" />
                  </IconButton>
                </div>
                <div className="p-6">
                  {category === "B2B" ? (
                    <AddSupplierPage update={update} setUpdate={setUpdate} />
                  ) : (
                    <AddLeadPage update={update} setUpdate={setUpdate} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Room Details Modal */}
      <Dialog
        open={isRoomDetailsModalOpen}
        onClose={() => setIsRoomDetailsModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden'
          }
        }}
      >
        {selectedRoomDetails && (
          <>
            <DialogTitle className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center">
                  <MdKingBed className="mr-3" />
                  {selectedRoomDetails.room_type} Room
                </h2>
                <IconButton
                  onClick={() => setIsRoomDetailsModalOpen(false)}
                  sx={{ color: 'white' }}
                >
                  <IoMdCloseCircleOutline className="text-2xl" />
                </IconButton>
              </div>
              <div className="mt-2 flex items-center text-blue-100">
                <FaStar className="mr-1" />
                <span>Premium Room Category</span>
              </div>
            </DialogTitle>

            <DialogContent className="p-0">
              <div className="p-6">
                {/* Image Gallery */}
                <div className="mb-6">
                  <Splide
                    options={{
                      type: 'loop',
                      perPage: 1,
                      pagination: false,
                      arrows: true
                    }}
                  >
                    {selectedRoomDetails.room_details.images?.map((img, idx) => (
                      <SplideSlide key={idx}>
                        <img
                          src={img}
                          alt={`Room view ${idx}`}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </SplideSlide>
                    ))}
                  </Splide>
                </div>

                {/* Room Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg flex items-center">
                    <IoIosPeople className="text-blue-600 mr-2 text-xl" />
                    <div>
                      <p className="text-xs text-gray-500">Max Occupancy</p>
                      <p className="font-medium">
                        {selectedRoomDetails.room_details.max_adults} adults, {selectedRoomDetails.room_details.max_children} children
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg flex items-center">
                    <MdSquareFoot className="text-blue-600 mr-2 text-xl" />
                    <div>
                      <p className="text-xs text-gray-500">Room Size</p>
                      <p className="font-medium">
                        {selectedRoomDetails.room_details.size || 'N/A'} sq.ft
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg flex items-center">
                    <GiMoneyStack className="text-blue-600 mr-2 text-xl" />
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="font-medium text-blue-600">
                        ${selectedRoomDetails.room_details.price} / night
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedRoomDetails.room_details.description ||
                      "This beautifully appointed room offers a perfect blend of comfort and style. Featuring premium bedding, modern furnishings, and thoughtful amenities, it's designed to provide a relaxing retreat during your travels."}
                  </p>
                </div>

                {/* Amenities Section */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Room Amenities</h3>
                  {/* <div className="grid grid-cols-2 gap-3">
                {renderAmenities(selectedRoomDetails.room_details.amenity).map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-blue-600 mr-2">{item.icon}</span>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div> */}
                </div>

                {/* Policies */}
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Policies</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-700">Cancellation Policy</p>
                      <p className="text-gray-600">
                        {selectedRoomDetails.room_details.cancelation ||
                          "Free cancellation available up to 24 hours before check-in. After that, the first night will be charged."}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Check-in/out Times</p>
                      <p className="text-gray-600">
                        Check-in: {selectedRoomDetails.room_details.check_in || "2:00 PM"},
                        Check-out: {selectedRoomDetails.room_details.check_out || "12:00 PM"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>

            <DialogActions className="bg-gray-50 p-4 border-t">
              <div className="flex justify-between w-full items-center">
                <div>
                  <p className="text-gray-500 text-sm">Total for your stay</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {/* ${calculateRoomTotal(selectedRoomDetails)} */}
                  </p>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<FaBookmark />}
                  onClick={() => {
                    handleSelectRoom(selectedRoomDetails);
                    setIsRoomDetailsModalOpen(false);
                  }}
                  sx={{
                    borderRadius: '10px',
                    fontWeight: '600',
                    textTransform: 'none',
                    padding: '8px 20px'
                  }}
                >
                  {selectedRoom?.room_id === selectedRoomDetails.room_id ? 'Room Selected' : 'Select This Room'}
                </Button>
              </div>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default HotelBookingDetailsPage;