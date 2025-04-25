const { MongoClient } = require('mongodb');
require('dotenv').config()
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.DB_URL;
const client = new MongoClient(url);

// Database Name
const dbName = 'main';

let db
const connectToDB = async() => {
    await client.connect();
    console.log('Connected successfully to server');
    db = client.db(dbName)
}

const getDBConnection = () => {
    return db
}

module.exports = {connectToDB, getDBConnection}