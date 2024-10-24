require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Database connected");  
    }
    catch(error){
        console.log(error.messsage);
    }
};

module.exports = connectDB;
  