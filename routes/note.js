const express = require("express");
const Note = require("../model/Note");
const router = express.Router();
const { addNote ,getNotes,getNote,editNote, deleteNote} = require("../Controller/note")



router.get("/",getNotes)
router.get("/:id",getNote)
router.put("/:id/edit",editNote)
router.delete("/:id/delete",deleteNote)
router.post("/add",addNote);


module.exports = router;
// const makeRequest = (api) => {
//   request = {
//     method: "post",
//     body: { title: "Hello WOrld", content: "This is my first note" },
//     api,
//   };
// };