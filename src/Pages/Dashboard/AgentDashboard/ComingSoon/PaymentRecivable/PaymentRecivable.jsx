import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useGet } from "../../../../../Hooks/useGet";
import { useAuth } from "../../../../../Context/Auth";
import StaticLoader from "../../../../../Components/StaticLoader";
import { Link } from "react-router-dom";
import { usePost } from "../../../../../Hooks/usePostJson";
import { TextField, MenuItem, Button } from "@mui/material";
const PaymentRecivable = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const {
    refetch: refetchReceivable,
    loading: loadingReceivable,
    data: dataReceivable,
  } = useGet({
    url: "https://travelta.online/agent/accounting/payment_receivable",
  });

  const [list, setList] = useState([]);

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [manualBookingId, setManualBookingId] = useState("");
  const [financialId, setFinancialId] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [Receivable, setReceivable] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const displayedData = Array.isArray(filteredData?.payments)
    ? filteredData?.payments.slice(0, rowsPerPage)
    : [];
  const auth = useAuth();
  useEffect(() => {
    refetchReceivable();
  }, [refetchReceivable]);

  useEffect(() => {
    if (dataReceivable) {
      setReceivable(dataReceivable);
      setFilteredData(dataReceivable); // Set filtered data initially
    }
    console.log("dataa", dataReceivable);
  }, [dataReceivable]);
  const handleFilter = async () => {
    try {
      const response = await fetch(
        `https://travelta.online/agent/accounting/payment_receivable/filter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user?.token || ""}`, // Ensure token is passed
          },
          body: JSON.stringify({
            booking_from: fromDate,
            booking_to: toDate,
            due_from: fromDate,
            due_to: toDate,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch filtered data");

      const filteredResult = await response.json();
      setFilteredData(filteredResult.agent_payable || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  const filteredSearch = displayedData.filter((item) =>
    item.client_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleTransaction

  if (loadingReceivable) {
    return <StaticLoader />;
  }

  return (
    <div className="p-5 flex flex-col items-center gap-6">
      {/* Blue Card */}
      <div className="bg-mainColor text-white text-4xl font-bold p-7 w-[50%] text-center rounded-lg shadow-lg">
        Payment Receivable
      </div>
      {/* Grid Container */}
      <div className="w-full  p-6 rounded-lg  mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First Row (3 Cards) */}
          <div className="bg-white p-5 rounded-lg shadow-md text-start">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Balance
            </h2>
            <p className="text-lg text-gray-500 mt-2">
              ${Receivable?.total_balance}
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-start">
            <h2 className="text-xl font-semibold text-gray-700">Paid Amount</h2>
            <p className="text-lg text-gray-500 mt-2">
              ${Receivable?.total_paid}
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-start">
            <h2 className="text-xl font-semibold text-gray-700">
              Overdue Amount
            </h2>
            <p className="text-lg text-gray-500 mt-2">
              ${Receivable?.total_over_due}
            </p>
          </div>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <label className="text-lg font-medium">From:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded-lg shadow-sm"
        />
        <label className="text-lg font-medium">To:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded-lg shadow-sm"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>

      {/* Search Input */}
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border w-full p-2 pl-10 rounded-md"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <div className="w-full">
        {/* Rows per page selector */}
        <div className="flex justify-end mb-4">
          <label className="mr-2 text-gray-700 font-medium">Show:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border p-2 rounded shadow-md"
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        {/* Data Table */}
        <table className="w-full border-collapse border rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">#</th>
              <th className="p-3">Client</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Code</th>
              <th className="p-3">Next Due</th>
              <th className="p-3">Over Due</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3">Remaining</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredSearch.length > 0 ? (
              filteredSearch?.map((item, index) => (
                <tr key={item.id} className="text-center border-b">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{item?.client_name}</td>
                  <td className="p-3">{item?.client_phone}</td>
                  <td className="p-3">{item?.manuel_code}</td>
                  <td className="p-3">{item?.next_due}</td>
                  <td className="p-3">{item?.over_due}</td>
                  <td className="p-3">{item?.total}</td>
                  <td className="p-3">{item?.remaining}</td>
                  <td className="p-3">{item?.paid}</td>
                  <td className="p-3">{item?.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-3">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Transaction Modal */}
    </div>
  );
};

export default PaymentRecivable;
