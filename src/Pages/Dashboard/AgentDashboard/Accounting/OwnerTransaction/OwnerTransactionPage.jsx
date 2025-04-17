// import React, { useEffect, useState } from "react";
// import { useGet } from "../../../../../Hooks/useGet";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
// import { usePost } from "../../../../../Hooks/usePostJson";
// import StaticLoader from "../../../../../Components/StaticLoader";

// const OwnerTransactionPage = () => {
//   const {
//     refetch: refetchListTransaction,
//     loading: loadingTransaction,
//     data: TransactionData,
//   } = useGet({
//     url: "https://travelta.online/agent/accounting/owner/transactions_list",
//   });
// const { postData: postDeposit ,loadingPost:loadingDeposit,response:reDeposit } = usePost({ url: `https://travelta.online/agent/accounting/owner/transaction` });
// const {refetch: refetchOwner,loading: loadingOwner,data: OwnerData,} = useGet({ url: "https://travelta.online/agent/accounting/owner" });
// const {refetch: refetchList,loading: loadingList,data: ListData,} = useGet({ url: "https://travelta.online/agent/accounting/owner/lists" });
// const [listData,setListData]= useState([])

// const [ownerData,setOwnerData]= useState([])
//   const [listTransaction, setListTransactionData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//  const [showTransactionModal, setShowTransactionModal] = useState(false);
//    // State for Deposit/Withdraw Form
//    const [ownerID, setOwnerID] = useState("");
//    const [type, setType] = useState("");
//    const [amount, setAmount] = useState("");
//    const [currencyId, setCurrencyId] = useState("");
//    const [financialAccountId, setFinancialAccountId] = useState("");
//   useEffect(() => {
//     refetchListTransaction();
//     refetchOwner();
//     refetchList();
//   }, [refetchListTransaction,refetchOwner,refetchList]);

//   useEffect(() => {
//     if (TransactionData) {
//       setListTransactionData(TransactionData.transactions);

//     }
//   }, [TransactionData]);

//   useEffect(() => {
//     if(OwnerData){
//      setOwnerData(OwnerData);
//     }
//     console.log("owner",OwnerData)
//    }, [OwnerData])

//    useEffect(() => {
//     if(ListData){
//      setListData(ListData);
//     }
//     console.log("ListData",ListData)
//    }, [ListData])

//   // Filter transactions based on search query
//   const filteredTransactions = listTransaction.filter((transaction) =>
//     transaction.owner?.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleDeposite = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("owner_id", ownerID);
//     formData.append("financial_id", financialAccountId);
//     formData.append("amount", amount);
//     formData.append("type", type);  // Removed extra space in key
   
  
//     postDeposit(formData, "Deposit/Withdraw Added Successfully").then(()=>refetchListTransaction());
  
//     // Reset state after submission
//     setOwnerID("");
//     setFinancialAccountId("");
//     setAmount("");
//     setType("");
//     setCurrencyId('')
//     // setBalance("");
  
//     // Close the modal
//     setShowTransactionModal(false);
//   };

//   if(loadingTransaction){
//     return <StaticLoader/>
//   }
//   return (
//     <div className="p-4">
//       {/* Header Section */}
//       <div className="flex justify-end items-center mb-4">
        
//         <Button variant="contained" color="primary" onClick={() => setShowTransactionModal(true)}>
//                +Deposit/Withdraw
//         </Button>
//       </div>

  
//         {/* Search Input */}
//         <TextField
//           fullWidth
//           label="Search owner..."
//           variant="outlined"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="mb-4"
//           margin="normal"
//         />

//       {/* Transactions Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 shadow-md rounded-md">
//           <thead>
//           <tr className="text-mainColor">
//               <th className="p-2 border">#</th>
//               <th className="p-2 border">Owner</th>
//               <th className="p-2 border">Amount</th>
//               <th className="p-2 border">Type</th>
//               {/* <th className="p-2 border">Date/Time</th> */}
//               <th className="p-2 border">Financial Account</th>
//               <th className="p-2 border">Currency</th>
             
