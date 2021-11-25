const express = require('express');
const router = express.Router();

const weatherController= require("../controllers/weatherController")

router.get("/getWeather",weatherController.getLondonWeather)
router.get("/getLondonTemp",weatherController.londonTemp)
router.get("/sortingCities",weatherController.sortCities)


module.exports = router;