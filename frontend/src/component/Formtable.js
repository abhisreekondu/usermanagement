import React from 'react'
import "../App.css"

import { IoMdCloseCircle } from "react-icons/io";


export const Formtable = ({handleSubmit,handleOnChange,handleclose,rest}) => {
  return (
    <div className="addcontainer">
    <form onSubmit={handleSubmit}>
    <div className="closebtn" onClick={handleclose}><IoMdCloseCircle /></div>
      <label htmlfor="name">Name:</label>
      <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}></input>
      <label htmlfor="email">Email:</label>
      <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email}></input>
      <label htmlfor="mobile">Mobile:</label>
      <input type="number" id="mobile" name="mobile" onChange={handleOnChange} value={rest.mobile}></input>
      <button className="submitbtn" type="submit">Submit</button>
      </form>
   </div>
  )
}

export default Formtable;