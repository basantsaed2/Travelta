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
import { usePost } from "../../../../../Hooks/usePostJson";
import { Link } from "react-router-dom";
import { TextField, MenuItem, Button } from "@mui/material";
const OverduePayable = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const auth = useAuth();

  const {
    refetch: refetchOverDue,
    loading: loadingOverDue,
    data: dataOverDue,
  } = useGet({
    url: "https://travelta.online/agent/accounting/due_to_suppliers",
  });
  const {
    refetch: refetchList,
    loading: loadingList,
    data: DataList,
  } = useGet({
    url: `https://travelta.online/agent/accounting/expenses/lists`,
  });

  const [list, setList] = useState([]);

  const {
    postData: postTransaction,
    loadingPost,
    response,
  } = usePost({
    url: `https://travelta.online/agent/accounting/transactions_payment`,
  });
  const [OverDue, setOverDue] = useState([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [manualBookingId, setManualBookingId] = useState("");
  const [financialId, setFinancialId] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    refetchOverDue();
    refetchList();
  }, [refetchOverDue, refetchList]);

  useEffect(() => {
    if (dataOverDue) {
      setOverDue(dataOverDue.agent_payable);
      setFilteredData(dataOverDue.agent_payable);
    }
    console.log("data", dataOverDue);
  }, [dataOverDue]);

  useEffect(() => {
    if (DataList) {
      setList(DataList);
    }
    console.log("data", DataList);
  }, [DataList]);

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
  const handleFilter = async () => {
    try {
      const response = await fetch(
        `https://travelta.online/agent/accounting/due_to_suppliers_filter`,
        {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user?.token || ""}`,
          },
          body: JSON.stringify({
            payable_from: fromDate,
            payable_to: toDate,
            due_from: fromDate,
            due_to: toDate,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch filtered data");

      const filteredResult = await response.json();
      setFilteredData(filteredResult.agent_payable);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  const filteredSearch = filteredData.filter((item) =>
    item.supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  if (loadingOverDue) {
    return <StaticLoader />;
  }

  return (
    <div className="w-full pb-5 flex flex-col gap-6">
      {loadingList || loadingPost ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="w-full sm:min-w-0">
          {/* Search & Filter Section */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[900px] flex items-center gap-4 bg-white p-4 shadow-lg rounded-xl border border-gray-200">
              {/* Search Input */}
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg w-[250px] border border-gray-300">
                <FaSearch className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by supplier..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Rows per Page */}
              <div className="flex items-center gap-2">
                <label className="text-gray-700 font-medium whitespace-nowrap">
                  Rows per page:
                </label>
                <select
                  onChange={handleRowsChange}
                  value={rowsPerPage}
                  className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer w-[100px]"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </select>
              </div>

              {/* From and To Date */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium whitespace-nowrap">
                  From:
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="border p-2 rounded-lg shadow-sm w-[150px]"
                />
                <label className="text-sm font-medium whitespace-nowrap">
                  To:
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="border p-2 rounded-lg shadow-sm w-[150px]"
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                  onClick={handleFilter}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="w-full mt-6 sm:min-w-0 block overflow-x-scroll scrollSection border-collapse">
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
                {filteredSearch.length > 0 ? (
                  filteredSearch.map((item, index) => (
<tr
  key={item.id}
  className={`text-center border-b ${
    (indexOfFirstRow + index) % 2 === 0
      ? "bg-gray-100 hover:bg-gray-300"
      : "bg-gray-200 hover:bg-gray-300"
  }`}
>                        <td className="p-3 text-gray-500">{index + 1}</td>
                      <td className="p-3 text-gray-500">{item.currency?.name}</td>
                      <td className="p-3 text-gray-500">{item.supplier?.name}</td>
                      <td className="p-3 text-gray-500">{item.supplier?.agent}</td>
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
                    <td colSpan="9" className="text-center p-3">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Transaction Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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

export default OverduePayable;
