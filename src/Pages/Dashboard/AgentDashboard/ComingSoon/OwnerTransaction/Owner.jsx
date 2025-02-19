import React, { useEffect, useState } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from "@mui/material";
import { useGet } from "../../../../../Hooks/useGet";
import { usePost } from "../../../../../Hooks/usePostJson";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDelete } from "../../../../../Hooks/useDelete";
import { useAuth } from "../../../../../Context/Auth";
import StaticLoader from "../../../../../Components/StaticLoader";

const Owner = () => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [search, setSearch] = useState("");
  const {refetch: refetchOwner,loading: loadingOwner,data: OwnerData,} = useGet({ url: "https://travelta.online/agent/accounting/owner" });
  const {refetch: refetchList,loading: loadingList,data: ListData,} = useGet({ url: "https://travelta.online/agent/accounting/owner/lists" });
  const {refetch: refetchListTransaction,loading: loadingTransaction,data: TransactionData,} = useGet({ url: "https://travelta.online/agent/accounting/owner/transactions_list" });
  const { postData: postAddNewOwner ,loadingPost:loadingOwnerAdd,response:reOwner } = usePost({ url: `https://travelta.online/agent/accounting/owner/add` });
  const { postData: postDeposit ,loadingPost:loadingDeposit,response:reDeposit } = usePost({ url: `https://travelta.online/agent/accounting/owner/transaction` });
  const [ownerData,setOwnerData]= useState([])
  const [listData,setListData]= useState([])
  const [listTransaction,setListTransactionData]= useState([])
 const auth = useAuth()
  // State for Add Owner Form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [balance, setBalance] = useState("");
  const [currencyIdAdd, setCurrencyIdAdd] = useState("");

  // state for update add
  const [newName, setNewName] = useState("");
const [newPhone, setNewPhone] = useState("");
const [newBalance, setNewBalance] = useState("");
const [newCurrencyId, setNewCurrencyId] = useState("");
const [selectedOwner, setSelectedOwner] = useState(null); 
const [showUpdateModal, setShowUpdateModal] = useState(false);
const [loadingUpdate,setLoadingUpdate]= useState(false); 


  // State for Deposit/Withdraw Form
  const [ownerID, setOwnerID] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [financialAccountId, setFinancialAccountId] = useState("");
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  
  useEffect(() => {
    refetchOwner();
    refetchList();
    refetchListTransaction();
  }, [refetchList,refetchOwner,refetchListTransaction])

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


   useEffect(() => {
    if(TransactionData){
     setListTransactionData(TransactionData);
    }
    console.log("TransactionData",TransactionData)
   }, [TransactionData])

   const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("currency_id", currencyIdAdd);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("balance", balance);
  
    postAddNewOwner(formData, "Owner Added Successfully").then(()=>refetchOwner());
    
    // Reset state after submission
    setCurrencyIdAdd("");
    setName("");
    setPhone("");
    setBalance("");
  
    // Close the modal
    setShowOwnerModal(false);
  };
  
  const handleDeposite = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("owner_id", ownerID);
    formData.append("financial_id", financialAccountId);
    formData.append("amount", amount);
    formData.append("type", type);  // Removed extra space in key
  
  
    postDeposit(formData, "Deposit/Withdraw Added Successfully");
  
    // Reset state after submission
    setOwnerID("");
    setFinancialAccountId("");
    setAmount("");
    setType("");
    // setBalance("");
    setCurrencyId('')
  
    // Close the modal
    setShowTransactionModal(false);
  };
      // Delete owners
      const handleDelete = async (id, name) => {
        const success = await deleteData(`https://travelta.online/agent/accounting/owner/delete/${id}`, `${name} Deleted Success.`);
    
        if (success) {
          // Update Deliveries only if changeState succeeded
          setOwnerData(
            ownerData.filter((owner) =>
              owner.id !== id
            )
          );
          refetchOwner();
        }
        console.log('data Suppliers', ownerData)
      };

      const handleUpdate = (owner) => {
        setSelectedOwner(owner);
        setNewName(owner.name);
        setNewPhone(owner.phone);
        setNewBalance(owner.balance);
        setNewCurrencyId(owner.currency_id);
        setShowUpdateModal(true);
      };

      const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoadingUpdate(true);
      
        try {
          const updatedData = {
            currency_id: newCurrencyId,
            name: newName,
            phone: newPhone,
            balance: newBalance,
          };
      
          const response = await fetch(`https://travelta.online/agent/accounting/owner/update/${selectedOwner.id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth.user?.token || ''}`,
            },
            body: JSON.stringify(updatedData), // Send JSON data correctly
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update owner");
          }
          refetchOwner()
      
          auth.toastSuccess("Owner Updated Successfully");
      
          // Reset form fields & close modal
          setNewName("");
          setNewPhone("");
          setNewBalance("");
          setNewCurrencyId("");
          setShowUpdateModal(false);
        } catch (error) {
          console.error("Error updating owner:", error);
          auth.toastError(error.message || "Update failed. Please try again.");
        } finally {
          setLoadingUpdate(false);
        }
      };

        // Filter transactions based on search query
  const filteredTransactions = ownerData?.owners?.filter((owner) =>
    owner?.name.toLowerCase().includes(search.toLowerCase())
  );
      
      
