const BookModel= require("../models/bookModel.js")
const mongoose= require("mongoose")

const createBook = async function (req, res) {
    const book= req.body
    let savedBook= await BookModel.create(book)
    res.send({msg: savedBook})
}


const getBooksData= async function (req, res) {
let allBooks= await BookModel.find()
res.send({msg:allBooks})
}

const createBooksColl= async function(req,res){
    var data=req.body
    let savedData=await BookModel.create(data)
    res.send({msg: savedData})
}

        // let allBooks= await BookModel.find().count()
        // let allBooks= await BookModel.find( { sales: 0 } )
        // let allBooks= await BookModel.find( { sales: 0 } ).count()

        //and is when all the conditions have to be true
        // or is when even if any condition is true , it is included
        // let allBooks= await BookModel.find( { sales: 0 , isPublished : false} )
        // let allBooks= await BookModel.find(  {  $or: [ {sales: 0} , {isPublished : false} ]  } )  
        // let allBooks= await BookModel.find(  {  $or: [ {sales: 0} , {isPublished : false} ]  }  ).count()             
        //  allBooks= await SalesModel.find({phoneName: "OnePlus7", createdAt: {$gt:"21-03-1999"}  }  ).count()             


        // let allBooks= await BookModel.find( {  sales:   { $gt: 10}     }  )
        // let allBooks= await BookModel.find( {  sales:   { $lt: 10}     }  )

        
        // let allBooks= await BookModel.find( {  sales:   { $gte: 10   }    }  )
        // let allBooks= await BookModel.find( {  sales:   { $lte: 10   }    }  )

        // let allBooks= await BookModel.find( {  sales:   { $ne: 0   }    }  )
        // let allBooks= await BookModel.find( {  sales:   { $in: [ 0, 100, 4 , 1 ,2 ,3]   }     }  )
        // let allBooks= await BookModel.find( {  sales:   { $nin: [ 0, 100, 4 , 1 ,2 ,3]   }     }  )


        // let allBooks= await BookModel.find( ).sort(  { bookName: 1 } ) //ascending sort

        // let allBooks= await BookModel.find( {  sales:   { $gt: 0   }    }  ).sort(  { bookName: -1 } ) //descending sort :-1

        // let allBooks= await BookModel.find( {  sales:   { $gt: 0   }    }  ).sort(  { bookName: 1 } ).limit(2) //limit will give only next 2 elements

        // let allBooks= await BookModel.find( {  sales:   { $gt: 0   }    }  ).sort(  { bookName: 1 } ).limit(2).skip( 3 ) //SKIP is used for pagination
        // let allBooks= await BookModel.find( {  sales: { $gt: 0   }  } ).select( { bookName: 1, sales: 1, _id: 0 } )


        // let allBooks= await BookModel.findById(     mongoose.Types.ObjectId('61922aacac5fa8b15518d590') )




        // REGULAR EXPRESSIONS(regex) : 

        // let allBooks= await BookModel.find( {  bookName: /.*Node.*/i   } ) //has the word Node 
        // let allBooks= await BookModel.find( {  bookName: /Node$/i   } ) //ends with Node
        // let allBooks= await BookModel.find( {  bookName: /^Intro/i   } ) //starts with Node

        //let a=5
        //let b=6
        //let c=  a+b
        //console.log(c)



        
       // let allBooks= await BookModel.find( { "prices.europeanPrice" : "4Pounds"} ) // without await, this line will start to get executed..but the server will move to next line without COMPLETING the execution..this might cause code to break in the next few lines
        // hence we use await to ask the program to wait for the completion of this line..till this line completes, execution wont move to next line

        // await is typically used at 2 places:
            //- intearacting with database
            //- calling another service (axios)..will be covered next week


        //NOTE: await can not be used inside array functions like forEach / map / filter etc..self discovery and do post 

        //res.send({msg: allBooks})        
   // }

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData