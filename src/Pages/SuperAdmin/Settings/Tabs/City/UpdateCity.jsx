import React from 'react'
import { useParams } from 'react-router-dom'

const UpdateCity = () => {
  const {cityId} = useParams()
  return (
    <div>{`UpdateCity for ${cityId}` }</div>
  )
}

export default UpdateCity