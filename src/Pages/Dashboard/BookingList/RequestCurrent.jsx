import React, { useEffect, useState } from 'react'
import { useGet } from '../../../Hooks/useGet';

const RequestCurrent = ({id}) => {
    const { refetch: refetchData, loading: loadingData, data: Data} = useGet({url:`https://travelta.online/agent/booking/special_request/${id}`});
    const [data,setData] = useState([])

    useEffect(() => {
    refetchData()
    }, [refetchData])

    useEffect(() => {
        if(Data){
            setData(Data)
        }
        console.log("data" , Data)
        }, [Data])
  return (
    <div>RequestCurrent</div>
  )
}

export default RequestCurrent