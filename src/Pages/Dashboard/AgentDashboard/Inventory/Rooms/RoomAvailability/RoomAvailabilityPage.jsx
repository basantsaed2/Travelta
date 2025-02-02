import { useState, useEffect } from "react";
import { Card, CardContent, TextField } from "@mui/material";
import { FaArrowLeft, FaArrowRight, FaBed } from "react-icons/fa";
import dayjs from "dayjs";
import { useParams } from 'react-router-dom';
import { usePost } from '../../../../../../Hooks/usePostJson';

const RoomAvailabilityPage = () => {
  const { availableId } = useParams();
  const { postData: postRoomID, loadingPost: loadingRoomID, response: responseRoomID } = usePost({ url: `https://travelta.online/agent/room/availability` });

  const currentYear = dayjs().year();
  const [selectedYear, setSelectedYear] = useState(currentYear);  // Default to current year
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [rooms, setRooms] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (!loadingRoomID && responseRoomID) {
      console.log(responseRoomID.data.availability);  // Log the response to inspect its structure
      setRooms(responseRoomID?.data.availability);  // Update rooms data
    }
  }, [responseRoomID]);
  
  useEffect(() => {
    if (availableId) {
      const formData = new FormData();
      formData.append('room_id', availableId);
      formData.append('year', selectedYear); // Send selected year or current year
      postRoomID(formData);  // Make API call with updated data
    }
  }, [selectedYear, availableId]);  // Trigger when year or availableId changes

  const generateMonthDays = (year, month) => {
    const startOfMonth = dayjs(`${year}-${month}-01`);
    const daysInMonth = startOfMonth.daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = startOfMonth.add(i, "day").format("YYYY-MM-DD");
      // Log to check if the availability is found
      const availability = rooms?.find((d) => d.date === date);  // strict equality check
      // console.log(`Date: ${date}, Availability:`, availability?.quantity);  // Debug log
      return {
        date,
        quantity: availability ? availability.quantity : 0,  // Default to 0 if no data found
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
    setSelectedYear(Number(event.target.value));  // Update year when selected from dropdown
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for Months */}
      <aside className="w-24 bg-gray-200 p-2 flex flex-col gap-2">
        {months.map((month, index) => (
          <div
            key={index}
            className={`p-3 cursor-pointer text-center font-semibold rounded-md transition-all ${
              selectedMonth === index + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-300"
            }`}
            onClick={() => setSelectedMonth(index + 1)}
          >
            {month}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Room Availability</h1>

        {/* Year Dropdown */}
        <div className="mb-6 flex justify-center">
          <select
            className="border-2 rounded-md px-4 py-2"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {/* Create a dropdown for selecting the year */}
            {[currentYear, currentYear + 1, currentYear + 2].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6 justify-center">
          <TextField type="date" variant="outlined" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <TextField type="date" variant="outlined" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <TextField type="number" placeholder="Number of Rooms" variant="outlined" value={rooms} onChange={(e) => setRooms(e.target.value)} />
        </div>

        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            className="text-2xl font-bold text-gray-600 p-2"
            onClick={handlePrevMonth}
            disabled={selectedMonth === 1}
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-2xl font-bold">{months[selectedMonth - 1]} {selectedYear}</h2>
          <button className="text-2xl font-bold text-gray-600 p-2" onClick={handleNextMonth}>
            <FaArrowRight />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4 border p-4 bg-white rounded-lg shadow-md">
          {weekdays.map((day) => (
            <div key={day} className="text-center font-semibold text-gray-600">{day}</div>
          ))}
          {days.map((day, index) => (
            <Card 
              key={index} 
              className={`w-24 h-24 cursor-pointer transition-all ${day.date == dayjs().format("YYYY-MM-DD") ? "border-2 border-blue-500" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              <CardContent className={`text-center ${day.quantity == 0 ? "text-red-600" : "text-green-600"}`}>
                <p className="font-bold text-lg">{day.date.split("-")[2]}</p>
                <p className="text-sm">{day.quantity > 0 ? `${day.quantity} Rooms Available` : "No rooms available"}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RoomAvailabilityPage;
