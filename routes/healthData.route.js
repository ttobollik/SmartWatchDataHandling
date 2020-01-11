const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017"
const dbName = process.env.MONGODB_URI ? "heroku_2wh2qzqj" : "test"

//getting all objects in DB
router.get('/', (req, res) => {
    const dbClient = new MongoClient(url);
    //connect() returns a promise. 2 Ways to have then. If i pass 1 function i need to pass catch as well. Or two functions, second for error
    dbClient.connect().then(() => {
        dbClient.db(dbName).collection("healthData").find({}).toArray().then((products) => {
            res.status(200).send(products)
        })
    }).catch((err) => {
        res.status(500).send("Didnt work")
    })
    dbClient.close()
})

//posting objects in DB
router.post('/', (req, res) => {
    const dbClient = new MongoClient(url);
    //connect() returns a promise. 2 Ways to have then. If i pass 1 function i need to pass catch as well. Or two functions, second for error
    dbClient.connect().then(() => {
        //validation should be done here!
        const new_data = {
            date: req.body.date,
            type: req.body.type,
            value: req.body.value
        }
        dbClient.db(dbName).collection("healthData").insertOne(new_data).then((r) => {
            res.status(200).send("success ")
        })
    }).catch((err) => {
        res.status(500).send(err)
    })
    dbClient.close()
})

//deleting objects from DB via name
router.delete('/', (req, res) => {
    const dbClient = new MongoClient(url);
    dbClient.connect().then(() => {
        dbClient.db(dbName).collection("healthData").deleteOne({}).then((doc,err) =>{
            if(err) {res.status(500).send(`no ${req.params.name} in list`) + err}
            else {res.status(200).send(`sucessfull deletion`)}
        }).catch((err)=> {res.status(400).send(`could not delete ` + err)})
    })
    dbClient.close()
})

module.exports = router;