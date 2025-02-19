import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useGet } from "../../../../../Hooks/useGet";
import { useAuth } from "../../../../../Context/Auth";
import StaticLoader from "../../../../../Components/StaticLoader";
import { Link } from "react-router-dom";
import { usePost } from "../../../../../Hooks/usePostJson";
import { TextField, MenuItem, Button } from "@mui/material";
const PayableToSupplier = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { refetch: refetchPayable, loading: loadingPayable, data: dataPayable } = useGet({
    url: "https://travelta.online/agent/accounting/payable_to_suppliers",
  });

    const { refetch: refetchList, loading: loadingList, data: DataList } = useGet({
      url: `https://travelta.online/agent/accounting/expenses/lists`,
    });
    
    const [list,setList] = useState([])

  const { postData: postTransaction ,loadingPost,response } = usePost({ url: `https://travelta.online/agent/accounting/transactions_payment` });
  const [amount,setAmount]= useState('')
  const [date,setDate]= useState('')
  const [supplierId,setSupplierId]= useState('')
  const [manualBookingId,setManualBookingId]= useState('')
  const [financialId,setFinancialId]= useState('')
  const [currencyId,setCurrencyId]= useState('')
  const [Payable, setPayable] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const auth = useAuth()
  useEffect(() => {
    refetchPayable();
    refetchList();
  }, [refetchPayable,refetchList]);

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
    console.log("data",DataList)
  }, [DataList]);

  const handleFilter = async () => {
    try {
      const response = await fetch(`https://travelta.online/agent/accounting/payable_to_suppliers_filter`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${auth.user?.token || ''}`,
        },
        body: JSON.stringify({
          payable_from: fromDate,
          payable_to: toDate,
          due_from: fromDate,
          due_to: toDate,
        }),
      });

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
const formData= new FormData();
formData.append("amount",amount),
formData.append("date",date)
formData.append("supplier_id",supplierId)
formData.append("manuel_booking_id",manualBookingId),
formData.append("financial_id",financialId)
formData.append("currency_id",currencyId)
postTransaction(formData,"Transaction added successfull");

    setShowModal(false);
    setFinancialId('')
    setAmount('')
    setDate('')
  };

  // const handleTransaction

  if(loadingPayable){
    return <StaticLoader/>
  }

  return (
    <div className="p-5 flex flex-col items-center gap-6">
      {/* Blue Card */}
      <div className="bg-blue-600 text-white text-4xl font-bold p-7 w-[50%] text-center rounded-lg shadow-lg">
        Payable To Supplier
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

      {/* Data Table */}
      <table className="w-full border-collapse border rounded-lg shadow-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3">#</th>
            <th className="p-3">Currency</th>
            <th className="p-3">Supplier Name</th>
            <th className="p-3">Supplier Agent</th>
            <th className="p-3">Paid</th>
            <th className="p-3">Payable Amount</th>
            <th className="p-3">Due Date</th>
            <th className="p-3">Manual Date</th>
            <th className="p-3">Transaction</th>
          </tr>
        </thead>
        <tbody>
          {filteredSearch.length > 0 ? (
            filteredSearch.map((item, index) => (
              <tr key={item.id} className="text-center border-b">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{item.currency.name}</td>
                <td className="p-3">{item.supplier.name}</td>
                <td className="p-3">{item.supplier.agent}</td>
                <td className="p-3">{item.paid}</td>
                <td className="p-3">{item.payable}</td>
                <td className="p-3">{item.due_date}</td>
                <td className="p-3">{item.manuel_date}</td>
                <td className="p-3">
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
            {/* Transaction Modal */}
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
    </div>
  );
};

export default PayableToSupplier;
