import React, { useEffect, useState } from "react";
import { Button, TextField, IconButton, MenuItem } from "@mui/material";

import { useGet } from "../../../../../Hooks/useGet";
import { FaEllipsis, FaTrashCan } from "react-icons/fa6";
import { FaEdit, FaFilter, FaPlus } from "react-icons/fa";
import { usePost } from "../../../../../Hooks/usePostJson";
import { useDelete } from "../../../../../Hooks/useDelete";
import { useAuth } from "../../../../../Context/Auth";
import StaticLoader from "../../../../../Components/StaticLoader";
import axios from "axios";

const ListRevenue = () => {
  const { refetch: refetchListRevenue, loading: loadingListRevenue, data: DataListRevenue } = useGet({
    url: `https://travelta.online/agent/accounting/revenue`,
  });

  const { refetch: refetchList, loading: loadingList, data: DataList } = useGet({
    url: `https://travelta.online/agent/accounting/revenue/lists`,
  });
   const { postData: postRevenue ,loadingPost,response } = usePost({ url: `https://travelta.online/agent/accounting/revenue/add` });
   const { postData: postFilter ,loadingPost:loadingFilter,response:resFilter } = usePost({ url: `https://travelta.online/agent/accounting/revenue/filter` });
  const [list,setList] = useState([])
  const [revenue, setRevenue] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [financialAccount, setFinancialAccount] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [description, setDescription] = useState('');
   const { deleteData } = useDelete();
   const [showFilter, setShowFilter] = useState(false);
   const [fromDate, setFromDate] = useState("");
   const [toDate, setToDate] = useState("");
  const [newExpense, setNewExpense] = useState({
    title: "",
    category: "",
    financialAccount: "",
    date: "",
    amount: "",
    currency: "",
    description: "",
  });
  const auth = useAuth();


  useEffect(() => {
    refetchListRevenue();
    refetchList();
  }, [refetchListRevenue,refetchList]);

  useEffect(() => {
    if (DataListRevenue) {
      setRevenue(DataListRevenue.revenue);
    }
    console.log("data",DataListRevenue)
  }, [DataListRevenue]);

  useEffect(() => {
    if (DataList) {
        setList(DataList);
    }
    console.log("data", DataList)
  }, [DataList]);

  const handleChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenUpdate = (Revenue) => {
    setSelectedRevenue(Revenue);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleUpdateChange = (e) => {
    setSelectedRevenue({ ...selectedRevenue, [e.target.name]: e.target.value });
  };

  const AddRevenue = async (e) => {
    e.preventDefault();

    const formData= new FormData()
    formData.append("category_id",category);
    formData.append("financiale_id",financialAccount)
    formData.append("currency_id",currency);
    formData.append("title",title)
    formData.append("date",date)
    formData.append("amount",amount);
    formData.append("description",description)
    postRevenue(formData, "data added successful")
    .then(() => {
      // Close the popup
      setOpenAdd(false);

       // Reset the form fields to their initial values
       setTitle('');
       setCategory('');
       setFinancialAccount('');
       setDate('');
       setAmount('');
       setCurrency('');
       setDescription('');
       refetchListRevenue();
      
   
    })
  };
  const handleUpdateRevenue = async () => {
    try {
      // Prepare the updated expense object
      const updatedRevenue = {
        title: selectedRevenue.title,
        category_id: selectedRevenue.category?.id, // category id
        financiale_id: selectedRevenue.financiale?.id, // financial account id
        date: selectedRevenue.date,
        amount: selectedRevenue.amount,
        currency_id: selectedRevenue.currency?.id, // currency id
        description: selectedRevenue.description,
      };
  
      // Send PUT request to update the expense
      const response = await fetch(
        `https://travelta.online/agent/accounting/revenue/update/${selectedRevenue.id}`, // dynamic endpoint with expense id
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Specify content type
            'Authorization': `Bearer ${auth.user?.token || ''}`, // Include authorization token
          },
          body: JSON.stringify(updatedRevenue), // Pass the updated Revenue as JSON in the body
        }
      );
  
      // Check for successful response
      if (response.ok) {
        // Success! Update was successful
        auth.toastSuccess('Expense updated successfully');
        // Close the update form or perform any other actions
        refetchListRevenue()
        handleCloseUpdate();
      } else {
        // If the response is not ok, throw an error
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to update expense');
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      // Handle error, maybe show a notification
      auth.toastError(error.message || 'Failed to update expense');
    }
  };
  
  


  const handleDelete = async (id) => {
    const success = await deleteData(
      `https://travelta.online/agent/accounting/revenue/delete/${id}`,
      `Category Deleted Successfully.`
    );
    if (success) {
        setRevenue(revenue.filter((item) => item.id !== id));
    }
  };

  const fetchFilteredData = async () => {
    try {
      const formData = new FormData();
      formData.append("from", fromDate);
      formData.append("to", toDate);
  
      const response = await postFilter(formData, "filtered successfully"); // Await the API call
  
      if (resFilter?.data?.revenue !== undefined) {
        setRevenue(resFilter.data.revenue); // Update the table with filtered data
      } else {
        console.error("Revenue data is missing in the response");
      }
  
      setShowFilter(false); // Close the filter popup
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };
  
  

  if(loadingListRevenue){
    return <StaticLoader/>
  }


  return (
    <div className="p-5">
     <div className="flex justify-between mb-4">
          {/* Filter Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        onClick={() => setShowFilter(true)}
      >
        <FaFilter /> Filter
      </button>
           <button
             className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
             onClick={() => setOpenAdd(true)}
           >
             <FaPlus /> Add New Revenue
           </button>
         </div>

    {/* Add New Expense Form Popup */}
    {openAdd && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-xl font-semibold mb-4">Add New Revenue</h3>

      <TextField
        label="Title"
        name="title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Two in Row - Category & Financial Account */}
      <div className="flex gap-4">
        <TextField
          select
          fullWidth
          label="Select Category"
          value={category}
          margin="normal"
          onChange={(e) => setCategory(e.target.value)}
        >
          {list?.categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Select Financial Account"
          value={financialAccount}
          margin="normal"
          onChange={(e) => setFinancialAccount(e.target.value)}
        >
          {list?.finantiols.map((fin) => (
            <MenuItem key={fin.id} value={fin.id}>
              {fin.name}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {/* Two in Row - Date & Amount */}
      <div className="flex gap-4">
        <TextField
          type="date"
          name="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Amount"
          type="number"
          name="amount"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputProps={{
            min: "0",
          }}
        />
      </div>

      {/* Currency Dropdown */}
      <TextField
        select
        fullWidth
        label="Select Currency"
        value={currency}
        margin="normal"
        onChange={(e) => setCurrency(e.target.value)}
      >
        {list?.currencies.map((currency) => (
          <MenuItem key={currency.id} value={currency.id}>
            {currency.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Description Field */}
      <TextField
        label="Description"
        name="description"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <Button onClick={AddRevenue} variant="contained" color="primary">
          Add Revenue
        </Button>
        <Button onClick={handleCloseAdd} color="secondary">
          Cancel
        </Button>
      </div>
    </div>
  </div>
)}


{/* Update Revenue Form Popup */}
{openUpdate && selectedRevenue && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-xl font-semibold mb-4">Update Revenue</h3>

      {/* Two Fields in a Row */}
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={selectedRevenue.title}
          onChange={(e) =>
            setSelectedRevenue((prevRevenue) => ({
              ...prevRevenue,
              title: e.target.value,
            }))
          }
        />

        <TextField
          type="date"
          name="date"
          fullWidth
          margin="normal"
          value={selectedRevenue.date}
          onChange={(e) =>
            setSelectedRevenue((prevRevenue) => ({
              ...prevRevenue,
              date: e.target.value,
            }))
          }
        />
      </div>

      {/* Single Column Fields */}
      <TextField
        select
        label="Category"
        name="category"
        fullWidth
        margin="normal"
        value={selectedRevenue.category?.id || ""}
        onChange={(e) =>
          setSelectedRevenue((prevRevenue) => ({
            ...prevRevenue,
            category: { ...prevRevenue.category, id: e.target.value },
          }))
        }
      >
        {list?.categories?.length > 0 ? (
          list.categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>No categories available</MenuItem>
        )}
      </TextField>

      <TextField
        select
        label="Financial Account"
        name="financialAccount"
        fullWidth
        margin="normal"
        value={selectedRevenue.financiale?.id || ""}
        onChange={(e) =>
          setSelectedRevenue((prevRevenue) => ({
            ...prevRevenue,
            financiale: { ...prevRevenue.financiale, id: e.target.value },
          }))
        }
      >
        {list?.finantiols?.length > 0 ? (
          list.finantiols.map((account) => (
            <MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>No financial accounts available</MenuItem>
        )}
      </TextField>

      <TextField
        label="Amount"
        type="number"
        name="amount"
        fullWidth
        margin="normal"
        value={selectedRevenue.amount}
        onChange={(e) =>
          setSelectedRevenue((prevRevenue) => ({
            ...prevRevenue,
            amount: e.target.value,
          }))
        }
        inputProps={{
          min: "0",
        }}
      />

      <TextField
        select
        fullWidth
        label="Select Currency"
        value={selectedRevenue.currency?.id || ""}
        onChange={(e) =>
          setSelectedRevenue((prevRevenue) => ({
            ...prevRevenue,
            currency: { ...prevRevenue.currency, id: e.target.value },
          }))
        }
        margin="normal"
        name="currency"
      >
        {list?.currencies?.length > 0 ? (
          list.currencies.map((currency) => (
            <MenuItem key={currency.id} value={currency.id}>
              {currency.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>No currencies available</MenuItem>
        )}
      </TextField>

      <TextField
        label="Description"
        name="description"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={selectedRevenue.description}
        onChange={(e) =>
          setSelectedRevenue((prevRevenue) => ({
            ...prevRevenue,
            description: e.target.value,
          }))
        }
      />

      <div className="flex justify-between mt-4">
        <Button onClick={handleUpdateRevenue} variant="contained" color="primary">
          Update Expense
        </Button>
        <Button onClick={handleCloseUpdate} color="secondary">
          Cancel
        </Button>
      </div>
    </div>
  </div>
)}

      {/* Filter Popup */}
      {showFilter && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Filter Revenue</h3>
            
            {/* Date From */}
            <label className="block mb-2">From Date:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            {/* Date To */}
            <label className="block mb-2">To Date:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={fetchFilteredData}
                className="bg-mainColor text-white px-4 py-2 rounded"
              >
                {loadingFilter?"Apply...":"Apply"}
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}






      {/* Expense Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-200">
    <tr className=" text-mainColor">
      <th className="p-4 border-b">ID</th>
      <th className="p-4 border-b">Title</th>
      <th className="p-4 border-b">Date</th>
      <th className="p-4 border-b">Amount</th>
      <th className="p-4 border-b">Category</th>
      <th className="p-4 border-b">Currency</th>
      <th className="p-4 border-b">Financial</th>
      <th className="p-4 border-b">Details</th>
    </tr>
  </thead>
  <tbody>
    {revenue.map((expense, index) => (
      <tr key={expense.id} className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-200`}>
        <td className="p-4 border-b text-sm">{expense.id}</td>
        <td className="p-4 border-b text-sm">{expense.title}</td>
        <td className="p-4 border-b text-sm">{expense.date}</td>
        <td className="p-4 border-b text-sm font-semibold">${expense.amount}</td>
        <td className="p-4 border-b text-sm">{expense.category.name}</td>
        <td className="p-4 border-b text-sm">{expense.currency.name}</td>
        <td className="p-4 border-b text-sm flex items-center justify-center">
          <img src={expense.financiale.logo_link} alt={expense.financiale.name} className="w-8 h-8 object-cover mr-2" />
          {expense.financiale.name}
        </td>
        <td className="p-4 border-b text-sm">
          <div className="flex justify-center space-x-2">
            <button onClick={() => handleOpenUpdate(expense)} className="text-left p-2 hover:bg-gray-100 text-mainColor flex items-center gap-2">
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(expense.id)} className="text-left p-2 hover:bg-red-100 flex items-center gap-2 text-red-500">
              <FaTrashCan />
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
    </div>
  );
};

export default ListRevenue;
