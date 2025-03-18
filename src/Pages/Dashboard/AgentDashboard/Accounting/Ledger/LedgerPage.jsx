import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { FaEdit,FaFileExcel ,FaSearch ,FaFilter } from "react-icons/fa";
import { Link} from 'react-router-dom';
import * as XLSX from "xlsx";
import { useAuth } from '../../../../../Context/Auth';
import { FaMoneyBillWave,FaHotel , FaReceipt, FaShoppingCart, FaDollarSign, FaUserTie, FaBuilding } from "react-icons/fa";

const LedgerPage = ({ update, setUpdate }) => {
    const { refetch: refetchLedger, loading: loadingLedger, data: ledgerData } = useGet({url:'https://travelta.online/agent/accounting/ledger'});
    const [ledgers, setLedgers] = useState([])
    const [selectedLedger, setSelectedLedger] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedType,setSelectedType] = useState("");
    const [startDate, setStartDate] = useState(""); // Start date filter
    const [endDate, setEndDate] = useState(""); // End date filter
    const auth = useAuth();

      //Pagination State
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        refetchLedger();
    }, [refetchLedger, update]);

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
        <div className="bg-gray-50 p-4 rounded-lg shadow-md w-full">
          <div className="flex items-center gap-3 mb-4">
            {record.type === "Manual Booking" && <FaBuilding className="text-yellow-500 text-2xl" />}
            {record.type === "Revenue" && <FaDollarSign className="text-green-500 text-2xl" />}
            {record.type === "Owner" && <FaUserTie className="text-purple-500 text-2xl" />}
            {record.type === "Payment to Supplier" && <FaMoneyBillWave className="text-blue-500 text-2xl" />}
            {record.type === "Booking Engine" && <FaHotel className="text-indigo-500 text-2xl" />}
            {record.type === "Expenses" && <FaShoppingCart className="text-red-500 text-2xl" />}
            <h3 className="text-xl font-semibold text-gray-800">{record.type}</h3>
          </div>
    
          {/* Manual Booking */}
          {record.type === "Manual Booking" && (
            <>
              <p><span className="font-semibold">Booking Code:</span> {record.booking_code}</p>
              <p><span className="font-semibold">Check-in:</span> {record.check_in}</p>
              <p><span className="font-semibold">Check-out:</span> {record.check_out || "N/A"}</p>
              <p><span className="font-semibold">To:</span> {record.to_name} ({record.to_phone})</p>
              <p><span className="font-semibold">Service:</span> {record.service}</p>
              <p><span className="font-semibold">Amount:</span> {record.amount} {record.currency}</p>
              <p><span className="font-semibold">Total:</span> {record.total} {record.currency}</p>
              <p><span className="font-semibold">Financial:</span> {record.financial}</p>
            </>
          )}
    
          {/* Revenue */}
          {record.type === "Revenue" && (
            <>
              <p><span className="font-semibold">Title:</span> {record.title}</p>
              <p><span className="font-semibold">Category:</span> {record.category}</p>
              <p><span className="font-semibold">Date:</span> {record.date}</p>
              <p><span className="font-semibold">Amount:</span> {record.amount} {record.currency}</p>
              <p><span className="font-semibold">Description:</span> {record.description}</p>
              <p><span className="font-semibold">Financial:</span> {record.financial}</p>
            </>
          )}
    
          {/* Owner */}
          {record.type === "Owner" && record.owner_transactions && (
            <>
              {record.owner_transactions.map((transaction, index) => (
                <div key={index} className="border-b pb-2 mb-2">
                  <p><span className="font-semibold">Owner:</span> {transaction.owner_name} ({transaction.owner_phone})</p>
                  <p><span className="font-semibold">Transaction Type:</span> {transaction.transaction_type}</p>
                  <p><span className="font-semibold">Date:</span> {transaction.date}</p>
                  <p><span className="font-semibold">Amount:</span> {transaction.amount} {transaction.currency}</p>
                  <p><span className="font-semibold">Financial:</span> {transaction.financial || "N/A"}</p>
                </div>
              ))}
            </>
          )}
    
          {/* Payment to Supplier */}
          {record.type === "Payment to Supplier" && (
            <>
              <p><span className="font-semibold">Invoice Code:</span> {record.invoice_code || "N/A"}</p>
              <p><span className="font-semibold">Manuel Code:</span> {record.manuel_code || "N/A"}</p>
              <p><span className="font-semibold">Supplier:</span> {record.supplier_name} ({record.supplier_phone})</p>
              <p><span className="font-semibold">Date:</span> {record.date}</p>
              <p><span className="font-semibold">Financial:</span> {record.financial || "N/A"}</p>
              <p><span className="font-semibold">Cost:</span> {record.cost ? `${record.cost} ${record.currency}` : "N/A"}</p>
            </>
          )}
    
          {/* Booking Engine */}
          {record.type === "Booking Engine" && (
            <>
              <p className="text-gray-700"><span className="font-semibold">Service:</span> {record.service}</p>
              <p className="text-gray-700"><span className="font-semibold">Booking Code:</span> {record.booking_code}</p>
              <p className="text-gray-700"><span className="font-semibold">Check-in:</span> {record.check_in}</p>
              <p className="text-gray-700"><span className="font-semibold">Check-out:</span> {record.check_out || "N/A"}</p>
              <p className="text-gray-700"><span className="font-semibold">To:</span> {record.to_name} ({record.to_phone})</p>
              <p className="text-gray-700"><span className="font-semibold">Total Amount:</span> {record.total} {record.currency}</p>
              <p className="text-gray-700"><span className="font-semibold">Amount Paid:</span> {record.amount} {record.currency}</p>
              <p className="text-gray-700"><span className="font-semibold">Financial Source:</span> {record.financial}</p>
              <p className="text-gray-700"><span className="font-semibold">Booking Date:</span> {record.date}</p>
            </>
          )}
    
          {/* Expenses */}
          {record.type === "Expenses" && (
            <>
              <p><span className="font-semibold">Title:</span> {record.title}</p>
              <p><span className="font-semibold">Category:</span> {record.category}</p>
              <p><span className="font-semibold">Date:</span> {record.date}</p>
              <p><span className="font-semibold">Amount:</span> {record.amount} {record.currency}</p>
              <p><span className="font-semibold">Description:</span> {record.description}</p>
              <p><span className="font-semibold">Financial:</span> {record.financial || "N/A"}</p>
            </>
          )}
        </div>
      );
    };
    
    // Get unique lists
    const uniqueType = [...new Set(ledgers.map(ledger => ledger.type).filter(Boolean))];

    // Handle input changes
    const handleSearch = (e) => setSearchText(e.target.value.toLowerCase());
    const handleFilterType = (e) => setSelectedType(e.target.value);
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);
  
    const filteredLedger = ledgers.filter((ledger) => {
      const matchesSearch =
      ledger?.type?.toLowerCase().includes(searchText) ||
      ledger?.financial?.toLowerCase().includes(searchText) ;
    
      const typeMatch = selectedType ? ledger.type === selectedType : true;

      const ledgerDate = new Date(ledger.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
  
      const dateMatch =
        (!start || ledgerDate >= start) && (!end || ledgerDate <= end);

      return matchesSearch && typeMatch && dateMatch ;
    });
       
    // Export filtered data to Excel
    const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(
      ledgers.map((ledger, index) => ({
          SL: index + 1,
          Type: ledger.type  || "-",
          Date: ledger.date  || "-",
          Amount: ledger.amount  || "-",
          Financial_Account	: ledger.financial  || "-",
        }))
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "General_Ledger");
      XLSX.writeFile(workbook, "General_Ledger.xlsx");
    };


    // Pagination Logic
    const totalPages = Math.ceil(filteredLedger.length / rowsPerPage);
    const paginatedData = filteredLedger.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    const handleRowsChange = (e) => {
      setRowsPerPage(Number(e.target.value));
      setCurrentPage(1); // Reset to first page when rows per page changes
    };

    const headers = ['Type',"Date","Amount","Financial Account","Details"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingLedger? (
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
                      placeholder="Search by type or financial account ..."
                      value={searchText}
                      onChange={handleSearch}
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                    />
                  </div>

                   {/* Filter by type */}
                   <div className="relative w-full md:w-[240px]">
                    <select
                      onChange={handleFilterType}
                      value={selectedType}
                      className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="">Filter by Type</option>
                      {uniqueType.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <FaFilter className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                  </div>

                   {/* Date Range Inputs */}
                    <input
                      type="date"
                      className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-300"
                      value={startDate}
                      onChange={handleStartDateChange}
                      
                    />
                    <input
                      type="date"
                      className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-300"
                      value={endDate}
                      onChange={handleEndDateChange}
                    />
          
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
                          <td colSpan="4" className="text-center text-xl text-gray-500 py-4">
                            No Ledger Found
                          </td>
                        </tr>
                      ) : (
                        paginatedData.map((ledger, index) => ( // 👈 Use filteredleads
                          <>
                          <tr
                            key={index}
                            className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                          >
                            <td className="text-center py-2 text-gray-600">{index + 1}</td>
                            <td className="text-center py-2 text-gray-600">{ledger?.type || "-"}</td>
                            <td className="text-center py-2 text-gray-600">{ledger?.date || "-"}</td>
                            <td className="text-center py-2 text-gray-600">{ledger?.amount || 0} {ledger?.currency}</td>
                            <td className="text-center py-2 text-gray-600">{ledger?.financial || "-"}</td>
                            <td className="text-center py-2">
                              <div className="flex items-center justify-center gap-1">
                                <button 
                                    onClick={() => openModal(ledger)} 
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    View
                                </button>
                              </div>
                            </td>
                            
                          {/* Modal */}
                          {isModalOpen && selectedLedger && (
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-5 flex items-center justify-center z-50">
                              <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg relative">
                                <button
                                  onClick={closeModal}
                                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                                >
                                  &times;
                                </button>
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Ledger Details</h2>
                                {renderLedgerDetails(ledger)}
                              </div>
                            </div>
                          )}
                          </tr>

</>
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

export default LedgerPage;
