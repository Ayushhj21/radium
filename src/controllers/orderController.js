const orderDocument= require("../models/orderDocumentModel");
const productDocumentModel = require("../models/productDocumentModel");
const userDocumentModel = require("../models/userDocumentModel");




const createorder=async function(req,res){
    //user validation
   
    let userId = req.body.userId
    let productId = req.body.productId
    //let appHeader=req.headers['isfreeapp']
    let appTypeFree=req.isFreeAppUser
    // if(appHeader==='false'){
    //     appTypeFree=false
    // }else{
    //     appTypeFree=true
    // }
    let orderAmount
    let orderDate=Date()
    
    let user=await userDocumentModel.findById(userId);
    if(!user){
        return res.send({msg:"User doesn't exist.Please provide a valid userid"})
    }
     //product validation
    let product=await productDocumentModel.findById(productId);
    if(!product){
        return res.send({msg: "Product doesn't exist. Please provide a valid productId"})
    }

///Balance of user validation
    if(!appTypeFree && user.balance < product.price) {
        return res.send({msg: "User doesn't have enough balance to buy the product"})
    }
    

    if(appTypeFree){
        orderAmount=0
    }else{
        orderAmount=product.price      //paid app version
    }

    let orderDetails = {
        userId: userId,
        productId: productId,
        amount: orderAmount,
        isFreeAppUser: appTypeFree, 
        date: orderDate
    }

    let orderCreated = await orderDocument.create(orderDetails)


    if(!appTypeFree){
        await userDocumentModel.findOneAndUpdate({_id:userId},{balance:user.balance-product.balance})
        
    }


    res.send({data: orderCreated})
}


  










module.exports.createorder=createorder


