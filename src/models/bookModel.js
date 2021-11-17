const mongoose=require('mongoose')

const bookSchema= new mongoose.Schema({

//String
//Number
// Boolean
// Array
// Object
// Date
// Buffer
// ObjectId

    bookName: {
        type: String,
        required: true
    },
    prices: {
        indianPrice: String,
        europeanPrice: String,
    },
    year:{
        type:String,
        default:2021
    },
    tags: [String], 
    authorName: String,
    totalPages:String,
    stockAvailable: Boolean,
}, {timestamps: true} )

module.exports = mongoose.model( 'Book', bookSchema ) 



// Intro to Backend Engineering
// FunctionUp
// #Programming #backend #nodejs #bestBookEver #cool #lifeChanging