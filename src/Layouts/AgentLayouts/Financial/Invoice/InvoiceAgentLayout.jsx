import React, { useState } from 'react'
import Invoice from '../../../../Pages/Dashboard/AgentDashboard/Financial/Invoice/Invoice'
import AddInvoice from '../../../../Pages/Dashboard/AgentDashboard/Financial/Invoice/AddInvoice'
import TitlePage from '../../../../Components/TitlePage'
import TitleSection from '../../../../Components/TitleSection'

const InvoiceAgentLayout = () => {
     const [update, setUpdate] = useState(false)
  return (
    <>
    {/* <TitlePage text={'Update Invoice'} />
    <AddInvoice  update={update} setUpdate={setUpdate} />
     */}
    <TitleSection text={'Invoice'} />
    <Invoice update={update} setUpdate={setUpdate}/>
    </>
  );
}

export default InvoiceAgentLayout