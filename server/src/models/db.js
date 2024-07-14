const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(() => {
        console.log("MongoDB Connected...");
    }).catch((err) => {
        console.log("MongoDB connection error: ", err);
    });