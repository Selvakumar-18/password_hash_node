const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userModel = require('./model/register.model')

const app=express()
port = 5000;

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/register",{useUnifiedTopology:true}).then(() => {
    console.log('db onnected')
})
.catch((e) => {
    console.log(e.message)
})

app.post('/register',async(req,res)=>{
    try
    {
        let userObj = new userModel(req.body)

        userObj.setPassword(req.body.password);

        let resObj = await userObj.save()
        console.log("Register Done...")
        res.send(resObj)
    }
    catch(e)
    {
        console.log(e)
    }
})


app.post('/register/login',async (req,res)=>
{

    const login = await userModel.findOne(req.body)
  
    if(login.validPassword(req.body.password))
    {
      console.log("Login Done...");
      res.json({status:'ok'})
    }
    else
    {
      console.log("else executed");  
      return res.status(400).send({ message: 'This is an error!'});
    } 

})
app.listen(port,()=>{
    console.log(`Server is working in this port ${port}`)
})