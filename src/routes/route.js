const express = require('express');
const router = express.Router();

const cryptoController= require("../controllers/cryptoController")


router.get("/getCryptoCoins",cryptoController.getCryptoCoins)


module.exports = router;