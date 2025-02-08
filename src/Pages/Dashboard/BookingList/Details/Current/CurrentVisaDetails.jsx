import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';

const CurrentVisaDetails = () => {
    const {current_id}= useParams()
    const { refetch: refetchDetails, loading: loadingDetails, data: dataDetails } = useGet({
            url: `https://travelta.online/agent/booking/details/${current_id}`,
    });
    const [data,setData] = useState([])
    useEffect(() => {
        refetchDetails()
    }, [refetchDetails])

    useEffect(() => {
        if(dataDetails){
          setData(dataDetails)
        }
        console.log('data ', dataDetails)
    }, [dataDetails])
  return (
    <div>CurrentVisaDetails</div>
  )
}

export default CurrentVisaDetails