import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { RoomPage } from "../../../../../Pages/AllPages";

const RoomLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
        <>
        <TitlePage text={'Room List Table'} />
        <RoomPage update={update} setUpdate={setUpdate}/>
        </>
    );
    }

export default RoomLayout;
