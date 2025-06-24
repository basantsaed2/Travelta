import React from 'react'
import { useParams } from 'react-router-dom'

 const UpdateMealPlan = () => {
    const {mealplanId} = useParams()
  
  return (
    <div>{`Update meal plan for ${mealplanId}`}</div>
  )
}
export default UpdateMealPlan