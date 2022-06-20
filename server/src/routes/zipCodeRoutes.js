const express = require('express')
const routes = express.Router()

const {
   registerNewZipCode,
   listAllUsers,
   listOneUserById,
   editZipCodeRegister,
   deleteZipCodeUserById
} = require('../controllers/zipCodeController')

// authRoutes
routes.post('/', registerNewZipCode)
routes.get('/', listAllUsers)
routes.get('/:id', listOneUserById)
routes.put('/:id', editZipCodeRegister)
routes.delete('/:id', deleteZipCodeUserById)

module.exports = routes
