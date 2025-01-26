import React, { useState } from 'react'
import TitlePage from '../../../../Components/TitlePage'
import { AddWalletPage } from '../../../../Pages/AllPages'

const AddWalletLayout = () => {
  const [update, setUpdate] = useState(false)
  return (
    <>
      <TitlePage text={'Add Wallet'} />
      <AddWalletPage update={update} setUpdate={setUpdate}/>
    </>
  )
}

export default AddWalletLayout