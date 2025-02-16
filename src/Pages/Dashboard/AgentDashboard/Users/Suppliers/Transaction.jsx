import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGet } from "../../../../../Hooks/useGet";
import StaticLoader from "../../../../../Components/StaticLoader";

const Transaction = () => {
  const { id } = useParams();
  const { refetch: refetchTransaction, loading: loadingTransaction, data: TransactionData } = useGet({
    url: `https://travelta.online/agent/supplier/transactions/${id}`,
  });

  const [historyCredit, setHistoryCredit] = useState([]);
  const [currentCredit, setCurrentCredit] = useState([]);
  const [historyDebit, setHistoryDebit] = useState([]);
  const [currentDebit, setCurrentDebit] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    refetchTransaction();
  }, [refetchTransaction]);

  useEffect(() => {
    if (TransactionData) {
      setHistoryCredit(TransactionData.transactions_history_credit);
      setCurrentCredit(TransactionData.transactions_current_credit);
      setHistoryDebit(TransactionData.transactions_history_debt);
      setCurrentDebit(TransactionData.transactions_current_debt);
    }
  }, [TransactionData]);

  const [activeTab, setActiveTab] = useState("History");
  const [subTab, setSubTab] = useState("Credit");



  const getTransactions = () => {
    if (activeTab === "History" && subTab === "Credit") return historyCredit;
    if (activeTab === "History" && subTab === "Debit") return historyDebit;
    if (activeTab === "Current" && subTab === "Credit") return currentCredit;
    if (activeTab === "Current" && subTab === "Debit") return currentDebit;
    if (activeTab === "Due") return currentDebit;
    return [];
  };

  if(loadingTransaction){
    return <StaticLoader/>
  }
  return (
    <div className="container mx-auto p-6">
      {/* Main Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        {["History", "Current", "Due"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 rounded ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded shadow-md">
        {/* History & Current (With Sub-tabs) */}
        {["History", "Current"].includes(activeTab) && (
          <div>
            <div className="flex justify-center gap-4 mb-4">
              {["Credit", "Debit"].map((sub) => (
                <button
                  key={sub}
                  className={`px-4 py-2 rounded ${subTab === sub ? "bg-green-500 text-white" : "bg-gray-200"}`}
                  onClick={() => setSubTab(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>

            <div className="text-center mb-4">
              <h2 className="text-lg font-bold">{activeTab} - {subTab}</h2>
            </div>

            {/* Transactions Table */}
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Amount</th>
                  <th className="border border-gray-300 px-4 py-2">Type</th>
                  <th className="border border-gray-300 px-4 py-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {getTransactions().map((transaction, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 text-center">{transaction.date}</td>
                    <td className={`border border-gray-300 px-4 py-2 font-bold text-center ${transaction.type === "debt" ? "text-green-500" : "text-red-500"}`}>
                      ${transaction.amount}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 capitalize text-center">{transaction.type}</td>
                    <td
  className="border border-gray-300 px-4 py-2 text-blue-500 cursor-pointer underline text-center"
  onClick={() => navigate(`/dashboard_agent/users/suppliers/transaction_details/${transaction.manuel_booking_id}`)}
>
  View Details
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Due Section */}
        {activeTab === "Due" && (
          <div>
            {/* Credit & Debit Cards */}
            <div className="flex justify-between gap-4 mb-6">
              <div className="flex-1 bg-red-100 p-4 rounded shadow text-center">
                <h3 className="text-lg font-bold">Credit</h3>
                <p className="text-xl font-semibold">$500</p>
              </div>
              <div className="flex-1 bg-green-100 p-4 rounded shadow text-center">
                <h3 className="text-lg font-bold">Debit</h3>
                <p className="text-xl font-semibold">$300</p>
              </div>
            </div>

            {/* Transaction Table */}
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Balance</th>
                  <th className="border border-gray-300 px-4 py-2">Type</th>
                  <th className="border border-gray-300 px-4 py-2">Invoice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">2025-02-15</td>
                  <td className="border border-gray-300 px-4 py-2">$100</td>
                  <td className="border border-gray-300 px-4 py-2">Credit</td>
                  <td className="border border-gray-300 px-4 py-2">INV-12345</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">2025-02-10</td>
                  <td className="border border-gray-300 px-4 py-2">$50</td>
                  <td className="border border-gray-300 px-4 py-2">Debit</td>
                  <td className="border border-gray-300 px-4 py-2">INV-67890</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
