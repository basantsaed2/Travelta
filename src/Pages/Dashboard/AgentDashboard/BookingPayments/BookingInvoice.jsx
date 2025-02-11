import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGet } from '../../../../Hooks/useGet';
import StaticLoader from '../../../../Components/StaticLoader';

const BookingInvoice = () => {
    const {id} = useParams()
    const {refetch: refetchInvoice,loading: loadingInvoice,data: paymentInvoice,} = useGet({ url: `https://travelta.online/agent/accounting/booking/invoice/${id}` });
    const [bookingPayment,setData] = useState(null)
    useEffect(() => {
        refetchInvoice()
    }, [refetchInvoice])

    useEffect(() => {
        if(paymentInvoice){
            setData(paymentInvoice.booking_payment)
        }
        console.log("data", paymentInvoice)
    }, [paymentInvoice])
if (loadingInvoice){
    return <StaticLoader/>
}
  return (
 
    <div className="overflow-x-auto p-4">
   <div className="w-full bg-fourthColor rounded-2xl shadow-md p-4 mt-5 flex flex-col gap-5 items-start justify-start overflow-x-scroll scrollSection">
   <table className="w-full sm:min-w-0">
                <thead className="w-full">
                  <tr className="w-full border-b-2">
              {["Logo", "Name", "Code", "Amount", "Currency", "Balance", "Details", "Date", "Status"].map((header, index) => (
                <th
                  key={index}
               className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50 transition ">
              {/* Logo */}
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {bookingPayment?.financial?.logo_link ? (
                  <a href={bookingPayment?.financial?.logo_link} target="_blank" rel="noopener noreferrer">
                    <img src={bookingPayment?.financial?.logo_link} alt="Logo" className="h-10 w-10 rounded-full mx-auto" />
                  </a>
                ) : (
                  <span className="text-gray-400">No Logo</span>
                )}
              </td>

              {/* Name */}
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{bookingPayment?.financial?.name || "N/A"}</td>

              {/* Code */}
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{bookingPayment?.code || "N/A"}</td>

              {/* Amount */}
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-green-600 text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                ${bookingPayment?.amount || "0"}
              </td>

              {/* Currency */}
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{bookingPayment?.financial?.currency_id || "N/A"}</td>

              {/* Balance */}
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-red-500 text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                ${bookingPayment?.financial?.balance || "0"}
              </td>

              {/* Details */}
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{bookingPayment?.financial?.details || "N/A"}</td>

              {/* Date */}
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{bookingPayment?.date || "N/A"}</td>

              {/* Status */}
              <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                {bookingPayment?.financial?.status === 1 ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-600">Inactive</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BookingInvoice