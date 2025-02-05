// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../../../Context/Auth';
// import { useGet } from '../../../../Hooks/useGet';
// import { useChangeState } from '../../../../Hooks/useChangeState';
// import { CircularProgress, MenuItem, TextField } from '@mui/material';

// const WorkStation = () => {
//   const auth = useAuth();
//   const [cardsData, setCardsData] = useState([]);
//   const { refetch: refetchState, loading: loadingState, data: State } = useGet({ url: "https://travelta.online/agent/request/stages_data" });
    
//   const {
//       refetch: refetchList,
//       loading: loadingList,
//       data: paymentList,
//     } = useGet({ url: "https://travelta.online/agent/request/lists" });
//   const [menuOpenPending, setMenuOpenPending] = useState(null);
//   const [menuOpenPrice, setMenuOpenPrice] = useState(null);
//   const [menuOpenNego, setMenuOpenNego] = useState(null);
//   const [stage,setStage] = useState([]);
//   const [adminAgent,setAdminAgent] = useState([]);
//   const [adminAgentId, setAdminAgentId] = useState("");

//   const [dataPending, setDataPending] = useState([]);
//   const [dataNegotiation, setDataNegotiation] = useState([]);
//   const [dataPricequotation, setDataPricequotation] = useState([]);
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [selectedStage, setSelectedStage] = useState("");
//   const {changeState, loadingChange, responseChange} = useChangeState();
//   const [additionalData, setAdditionalData] = useState({
//     action: "",
//     priority: "",
//     follow_up_date: "",
//     result: "",
//     send_by: "",
//     admin_agent_id: "",
//     code: "",
//     lost_reason: ""
//   });

//   // Popup visibility state
//   const [isPopupVisible, setIsPopupVisible] = useState(false);

//   useEffect(() => {
//   refetchState()
//   refetchList()
//   }, [refetchState,refetchList])
//   // Filter the data based on the stage
//   useEffect(() => {
//     if (State) {
//       setDataPending(State.pending);
//       setDataNegotiation(State.negotiation);
//       setDataPricequotation(State.price_quotation);
//     }
//   }, [State]);

//   useEffect(() => {
//     if (paymentList) {
//       setStage(paymentList.stages);
//       setAdminAgent(paymentList.admins_agent)
      
//     }
//     console.log("data " , paymentList)
//   }, [paymentList]);

//   const handleMenuPendingClick = () => {
//     setMenuOpenPending(menuOpenPending === "pending" ? null : "pending");
//   };

//   const handleMenuPriceClick = () => {
//     setMenuOpenPrice(menuOpenPrice === "price" ? null : "price");
//   };


//   const handleMenuNegoClick = () => {
//     setMenuOpenNego(menuOpenNego === "negotiation" ? null : "negotiation");
//   };


//   const handleStageClick = (stage) => {
//     if (stage === "Won Canceled") return; // Prevent selection

//     setSelectedStage(stage);
//     setPopupOpen(true);

//     // Reset additional data when opening popup
//     setAdditionalData({
//       action: "",
//       priority: "",
//       follow_up_date: "",
//       result: "",
//       send_by: "",
//       admin_agent_id: "",
//       code: "",
//       lost_reason: ""
//     });
//   };

//   const handleStageNegoChange = async (id, name, newStages) => {
//     // If the stage is 'Won', prompt for a code
//     if (newStages === 'Won') {
//       const code = prompt("Please enter the code for the 'Won' stage:");
     
