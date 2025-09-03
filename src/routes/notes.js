const express = require('express')
const {userNotes,createNotes, updateNotes, deleteNotes} = require('../controllers/userNotes')
const auth = require("../middlewares/auth")

const notesRouter = express.Router()


notesRouter.get("/get",auth,userNotes)
notesRouter.post("/create",auth,createNotes)
notesRouter.put("/update/:noteId",auth,updateNotes)
notesRouter.delete("/delete/:noteId",auth,deleteNotes)

module.exports = notesRouter;