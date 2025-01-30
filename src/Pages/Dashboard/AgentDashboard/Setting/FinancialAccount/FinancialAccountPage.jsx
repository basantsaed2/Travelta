import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { Switch} from "@mui/material";
import {useChangeState} from '../../../../../Hooks/useChangeState';
import {useDelete} from '../../../../../Hooks/useDelete';
import { Link } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { TextField, MenuItem, Select, InputLabel, FormControl, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useAuth } from '../../../../../Context/Auth';
import { usePost } from '../../../../../Hooks/usePostJson';

const FinancialAccountPage = ({ refetch, setUpdate }) => {
    const { refetch: refetchFinancialAccount, loading: loadingFinancialAccount, data: financialAccountData } = useGet({url:'https://travelta.online/agent/financial'});
      const { postData, loadingPost, response } = usePost({
        url: `https://travelta.online/agent/financial/transfer`,
      });
    const [financialAccount, setFinancialAccount] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [fromPaymentMethod, setFromPaymentMethod] = useState(null); // Store selected payment method from "From"
    const [toPaymentMethods, setToPaymentMethods] = useState([]);
    const [amount, setAmount] = useState("");
    const { changeState, loadingChange, responseChange } = useChangeState();
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const [currancy,setCurrancy] = useState([])
    const [selectedCurrency, setSelectedCurrency] = useState([]); // Stores filtered payment methods for "To Payment Method"
    const auth = useAuth()
    useEffect(() => {
        refetchFinancialAccount();
    }, [refetchFinancialAccount, refetch]);

    useEffect(() => {
        if (financialAccountData && financialAccountData.financials) {
                console.log("Financial Account Data:", financialAccountData);
                setFinancialAccount(financialAccountData.financials);
                setCurrancy(financialAccountData.currencies)
        }
    }, [financialAccountData]); // Only run this effect when `data` changes\


    const handleFromPaymentChange = (e) => {
      const selectedFromPayment = financialAccount.find(pm => pm.id === e.target.value);
      setFromPaymentMethod(selectedFromPayment);
    
      // Now filter the "To" payment methods based on the currency_id of the selected "From" payment method
      const filteredToPaymentMethods = financialAccount.filter(pm => pm.currency_id === selectedFromPayment.currency_id);
      setToPaymentMethods(filteredToPaymentMethods);
    };
    
  



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

    

    
  
    const handleOpenPopup = () => {
      if (fromPaymentMethod) {
        // Filter the "To" payment methods based on the selected "From" payment method's currency_id
        const filteredToPaymentMethods = financialAccount.filter(
          (pm) => pm.currency_id === fromPaymentMethod.currency_id
        );
        setToPaymentMethods(filteredToPaymentMethods); // Update "To" payment methods
      }
      
      setModalOpen(true); // Open the modal
    };
  
    // Handle closing the popup
    const handleClosePopup = () => {
      setModalOpen(false);
      setFromPaymentMethod(null); // Reset "From Payment Method"
      setToPaymentMethods([]); // Clear "To Payment Methods"
      setAmount(""); // Reset the amount field
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
      formData.append("to_financial_id", toPaymentMethods.id);
      formData.append("amount", amount);
    
      postData(formData, "Data transferred successfully");
    
      console.log("Transferred Amount: ", amount, "From Payment Method: ", fromPaymentMethod, "To Payment Method: ", toPaymentMethod);
      handleClosePopup();
    };
    
  
    // Filter available "To" payment methods based on selected "From" payment methods
    // const selectedCurrency = financialAccount?.filter(
    //   (pm) => fromPaymentMethods.includes(pm.currency_id)
    // );

  const headers = ['SL', 'Account Name','Logo', 'Balance',"Currancy","Status", "Action"];

  return (
    <div className="w-full flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingFinancialAccount || loadingChange || loadingDelete   ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <table className="w-full sm:min-w-0">
          <thead className="w-full">
            <tr className="w-full border-b-2">
              {headers.map((name, index) => (
                <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {financialAccount.length === 0 ? (
              <tr>
                <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Financial Account</td>
              </tr>
            ) : (
                financialAccount.map((account, index) => ( 
                <tr className="w-full border-b-2" key={index}>
                    <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {index + 1}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {account?.name|| '-'}
                    </td>
                     <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 overflow-hidden">
                        <div className="flex justify-center">
                            <img src={account.logo_link}
                                  className="rounded-full min-w-14 min-h-14 max-w-14 max-h-14"
                                  alt="Logo"
                            />
                        </div>
                      </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {account?.balance || '0'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {account?.currancy?.name || '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        <Switch
                                checked={account.status === 1}
                                onChange={() => {
                                    handleChangeStaus(account.id, account.name, account.status === 1 ? 0 : 1);
                                }}
                                color="primary"
                        />
                    </td>
                    <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-3">

                                <button
                                    type="button"
                                    onClick={handleOpenPopup}
                                >
                                    <FaExchangeAlt className='text-mainColor' size="24"/>
                                </button>
     {/* Modal */}
     {modalOpen && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-3">Transfer Funds</h2>

      {/* From Payment Method */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="from-payment-label">From Payment Method</InputLabel>
        <Select
          labelId="from-payment-label"
          id="from-payment"
          value={fromPaymentMethod ? fromPaymentMethod.id : ""}
          onChange={handleFromPaymentChange}
          label="From Payment Method"
        >
          {financialAccount.map((pm) => (
            <MenuItem key={pm.id} value={pm.id}>{pm.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* To Payment Method(s) (Filtered based on From Payment Method) */}
      <FormControl fullWidth margin="normal">
  <InputLabel id="to-currency-label">To Payment Method</InputLabel>
  <Select
    labelId="to-currency-label"
    id="to-currency"
    value={toPaymentMethods ? toPaymentMethods.id : ""}
    onChange={(e) => setToPaymentMethods(financialAccount.find(pm => pm.id === e.target.value))}
    label="To Payment Method"
    disabled={!fromPaymentMethod}
  >
    {toPaymentMethods.map((pm) => (
      <MenuItem key={pm.id} value={pm.id}>
        {pm.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

      {/* Amount Input */}
      <TextField
        fullWidth
        margin="normal"
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <Button
          onClick={handleClosePopup}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </Button>
        <Button
          onClick={handleTransferSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Transfer
        </Button>
      </div>
    </div>
  </div>
)}

                                <Link to={`edit/${account.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                               
                                <button
                                    type="button"
                                    onClick={() => handleOpenDelete(account.id)}
                                >
                                    <MdDelete color='#D01025' size="24"/>
                                </button>
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
                                              <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(account.id, account?.name)}>
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
      )}
    </div>
  );
}

export default FinancialAccountPage