//       if (code) {
//         const response = await changeState(
//           `https://travelta.online/agent/request/stages/${id}`,
//           `${name} Changed Status.`,
//           { stages: newStages, code: code }  // Include the code in the request
//         );
//         if (response) {
//           setDataNegotiation(prevData =>
//             prevData.map(cur =>
//               cur.id === id ? { ...cur, stages: newStages, code: code } : cur
//             )
//           );
//           refetchState();  // Refetch data if necessary
//         } else {
//           console.error("Stage update failed:", response);
//         }
//       }
//     } else if (newStages === 'Lost') {
//       const lostReason = prompt("Please enter the reason for the 'Lost' stage:");
//       if (lostReason) {
//         const response = await changeState(
//           `https://travelta.online/agent/request/stages/${id}`,
//           `${name} Changed Status.`,
//           { stages: newStages, lost_reason: lostReason }  // Include the lost reason in the request
//         );
//         if (response) {
//           setDataNegotiation(prevData =>
//             prevData.map(cur =>
//               cur.id === id ? { ...cur, stages: newStages, lost_reason: lostReason } : cur
//             )
//           );
//           refetchState();
//         } else {
//           console.error("Stage update failed:", response);
//         }
//       }
//     } else {
//       // Update the stage without additional information
//       const response = await changeState(
//         `https://travelta.online/agent/request/stages/${id}`,
//         `${name} Changed Status.`,
//         { stages: newStages }
//       );
//       if (response) {
//         setDataNegotiation(prevData =>
//           prevData.map(cur =>
//             cur.id === id ? { ...cur, stages: newStages } : cur
//           )
//         );
//         refetchState();
//       } else {
//         console.error("Stage update failed:", response);
//       }
//     }
//   };

//   const handleSubmit = () => {
//     console.log("Submitting Data:", { selectedStage, ...additionalData });
//     setPopupOpen(false);
//   };

//   return (
//     <div className="p-6">      

//       {/* Render Cards */}
//       <div className="grid grid-col-1 md:grid-cols-3 lg:grid-col-3 sm:grid-col-1  gap-4 mt-6">
//         {/* Pending Card */}
//         <div className="bg-white shadow-lg rounded-lg p-4 relative">
//       {/* Header with Menu Icon */}
//       <div className="flex justify-between items-center">
//           <h3 className="text-xl font-semibold">Pending</h3>
//           <button onClick={handleMenuPendingClick} className="text-xl text-gray-600 hover:text-gray-800">
//         &#9776; {/* Hamburger menu icon */}
//       </button>
//           </div>
//             {/* Dropdown Menu */}
//       {menuOpenPending && (
//         <div className="absolute right-2 mt-2 bg-white shadow-lg rounded-md p-2 w-48 z-10">
//           <select
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={(e) => handleStageClick(e.target.value)}
//           >
//             {stage.map((item, index) => (
//               <option key={index} value={item} disabled={item === "Won Canceled"}>
//                 {item}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

       
   
//         {/* Cards */}
//         {dataPending.map((card) => (
//         <div key={card.id} className="bg-gray-100 p-4 mt-4 rounded-lg shadow-sm">
//           <p className="text-gray-700">
//             <strong>Service:</strong> {card.service}
//           </p>
//           <p className="text-gray-700">
//             <strong>Agent:</strong> {card.agent}
//           </p>
//           <p className="text-gray-700">
//             <strong>Currency:</strong> {card.currency}
//           </p>
//           <p className="text-gray-700">
//             <strong>From:</strong> {card.from}
//           </p>
//           <p className="text-gray-700">
//             <strong>Revenue:</strong> {card.revenue}
//           </p>
//           <p className="text-gray-700">
//             <strong>Stage:</strong> {card.stages}
//           </p>
//           {card.to && (
//             <p className="text-gray-700">
//               <strong>To:</strong> {card.to}
//             </p>
//           )}
//           <p className="text-gray-700">
//             <strong>To Name:</strong> {card.to_name}
//           </p>
//           <p className="text-gray-700">
//             <strong>To Phone:</strong> {card.to_phone}
//           </p>
//         </div>
//       ))}

//       {/* Popup for Stage Details */}
//       {popupOpen && (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-30">
//     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//       <h2 className="text-xl font-semibold mb-4">Enter Details for {selectedStage}</h2>

//       {/* Basic Fields */}
//       <input 
//         type="text" 
//         placeholder="Priority" 
//         className="border p-2 w-full mb-2"
//         value={additionalData.priority}
//         onChange={(e) => setAdditionalData({ ...additionalData, priority: e.target.value })}
//       />
//       <input 
//         type="date" 
//         className="border p-2 w-full mb-2"
//         value={additionalData.follow_up_date}
//         onChange={(e) => setAdditionalData({ ...additionalData, follow_up_date: e.target.value })}
//       />
//       <input 
//         type="text" 
//         placeholder="Result" 
//         className="border p-2 w-full mb-2"
//         value={additionalData.result}
//         onChange={(e) => setAdditionalData({ ...additionalData, result: e.target.value })}
//       />

