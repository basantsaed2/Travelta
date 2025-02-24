import React, { useEffect, useState } from "react";
import { useGet } from "../../../../../Hooks/useGet";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import { usePost } from "../../../../../Hooks/usePostJson";
import StaticLoader from "../../../../../Components/StaticLoader";

const Transaction = () => {
  const {
    refetch: refetchListTransaction,
    loading: loadingTransaction,
    data: TransactionData,
  } = useGet({
    url: "https://travelta.online/agent/accounting/owner/transactions_list",
  });
const { postData: postDeposit ,loadingPost:loadingDeposit,response:reDeposit } = usePost({ url: `https://travelta.online/agent/accounting/owner/transaction` });
const {refetch: refetchOwner,loading: loadingOwner,data: OwnerData,} = useGet({ url: "https://travelta.online/agent/accounting/owner" });
const {refetch: refetchList,loading: loadingList,data: ListData,} = useGet({ url: "https://travelta.online/agent/accounting/owner/lists" });
const [listData,setListData]= useState([])

const [ownerData,setOwnerData]= useState([])
  const [listTransaction, setListTransactionData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 const [showTransactionModal, setShowTransactionModal] = useState(false);
   // State for Deposit/Withdraw Form
   const [ownerID, setOwnerID] = useState("");
   const [type, setType] = useState("");
   const [amount, setAmount] = useState("");
   const [currencyId, setCurrencyId] = useState("");
   const [financialAccountId, setFinancialAccountId] = useState("");
  useEffect(() => {
    refetchListTransaction();
    refetchOwner();
    refetchList();
  }, [refetchListTransaction,refetchOwner,refetchList]);

  useEffect(() => {
    if (TransactionData) {
      setListTransactionData(TransactionData.transactions);

    }
  }, [TransactionData]);

  useEffect(() => {
    if(OwnerData){
     setOwnerData(OwnerData);
    }
    console.log("owner",OwnerData)
   }, [OwnerData])

   useEffect(() => {
    if(ListData){
     setListData(ListData);
    }
    console.log("ListData",ListData)
   }, [ListData])

  // Filter transactions based on search query
  const filteredTransactions = listTransaction.filter((transaction) =>
    transaction.owner?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeposite = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("owner_id", ownerID);
    formData.append("financial_id", financialAccountId);
    formData.append("amount", amount);
    formData.append("type", type);  // Removed extra space in key
   
  
    postDeposit(formData, "Deposit/Withdraw Added Successfully").then(()=>refetchListTransaction());
  
    // Reset state after submission
    setOwnerID("");
    setFinancialAccountId("");
    setAmount("");
    setType("");
    setCurrencyId('')
    // setBalance("");
  
    // Close the modal
    setShowTransactionModal(false);
  };

  if(loadingTransaction){
    return <StaticLoader/>
  }
  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex justify-end items-center mb-4">
        
        <Button variant="contained" color="primary" onClick={() => setShowTransactionModal(true)}>
               +Deposit/Withdraw
        </Button>
      </div>

  
        {/* Search Input */}
        <TextField
          fullWidth
          label="Search owner..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
          margin="normal"
        />

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-md">
          <thead>
          <tr className="text-mainColor">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Owner</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Type</th>
              {/* <th className="p-2 border">Date/Time</th> */}
              <th className="p-2 border">Financial Account</th>
              <th className="p-2 border">Currency</th>
             
            </tr>
          </thead>
          <tbody>
            {loadingTransaction ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <tr key={transaction.id} className="border-b text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{transaction.owner?.name}</td>
                  <td className="p-2 border">${transaction.amount}</td>
                  <td className="p-2 border">{transaction.type}</td>
                  {/* <td className="p-2 border">{transaction.date}</td> */}
                  <td className="p-2 border">{transaction.financial.name}</td>
                  <td className="p-2 border">{transaction.currency.name}</td>
                
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
           {/* Deposit/Withdraw Modal */}
      <Dialog open={showTransactionModal} onClose={() => setShowTransactionModal(false)}>
        <DialogTitle>Deposit/Withdraw</DialogTitle>
        <DialogContent>
        <TextField
              select
              fullWidth
              label="Select Owner"
              value={ownerID}
              margin="normal"
              onChange={(e) => setOwnerID(e.target.value)}
            >
              {ownerData.owners?.map((owner) => (
                <MenuItem key={owner.id} value={owner.id}>
                  {owner.name}
                </MenuItem>
              ))}
            </TextField>
         <TextField
              select
              fullWidth
              label="Select Type"
              value={type}
              margin="normal"
              onChange={(e) => setType(e.target.value)}
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
              {listData.currencies?.map((cur) => (
                <MenuItem key={cur.id} value={cur.id}>
                  {cur.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Select Financial"
              value={financialAccountId}
              margin="normal"
              onChange={(e) => setFinancialAccountId(e.target.value)}
            >
              {listData.financials?.map((fin) => (
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
      </Dialog>
      </div>
    </div>
  );
};

export default Transaction;
