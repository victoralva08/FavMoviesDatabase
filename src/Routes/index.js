// We'll now create and organize each route for each of the application's functions.

const { Router } = require('express')
const routes = Router()

const usersRoutes = require('./Users.routes')
routes.use('/users', usersRoutes)

const notesRoutes = require('./Notes.routes')
routes.use('/notes', notesRoutes)

module.exports = routes