if(loadingOwner){
  return <StaticLoader/>
}

  
  return (
    <div className="p-6">
      {/* Buttons */}
      <div className="flex justify-between mb-4">
        <Button variant="contained" color="primary" onClick={() => setShowTransactionModal(true)}>
          +Deposit/Withdraw
        </Button>
        <Button variant="contained" color="primary" onClick={() => setShowOwnerModal(true)}>
          +Add New Owner
        </Button>
      </div>

      {/* Search Input */}
      <TextField
        fullWidth
        label="Search owner..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
        margin="normal"
      />

      {/* Owner Table */}
      <table className="w-full border-collapse border border-gray-300">
  <thead>
    <tr className="text-mainColor">
      <th className="border p-2">#</th>
      <th className="border p-2">Name</th>
      <th className="border p-2">Phone</th>
      <th className="border p-2">Balance</th>
      <th className="border p-2">Currency</th>
      <th className="border p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredTransactions? (
      filteredTransactions.map((owner, index) => (
        <tr key={owner.id} className="text-center">
          <td className="border p-2">{index + 1}</td>
          <td className="border p-2">{owner.name}</td>
          <td className="border p-2">{owner.phone}</td>
          <td className="border p-2">{owner.balance}</td>
          <td className="border p-2">{owner.currency?.name || "N/A"}</td>
          <td className="border p-2 flex justify-center gap-3">
            {/* Update Button */}
            <button 
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleUpdate(owner)}
            >
              <FaEdit />
            </button>

            {/* Delete Button */}
            <button 
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(owner.id,owner.name)}
            >
              <FaTrashAlt />
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="border p-2 text-center text-gray-500">
          No Owners Found
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

      {/* Add Owner Modal */}
      <Dialog open={showOwnerModal} onClose={() => setShowOwnerModal(false)}>
        <DialogTitle>Add New Owner</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" variant="outlined" className="mb-2" margin="dense"
           value={name} onChange={(e) => setName(e.target.value)}  />
          <TextField fullWidth label="Phone" variant="outlined" className="mb-2" margin="dense"
           value={phone} onChange={(e) => setPhone(e.target.value)}  />
          <TextField fullWidth label="Balance" variant="outlined" className="mb-2" margin="dense"
           value={balance} onChange={(e) => setBalance(e.target.value)}  />
          <TextField
              select
              fullWidth
              label="Select currency"
              value={currencyIdAdd}
              margin="normal"
              onChange={(e) => setCurrencyIdAdd(e.target.value)}
            >
              {listData.currencies?.map((cur) => (
                <MenuItem key={cur.id} value={cur.id}>
                  {cur.name}
                </MenuItem>
              ))}
            </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowOwnerModal(false)} color="">
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleAdd}>
          {loadingOwnerAdd?"Submit...":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Owner Modal */}
<Dialog open={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
  <DialogTitle>Update Owner</DialogTitle>
  <DialogContent>
    <TextField
      fullWidth
      label="Name"
      variant="outlined"
      className="mb-2"
      margin="dense"
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
    />
    <TextField
      fullWidth
      label="Phone"
      variant="outlined"
      className="mb-2"
      margin="dense"
      value={newPhone}
      onChange={(e) => setNewPhone(e.target.value)}
    />
    <TextField
      fullWidth
      label="Balance"
      variant="outlined"
      className="mb-2"
      margin="dense"
      value={newBalance}
      onChange={(e) => setNewBalance(e.target.value)}
    />
    <TextField
      select
      fullWidth
      label="Select currency"
      value={newCurrencyId}
      margin="normal"
      onChange={(e) => setNewCurrencyId(e.target.value)}
    >
      {listData.currencies?.map((cur) => (
        <MenuItem key={cur.id} value={cur.id}>
          {cur.name}
        </MenuItem>
      ))}
    </TextField>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setShowUpdateModal(false)} color="">
      Cancel
    </Button>
    <Button color="primary" variant="contained" onClick={handleUpdateSubmit}>
      {loadingUpdate ? "Updating..." : "Update"}
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default Owner;
