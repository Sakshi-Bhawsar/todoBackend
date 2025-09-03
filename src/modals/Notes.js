const mongoose = require("mongoose")

const userNotes = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'  // ref: 'User' → tells Mongoose: "this ObjectId comes from the User model (collection)".
    },
    title:{
       type:String,
       required: true,
    },
    des:{
        type:String,
    }
})

module.exports =  mongoose.model("Notes",userNotes)