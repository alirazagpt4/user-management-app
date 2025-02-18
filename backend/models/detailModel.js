const connection = require('../db/db');
const mongoose  = require('mongoose');
connection();

const detailSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId ,
         ref:'user' , required:true},
    phone :{type:Number , required:true},
    role  :{type:String , enum:['user' , 'admin'] , required:true},
    profilePic:{type:String , required:false}
})

const detailModel = mongoose.model('detail',detailSchema );

module.exports = detailModel;