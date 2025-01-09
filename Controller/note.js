const Note = require("../model/Note");
const { StatusCodes } = require("http-status-codes");
const { body, validationResult } = require("express-validator");

const addNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    await note.save();
    res.status(StatusCodes.CREATED).json({
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Note(s) added successfully",
      data: note,
    });
  } catch (error) {
    console.log(error.message); //for developers
    next(error);
  }
};

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "",
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};
const getNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: true,
        statusCode: StatusCodes.OK,
        message: "Note not present",
        data: {},
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

const editNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Cannot find note with the ID ${id}",
        data: {},
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "Note updated Successfully",
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Note not present",
        data: {},
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: "Note deleted Successfully",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addNote, getNotes, getNote, editNote, deleteNote };
