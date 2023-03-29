const { Router } = require('express')
const notesRoutes = Router()

const NotesControllerImport = require('../Controllers/NotesController.js')
const notesController = new NotesControllerImport()

notesRoutes.post('/:user_id', notesController.createNote)
notesRoutes.get('/:id', notesController.showNote)
notesRoutes.get('/', notesController.listNotes)
notesRoutes.delete('/:id', notesController.deleteNote)

module.exports = notesRoutes