import React, { useEffect, useState } from 'react'
import { useGet } from '../../../Hooks/useGet';

const Financial = () => {
      const { refetch: refetchInvoice, loading: loadingInvoice, data: DataInvoice } = useGet({ url: 'https://www.travelta.online/api/super/settings/allow_time' });
      const [data,setData] = useState([])
      useEffect(() => {
        refetchInvoice()
      }, [refetchInvoice])

      useEffect(() => {
        if(DataInvoice){
            setData(DataInvoice);
        }
        console.log("data is",DataInvoice)
      }, [DataInvoice])
    
  return (
    <div>
        innnn
    </div>
  )
}

export default Financial