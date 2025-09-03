const mongoose= require("mongoose")

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true,
    },
    password:{
        type:String,
        require:true
    },
    photoUrl:{
        type:String
    },
    about:{
        type:String
    }
})

module.exports = mongoose.model("User",userSchema)