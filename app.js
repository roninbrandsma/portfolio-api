const express = require('express')
const app = express()
const port = 8080
app.use(express.json())


const reservations = require('./routes/reservations')
const { connectToDB } = require('./db')
connectToDB().then(data => {
    app.use('/reservations', reservations)

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
})