//       {/* Action Dropdown */}
//       <select
//         className="border p-2 w-full mb-2"
//         value={additionalData.action}
//         onChange={(e) => setAdditionalData({ ...additionalData, action: e.target.value })}
//       >
//         <option value="">Select Action</option>
//         <option value="message">Message</option>
//         <option value="assign">Assign Request</option>
//       </select>

//       {/* Conditional Input for Message */}
//       {additionalData.action === "message" && (
//         <input
//           type="text"
//           placeholder="Enter Message"
//           className="border p-2 w-full mb-2"
//           value={additionalData.message}
//           onChange={(e) => setAdditionalData({ ...additionalData, message: e.target.value })}
//         />
//       )}

//       {/* Conditional Dropdown for Assign Request */}
//       {additionalData.action === "assign" && (
//     <div className=" w-full">
//     <TextField
//       select
//       fullWidth
//       variant="outlined"
//       value={additionalData.admin_agent_id}
//       onChange={(e) => setAdditionalData({ ...additionalData, admin_agent_id: e.target.value })}
//       label="Select Admin agent"
//       className=" shadow-lg border-gray-300"
//       required
//     >
//       {loadingList ? (
//         <MenuItem disabled>
//           <CircularProgress size={24} />
//         </MenuItem>
//       ) : (
//         adminAgent.map((admin) => (
//           <MenuItem key={admin.id} value={admin.id}>
//             {admin.name}
//           </MenuItem>
//         ))
//       )}
//     </TextField>
//     </div>


//       )}

//       {/* Conditional Fields */}
//       {selectedStage === "Won" && (
//         <input 
//           type="text" 
//           placeholder="Code" 
//           className="border p-2 w-full mb-2"
//           value={additionalData.code}
//           onChange={(e) => setAdditionalData({ ...additionalData, code: e.target.value })}
//         />
//       )}

//       {selectedStage === "Lost" && (
//         <input 
//           type="text" 
//           placeholder="Lost Reason" 
//           className="border p-2 w-full mb-2"
//           value={additionalData.lost_reason}
//           onChange={(e) => setAdditionalData({ ...additionalData, lost_reason: e.target.value })}
//         />
//       )}

//       {/* Submit and Close Buttons */}
//       <div className="flex justify-end">
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//                 onClick={() => setPopupOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={() => {
//                   setPopupOpen(false);
//                   console.log("Submit data for", selectedStage, additionalData);
//                 }}
//               >
//                 Submit
//               </button>
//             </div>
//     </div>
//   </div>
// )}

//         </div>

   

//    {/* price Card */}
//         <div className="bg-white shadow-lg rounded-lg p-4 relative">
//       {/* Header with Menu Icon */}
//       <div className="flex justify-between items-center">
   
//         <h3 className="text-xl font-semibold">Price Quotation</h3>
//         <button
//           onClick={handleMenuPriceClick}
//           className="text-xl text-gray-600 hover:text-gray-800"
//         >
//           &#9776;
//         </button>
//       </div>

//       {/* Dropdown Menu */}
//       {menuOpenPrice && (
//         <div className="absolute right-2 mt-2 bg-white shadow-lg rounded-md p-2 w-48 z-10">
//           <select
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={(e) => handleStageClick(e.target.value)}
//           >
//             {stage.map((item, index) => (
//               <option key={index} value={item} disabled={item === "Won Canceled"}>
//                 {item}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}


