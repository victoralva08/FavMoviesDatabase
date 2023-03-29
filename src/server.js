require('express-async-errors') // Importing library to correctly behave when an error occurs: Express Async Errors
const AppError = require('./utils/AppError')
// Initializing the API

const express = require('express') // Importing express library from NodeJs
const app = express() // Initializing express framework to manage HTTP requisitions.
app.use(express.json()) // Permission to read request on JSON format

const port = 3000
app.listen(port, () => {
    console.log(`Server is now running on Port: localhost:${port}.`)
})



// Now, the SQLite database will be installed. 
// After its installation, we'll create a new database through migrations:

const database = require('./database/sqlite') // index.js is the default route.
database()

// Executing routes for allowing communication between the files in the app:
const routes = require('./Routes/index.js')
app.use(routes)



// Importing the createUsers through SQL migration

const runMigrations = require('./database/sqlite/migrations/index.js')
runMigrations()



// Configuring App Error and its cases (it must be done after the routes execution)
app.use(
    ( error, request, response, next ) => {

        if(error instanceof AppError){ // Veryfing if the error is from user-end
            
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message
            })
        }

        console.error(error)

        return response.status(500).json({ // In case it is an application error, the status 500 will be returned with the following JSON.
            status: 'error',
            message: 'Internal server error.'
        })

    }
)