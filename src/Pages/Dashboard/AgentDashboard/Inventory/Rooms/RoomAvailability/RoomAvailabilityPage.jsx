// import { useState, useEffect } from "react";
// import { TextField, MenuItem } from "@mui/material";
// import { FaArrowLeft, FaArrowRight, FaBed } from "react-icons/fa";
// import dayjs from "dayjs";
// import { useParams } from 'react-router-dom';
// import { usePost } from '../../../../../../Hooks/usePostJson';
// import StaticLoader from '../../../../../../Components/StaticLoader';

// const RoomAvailability = ({ refetch ,setUpdate}) => {
//   const { availableId } = useParams();
//   const { postData: postRoomID, loadingPost: loadingRoomID, response: responseRoomID } = usePost({ url: `https://travelta.online/agent/room/availability` });

//   const currentYear = dayjs().year();
//   const [selectedYear, setSelectedYear] = useState(currentYear);  // Default to current year
//   const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
//   const [rooms, setRooms] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     if (!loadingRoomID && responseRoomID) {
//       console.log(responseRoomID.data.availability);  // Log the response to inspect its structure
//       setRooms(responseRoomID?.data.availability);  // Update rooms data
//     }
//   }, [responseRoomID,refetch]);
  
//   useEffect(() => {
//     if (availableId) {
//       const formData = new FormData();
//       formData.append('room_id', availableId);
//       formData.append('year', selectedYear); // Send selected year or current year
//       postRoomID(formData);  // Make API call with updated data
//     }
//   }, [selectedYear, availableId,refetch]);  // Trigger when year or availableId changes

//   const generateMonthDays = (year, month) => {
//     const startOfMonth = dayjs(`${year}-${month}-01`);
//     const daysInMonth = startOfMonth.daysInMonth();
//     return Array.from({ length: daysInMonth }, (_, i) => {
//       const date = startOfMonth.add(i, "day").format("YYYY-MM-DD");
//       // Log to check if the availability is found
//       const availability = rooms?.find((d) => d.date === date);  // strict equality check
//       // console.log(`Date: ${date}, Availability:`, availability?.quantity);  // Debug log
//       return {
//         date,
//         quantity: availability ? availability.quantity : 0,  // Default to 0 if no data found
//       };
//     });
//   };
  
//   const days = generateMonthDays(selectedYear, selectedMonth);
//   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//   ];

//   const handlePrevMonth = () => {
//     if (selectedMonth > 1) {
//       setSelectedMonth((prev) => prev - 1);
//     }
//   };

//   const handleNextMonth = () => {
//     if (selectedMonth < 12) {
//       setSelectedMonth((prev) => prev + 1);
//     } else {
//       setSelectedMonth(1);
//       setSelectedYear((prev) => prev + 1);
//     }
//   };

//   const handleYearChange = (event) => {
//     setSelectedYear(Number(event.target.value));  // Update year when selected from dropdown
//   };


//   return (
//     <div className="w-full">
//     {loadingRoomID ? (
//       <div className="w-full h-56 flex justify-center items-center">
//         <StaticLoader />
//       </div>
//     ) :(
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {/* <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Room Availability</h1> */}

//         {/* Filters */}
//         {/* <div className="flex flex-wrap gap-4 mb-6 justify-center">
//           <TextField
//             select
//             label="Year"
//             variant="outlined"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             className="w-32"
//           >
//             {[currentYear, currentYear + 1, currentYear + 2].map((year) => (
//               <MenuItem key={year} value={year}>
//                 {year}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField type="date" label="Start Date" variant="outlined" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//           <TextField type="date" label="End Date" variant="outlined" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//           <TextField type="number" label="Number of Rooms" variant="outlined" InputLabelProps={{ shrink: true }} value={rooms} onChange={(e) => setRooms(e.target.value)} />
//         </div> */}

//         {/* Calendar Header */}
//         <div className="flex items-center justify-center gap-6 mb-6">
//           <button className="text-2xl text-gray-600 hover:text-gray-800 transition-all" onClick={() => setSelectedMonth(selectedMonth - 1)} disabled={selectedMonth === 1}>
//             <FaArrowLeft />
//           </button>
//           <h2 className="text-2xl font-bold">{months[selectedMonth - 1]} {selectedYear}</h2>
          
//         <div className="flex flex-wrap gap-4 justify-center">
//           <TextField
//             select
//             label="Year"
//             variant="outlined"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             className="w-32"
//           >
//             {[currentYear, currentYear + 1, currentYear + 2].map((year) => (
//               <MenuItem key={year} value={year}>
//                 {year}
//               </MenuItem>
//             ))}
//           </TextField>
//         </div>

