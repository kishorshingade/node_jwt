
const { hashpassword ,compare } = require('../middlewear/helper');
const Usermodel = require('../models/userModels')

//sign up
exports.register = async (req,res)=>{
    try{
        const {name,email,password,contact,address} = req.body;
        if(!name || !email || !password || !contact || !address){
            //if empty
            return  res.status(400).send('please fill all your Feilds');
        }else{
            //if user exists
            const userExists = await Usermodel.findOne({email})
            if(userExists){
                return res.status(200).send('user already exists, please Log in');
            }
        }
        //new user we use hash method of decrptjs
        const hash = await hashpassword(password);
        const newUser = new Usermodel({name,email,contact,password:hash,address});
        const usersave = await newUser.save();
        res.status(200).send({message:'user Registerd Successfully',usersave})
    } catch(err){
        res.status(400).send({message:'user Register Failed'},err);
    }
}

//login 

exports.login = async(req,res)=>{
    try{
        //check both feilds
        const  {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send('please fill your all feilds')
        }else{
           const userexists = await Usermodel.findOne({email})
           //if user not exists
           if(!userexists){
                 return res.status(400).send('user does not exist,please sign up')
           }
           //used bycriptjs for hashing and comparing the paaword
           const match = await compare(password,userexists.password)
           //we find match password and the password inside exist user.password
           if(!match){
            //if user enter the wrong information
            res.status(400).send({message:"invalid password"})
           } 
           // if user match we have to generate the token 
           //we define token inside a user schema 
           //we call token as genertetoken() we have to define in user schema
           const token = await  userexists.generatetoken();
 
           res.status(200).send({message:"user login successfully",token,userexists})

        }
    } catch(err){
        res.status(400).send({message:"User login failed",err})
    }
}

