const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.get('/movies', function(req, res){
    let movies= ["King","The Dark Knight","The Hangover","Joker"]
    res.send(movies)
})



router.get('/movies/:index',function (req,res) {
    //console.log(req.params)
    let a=["king","golmaal","don","Masti"]
    let value= req.params.index
    if(value>a.length){
        res.send("Enter valid index")
    
    }else{
        res.send(a[value])
    }
    
});

router.get('/films', function (req,res){
    const films= [
        {"id":1,"name":"The Dark knight"},
        {"id":2,"name":"Joker"},
        {"id":3,"name":"The Hangover"},
        {"id":4,"name":"Rang De Basanti"}
    ];
    res.send(films)
})

router.get('/films/:filmId', function (req,res){

 const films= [
        {"id":1,"name":"The Dark knight"},
        {"id":2,"name":"Joker"},
        {"id":3,"name":"The Hangover"},
        {"id":4,"name":"Rang De Basanti"}
    ];
    let Id= req.params.filmId
    if(Id>films.length){
        res.send("Enter valid index")
    }else{
        res.send(films[Id])
    }
   // let filmAtId=films[Id];
   // res.send(filmAtId)
});
module.exports = router;