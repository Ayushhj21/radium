const axios = require("axios");
const cryptoModel = require("../models/cryptoModel");
const mongoose=require('mongoose')

const getCryptoCoins = async function (req, res) {
   // let head = req.headers['Authorization']
    try {

        let options = {
            method: "get",
            url: `http://api.coincap.io/v2/assets`,
            headers:{
                'Authorization':'Bearer b09ec2c6-a820-4b8a-a2b7-6e0391e696f1'
            }
        };

        let response = await axios(options)
        //let element;
        let listOfCoins = response.data.data

        //
       // console.log(sortedCoin)
        for (let i = 0; i < listOfCoins.length; i++) {
            let coin = {
                symbol: listOfCoins[i].symbol,
                name: listOfCoins[i].name,
                marketCapUsd: listOfCoins[i].marketCapUsd,
                priceUsd: listOfCoins[i].priceUsd
            };
            await cryptoModel.create(coin)
        }

        let sortedCoin = listOfCoins.sort(function (a, b) { return a.changePercent24Hr - b.changePercent24Hr })
        res.status(200).send({ msg:"Successfully fetched the data of coins", data: sortedCoin})
    }

    catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Error occured" });
}

};




module.exports.getCryptoCoins = getCryptoCoins

