const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel")

const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.post('/createUser',  UserController.createUser  );
router.get('/getAllUsers',  UserController.getUsersData  );

router.post('/createBook',  BookController.createBook  );
router.get('/getAllBooks',  BookController.getBooksData  );

router.post('/createBooksCollection', BookController.createBooksColl);
//router.get('/getAllBooks',  BookController.getBooksData  );


module.exports = router;