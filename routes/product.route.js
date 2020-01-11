const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const router = express.Router();
const Joi = require('joi');

//let username = process.env.username_mogodb;
//let password = process.env.password_mongodb;
const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017"
const dbName = process.env.MONGODB_URI ? "heroku_2wh2qzqj" : "test"

//getting all objects in DB
router.get('/', (req, res) => {
    const dbClient = new MongoClient(url);
    //connect() returns a promise. 2 Ways to have then. If i pass 1 function i need to pass catch as well. Or two functions, second for error
    dbClient.connect().then(() => {
        dbClient.db(dbName).collection("products").find({}).toArray().then((products) => {
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
        const new_product = {
            name: req.body.name,
            price: req.body.price
        }
        dbClient.db(dbName).collection("products").insertOne(new_product).then((r) => {
            res.status(200).send("success ")
        })
    }).catch((err) => {
        res.status(500).send(err)
    })
    dbClient.close()
})

//updating price objects in the DB via id
router.put('/:name', (req, res) => {
    const dbClient = new MongoClient(url);
    dbClient.connect().then(() => {
        dbClient.db(dbName).collection("products").updateMany({name: req.params.name}, {$set: {price: req.body.price}},
            (err, result) => { 
                if(err) {res.status(500).send(err)}
                else if (result.modifiedCount === 0) {res.status(500).send("no objects modified. make sure required object exists in db.")}
                else if (err ===null) {res.status(200).send(`sucessfull update of ${req.params.name}`)}
            })
    })
    dbClient.close()
})

//deleting objects from DB via name
router.delete('/:name', (req, res) => {
    const dbClient = new MongoClient(url);
    dbClient.connect().then(() => {
        dbClient.db(dbName).collection("products").findOneAndDelete({name: req.params.name}).then((doc,err) =>{
            if(err) {res.status(500).send(`no ${req.params.name} in list`) + err}
            else {res.status(200).send(`sucessfull deletion of ${req.params.name}`)}
        }).catch((err)=> {res.status(400).send(`could not delete ${req.params.name}` + err)})
    })
    dbClient.close()
})

module.exports = router;