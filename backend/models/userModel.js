const  mongoose = require('mongoose');
const connection = require('../db/db')
connection();


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

 const userModel = mongoose.model('user' , userSchema);
 module.exports = userModel;