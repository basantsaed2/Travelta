import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useGet } from "../../../../../Hooks/useGet";
import { useAuth } from "../../../../../Context/Auth";
import StaticLoader from "../../../../../Components/StaticLoader";
import * as XLSX from "xlsx";

const PaidToSupplier = ({ update, setUpdate }) => {
  const auth = useAuth();

  // States
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [payableData, setPayableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // API Call
  const {
    refetch: refetchPayable,
    loading: loadingPayable,
    data: dataPayable,
  } = useGet({
    url: "https://travelta.online/agent/accounting/paid_to_suppliers",
  });

  // Fetch Data on Mount
  useEffect(() => {
    refetchPayable();
  }, [refetchPayable]);

  useEffect(() => {
    if (dataPayable) {
      setPayableData(dataPayable.agent_payment || []);
      setFilteredData(dataPayable.agent_payment || []);
    }
  }, [dataPayable]);

  // Unified Filtering
  useEffect(() => {
    let result = [...payableData];

    if (searchQuery) {
      result = result.filter((item) =>
        item.supplier?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (currencyId) {
      result = result.filter((item) => item.currency?.name === currencyId);
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [searchQuery, currencyId, payableData]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter by Date Range
  const handleFilterByDate = async () => {
    try {
      const response = await fetch(
        `https://travelta.online/agent/accounting/paid_to_suppliers_filter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user?.token || ""}`,
          },
          body: JSON.stringify({
            from: fromDate,
            to: toDate,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch filtered data");

      const result = await response.json();
      setPayableData(result.agent_payable || []);
    } catch (error) {
      console.error("Error fetching date filtered data:", error);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item, index) => ({
        SL: index + 1,
        "Supplier Name": item.supplier?.name || "-",
        "Supplier Agent": item.supplier?.agent || "-",
        Amount: item.amount,
        Currency: item.currency?.name || "-",
        "Due Date": item.date || "-",
        "Booking Code": item.code || "-",
        Financial: item.financial?.name || "-",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PaidToSupplier");
    XLSX.writeFile(workbook, "PaidToSupplier.xlsx");
  };

  // Currency Filter Options
  const uniqueCurrencies = [
    ...new Set(payableData.map((item) => item.currency?.name).filter(Boolean)),
  ];

  if (loadingPayable) return <StaticLoader />;

  return (
<div className="container max-w-7xl mx-auto p-5 flex flex-col gap-6">
<div className="flex flex-col lg:flex-row flex-wrap items-center gap-4 bg-white p-6 shadow-lg rounded-xl border border-gray-200 ">
        {/* Search Input */}
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg w-full lg:w-auto border border-gray-300">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by Supplier Name"
            value={searchQuery}
            onChange={handleSearch}
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
          />
        </div>
        {/* Currency Filter */}
        <div className="w-full sm:w-auto">
          <select
            value={currencyId}
            onChange={(e) => setCurrencyId(e.target.value)}
            className="border p-2 rounded-md w-full sm:w-[180px] text-sm"
          >
            <option value="">All Currencies</option>
            {uniqueCurrencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <label className="text-sm font-medium">From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 rounded-md text-sm"
          />
          <label className="text-sm font-medium">To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2 rounded-md text-sm"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
            onClick={handleFilterByDate}
          >
            Filter
          </button>
        </div>

        {/* Export Button */}
        <div>
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm"
          >
            Export Excel
          </button>
        </div>
      </div>

{/* Rows per Page */}
<div className="w-full  flex justify-between items-center">
  <div className="flex items-center space-x-2">
    <label className="text-gray-700 font-medium">Rows per page:</label>
    <div className="w-[120px]">
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
</div>



      {/* Table */}
      <table className="w-full min-w-[600px]">
        <thead className="bg-gray-200 text-gray-700">
          <tr className="border-t-2 border-b-2">
            <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
              #
            </th>
            <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
              Booking Code
            </th>
            <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
              Supplier Name
            </th>
            <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
              Supplier Agent
            </th>
            <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
              Financial
            </th>
            <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
              Amount
            </th>
            <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
              Due Date
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((item, index) => (
              <tr key={item.id} className="text-center border-b">
                <td className="p-3 text-gray-500">
                  {indexOfFirstRow + index + 1}
                </td>
                <td className="p-3 text-gray-500">{item.code || "-"}</td>
                <td className="p-3 text-gray-500">
                  {item.supplier?.name || "-"}
                </td>
                <td className="p-3 text-gray-500">
                  {item.supplier?.agent || "-"}
                </td>
                <td className="p-3 text-gray-500">
                  {item.financial?.name || "-"}
                </td>
                <td className="p-3 text-gray-500">{item.amount || "-"}</td>
                <td className="p-3 text-gray-500">{item.date || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
    </div>
  );
};

export default PaidToSupplier;
