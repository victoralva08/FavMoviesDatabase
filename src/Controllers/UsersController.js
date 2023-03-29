const AppError = require('../utils/AppError')
const databaseConnection = require('../database/sqlite')
const { hash, compare } = require('bcryptjs') // desestructring hash property from bcryptjs library for encrypting passwords

class UsersController{

    async createUser(request, response){

        // Creating a new user:

        const { name, email, password } = request.body

        const database = await databaseConnection()

        const registeredUser = await database.get( `SELECT * FROM users WHERE email = (?)`, (email) ) // Verifying if the user is already registered in the database, returns a boolean value.
        console.log(registeredUser)
        if (registeredUser){
            throw new AppError('This email has already been registered.')
        } 

        const hashedPassword = await hash(password, 8)


        await database.run( 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword] )
        return response.status(201).json("You've been registered.")

    } 

    async updateUser(request, response){
        const { name, email, currentPassword, newPassword } = request.body // this name and email value will replace the user's current ones.
        const { id } = request.params
        let user

        const database = await databaseConnection()

        // first, we'll verify if the user already exists in the database
        user = await database.get( `SELECT * FROM users WHERE id = (?)`, [id] ) // this will return an object containing all user data
        if (!user){
            throw new AppError("This email is not registered.")
        }

        // now, we'll verify if the email that the user wishes to update to is already on use by other user
        const emailAlreadyRegistered = await database.get( `SELECT * FROM users WHERE email = (?)`, [email] ) // this will return an object containing all user data
        if (emailAlreadyRegistered && emailAlreadyRegistered.id != user.id){
            throw new AppError( `This email has already been registered. Plase, choose another one.` )
        }

        // now, we'll update the user's name and email if they were requested. For that, the nullage operator will be used.
        user.name = name ?? user.name 
        user.email = email ?? user.email

        // for password update, we'll first check if the both the current password and new one were informed
        if( newPassword && !currentPassword) {

            throw new AppError('Please, type your current and new password.')

        } 
        
        if( newPassword && currentPassword ) {

            const checkCurrentPassword = await compare(currentPassword, user.password) // comparing encrypted values. If they are equals, the return will be a true value.
            if(!checkCurrentPassword) {
                console.log(checkCurrentPassword)
                throw new AppError('Your current password is incorrect.')
            }

            user.password = await hash(newPassword, 8)
            return response.status(200).json(`Password updated.`)
        }

        // now, we'll insert the updated values into the database users table
        await database.run( `
         UPDATE users SET
         name = ?,
         email = ?,
         password = ?,
         updated_at = DATETIME('now')
         WHERE id = ?         
         `, [user.name, user.email, user.password, user.id] )

         return response.status(200).json("User data successfully updated.")

    }
}

module.exports = UsersController