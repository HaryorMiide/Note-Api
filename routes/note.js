const express = require("express");
const router = express.Router();
const {
  addNote,
  getNotes,
  getNote,
  editNote,
  deleteNote,
} = require("../Controller/note.js");
const { validationRules, validate } = require("../utils/validation.js");

router.post("/add", validationRules(), validate, addNote);
router.get("/", getNotes);
router.get("/:id", getNote);
router.put("/:id", validationRules(), validate, editNote);
router.delete("/:id", deleteNote);

module.exports = router;
