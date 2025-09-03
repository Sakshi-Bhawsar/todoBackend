const Notes = require("../modals/Notes")
const mongoose = require("mongoose")

const userNotes = async (req, res) => {
  try {
    const user = req.user;
    const userNotes = await Notes.find({ userId: user._id },) // include title & desc, exclude _id
    
    console.log(userNotes)
    res.status(200).send({ sucess: true, notes: userNotes })

  } catch (err) {
    console.log(err)
    res.status(500).send("something want wrong")
  }
}

const createNotes = async (req, res) => {
  try {
    const user = req.user;
    const allowed = ['title', 'des']

    const isAllowed = Object.keys(req.body).every(item => allowed.includes(item))

    if (!isAllowed) {
      return res.status(400).json({
        sucess: false,
        meassage: "filed error"
      })
    }

    const { title, des } = req.body
    if (!title || !des) {
      return res.status(400).json({
        sucess: false,
        meassage: "title and descripation is required"
      })
    }
    // creating instance (document)
    const notes = new Notes({
      userId: user._id,
      title: title,
      des: des
    })
    await notes.save();
    res.status(200).json({
      sucess: true,
      meassage: "notes created sucessfully"
    })

  } catch (err) {
    console.log(err)
    res.status(500).send("err while creating notes")
  }

}

const updateNotes = async (req, res) => {
  try {
    const user = req.user;
    const { title, des } = req.body
    const noteId = req.params.noteId

    if (!noteId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid Note ID" });
    }
    const existNoteId = await Notes.findById(noteId);

    if (!existNoteId) {
      return res.status(404).send("notes not found");
    }
    console.log(user._id)
    console.log(existNoteId.userId)
    if (existNoteId.userId.toString() != user._id.toString()) {
      return res.status(401).send("not valid user")
    }

    await Notes.findByIdAndUpdate(noteId , {  title, des },  { new: true, runValidators: true })
    res.status(200).json({ sucess: true, meassage: "notes updated sucessfully" })

  } catch (err) {
    console.log(err);
    res.status(500).send("something want wrong")
  }
}

const deleteNotes = async (req, res) => {
  const user = req.user;
  const noteId = req.params.noteId;
  if (!noteId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, message: "Invalid Note ID" });
  }
  const findNotes = await Notes.findById(noteId);

  if (!findNotes) {
    res.status(401).json({ sucess: false, meassage: "notes not found" })
  }

  if(findNotes.userId.toString() !=user._id.toString()){
    return res.status(401).send("unauthorized user")
  }

  await Notes.findByIdAndDelete(noteId)
  res.status(200).send({sucess:true,meassage:"notes deleted sucessfully"})

}

module.exports = { userNotes, createNotes, updateNotes,deleteNotes }