import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../Context/Auth';
import { useGet } from '../../../../Hooks/useGet';
import { useChangeState } from '../../../../Hooks/useChangeState';
import { CircularProgress, MenuItem, TextField } from '@mui/material';

const WorkStation = () => {
  const auth = useAuth();
  const [cardsData, setCardsData] = useState([]);
  const { refetch: refetchState, loading: loadingState, data: State } = useGet({ url: "https://travelta.online/agent/request/stages_data" });
    
  const {
      refetch: refetchList,
      loading: loadingList,
      data: paymentList,
    } = useGet({ url: "https://travelta.online/agent/request/lists" });
  const [menuOpenPending, setMenuOpenPending] = useState(null);
  const [menuOpenPrice, setMenuOpenPrice] = useState(null);
  const [menuOpenNego, setMenuOpenNego] = useState(null);
  const [stage,setStage] = useState([]);
  const [adminAgent,setAdminAgent] = useState([]);
  const [adminAgentId, setAdminAgentId] = useState("");

  const [dataPending, setDataPending] = useState([]);
  const [dataNegotiation, setDataNegotiation] = useState([]);
  const [dataPricequotation, setDataPricequotation] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState("");
  const {changeState, loadingChange, responseChange} = useChangeState();
  const [additionalData, setAdditionalData] = useState({
    action: "",
    priority: "",
    follow_up_date: "",
    result: "",
    send_by: "",
    admin_agent_id: "",
    code: "",
    lost_reason: ""
  });

  // Popup visibility state
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
  refetchState()
  refetchList()
  }, [refetchState,refetchList])
  // Filter the data based on the stage
  useEffect(() => {
    if (State) {
      setDataPending(State.pending);
      setDataNegotiation(State.negotiation);
      setDataPricequotation(State.price_quotation);
    }
  }, [State]);

  useEffect(() => {
    if (paymentList) {
      setStage(paymentList.stages);
      setAdminAgent(paymentList.admins_agent)
      
    }
    console.log("data " , paymentList)
  }, [paymentList]);

  const handleMenuPendingClick = () => {
    setMenuOpenPending(menuOpenPending === "pending" ? null : "pending");
  };

  const handleMenuPriceClick = () => {
    setMenuOpenPrice(menuOpenPrice === "price" ? null : "price");
  };


  const handleMenuNegoClick = () => {
    setMenuOpenNego(menuOpenNego === "negotiation" ? null : "negotiation");
  };


  const handleStageClick = (stage) => {
    if (stage === "Won Canceled") return; // Prevent selection

    setSelectedStage(stage);
    setPopupOpen(true);

    // Reset additional data when opening popup
    setAdditionalData({
      action: "",
      priority: "",
      follow_up_date: "",
      result: "",
      send_by: "",
      admin_agent_id: "",
      code: "",
      lost_reason: ""
    });
  };

  const handleStageNegoChange = async (id, name, newStages) => {
    // If the stage is 'Won', prompt for a code
    if (newStages === 'Won') {
      const code = prompt("Please enter the code for the 'Won' stage:");
     
      if (code) {
        const response = await changeState(
          `https://travelta.online/agent/request/stages/${id}`,
          `${name} Changed Status.`,
          { stages: newStages, code: code }  // Include the code in the request
        );
        if (response) {
          setDataNegotiation(prevData =>
            prevData.map(cur =>
              cur.id === id ? { ...cur, stages: newStages, code: code } : cur
            )
          );
          refetchState();  // Refetch data if necessary
        } else {
          console.error("Stage update failed:", response);
        }
      }
    } else if (newStages === 'Lost') {
      const lostReason = prompt("Please enter the reason for the 'Lost' stage:");
      if (lostReason) {
        const response = await changeState(
          `https://travelta.online/agent/request/stages/${id}`,
          `${name} Changed Status.`,
          { stages: newStages, lost_reason: lostReason }  // Include the lost reason in the request
        );
        if (response) {
          setDataNegotiation(prevData =>
            prevData.map(cur =>
              cur.id === id ? { ...cur, stages: newStages, lost_reason: lostReason } : cur
            )
          );
          refetchState();
        } else {
          console.error("Stage update failed:", response);
        }
      }
    } else {
      // Update the stage without additional information
      const response = await changeState(
        `https://travelta.online/agent/request/stages/${id}`,
        `${name} Changed Status.`,
        { stages: newStages }
      );
      if (response) {
        setDataNegotiation(prevData =>
          prevData.map(cur =>
            cur.id === id ? { ...cur, stages: newStages } : cur
          )
        );
        refetchState();
      } else {
        console.error("Stage update failed:", response);
      }
    }
  };

  const handleSubmit = () => {
    console.log("Submitting Data:", { selectedStage, ...additionalData });
    setPopupOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800">Work Station</h2>
      
  

      {/* Popup
      {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3>Popup Menu</h3>
            <button onClick={handleMenuClick} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
              Close
            </button>
          </div>
        </div>
      )} */}

      {/* Render Cards */}
      <div className="grid grid-col-1 md:grid-cols-3 lg:grid-col-3 sm:grid-col-1  gap-4 mt-6">
        {/* Pending Card */}
        <div className="bg-white shadow-lg rounded-lg p-4 relative">
      {/* Header with Menu Icon */}
      <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Pending</h3>
          <button onClick={handleMenuPendingClick} className="text-xl text-gray-600 hover:text-gray-800">
        &#9776; {/* Hamburger menu icon */}
      </button>
          </div>
            {/* Dropdown Menu */}
      {menuOpenPending && (
        <div className="absolute right-2 mt-2 bg-white shadow-lg rounded-md p-2 w-48 z-10">
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleStageClick(e.target.value)}
          >
            {stage.map((item, index) => (
              <option key={index} value={item} disabled={item === "Won Canceled"}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}

       
   
        {/* Cards */}
        {dataPending.map((card) => (
        <div key={card.id} className="bg-gray-100 p-4 mt-4 rounded-lg shadow-sm">
          <p className="text-gray-700">
            <strong>Service:</strong> {card.service}
          </p>
          <p className="text-gray-700">
            <strong>Agent:</strong> {card.agent}
          </p>
          <p className="text-gray-700">
            <strong>Currency:</strong> {card.currency}
          </p>
          <p className="text-gray-700">
            <strong>From:</strong> {card.from}
          </p>
          <p className="text-gray-700">
            <strong>Revenue:</strong> {card.revenue}
          </p>
          <p className="text-gray-700">
            <strong>Stage:</strong> {card.stages}
          </p>
          {card.to && (
            <p className="text-gray-700">
              <strong>To:</strong> {card.to}
            </p>
          )}
          <p className="text-gray-700">
            <strong>To Name:</strong> {card.to_name}
          </p>
          <p className="text-gray-700">
            <strong>To Phone:</strong> {card.to_phone}
          </p>
        </div>
      ))}

      {/* Popup for Stage Details */}
      {popupOpen && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-30">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Enter Details for {selectedStage}</h2>

      {/* Basic Fields */}
      <input 
        type="text" 
        placeholder="Priority" 
        className="border p-2 w-full mb-2"
        value={additionalData.priority}
        onChange={(e) => setAdditionalData({ ...additionalData, priority: e.target.value })}
      />
      <input 
        type="date" 
        className="border p-2 w-full mb-2"
        value={additionalData.follow_up_date}
        onChange={(e) => setAdditionalData({ ...additionalData, follow_up_date: e.target.value })}
      />
      <input 
        type="text" 
        placeholder="Result" 
        className="border p-2 w-full mb-2"
        value={additionalData.result}
        onChange={(e) => setAdditionalData({ ...additionalData, result: e.target.value })}
      />

      {/* Action Dropdown */}
      <select
        className="border p-2 w-full mb-2"
        value={additionalData.action}
        onChange={(e) => setAdditionalData({ ...additionalData, action: e.target.value })}
      >
        <option value="">Select Action</option>
        <option value="message">Message</option>
        <option value="assign">Assign Request</option>
      </select>

      {/* Conditional Input for Message */}
      {additionalData.action === "message" && (
        <input
          type="text"
          placeholder="Enter Message"
          className="border p-2 w-full mb-2"
          value={additionalData.message}
          onChange={(e) => setAdditionalData({ ...additionalData, message: e.target.value })}
        />
      )}

      {/* Conditional Dropdown for Assign Request */}
      {additionalData.action === "assign" && (
    <div className=" w-full">
    <TextField
      select
      fullWidth
      variant="outlined"
      value={additionalData.admin_agent_id}
      onChange={(e) => setAdditionalData({ ...additionalData, admin_agent_id: e.target.value })}
      label="Select Admin agent"
      className=" shadow-lg border-gray-300"
      required
    >
      {loadingList ? (
        <MenuItem disabled>
          <CircularProgress size={24} />
        </MenuItem>
      ) : (
        adminAgent.map((admin) => (
          <MenuItem key={admin.id} value={admin.id}>
            {admin.name}
          </MenuItem>
        ))
      )}
    </TextField>
    </div>


      )}

      {/* Conditional Fields */}
      {selectedStage === "Won" && (
        <input 
          type="text" 
          placeholder="Code" 
          className="border p-2 w-full mb-2"
          value={additionalData.code}
          onChange={(e) => setAdditionalData({ ...additionalData, code: e.target.value })}
        />
      )}

      {selectedStage === "Lost" && (
        <input 
          type="text" 
          placeholder="Lost Reason" 
          className="border p-2 w-full mb-2"
          value={additionalData.lost_reason}
          onChange={(e) => setAdditionalData({ ...additionalData, lost_reason: e.target.value })}
        />
      )}

      {/* Submit and Close Buttons */}
      <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setPopupOpen(false);
                  console.log("Submit data for", selectedStage, additionalData);
                }}
              >
                Submit
              </button>
            </div>
    </div>
  </div>
)}

        </div>

   

   {/* price Card */}
        <div className="bg-white shadow-lg rounded-lg p-4 relative">
      {/* Header with Menu Icon */}
      <div className="flex justify-between items-center">
   
        <h3 className="text-xl font-semibold">Price Quotation</h3>
        <button
          onClick={handleMenuPriceClick}
          className="text-xl text-gray-600 hover:text-gray-800"
        >
          &#9776;
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpenPrice && (
        <div className="absolute right-2 mt-2 bg-white shadow-lg rounded-md p-2 w-48 z-10">
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleStageClick(e.target.value)}
          >
            {stage.map((item, index) => (
              <option key={index} value={item} disabled={item === "Won Canceled"}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}


      {/* Price Quotation Cards */}
      {dataPricequotation.map((card) => (
        <div key={card.id} className="bg-gray-100 p-4 mt-4 rounded-lg shadow-sm">
          <p className="text-gray-700"><strong>Service:</strong> {card.service}</p>
          <p className="text-gray-700"><strong>Agent:</strong> {card.agent}</p>
          <p className="text-gray-700"><strong>Currency:</strong> {card.currency}</p>
          <p className="text-gray-700"><strong>From:</strong> {card.from}</p>
          <p className="text-gray-700"><strong>Revenue:</strong> {card.revenue}</p>
          <p className="text-gray-700"><strong>Stage:</strong> {card.stages}</p>
          {card.to && <p className="text-gray-700"><strong>To:</strong> {card.to}</p>}
          <p className="text-gray-700"><strong>To Name:</strong> {card.to_name}</p>
          <p className="text-gray-700"><strong>To Phone:</strong> {card.to_phone}</p>
        </div>
      ))}

      {/* Popup for Stage Details */}
      {popupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Enter Details for {selectedStage}</h2>
            <input
              type="text"
              placeholder="Priority"
              className="border p-2 w-full mb-2"
              value={additionalData.priority}
              onChange={(e) => setAdditionalData({ ...additionalData, priority: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 w-full mb-2"
              value={additionalData.follow_up_date}
              onChange={(e) => setAdditionalData({ ...additionalData, follow_up_date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Result"
              className="border p-2 w-full mb-2"
              value={additionalData.result}
              onChange={(e) => setAdditionalData({ ...additionalData, result: e.target.value })}
            />

            {selectedStage === "Won" && (
              <input
                type="text"
                placeholder="Code"
                className="border p-2 w-full mb-2"
                value={additionalData.code}
                onChange={(e) => setAdditionalData({ ...additionalData, code: e.target.value })}
              />
            )}

            {selectedStage === "Lost" && (
              <input
                type="text"
                placeholder="Lost Reason"
                className="border p-2 w-full mb-2"
                value={additionalData.lost_reason}
                onChange={(e) => setAdditionalData({ ...additionalData, lost_reason: e.target.value })}
              />
            )}

            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setPopupOpen(false);
                  console.log("Submit data for", selectedStage, additionalData);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

     {/* Negotiation Card */}
     <div className="bg-white shadow-lg rounded-lg p-4 relative">
      {/* Menu Icon */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Negotiation</h3>
        <button onClick={handleMenuNegoClick} className="text-xl text-gray-600 hover:text-gray-800">
          &#9776; {/* Hamburger menu icon */}
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpenNego === "negotiation" && (
     <div className="absolute right-2 mt-2 bg-white shadow-lg rounded-md p-2 w-48 z-10">
  <select 
    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={(e) => handleStageClick(e.target.value)}
  >
    {stage.map((stage, index) => (
      <option 
        key={index} 
        value={stage} 
        disabled={stage === "Won Canceled"} // Disables "Won Canceled"
        className="p-2"
      >
        {stage}
      </option>
    ))}
  </select>
</div>
      )}

      {/* Render Negotiation Data */}
      {dataNegotiation.map((card) => (
        <div key={card.id} className="bg-gray-100 p-4 mt-4 rounded-lg shadow-sm">
          <p className="text-gray-700"><strong>Service:</strong> {card.service}</p>
          <p className="text-gray-700"><strong>Agent:</strong> {card.agent}</p>
          <p className="text-gray-700"><strong>Currency:</strong> {card.currency}</p>
          <p className="text-gray-700"><strong>From:</strong> {card.from}</p>
          <p className="text-gray-700"><strong>Revenue:</strong> {card.revenue}</p>
          <p className="text-gray-700"><strong>Stage:</strong> {card.stages}</p>
          <p className="text-gray-700"><strong>To Name:</strong> {card.to_name}</p>
          <p className="text-gray-700"><strong>To Phone:</strong> {card.to_phone}</p>
        </div>
      ))}

      {/* Popup Form */}
     {/* Popup Form */}
     {popupOpen && (
     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Enter Details for {selectedStage}</h2>

            {/* Basic Fields */}
            <input 
              type="text" 
              placeholder="Priority" 
              className="border p-2 w-full mb-2"
              value={additionalData.priority}
              onChange={(e) => setAdditionalData({ ...additionalData, priority: e.target.value })}
            />
            <input 
              type="date" 
              className="border p-2 w-full mb-2"
              value={additionalData.follow_up_date}
              onChange={(e) => setAdditionalData({ ...additionalData, follow_up_date: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Result" 
              className="border p-2 w-full mb-2"
              value={additionalData.result}
              onChange={(e) => setAdditionalData({ ...additionalData, result: e.target.value })}
            />

            {/* Conditional Fields */}
            {selectedStage === "Won" && (
              <input 
                type="text" 
                placeholder="Code" 
                className="border p-2 w-full mb-2"
                value={additionalData.code}
                onChange={(e) => setAdditionalData({ ...additionalData, code: e.target.value })}
              />
            )}

            {selectedStage === "Lost" && (
              <input 
                type="text" 
                placeholder="Lost Reason" 
                className="border p-2 w-full mb-2"
                value={additionalData.lost_reason}
                onChange={(e) => setAdditionalData({ ...additionalData, lost_reason: e.target.value })}
              />
            )}

            {/* Submit and Close Buttons */}
            {/* <div className="flex justify-end">
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setPopupOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleStageNegoChange(card.id, card.to_name, selectedStage)}
              >
                Submit
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>

      </div>
    </div>
  );
};

export default WorkStation;
