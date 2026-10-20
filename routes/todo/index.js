const express = require('express');
const { getDBConnection } = require('../../db');
const { Db } = require('mongodb');
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
    task: body.task
  };
  const dbCon = getDBConnection();
  const collection = await dbCon.collection('todo');
  const insert = await collection.insertOne(data);
  return res.status(200).json(insert);
});

router.delete('/:id', async (req, res) => {
  const dbCon = getDBConnection();

  try {
    console.log('Requested ID:', req.params.id);
    console.log('Database:', dbCon.databaseName);

    const result = await dbCon.collection('todo').deleteOne({
      'task.id': req.params.id
    });

    console.log('Deleted count:', result.deletedCount);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    return res.status(500).json({ error: error.message });
  }
});
module.exports = router;
