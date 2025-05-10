import React from 'react'
import {useParams } from "react-router-dom"
const NotesDetail = () => {
   let params = useParams()
  console.log(params.id)
  return (
    <div>
      THis is notes  detail
    </div>
  )
}

export default NotesDetail