//           <button className="text-2xl text-gray-600 hover:text-gray-800 transition-all" onClick={() => setSelectedMonth(selectedMonth + 1)} disabled={selectedMonth === 12}>
//             <FaArrowRight />
//           </button>
//         </div>

//         <div className="flex w-full">
//           {/* Sidebar for Months */}
//           <aside className="w-28 bg-gray-200 p-4 flex flex-col gap-2 rounded-md shadow-md">
//             {months.map((month, index) => (
//               <div
//                 key={index}
//                 className={`p-3 cursor-pointer text-center font-semibold rounded-md transition-all ${
//                   selectedMonth === index + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-300"
//                 }`}
//                 onClick={() => setSelectedMonth(index + 1)}
//               >
//                 {month}
//               </div>
//             ))}
//           </aside>

//           {/* Calendar Grid */}
//           <div className="w-full grid grid-cols-7 border bg-white place-items-center rounded-lg shadow-md">
//             {weekdays.map((day) => (
//               <div key={day} className="w-full text-center font-semibold text-gray-600">
//                 {day}
//               </div>
//             ))}
//             {days.map((day, index) => (
//               <div
//                 key={index}
//                 className={`w-28 h-24 flex flex-col items-center justify-center cursor-pointer transition-all rounded-md shadow-sm ${
//                   day.quantity > 0 ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400"
//                 }`}
//               >
//                 <div className="flex flex-col items-center">
//                   <p className="font-bold text-lg">{day.date.split("-")[2]}</p>
//                   <p className={`text-sm flex items-center gap-1 font-semibold ${
//                     day.quantity > 0 ? "text-green-700" : "text-red-600"
//                   }`}>
//                     <FaBed className={day.quantity > 0 ? "text-green-600" : "text-red-600"} />
//                     {day.quantity > 0 ? `${day.quantity} Available` : "No Rooms"}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//     )}
//     </div>
//   );
// };

// export default RoomAvailability;

import { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { FaArrowLeft, FaArrowRight, FaBed } from "react-icons/fa";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"; // Import plugin
import { useParams } from "react-router-dom";
import { usePost } from "../../../../../../Hooks/usePostJson";
import StaticLoader from "../../../../../../Components/StaticLoader";

// Extend Day.js with the isSameOrBefore plugin
dayjs.extend(isSameOrBefore);

const RoomAvailability = ({ refetch, setUpdate }) => {
  const { availableId } = useParams();
  const {
    postData: postRoomID,
    loadingPost: loadingRoomID,
    response: responseRoomID,
  } = usePost({ url: `https://travelta.online/agent/room/availability` });
  const { postData, loadingPost, response } = usePost({
    url: "https://travelta.online/agent/room/availability/add",
  });

  const currentYear = dayjs().year();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [rooms, setRooms] = useState([]);

  // State to hold selected dates (only for days with zero availability)
  const [selectedDates, setSelectedDates] = useState([]);
  // New state to control whether the user is in "add availability" mode
  const [isAddingAvailability, setIsAddingAvailability] = useState(false);

  /* 
    State to hold room configuration for each contiguous range.
    The object is keyed by a range key ("from-to") and contains:
      - mode: "common" (one value for all days) or "custom" (per-day values)
      - commonRooms: a value for the entire range if in "common" mode
      - customRooms: an object mapping each date in the range to its room value
  */
  const [rangeConfigs, setRangeConfigs] = useState({});

  useEffect(() => {
    if (!loadingRoomID && responseRoomID) {
      console.log(responseRoomID.data.availability);
      setRooms(responseRoomID?.data.availability);
    }
  }, [responseRoomID, refetch]);

  useEffect(() => {
    if (availableId) {
      const formData = new FormData();
      formData.append("room_id", availableId);
      formData.append("year", selectedYear);
      postRoomID(formData);
    }
  }, [selectedYear, availableId, refetch]);

  // Generate calendar days for the current month with availability info.
  const generateMonthDays = (year, month) => {
    const startOfMonth = dayjs(`${year}-${month}-01`);
    const daysInMonth = startOfMonth.daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = startOfMonth.add(i, "day").format("YYYY-MM-DD");
      const availability = rooms?.find((d) => d.date === date);
      return {
        date,
        quantity: availability ? availability.quantity : 0,
      };
    });
  };

  const days = generateMonthDays(selectedYear, selectedMonth);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const handlePrevMonth = () => {
    if (selectedMonth > 1) {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth < 12) {
      setSelectedMonth((prev) => prev + 1);
    } else {
      setSelectedMonth(1);
      setSelectedYear((prev) => prev + 1);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  // Toggle selection of a date only if in "add availability" mode.
  const toggleSelect = (date) => {
    if (!isAddingAvailability) return;
    setSelectedDates((prevSelected) => {
      if (prevSelected.includes(date)) {
        return prevSelected.filter((d) => d !== date);
      } else {
        return [...prevSelected, date];
      }
    });
  };

  // Group contiguous dates into ranges.
  // E.g., if selectedDates are ["2025-03-30", "2025-03-31", "2025-04-02"],
  // then the ranges become:
  // [{ from: "2025-03-30", to: "2025-03-31" }, { from: "2025-04-02", to: "2025-04-02" }]
  const groupContiguousDates = (dates) => {
    if (!dates || dates.length === 0) return [];
    const sortedDates = [...dates].sort((a, b) => new Date(a) - new Date(b));
    const ranges = [];
    let start = sortedDates[0];
    let end = sortedDates[0];

    for (let i = 1; i < sortedDates.length; i++) {
      const current = sortedDates[i];
      if (dayjs(current).diff(dayjs(end), "day") === 1) {
        end = current;
      } else {
        ranges.push({ from: start, to: end });
        start = current;
        end = current;
      }
    }
    ranges.push({ from: start, to: end });
    return ranges;
  };

  const groupedRanges = groupContiguousDates(selectedDates);

  // Initialize or update configuration for each grouped range.
  useEffect(() => {
    setRangeConfigs((prevConfigs) => {
      const newConfigs = { ...prevConfigs };
      groupedRanges.forEach((range) => {
        const key = `${range.from}-${range.to}`;
        if (!newConfigs[key]) {
          // Create a list of dates in the range.
          let dayList = [];
          let current = dayjs(range.from);
          const end = dayjs(range.to);
          while (current.isSameOrBefore(end)) {
            dayList.push(current.format("YYYY-MM-DD"));
            current = current.add(1, "day");
          }
          newConfigs[key] = {
            mode: "common", // default mode
            commonRooms: "",
            customRooms: dayList.reduce((acc, date) => {
              acc[date] = "";
              return acc;
            }, {}),
          };
        }
      });
      // Remove configurations for ranges that no longer exist.
      Object.keys(newConfigs).forEach((key) => {
        if (!groupedRanges.some((range) => `${range.from}-${range.to}` === key)) {
          delete newConfigs[key];
        }
      });
      return newConfigs;
    });
  }, [groupedRanges]);

  // Handlers to update room configuration for a specific range.
  const handleModeChange = (key, mode) => {
    setRangeConfigs((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        mode,
      },
    }));
  };

  const handleCommonRoomsChange = (key, value) => {
    setRangeConfigs((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        commonRooms: value,
      },
    }));
  };

  const handleCustomRoomChange = (key, date, value) => {
    setRangeConfigs((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        customRooms: {
          ...prev[key].customRooms,
          [date]: value,
        },
      },
    }));
  };

  // Build the availabilityRooms array and send the data via FormData.
  const handleSubmitAvailabilities = () => {
    const availabilityRooms = [];

    groupedRanges.forEach((range) => {
      const key = `${range.from}-${range.to}`;
      const config = rangeConfigs[key];
      if (config.mode === "common") {
        // In common mode, one entry for the entire range.
        availabilityRooms.push({
          from: range.from,
          to: range.to,
          quantity: config.commonRooms,
        });
      } else {
        // In custom mode, create an entry per day.
        Object.keys(config.customRooms).forEach((date) => {
          availabilityRooms.push({
            from: date,
            to: date,
            quantity: config.customRooms[date],
          });
        });
      }
    });

    // Create the FormData and append each room separately.
    const formData = new FormData();
    formData.append("room_id", availableId);
    availabilityRooms.forEach((room, index) => {
      formData.append(`rooms[${index}][from]`, room.from);
      formData.append(`rooms[${index}][to]`, room.to);
      formData.append(`rooms[${index}][quantity]`, room.quantity);
    });

    console.log("Submitting FormData with the following room data:");
    availabilityRooms.forEach((room, index) => {
      console.log(
        `rooms[${index}]: from=${room.from}, to=${room.to}, quantity=${room.quantity}`
      );
    });
    postData(formData, "Room Availability Success");
  };

  return (
    <div className="w-full">
      {loadingRoomID ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="flex min-h-screen bg-gray-100">
          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                className="text-2xl text-gray-600 hover:text-gray-800 transition-all"
                onClick={handlePrevMonth}
                disabled={selectedMonth === 1}
              >
                <FaArrowLeft />
              </button>
              <h2 className="text-2xl font-bold">
                {months[selectedMonth - 1]} {selectedYear}
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <TextField
                  select
                  label="Year"
                  variant="outlined"
                  value={selectedYear}
                  onChange={handleYearChange}
                  className="w-32"
                >
                  {[currentYear, currentYear + 1, currentYear + 2].map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <button
                className="text-2xl text-gray-600 hover:text-gray-800 transition-all"
                onClick={handleNextMonth}
                disabled={selectedMonth === 12}
              >
                <FaArrowRight />
              </button>
              {/* "Add Availability" button appears in the header.
                  When clicked, it sets the mode so that calendar cells become selectable. */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsAddingAvailability(true)}
              >
                Add Availability
              </Button>
            </div>

            <div className="flex w-full">
              {/* Sidebar for Months */}
              <aside className="w-28 bg-gray-200 p-4 flex flex-col gap-2 rounded-md shadow-md">
                {months.map((month, index) => (
                  <div
                    key={index}
                    className={`p-3 cursor-pointer text-center font-semibold rounded-md transition-all ${
                      selectedMonth === index + 1
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-300"
                    }`}
                    onClick={() => setSelectedMonth(index + 1)}
                  >
                    {month}
                  </div>
                ))}
              </aside>

              {/* Calendar Grid */}
              <div className="w-full grid grid-cols-7 border bg-white place-items-center rounded-lg shadow-md">
                {weekdays.map((day) => (
                  <div
                    key={day}
                    className="w-full text-center font-semibold text-gray-600"
                  >
                    {day}
                  </div>
                ))}
                {days.map((day, index) => {
                  const isSelected = selectedDates.includes(day.date);
                  return (
                    <div
                      key={index}
                      className={`w-28 h-24 flex flex-col items-center justify-center cursor-pointer transition-all rounded-md shadow-sm border 
                        ${day.quantity > 0 ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400"} 
                        ${isSelected ? "ring-4 ring-blue-500" : ""}`}
                      onClick={() => {
                        if (day.quantity === 0 && isAddingAvailability) {
                          toggleSelect(day.date);
                        }
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <p className="font-bold text-lg">
                          {day.date.split("-")[2]}
                        </p>
                        <p
                          className={`text-sm flex items-center gap-1 font-semibold ${
                            day.quantity > 0 ? "text-green-700" : "text-red-600"
                          }`}
                        >
                          <FaBed
                            className={
                              day.quantity > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          />
                          {day.quantity > 0
                            ? `${day.quantity} Available`
                            : "Not Available"}
                        </p>
                        {/* Only show the checkbox if in add availability mode */}
                        {day.quantity === 0 && isAddingAvailability && (
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="mt-2"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Display Grouped Ranges with Room Configuration Options */}
            {isAddingAvailability && groupedRanges.length > 0 && (
              <div className="mt-8 bg-white p-6 rounded-md shadow-md">
                <h3 className="text-xl font-bold mb-4">
                  Selected Date Ranges & Room Configurations
                </h3>
                {groupedRanges.map((range, idx) => {
                  const key = `${range.from}-${range.to}`;
                  const config = rangeConfigs[key] || {};
                  let dayList = [];
                  let current = dayjs(range.from);
                  const end = dayjs(range.to);
                  while (current.isSameOrBefore(end)) {
                    dayList.push(current.format("YYYY-MM-DD"));
                    current = current.add(1, "day");
                  }
                  return (
                    <div key={idx} className="mb-6 border p-4 rounded">
                      <h4 className="font-bold mb-2">
                        From: {range.from} To: {range.to}
                      </h4>
                      {/* Radio group to select mode: common or custom */}
                      <div className="mb-2">
                        <RadioGroup
                          row
                          value={config.mode || "common"}
                          onChange={(e) => handleModeChange(key, e.target.value)}
                        >
                          <FormControlLabel
                            value="common"
                            control={<Radio />}
                            label="Same number for all days"
                          />
                          <FormControlLabel
                            value="custom"
                            control={<Radio />}
                            label="Set number per day"
                          />
                        </RadioGroup>
                      </div>
                      {config.mode === "common" && (
                        <TextField
                          label="Number of Rooms"
                          type="number"
                          variant="outlined"
                          value={config.commonRooms}
                          onChange={(e) =>
                            handleCommonRoomsChange(key, e.target.value)
                          }
                          inputProps={{
                            min: "0", // Set the minimum value for the number input
                  }}
                        />
                      )}
                      {config.mode === "custom" && (
                        <div className="grid grid-cols-2 gap-4">
                          {dayList.map((date) => (
                            <TextField
                              key={date}
                              label={`Rooms for ${date}`}
                              type="number"
                              variant="outlined"
                              value={
                                config.customRooms
                                  ? config.customRooms[date]
                                  : ""
                              }
                              inputProps={{
                                min: "0", // Set the minimum value for the number input
                      }}
                              onChange={(e) =>
                                handleCustomRoomChange(key, date, e.target.value)
                              }
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmitAvailabilities}
                >
                  Submit Selected Availabilities
                </Button>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default RoomAvailability;

