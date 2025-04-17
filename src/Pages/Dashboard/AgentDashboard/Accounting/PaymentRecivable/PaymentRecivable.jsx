// import React, { useEffect, useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { useGet } from "../../../../../Hooks/useGet";
// import { useAuth } from "../../../../../Context/Auth";
// import StaticLoader from "../../../../../Components/StaticLoader";
// import { Link } from "react-router-dom";
// import { usePost } from "../../../../../Hooks/usePostJson";
// import { TextField, MenuItem, Button } from "@mui/material";
// const PaymentRecivable = () => {
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   const {
//     refetch: refetchReceivable,
//     loading: loadingReceivable,
//     data: dataReceivable,
//   } = useGet({
//     url: "https://travelta.online/agent/accounting/payment_receivable",
//   });

//   const [list, setList] = useState([]);

//   const [amount, setAmount] = useState("");
//   const [date, setDate] = useState("");
//   const [supplierId, setSupplierId] = useState("");
//   const [manualBookingId, setManualBookingId] = useState("");
//   const [financialId, setFinancialId] = useState("");
//   const [currencyId, setCurrencyId] = useState("");
//   const [Receivable, setReceivable] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const displayedData = Array.isArray(filteredData?.payments)
//     ? filteredData?.payments.slice(0, rowsPerPage)
//     : [];
//   const auth = useAuth();
//   useEffect(() => {
//     refetchReceivable();
//   }, [refetchReceivable]);

//   useEffect(() => {
//     if (dataReceivable) {
//       setReceivable(dataReceivable);
//       setFilteredData(dataReceivable); // Set filtered data initially
//     }
//     console.log("dataa", dataReceivable);
//   }, [dataReceivable]);
//   const handleFilter = async () => {
//     try {
//       const response = await fetch(
//         `https://travelta.online/agent/accounting/payment_receivable/filter`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${auth.user?.token || ""}`, // Ensure token is passed
//           },
//           body: JSON.stringify({
//             booking_from: fromDate,
//             booking_to: toDate,
//             due_from: fromDate,
//             due_to: toDate,
//           }),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch filtered data");

//       const filteredResult = await response.json();
//       setFilteredData(filteredResult.agent_payable || []); // Ensure it's an array
//     } catch (error) {
//       console.error("Error fetching filtered data:", error);
//     }
//   };

//   const filteredSearch = displayedData.filter((item) =>
//     item.client_name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // const handleTransaction

//   if (loadingReceivable) {
//     return <StaticLoader />;
//   }

//   return (
//     <div className="p-5 flex flex-col items-center gap-6">
//       {/* Blue Card */}
//       <div className="bg-mainColor text-white text-4xl font-bold p-7 w-[50%] text-center rounded-lg shadow-lg">
//         Payment Receivable
//       </div>
//       {/* Grid Container */}
//       <div className="w-full  p-6 rounded-lg  mt-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* First Row (3 Cards) */}
//           <div className="bg-white p-5 rounded-lg shadow-md text-start">
//             <h2 className="text-xl font-semibold text-gray-700">
//               Total Balance
//             </h2>
//             <p className="text-lg text-gray-500 mt-2">
//               ${Receivable?.total_balance}
//             </p>
//           </div>
//           <div className="bg-white p-5 rounded-lg shadow-md text-start">
//             <h2 className="text-xl font-semibold text-gray-700">Paid Amount</h2>
//             <p className="text-lg text-gray-500 mt-2">
//               ${Receivable?.total_paid}
//             </p>
//           </div>
//           <div className="bg-white p-5 rounded-lg shadow-md text-start">
//             <h2 className="text-xl font-semibold text-gray-700">
//               Overdue Amount
//             </h2>
//             <p className="text-lg text-gray-500 mt-2">
//               ${Receivable?.total_over_due}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Date Range Filter */}
//       <div className="flex items-center justify-center gap-4 mb-4">
//         <label className="text-lg font-medium">From:</label>
//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//           className="border p-2 rounded-lg shadow-sm"
//         />
//         <label className="text-lg font-medium">To:</label>
//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//           className="border p-2 rounded-lg shadow-sm"
//         />
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           onClick={handleFilter}
//         >
//           Filter
//         </button>
//       </div>

//       {/* Search Input */}
//       <div className="relative w-1/2">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="border w-full p-2 pl-10 rounded-md"
//         />
//         <FaSearch className="absolute left-3 top-3 text-gray-400" />
//       </div>

//       <div className="w-full">
//         {/* Rows per page selector */}
//         <div className="flex justify-end mb-4">
//           <label className="mr-2 text-gray-700 font-medium">Show:</label>
//           <select
//             value={rowsPerPage}
//             onChange={(e) => setRowsPerPage(Number(e.target.value))}
//             className="border p-2 rounded shadow-md"
//           >
//             <option value="10">10</option>
//             <option value="50">50</option>
//             <option value="100">100</option>
//           </select>
//         </div>

//         {/* Data Table */}
//         <table className="w-full border-collapse border rounded-lg shadow-lg">
//           <thead>
//             <tr className="bg-blue-600 text-white">
//               <th className="p-3">#</th>
//               <th className="p-3">Client</th>
//               <th className="p-3">Phone</th>
//               <th className="p-3">Code</th>
//               <th className="p-3">Next Due</th>
//               <th className="p-3">Over Due</th>
//               <th className="p-3">Total Amount</th>
//               <th className="p-3">Remaining</th>
//               <th className="p-3">Paid</th>
//               <th className="p-3">Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSearch.length > 0 ? (
//               filteredSearch?.map((item, index) => (
//                 <tr key={item.id} className="text-center border-b">
//                   <td className="p-3">{index + 1}</td>
//                   <td className="p-3">{item?.client_name}</td>
//                   <td className="p-3">{item?.client_phone}</td>
//                   <td className="p-3">{item?.manuel_code}</td>
//                   <td className="p-3">{item?.next_due}</td>
//                   <td className="p-3">{item?.over_due}</td>
//                   <td className="p-3">{item?.total}</td>
//                   <td className="p-3">{item?.remaining}</td>
//                   <td className="p-3">{item?.paid}</td>
//                   <td className="p-3">{item?.type}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center p-3">
//                   No data found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       {/* Transaction Modal */}
//     </div>
//   );
// };

// export default PaymentRecivable;



import React, { useEffect, useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { FaEdit, FaFileExcel, FaSearch, FaFilter, FaMoneyBillWave, FaHotel, FaReceipt, FaShoppingCart, FaDollarSign, FaUserTie, FaBuilding } from "react-icons/fa";
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx";
import { useAuth } from '../../../../../Context/Auth';

const PaymentRecivable = ({ update, setUpdate }) => {
  const { refetch: refetchPaymentReceivable, loading: loadingPaymentReceivable, data: paymentReceivableData } = useGet({ url: 'https://travelta.online/agent/accounting/payment_receivable' });
  const [paymentReceivables, setPaymentReceivables] = useState([]);
  const [filteredPaymentReceivables, setFilteredPaymentReceivables] = useState([]); // Store filtered results
  const [selectedPaymentReceivable, setSelectedPaymentReceivable] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [startDate, setStartDate] = useState(""); // Start date filter
  const [endDate, setEndDate] = useState(""); // End date filter
  const auth = useAuth();

  // Pagination State
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch PaymentReceivable data on mount and update
  useEffect(() => {
    refetchPaymentReceivable();
  }, [refetchPaymentReceivable, update]);

  useEffect(() => {
    if (paymentReceivableData && paymentReceivableData.payments) {
      console.log("PaymentReceivable Data:", paymentReceivableData);
      setPaymentReceivables(paymentReceivableData.payments);
      setFilteredPaymentReceivables(paymentReceivableData.payments); // Default to full dataset
    }
  }, [paymentReceivableData]);

  // Filtering Logic: search, type, and date range
  useEffect(() => {
    let filtered = paymentReceivables;

    // Search filter (case-insensitive)
    if (searchText) {
      filtered = filtered.filter(paymentReceivable =>
        Object.values(paymentReceivable).some(
          value =>
            value &&
            value.toString().toLowerCase().includes(searchText)
        )
      );
    }
    // Type filter
    if (selectedType) {
      filtered = filtered.filter(paymentReceivable => paymentReceivable.type === selectedType);
    }
    // Date range filter
    if (startDate && endDate) {
      filtered = filtered.filter(paymentReceivable => {
        const paymentReceivableDate = new Date(paymentReceivable.created);
        return paymentReceivableDate >= new Date(startDate) && paymentReceivableDate <= new Date(endDate);
      });
    }
    setFilteredPaymentReceivables(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchText, selectedType, startDate, endDate, paymentReceivables]);

  // Handlers for filters
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterType = (e) => {
    setSelectedType(e.target.value);
  };

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  // Pagination Logic
  const totalPages = Math.ceil(filteredPaymentReceivables.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPaymentReceivables.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      paymentReceivables.map((paymentReceivable, index) => ({
        SL: index + 1,
        Code: paymentReceivable?.manuel_code || "-",
        Created_Date: paymentReceivable?.created || "-",
        Type: paymentReceivable?.type || "-",
        Client: paymentReceivable?.client_name || "-",
        Phone: paymentReceivable?.client_phone || "-",
        Due_Date: paymentReceivable?.due_date || "-",
        Next_Due: paymentReceivable?.next_due || 0,
        Over_Due: paymentReceivable?.over_due || 0,
        Total_Amount: paymentReceivable?.total || 0,
        Paid: paymentReceivable?.paid || 0,
        Remaining: paymentReceivable?.remaining || 0,
        Status: paymentReceivable?.status || "-",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PaymentReceivable");
    XLSX.writeFile(workbook, "PaymentReceivable.xlsx");
  };
  const uniqueType = [...new Set(paymentReceivables.map(PaymentReceivable => PaymentReceivable.type).filter(Boolean))];
  const headers = ["Code","Created Date","Type",'Client',"Phone","Due Date","Next Due","Over Due","Total Amount","Paid","Remaining","Status"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingPaymentReceivable ? (
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
                placeholder="Search by code ,name, phone ..."
                value={searchText}
                onChange={handleSearch}
                className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
              />
            </div>

            {/* Filter by type */}
            <div className="relative w-full md:w-[240px]">
              <select
                onChange={handleFilterType}
                value={selectedType}
                className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Filter by Type</option>
                {uniqueType.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
            </div>

            {/* Date Range Inputs */}
            <input
              type="date"
              className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-300"
              value={startDate}
              onChange={handleStartDateChange}
            />
            <input
              type="date"
              className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-300"
              value={endDate}
              onChange={handleEndDateChange}
            />

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

          {/* PaymentReceivable Table */}
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
                    <td colSpan="4" className="text-center text-xl text-gray-500 py-4">
                      No Payment Receivable Found
                    </td>
                  </tr>
                ) : (
                  currentRows.map((paymentReceivable, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                    >
                      <td className="text-center py-2">{indexOfFirstRow + index + 1}</td>
                      <td className="text-center py-2 text-gray-600">{paymentReceivable?.manuel_code || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{paymentReceivable?.created || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{paymentReceivable?.type || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{paymentReceivable?.client_name || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{paymentReceivable?.client_phone || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{paymentReceivable?.due_date || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{paymentReceivable?.next_due || 0}</td>
                      <td className="text-center py-2 text-gray-600">{paymentReceivable?.over_due || 0}</td>
                      <td className="text-center py-2 text-gray-600">{paymentReceivable?.total || 0} {paymentReceivable?.currency}</td>
                      <td className="text-center py-2 text-gray-600">{paymentReceivable?.paid || 0} {paymentReceivable?.currency}</td>
                      <td className="text-center py-2 text-gray-600">{paymentReceivable?.remaining || 0} {paymentReceivable?.currency}</td>
                      <td className="text-center py-2 text-gray-600">{paymentReceivable?.status || "-"}</td>
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

export default PaymentRecivable;

