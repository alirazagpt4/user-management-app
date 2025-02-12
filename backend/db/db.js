const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI; 
// Connect to MongoDB
module.exports = async function connection(){
        await mongoose.connect(MONGODB_URI).then(()=>{
            console.log("Connected to MongoDB...");
        }).catch(err => console.log('error', err));
} 

