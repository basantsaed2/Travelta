import React from 'react'
import { useLocation } from 'react-router-dom';

const InvoiceAccount = () => {
    const location = useLocation();
    const item = location.state?.item;
  return (
    <div>InvoiceAccount</div>
  )
}

export default InvoiceAccount