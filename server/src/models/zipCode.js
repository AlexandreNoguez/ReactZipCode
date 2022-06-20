const mongoose = require('../database')

const ZipCodeSchema = new mongoose.Schema(
    {
        zipCode: {
            type: String,
            require: true
        },
        district: {
            type: String,
            require: true
        },
        city: {
            type: String,
            require: true
        },
        adress: {
            type: String,
            require: true
        },
        number: {
            type: Number,
            require: true
        },
        state: {
            type: String,
            require: true
        }
    },
    { timestamps: true }
)

const ZipCode = mongoose.model('ZipCode', ZipCodeSchema)

module.exports = ZipCode
