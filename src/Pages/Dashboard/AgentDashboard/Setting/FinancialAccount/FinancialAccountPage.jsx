import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaEdit,FaFileExcel ,FaSearch ,FaGlobe} from "react-icons/fa";
import { Link} from 'react-router-dom';
import {useChangeState} from '../../../../../Hooks/useChangeState';
import * as XLSX from "xlsx";
import { useAuth } from '../../../../../Context/Auth';
import { Switch} from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { FaExchangeAlt } from "react-icons/fa";
import { TextField, MenuItem, Select, InputLabel, FormControl,Button ,Autocomplete} from '@mui/material';
import { TbTransform } from "react-icons/tb";
import { GrCurrency } from "react-icons/gr";
import { RiAccountCircleLine } from "react-icons/ri";

const FinancialAccountPage = ({ update, setUpdate }) => {
    const { refetch: refetchFinancialAccount, loading: loadingFinancialAccount, data: financialAccountData } = useGet({url:'https://travelta.online/agent/financial'});
      const { postData, loadingPost, response } = usePost({
        url: `https://travelta.online/agent/financial/transfer`,
      });
    const [financialAccount, setFinancialAccount] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [fromPaymentMethod, setFromPaymentMethod] = useState(null);
    const [toPaymentMethod, setToPaymentMethod] = useState(null);
    const [toPaymentMethods, setToPaymentMethods] = useState([]);
    const [amount, setAmount] = useState("");
    const { changeState, loadingChange, responseChange } = useChangeState();
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const [currancy,setCurrancy] = useState([])
    const [selectedAccountName, setSelectedAccountName] = useState(''); 
    const [selectedCurrency, setSelectedCurrency] = useState(''); // Stores filtered payment methods for "To Payment Method"
    const auth = useAuth()
    const [searchText, setSearchText] = useState("");

    //Pagination State
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        refetchFinancialAccount();
    }, [refetchFinancialAccount, update]);

    useEffect(() => {
        if (financialAccountData && financialAccountData.financials && financialAccountData.currencies) {
                console.log("Financial Account Data:", financialAccountData);
                setFinancialAccount(financialAccountData.financials);
                setCurrancy(financialAccountData.currencies)
        }
    }, [financialAccountData]); // Only run this effect when `data` changes\


    // Change coupon status 
    const handleChangeStaus = async (id, name, status) => {
    const response = await changeState(
            ` https://travelta.online/agent/financial/status/${id}`,
            `${name} Changed Status.`,
            { status } // Pass status as an object if changeState expects an object
    );

        if (response) {
                // Update categories only if changeState succeeded
                setFinancialAccount((prevFinancialAccount) =>
                    prevFinancialAccount.map((account) =>
                        account.id === id ? { ...account, status: status } : account
                    )
                );
        }

    };

    const handleOpenDelete = (item) => {
        setOpenDelete(item);
    };
    const handleCloseDelete = () => {
        setOpenDelete(null);
    };

    // Delete Language
    const handleDelete = async (id, name) => {
            const success = await deleteData(`https://travelta.online/agent/financial/delete/${id}`, `${name} Deleted Success.`);

            if (success) {
                // Update Discounts only if changeState succeeded
                setFinancialAccount(
                  financialAccount.filter((financial) =>
                    financial.id !== id
                        )
                );
            }
    };

    const handleFromPaymentChange = (event) => {
      const selectedFromPayment = financialAccount?.find(
        (pm) => pm.id === parseInt(event.target.value)
      );
    
      setFromPaymentMethod(selectedFromPayment);
    
      if (!selectedFromPayment) {
        setToPaymentMethods([]);
        setToPaymentMethod(null);
        return;
      }
    
      // Filter based on the selected "From" currency
      const filteredToPaymentMethods = financialAccount?.filter(
        (pm) => pm.currency_id === selectedFromPayment.currency_id
      );
    
      setToPaymentMethods(filteredToPaymentMethods);
      setToPaymentMethod(null); // Reset "To" payment if "From" changes
    };
    
    const handleToPaymentChange = (newValue) => {
      setToPaymentMethod(newValue); // Directly set the selected object
    };    
    
    const handleOpenPopup = (account) => {
      setFromPaymentMethod(account); // Store the full object
      
      // Filter "To Payment Methods" based on the selected "From" currency_id
      const filteredToPaymentMethods = financialAccount.filter(
        (pm) => pm.currency_id === account.currency_id && pm.id !== account.id // Prevent selecting the same account
      );
    
      setToPaymentMethods(filteredToPaymentMethods);
      setToPaymentMethod(null); // Reset "To" selection
      setModalOpen(true); // Open the modal
    };
    
    // Handle closing the popup
    const handleClosePopup = () => {
      setModalOpen(false);
      setFromPaymentMethod(null); // Reset "From Payment Method"
      setToPaymentMethod(null); // Reset "To Payment Method"
      setToPaymentMethods([]); // Clear "To Payment Methods"
      setAmount(""); // Reset the amount field
    };

    // Get unique account & currency lists
    const uniqueAccountName = [...new Set(financialAccount.map(account => account?.name).filter(Boolean))];
    const uniqueCurrency = [...new Set(financialAccount.map(currency => currency?.currancy?.name).filter(Boolean))];

    // Handle input changes
    const handleSearch = (e) => setSearchText(e.target.value.toLowerCase());
    const handleFilterCurrency = (e) => setSelectedCurrency(e.target.value);
    const handleFilterAccount = (e) => setSelectedAccountName(e.target.value);

    const filteredFinacial = financialAccount.filter((account) => {
    const matchesSearch =
      account?.name?.toLowerCase().includes(searchText) ||
      account?.currancy.name?.toLowerCase().includes(searchText); 

      const currencyMatch = selectedCurrency ? account?.currancy?.name === selectedCurrency : true;
      const accountMatch = selectedAccountName ? account?.name === selectedAccountName : true;
        
        return matchesSearch && accountMatch && currencyMatch ;
    });  
  
      // Export filtered data to Excel
      const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
          financialAccount.map((account, index) => ({
            SL: index + 1,
            Account_Name: account.name || "-",
            Logo: account.logo_link || "-",
            Balance: account.balance || "-",
            Status: account.status=== 1?"Active":"UnActive" || "-",
          }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Financial Accounts");
        XLSX.writeFile(workbook, "Financial Accounts.xlsx");
      };

      // Pagination Logic
      const totalPages = Math.ceil(filteredFinacial.length / rowsPerPage);
      const paginatedData = filteredFinacial.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

      const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
      const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
      const handleRowsChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when rows per page changes
      };

    // Handle submit for transfer
    const handleTransferSubmit = () => {
      if (!fromPaymentMethod) {
        auth.toastError("From payment method invalid");
      }
      if (!toPaymentMethods) {
        auth.toastError("To payment method invalid");
      }
      if (!amount) {
        auth.toastError("Amount invalid");
      }
    
      const formData = new FormData();
    
      formData.append("from_financial_id", fromPaymentMethod.id);
      formData.append("to_financial_id", toPaymentMethod.id);
      formData.append("amount", amount);
    
      postData(formData, "Data transferred successfully").then(()=>refetchFinancialAccount());
    
      console.log("Transferred Amount: ", amount, "From Payment Method: ", fromPaymentMethod, "To Payment Method: ", toPaymentMethod);
      handleClosePopup();
      
    };

      const headers = ['Account Name','Logo', 'Balance',"Currancy","Status", "Action"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingFinancialAccount || loadingChange || loadingDelete ? (
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
                    placeholder="Search by account name or currency..."
                    value={searchText}
                    onChange={handleSearch}
                    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                  />
                </div>
        
                {/* Filter by Account */}
                <div className="relative w-full md:w-[240px]">
                  <select
                    onChange={handleFilterAccount}
                    value={selectedAccountName}
                    className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="">Filter by Account Name</option>
                    {uniqueAccountName.map((account, index) => (
                      <option key={index} value={account}>
                        {account}
                      </option>
                    ))}
                  </select>
                  <RiAccountCircleLine  className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                </div>

                  {/* Filter by Currancy */}
                  <div className="relative w-full md:w-[240px]">
                  <select
                    onChange={handleFilterCurrency}
                    value={selectedCurrency}
                    className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="">Filter by Currency</option>
                    {uniqueCurrency.map((account, index) => (
                      <option key={index} value={account}>
                        {account}
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
                        {paginatedData.length === 0 ? (
                        <tr>
                            <td colSpan={headers.length} className="text-center text-xl text-gray-500 py-4">
                            No Finacial Account Found
                            </td>
                        </tr>
                        ) : (
                        paginatedData.map((account, index) => ( 
                            <tr
                            key={index}
                            className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                            >
                            <td className="text-center py-2 text-gray-600">{index + 1}</td>
                            <td className="text-center py-2 text-gray-600 relative">
                                <span className="block max-w-[150px] truncate mx-auto cursor-pointer group">
                                {account?.name || "-"}
                                {account?.name && account.name.length > 15 && (
                                    <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                                    {account.name}
                                    </span>
                                )}
                                </span>
                            </td>
                            <td className="text-center py-2 text-gray-600">
                                <div className="flex justify-center">
                                  <img src={account.logo_link}
                                        className="rounded-md h-14 object-fit w-24"
                                        alt="Logo"
                                  />
                              </div>
                            </td>
                            <td className="text-center py-2 text-gray-600">{account?.balance || 0 }</td>                           
                            <td className="text-center py-2 text-gray-600">{account?.currancy?.name || 0 }</td>                           
                            <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                <Switch
                                checked={account.status === 1}
                                onChange={() => {
                                    handleChangeStaus(account.id, account.name, account.status === 1 ? 0 : 1);
                                }}
                                color="primary"
                                />
                            </td>           
                            <td className="text-center py-2">
                                <div className="flex items-center justify-center gap-1">
                                <button
                                    type="button"
                                    onClick={()=>handleOpenPopup(account)}
                                >
                                    <FaExchangeAlt className='text-mainColor' size="24"/>
                                </button>
                                <Link to={`edit/${account.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                                <button
                                    type="button"
                                    onClick={() => handleOpenDelete(account.id)}
                                >
                                    <MdDelete color='#D01025' size="24"/>
                                </button>

                                {/* Modal */}
                                {modalOpen && (
                                     <Dialog open={modalOpen} onClose={handleClosePopup} className="relative z-10">
                                     <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity "/>
                                     <div className="fixed inset-0 flex items-center justify-center p-4">
                                       <DialogPanel className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                                         <div className="flex flex-col gap-5 text-center items-center">
                                           <FaExchangeAlt color='#0D47A1' size="60" />
                                           <h2 className="text-lg font-semibold">Transfer Funds</h2>
                               
                                           {/* From Payment Method (Read Only) */}
                                           <TextField
                                             fullWidth
                                             label="From Payment Method"
                                             value={fromPaymentMethod ? fromPaymentMethod.name : ""}
                                             InputProps={{ readOnly: true }}
                                           />
                               
                                           {/* To Payment Method (Dropdown - Filtered) */}
                                           <Autocomplete
                                            options={toPaymentMethods}
                                            getOptionLabel={(option) => option.name}
                                            value={toPaymentMethod || null} // Directly use the selected object
                                            onChange={(event, newValue) => handleToPaymentChange(newValue)}
                                            disabled={!fromPaymentMethod} // Disabled if no "From Payment" is selected
                                            className='w-full'
                                            renderInput={(params) => (
                                              <TextField {...params} label="To Payment Method" variant="outlined" />
                                            )}
                                          />

                                           {/* Amount Input */}
                                           <TextField
                                             fullWidth
                                             label="Amount"
                                             type="number"
                                             value={amount}
                                             inputProps={{ min: "0" }}
                                             onChange={(e) => setAmount(e.target.value)}
                                             placeholder="Enter amount"
                                           />
                                         </div>
                               
                                         {/* Buttons */}
                                         <div className="flex justify-end gap-3 mt-6">
                                           <Button onClick={handleClosePopup} className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white px-4 py-2 rounded">Cancel</Button>
                                           <Button
                                             onClick={handleTransferSubmit}
                                             className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white px-4 py-2 rounded"
                                             disabled={!fromPaymentMethod || !toPaymentMethod || !amount} // Prevent empty submissions
                                           >
                                             Transfer
                                           </Button>
                                         </div>
                                       </DialogPanel>
                                     </div>
                                   </Dialog>
                                )}
                                
                                {openDelete === account.id && (
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
                                                You will delete account {account?.name || "-"}
                                                </div>
                                            </div>
                                            </div>
                                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(account.id, account?.agent)}>
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
 export default FinancialAccountPage;

