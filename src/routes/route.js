const express = require('express');
const router = express.Router();

const commonMW=require("../middleware/commonMW")
const userController=require("../controllers/userController");
const productController=require("../controllers/productController");
const orderController=require("../controllers/orderController")




router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});



router.post('/createProduct',productController.makeproduct);
router.post('/createUser',commonMW.mid1, userController.createUser);
router.post('/createOrder',orderController.createorder);







module.exports = router;