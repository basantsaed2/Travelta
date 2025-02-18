import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useGet } from "../../../../../Hooks/useGet";
import { useAuth } from "../../../../../Context/Auth";

const PaidToSupplier = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

const auth = useAuth()
      const { refetch: refetchPaid, loading: loadingPaid, data: dataPaid } = useGet({url:'https://travelta.online/agent/accounting/paid_to_suppliers'});
      const [Paid, setPaid] = useState([])
      useEffect(() => {
        refetchPaid()
      }, [refetchPaid])

      useEffect(() => {
        if(dataPaid){
            setPaid(dataPaid.agent_payment)
            setFilteredData(dataPaid.agent_payment)
        }
        console.log("data",dataPaid)

      }, [dataPaid])

      const handleFilter = async () => {
        try {
          const response = await fetch(`https://travelta.online/agent/accounting/payable_to_suppliers_filter`, {
            method: "Post",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${auth.user?.token || ''}`,
            },
            body: JSON.stringify({
              payable_from: fromDate,
              payable_to: toDate,
              due_from: fromDate,
              due_to: toDate,
            }),
          });
    
          if (!response.ok) throw new Error("Failed to fetch filtered data");
    
          const filteredResult = await response.json();
          setFilteredData(filteredResult.agent_payable);
        } catch (error) {
          console.error("Error fetching filtered data:", error);
        }
      };
    
      const filteredSearch = filteredData.filter((item) =>
        item.supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    

  return (
     <div className="p-5 flex flex-col items-center gap-6">
       {/* Blue Card */}
       <div className="bg-blue-600 text-white text-4xl font-bold p-7 w-[50%] text-center rounded-lg shadow-lg">
         Paid Supplier
       </div>
 
       {/* Date Range Filter */}
       <div className="flex items-center justify-center gap-4 mb-4">
         <label className="text-lg font-medium">From:</label>
         <input
           type="date"
           value={fromDate}
           onChange={(e) => setFromDate(e.target.value)}
           className="border p-2 rounded-lg shadow-sm"
         />
         <label className="text-lg font-medium">To:</label>
         <input
           type="date"
           value={toDate}
           onChange={(e) => setToDate(e.target.value)}
           className="border p-2 rounded-lg shadow-sm"
         />
         <button
           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
           onClick={handleFilter}
         >
           Filter
         </button>
       </div>
 
       {/* Search Input */}
       <div className="relative w-1/2">
         <input
           type="text"
           placeholder="Search..."
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
           className="border w-full p-2 pl-10 rounded-md"
         />
         <FaSearch className="absolute left-3 top-3 text-gray-400" />
       </div>
 
       {/* Data Table */}
       <table className="w-full border-collapse border rounded-lg shadow-lg">
         <thead>
           <tr className="bg-blue-600 text-white">
             <th className="p-3">#</th>
             <th className="p-3">Booking Code</th>
             <th className="p-3">Supplier Name</th>
             <th className="p-3">Supplier Agent</th>
             <th className="p-3">Financial</th>
             <th className="p-3">Amount</th>
             <th className="p-3">Due Date</th>
           
           </tr>
         </thead>
         <tbody>
           {filteredSearch.length > 0 ? (
             filteredSearch.map((item, index) => (
               <tr key={item.id} className="text-center border-b">
                 <td className="p-3">{index + 1}</td>
                 <td className="p-3">{item.code}</td>
                 <td className="p-3">{item.supplier.name}</td>
                 <td className="p-3">{item.supplier.agent}</td>
                 <td className="p-3">{item.financial?.name?item.financial?.name:"-"}</td>
                 <td className="p-3">{item.amount}</td>
                 <td className="p-3">{item.date}</td>
                 
               </tr>
             ))
           ) : (
             <tr>
               <td colSpan="8" className="text-center p-3">
                 No data found
               </td>
             </tr>
           )}
         </tbody>
       </table>
     </div>
  );
};

export default PaidToSupplier;
