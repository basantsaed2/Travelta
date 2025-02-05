import React, { useState } from 'react'
import Invoice from '../../../../Pages/SuperAdmin/Financial/Invoice/Invoice'
import TitlePage from '../../../../Components/TitlePage'
import AddInvoice from '../../../../Pages/SuperAdmin/Financial/Invoice/AddInvoice'

const InvoiceLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
    <TitlePage text={'Update Invoice'} />
    <AddInvoice  update={update} setUpdate={setUpdate} />
    
    <TitlePage text={'Invoice'} />
    <Invoice update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default InvoiceLayout