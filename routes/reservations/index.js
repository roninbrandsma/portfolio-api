const express = require('express');
const { getDBConnection } = require('../../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const dbCon = getDBConnection();
  const collection = await dbCon.collection('reservations');
  const data = await collection.find().toArray();
  return res.status(200).json(data);
});

router.post('/', async (req, res) => {
  let body = req.body;
  const data = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    date: new Date(body.formattedDate),
    numberOfPeople: Number(body.numberOfPeople),
    occasion: body.occasion
  };
  const dbCon = getDBConnection();
  const collection = await dbCon.collection('reservations');
  const insert = await collection.insertOne(data);
  return res.status(200).json(insert);
});

module.exports = router;
