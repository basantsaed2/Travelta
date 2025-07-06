import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useParams } from "react-router-dom";
import { usePost } from "../../../../../../Hooks/usePostJson";
import StaticLoader from "../../../../../../Components/StaticLoader";
import { useNavigate } from "react-router-dom";

dayjs.extend(isSameOrBefore);

const RoomAvailability = ({ update, setUpdate }) => {
  const { availableId } = useParams();
  const neviagte = useNavigate();
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
  const [selectedDates, setSelectedDates] = useState([]);
  const [isAddingAvailability, setIsAddingAvailability] = useState(false);
  const [rangeConfigs, setRangeConfigs] = useState({});
  const lastFetchedYear = useRef(null);

  // Process room data and update state
  const processRoomData = useCallback((data) => {
    if (data?.availability) {
      setRooms(data.availability);
    }
  }, []);

  // Fetch room availability data only when needed
  const fetchRoomAvailability = useCallback(() => {
    if (availableId && selectedYear !== lastFetchedYear.current) {
      const formData = new FormData();
      formData.append("room_id", availableId);
      formData.append("year", selectedYear);
      postRoomID(formData);
      lastFetchedYear.current = selectedYear;
    }
  }, [availableId, selectedYear, postRoomID]);

  // Handle successful data fetch
  useEffect(() => {
    if (!loadingRoomID && responseRoomID) {
      processRoomData(responseRoomID.data);
    }
  }, [loadingRoomID, responseRoomID, processRoomData]);

  // Handle successful availability submission
  useEffect(() => {
    if (!loadingPost && response) {
      neviagte(-1); // Navigate back after successful submission
    }
  }, [loadingPost, response, setUpdate]);

  // Controlled data fetching with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRoomAvailability();
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedYear, availableId, fetchRoomAvailability]);

  // Memoize the rooms data for quick lookup
  const roomsMap = useMemo(() => {
    const map = {};
    rooms?.forEach(room => {
      map[room.date] = room.quantity;
    });
    return map;
  }, [rooms]);

  // Memoize the month days generation
  const days = useMemo(() => {
    const startOfMonth = dayjs(`${selectedYear}-${selectedMonth}-01`);
    const daysInMonth = startOfMonth.daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = startOfMonth.add(i, "day").format("YYYY-MM-DD");
      return {
        date,
        quantity: roomsMap[date] || 0,
      };
    });
  }, [selectedYear, selectedMonth, roomsMap]);

  // Memoize static arrays
  const weekdays = useMemo(() => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], []);
  const months = useMemo(() => [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ], []);

  // Memoize the Day component
  const Day = useCallback(({ day, isSelected, toggleSelect, isAddingAvailability }) => {
    return (
      <div
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
          <p className="font-bold text-lg">{day.date.split("-")[2]}</p>
          <p
            className={`text-sm flex items-center gap-1 font-semibold ${
              day.quantity > 0 ? "text-green-700" : "text-red-600"
            }`}
          >
            <FaBed className={day.quantity > 0 ? "text-green-600" : "text-red-600"} />
            {day.quantity > 0 ? `${day.quantity} Available` : "Not Available"}
          </p>
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
  }, []);

  // Navigation handlers
  const handlePrevMonth = useCallback(() => {
    if (selectedMonth > 1) {
      setSelectedMonth(prev => prev - 1);
    } else {
      setSelectedMonth(12);
      setSelectedYear(prev => prev - 1);
    }
  }, [selectedMonth]);

  const handleNextMonth = useCallback(() => {
    if (selectedMonth < 12) {
      setSelectedMonth(prev => prev + 1);
    } else {
      setSelectedMonth(1);
      setSelectedYear(prev => prev + 1);
    }
  }, [selectedMonth]);

  const handleYearChange = useCallback((event) => {
    setSelectedYear(Number(event.target.value));
  }, []);

  // Selection handlers
  const toggleSelect = useCallback((date) => {
    if (!isAddingAvailability) return;
    setSelectedDates(prevSelected => {
      if (prevSelected.includes(date)) {
        return prevSelected.filter(d => d !== date);
      } else {
        return [...prevSelected, date];
      }
    });
  }, [isAddingAvailability]);

  // Group contiguous dates
  const groupContiguousDates = useCallback((dates) => {
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
  }, []);

  const groupedRanges = useMemo(() => groupContiguousDates(selectedDates), [selectedDates, groupContiguousDates]);

  // Range configuration management
  useEffect(() => {
    if (groupedRanges.length === 0) {
      setRangeConfigs({});
      return;
    }

    setRangeConfigs(prevConfigs => {
      const newConfigs = { ...prevConfigs };
      
      groupedRanges.forEach(range => {
        const key = `${range.from}-${range.to}`;
        if (!newConfigs[key]) {
          let dayList = [];
          let current = dayjs(range.from);
          const end = dayjs(range.to);
          while (current.isSameOrBefore(end)) {
            dayList.push(current.format("YYYY-MM-DD"));
            current = current.add(1, "day");
          }
          
          newConfigs[key] = {
            mode: "common",
            commonRooms: "",
            customRooms: dayList.reduce((acc, date) => {
              acc[date] = "";
              return acc;
            }, {}),
          };
        }
      });

      // Clean up old configurations
      Object.keys(newConfigs).forEach(key => {
        if (!groupedRanges.some(range => `${range.from}-${range.to}` === key)) {
          delete newConfigs[key];
        }
      });

      return newConfigs;
    });
  }, [groupedRanges]);

  const handleModeChange = useCallback((key, mode) => {
    setRangeConfigs(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        mode,
      },
    }));
  }, []);

  const handleCommonRoomsChange = useCallback((key, value) => {
    setRangeConfigs(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        commonRooms: value,
      },
    }));
  }, []);

  const handleCustomRoomChange = useCallback((key, date, value) => {
    setRangeConfigs(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        customRooms: {
          ...prev[key].customRooms,
          [date]: value,
        },
      },
    }));
  }, []);

  const handleSubmitAvailabilities = useCallback(async () => {
    if (loadingPost) return;

    const availabilityRooms = [];
    let hasValidEntries = false;
    
    groupedRanges.forEach(range => {
      const key = `${range.from}-${range.to}`;
      const config = rangeConfigs[key];
      if (!config) return;

      if (config.mode === "common") {
        if (config.commonRooms === "" || isNaN(config.commonRooms)) return;
        availabilityRooms.push({
          from: range.from,
          to: range.to,
          quantity: config.commonRooms,
        });
        hasValidEntries = true;
      } else {
        Object.entries(config.customRooms).forEach(([date, quantity]) => {
          if (quantity === "" || isNaN(quantity)) return;
          availabilityRooms.push({
            from: date,
            to: date,
            quantity,
          });
          hasValidEntries = true;
        });
      }
    });

    if (!hasValidEntries) {
      alert("Please enter valid room quantities for at least one date");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("room_id", availableId);
      availabilityRooms.forEach((room, index) => {
        formData.append(`rooms[${index}][from]`, room.from);
        formData.append(`rooms[${index}][to]`, room.to);
        formData.append(`rooms[${index}][quantity]`, room.quantity);
      });

      await postData(formData, "Room Availability Updated Successfully");
      
      setSelectedDates([]);
      setIsAddingAvailability(false);
      setRangeConfigs({});
    } catch (error) {
      console.error("Submission failed:", error);
    }
  }, [groupedRanges, rangeConfigs, availableId, postData, loadingPost]);

  return (
    <div className="w-full">
      {loadingRoomID ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="flex min-h-screen bg-gray-100">
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                className="text-2xl text-gray-600 hover:text-gray-800 transition-all"
                onClick={handlePrevMonth}
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
                  {[currentYear, currentYear + 1, currentYear + 2].map(year => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <button
                className="text-2xl text-gray-600 hover:text-gray-800 transition-all"
                onClick={handleNextMonth}
              >
                <FaArrowRight />
              </button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsAddingAvailability(true)}
                disabled={isAddingAvailability}
              >
                Add Availability
              </Button>
            </div>

            <div className="flex w-full">
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

              <div className="w-full grid grid-cols-7 border bg-white place-items-center rounded-lg shadow-md">
                {weekdays.map(day => (
                  <div
                    key={day}
                    className="w-full text-center font-semibold text-gray-600"
                  >
                    {day}
                  </div>
                ))}
                {days.map(day => (
                  <Day
                    key={day.date}
                    day={day}
                    isSelected={selectedDates.includes(day.date)}
                    toggleSelect={toggleSelect}
                    isAddingAvailability={isAddingAvailability}
                  />
                ))}
              </div>
            </div>

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
                            min: "0",
                          }}
                          fullWidth
                        />
                      )}
                      {config.mode === "custom" && (
                        <div className="grid grid-cols-2 gap-4">
                          {dayList.map(date => (
                            <TextField
                              key={date}
                              label={`Rooms for ${date}`}
                              type="number"
                              variant="outlined"
                              value={config.customRooms?.[date] || ""}
                              inputProps={{
                                min: "0",
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
                <div className="flex gap-4">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmitAvailabilities}
                    disabled={loadingPost}
                  >
                    {loadingPost ? "Submitting..." : "Submit Selected Availabilities"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setSelectedDates([]);
                      setIsAddingAvailability(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default RoomAvailability;