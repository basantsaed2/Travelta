import React, { useState, useEffect } from "react";
import { useGet } from "../../../../../Hooks/useGet";
import StaticLoader from "../../../../../Components/StaticLoader";
import { useDelete } from "../../../../../Hooks/useDelete";
import { useAuth } from "../../../../../Context/Auth";
import { usePost } from "../../../../../Hooks/usePostJson";
import { MenuItem, TextField } from "@mui/material";
import { FiTrash2, FiUpload, FiDollarSign, FiEdit3 } from "react-icons/fi";
const Wallet = () => {
  const [cards, setCards] = useState([]);
  const [data, setData] = useState([]);
  const [dataPayment, setDataPayment] = useState([]);
  const [rechargeInputVisible, setRechargeInputVisible] = useState({});
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState({});
  const [walletId, setWalletId] = useState("");
  const [amount, setAmount] = useState({});
  const [image, setImage] = useState({});

  const auth = useAuth();
  const { refetch: refetchWallet, loading, data: dataWallet } = useGet({
    url: "https://travelta.online/agent/wallet",
  });
  const { deleteData } = useDelete();
  const { postData } = usePost({
    url: "https://travelta.online/agent/wallet/charge",
  });

  useEffect(() => {
    refetchWallet();
  }, [refetchWallet]);

  useEffect(() => {
    if (dataWallet) {
      setData(dataWallet.wallets);
      setDataPayment(dataWallet.payment_methods);
    }
  }, [dataWallet]);

  const handleRechargeClick = (cardId) => {
    setWalletId(cardId); // Set the wallet ID for the selected card
    setRechargeInputVisible((prev) => ({
      ...prev,
      [cardId]: !prev[cardId], // Toggle visibility for the clicked card
    }));
  };

  const handlePaymentMethodChange = (cardId, value) => {
    setSelectedPaymentMethods((prev) => ({
      ...prev,
      [cardId]: value, // Set the payment method for the specific card
    }));
  };

  const handleAmountChange = (cardId, value) => {
    setAmount((prev) => ({
      ...prev,
      [cardId]: value, // Set the amount for the specific card
    }));
  };

  const handleImageChange = (cardId, e) => {
    const file = e.target.files[0];
    if (file) {
      setImage((prev) => ({
        ...prev,
        [cardId]: file, // Store the raw File object for the specific card
      }));
    }
  };

  const handleSubmit = async (e, cardId) => {
    e.preventDefault();

    if (!walletId || !selectedPaymentMethods[cardId] || !amount[cardId]) {
      auth.toastError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("wallet_id", cardId);
    formData.append("payment_method_id", selectedPaymentMethods[cardId]);
    formData.append("amount", amount[cardId]);
    formData.append("image", image[cardId]);

    const success = await postData(formData, "Added successfully!");
    if (success) {
      // Reset the fields after successful submission
      setRechargeInputVisible((prev) => ({ ...prev, [cardId]: false }));
      setSelectedPaymentMethods((prev) => ({ ...prev, [cardId]: "" }));
      setAmount((prev) => ({ ...prev, [cardId]: "" }));
      setImage((prev) => ({ ...prev, [cardId]: null }));
      refetchWallet(); // Refresh the wallet data
    }
  };

  const handleDelete = async (id, name) => {
    const wallet = data.find((wallet) => wallet.id === id);
    if (wallet && wallet.amount !== 0) {
      auth.toastError("Total amount not empty");
      return;
    }

    const success = await deleteData(
      `https://travelta.online/agent/wallet/delete/${id}`,
      `${name} Deleted Successfully.`
    );
    if (success) {
      setData(data.filter((wallet) => wallet.id !== id));
    }
  };

  return (
    <div className="">
      {loading ? (
        <StaticLoader />
      ) : (


        <div className="h-fit bg-gradient-to-br from-gray-100 to-gray-200 p-6">
        <div className="grid grid-col-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((card) => (
            <div
              key={card.id}
              className="relative bg-white p-6 rounded-3xl shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 group"
            >
              {/* Floating Icon */}
              <div className="absolute top-4 right-4 text-mainColor text-3xl opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                <FiDollarSign />
              </div>
              {/* Currency Name */}
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 text-start">
                {card.currancy.currancy_name}
              </h3>
              {/* Currency Amount */}
              <span className="block text-4xl font-bold text-mainColor mb-5 text-start">
                {card.currancy.currancy_symbol} {card.amount}
              </span>
              {/* Recharge Button */}
              <button
                onClick={() => handleRechargeClick(card.id)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-mainColor to-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full mb-6"
              >
                <FiEdit3 />
                Recharge Wallet
              </button>
              {/* Recharge Input Fields */}
              {rechargeInputVisible[card.id] && (
                <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
                  {/* Payment Method */}
                  <div className="mb-4">
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      value={selectedPaymentMethods[card.id] || ""}
                      onChange={(e) =>
                        handlePaymentMethodChange(card.id, e.target.value)
                      }
                      label="Select Payment Method"
                      className="shadow-lg"
                    >
                      {dataPayment.map((payment) => (
                        <MenuItem key={payment.id} value={payment.id}>
                          {payment.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  {/* Amount Input */}
                  <div className="mb-4">
                    <label
                      htmlFor={`amount-${card.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Amount
                    </label>
                    <input
                      id={`amount-${card.id}`}
                      type="number"
                      value={amount[card.id] || ""}
                      onChange={(e) => handleAmountChange(card.id, e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg mt-2 shadow-sm focus:ring-mainColor focus:border-mainColor transition-all"
                      placeholder="Enter amount"
                    />
                  </div>
                  {/* Image Upload */}
                  <div className="mb-4">
                    <label
                      htmlFor={`image-${card.id}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Upload Image
                    </label>
                    <div className="flex items-center gap-3 mt-2">
                      <input
                        id={`image-${card.id}`}
                        type="file"
                        onChange={(e) => handleImageChange(card.id, e)}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-mainColor focus:border-mainColor transition-all"
                      />
                      <FiUpload className="text-gray-500 text-xl" />
                    </div>
                  </div>
                  {/* Submit Button */}
                  <button
                    onClick={(e) => handleSubmit(e, card.id)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                  >
                    <FiEdit3 />
                    Submit
                  </button>
                </div>
              )}
              {/* Delete Button */}
              <div className="text-center mt-6">
                <span
                  onClick={() =>
                    handleDelete(card.id, card.currancy.currancy_name)
                  }
                  className="flex items-center justify-center gap-2 text-red-500  cursor-pointer hover:underline transition-all duration-300"
                >
                  <FiTrash2 />
                  Delete
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
        
      )}
    </div>
  );
};

export default Wallet;
