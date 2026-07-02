const express = require('express');
const { getDBConnection } = require('../../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const dbCon = getDBConnection();
  const collection = await dbCon.collection('todo');
  const data = await collection.find().toArray();
  return res.status(200).json(data);
});

router.post('/', async (req, res) => {
  let body = req.body;
  const data = {
    tasks = body.tasks
  };
  const dbCon = getDBConnection();
  const collection = await dbCon.collection('todo');
  const insert = await collection.insertOne(data);
  return res.status(200).json(insert);
});

module.exports = router;
