const { model } = require('mongoose');
const detailModel = require('../models/detailModel');



// console.log(detailModel);

const createDetail = async(req, res) =>{
    const userId = req.user.id;
    const { phone , role } = req.body;
   
    console.log("Body Data:", req.body); // Debugging ke liye
    console.log("Uploaded File:", req.file); // Check karo file aa rahi hai ya nahi

    // File ka path set karo
    const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

    const detail = await detailModel.create({
        userId:userId,
        phone:phone,
        role:role,
        profilePic:profilePic

    });
    return res.status(201).json({
        message:"Details Created Successfully",
        detail:detail
    })
}

const fetchDetails = async (req , res)=>{
    const fetchdetails = await detailModel.find().populate('userId');
    return res.status(200).json({
        fetch:fetchdetails
    });
}


const updateDetail = async (req , res) =>{
    const userId = req.user.id;
    const {detailId} = req.params;
    const {phone , role } = req.body;
    const profilePic = req.file ? `/uploads/${req.file.filename}` : null;
    const updateDetail = await detailModel.findOneAndUpdate({_id:detailId , userId:userId},{
        phone:phone,
        role:role,
        profilePic:profilePic
    },{
        new:true,
        runValidators:true
    })

    if(!updateDetail){
        return res.status(404).json({message:"Detail not found"})
    }

    return res.status(200).json({
        message:"Detail updated successfully",
        detail:updateDetail
    });
}

const deleteDetail = async (req, res) => {
    const userId = req.user.id;
    const {detailId} = req.params;
    const deleteDetail = await detailModel.findOneAndDelete({_id:detailId, userId:userId});
    
    if(!deleteDetail){
        return res.status(404).json({message:"Detail not found"})
    }
    
    return res.status(200).json({
        message:"Detail deleted successfully",
        detail:deleteDetail
    });

}


module.exports = {createDetail , fetchDetails , updateDetail , deleteDetail}

 
