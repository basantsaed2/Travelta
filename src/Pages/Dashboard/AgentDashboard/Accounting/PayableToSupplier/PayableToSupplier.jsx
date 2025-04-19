import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaFileExcel,
  
  FaSearch,
  FaFilter,
  FaCopy,
} from "react-icons/fa";
import { useGet } from "../../../../../Hooks/useGet";
import { useAuth } from "../../../../../Context/Auth";
import StaticLoader from "../../../../../Components/StaticLoader";
import { Link } from "react-router-dom";
import { usePost } from "../../../../../Hooks/usePostJson";
import { TextField, MenuItem, Button } from "@mui/material";

const PayableToSupplier = ({ update, setUpdate }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const {
    refetch: refetchPayable,
    loading: loadingPayable,
    data: dataPayable,
  } = useGet({
    url: "https://travelta.online/agent/accounting/payable_to_suppliers",
  });
  const {
    refetch: refetchList,
    loading: loadingList,
    data: DataList,
  } = useGet({
    url: "https://travelta.online/agent/accounting/expenses/lists",
  });
  const {
    postData: postTransaction,
    loadingPost,
    response,
  } = usePost({
    url: `https://travelta.online/agent/accounting/transactions_payment`,
  });
  const {
    postData: postDate,
    loadingPost: loadingDate,
    response: responseDate,
  } = usePost({
    url: `https://travelta.online/agent/accounting/payable_to_suppliers_filter`,
  });

  const [list, setList] = useState([]);
  const [filterType, setFilterType] = useState("payable");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [manualBookingId, setManualBookingId] = useState("");
  const [financialId, setFinancialId] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [Payable, setPayable] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const auth = useAuth();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Owner data on mount and update
  useEffect(() => {
    refetchPayable();
    refetchList();
  }, [refetchPayable, refetchList]);

  useEffect(() => {
    if (dataPayable) {
      setPayable(dataPayable.agent_payable);
      setFilteredData(dataPayable.agent_payable); // Set filtered data initially
    }
  }, [dataPayable]);

  useEffect(() => {
    if (DataList) {
      setList(DataList);
    }
    console.log("data Payable To Supplier", DataList);
  }, [DataList]);
  // Filtering Logic: search, type, and date range
  useEffect(() => {
    let filtered = Payable;
    // Search filter (case-insensitive)
    if (searchQuery) {
      filtered = filtered.filter((Payable) =>
        Payable?.supplier?.name?.toLowerCase().includes(searchQuery)
      );
    }
    // Type filter
    if (currencyId) {
      filtered = filtered.filter(
        (Payable) => Payable.currency?.name === currencyId
      );
    }
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchQuery, currencyId, Payable]);

  useEffect(() => {
    if (!loadingDate) {
      if (responseDate) {
        console.log(responseDate.data);

        setFilteredData(responseDate.data.agent_payable);
        
      }
      setUpdate(!update);
    }
  }, [loadingDate, responseDate]);

const handleFilter = (e) => {
  e.preventDefault();
  const formData = new FormData();

  if (filterType === "payable") {
    formData.append("payable_from", fromDate);
    formData.append("payable_to", toDate);
  } else {
    formData.append("due_from", fromDate);
    formData.append("due_to", toDate);
  }

  postDate(formData);
};


  // Handlers for filters
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterType = (e) => {
    setCurrencyId(e.target.value);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const uniqueType = [
    ...new Set(Payable.map((owner) => owner.currency?.name).filter(Boolean)),
  ];

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      Payable.map((owner, index) => ({
        SL: index + 1,
        Name: owner?.name || "-",
        Phone: owner?.phone || "-",
        Balance: `${owner?.balance || 0} ${owner?.currency?.name || ""}`,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payable");
    XLSX.writeFile(workbook, "Payable.xlsx");
  };
  const handleTransactionClick = (item) => {
    // setAmount(item.payable);
    // setDate(item.due_date);
    setSupplierId(item.supplier_id);
    setManualBookingId(item.manuel_booking_id);
    setCurrencyId(item.currency_id);
    setShowModal(true);
  };

  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("amount", amount), formData.append("date", date);
    formData.append("supplier_id", supplierId);
    formData.append("manuel_booking_id", manualBookingId),
      formData.append("financial_id", financialId);
    formData.append("currency_id", currencyId);
    postTransaction(formData, "Transaction added successfull");

    setShowModal(false);
    setFinancialId("");
    setAmount("");
    setDate("");
  };

  // const handleTransaction

  if (loadingPayable) {
    return <StaticLoader />;
  }

  const headers = [
    "#",
    "Currency",
    "Supplier Name",
    "Supplier Agent",
    "Paid",
    "Payable Amount",
    "Due Date",
    "Manual Date",
    "Transaction",
  ];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingDate || loadingList || loadingPost || loadingPayable ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="w-full sm:min-w-0">
          {/* Search & Filter Section */}
          <div className="flex mb-6 flex-wrap lg:flex-nowrap items-center gap-4 bg-white p-4 shadow-lg rounded-xl border border-gray-200">
            {/* Search Input */}
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg w-full md:w-[280px] border border-gray-300">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by supplierName"
                value={searchQuery}
                onChange={handleSearch}
                className="bg-transparent outline-none w-full  text-gray-700 placeholder-gray-500"
              />
            </div>

            {/* Filter by type
            <div className="relative w-full md:w-[200px] ">
              <select
                onChange={handleFilterType}
                value={currencyId}
                className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Filter by currency</option>
                {uniqueType.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
            </div> */}

            {/* From and To Date */}

            <div className="relative w-full md:w-[200px]">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer"
              >
                <option value="payable">Payable Date</option>
                <option value="due">Due Date</option>
              </select>
              <FaFilter className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <label className="text-base font-medium">From:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border p-2 rounded-lg shadow-sm"
              />
              <label className="text-base font-medium">To:</label>
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
          {/*table*/}
          <div className="w-full sm:min-w-0 block overflow-x-scroll scrollSection border-collapse">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-200 text-gray-700">
                <tr className="border-t-2 border-b-2">
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
                    #
                  </th>
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
                    Currency
                  </th>
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
                    Supplier Name
                  </th>
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
                    Supplier Agent
                  </th>
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
                    Paid
                  </th>
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
                    Amount
                  </th>
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
                    Due Date
                  </th>
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
                    Manual Date
                  </th>
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md p-2 border-b-2">
                    Transaction
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((item, index) => (
<tr
  key={item.id}
  className={`text-center border-b ${
    (indexOfFirstRow + index) % 2 === 0
      ? "bg-gray-100 hover:bg-gray-300"
      : "bg-gray-200 hover:bg-gray-300"
  }`}
>                      <td className="p-3 text-gray-500">{index + 1}</td>
                      <td className="p-3 text-gray-500">
                        {item.currency.name}
                      </td>
                      <td className="p-3 text-gray-500">
                        {item.supplier.name}
                      </td>
                      <td className="p-3 text-gray-500">
                        {item.supplier.agent}
                      </td>
                      <td className="p-3 text-gray-500">{item.paid}</td>
                      <td className="p-3 text-gray-500">{item.payable}</td>
                      <td className="p-3 text-gray-500">{item.due_date}</td>
                      <td className="p-3 text-gray-500">{item.manuel_date}</td>
                      <td className="p-3 text-gray-500">
                        <Link
                          onClick={() => handleTransactionClick(item)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                        >
                          Transaction
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center p-3">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Add Transaction</h2>

                <TextField
                  label="Amount"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />

                <TextField
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  label="Financial"
                  select
                  value={financialId}
                  onChange={(e) => setFinancialId(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                >
                  {list.finantiols?.map((fin) => (
                    <MenuItem key={fin.id} value={fin.id}>
                      {fin.name}
                    </MenuItem>
                  ))}
                </TextField>

                <div className="flex justify-between gap-2 mt-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                    onClick={handleSubmitTransaction}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

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
      )}
    </div>
  );
};

export default PayableToSupplier;
