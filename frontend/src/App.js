
import { useState, useEffect } from 'react';
import Formtable  from './component/Formtable';
import axios from "axios"
import './App.css';

axios.defaults.baseURL="http://localhost:8080/"



function App() {


const [addSection,setaddsection]=useState(false);


const [FormData,setFormData]=useState({
  name:"",
  email:"",
  mobile:"",
})


const [FormeditData,setFormDataedit]=useState({
  name:"",
  email:"",
  mobile:"",
  _id:""
 
})



const [dataList,setDataList]=useState([])

const[editsection,seteditsection]=useState(false)

const handleOnChange=(e)=>{
  const {value,name}=e.target
  setFormData((preve)=>{
    return{
      ...preve,
      [name]:value
    }
  })
}

const handleSubmit=async(e)=>{
e.preventDefault();
const data=await axios.post("/create",FormData)
console.log(data)
if(data.data.success)
  {
    setaddsection(false);
    alert(data.data.message)
    getfetchData(); 
    setFormData({
      name:"",
      email:"",
      mobile:""
    })
  }
}




const getfetchData=async()=>{
 
  const data=await axios.get("/")
  console.log(data)
if(data.data.success)
  {
    setDataList(data.data.data)
  }
}


useEffect(()=>{
  getfetchData()
},[])



const handleDelete=async(id)=>{
  const data=await axios.delete(`/delete/${id}`)
  
 
  if(data.data.success)
    {
      getfetchData();
      alert(data.data.message)
    }
  }
 

const handleupdate=async(e)=>{
e.preventDefault()
const data=await axios.put("/update",FormeditData)
console.log(data)
if(data.data.success)
  {
    getfetchData();
    alert(data.data.message)
    seteditsection(false)
  }
}




const handleeditonChange=async(e)=>{
  const {value,name}=e.target
  setFormDataedit((preve)=>{
    return{
      ...preve,
      [name]:value
    }
  })
}



const handleEdit=(e)=>{
  setFormDataedit(e)
  seteditsection(true)
}

  return (
     <div className="container">
      <button className="btn" onClick={()=>setaddsection(true)}>ADD</button>
      {
        addSection && (
         <Formtable
         handleSubmit={handleSubmit}
         handleOnChange={handleOnChange}
         handleclose={()=>setaddsection(false)}
         rest={FormData}/>
        )
       
      }
  {
    editsection && (
      <Formtable
      handleSubmit={handleupdate}
      handleOnChange={handleeditonChange}
      handleclose={()=>seteditsection(false)}
      rest={FormeditData}/>
    )
  }


      <div className="tablecontainer">

      {dataList.length === 0 ? (
          <p className="no-data">No data found</p>
        ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>EmailID</th>
              <th>Mobile number</th>
              
            </tr>
          </thead>
          <tbody>
  {
  
  dataList.map((e) => (
    <tr key={e._id}>
      <td>{e.name}</td>
      <td>{e.email}</td>
      <td>{e.mobile}</td>
      <td>
                <button className='btn btn-edit' onClick={()=>handleEdit(e)}>Edit</button>
                
                <button className='btn btn-delete' onClick={() => handleDelete(e._id)}>Delete</button>
              </td>
    </tr>
  ))}
</tbody>
        </table>

        )}
      </div>
      
      </div>

  );
}

export default App;
