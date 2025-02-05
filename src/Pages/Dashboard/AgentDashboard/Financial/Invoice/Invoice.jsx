import React, { useEffect, useState } from "react";
import { useGet } from "../../../../../Hooks/useGet";

const Invoice = ({ update }) => {
  const { refetch: refetchInvoice, loading: loadingInvoice, data: DataInvoice } = useGet({ url: 'https://www.travelta.online/agent/invoice' });
  
  const [data, setData] = useState(null);
  const [isAllowDatePassed, setIsAllowDatePassed] = useState(false);
  const [updatedFine, setUpdatedFine] = useState(0);
  const [tottalPrice, setTotalPrice] = useState(0);
  

  useEffect(() => {
    refetchInvoice();
  }, [refetchInvoice, update]);

  useEffect(() => {
    if (DataInvoice) {
      const invoiceData = DataInvoice;
      setData(invoiceData);
      setTotalPrice(invoiceData.plan?.price)
      const currentDate = new Date(); // Dynamically fetch current date
      const allowDate = new Date(invoiceData.allow_date); // allow_date from the response
      const fineAmount = parseFloat(invoiceData.fine) || 0; // Initial fine amount from the response

      if (allowDate < currentDate) {
        setIsAllowDatePassed(true); // Allow date is in the past
        setTotalPrice(invoiceData.fine+invoiceData.plan.price)
      } 
      else{
        setTotalPrice(invoiceData.plan?.price)
      }
    }
    console.log("Data is", DataInvoice);
  }, [DataInvoice]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full sm:min-w-0">
        <thead className="w-full">
        <tr className="w-full border-b-2">
        <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              #
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Plan Name
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Start Date
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              End Date
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Fine
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Total Price
            </th>
            <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Status
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data ? (
            <tr className="bg-white even:bg-gray-100 hover:bg-gray-200 transition-all">
               <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                1
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {data.plan?.name || "N/A"}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {data.start_date}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {data.end_date}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {updatedFine ? updatedFine : "No Fine"}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
             {tottalPrice}
              </td>
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {isAllowDatePassed ? "Allow Date Passed" : "Allow Date Not Passed"}
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-6">
                No invoices available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;
