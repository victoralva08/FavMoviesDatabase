
const { Router } = require('express') // Importing the Router from 'express' library allow
const usersRoutes = Router()

const UsersControllerImport = require('../Controllers/UsersController')
const usersController = new UsersControllerImport()

usersRoutes.post('/', usersController.createUser)
usersRoutes.put('/:id', usersController.updateUser)

module.exports = usersRoutes