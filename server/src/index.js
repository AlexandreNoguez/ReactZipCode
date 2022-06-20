const express = require('express')
const cors = require('cors')
const app = express()
const ZipCodeRoutes = require('./routes/zipCodeRoutes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Routes
app.use('/api/zipcode', ZipCodeRoutes)

app.listen(3333)
