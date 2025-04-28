import React, { useEffect, useState } from 'react';
import StaticLoader from '../../../../../../Components/StaticLoader';
import { useGet } from '../../../../../../Hooks/useGet';
import { useDelete } from '../../../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaWhatsapp, FaEdit, FaCopy, FaFileExcel, FaSearch, FaGlobe, FaCity, FaFilter } from "react-icons/fa";
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx";
import { useAuth } from '../../../../../../Context/Auth';
import { CiFilter } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { usePost } from '../../../../../../Hooks/usePostJson';
import { TextField, MenuItem, Button, InputAdornment, IconButton, Autocomplete, CircularProgress } from "@mui/material";

const EditExpensesListPage = ({ update, setUpdate }) => {
  const { postData, loadingPost, response } = usePost({ url: 'https://travelta.online/agent/accounting/expenses/add' });
  const { refetch: refetchList, loading: loadingList, data: DataList } = useGet({
    url: `https://travelta.online/agent/accounting/expenses/lists`,
  });
  
  // State for options
  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [financials, setFinancials] = useState([]);
  
  // State for selected values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedFinancial, setSelectedFinancial] = useState(null);

  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    refetchList();
  }, [refetchList, update]);

  useEffect(() => {
    if (DataList) {
      console.log("DataList", DataList);
      setCategories(DataList.categories || []);
      setCurrencies(DataList.currencies || []);
      setFinancials(DataList.finantiols || []);
    }
  }, [DataList]);

  useEffect(() => {
    if (!loadingPost && response) {
      navigate(-1); // Navigate back only when the response is successful
    }
  }, [loadingPost, response, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_id", selectedCategory.id);
    formData.append("financial_id", selectedFinancial.id);
    formData.append("currency_id", selectedCurrency.id);
    formData.append("title", title);
    formData.append("date", date);
    formData.append("amount", amount);
    formData.append("description", description);
    
    postData(formData, 'Expenses Added Successfully');
  };

  return (
    <div className="w-full p-6 shadow-lg rounded-xl mt-5 border border-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            required
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="text-gray-500">$</span>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Date"
            variant="outlined"
            fullWidth
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Category Autocomplete */}
          <Autocomplete
            options={categories}
            getOptionLabel={(option) => option.name || ""}
            value={selectedCategory}
            onChange={(event, newValue) => setSelectedCategory(newValue)}
            loading={loadingList}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Category"
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingList ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />

          {/* Currency Autocomplete */}
          <Autocomplete
            options={currencies}
            getOptionLabel={(option) => option.name || ""}
            value={selectedCurrency}
            onChange={(event, newValue) => setSelectedCurrency(newValue)}
            loading={loadingList}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Currency"
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingList ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />

          {/* Financial Account Autocomplete */}
          <Autocomplete
            options={financials}
            getOptionLabel={(option) => option.name || ""}
            value={selectedFinancial}
            onChange={(event, newValue) => setSelectedFinancial(newValue)}
            loading={loadingList}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Financial Account"
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingList ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loadingPost}
          >
            {loadingPost ? <CircularProgress size={24} /> : 'Add Expense'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditExpensesListPage;