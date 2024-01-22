const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const key = process.env.key

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    contact:{
         type:Number,
         require:true
    },
     address:{
        type:String,
        require:true
    },
    role:{
        type:Number,
        default:0
    },
})

// Token generate 
//we use here jwt token (jsonwebtoken)
//
userSchema.methods.generatetoken = function(){
    try{
         let usertoken  = jwt.sign({_id:this._id},key)
         return usertoken
    } catch(err){
        console.log(err)
    }
}

const Usermodel = mongoose.model("User",userSchema)
module.exports = Usermodel