//       {/* Price Quotation Cards */}
//       {dataPricequotation.map((card) => (
//         <div key={card.id} className="bg-gray-100 p-4 mt-4 rounded-lg shadow-sm">
//           <p className="text-gray-700"><strong>Service:</strong> {card.service}</p>
//           <p className="text-gray-700"><strong>Agent:</strong> {card.agent}</p>
//           <p className="text-gray-700"><strong>Currency:</strong> {card.currency}</p>
//           <p className="text-gray-700"><strong>From:</strong> {card.from}</p>
//           <p className="text-gray-700"><strong>Revenue:</strong> {card.revenue}</p>
//           <p className="text-gray-700"><strong>Stage:</strong> {card.stages}</p>
//           {card.to && <p className="text-gray-700"><strong>To:</strong> {card.to}</p>}
//           <p className="text-gray-700"><strong>To Name:</strong> {card.to_name}</p>
//           <p className="text-gray-700"><strong>To Phone:</strong> {card.to_phone}</p>
//         </div>
//       ))}

//       {/* Popup for Stage Details */}
//       {popupOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-30">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Enter Details for {selectedStage}</h2>
//             <input
//               type="text"
//               placeholder="Priority"
//               className="border p-2 w-full mb-2"
//               value={additionalData.priority}
//               onChange={(e) => setAdditionalData({ ...additionalData, priority: e.target.value })}
//             />
//             <input
//               type="date"
//               className="border p-2 w-full mb-2"
//               value={additionalData.follow_up_date}
//               onChange={(e) => setAdditionalData({ ...additionalData, follow_up_date: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Result"
//               className="border p-2 w-full mb-2"
//               value={additionalData.result}
//               onChange={(e) => setAdditionalData({ ...additionalData, result: e.target.value })}
//             />

//             {selectedStage === "Won" && (
//               <input
//                 type="text"
//                 placeholder="Code"
//                 className="border p-2 w-full mb-2"
//                 value={additionalData.code}
//                 onChange={(e) => setAdditionalData({ ...additionalData, code: e.target.value })}
//               />
//             )}

//             {selectedStage === "Lost" && (
//               <input
//                 type="text"
//                 placeholder="Lost Reason"
//                 className="border p-2 w-full mb-2"
//                 value={additionalData.lost_reason}
//                 onChange={(e) => setAdditionalData({ ...additionalData, lost_reason: e.target.value })}
//               />
//             )}

//             <div className="flex justify-end">
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//                 onClick={() => setPopupOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={() => {
//                   setPopupOpen(false);
//                   console.log("Submit data for", selectedStage, additionalData);
//                 }}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>

//      {/* Negotiation Card */}
//      <div className="bg-white shadow-lg rounded-lg p-4 relative">
//       {/* Menu Icon */}
//       <div className="flex justify-between items-center">
//         <h3 className="text-xl font-semibold">Negotiation</h3>
//         <button onClick={handleMenuNegoClick} className="text-xl text-gray-600 hover:text-gray-800">
//           &#9776; {/* Hamburger menu icon */}
//         </button>
//       </div>

//       {/* Dropdown Menu */}
//       {menuOpenNego === "negotiation" && (
//      <div className="absolute right-2 mt-2 bg-white shadow-lg rounded-md p-2 w-48 z-10">
//   <select 
//     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//     onChange={(e) => handleStageClick(e.target.value)}
//   >
//     {stage.map((stage, index) => (
//       <option 
//         key={index} 
//         value={stage} 
//         disabled={stage === "Won Canceled"} // Disables "Won Canceled"
//         className="p-2"
//       >
//         {stage}
//       </option>
//     ))}
//   </select>
// </div>
//       )}

//       {/* Render Negotiation Data */}
//       {dataNegotiation.map((card) => (
//         <div key={card.id} className="bg-gray-100 p-4 mt-4 rounded-lg shadow-sm">
//           <p className="text-gray-700"><strong>Service:</strong> {card.service}</p>
//           <p className="text-gray-700"><strong>Agent:</strong> {card.agent}</p>
//           <p className="text-gray-700"><strong>Currency:</strong> {card.currency}</p>
//           <p className="text-gray-700"><strong>From:</strong> {card.from}</p>
//           <p className="text-gray-700"><strong>Revenue:</strong> {card.revenue}</p>
//           <p className="text-gray-700"><strong>Stage:</strong> {card.stages}</p>
//           <p className="text-gray-700"><strong>To Name:</strong> {card.to_name}</p>
//           <p className="text-gray-700"><strong>To Phone:</strong> {card.to_phone}</p>
//         </div>
//       ))}

