const userController = require('../controllers/userController')
const detailController = require('../controllers/detailController'); 
const express = require('express');
const route = express.Router();
const multer    = require('multer');
// const upload    = multer({dest:'uploads/'});
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

const upload = multer({ storage: storage });

route.post('/signup', userController.signUp);
route.post('/signin', userController.signIn);

route.post('/createdetail' , userController.authentication ,upload.single('profilePic') , detailController.createDetail); 
route.put('/updatedetail/:detailId' , userController.authentication ,upload.single('profilePic') , detailController.updateDetail); 
route.delete('/deletedetail/:detailId' , userController.authentication , detailController.deleteDetail); 
route.get('/details' , userController.authentication , detailController.fetchDetails);
route.get('/protected' , userController.authentication , (req , res)=>{
       res.status(200).json({message:"access to user"});
})

module.exports = route;