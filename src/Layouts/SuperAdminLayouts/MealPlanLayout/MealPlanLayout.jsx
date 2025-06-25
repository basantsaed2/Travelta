import React from 'react'
import TitlePage from "../../../Components/TitlePage";
import Mealplan from '../../../Pages/SuperAdmin/MealPlan/MealPlan'
import { Link } from "react-router-dom";
import AddButton from "../../../../src/Components/Buttons/AddButton";
const MealPlanLayout = () => {
 
  return (
    <>
      <div className="flex justify-end mb-5 ">
        <TitlePage text={"Meal Plan"}/>
        <Link to="add">
          <AddButton />
        </Link>
      </div>

      <Mealplan />
    </>
  );
};


export default MealPlanLayout