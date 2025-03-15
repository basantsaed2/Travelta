import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { usePost } from "../../../../../Hooks/usePostJson";
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaFileExcel ,FaSearch,FaFilter } from "react-icons/fa";
import * as XLSX from "xlsx";
import { GrCurrency } from "react-icons/gr";
import { FiTrash2, FiUpload, FiDollarSign } from "react-icons/fi";
import { MenuItem, TextField,Button  } from "@mui/material";
import { useAuth } from "../../../../../Context/Auth";
import { TbTransform } from "react-icons/tb";

const WalletPage = ({ update, setUpdate }) => {
    const { refetch: refetchWallet, loading:loadingWallet, data: dataWallet } = useGet({
      url: "https://travelta.online/agent/wallet",
    });
    const { postData, loadingPost, response  } = usePost({
      url: "https://travelta.online/agent/wallet/charge",
    });
    const [wallets, setWallets] = useState([]);
    const [paymentMethods, setPaymentMethod] = useState([]);
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [amount, setAmount] = useState('');
    const [image, setImage] = useState(null);
    const [openRecharge, setOpenRecharge] = useState(null);
    const auth = useAuth();

    //Pagination State
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [currentPage, setCurrentPage] = useState(1);

      useEffect(() => {
        refetchWallet();
      }, [refetchWallet,update]);
    
      useEffect(() => {
        if (dataWallet && dataWallet.wallets && dataWallet.payment_methods) {
          setWallets(dataWallet.wallets);
          setPaymentMethod(dataWallet.payment_methods);
        }
      }, [dataWallet]);

      useEffect(() => {
        if (!loadingPost && response) {
          setOpenRecharge(null); // Close the modal when response is received
          setUpdate(!update);
          handleReset()
        }
      }, [loadingPost, response]);

      const handleReset = () => {
        setAmount('');
        setSelectedPaymentMethod('');
        setSelectedCurrency('');
        setImage('');
      };
      
        const handleOpenRecharge = (id) => setOpenRecharge(id);
        const handleCloseRecharge = () => {
          handleReset(); // Reset form fields
          setOpenRecharge(null); // Close modal
        };
        
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (file) {
            setImage(file); // Store file instead of Base64
          }
        };
        
      // Get unique lists
      const uniqueWallet = [...new Set(wallets.map(wallet => wallet?.currancy?.currancy_name).filter(Boolean))];

      // Handle input changes
      const handleSearch = (e) => setSearchText(e.target.value.toLowerCase());
      const handleFilterCurrency = (e) => setSelectedCurrency(e.target.value);

      const filteredWallet = wallets.filter((wallet) => {
        const matchesSearch =
        wallet?.currancy?.currancy_name.toLowerCase().includes(searchText) 
      
        const currencyMatch = selectedCurrency ? wallet.currancy?.currancy_name === selectedCurrency : true;

        return matchesSearch && currencyMatch ;
      });
       
      // Export filtered data to Excel
      const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
        wallets.map((currency, index) => ({
            SL: index + 1,
            Currency_Name: currency?.currancy?.currancy_name  || "-",
            Current_Amount: currency.amount  || 0,
            Pending_Amount: currency.pendding_wallet_sum_amount  || 0,
          }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Wallets");
        XLSX.writeFile(workbook, "Wallets.xlsx");
      };

      const handleOpenDelete = (item) => {
        setOpenDelete(item);
      };
      const handleCloseDelete = () => {
        setOpenDelete(null);
      };

      const handleDelete = async (id, name) => {
        const wallet = wallets.find((wallet) => wallet.id === id);
        if (wallet && wallet.amount !== 0) {
          auth.toastError("Total amount not empty");
          return;
        }
    
        const success = await deleteData(
          `https://travelta.online/agent/wallet/delete/${id}`,
          `${name} Deleted Successfully.`
        );
        if (success) {
          setWallets(wallets.filter((wallet) => wallet.id !== id));
        }
      };

      const handleSubmit = async (e, walletId) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("wallet_id", walletId);
        formData.append("payment_method_id",selectedPaymentMethod);
        formData.append("amount", amount);
        // Check if selected payment method includes "Vodafone" before appending the image
        const selectedPayment = paymentMethods.find((p) => p.id === selectedPaymentMethod);

        if (selectedPayment?.name.includes("Vodafone") && image) {
          formData.append("image", image);
        }
    
        postData(formData, "Recharge pending. Your request is being processed.");
      };    

      // Pagination Logic
      const totalPages = Math.ceil(filteredWallet.length / rowsPerPage);
      const paginatedData = filteredWallet.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

      const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
      const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
      const handleRowsChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when rows per page changes
      };
     
      const headers = ['Currency Name',"Current Amount","Pending Amount","Action"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingWallet || loadingDelete ||loadingPost  ? (
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
                  placeholder="Search by currency name..."
                  value={searchText}
                  onChange={handleSearch}
                  className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Filter by Currency */}
              <div className="relative w-full md:w-[240px]">
                <select
                  onChange={handleFilterCurrency}
                  value={selectedCurrency}
                  className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Filter by Currency</option>
                  {uniqueWallet.map((currency, index) => (
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
                <GrCurrency className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
              </div>
      
              {/* Export to Excel Button */}
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
              >
                <FaFileExcel className="w-5 h-5" />
                Export to Excel
              </button>
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
                {paginatedData?.length === 0 ? (
                      <tr>
                      <td colSpan="4" className="text-center text-xl text-gray-500 py-4">
                        No Currency Found
                      </td>
                    </tr>
                  ) : (
                    paginatedData?.map((currency, index) => ( // 👈 Use filteredleads
                      <tr
                        key={index}
                        className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                      >
                        <td className="text-center py-2 text-gray-600">{index + 1}</td>
                        <td className="text-center py-2 text-gray-600">{currency.currancy?.currancy_name|| "-"}</td>
                        <td className="text-center py-2">
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                          {currency.amount || 0}
                        </span>
                      </td>
                      <td className="text-center py-2">
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                          {currency.pendding_wallet_sum_amount || 0}
                        </span>
                      </td>
                        <td className="text-center py-2">
                        <div className="flex items-center justify-center gap-4">
                          {/* Delete Button */}
                          {
                             currency.amount === 0 && 
                             <button
                             type="button"
                             onClick={() => handleOpenDelete(currency.id)}
                           >
                             <MdDelete color='#D01025' size="24"/>
                           </button>
                          }

                            {/* Recharge Button */}
                            <button
                              onClick={() => handleOpenRecharge(currency.id)}
                              className="flex items-center justify-center text-mainColor gap-1"
                            >
                              <TbTransform size="20" /> Recharge
                            </button>

                            {/* Recharge Modal */}
                            {openRecharge === currency.id && (
                              <Dialog
                                open={true}
                                onClose={handleCloseRecharge}
                                className="relative z-10 p-4"
                              >
                                <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4">
                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                      <div className="flex flex-col gap-5 items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <TbTransform color='#0D47A1' size="60" />
                                        <div className="mt-2 text-center text-lg font-semibold">
                                          Recharge Wallet: <span className="text-mainColor">{currency?.currancy?.currancy_name || "-"}</span>
                                        </div>

                                        {/* Select Payment Method */}
                                        <TextField
                                          select
                                          fullWidth
                                          variant="outlined"
                                          label="Select Payment Method"
                                          value={selectedPaymentMethod}
                                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                          className="my-3"
                                        >
                                          {paymentMethods.map((payment) => (
                                            <MenuItem key={payment.id} value={payment.id}>
                                              <div className="flex items-center gap-3">
                                                {/* Show Image if Available */}
                                                {payment.image_link && (
                                                  <img src={payment.image_link} alt={payment.name} className="w-8 h-8 rounded-md" />
                                                )}
                                                <div>
                                                  <span>{payment.name}</span>
                                                  {/* Show Description if Available */}
                                                  {payment.description && (
                                                    <p className="text-gray-500 text-sm">{payment.description}</p>
                                                  )}
                                                </div>
                                              </div>
                                            </MenuItem>
                                          ))}
                                        </TextField>

                                        {/* Amount Input */}
                                        <TextField
                                          fullWidth
                                          type="number"
                                          label="Amount"
                                          variant="outlined"
                                          value={amount}
                                          onChange={(e) => setAmount(e.target.value)}
                                          className="my-3"
                                        />

                                      {paymentMethods.find((p) => p.id === selectedPaymentMethod)?.name.includes("Vodafone") && (
                                        <div className="flex items-center gap-3 my-3 w-full"> 
                                          <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange} // Convert file to Base64
                                            className="w-full border p-2 rounded-lg"
                                          />
                                          <FiUpload className="text-gray-500 text-xl" />
                                        </div>
                                      )}
                                      </div>

                                      {/* Buttons */}
                                      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                      <button
                                        className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                        onClick={(e) => handleSubmit(e, currency.id)}
                                      >
                                        Recharge
                                      </button>
                                      <button
                                        type="button"
                                        onClick={handleCloseRecharge}
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

                            {openDelete === currency.id && (
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
                                            You will delete wallet of currency {currency?.currancy?.currancy_name || "-"}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(currency.id, currency?.currancy?.currancy_name )}>
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
          </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-mainColor text-white hover:bg-blue-600"} transition-all`}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-mainColor text-white hover:bg-blue-600"} transition-all`}
        >
          Next
        </button>
      </div>
          </div>
        )}
    </div>
  );
}

export default WalletPage;

