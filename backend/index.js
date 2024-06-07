const express= require('express')
const cors=require('cors')
const mongoose= require('mongoose')
const { Timestamp } = require('mongodb')
const app= express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT||8080


const schemaData=mongoose.Schema(
    {
        name:String,
        email:String,
        mobile:String,

    },{
        Timestamp:true
    }
)



const usermodel=mongoose.model("user",schemaData)


//read
app.get("/",async(req,res)=>{
    const data= await usermodel.find({})

    res.json({success:true,data:data})
})

//create data
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data=await usermodel.create(req.body)
    res.send({success:true,message:"data saved",data:data})
})

//update data
app.put("/update",async(req,res)=>{

    const {_id,...rest}=req.body
    const data=await usermodel.updateOne({_id:_id},rest)
    res.send({success:true,message:"data updated",data:data})

})

//delete
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const data=await usermodel.deleteOne({_id:id})
    res.send({success:true,message:"data deleted",data:data})
})


mongoose.connect("mongodb+srv://admin:Abhi_2004@backenddb.7wgh4tq.mongodb.net/?retryWrites=true&w=majority&appName=backenddb")
.then(()=>{
    console.log("connected to database")
    app.listen(PORT,()=>{
        console.log("server is running")
    })
    
})
.catch((err)=>{
    console.log(err)
})







