import React, { useState } from 'react'
import TitlePage from '../../../../../Components/TitlePage'
import { RoomPage } from "../../../../../Pages/AllPages";
import { Link } from 'react-router-dom'
import AddButton from '../../../../../Components/Buttons/AddButton'
const RoomLayout = () => {
    const [update, setUpdate] = useState(false)
    return (
        <>
        <div className='flex justify-between items-center'>
        <TitlePage text={'Room List Table'} />
            <Link to='add'>
            <AddButton />
            </Link>
        </div>
        <RoomPage update={update} setUpdate={setUpdate}/>
        </>
    );
    }

export default RoomLayout;