import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGet } from '../../../../Hooks/useGet';
import StaticLoader from '../../../../Components/StaticLoader';
import AutoPDFGenerator from '../../../../Components/Agent Components/AutoPDFGenerator';

const BookingInvoice = () => {
    const { id } = useParams()
    const { refetch: refetchInvoice, loading: loadingInvoice, data: paymentInvoice, } = useGet({ url: `https://travelta.online/agent/accounting/booking/invoice/${id}` });
    const [bookingPayment, setData] = useState(null)
    useEffect(() => {
        refetchInvoice()
    }, [refetchInvoice])

    useEffect(() => {
        if (paymentInvoice) {
            setData(paymentInvoice.booking_payment)
        }
        console.log("data", paymentInvoice)
    }, [paymentInvoice])
    if (loadingInvoice) {
        return <StaticLoader />
    }
    return (

        <div className="overflow-x-auto p-4">
            <AutoPDFGenerator bookingData={paymentInvoice} />
        </div>
    )
}

export default BookingInvoice