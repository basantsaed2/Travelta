import React, { useEffect, useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { Dialog,DialogBackdrop, DialogPanel } from '@headlessui/react';
import { FaEdit, FaFileExcel, FaSearch, FaFilter,FaCopy } from "react-icons/fa";
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx";
import { useAuth } from '../../../../../Context/Auth';
import { useDelete } from '../../../../../Hooks/useDelete';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { TextField, Button,  Dialog as MuiDialog , DialogActions, DialogContent, DialogTitle, MenuItem } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';

const OwnerPage = ({ update, setUpdate }) => {
  const { refetch: refetchOwner, loading: loadingOwner, data: ownerData } = useGet({ url: 'https://travelta.online/agent/accounting/owner' });
  const { refetch: refetchList,loading: loadingList,data: ListData,} = useGet({ url: "https://travelta.online/agent/accounting/owner/lists" });
  const { postData: postDeposit ,loadingPost:loadingDeposit,response:reDeposit } = usePost({ url: `https://travelta.online/agent/accounting/owner/transaction` });

  const [owners, setOwners] = useState([]);
  const [currencies,setCurrencies]= useState([])
  const [financials,setFinancials]= useState([])

  const [filteredOwners, setFilteredOwners] = useState([]);
  const {deleteData, loadingDelete, responseDelete} = useDelete();
  const [openDelete, setOpenDelete] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [copiedPhone, setCopiedPhone] = useState(null);
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

  // Fetch Owner data on mount and update
  useEffect(() => {
    refetchOwner();refetchList();
  }, [refetchOwner,refetchList, update]);

  useEffect(() => {
    if (ownerData && ownerData.owners) {
      console.log("Owner Data:", ownerData);
      setOwners(ownerData.owners);
      setFilteredOwners(ownerData.owners); // Default to full dataset
    }
  }, [ownerData]);

  useEffect(() => {
    if (ListData && ListData.currencies && ListData.financials) {
      console.log("List Data:", ListData);
      setCurrencies(ListData.currencies);
      setFinancials(ListData.financials);
    }
  }, [ListData]);

  // Filtering Logic: search, type, and date range
  useEffect(() => {
    let filtered = owners;
    // Search filter (case-insensitive)
    if (searchText) {
      filtered = filtered.filter(owner =>
        owner?.name?.toLowerCase().includes(searchText) ||
        owner?.phone?.toLowerCase().includes(searchText) 
      );
    }
    // Type filter
    if (selectedCurrency) {
      filtered = filtered.filter(owner => owner.currency?.name === selectedCurrency);
    }
    // Date range filter
    setFilteredOwners(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchText, selectedCurrency,owners,update,reDeposit]);

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

  const handleOpenDelete = (item) => {
        setOpenDelete(item);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  const handleDelete = async (selected) => {

    if(selected.balance != 0){
      auth.toastError("Balance of owner must be zero")
      handleCloseDelete()
      } else {
        const success = await deleteData(`https://travelta.online/agent/accounting/owner/delete/${selected.id}`, `${selected.name} Deleted Success.`);

        if (success) {
          // Update Discounts only if changeState succeeded
          setOwners(
              owners.filter((owner) =>
                owner.id !== selected.id
                  )
          );
    }}
  };
  

  const handleDeposite = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("owner_id", selectedOwner);
    formData.append("financial_id", financialAccountId);
    formData.append("amount", amount);
    formData.append("type", selectedType);

    postDeposit(formData, "Deposit/Withdraw Added Successfully");
  };

  // Copy phone number to clipboard
  const copyToClipboard = (phone) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  // Handlers for filters
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterType = (e) => {
    setSelectedCurrency(e.target.value);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredOwners.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredOwners.slice(indexOfFirstRow, indexOfLastRow);

  const uniqueType = [...new Set(owners.map(owner => owner.currency?.name).filter(Boolean))];

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
      owners.map((owner, index) => ({
        SL: index + 1,
        Name: owner?.name || "-",
        Phone: owner?.phone || "-",
        Balance: `${owner?.balance || 0} ${owner?.currency?.name || ""}`,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Owners");
    XLSX.writeFile(workbook, "Owners.xlsx");
  };
  const headers = ["Name","Phone","Balance","Action"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingOwner || loadingList || loadingDelete? (
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

          {/* Owner Table */}
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
                      No Owners Found
                    </td>
                  </tr>
                ) : (
                  currentRows.map((owner, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                    >
                      <td className="text-center py-2">{indexOfFirstRow + index + 1}</td>
                      <td className="text-center py-2 text-gray-600">{owner?.name || "-"}</td>
                      <td className="text-center py-2 text-gray-600">
                          {owner?.phone ? (
                            <div className="flex items-center justify-center gap-1">
                              <span>{owner.phone}</span>
                              <FaCopy
                                className="text-gray-500 hover:text-blue-500 cursor-pointer"
                                onClick={() => copyToClipboard(owner.phone)}
                              />
                            </div>
                          ) : (
                            "-"
                          )}
                        {copiedPhone === owner.phone && <span className="text-green-500 text-xs ml-2">Copied!</span>}
                      </td>
                      <td className="text-center py-2 text-gray-600">{owner?.balance || 0} {owner?.currency?.name}</td>
                      <td className="text-center py-2">
                        <div className="flex items-center justify-center gap-1">
                        <Link to={`edit/${owner.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                          <button
                            type="button"
                            onClick={() => handleOpenDelete(owner.id)}
                          >
                            <MdDelete color='#D01025' size="24"/>
                          </button>
            
                          {openDelete === owner.id && (
                            <Dialog
                              open={true}
                              onClose={handleCloseDelete}
                              className="relative z-10"
                            >
                              <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="flex  flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                      <PiWarningCircle color='#0D47A1'
                                      size="60"
                                      />
                                      <div className="flex items-center">
                                        <div className="mt-2 text-center">
                                          You will delete owner {owner?.name || "-"}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                      <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(owner)}>
                                        Delete
                                      </button>
    
                                      <button
                                        type="button"
                                        data-autofocus
                                        onClick={handleCloseDelete}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </DialogPanel>
                                </div>
                              </div>
                            </Dialog>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

              {/* Deposit/Withdraw Modal */}
          <MuiDialog open={showTransactionModal} onClose={() => setShowTransactionModal(false)}>
            <DialogTitle>Deposit/Withdraw</DialogTitle>
            <DialogContent>
            <TextField
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
            </TextField>
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
                  value={financialAccountId}
                  margin="normal"
                  onChange={(e) => setFinancialAccountId(e.target.value)}
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

export default OwnerPage;