//       {/* Popup Form */}
//      {/* Popup Form */}
//      {popupOpen && (
//      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-30">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Enter Details for {selectedStage}</h2>

//             {/* Basic Fields */}
//             <input 
//               type="text" 
//               placeholder="Priority" 
//               className="border p-2 w-full mb-2"
//               value={additionalData.priority}
//               onChange={(e) => setAdditionalData({ ...additionalData, priority: e.target.value })}
//             />
//             <input 
//               type="date" 
//               className="border p-2 w-full mb-2"
//               value={additionalData.follow_up_date}
//               onChange={(e) => setAdditionalData({ ...additionalData, follow_up_date: e.target.value })}
//             />
//             <input 
//               type="text" 
//               placeholder="Result" 
//               className="border p-2 w-full mb-2"
//               value={additionalData.result}
//               onChange={(e) => setAdditionalData({ ...additionalData, result: e.target.value })}
//             />

//             {/* Conditional Fields */}
//             {selectedStage === "Won" && (
//               <input 
//                 type="text" 
//                 placeholder="Code" 
//                 className="border p-2 w-full mb-2"
//                 value={additionalData.code}
//                 onChange={(e) => setAdditionalData({ ...additionalData, code: e.target.value })}
//               />
//             )}

//             {selectedStage === "Lost" && (
//               <input 
//                 type="text" 
//                 placeholder="Lost Reason" 
//                 className="border p-2 w-full mb-2"
//                 value={additionalData.lost_reason}
//                 onChange={(e) => setAdditionalData({ ...additionalData, lost_reason: e.target.value })}
//               />
//             )}

//             {/* Submit and Close Buttons */}
//             {/* <div className="flex justify-end">
//               <button 
//                 className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//                 onClick={() => setPopupOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={() => handleStageNegoChange(card.id, card.to_name, selectedStage)}
//               >
//                 Submit
//               </button>
//             </div> */}
//           </div>
//         </div>
//       )}
//     </div>

//       </div>
//     </div>
//   );
// };

// export default WorkStation;



// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../../../Context/Auth';
// import { useGet } from '../../../../Hooks/useGet';
// import { useChangeState } from '../../../../Hooks/useChangeState';
// import { CircularProgress, MenuItem, TextField } from '@mui/material';

// const WorkStation = () => {
//   const auth = useAuth();
//   const [cardsData, setCardsData] = useState([]);
//   const { refetch: refetchState, loading: loadingState, data: State } = useGet({ url: "https://travelta.online/agent/request/stages_data" });
    
//   const {
//       refetch: refetchList,
//       loading: loadingList,
//       data: paymentList,
//     } = useGet({ url: "https://travelta.online/agent/request/lists" });
//   const [menuOpenPending, setMenuOpenPending] = useState(null);
//   const [menuOpenPrice, setMenuOpenPrice] = useState(null);
//   const [menuOpenNego, setMenuOpenNego] = useState(null);
//   const [stage,setStage] = useState([]);
//   const [adminAgent,setAdminAgent] = useState([]);
//   const [adminAgentId, setAdminAgentId] = useState("");

//   const [dataPending, setDataPending] = useState([]);
//   const [dataNegotiation, setDataNegotiation] = useState([]);
//   const [dataPricequotation, setDataPricequotation] = useState([]);
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [selectedStage, setSelectedStage] = useState("");
//   const {changeState, loadingChange, responseChange} = useChangeState();
//   const [additionalData, setAdditionalData] = useState({
//     action: "",
//     priority: "",
//     follow_up_date: "",
//     result: "",
//     send_by: "",
//     admin_agent_id: "",
//     code: "",
//     lost_reason: ""
//   });

//   // Popup visibility state
//   const [isPopupVisible, setIsPopupVisible] = useState(false);

//   useEffect(() => {
//   refetchState()
//   refetchList()
//   }, [refetchState,refetchList])
//   // Filter the data based on the stage
//   useEffect(() => {
//     if (State) {
//       setDataPending(State.pending);
//       setDataNegotiation(State.negotiation);
//       setDataPricequotation(State.price_quotation);
//     }
//   }, [State]);


 

//   return (
//    <>
//    </>
//   );
// };

// export default WorkStation;
import React, { useEffect, useState } from "react";
import { useGet } from "../../../../Hooks/useGet";
import { useChangeState } from "../../../../Hooks/useChangeState";
import { Dialog, DialogContent, TextField, Button } from "@mui/material";
import { Draggable, Droppable, DragDropContext } from "@hello-pangea/dnd";
import StaticLoader from '../../../../Components/StaticLoader';
import { FaUser, FaDollarSign, FaPlane, FaPhone,FaCalendarAlt ,FaUserCircle  } from 'react-icons/fa'; // Import necessary React Icons

const WorkStation = () => {
  const { refetch: refetchState, loading: loadingStage, data: State } = useGet({
    url: "https://travelta.online/agent/request/stages_data",
  });
  const { changeState } = useChangeState();
  const [stages, setStages] = useState({ pending: [], price_quotation: [], negotiation: [] });
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ action: "", priority: "", follow_up_date: "", result: "" });

  useEffect(() => {
    refetchState();
  }, [refetchState]);

  useEffect(() => {
    if (State && Object.keys(State).length > 0) {
      setStages({
        pending: State?.pending || [],
        price_quotation: State?.price_quotation || [],
        negotiation: State?.negotiation || [],
      });
    }
  }, [State]);

  const handleDragEnd = (result) => {
    console.log("Drag result:", result);
    if (!result.destination) return;
    const { source, destination } = result;

    console.log("Source ID:", source.droppableId);
    console.log("Destination ID:", destination.droppableId);

    if (destination.droppableId !== source.droppableId) {
      const item = stages[source.droppableId]?.[source.index];
      if (item) {
        setSelectedItem(item);
        setPopupOpen(true);
      }
    }
  };

  // return (
  //   <div className="w-full p-6 flex flex-wrap gap-8 justify-start items-start">
  //     {loadingStage ? (
  //       <div className="w-full h-56 flex justify-center items-center">
  //         <StaticLoader />
  //       </div>
  //     ) : (
  //       <div className="w-full flex flex-wrap gap-8 p-8">
  //         <DragDropContext onDragEnd={handleDragEnd}>
  //           {Object.keys(stages).length > 0 && (
  //             Object.entries(stages).map(([stage, items]) => (
  //               <Droppable droppableId={stage} key={stage}>
  //                 {(provided) => (
  //                   <div
  //                     ref={provided.innerRef}
  //                     {...provided.droppableProps}
  //                     className="w-1/6 p-6 bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-100 rounded-lg shadow-lg"
  //                   >
  //                     <h2 className="text-2xl font-bold mb-4 text-gray-700">{stage.replace("_", " ")}</h2>
  //                     {items.map((item, index) => (
  //                       <Draggable key={item.id} draggableId={String(item.id)} index={index}>
  //                         {(provided) => (
  //                           <div
  //                             ref={provided.innerRef}
  //                             {...provided.draggableProps}
  //                             {...provided.dragHandleProps}
  //                             className="p-4 mb-4 bg-white rounded-lg shadow-sm cursor-move hover:shadow-xl transition-all duration-300"
  //                           >
  //                             <div className="flex items-center justify-between">
  //                               <p className="font-semibold text-gray-800">{item.service}</p>
  //                               {/* Drag handle */}
  //                               <div {...provided.dragHandleProps} className="cursor-grab text-gray-500">
  //                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
  //                                 </svg>
  //                               </div>
  //                             </div>
  //                             <p className="text-gray-600"><strong>Revenue:</strong> {item.revenue} {item.currency}</p>
  //                           </div>
  //                         )}
  //                       </Draggable>
  //                     ))}
  //                     {provided.placeholder}
  //                   </div>
  //                 )}
  //               </Droppable>
  //             ))
  //           )}
  //         </DragDropContext>
  
  //         {/* Popup Modal */}
  //         <Dialog open={popupOpen} onClose={() => setPopupOpen(false)}>
  //           <DialogContent>
  //             <h2 className="text-xl font-semibold mb-6 text-gray-700">Enter Transition Details</h2>
  //             <TextField
  //               label="Action"
  //               fullWidth
  //               onChange={(e) => setFormData({ ...formData, action: e.target.value })}
  //               className="mb-4"
  //             />
  //             <TextField
  //               label="Priority"
  //               fullWidth
  //               onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
  //               className="mb-4"
  //             />
  //             <TextField
  //               label="Follow Up Date"
  //               type="date"
  //               fullWidth
  //               onChange={(e) => setFormData({ ...formData, follow_up_date: e.target.value })}
  //               className="mb-4"
  //             />
  //             <TextField
  //               label="Result"
  //               fullWidth
  //               onChange={(e) => setFormData({ ...formData, result: e.target.value })}
  //             />
  //           </DialogContent>
  //         </Dialog>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="w-full p-4 flex flex-wrap gap-8 justify-start items-start">
      {loadingStage ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-8">
          {/* Display the details */}
          <div className="w-full bg-white p-6 rounded-lg shadow-lg flex flex-wrap gap-8">

            {/* Display the stages with dynamic columns based on screen size */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <DragDropContext onDragEnd={handleDragEnd}>
                {Object.keys(stages).length > 0 && (
                  Object.entries(stages).map(([stage, items]) => (
                    <Droppable droppableId={stage} key={stage}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="w-full p-4 flex flex-col gap-3 bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-100 rounded-lg shadow-lg"
                        >
                          <h2 className="text-2xl font-bold mb-4 text-gray-700">{stage.replace("_", " ")}</h2>
                          {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="p-4 bg-white rounded-xl shadow-lg cursor-move hover:shadow-2xl transition-all duration-300"
                                >
                                  <div className="flex  items-center justify-between mb-4">
                                    <p className="font-semibold text-lg text-gray-800">{item.service}</p>
                                    <div {...provided.dragHandleProps} className="cursor-grab text-gray-500">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                      </svg>
                                    </div>
                                  </div>

                                  <div className="flex flex-col">
                                    <div className="flex items-center gap-3">
                                      <FaUser className="text-blue-500 text-xl" />
                                      <p className="font-semibold text-md text-gray-700">Agent : {item.agent}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <FaDollarSign className="text-blue-500 text-xl" />
                                      <p className="font-semibold text-md text-gray-700">Revenue : {item.revenue} {item.currecy}</p>
                                    </div>

                                    {/* <div className="flex items-center gap-3">
                                      <FaPlane className="text-blue-500 text-xl" />
                                      <p className="font-semibold text-md text-gray-700">Service : {item.service}</p>
                                    </div> */}

                                    <div className="flex items-center gap-3">
                                      <FaCalendarAlt className="text-blue-500 text-xl" />
                                      <p className="font-semibold text-md text-gray-700">From : {item.from ? new Date(item.from).toISOString().split('T')[0] : '-'}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <FaCalendarAlt className="text-blue-500 text-xl" />
                                      <p className="font-semibold text-md text-gray-700">To : {item.to ? new Date(item.to).toISOString().split('T')[0] : '-'}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <FaUserCircle className="text-blue-500 text-xl" />
                                      <p className="font-semibold text-md text-gray-700">Client Name : {item.to_name}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <FaPhone className="text-blue-500 text-xl" />
                                      <p className="font-semibold text-md text-gray-700">Client Phone : {item.to_phone}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))
                )}
              </DragDropContext>
            </div>
          </div>

          {/* Popup Modal */}
          <Dialog open={popupOpen} onClose={() => setPopupOpen(false)}>
            <DialogContent>
              <div className="w-full flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-gray-700">Enter Transition Details</h2>
                <TextField
                  label="Action"
                  fullWidth
                  onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                  className="mb-4"
                />
                <TextField
                  label="Priority"
                  fullWidth
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="mb-4"
                />
                <TextField
                  label="Follow Up Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) => setFormData({ ...formData, follow_up_date: e.target.value })}
                  className="mb-4"
                />
                <TextField
                  label="Note"
                  fullWidth
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
  
};

export default WorkStation;
