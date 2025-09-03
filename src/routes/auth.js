const express = require("express")
const { validation } = require("../utilis/validation")
const User = require("../modals/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middlewares/auth")

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
   try {
      console.log(req.body, "request")
      validation(req.body)

      const { userName, email, password } = req.body

      const existingMail = await User.findOne({ email: email })
      if (existingMail) {
         return res.status(400).json({
            sucess: false,
            message: "email already registred "
         })
      }

      // bcrypt  password
      const bcryptPassword = await bcrypt.hash(password, 10)

      //creating instance(document)
      const user = new User({
         userName: userName,
         email: email,
         password: bcryptPassword
      })
      await user.save()
      res.status(200).json({
         sucess:true,
         message: "signUp sucessfull"
      })

   } catch (err) {
      console.log(err, "error while signup")
      res.status(400).json(
         {
            sucess: false,
            message: err.message || "Invalid input data",
         });
   }
})

authRouter.post("/login", async (req, res) => {
   try {
      const { email, password } = req.body
     console.log(email,password,"login")
      const loginUser = await User.findOne({ email: email })
      if (!loginUser) {
         return res.status(404).json({
            message: "user not found please enter valid mail"
         })
      }

      const isMatch = await bcrypt.compare(password, loginUser.password)
      if (isMatch) {
         const token = jwt.sign({ _id: loginUser._id, name: loginUser.userName }, process.env.JWT_SECRET, { expiresIn: "24h" })
         res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
         })
         console.log(token)
         loginUser.password = undefined;
         res.status(200).json({ sucess:true, message: "login sucessful", user: loginUser })

      } else {
         return res.status(400).json({
            sucess:false,
            message: "wrong Password"
         })
      }

   } catch (err) {
      console.log(err, "error while signup")
      res.status(500).send({
         message: "something want wrong",
      })
   }
})

authRouter.post("/logout",auth, async(req,res)=>{
   try{
      res.cookie("token",null,{expires:new Date(Date.now())}).send({
         sucess:true,
         message:"user logOut sucessfully"
      })

   }catch(err){
        console.log(err)
        res.send({sucess:false,message:"something want wrong"})
   }
})

module.exports = authRouter