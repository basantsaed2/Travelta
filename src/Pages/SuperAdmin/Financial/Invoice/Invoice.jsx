import React, { useEffect, useState } from 'react'
import { useGet } from '../../../../Hooks/useGet';
import StaticLoader from '../../../../Components/StaticLoader';

const Invoice = ({update}) => {
          const { refetch: refetchInvoice, loading: loadingInvoice, data: DataInvoice } = useGet({ url: 'https://www.travelta.online/api/super/settings/allow_time' });
          const [data,setData] = useState(null)
          useEffect(() => {
            refetchInvoice()
          }, [refetchInvoice,update])
    
          useEffect(() => {
            if(DataInvoice){
                setData(DataInvoice.allow_time);
            }
            console.log("data is",DataInvoice)
          }, [DataInvoice])
        if(loadingInvoice){
          return (<>{<StaticLoader/>}</>)
        }

  return (
 
    <table className="w-full sm:min-w-0">
        <thead className="w-full">
        <tr className="w-full border-b-2">
        <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">#</th>
        <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Day</th>
        <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">Fine</th>
      </tr>
    </thead>
    <tbody>
      {data ? (
        <tr className={`even:bg-gray-100 text-sm sm:text-base hover:bg-gray-200`}>
          <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">1</td>
          <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{data.days}</td>
          <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{data.fine}</td>
        </tr>
      ) : (
        <tr>
          <td colSpan="3" className="text-center text-gray-500 py-4">
            No invoices available
          </td>
        </tr>
      )}
    </tbody>
  </table>

  )
}

export default Invoice