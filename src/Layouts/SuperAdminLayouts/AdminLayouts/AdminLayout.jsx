import React from 'react'
import TitlePage from '../../../Components/TitlePage'
import Admin from '../../../Pages/SuperAdmin/Admin/Admin'
import { Link } from 'react-router-dom'
import AddButton from "../../../../src/Components/Buttons/AddButton";
const AdminLayout = () => {
    return (
        <>
          <div className=" flex justify-between">
        <TitlePage text={"Admin"} />
        <Link to="add">
          <AddButton />
        </Link>
      </div>
          <Admin/>
        </>
      )
    }

export default AdminLayout