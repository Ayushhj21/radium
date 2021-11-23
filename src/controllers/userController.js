const UserDocument= require("../models/userDocumentModel")



const createUser=async function(req,res){
   var data=req.body
   
   data.freeAppUser=req.isFreeAppUser
 let allUsers=await UserDocument.create(data)
   res.send({data:allUsers})
}






module.exports.createUser=createUser