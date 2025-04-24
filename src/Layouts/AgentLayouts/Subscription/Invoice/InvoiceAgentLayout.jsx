import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import TitleSection from '../../../../Components/TitleSection'
import { InvoicePage } from '../../../../Pages/AllPages'
const InvoiceAgentLayout = () => {
     const [update, setUpdate] = useState(false)
  return (
    <>
    {/* <TitleSection text={'Invoice Table'} /> */}
    <InvoicePage update={update} setUpdate={setUpdate}/>
    </>
  );
}

export default InvoiceAgentLayout