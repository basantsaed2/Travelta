import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { EditRoomPage } from "../../../../../Pages/AllPages";

const EditRoomLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
        <>
        <EditRoomPage update={update} setUpdate={setUpdate}/>
        </>
    );
    }

export default EditRoomLayout;
