import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGet } from "../../../../Hooks/useGet";
import { usePost } from "../../../../Hooks/usePostJson";
import StaticLoader from "../../../../Components/StaticLoader";
import { FaFilePdf, FaPrint } from "react-icons/fa";
import { FaEdit, FaFileExcel, FaUser, FaCalendarAlt, FaMoneyBillWave, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaArrowRight, FaUserFriends, FaUserSlash, FaChild, FaPlus } from 'react-icons/fa';
import { FaUniversity, FaCommentAlt, FaClock, FaQuestion, FaCreditCard, FaFileInvoice, FaDownload, FaExclamationTriangle, FaCalculator } from 'react-icons/fa';
import { FaComments, FaCommentSlash, FaHistory, FaTimes } from 'react-icons/fa';
import { FaTasks, FaCheck, FaTrash, FaExchangeAlt, FaTimesCircle, FaBell, FaFileInvoiceDollar } from 'react-icons/fa';
import { FaTicketAlt, FaEye, FaPaperclip, FaCheckCircle, FaQuestionCircle, FaExternalLinkAlt, FaHashtag, FaClipboardList, FaBed, FaBuilding, FaFileDownload } from 'react-icons/fa';
import HotelDetails from "../ServicesDetails/HotelDetails";
import VisaDetails from "../ServicesDetails/VisaDetails";
import FlightDetails from "../ServicesDetails/FlightDetails";
import BusDetails from "../ServicesDetails/BusDetails";
import TourDetails from "../ServicesDetails/TourDetails";
import { useDelete } from "../../../../Hooks/useDelete";
import { useAuth } from "../../../../Context/Auth";
import { Modal } from "@mui/material";
import axios from "axios";
import { use } from "react";
const BookingDetailsPage = () => {
  const { detailsId } = useParams();
  const auth = useAuth();
  const [loading, setLoading] = useState(false); // Initialize based on enabled
  const navigate = useNavigate();
  const location = useLocation();
  const { type, data: initialData } = location.state;

  const [item, setItem] = useState([]);
  const [activeTab, setActiveTab] = useState("details");
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [showStatusVoucher, setShowStatusVoucher] = useState(false);
  const [showStatusCancel, setShowStatusCancel] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [totallyPaid, setTotallyPaid] = useState(false);
  const [confirmationNum, setConfirmationNum] = useState('');
  const [cancelationReason, setCancelationReason] = useState("");
  const [deposits, setDeposits] = useState([{ deposit: "", date: "" }]);
  const [request, setRequest] = useState("");

  // const []


  const [bookingData, setBookingData] = useState({ status: 'pending' });
  const safeStatus = '';

  // Fetch functions
  const { refetch: refetchDetails, loading: loadingDetails, data: bookingDetails } = useGet({
    url: `https://travelta.online/agent/booking/details/${detailsId}`,
    enabled: false // Disable automatic fetching
  });

  const { refetch: refetchEngineDetails, loading: loadingEngineDetails, data: bookingEngineDetails } = useGet({
    url: `https://travelta.online/agent/booking/engine_details/${detailsId}`,
    enabled: false
  });

  const { refetch: refetchEngineTourDetails, loading: loadingEngineTourDetails, data: bookingEngineTourDetails } = useGet({
    url: `https://travelta.online/agent/booking/engine_tour_details/${detailsId}`,
    enabled: false
  });

  //
  useEffect(() => {
    setLoading(loadingDetails || loadingEngineDetails || loadingEngineTourDetails);
  }, [loadingDetails, loadingEngineDetails, loadingEngineTourDetails]);

  useEffect(() => {
    if (!type) {
      navigate(-1); // Go back if type is not provided
      return null; // Must return something
    }
    console.log("Booking Type:", type);

    // Refetch based on type
    if (["hotel", "hotels", "visa", "flight", "bus", "tour"].includes(type)) {
      refetchDetails();
    } else if (["roomEngine"].includes(type)) {
      refetchEngineDetails();
    } else if (type === "tourEngine") {
      refetchEngineTourDetails();
    } else {
      console.warn(`Unknown booking type: ${type}`);
    }
  }, [type, detailsId]);

  useEffect(() => {
    if (bookingDetails) {
      console.log("Booking Details:", bookingDetails);
      setItem(prev => ({ ...prev, ...bookingDetails }));
    }
    if (bookingEngineDetails) {
      console.log("Booking Engine Details:", bookingEngineDetails);
      setItem(prev => ({ ...prev, ...bookingEngineDetails }));
    }
    if (bookingEngineTourDetails) {
      console.log("Booking Engine Tour Details:", bookingEngineTourDetails);
      setItem(prev => ({ ...prev, ...bookingEngineTourDetails }));
    }
  }, [bookingDetails, bookingEngineDetails, bookingEngineTourDetails, type]);

  //posting Status for Booking Engine
  const { postData: postEngineStatusConfirmed, loadingPost: loadingEngineStatusConfirmed, response: responseEngineStatusConfirmed } = usePost({ url: `https://travelta.online/agent/booking/engine_confirmed/${detailsId}` });
  const { postData: postEngineStatusVouchered, loadingPost: loadingEngineStatusVouchered, response: responseEngineStatusVouchered } = usePost({ url: `https://travelta.online/agent/booking/engine_vouchered/${detailsId}` });
  const { postData: postEngineStatusCanceled, loadingPost: loadingEngineStatusCanceled, response: responseEngineStatusCanceled } = usePost({ url: `https://travelta.online/agent/booking/engine_canceled/${detailsId}` });

  //Posting Status for Booking Engine Tour
  const { postData: postEngineTourStatusConfirmed, loadingPost: loadingEngineTourStatusConfirmed, response: responseEngineTourStatusConfirmed } = usePost({ url: `https://travelta.online/agent/booking/engine_tour_confirmed/${detailsId}` });
  const { postData: postEngineTourStatusVouchered, loadingPost: loadingEngineTourStatusVouchered, response: responseEngineTourStatusVouchered } = usePost({ url: `https://travelta.online/agent/booking/engine_tour_vouchered/${detailsId}` });
  const { postData: postEngineTourStatusCanceled, loadingPost: loadingEngineTourStatusCanceled, response: responseEngineTourStatusCanceled } = usePost({ url: `https://travelta.online/agent/booking/engine_tour_canceled/${detailsId}` });

  //Posting Status for Manual Booking
  const { postData: postStatusConfirmed, loadingPost: loadingStatusConfirmed, response: responseStatusConfirmed } = usePost({ url: `https://travelta.online/agent/booking/confirmed/${detailsId}` });
  const { postData: postStatusVouchered, loadingPost: loadingStatusVouchered, response: responseStatusVouchered } = usePost({ url: `https://travelta.online/agent/booking/vouchered/${detailsId}` });
  const { postData: postStatusCanceled, loadingPost: loadingStatusCanceled, response: responseStatusCanceled } = usePost({ url: `https://travelta.online/agent/booking/canceled/${detailsId}` });

  // State management
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({
    notes: '',
    notification: '',
    confirmation_number: '',
  });
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);

  // API hooks as per your preference
  const { postData: postTask, loadingPost: loadingTask } = usePost({
    url: `https://travelta.online/agent/booking/task/add`
  });

  const { postData: postUpdateTask, loadingPost: loadingUpdateTask } = usePost({
    url: `https://travelta.online/agent/booking/task/update/${selectedTaskId}`
  });

  const { deleteData, loadingDelete } = useDelete();
  // Task fetching hooks
  const {
    refetch: refetchEngineTask,
    loading: loadingEngineTask,
    data: bookingEngineTask
  } = useGet({
    url: `https://travelta.online/agent/booking/task/engine/${detailsId}`,
    enabled: false
  });
  const {
    refetch: refetchEngineTourTask,
    loading: loadingEngineTourTask,
    data: bookingEngineTourTask
  } = useGet({
    url: `https://travelta.online/agent/booking/task/tour_engine/${detailsId}`,
    enabled: false
  });
  const {
    refetch: refetchManualTask,
    loading: loadingManualTask,
    data: bookingManualTask
  } = useGet({
    url: `https://travelta.online/agent/booking/task/manuel/${detailsId}`,
    enabled: false
  });
  const {
    refetch: refetchSelectedTask,
    loading: loadingSelectedTask,
    data: bookingSelectedTask
  } = useGet({
    url: `https://travelta.online/agent/booking/task/item/${selectedTaskId}`,
    enabled: false
  });
  // Handle task input changes
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask(prev => ({
      ...prev,
      [name]: value, // Update the state directly for text inputs
    }));
  };
  // Fetch tasks based on type
  useEffect(() => {
    if (!type || !detailsId) {
      navigate(-1);
      return;
    }
    const fetchTasks = async () => {
      try {
        if (["hotel", "hotels", "visa", "flight", "bus", "tour"].includes(type)) {
          await refetchManualTask();
        } else if (type === "roomEngine") {
          await refetchEngineTask();
        } else if (type === "tourEngine") {
          await refetchEngineTourTask();
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [type, detailsId, navigate]);

  // Update tasks state when data changes
  useEffect(() => {
    if (bookingManualTask) {
      setTasks(bookingManualTask.tasks || []);
    } else if (bookingEngineTask) {
      setTasks(bookingEngineTask.tasks || []);
    } else if (bookingEngineTourTask) {
      setTasks(bookingEngineTourTask.tasks || []);
    }
  }, [bookingManualTask, bookingEngineTask, bookingEngineTourTask]);

  // Handle task submission
  const handleSubmitTask = async () => {
    try {
      const taskData = {
        ...currentTask,
        [type === 'roomEngine' ? 'booking_engine_id' :
          type === 'tourEngine' ? 'engine_tour_id' :
            'manuel_booking_id']: detailsId
      };

      if (isEditMode) {
        await postUpdateTask(taskData);
      } else {
        await postTask(taskData);
      }

      // Refetch tasks after operation
      if (["hotel", "hotels", "visa", "flight", "bus", "tour"].includes(type)) {
        await refetchManualTask();
      } else if (type === "roomEngine") {
        await refetchEngineTask();
      } else if (type === "tourEngine") {
        await refetchEngineTourTask();
      }

      setIsTaskModalOpen(false);
    } catch (error) {
      console.error("Task operation failed:", error);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteData(`https://travelta.online/agent/booking/task/delete/${taskId}`);

      // Refetch tasks after deletion
      if (["hotel", "hotels", "visa", "flight", "bus", "tour"].includes(type)) {
        await refetchManualTask();
      } else if (type === "roomEngine") {
        await refetchEngineTask();
      } else if (type === "tourEngine") {
        await refetchEngineTourTask();
      }

      setOpenDelete(null);
    } catch (error) {
      console.error("Task deletion failed:", error);
    }
  };

  // Toggle task completion status
  // const toggleTaskComplete = async (taskId) => {
  //   try {
  //     setSelectedTaskId(taskId);
  //     await refetchSelectedTask();

  //     if (currentTask) {
  //       const updatedTask = {
  //         ...bookingSelectedTask,
  //         // is_completed: !bookingSelectedTask.is_completed
  //       };

  //       await postUpdateTask(updatedTask);

  //       // Refetch tasks after update
  //       if (["hotel", "hotels", "visa", "flight", "bus", "tour"].includes(type)) {
  //         await refetchManualTask();
  //       } else if (type === "roomEngine") {
  //         await refetchEngineTask();
  //       } else if (type === "tourEngine") {
  //         await refetchEngineTourTask();
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Task toggle failed:", error);
  //   }
  // };

  // Open modal for adding new task
  const handleAddTask = () => {
    setCurrentTask({
      notes: '',
      notification: '',
      confirmation_number: '',
      // is_completed: false
    });
    setIsEditMode(false);
    setIsTaskModalOpen(true);
  };
  // Open modal for editing existing task
  const handleEditTask = (task) => {
    setSelectedTaskId(task.id);
    setCurrentTask({
      notes: task.notes,
      notification: task.notification,
      confirmation_number: task.confirmation_number
    });
    setIsEditMode(true);
    setIsTaskModalOpen(true);
  };


  //Request and Status for Maunal Booking
  const { postData: postRequest, loadingPost: loadingRequest, response: responseRequest } = usePost({ url: `https://travelta.online/agent/booking/special_request/${detailsId}` });
  const { postData: postRequestStatus, loadingPost: loadingRequestStatus, response: responseRequestStatus } = usePost({ url: `https://travelta.online/agent/booking/request_status/${detailsId}` });
  //Request and Status for Booking Engine
  const { postData: postRequestEngine, loadingPost: loadingRequestEngine, response: responseRequestEngine } = usePost({ url: `https://travelta.online/agent/booking/engine_special_request/${detailsId}` });
  const { postData: postRequestEngineStatus, loadingPost: loadingRequestEngineStatus, response: responseRequestEngineStatus } = usePost({ url: `https://travelta.online/agent/booking/request_status_engine/${detailsId}` });
  //Request and Status for Booking Engine Tour
  const { postData: postRequestEngineTour, loadingPost: loadingRequestEngineTour, response: responseRequestEngineTour } = usePost({ url: `https://travelta.online/agent/booking/engine_tour_special_request/${detailsId}` });
  const { postData: postRequestEngineTourStatus, loadingPost: loadingRequestEngineTourStatus, response: responseRequestEngineTourStatus } = usePost({ url: `https://travelta.online/agent/booking/special_status_tour_engine/${detailsId}` });

  const [activeStatusModal, setActiveStatusModal] = useState(null);

  const tabs = [
    { id: "details", label: "Details", icon: <FaClipboardList className="text-lg" /> },
    { id: "traveler", label: "Traveler", icon: <FaUser className="text-lg" /> },
    { id: "payments", label: "Payments", icon: <FaCreditCard className="text-lg" /> },
    { id: "requests", label: "Requests", icon: <FaBell className="text-lg" /> },
    { id: "tasks", label: "Tasks", icon: <FaTasks className="text-lg" /> },
    { id: "invoice", label: "Documents", icon: <FaFileInvoiceDollar className="text-lg" /> },
  ];

  // Enhanced Request Management System
  // State for request management
  const [requestText, setRequestText] = useState('');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [specialRequest, setSpecialRequest] = useState("");
  const [specialRequestStatus, setSpecialRequestStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('pending');

  // Get the correct API handlers based on booking type
  const getRequestHandlers = () => {
    switch (type) {
      case 'roomEngine':
        return {
          postRequest: postRequestEngine,
          postStatus: postRequestEngineStatus
        };
      case 'tourEngine':
        return {
          postRequest: postRequestEngineTour,
          postStatus: postRequestEngineTourStatus
        };
      default:
        return {
          postRequest: postRequest,
          postStatus: postRequestStatus
        };
    }
  };

  // Handle request submission
  const handleSubmitRequest = async () => {
    const { postRequest } = getRequestHandlers();
    try {
      postRequest({
        special_request: requestText,
      });
      toast.success("Request submitted successfully!");
      setIsRequestModalOpen(false);
    } catch (error) {
      console.error("Request submission failed:", error);
      toast.error("Failed to submit request");
    }
  };

  // Handle status change
  const handleUpdateStatus = async (status) => {
    const { postStatus } = getRequestHandlers();
    try {
      await postStatus({
        request_status: status,
      });
      // await refetchBookingData();
      setIsStatusModalOpen(false);
      toast.success(`Status changed to ${status}`);
    } catch (error) {
      console.error("Status change failed:", error);
      toast.error("Failed to update status");
    }
  };
  // useEffect(() => {
  //   if (bookingDetails) {
  //     setItem(prev => ({ ...prev, ...bookingDetails }));
  //   }
  // }, [bookingDetails]);

  // useEffect(() => {
  //   if ((!loadingRequest && responseRequest) || (!loadingTask && responseTask)) {
  //     refetchDetails();
  //     setSpecialRequest('')
  //     setTask('')
  //   }
  // }, [responseRequest, responseTask]);

  // useEffect(() => {
  //   if ((!loadingStatusConfirmed && responseStatusConfirmed) || (!loadingStatusVouchered && responseStatusVouchered) || (!loadingStatusCanceled && responseStatusCanceled)) {
  //     setItem(prev => ({ ...prev, status: newStatus }));
  //     // setShowStatus(false);
  //     // setCancelationReason(false)
  //     refetchDetails();
  //   }
  // }, [responseStatusConfirmed, responseStatusVouchered, responseStatusCanceled]);

  const SubmitRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('special_request', specialRequest);
    postRequest(formData, "Request Send Success")
  }
  // Status management based on booking type
  const getStatusHandlers = () => {
    switch (type) {
      case 'roomEngine':
        return {
          confirmed: postEngineStatusConfirmed,
          vouchered: postEngineStatusVouchered,
          canceled: postEngineStatusCanceled
        };
      case 'tourEngine':
        return {
          confirmed: postEngineTourStatusConfirmed,
          vouchered: postEngineTourStatusVouchered,
          canceled: postEngineTourStatusCanceled
        };
      default: // Manual bookings
        return {
          confirmed: postStatusConfirmed,
          vouchered: postStatusVouchered,
          canceled: postStatusCanceled
        };
    }
  };

  // Status change handler
  const submitStatusChange = async (e) => {
    e.preventDefault();
    const { confirmed, vouchered, canceled } = getStatusHandlers();
    let requestData = {};

    try {
      // Optimistically update UI
      const updatedData = { ...bookingData, status: newStatus };
      setBookingData(updatedData);

      if (newStatus === "confirmed") {
        requestData = { confirmed: true };
        await confirmed(requestData, "Status Confirmed Success");
      } else if (newStatus === "vouchered") {
        requestData = {
          confirmation_num: confirmationNum,
          totally_paid: totallyPaid === true ? 1 : 0,
          name: customerName,
          phone: customerPhone,
          email: customerEmail
        };
        await vouchered(requestData, "Status Vouchered Success");
      } else if (newStatus === "canceled") {
        requestData = { cancelation_reason: cancelationReason };
        await canceled(requestData, "Status Canceled Success");
      }

      // // Refetch and update state with fresh data
      // let freshData;
      // if (["hotel", "hotels", "visa", "flight", "bus", "tour"].includes(type)) {
      //   freshData = await refetchDetails();
      // } else if (type === "roomEngine") {
      //   freshData = await refetchEngineDetails();
      // } else if (type === "tourEngine") {
      //   freshData = await refetchEngineTourDetails();
      // }

      setBookingData(prev => ({
        ...prev
      })); setActiveStatusModal(null);
    } catch (error) {
      console.error("Status change failed:", error);
      // Revert UI if API call fails
      setBookingData(prev => ({
        ...prev
      }));
    }
  };

  // Enhanced status actions with type awareness
  const renderStatusActions = () => {
    const currentStatus = bookingData?.status || 'pending';

    const actionButton = (status, color, icon, text) => (
      <button
        onClick={() => {
          setNewStatus(status);
          setActiveStatusModal(status);
        }}
        className={`flex items-center px-4 py-2.5 rounded-xl shadow-sm transition-all 
        ${color === "green" ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100" :
            color === "blue" ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" :
              "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"}
        border`}
      >
        {icon}
        <span className="ml-2 font-medium">{text}</span>
      </button>
    );

    const isEngine = type === 'roomEngine' || type === 'tourEngine';
    const statusText = isEngine ? "Booking" : "Booking";

    switch (currentStatus) {
      case "pending":
        return (
          <div className="flex gap-3 mt-4">
            {actionButton("confirmed", "green",
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <FaCheck className="text-emerald-600 text-xs" />
              </div>,
              `Confirm ${statusText}`)}
            {actionButton("canceled", "red",
              <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
                <FaTimes className="text-rose-600 text-xs" />
              </div>,
              `Cancel ${statusText}`)}
          </div>
        );
      case "confirmed":
        return (
          <div className="flex gap-3 mt-4">
            {actionButton("vouchered", "blue",
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <FaTicketAlt className="text-blue-600 text-xs" />
              </div>,
              isEngine ? "Generate Voucher" : "Generate Voucher")}
            {actionButton("canceled", "red",
              <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
                <FaTimes className="text-rose-600 text-xs" />
              </div>,
              `Cancel ${statusText}`)}
          </div>
        );
      case "vouchered":
        return (
          <div className="flex gap-3 mt-4">
            {actionButton("canceled", "red",
              <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
                <FaTimes className="text-rose-600 text-xs" />
              </div>,
              `Cancel ${statusText}`)}
          </div>
        );
      default:
        return null;
    }
  };
  // Task Modal Component
  const TaskModal = React.memo(({
    isOpen,
    onClose,
    onSubmit,
    task,
    onChange,
    isEditMode
  }) => {
    // Use local state to prevent input lag
    const [localTask, setLocalTask] = useState(task);

    // Sync with parent state when modal opens or task changes
    useEffect(() => {
      setLocalTask(task);
    }, [isOpen, task]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setLocalTask(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onChange({ target: localTask }); // Update parent state
      onSubmit();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
          <h2 className="text-xl font-semibold mb-4">
            {isEditMode ? 'Edit Task' : 'Add Task'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="task-notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="task-notes"
                  name="notes"
                  value={localTask.notes || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label htmlFor="task-notification" className="block text-sm font-medium text-gray-700 mb-1">
                  Notification Date
                </label>
                <input
                  id="task-notification"
                  type="datetime-local"
                  name="notification"
                  value={localTask.notification || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="task-confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmation Number
                </label>
                <input
                  id="task-confirmation"
                  type="text"
                  name="confirmation_number"
                  value={localTask.confirmation_number || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isEditMode ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  });
  // Enhanced status actions with modern design
  // const renderStatusActions = () => {
  //   const actionButton = (status, color, icon, text) => (
  //     <button
  //       onClick={() => handleStatusAction(status)}
  //       className={`flex items-center px-4 py-2.5 rounded-xl shadow-sm transition-all 
  //         ${color === "green" ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100" :
  //           color === "blue" ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" :
  //             "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"}
  //         border`}
  //     >
  //       {icon}
  //       <span className="ml-2 font-medium">{text}</span>
  //     </button>
  //   );

  //   switch (item.status) {
  //     case "pending":
  //       return (
  //         <div className="flex gap-3 mt-4">
  //           {actionButton("confirmed", "green",
  //             <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
  //               <FaCheck className="text-emerald-600 text-xs" />
  //             </div>,
  //             "Confirm Booking")}
  //           {actionButton("canceled", "red",
  //             <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
  //               <FaTimes className="text-rose-600 text-xs" />
  //             </div>,
  //             "Cancel Booking")}
  //         </div>
  //       );
  //     case "confirmed":
  //       return (
  //         <div className="flex gap-3 mt-4">
  //           {actionButton("vouchered", "blue",
  //             <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
  //               <FaTicketAlt className="text-blue-600 text-xs" />
  //             </div>,
  //             "Generate Voucher")}
  //           {actionButton("canceled", "red",
  //             <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
  //               <FaTimes className="text-rose-600 text-xs" />
  //             </div>,
  //             "Cancel Booking")}
  //         </div>
  //       );
  //     case "vouchered":
  //       return (
  //         <div className="flex gap-3 mt-4">
  //           {actionButton("canceled", "red",
  //             <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
  //               <FaTimes className="text-rose-600 text-xs" />
  //             </div>,
  //             "Cancel Booking")}
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };
  const renderDetailsContent = () => {
    if (!item) return null;
    console.log("Item Details:", item);

    if (item.manuel_booking || item.booking_room_engine || item.booing_tour_engine) {
      switch (type) {
        case 'hotel':
        case 'hotels':
        case 'roomEngine':
          return HotelDetails(item.manuel_booking?.hotel || item.booking_room_engine);
        case 'visa':
          return VisaDetails(item.manuel_booking.visa);
        case 'flight':
          return FlightDetails(item.manuel_booking.fetchTasks);
        case 'bus':
          return BusDetails(item.manuel_booking.bus);
        case 'tour':
        case 'tourEngine':
          return TourDetails(item.manuel_booking?.tour || item.booing_tour_engine);
          default:
          return <div>No details available</div>;
      }
    }
  };
  useEffect(() => {
    if (item?.manuel_booking || item?.booking_room_engine || item?.booing_tour_engine) {
      let newStatus = 'pending';
      switch (type) {
        case 'hotel':
        case 'hotels':
        case 'roomEngine':
          newStatus = item?.manuel_booking?.hotel?.status ?? item?.booking_room_engine?.status ?? 'pending';
          setSpecialRequest(item?.manuel_booking?.hotel?.special_request || item?.booking_room_engine?.special_request || '');
          setSpecialRequestStatus(item?.manuel_booking?.hotel?.request_status || item?.booking_room_engine?.request_status || '');
          break;
        case 'visa':
          newStatus = item?.manuel_booking.visa?.status || 'pending';
          setSpecialRequest(item?.manuel_booking.visa?.special_request || '');
          setSpecialRequestStatus(item?.manuel_booking.visa?.request_status || '');
          break;
        case 'flight':
          newStatus = item?.manuel_booking.flight?.status || 'pending';
          setSpecialRequest(item?.manuel_booking.flight?.special_request || '');
          setSpecialRequestStatus(item?.manuel_booking.flight?.request_status || '');
          break;
        case 'bus':
          newStatus = item?.manuel_booking.bus?.status || 'pending';
          setSpecialRequest(item?.manuel_booking.bus?.special_request || '');
          setSpecialRequestStatus(item?.manuel_booking.bus?.request_status || '');
          break;
        case 'tour':
        case 'tourEngine':
          newStatus = item?.manuel_booking?.tour?.status ?? item?.booing_tour_engine?.status ?? 'pending';
          setSpecialRequest(item?.manuel_booking?.tour?.special_request || item?.booing_tour_engine?.special_request || '');
          setSpecialRequestStatus(item?.manuel_booking?.tour?.request_status || item?.booing_tour_engine?.request_status || '');
          break;
        default:
          newStatus = 'pending';
      }
      setBookingData(prev => ({ ...prev, status: newStatus }));
    }
  }, [item, type ,specialRequest]);  // Only runs when `item` or `type` changes

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="w-full p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Booking #{detailsId}
              </h1>
              <p className="mt-1 text-gray-600">
                {type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Booking` : "Booking Details"}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {/* <PaymentStatusBadge status={item?.payment_status} /> */}
              {/* <BookingStatusBadge status={item?.status} /> */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 md:px-4 py-6">
        {/* Status Management Section */}
        <div className="bg-white p-2 md:p-6 rounded-2xl shadow-md mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaExchangeAlt className="text-indigo-500 mr-3 text-lg" />
              Booking Status Management
            </h2>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${bookingData.status === "pending" ? "bg-amber-100 text-amber-800" :
                bookingData.status === "confirmed" ? "bg-emerald-100 text-emerald-800" :
                  bookingData.status === "vouchered" ? "bg-blue-100 text-blue-800" :
                    "bg-rose-100 text-rose-800"
                }`}>
                {bookingData.status.charAt(0).toUpperCase() + bookingData.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Modern Status Stepper */}
          <div className="relative mb-8">
            {(() => {
              const safeStatus = bookingData?.status || 'pending';
              const statusIndex = ['pending', 'confirmed', 'vouchered', 'canceled'].indexOf(safeStatus);
              const isCanceled = safeStatus === 'canceled';

              return (
                <>
                  {/* Status Steps */}
                  <div className="flex items-center justify-between relative z-10">
                    {['pending', 'confirmed', 'vouchered', 'canceled'].map((step, index) => {
                      const isActive = safeStatus === step;
                      const isCompleted = statusIndex >= index && !isCanceled;
                      const isCanceledStep = isCanceled && step === 'canceled';

                      return (
                        <div key={step} className="flex flex-col items-center">
                          {/* Step Circle */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${isCanceledStep
                            ? "border-rose-500 bg-rose-500"
                            : isCompleted
                              ? isActive
                                ? "border-indigo-500 bg-indigo-500"
                                : "border-emerald-500 bg-emerald-500"
                              : "border-gray-300 bg-white"
                            }`}>
                            {isCanceledStep ? (
                              <FaTimes className="text-xs text-white" />
                            ) : isCompleted ? (
                              <FaCheck className="text-xs text-white" />
                            ) : (
                              <span className={`text-sm ${isActive ? "text-indigo-600" : "text-gray-400"}`}>
                                {index + 1}
                              </span>
                            )}
                          </div>

                          {/* Step Label */}
                          <span className={`text-xs font-medium ${isCanceledStep
                            ? "text-rose-600"
                            : isActive
                              ? "text-indigo-600"
                              : isCompleted
                                ? "text-emerald-600"
                                : "text-gray-500"
                            }`}>
                            {step.charAt(0).toUpperCase() + step.slice(1)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 z-0">
                    <div
                      className={`h-full transition-all duration-500 ${isCanceled
                        ? "bg-rose-500 w-full"
                        : safeStatus === "pending"
                          ? "bg-gray-200 w-0"
                          : safeStatus === "confirmed"
                            ? "bg-emerald-500 w-1/3"
                            : safeStatus === "vouchered"
                              ? "bg-emerald-500 w-2/3"
                              : "bg-emerald-500 w-full"
                        }`}
                    />
                  </div>
                </>
              );
            })()}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100">
            {renderStatusActions()}
          </div>
        </div>

        {/* Confirmation Modal - Simple Confirm */}
        {activeStatusModal === "confirmed" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="bg-emerald-500 p-5 text-white">
                <h3 className="text-lg font-medium flex items-center">
                  <FaCheckCircle className="mr-3" />
                  Confirm Booking
                </h3>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-center mb-5">
                  <div className="bg-emerald-100 p-4 rounded-full">
                    <FaQuestionCircle className="text-emerald-600 text-3xl" />
                  </div>
                </div>
                <p className="text-center text-gray-700 mb-6">
                  Are you sure you want to confirm this booking? This action cannot be undone.
                </p>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setActiveStatusModal(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitStatusChange}
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Voucher Modal - With Confirmation Number */}
        {activeStatusModal === "vouchered" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="bg-blue-500 p-5 text-white">
                <h3 className="text-lg font-medium flex items-center">
                  <FaTicketAlt className="mr-3" />
                  Generate Voucher
                </h3>
              </div>

              <form onSubmit={submitStatusChange} className="p-6 space-y-4">
                {/* Confirmation Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmation Number *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="VOUCHER-12345"
                      value={confirmationNum}
                      onChange={(e) => setConfirmationNum(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      required
                    />
                    <div className="absolute right-3 top-2.5 text-gray-400">
                      <FaHashtag />
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    This will be sent to the customer
                  </p>
                </div>

                {/* Customer Information */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Customer Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter Customer Phone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Customer Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Payment Status */}
                <div className="flex items-center">
                  <input
                    id="totally-paid"
                    type="checkbox"
                    checked={totallyPaid}
                    onChange={(e) => setTotallyPaid(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="totally-paid" className="ml-2 block text-sm text-gray-700">
                    Mark as fully paid
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStatusModal(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Generate Voucher
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cancellation Modal - With Reason */}
        {activeStatusModal === "canceled" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="bg-rose-500 p-5 text-white">
                <h3 className="text-lg font-medium flex items-center">
                  <FaTimesCircle className="mr-3" />
                  Cancel Booking
                </h3>
              </div>

              <form onSubmit={submitStatusChange} className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Cancellation
                  </label>
                  <textarea
                    placeholder="Please specify the reason for cancellation..."
                    value={cancelationReason}
                    onChange={(e) => setCancelationReason(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-500"
                    rows={4}
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This will be shared with the customer
                  </p>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setActiveStatusModal(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Go Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                  >
                    Confirm Cancellation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 py-3 px-4 border-b-2 font-medium text-sm flex items-center ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>


        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow overflow-hidden p-4 md:p-6">
          {activeTab === 'details' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
              {loadingDetails ? <StaticLoader /> : renderDetailsContent()}
            </div>
          )}

          {activeTab === 'traveler' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Traveler Information</h2>

              {/* Main Traveler Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md overflow-hidden">
                <div className="p-4 md:p-6">
                  <div className="w-full flex justify-end rounded-full">
                    <span className="flex justify-end bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Primary Contact
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <FaUser className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{item.traveler?.name || 'N/A'}</h3>
                        <p className="text-sm text-gray-500">{item.traveler?.position || 'Traveler'}</p>
                      </div>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-start gap-2 space-x-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <FaEnvelope className="text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-gray-800">{item.traveler?.email || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 space-x-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <FaPhone className="text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-gray-800">{item.traveler?.phone || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Adults Section */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <FaUserFriends className="text-blue-500 mr-2" />
                      Adults
                    </h3>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {item.travelers?.adults?.length || 0} travelers
                    </span>
                  </div>

                  {item.travelers?.adults?.length > 0 ? (
                    <div className="space-y-4">
                      {item.travelers.adults.map((adult, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <FaUser className="text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{adult.title || ''} {adult.first_name || '' + adult.last_name || '' + (index + 1)}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <FaUserSlash className="mx-auto text-gray-400 text-2xl mb-2" />
                      <p className="text-gray-500">No adults added to this booking</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Children Section */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <FaChild className="text-purple-500 mr-2" />
                      Children
                    </h3>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {item.travelers?.children?.length || 0} travelers
                    </span>
                  </div>

                  {item.travelers?.children?.length > 0 ? (
                    <div className="space-y-4">
                      {item.travelers.children.map((child, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <FaChild className="text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{child.title || ''} {child.first_name || '' + child.last_name || '' + (index + 1)}</h4>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <p className="text-sm text-gray-600"><span className="font-medium">Age:</span> {child.age || 'N/A'}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <FaChild className="mx-auto text-gray-400 text-2xl mb-2" />
                      <p className="text-gray-500">No children added to this booking</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              {/* Header and Add Task button */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center">
                  <FaTasks className="text-blue-500 mr-2" />
                  Confirmation Tasks
                </h2>
                <button
                  onClick={handleAddTask}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Add new task"
                >
                  <FaPlus className="mr-2" />
                  Add Task
                </button>
              </div>

              {/* Tasks List */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Recent Tasks</h3>
                    {/* {tasks.length > 0 && (
            <div className="text-sm text-gray-500">
              <span className="font-medium text-green-600">
                {tasks.filter(t => t.is_completed).length}
              </span> of <span className="font-medium">{tasks.length}</span> completed
            </div>
          )} */}
                  </div>

                  {tasks.length > 0 ? (
                    <ul className="space-y-3">
                      {tasks.map((task) => (
                        <li key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1 min-w-0">
                              {/* <div className="flex-shrink-0 pt-1">
                      <input
                        type="checkbox"
                        id={`task-complete-${task.id}`}
                        checked={task.is_completed}
                        onChange={() => toggleTaskComplete(task.id)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div> */}
                              <div className="min-w-0">
                                <label
                                  htmlFor={`task-complete-${task.id}`}
                                  className={`block font-medium truncate ${task.is_completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}
                                >
                                  {task.confirmation_number || 'Task'} - {task.notification ? new Date(task.notification).toLocaleString() : 'No date'}
                                </label>
                                {task.notes && (
                                  <p className="text-sm text-gray-500 mt-1 whitespace-pre-line break-words">
                                    {task.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-2">
                              <button
                                onClick={() => handleEditTask(task)}
                                className="text-gray-500 hover:text-blue-500 p-1 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label={`Edit task ${task.confirmation_number}`}
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => setOpenDelete(task.id)}
                                className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                                aria-label={`Delete task ${task.confirmation_number}`}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <FaTasks className="mx-auto text-gray-400 text-3xl mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Tasks Found</h3>
                      <p className="text-gray-500 mb-4">You don't have any tasks yet.</p>
                      <button
                        onClick={handleAddTask}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Create Your First Task
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Task Modal */}
              <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                onSubmit={handleSubmitTask}
                task={currentTask}
                onChange={handleTaskChange}
                isEditMode={isEditMode}
              />

              {/* Delete Confirmation Modal */}
              <Modal
                open={!!openDelete}
                onClose={() => setOpenDelete(null)}
              >
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Delete Task</h2>
                    <p className="mb-6">Are you sure you want to delete this task?</p>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setOpenDelete(null)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          await handleDeleteTask(openDelete);
                          setOpenDelete(null);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>

            </div>
          )}


          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Payment History</h2>
              </div>

              {item.payments?.length > 0 ? (
                <div className="space-y-4">
                  {item.payments.map((payment, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-blue-500">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          {/* Payment Header */}
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                              <FaMoneyBillWave className="text-blue-600 text-xl" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">
                                Payment #{index + 1} - {payment.code}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Processed on {new Date(payment.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>

                          {/* Payment Amount */}
                          <div className="bg-blue-50 px-4 py-2 rounded-lg">
                            <p className="text-sm font-medium text-gray-500">Amount</p>
                            <p className="text-xl font-bold text-blue-600">
                              {payment.amount} {item.currency || 'USD'}
                            </p>
                          </div>
                        </div>

                        {/* Payment Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          {/* Financial Institution */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {payment.financial?.logo_link ? (
                                <img
                                  src={payment.financial.logo_link}
                                  alt={payment.financial.name}
                                  className="w-10 h-10 object-contain rounded"
                                />
                              ) : (
                                <div className="bg-gray-200 p-2 rounded-full">
                                  <FaUniversity className="text-gray-500" />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-500">Financial Institution</p>
                                <p className="text-gray-800">{payment.financial?.name || 'N/A'}</p>
                              </div>
                            </div>
                          </div>

                          {/* Payment Date */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="bg-gray-200 p-2 rounded-full">
                                <FaCalendarAlt className="text-gray-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Payment Date</p>
                                <p className="text-gray-800">
                                  {new Date(payment.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Payment Method */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="bg-gray-200 p-2 rounded-full">
                                <FaCreditCard className="text-gray-500" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Payment Method</p>
                                <p className="text-gray-800">
                                  {payment.first_time ? 'First Time Payment' : 'Recurring Payment'}
                                </p>
                              </div>
                            </div>
                          </div>

                          {payment.invoice_link ? (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="bg-gray-200 p-2 rounded-full">
                                  <FaFilePdf className="text-red-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Invoice Details</p>
                                  {payment.invoice_link && (
                                    <a
                                      href={payment.invoice_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center text-blue-600 hover:text-blue-800"
                                    >
                                      Click to view
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                              <div className="flex items-center space-x-3">
                                <FaExclamationTriangle className="text-yellow-500" />
                                <p className="text-yellow-800">No invoice available for this payment</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow">
                  <FaMoneyBillWave className="mx-auto text-gray-400 text-4xl mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Payments Recorded</h3>
                  <p className="text-gray-500 mb-4">This booking doesn't have any payment records yet.</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add First Payment
                  </button>
                </div>
              )}

              {/* Payment Summary */}
              {item.payments?.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FaCalculator className="text-blue-500 mr-2" />
                    Payment Summary
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Total Paid</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {item.payments.reduce((sum, payment) => sum + payment.amount, 0)} {item.currency || 'USD'}
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Payments Count</p>
                      <p className="text-2xl font-bold text-green-600">
                        {item.payments.length}
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Last Payment</p>
                      <p className="text-xl font-bold text-purple-600">
                        {new Date(Math.max(...item.payments.map(p => new Date(p.created_at)))).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-6">
              {/* Current Requests Section */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold flex items-center text-gray-800">
                      <FaComments className="text-blue-500 mr-2 text-lg" />
                      Special Requests
                    </h2>
                    <div className="flex space-x-3">
                      {specialRequest && (
                        <button
                          onClick={() => {
                            setSelectedStatus(specialRequestStatus || 'pending');
                            setIsStatusModalOpen(true);
                          }}
                          className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
                        >
                          <FaExchangeAlt className="mr-2 text-sm" />
                          Change Status
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setRequestText(specialRequest || '');
                          setIsRequestModalOpen(true);
                        }}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        <FaPlus className="mr-2 text-sm" />
                        {specialRequest ? 'Update Request' : 'Add Request'}
                      </button>
                    </div>
                  </div>

                  {/* Current Request Display */}
                  {specialRequest ? (
                    <div className="space-y-4">
                      <div className={`p-5 rounded-lg border transition-all ${specialRequestStatus === 'approve'
                        ? 'bg-green-50/80 border-green-200 shadow-green-100 shadow-sm'
                        : specialRequestStatus === 'reject'
                          ? 'bg-red-50/80 border-red-200 shadow-red-100 shadow-sm'
                          : specialRequestStatus === 'upon_availability'
                            ? 'bg-purple-50/80 border-purple-200 shadow-purple-100 shadow-sm'
                            : 'bg-blue-50/80 border-blue-200 shadow-blue-100 shadow-sm'
                        }`}>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className={`p-3 rounded-full flex-shrink-0 shadow-inner ${specialRequestStatus === 'approve'
                              ? 'bg-green-100 text-green-600 shadow-green-200/50'
                              : specialRequestStatus === 'reject'
                                ? 'bg-red-100 text-red-600 shadow-red-200/50'
                                : specialRequestStatus === 'upon_availability'
                                  ? 'bg-purple-100 text-purple-600 shadow-purple-200/50'
                                  : 'bg-blue-100 text-blue-600 shadow-blue-200/50'
                              }`}>
                              <FaCommentAlt className="text-lg" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center flex-wrap gap-2">
                                <p className="font-medium text-gray-800">Your Request</p>
                                <span className={`text-xs font-medium px-3 py-1 rounded-full shadow-inner ${specialRequestStatus === 'approve'
                                  ? 'bg-green-100 text-green-800 shadow-green-200/30'
                                  : specialRequestStatus === 'reject'
                                    ? 'bg-red-100 text-red-800 shadow-red-200/30'
                                    : specialRequestStatus === 'upon_availability'
                                      ? 'bg-purple-100 text-purple-800 shadow-purple-200/30'
                                      : 'bg-yellow-100 text-yellow-800 shadow-yellow-200/30'
                                  }`}>
                                  {specialRequestStatus?.replace('_', ' ') || 'pending'}
                                </span>
                              </div>
                              <p className="text-gray-700 mt-2 whitespace-pre-line leading-relaxed">
                                {specialRequest}
                              </p>
                              {item.request_notes && (
                                <div className="mt-3 p-3 bg-white/50 rounded-lg border border-gray-100 text-sm text-gray-600 shadow-inner">
                                  <p className="font-medium text-gray-700 flex items-center">
                                    <FaInfoCircle className="mr-2 text-blue-400" />
                                    Admin Notes
                                  </p>
                                  <p className="mt-1">{item.request_notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
                      <FaCommentSlash className="mx-auto text-gray-400 text-4xl mb-3" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Special Requests</h3>
                      <p className="text-gray-500 mb-4 max-w-md mx-auto">
                        You haven't made any special requests yet. Click "Add Request" to create one.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Request History Section */}
              {item.request_history?.length > 0 && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                      <FaHistory className="text-gray-500 mr-2" />
                      Request History
                    </h3>
                    <div className="space-y-3">
                      {item.request_history.map((request, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border transition-all ${request.status === 'approve'
                            ? 'bg-green-50/80 border-green-200 shadow-green-100 shadow-sm'
                            : request.status === 'reject'
                              ? 'bg-red-50/80 border-red-200 shadow-red-100 shadow-sm'
                              : request.status === 'upon_availability'
                                ? 'bg-purple-50/80 border-purple-200 shadow-purple-100 shadow-sm'
                                : 'bg-gray-50/80 border-gray-200 shadow-gray-100 shadow-sm'
                            }`}
                        >
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className={`p-2 rounded-full flex-shrink-0 shadow-inner ${request.status === 'approve'
                                ? 'bg-green-100 text-green-600 shadow-green-200/50'
                                : request.status === 'reject'
                                  ? 'bg-red-100 text-red-600 shadow-red-200/50'
                                  : request.status === 'upon_availability'
                                    ? 'bg-purple-100 text-purple-600 shadow-purple-200/50'
                                    : 'bg-gray-100 text-gray-600 shadow-gray-200/50'
                                }`}>
                                <FaClock className="text-sm" />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center flex-wrap gap-2">
                                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                    {request.message}
                                  </p>
                                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full shadow-inner ${request.status === 'approve'
                                    ? 'bg-green-100 text-green-800 shadow-green-200/30'
                                    : request.status === 'reject'
                                      ? 'bg-red-100 text-red-800 shadow-red-200/30'
                                      : request.status === 'upon_availability'
                                        ? 'bg-purple-100 text-purple-800 shadow-purple-200/30'
                                        : 'bg-gray-100 text-gray-800 shadow-gray-200/30'
                                    }`}>
                                    {request.status?.replace('_', ' ')}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 flex items-center">
                                  <FaCalendarAlt className="mr-1.5 opacity-70" />
                                  {new Date(request.created_at).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Request Modal */}
              {isRequestModalOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                  <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all animate-scaleIn">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {specialRequest ? 'Update Request' : 'New Special Request'}
                        </h3>
                        <button
                          onClick={() => setIsRequestModalOpen(false)}
                          className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <textarea
                          value={requestText}
                          onChange={(e) => setRequestText(e.target.value)}
                          placeholder="Describe your special request in detail..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          rows={6}
                        />
                        <div className="flex justify-end space-x-3 pt-2">
                          <button
                            onClick={() => setIsRequestModalOpen(false)}
                            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSubmitRequest}
                            disabled={!requestText.trim()}
                            className={`px-5 py-2.5 rounded-lg text-white transition-colors ${!requestText.trim()
                              ? 'bg-blue-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700'
                              }`}
                          >
                            {specialRequest ? 'Update Request' : 'Submit Request'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Change Modal */}
              {isStatusModalOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                  <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all animate-scaleIn">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Update Request Status
                        </h3>
                        <button
                          onClick={() => setIsStatusModalOpen(false)}
                          className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-3">
                          {['pending', 'approve', 'reject', 'upon_availability'].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleUpdateStatus(status)}
                              className={`p-4 rounded-xl border transition-all flex flex-col items-center ${status === 'approve'
                                ? 'hover:bg-green-50 border-green-200 text-green-700'
                                : status === 'reject'
                                  ? 'hover:bg-red-50 border-red-200 text-red-700'
                                  : status === 'upon_availability'
                                    ? 'hover:bg-purple-50 border-purple-200 text-purple-700'
                                    : 'hover:bg-yellow-50 border-yellow-200 text-yellow-700'
                                }`}
                            >
                              <div className={`p-3 rounded-full mb-2 ${status === 'approve' ? 'bg-green-100 text-green-600' :
                                status === 'reject' ? 'bg-red-100 text-red-600' :
                                  status === 'upon_availability' ? 'bg-purple-100 text-purple-600' :
                                    'bg-yellow-100 text-yellow-600'
                                }`}>
                                {status === 'approve' && <FaCheck className="text-lg" />}
                                {status === 'reject' && <FaTimes className="text-lg" />}
                                {status === 'upon_availability' && <FaQuestion className="text-lg" />}
                                {status === 'pending' && <FaClock className="text-lg" />}
                              </div>
                              <span className="text-sm font-medium">
                                {status.replace('_', ' ')}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'invoice' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center">
                  <FaFileInvoice className="text-blue-500 mr-2" />
                  Documents
                </h2>
                <div className="flex items-center space-x-3">
                  {item.invoice && (
                    <button
                      onClick={() => window.print()}
                      className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                      <FaPrint className="mr-2" />
                      Print All
                    </button>
                  )}
                </div>
              </div>

              {/* Documents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Invoice Card */}
                <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${item.invoice ? 'border-t-4 border-blue-500' : 'border-t-4 border-gray-200'}`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-full ${item.invoice ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                          <FaFileInvoice className="text-xl" />
                        </div>
                        <h3 className="text-lg font-semibold">Invoice</h3>
                      </div>
                      {item.invoice && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Available
                        </span>
                      )}
                    </div>

                    {item.invoice ? (
                      <>
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <FaFilePdf className="text-red-500 text-2xl flex-shrink-0" />
                            <div>
                              <p className="font-medium">Invoice Document</p>
                              <p className="text-sm text-gray-500">Generated on {new Date(item.invoice_date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={item.invoice}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <FaEye className="mr-2" />
                            View
                          </a>
                          <a
                            href={item.invoice}
                            download
                            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <FaDownload className="mr-2" />
                            Download
                          </a>
                          <button
                            onClick={() => window.print()}
                            className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <FaPrint className="mr-2" />
                            Print
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <FaFileExcel className="mx-auto text-gray-400 text-3xl mb-3" />
                        <h4 className="text-lg font-medium text-gray-900 mb-1">No Invoice Available</h4>
                        <p className="text-gray-500">This booking doesn't have an invoice yet.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Voucher Card */}
                <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${item.voucher ? 'border-t-4 border-green-500' : 'border-t-4 border-gray-200'}`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-full ${item.voucher ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                          <FaTicketAlt className="text-xl" />
                        </div>
                        <h3 className="text-lg font-semibold">Voucher</h3>
                      </div>
                      {item.voucher && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Available
                        </span>
                      )}
                    </div>

                    {item.voucher ? (
                      <>
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <FaFilePdf className="text-red-500 text-2xl flex-shrink-0" />
                            <div>
                              <p className="font-medium">Booking Voucher</p>
                              <p className="text-sm text-gray-500">Generated on {new Date(item.voucher_date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={item.voucher}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center px-4 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                          >
                            <FaEye className="mr-2" />
                            View
                          </a>
                          <a
                            href={item.voucher}
                            download
                            className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <FaDownload className="mr-2" />
                            Download
                          </a>
                          <button
                            onClick={() => window.print()}
                            className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <FaPrint className="mr-2" />
                            Print
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <FaFileExcel className="mx-auto text-gray-400 text-3xl mb-3" />
                        <h4 className="text-lg font-medium text-gray-900 mb-1">No Voucher Available</h4>
                        <p className="text-gray-500">This booking doesn't have a voucher yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Combined Actions */}
              {(item.invoice || item.voucher) && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FaPaperclip className="text-blue-500 mr-2" />
                    Quick Actions
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {item.invoice && item.voucher && (
                      <button
                        onClick={() => {
                          window.open(item.invoice, '_blank');
                          window.open(item.voucher, '_blank');
                        }}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaExternalLinkAlt className="mr-2" />
                        Open Both Documents
                      </button>
                    )}
                    {item.invoice && item.voucher && (
                      <a
                        href={`mailto:?subject=Booking Documents&body=Please find attached the booking documents.`}
                        className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <FaEnvelope className="mr-2" />
                        Email Both
                      </a>
                    )}
                    <button
                      onClick={() => window.print()}
                      className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FaPrint className="mr-2" />
                      Print All Documents
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Status Change Confirmation Modal */}
      {showStatusConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Confirm Status Change
              </h3>
              <p className="text-gray-700 mb-4">
                Are you sure you want to change the status to <span className="font-semibold">{newStatus}</span>?
              </p>

              {newStatus === "confirmed" && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Deposit Information</h4>

                </div>
              )}

              {newStatus === "vouchered" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmation Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter confirmation number"
                    value={confirmationNum}
                    onChange={(e) => setConfirmationNum(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
              )}

              {newStatus === "canceled" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cancellation Reason
                  </label>
                  <textarea
                    placeholder="Enter reason for cancellation"
                    value={cancelationReason}
                    onChange={(e) => setCancelationReason(e.target.value)}
                    className="border p-2 rounded w-full"
                    rows={3}
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowStatusConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStatusChange}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Confirm Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetailsPage;