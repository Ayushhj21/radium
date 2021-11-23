const ProductDocument=require("../models/productDocumentModel")


const makeproduct=async function(req,res){
    let value=req.body
    let savedData=await ProductDocument.create(value)
    res.send({msg:savedData})
}



module.exports.makeproduct=makeproduct