import React from 'react'
import { useParams } from 'react-router-dom'

const UpdateCountry = () => {
  const {countryId} = useParams()
  return (
    <div>{`UpdateCountry for ${countryId}`}</div>
  )
}

export default UpdateCountry