//             </tr>
//           </thead>
//           <tbody>
//             {loadingTransaction ? (
//               <tr>
//                 <td colSpan="7" className="text-center p-4">
//                   Loading...
//                 </td>
//               </tr>
//             ) : filteredTransactions.length > 0 ? (
//               filteredTransactions.map((transaction, index) => (
//                 <tr key={transaction.id} className="border-b text-center">
//                   <td className="p-2 border">{index + 1}</td>
//                   <td className="p-2 border">{transaction.owner?.name}</td>
//                   <td className="p-2 border">${transaction.amount}</td>
//                   <td className="p-2 border">{transaction.type}</td>
//                   {/* <td className="p-2 border">{transaction.date}</td> */}
//                   {/* <td className="p-2 border">{transaction.financial.name}</td> */}
//                   {/* <td className="p-2 border">{transaction.currency.name}</td> */}
                
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center p-4">
//                   No transactions found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//            {/* Deposit/Withdraw Modal */}
//       <Dialog open={showTransactionModal} onClose={() => setShowTransactionModal(false)}>
//         <DialogTitle>Deposit/Withdraw</DialogTitle>
//         <DialogContent>
//         <TextField
//               select
//               fullWidth
//               label="Select Owner"
//               value={ownerID}
//               margin="normal"
//               onChange={(e) => setOwnerID(e.target.value)}
//             >
//               {ownerData.owners?.map((owner) => (
//                 <MenuItem key={owner.id} value={owner.id}>
//                   {owner.name}
//                 </MenuItem>
//               ))}
//             </TextField>
//          <TextField
//               select
//               fullWidth
//               label="Select Type"
//               value={type}
//               margin="normal"
//               onChange={(e) => setType(e.target.value)}
//             >
              
//               <MenuItem value="withdraw">Withdraw</MenuItem>
//               <MenuItem value="depost">Deposit</MenuItem>
            
//             </TextField>
//           <TextField fullWidth label="Amount" variant="outlined" className="mb-2" margin="dense"
//            value={amount} onChange={(e) => setAmount(e.target.value)} 
//           />
//           <TextField
//               select
//               fullWidth
//               label="Select currency"
//               value={currencyId}
//               margin="normal"
//               onChange={(e) => setCurrencyId(e.target.value)}
//             >
//               {listData.currencies?.map((cur) => (
//                 <MenuItem key={cur.id} value={cur.id}>
//                   {cur.name}
//                 </MenuItem>
//               ))}
//             </TextField>
//             <TextField
//               select
//               fullWidth
//               label="Select Financial"
//               value={financialAccountId}
//               margin="normal"
//               onChange={(e) => setFinancialAccountId(e.target.value)}
//             >
//               {listData.financials?.map((fin) => (
//                 <MenuItem key={fin.id} value={fin.id}>
//                   {fin.name}
//                 </MenuItem>
//               ))}
//             </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setShowTransactionModal(false)} color="">
//             Cancel
//           </Button>
//           <Button color="primary" variant="contained" onClick={handleDeposite}>
//             {loadingDeposit?"Submit...":"Submit"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//       </div>
//     </div>
//   );
// };

// export default OwnerTransactionPage;


