import React from "react";
import TitlePage from "../../../Components/TitlePage";
import Hotels from "../../../Pages/SuperAdmin/Hotels/Hotels";
import { Link } from "react-router-dom";
import AddButton from "../../../../src/Components/Buttons/AddButton";
const HotelsLayout = () => {
  
  return (
    <>
      <div className=" flex justify-end mb-5">
        <TitlePage text={"Hotels"}/>
        <Link to="add">
          <AddButton />
        </Link>
      </div>

      <Hotels />
    </>
  );
};

export default HotelsLayout;
