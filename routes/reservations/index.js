const express = require("express")
const { getDBConnection } = require("../../db")
const router = express.Router()

router.get('/', async(req, res) => {
    const dbCon = getDBConnection()
    const collection = await dbCon.collection('reservations')
    const data = await collection.find().toArray()
    return res.status(200).json(data)
})

router.post('/', async(req, res) => {
    let body = req.body
    if(body.date) {
        body.date = new Date(body.date)
    }
    const dbCon = getDBConnection()
    const collection = await dbCon.collection('reservations')
    const insert = await collection.insertOne(body)
    return res.status(200).json(insert)
})

module.exports = router