const express = require('express');
const router = express.Router();
const userModel= require("../models/userModel")
const mid1=require("../middlewares/mid1")

const UserController= require("../controllers/userController")


router.post('/users',UserController.createUser);
router.post('/login',UserController.validateUser)
router.get('/users/:userId',mid1.tokenCheck,UserController.fetchDetails)
router.put('/users/:userId',mid1.tokenCheck,UserController.updatedDetails)








module.exports = router;