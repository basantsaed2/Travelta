import React, { useEffect, useState } from "react";
import { useGet } from "../../../../Hooks/useGet";
import { useChangeState } from "../../../../Hooks/useChangeState";
import { IconButton, Menu,Dialog, DialogTitle,DialogActions,DialogContent, TextField, Button,MenuItem } from "@mui/material";
import { Draggable, Droppable, DragDropContext } from "@hello-pangea/dnd";
import StaticLoader from '../../../../Components/StaticLoader';
import { FaUser, FaDollarSign, FaPlane, FaPhone,FaCalendarAlt ,FaUserCircle  } from 'react-icons/fa'; // Import necessary React Icons
import { MdMoreVert, MdCheckCircle, MdClose, MdSettings } from "react-icons/md";

const WorkStationPage = () => {
  const { refetch: refetchLists, loading: loadingLists, data: lists } = useGet({
    url: "https://travelta.online/agent/request/lists",
  });
  const { refetch: refetchState, loading: loadingStage, data: State } = useGet({
    url: "https://travelta.online/agent/request/stages_data",
  });  
  const { changeState, loadingChange, responseChange } = useChangeState();
  const [stages, setStages] = useState({ pending: [], price_quotation: [], negotiation: [] });
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ action: "", priority: "", follow_up_date: "", result: "" });
  const [message, setMessage] = useState('');
  const [adminList, setAdminList] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [priorityList, setPriorityList] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState('');

  const [selectedToStage, setSelectedToStage] = useState(null);


  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [wonPopupOpen, setWonPopupOpen] = useState(false);
  const [lostPopupOpen, setLostPopupOpen] = useState(false);
  const [wonCode, setWonCode] = useState("");
  const [lostReason, setLostReason] = useState("");

  useEffect(() => {
    refetchState();
  }, [refetchState]);

  useEffect(() => {
    refetchLists();
  }, [refetchLists]);

  useEffect(() => {
    if (State && Object.keys(State).length > 0) {
      setStages({
        pending: State?.pending || [],
        price_quotation: State?.price_quotation || [],
        negotiation: State?.negotiation || [],
      });
    }
  }, [State]);

  useEffect(() => {
    if (lists && lists.admins_agent &&lists.priority) {
      console.log("lists Data:", lists);
      setAdminList(lists.admins_agent)
      setPriorityList(lists.priority)
    }
  }, [lists]);

 
  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item); // Set the item that was clicked
    console.log(item)
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setSelectedItem(null); // Reset selectedItem when menu closes
  };

  const handleSelectAction = (action) => {
    setSelectedAction(action);
    handleMenuClose()

    if (action === "Action") {
      setPopupOpen(true);
    } else if (action === "Won") {
      setWonPopupOpen(true);
    } else if (action === "Lost") {
      setLostPopupOpen(true);
    }
  };

  const handleDragEnd = (result) => {
    console.log("Drag result:", result);
    if (!result.destination) return;
    const { source, destination } = result;

    console.log("Source ID:", source.droppableId);
    console.log("Destination ID:", destination.droppableId);

    if (source.droppableId==='pending' && destination.droppableId==='price_quotation') {
      const item = stages[source.droppableId]?.[source.index];
      if (item) {
        console.log("Selected Item:", item);
        setSelectedItem(item);
        setPopupOpen(true);
        setSelectedToStage('price_quotation');
      }
    }

    if (source.droppableId==='price_quotation' && destination.droppableId==='negotiation') {
      const item = stages[source.droppableId]?.[source.index];
      if (item) {
        setSelectedItem(item);
        setPopupOpen(true);
        setSelectedToStage('negotiation');
      }
    }

    // if (destination.droppableId !== source.droppableId) {
    //   const item = stages[source.droppableId]?.[source.index];
    //   if (item) {
    //     setSelectedItem(item);
    //     setPopupOpen(true);
    //   }
    // }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(selectedItem.stages);
  
    let requestData = { stages: "" };
  
    if (selectedAction === "Won") {
      requestData = { stages: "Won", code: wonCode };
    } else if (selectedAction === "Lost") {
      requestData = { stages: "Lost", lost_reason: lostReason };
    }
    else {
      requestData = {
        stages:
        selectedToStage === "Pending"
            ? "Pending"
            : selectedToStage === "price_quotation"
            ? "Price quotation"
            :selectedToStage === "negotiation"
            ? "Negotiation" : selectedItem.stages,
        action: formData.action,
        follow_up_date: formData.follow_up_date,
        result: formData.result,
      };
  
      if (formData.action === "message") {
        requestData.send_by = message;
      } else if (formData.action === "assign_request") {
        requestData.admin_agent_id = selectedAdmin;
      }
    }
  
    const response = await changeState(
      `https://travelta.online/agent/request/stages/${selectedItem.id}`,
      `${selectedAction || "Changed"} Status.`,
      requestData
    );
  
    if (response) {
      setWonPopupOpen(false);
      setLostPopupOpen(false);
      setPopupOpen(false);

      setStages((prevStages) => {
        console.log("Previous Stages:", prevStages);
        console.log("Selected Item:", selectedItem);
        console.log("Request Data Stages (Before Fix):", requestData.stages);
      
        // Convert new stage key to lowercase and replace spaces with underscores
        const newStageKey = requestData.stages.toLowerCase().replace(/\s+/g, "_");
      
        console.log("Fixed New Stage Key:", newStageKey);
      
        // Find the old stage key
        const oldStageKey = Object.keys(prevStages).find((key) =>
          prevStages[key].some((item) => item.id === selectedItem.id)
        );
      
        console.log("Old Stage Key:", oldStageKey);
      
        if (!oldStageKey) {
          console.warn("Item not found in any stage!");
          return prevStages;
        }
      
        if (!prevStages.hasOwnProperty(newStageKey)) {
          console.warn("Invalid new stage:", newStageKey);
          return prevStages;
        }
      
        // Remove the item from the old stage
        const updatedOldStage = prevStages[oldStageKey].filter(
          (item) => item.id !== selectedItem.id
        );
      
        // Update the stages
        const updatedStages = {
          ...prevStages,
          [oldStageKey]: updatedOldStage,
          [newStageKey]: [...prevStages[newStageKey], { ...selectedItem, stages: newStageKey }],
        };
      
        console.log("Updated Stages:", updatedStages);
        return updatedStages;
      });
      

      
    }
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   console.log(selectedItem.id);
  
  //   const formData = new FormData();
  //   let response = null;
  
  //     if (selectedAction === 'Won') {
  //       // Make API request for 'Won' action
  //       response = await changeState(
  //         `https://travelta.online/agent/request/stages/${selectedItem.id}`,
  //         `${selectedAction} Changed Status.`,
  //         { code: wonCode, stages: 'Won' }
  //       );
  //     }else if (selectedAction === 'Lost') {
  //       // You might want to send the formData in a POST request
  //       response = await changeState(
  //         `https://travelta.online/agent/request/stages/${selectedItem.id}`,
  //         `${selectedAction} Changed Status.`,
  //         { lost_reason: lostReason, stages: 'Lost' }
  //       );
  //     }
  //     else{
  //       response = await changeState(
  //         `https://travelta.online/agent/request/stages/${selectedItem.id}`,
  //         `Changed Status.`,
  //         {stages:stages==='pending'?'Pending':stages==='price_quotation'?'Price quotation':'Negotiation',action:formData.action ,message:message, priority:formData.priority , follow_up_date:formData.follow_up_date ,result:formData.result}
  //       );
  //     }
  
  //     if (response) {
  //       setWonPopupOpen(false)
  //       setLostPopupOpen(false)
  //       setPopupOpen(false)

      //   setStages((prevStage) =>
      //     prevStage.map((stage) =>
      //       stage === stage ? { ...stage} : stage
      //     )
      // );
  //     }
  
  // };

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
                                  <div className="flex items-center justify-between p-2">
                                  {/* Service Name */}
                                  <p className="font-semibold text-lg text-gray-800 flex-1">{item.service}</p>
                                    {/* Action Menu */}
                                    <div className="flex items-center gap-x-3">
                                      <IconButton onClick={(event) => handleMenuClick(event, item)} className="hover:bg-gray-100 p-2 rounded-full">
                                        <MdMoreVert className="text-gray-600 text-2xl" />
                                      </IconButton>

                                      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                        <MenuItem onClick={() => handleSelectAction("Action")}>
                                          <MdSettings className="mr-2 text-blue-500" /> Action
                                        </MenuItem>
                                        <MenuItem onClick={() => handleSelectAction("Won")}>
                                          <MdCheckCircle className="mr-2 text-green-500" /> Won
                                        </MenuItem>
                                        <MenuItem onClick={() => handleSelectAction("Lost")}>
                                          <MdClose className="mr-2 text-red-500" /> Lost
                                        </MenuItem>
                                      </Menu>

                                      {/* Drag Handle */}
                                      <div {...provided.dragHandleProps} className="cursor-grab text-gray-500 hover:text-gray-700 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                      </div>
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
          <Dialog open={popupOpen} onClose={() => setPopupOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle className="text-xl font-semibold text-gray-700">Enter Transition Details</DialogTitle>
            <DialogContent>
              <div className="flex flex-col gap-5 mt-5">
                {/* Action Selection */}
                <TextField
                  label="Action"
                  variant="outlined"
                  select
                  fullWidth
                  required
                  value={formData.action}
                  onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                  className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                >
                  <MenuItem value="call">Call</MenuItem>
                  <MenuItem value="message">Message</MenuItem>
                  <MenuItem value="assign_request">Assign Request</MenuItem>
                </TextField>

                {/* Message Input (Shown if action is "message") */}
                {formData.action === "message" && (
                  <TextField
                    label="Enter Message"
                    value={message}
                    fullWidth
                    onChange={(e) => setMessage(e.target.value)}
                    className="mb-4"
                  />
                )}

                {/* Assign Request Dropdown (Shown if action is "assign_request") */}
                {formData.action === "assign_request" && (
                  <TextField
                    select
                    label="Select Admin"
                    required
                    value={selectedAdmin}
                    onChange={(e) => setSelectedAdmin(e.target.value)}
                    fullWidth
                    className="w-full"
                  >
                    {adminList.map((admin) => (
                      <MenuItem key={admin.id} value={admin.id}>
                        {admin.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}

                {/* Follow-Up Date */}
                <TextField
                  label="Follow Up Date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) => setFormData({ ...formData, follow_up_date: e.target.value })}
                  className="mb-4"
                />

                {/* Priority Selection */}
                <TextField
                  label="Priority"
                  variant="outlined"
                  select
                  fullWidth
                  required
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                >
                  {priorityList.map((priority, index) => (
                    <MenuItem key={index} value={priority}>
                      {priority}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Note Field */}
                <TextField
                  label="Note"
                  fullWidth
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                />
              </div>
            </DialogContent>

            {/* Modal Actions */}
            <DialogActions>
              <Button onClick={() => setPopupOpen(false)} className="text-red">Cancel</Button>
              <Button onClick={handleSubmit} color="primary" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {/* Won Modal */}
          <Dialog open={wonPopupOpen} onClose={() => setWonPopupOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle className="text-xl font-semibold text-gray-700">Enter Code</DialogTitle>
            <DialogContent>
              <div className="mt-5">
              <TextField
                label="Enter Code"
                variant="outlined"
                fullWidth
                value={wonCode}
                onChange={(e) => setWonCode(e.target.value)}
              />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setWonPopupOpen(false)} className="text-red">Cancel</Button>
              <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
            </DialogActions>
          </Dialog>

          {/* Lost Modal */}
          <Dialog open={lostPopupOpen} onClose={() => setLostPopupOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle className="text-xl font-semibold text-gray-700 mt-5">Enter Reason</DialogTitle>
            <DialogContent>
              <div className="mt-5">
              <TextField
                label="Reason for Loss"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={lostReason}
                onChange={(e) => setLostReason(e.target.value)}
              />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setLostPopupOpen(false)} className="text-red">Cancel</Button>
              <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
            </DialogActions>
          </Dialog>

        </div>
      )}
    </div>
  );
  
};

export default WorkStationPage;
