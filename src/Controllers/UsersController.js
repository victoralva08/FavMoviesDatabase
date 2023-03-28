const AppError = require('../utils/AppError.js')
const databaseConnection = require('../database/sqlite')

class UsersController{

    async createUser(request, response){

        // Creating a new user:

        const { name, email, password } = request.body

        const sqlDatabase = await databaseConnection()

        const registeredUser = await sqlDatabase.get( `SELECT * FROM users WHERE email = (?)`, (email) ) // Verifying if the user is already registered in the database, returns a boolean value.

        if (registeredUser){
            throw new AppError('This email has already been registered.')
        } 


        await sqlDatabase.run( 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password] )
        return response.status(201).json("You've been registered.")

    } 

}
module.exports = UsersController