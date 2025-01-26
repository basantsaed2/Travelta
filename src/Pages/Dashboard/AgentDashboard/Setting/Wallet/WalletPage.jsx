import React, { useState, useEffect } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useDelete } from '../../../../../Hooks/useDelete';
import { useAuth } from '../../../../../Context/Auth';
import { usePost } from '../../../../../Hooks/usePostJson';

const Wallet = () => {
  // State to store card data
  const [cards, setCards] = useState([]);
  
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [data,setData] = useState([]);
  const [rechargeInputVisible, setRechargeInputVisible] = useState({});
  const [currencyList, setCurrencyList] = useState([]);
  const [walletId, setWalletId] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [amount, setAmount] = useState('');
  const [image, setImage] = useState(null);
  const auth= useAuth();
  const {
    refetch: refetchWallet,
    loading,
    data: dataWallet,
  } = useGet({
    url: "https://travelta.online/agent/wallet",
  });

  const { deleteData, loadingDelete, responseDelete } = useDelete();

  const { postData, loadingPost, response } = usePost({
      url: 'https://travelta.online/agent/wallet/charge',
    });

  useEffect(() => {
    refetchWallet()
  
  }, [refetchWallet])

  useEffect(() => {
    if(dataWallet){
      setData(dataWallet.wallets)
      
        console.log(`data wallet ${dataWallet} `)
    }
    console.log(`data wallet ${dataWallet} `)
  }, [dataWallet])
  


 

  const handleRechargeClick = (cardId) => {
    setRechargeInputVisible((prev) => ({
      ...prev,
      [cardId]: !prev[cardId], // Toggle visibility for the clicked card
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Handle file upload (image)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send in the POST request
    const formData = new FormData();
    formData.append('wallet_id', walletId);
    formData.append('payment_method_id', paymentMethodId);
    formData.append('amount', amount);
    if (image) formData.append('image', image);

    postData(formData,"added sucessful")
    console.log("all data " ,formData)

  };

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, title: 'Card 1', price: '$50' },
        { id: 2, title: 'Card 2', price: '$30' },
        { id: 3, title: 'Card 3', price: '$20' },
        { id: 4, title: 'Card 4', price: '$60' },
        { id: 5, title: 'Card 5', price: '$40' },
        { id: 6, title: 'Card 6', price: '$10' },
      ];
      setCards(data);  // Set the cards data to state
    };

    fetchData();
  }, []);  // Empty dependency array to run once on component mount

  // Function to handle deleting a card
  const handleDelete = async (id, name) => {
    // Find the wallet by ID to check its amount
    const wallet = data.find(wallet => wallet.id === id);
  
    // Check if the wallet exists and if the amount is 0
    if (wallet && wallet.amount !== 0) {
      auth.toastError('Total amount not empty');
      return;  // Prevent deletion if amount is not zero
    }
  
    // Proceed with deletion if amount is 0
    const success = await deleteData(`https://travelta.online/agent/wallet/delete/${id}`, `${name} Deleted Success.`);
    
    if (success) {
      // Update the state to remove the deleted wallet from the list
      setData(data.filter((wallet) => wallet.id !== id));
    }
  
    console.log('data Wallet', data);
  };
  

  // const handleDelete = (id) => {
  //   setCards(data.filter(card => card.id !== id));  // Remove the card with the given id
  // };

  return (
    <div className="">
{loading ? (
  <>
  <StaticLoader/>
  </>
):
<>
<div className="h-fit bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map(card => (
          <div
            key={card.id}
            className="bg-white p-6 rounded-lg shadow-lg">
            {/* Card Title */}
            <h3 className="text-2xl font-semibold mb-3 text-start">{card.currancy.currancy_name}</h3>

            {/* Price */}
            <span className="block text-4xl text-mainColor text-start mb-5">{card.currancy.currancy_symbol} {card.amount}</span>

            {/* Recharge Button */}
            <button
              onClick={() => handleRechargeClick(card.id)}
              className="bg-mainColor text-white py-2 px-4 rounded-lg w-full mb-4">
              Recharge Wallet
            </button>

            {/* Conditional Recharge Inputs */}
            {rechargeInputVisible[card.id] && (
              <div>
                {/* Wallet ID */}
                <div className="mb-4">
                  <label htmlFor="walletId" className="block text-sm font-medium text-gray-700">Wallet ID</label>
                  <input
                    id="walletId"
                    type="text"
                    value={walletId}
                    onChange={(e) => setWalletId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mt-2"
                    placeholder="Enter wallet ID"
                  />
                </div>

                {/* Payment Method ID */}
                <div className="mb-4">
                  <label htmlFor="paymentMethodId" className="block text-sm font-medium text-gray-700">Payment Method ID</label>
                  <input
                    id="paymentMethodId"
                    type="text"
                    value={paymentMethodId}
                    onChange={(e) => setPaymentMethodId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mt-2"
                    placeholder="Enter payment method ID"
                  />
                </div>

                {/* Amount */}
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mt-2"
                    placeholder="Enter amount"
                  />
                </div>

                {/* Image */}
                <div className="mb-4">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                  <input
                    id="image"
                    type="file"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border rounded-lg mt-2"
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mb-4"
                >
                  Submit
                </button>
              </div>
            )}

            {/* Delete Link */}
            <div className="text-center">
              <span
                onClick={() => handleDelete(card.id,card.currancy.currancy_name)}
                className="text-mainColor cursor-pointer hover:underline">
                Delete
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
</>}

    </div>
   
  );
};

export default Wallet;
