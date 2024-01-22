const Usermodel = require('../models/userModels') 
const jwt = require('jsonwebtoken')
require('dotenv').config()


//Userlogin auth 
exports.authlogin = (req,res,next)=>{
    try{
      const decode = jwt.verify(req.headers.authorization,process.env.key)
      req.user = decode
      next()
    }catch(err){
      console.log(err)
      res.status(400).send({message:"plese log in first"})
    }
}

//userAdmin panel
exports.Admin = async(req,res)=>{
    try{
  const user = await Usermodel.findById(req.user._id)
  if(user.role!= 1){
      return res.status(400).send({message:"Unauthorized Acesss"})
  }else{
    next()
  }
    }catch(err){
      console.log(err)
      res.status(400).send({message:"Unauthorized Acesss"})
    }
}