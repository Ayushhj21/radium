const axios = require("axios");

///Q1get weather of London from http://api.openweathermap.org/data/2.5/weather?q=London&appid=<useYourOwnAppId> 


const getLondonWeather = async function (req, res) {
    try {
        let options = {
            method: "get",
            url: ` http://api.openweathermap.org/data/2.5/weather?q=London&appid=9f952a6ed885d525fc2dbf914adea6de`

        }

        let london = await axios(options)
        let fulldetail = london.data
        res.status(200).send({ detail: fulldetail })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Error occured" });
    }

};

//Q2 then change the above to get the temperature only( of London)
	

const londonTemp = async function (req, res) {
    try {
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=London&appid=9f952a6ed885d525fc2dbf914adea6de`
        };
        let london = await axios(options)
        res.status(200).send({ msg: "Successfully got the data", "data": london.data.main.temp });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Error occured" });
    }
};

//Q3 Sort the cities  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] in order of their increasing temperature 
const sortCities = async function (req, res) {
    try {
        const cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let ObjOfCities = [];

        for (let i = 0; i < cities.length; i++) {
            let obj = { city: cities[i] }

            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=9f952a6ed885d525fc2dbf914adea6de`

            }
            let response = await axios(options);
            console.log(response.data.main.temp)
            temp = response.data.main.temp
            obj.temp = response.data.main.temp;
            ObjOfCities.push(obj);
        }
        let citiesTempOrder = ObjOfCities.sort(function (a, b) { return a.temp - b.temp })
        console.log(citiesTempOrder)
        res.status(200).send({ msg: "Successful sorted the cities in increasing order of their temp", data: citiesTempOrder })
    }

    catch (err) {
        res.status(500).send({ msg: "Error occured" })
    }
}



module.exports.getLondonWeather = getLondonWeather
module.exports.londonTemp = londonTemp
module.exports.sortCities = sortCities