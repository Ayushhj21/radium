const mongoose=require('mongoose')

const orderDocumentSchema=new mongoose.Schema({
    userId:{
      type:mongoose.Schema.Types.ObjectId,
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
    },

    amount:Number,
    isFreeAppUser:{
        type:Boolean,
    },
    Date:{
        type:Date
    },
    
}, {timestamps: true} )
module.exports=mongoose.model("orderDocument",orderDocumentSchema)