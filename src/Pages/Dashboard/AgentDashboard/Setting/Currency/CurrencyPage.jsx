import React, { useEffect, useState } from 'react'
import { useGet } from '../../../../../Hooks/useGet';
import { CircularProgress, MenuItem, TextField } from '@mui/material';
import { useDelete } from '../../../../../Hooks/useDelete';
import StaticLoader from '../../../../../Components/StaticLoader';
import { MdDelete } from 'react-icons/md';

const CurrencyPage = ({update}) => {
     const { refetch: refetchCurrecy, loading: loadingCurrecy, data: Currency } = useGet({
              url: `https://travelta.online/agent/settings/currency`,
      });
      const [currency, setCurrency] = useState([])
      const { deleteData, loadingDelete, responseDelete } = useDelete();
      
      useEffect(() => {
        refetchCurrecy()
      }, [refetchCurrecy,update])

      useEffect(() => {
        if(Currency){
          setCurrency(Currency.currency_agent)
        }
        console.log("data currency" , Currency)
      }, [Currency])

        // Delete Customer
        const handleDelete = async (id, name) => {
          const success = await deleteData(`https://travelta.online/agent/settings/currency/delete/${id}`, `${name} Deleted Success.`);
      
          if (success) {
              setCurrency(
              currency.filter((cur) =>
                cur.id !== id
              )
            );
          }
        };

        if(loadingCurrecy){
          return(<>{<StaticLoader/>}</>)
        }

  return (
    <>
       {/* Table Container */}
       <div className="w-full custom-scrollbar overflow-x-auto rounded-lg shadow-md mt-5 ">
  <table className="w-full sm:min-w-0">
    <thead className="w-full">
      <tr className="w-full border-b-2">
        {["#","Name", "Action"].map((heading) => (
          <th
            key={heading}
            className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3"
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {currency.length > 0 ? (
        currency.map((row, index) => (
          <tr 
            key={index} 
            className={`even:bg-gray-100 text-sm sm:text-base hover:bg-gray-200`}
          >
             <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
              {index+1  }
            </td>
            <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
              {row.name || "N/A"}
            </td>

            <td className="min-w-[150px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor">
              <button 
                onClick={() => handleDelete(row.id, row.name)} 
                className="px-3 py-1  text-white rounded-md  transition duration-200"
              >
                <MdDelete color="#D01025" size="24" />
              </button>
            </td>
                
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="2" className="text-center py-4">
            No records found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </>
  )
}

export default CurrencyPage