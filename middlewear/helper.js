const bcrypt = require('bcryptjs')


exports.hashpassword = async(password)=>{
    try{
         const round = 10;
         const hashedpassword = await bcrypt.hash(password,round);
         return hashedpassword;
    } catch(err){
        console.log(err)
    }
}


//we copare the user password and the database password 
exports.compare = async(password,hashingpassword)=>{
    return bcrypt.compare(password,hashingpassword);
}