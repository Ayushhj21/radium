const express = require('express');
const router = express.Router();


const bookController=require("../controllers/bookController");




router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});



router.post('/books',bookController.createBook);
router.get('/books/:bookId', bookController.getBook);








module.exports = router;