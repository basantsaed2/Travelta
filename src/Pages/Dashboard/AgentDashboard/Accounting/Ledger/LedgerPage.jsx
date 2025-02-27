import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { useAuth } from '../../../../../Context/Auth';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaReceipt, FaShoppingCart, FaDollarSign, FaUserTie, FaBuilding } from "react-icons/fa";

const LedgerPage = ({ refetch, setUpdate }) => {
    const { refetch: refetchLedger, loading: loadingLedger, data: ledgerData } = useGet({url:'https://travelta.online/agent/accounting/ledger'});
    
    const [ledgers, setLedgers] = useState([])
    const [selectedLedger, setSelectedLedger] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const auth = useAuth()

    useEffect(() => {
        refetchLedger();
    }, [refetchLedger, refetch]);

    useEffect(() => {
        if (ledgerData) {
            console.log("ledger Data:", ledgerData);
            
            // Merge all available lists into one array
            const allLedgers = [
                ...(ledgerData.agent_payments || []),
                ...(ledgerData.booking_engine || []),
                ...(ledgerData.expenses || []),
                ...(ledgerData.manuel_booking || []),
                ...(ledgerData.owner_transactions || []),
                ...(ledgerData.revenues || [])
            ];
    
            setLedgers(allLedgers);
        }
    }, [ledgerData]);   
    
     // Function to open modal
     const openModal = (ledger) => {
        setSelectedLedger(ledger);
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLedger(null);
    };

    const renderLedgerDetails = (record) => {
      return (
        <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-center gap-3 mb-4">
            {record.type === "Payment to Supplier" && <FaMoneyBillWave className="text-blue-500 text-2xl" />}
            {record.type === "Expenses" && <FaShoppingCart className="text-red-500 text-2xl" />}
            {record.type === "Revenue" && <FaDollarSign className="text-green-500 text-2xl" />}
            {record.type === "Owner" && <FaUserTie className="text-purple-500 text-2xl" />}
            {record.type === "Manuel Booking" && <FaBuilding className="text-yellow-500 text-2xl" />}
            <h3 className="text-xl font-semibold">{record.type}</h3>
          </div>
    
          {record.type === "Payment to Supplier" && (
            <>
              <p className="text-gray-600"><span className="font-semibold">Invoice Code:</span> {record.invoice_code || "N/A"}</p>
              <p className="text-gray-600"><span className="font-semibold">Supplier:</span> {record.supplier_name} ({record.supplier_phone})</p>
              <p className="text-gray-600"><span className="font-semibold">Date:</span> {record.date}</p>
              <p className="text-gray-600"><span className="font-semibold">Financial:</span> {record.financial || "N/A"}</p>
              <p className="text-gray-600"><span className="font-semibold">Amount:</span> {record.cost ? `${record.cost} ${record.currency || ""}` : "N/A"}</p>
            </>
          )}
    
          {record.type === "Expenses" && (
            <>
              <p className="text-gray-600"><span className="font-semibold">Title:</span> {record.title}</p>
              <p className="text-gray-600"><span className="font-semibold">Category:</span> {record.category}</p>
              <p className="text-gray-600"><span className="font-semibold">Date:</span> {record.date}</p>
              <p className="text-gray-600"><span className="font-semibold">Amount:</span> {record.amount} {record.currency}</p>
              <p className="text-gray-600"><span className="font-semibold">Description:</span> {record.description}</p>
              <p className="text-gray-600"><span className="font-semibold">Financial:</span> {record.financial}</p>
            </>
          )}
    
          {record.type === "Revenue" && (
            <>
              <p className="text-gray-600"><span className="font-semibold">Title:</span> {record.title}</p>
              <p className="text-gray-600"><span className="font-semibold">Category:</span> {record.category}</p>
              <p className="text-gray-600"><span className="font-semibold">Date:</span> {record.date}</p>
              <p className="text-gray-600"><span className="font-semibold">Amount:</span> {record.amount} {record.currency}</p>
              <p className="text-gray-600"><span className="font-semibold">Description:</span> {record.description}</p>
              <p className="text-gray-600"><span className="font-semibold">Financial:</span> {record.financial}</p>
            </>
          )}
    
          {record.type === "Owner" && (
            <>
              <p className="text-gray-600"><span className="font-semibold">Owner:</span> {record.owner_name} ({record.owner_phone})</p>
              <p className="text-gray-600"><span className="font-semibold">Transaction Type:</span> {record.transaction_type}</p>
              <p className="text-gray-600"><span className="font-semibold">Date:</span> {record.date}</p>
              <p className="text-gray-600"><span className="font-semibold">Amount:</span> {record.amount} {record.currency}</p>
              <p className="text-gray-600"><span className="font-semibold">Financial:</span> {record.financial}</p>
            </>
          )}
    
          {record.type === "Manuel Booking" && (
            <>
              <p className="text-gray-600"><span className="font-semibold">Booking Code:</span> {record.booking_code}</p>
              <p className="text-gray-600"><span className="font-semibold">Check-in:</span> {record.check_in}</p>
              <p className="text-gray-600"><span className="font-semibold">Check-out:</span> {record.check_out || "N/A"}</p>
              <p className="text-gray-600"><span className="font-semibold">To:</span> {record.to_name} ({record.to_phone})</p>
              <p className="text-gray-600"><span className="font-semibold">Total:</span> {record.total} {record.currency}</p>
              <p className="text-gray-600"><span className="font-semibold">Financial:</span> {record.financial}</p>
            </>
          )}
        </div>
      );
    };
    

  const headers = ['SL', 'Type',"Date","Amount","Financial Account","Details"];

  return (
    <div className="w-full flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingLedger ? (
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
            {ledgers.length === 0 ? (
              <tr>
                <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Ledger</td>
              </tr>
            ) : (
                ledgers.map((ledger, index) => ( 
                    <>
                <tr className="w-full border-b-2" key={index}>
                    <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {index + 1}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {ledger?.type|| '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {ledger?.date|| '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {ledger?.amount|| '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {ledger?.financial|| '-'}
                    </td>
                    <td className="py-2 text-center">
                        <button 
                            onClick={() => openModal(ledger)} 
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            View
                        </button>
                    </td>

                     {/* Modal */}
       {isModalOpen && selectedLedger && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
        <div className="bg-white p-5 rounded-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Ledger Details</h2>
                {renderLedgerDetails(ledger)}
                <button 
                    onClick={closeModal} 
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
        )}
                    
                </tr>
        </>
              ))

            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LedgerPage;