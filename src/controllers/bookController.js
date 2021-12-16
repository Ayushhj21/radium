const bookModel= require("../models/bookModel");
const redis = require("redis");
const rateLimit = require("express-rate-limit");

const { promisify } = require("util")

const redisClient = redis.createClient(
    12212,
    "redis-12212.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
redisClient.auth("aE4ea7vhppPczbE1JjH6Ia50LAq42kqr", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);

const createBook = async function (req, res) {
    try {
        let data = req.body
        
        if (data) {
            let savedData = await bookModel.create(data)
            res.status(200).send({ status: true, msg: savedData })
        } else {
            res.status(400).send({ status: false, msg: "Mandatory body missing" })
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

let getBook = async function (req, res) {
    
    try {
        let bookDetails = await bookModel.findOne({ _id: req.params.bookId })
        if (bookDetails) {
            res.status(200).send({ status: true, msg: "book found", data:bookDetails })
        } else {
            res.status(404).send({ status: false, msg: "No book found" })
        }
        let rateLimit= rateLimit({
            max: 5,
            msg: "Error! You are trying to hit api more than 5 times", 
          })  
    }
    
    catch (err) {
        console.log(err)
        res.send(err)
    }
}






  










module.exports.createBook=createBook
 module.exports.getBook=getBook


