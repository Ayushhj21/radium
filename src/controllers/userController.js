const userModel= require("../models/userModel.js")
const jwt = require('jsonwebtoken')
//Q1 To create a User
const createUser= async function (req, res) {
    let data= req.body
    let savedData= await userModel.create(data)
    res.send({msg: savedData})    
}

//Q2 To validate the credentials of the user

const validateUser=async function(req,res){
    let userName=req.body.name
    let userPassword=req.body.password
    let users=await userModel.findOne({ name: userName, password: userPassword, isDeleted: false })
    if(users){
        let payload={_id:users._id}
        let tokenGeneration=jwt.sign(payload,'radium')
        res.send({ status: true, data:users,token:tokenGeneration})
    }else{
        res.send({status: false, msg:"Invalid Credentials"})
    }
};

//Q3 return the user's details if found else return a response with an error message

const fetchDetails= async function(req,res){
    if(req.decodedToken._id == req.params.userId){
    let userDetails = await userModel.findOne({ _id: req.params.userId, isDeleted: false })

    if (userDetails) {
        res.send({ status: true, data: userDetails })
    } else {
        res.send({ status: false, message: 'User not found' })
    }
}
};


//Q4 Update a user's email recieved in the request body. Before actually 
//updating the details ensure that the userId recieved is valid which means a valid user with this id must exist,
//else return a response with an error message


const updatedDetails = async function (req, res) {
    let emailupdate = req.body.email
    if(req.decodedToken._id === req.params.userId){
        let details = await userModel.findOneAndUpdate({ _id: req.params.userId }, { $set: { email: emailupdate } }, { new: true })
        if (details) {
            res.send({ status: true, data: details })
        } else {
            res.send({ status: false, data: "user not found" })
        }
   
    }else{
res.send({msg:"token id and param id does not match"})
    }
   
}




module.exports.createUser= createUser
module.exports.validateUser=validateUser
module.exports.fetchDetails=fetchDetails
module.exports.updatedDetails=updatedDetails
