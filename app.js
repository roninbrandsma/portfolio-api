const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

const reservations = require('./routes/reservations')
const emails = require('./routes/emails')
const { connectToDB } = require('./db')

connectToDB().then(data => {
    app.use('/reservations', reservations)
    app.use('/emails', emails)

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
})