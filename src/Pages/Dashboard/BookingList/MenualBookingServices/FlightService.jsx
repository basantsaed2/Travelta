import React, { useEffect, useState } from 'react';
import StaticLoader from '../../../../Components/StaticLoader';
import { FaFileExcel, FaSearch, FaFilter,FaCalendarAlt,FaEdit} from "react-icons/fa";
import * as XLSX from "xlsx";
import { Link } from 'react-router-dom';

const FlightService = ({ data }) => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination State
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setFlights(data);
      setFilteredFlights(data);
    }
  }, [data]);

  // Filtering Logic: search, status, and date range
  useEffect(() => {
    let filtered = flights;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(flight =>
        Object.values(flight).some(
          value =>
            value &&
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered.filter(flight => flight.status === selectedStatus);
    }

    // Date range filter
    if (startDate && endDate) {
      filtered = filtered.filter(flight => {
        const depatureDate = new Date(flight.depature);
        return depatureDate >= new Date(startDate) && depatureDate <= new Date(endDate);
      });
    }

    setFilteredFlights(filtered);
    setCurrentPage(1);
  }, [searchText, selectedStatus, startDate, endDate, flights]);

  // Handlers
  const handleSearch = (e) => setSearchText(e.target.value);
  const handleFilterStatus = (e) => setSelectedStatus(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  // Pagination Logic
  const totalPages = Math.ceil(filteredFlights.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredFlights.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      flights.map((flight, index) => ({
        SL: index + 1,
        Code: flight.code || "-",
        Airline: flight.airline || "-",
        Country: flight.country || "-",
        Depature: flight.depature || "-",
        FlightClass: flight.flight_class || "-",
        Direction: flight.flight_direction || "-",
        Type: flight.flight_type || "-",
        Adults: flight.adults_no || "-",
        Children: flight.children_no || "-",
        Infants: flight.infants_no || "-",
        Status: flight.status || "-",
        PaymentStatus: flight.payment_status || "-",
        TotalPrice: flight.total_price || "-"
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Flight_Bookings");
    XLSX.writeFile(workbook, "Flight_Bookings.xlsx");
  };

  // Unique statuses for filter dropdown
  const uniqueStatus = [...new Set(flights.map(flight => flight.status).filter(Boolean))];
  const headers = ['Code', 'Airline', 'Country','Route','Depature', 'Class', 'Status', 'Payment', 'Total Price', 'Details','Action'];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {!data ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="w-full sm:min-w-0">
          {/* Search & Filter Section */}
          <div className="flex flex-wrap items-center gap-4 bg-white p-6 shadow-lg rounded-xl mb-6 border border-gray-200">
            {/* Search Input */}
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg w-full md:w-[280px] border border-gray-300">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search flights..."
                value={searchText}
                onChange={handleSearch}
                className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
              />
            </div>

            {/* Filter by status */}
            <div className="relative w-full md:w-[240px]">
              <select
                onChange={handleFilterStatus}
                value={selectedStatus}
                className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Filter by Status</option>
                {uniqueStatus.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
            </div>

            {/* Date Range Inputs */}
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <input
                type="date"
                className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-300"
                value={startDate}
                onChange={handleStartDateChange}
                placeholder="Depature from"
              />
              <input
                type="date"
                className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-300"
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="Depature to"
              />
            </div>

            {/* Export to Excel Button */}
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
            >
              <FaFileExcel className="w-5 h-5" />
              Export to Excel
            </button>
          </div>

          {/* Rows per Page */}
          <div className="flex items-center space-x-2 mb-5">
            <label className="text-gray-700 font-medium">Rows per page:</label>
            <div className="w-full md:w-[120px]">
              <select
                onChange={handleRowsChange}
                value={rowsPerPage}
                className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer"
              >
                <option value="5">5 rows</option>
                <option value="10">10 rows</option>
                <option value="20">20 rows</option>
                <option value="30">30 rows</option>
                <option value="50">50 rows</option>
              </select>
            </div>
          </div>

          {/* Flights Table */}
          <div className="w-full sm:min-w-0 block overflow-x-scroll scrollSection border-collapse">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-200 text-gray-700">
                <tr className="border-t-2 border-b-2">
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg p-2 border-b-2">
                    SL
                  </th>
                  {headers.map((name, index) => (
                    <th
                      key={index}
                      className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg py-3 border-b-2"
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.length === 0 ? (
                  <tr>
                    <td colSpan={headers.length + 1} className="text-center text-xl text-gray-500 py-4">
                      No Flights Found
                    </td>
                  </tr>
                ) : (
                  currentRows.map((flight, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                    >
                      <td className="text-center py-2">{indexOfFirstRow + index + 1}</td>
                      <td className="text-center py-2 text-gray-600">{flight?.code || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{flight?.airline || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{flight?.country || "-"}</td>
                      <td className="text-center py-2 text-gray-600">
                      {Array.isArray(flight.from_to) &&
                        flight.from_to.map((route, index) => (
                          <span key={index}>
                            {route.from} → {route.to}
                            {index < flight.from_to.length - 1 && ', '}
                          </span>
                        ))}
                    </td>
                      <td className="text-center py-2 text-gray-600">{flight?.depature || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{flight?.flight_class || "-"}</td>
                      <td className="text-center py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          flight.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          flight.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {flight?.status || "-"}
                        </span>
                      </td>
                      <td className="text-center py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          flight.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {flight?.payment_status || "-"}
                        </span>
                      </td>
                      <td className="text-center py-2 text-gray-600">{flight?.total_price || "-"} {flight?.currency || ""}</td>
                      <td className="text-center py-2">
                        <div className="flex items-center justify-center gap-1">
                          <Link
                              to={`details/${flight.id}`} state={{ type: "flight", data: flight }}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                      <td className="text-center flex items-center justify-center mt-3 py-2 text-gray-600">
                      <Link to={`/dashboard_agent/booking/manual_booking/edit_booking/${flight.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                      </td> 
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Previous
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages || 1}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightService;