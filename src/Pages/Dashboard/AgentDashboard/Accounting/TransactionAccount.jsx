import React, { useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';

const TransactionAccount = () => {
  const { id } = useParams();
  const { refetch: refetchTransaction, data: dataTransaction } = useGet({
    url: `https://travelta.online/agent/accounting/transactions/${id}`,
  });

  const [transaction, setTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState("booking");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const navigate = useNavigate()

  const { postData, loadingPost } = usePost({
    url: `https://travelta.online/agent/accounting/transactions_payment`,
  });

  useEffect(() => {
    refetchTransaction();
  }, [refetchTransaction]);

  useEffect(() => {
    if (dataTransaction) {
      setTransaction(dataTransaction);
    }
  }, [dataTransaction]);

  const openPopup = (supplier_id) => {
    setSupplierId(supplier_id);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setAmount('');
    setDate('');
    setSupplierId('');
  };

  const handleSubmit = async () => {
    if (!amount || !date || !supplierId) {
      alert('Please fill all fields');
      return;
    }

    await postData({ amount, date, supplier_id: supplierId });
    closePopup();
    refetchTransaction(); 
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mb-4">
      <div className="bg-red-400 text-black p-4 flex justify-between items-center  rounded-lg  shadow-md">
        <h2 className="text-xl font-semibold">Total Credit</h2>
        <p className="text-2xl font-bold"> ${transaction?.total_credit}</p>
      </div>
      <div className="bg-green-400 text-black p-4 rounded-lg flex justify-between items-center shadow-md">
        <h2 className="text-xl font-semibold">Total Debt</h2>
        <p className="text-2xl font-bold">${transaction?.total_debt}</p>
      </div>
    </div>

      <div className="flex border-b mb-4">
        <button
          className={`p-2 flex-1 ${activeTab === "booking" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("booking")}
        >
          History Booking Payments
        </button>
        <button
          className={`p-2 flex-1 ${activeTab === "agent" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("agent")}
        >
          History Agent Payments
        </button>
      </div>

    {/* Tables */}
    {activeTab === "booking" && (
          <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.booking_payment.length > 0 ? (
              transaction?.booking_payment.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border">{item.amount}</td>
                  <td className="p-2 border">
      {item?.id ? (
        <button
          onClick={() => navigate("dashboard_agent/accounting/account_invoice", { state: { item } })}
          className="text-blue-500 underline hover:text-blue-700"
        >
          {item.code}
        </button>
      ) : (
        "-"
      )}
    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 text-center text-gray-500">
                  No Booking Payments
                </td>
              </tr>
            )}
          </tbody>
        </table>
    )}

      {/* Agent Payments Table */}
      {activeTab === "agent" && (
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Invoice</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.agent_payment.length > 0 ? (
              transaction?.agent_payment.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border">{item.amount}</td>
                  <td className="p-2 border">
                    {item?.id ? (
                      <Link to={`/dashboard_agent/booking_payments/invoice/${item?.id}`} className="text-blue-500 underline hover:text-blue-700">
                        {item.code}
                      </Link>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                      onClick={() => openPopup(item.supplier_id)}
                    >
                      <FaPlus />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center text-gray-500">
                  No Agent Payments
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Transaction</h2>
              <button onClick={closePopup} className="text-gray-500 hover:text-gray-800">
                <FaTimes />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter amount"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Supplier ID</label>
              <input
                type="text"
                value={supplierId}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <button
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={loadingPost}
            >
              {loadingPost ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionAccount;
