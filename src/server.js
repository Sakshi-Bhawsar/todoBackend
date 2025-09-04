const express = require("express")  // Here, we are importing the Express library into our project.
const connectDB = require("../src/config/database")
const authRouter = require("../src/routes/auth")
const notesRouter = require("./routes/notes")
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express(); //This line creates an Express application (an object).
require("dotenv").config()
app.use(express.json()) // for parsing application/json  ,req.body Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as express.json() or express.urlencoded().
app.use(cookieParser())  // use  cookieParser to read cookies from req otherwise it show undfined
app.use(cors({origin:"http://localhost:3000",credentials:true}))

// routes for path app.use() is middlware use to mount routes 
app.use("/api/auth",authRouter);
app.use("/api/notes",notesRouter);



app.get("/", (req, res) => {
    res.send("creating backend server for practice--")
})

connectDB().then(() => {

    app.listen(process.env.PORT, () => {
        console.log(`app listen to port ${process.env.PORT}`)
    })
    console.log("db connection sucessful")

}).catch((err) => {
    console.log(err, "Db connection fialed")
})

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);

