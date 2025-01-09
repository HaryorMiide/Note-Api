require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/config");
const noteRoutes = require("./routes/note");

const Note = require("./model/Note");
const errorHandlerMiddleware = require("./middleware/errorHandler");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/welcome", (req, res) => {
  res.send("Hello, Welcome to the world of express");
});

server.use("/api/v1/notes", noteRoutes);
server.use(errorHandlerMiddleware);
const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

start();
