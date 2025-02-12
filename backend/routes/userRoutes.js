const userController = require('../controllers/userController')
const express = require('express');
const route = express.Router();

route.post('/signup', userController.signUp);
route.post('/signin', userController.signIn);

route.get('/protected' , userController.authentication , (req , res)=>{
       res.status(200).json({message:"access to user"});
})

module.exports = route;