import React, { useEffect, useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import {FaFileExcel, FaSearch, FaFilter } from "react-icons/fa";
import * as XLSX from "xlsx";
import { useAuth } from '../../../../../Context/Auth';
import { TextField, Button,  Dialog as MuiDialog , DialogActions, DialogContent, DialogTitle, MenuItem } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';

const OwnerTransactionPage = ({ update, setUpdate }) => {
  const { refetch: refetchTransaction, loading: loadingTransaction, data: transactionData } = useGet({ url: 'https://travelta.online/agent/accounting/owner/transactions_list' });
  const { refetch: refetchList,loading: loadingList,data: ListData,} = useGet({ url: "https://travelta.online/agent/accounting/owner/lists" });
  const { postData: postDeposit ,loadingPost:loadingDeposit,response:reDeposit } = usePost({ url: `https://travelta.online/agent/accounting/owner/transaction` });

  const [transactions, setTransactions] = useState([]);
  const [currencies,setCurrencies]= useState([])
  const [owners,setOwners]= useState([])
  const [financials,setFinancials]= useState([])

  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransactionType , setSelectedTransactionType]= useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedFinacial, setSelectedFinacial] = useState("");
  const auth = useAuth();

  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState('');
  const [selectedType, setSelectedType] = useState("");
  const [amount, setAmount] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [financialAccountId, setFinancialAccountId] = useState("");
  
  // Pagination State
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Transaction data on mount and update
  useEffect(() => {
    refetchTransaction();refetchList();
  }, [refetchTransaction,refetchList, update]);

  useEffect(() => {
    if (transactionData && transactionData.transactions) {
      console.log("Transaction Data:", transactionData);
      setTransactions(transactionData.transactions);
      setFilteredTransactions(transactionData.transactions); // Default to full dataset
    }
  }, [transactionData]);

  useEffect(() => {
    if (ListData && ListData.currencies) {
      console.log("List Data:", ListData);
      setCurrencies(ListData.currencies);
      setFinancials(ListData.financials);
      setOwners(ListData.owners);
    }
  }, [ListData]);

  // Filtering Logic: search, type, and date range
  useEffect(() => {
    let filtered = transactions;
    // Search filter (case-insensitive)
    if (searchText) {
      filtered = filtered.filter(transaction =>
        transaction?.name?.toLowerCase().includes(searchText) ||
        transaction?.financial?.name?.toLowerCase().includes(searchText) 
      );
    }
    // Currency filter
    if (selectedCurrency) {
      filtered = filtered.filter(transaction => transaction.currency?.name === selectedCurrency);
    }
    // Currency filter
    if (selectedTransactionType) {
      filtered = filtered.filter(transaction => transaction.type === selectedTransactionType);
    }
    // Date range filter
    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchText, selectedCurrency,transactions,update,reDeposit]);

  useEffect(() => {
    if (!loadingDeposit) {
        if (reDeposit) {
        setShowTransactionModal(false);
        // Reset state after submission
        setSelectedOwner("");
        setFinancialAccountId("");
        setAmount("");
        setSelectedType("");
        setCurrencyId('') 
        }
        setUpdate(!update)
    }
  }, [loadingDeposit, reDeposit]);

  const handleDeposite = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("owner_id", selectedOwner);
    formData.append("financial_id", financialAccountId);
    formData.append("amount", amount);
    formData.append("type", selectedType);

    postDeposit(formData, "Deposit/Withdraw Added Successfully");
  };

  // Handlers for filters
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterType = (e) => {
    setSelectedCurrency(e.target.value);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredTransactions.slice(indexOfFirstRow, indexOfLastRow);

  const uniqueType = [...new Set(transactions.map(transaction => transaction.currency?.name).filter(Boolean))];

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
      transactions.map((transaction, index) => ({
        SL: index + 1,
        Owner_Name: transaction?.owner?.name || "-",
        Type: transaction?.type || "-",
        Balance: `${transaction?.amount || 0} ${transaction?.currency?.name || ""}`,
        Financial_Account: transaction?.financial?.name || "-",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "Transactions.xlsx");
  };
  const headers = ["Owner Name","Type","Amount","Financial Account"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingTransaction || loadingList ? (
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
                placeholder="Search by name or phone ..."
                value={searchText}
                onChange={handleSearch}
                className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
              />
            </div>

            {/* Filter by type */}
            <div className="relative w-full md:w-[240px]">
              <select
                onChange={handleFilterType}
                value={selectedCurrency}
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
            </div>

            {/* Export to Excel Button */}
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
            >
              <FaFileExcel className="w-5 h-5" />
              Export to Excel
            </button>

            <div className="flex justify-between ">
              <Button variant="contained" color="primary" onClick={() => setShowTransactionModal(true)}>
                + Deposit / Withdraw
              </Button>
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

          {/* Transaction Table */}
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
                      No Transactions Found
                    </td>
                  </tr>
                ) : (
                  currentRows.map((transaction, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                    >
                      <td className="text-center py-2">{indexOfFirstRow + index + 1}</td>
                      <td className="text-center py-2 text-gray-600">{transaction?.owner?.name  || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{transaction?.type  || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{transaction?.amount || 0} {transaction?.currency?.name}</td>
                      <td className="text-center py-2 text-gray-600">{transaction?.financial?.name  || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

              {/* Deposit/Withdraw Modal */}
          <MuiDialog open={showTransactionModal} onClose={() => setShowTransactionModal(false)}>
            <DialogTitle>Deposit/Withdraw</DialogTitle>
            <DialogContent>
            {/* <TextField
                  select
                  fullWidth
                  label="Select Owner"
                  margin="normal"
                  value={selectedOwner}
                  onChange={(e) => setSelectedOwner(e.target.value)}
                >
                  {owners.map((owner) => (
                    <MenuItem key={owner.id} value={owner.id}>
                      {owner.name}
                    </MenuItem>
                  ))}
            </TextField> */}
            <TextField
                  select
                  fullWidth
                  label="Select Type"
                  value={selectedType}
                  margin="normal"
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <MenuItem value="withdraw">Withdraw</MenuItem>
                  <MenuItem value="depost">Deposit</MenuItem>
            </TextField>
              <TextField fullWidth label="Amount" variant="outlined" className="mb-2" margin="dense"
              value={amount} onChange={(e) => setAmount(e.target.value)} 
              />
              <TextField
                  select
                  fullWidth
                  label="Select currency"
                  value={currencyId}
                  margin="normal"
                  onChange={(e) => setCurrencyId(e.target.value)}
                >
                  {currencies.map((cur) => (
                    <MenuItem key={cur.id} value={cur.id}>
                      {cur.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Select Financial Account"
                  value={selectedFinacial}
                  margin="normal"
                  onChange={(e) => setSelectedFinacial(e.target.value)}
                >
                  {financials.map((fin) => (
                    <MenuItem key={fin.id} value={fin.id}>
                      {fin.name}
                    </MenuItem>
                  ))}
                </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowTransactionModal(false)} color="">
                Cancel
              </Button>
              <Button color="primary" variant="contained" onClick={handleDeposite}>
                {loadingDeposit?"Submit...":"Submit"}
              </Button>
            </DialogActions>
          </MuiDialog>
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

export default OwnerTransactionPage;



