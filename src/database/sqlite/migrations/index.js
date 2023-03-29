const databaseConnection = require('../../sqlite')
const createUsers = require('./createUsers.js') // Importing the SQL code for creating a new user in the table.

async function runMigrations(){
    
    const sqlCode = [createUsers].join('') // Turning the SQL string code into an array

    databaseConnection()
    .then( (database) => { database.exec(sqlCode) })
    .catch( error => console.error(error) )

}

module.exports = runMigrations