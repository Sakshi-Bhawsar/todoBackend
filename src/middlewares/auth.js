const jwt = require('jsonwebtoken')
const User = require('../modals/User')

const auth = async(req,res,next)=>{
    // console.log(req,"res--")
   const token = req.cookies.token;

   if(!token){
    return res.status(401).send({msg:"unauthorized user"})
   }
   const decode = await jwt.verify(token,process.env.JWT_SECRET)
   const id = decode._id
  const loginUser =  await User.findById(id);
  if(!loginUser){
    return res.status(400).send("user not valid")
  }
   req.user=loginUser;
   next()
}

module.exports = auth;