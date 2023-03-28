const sqlite3 = require('sqlite3')
const sqlite = require('sqlite') // Importing SQL server drivers for creating and connecting the database itself.

const path = require('path') // Importing 'path' library for dealing with directories on any operational system. 

// Since we're dealing with database connections, it is rather useful to execute async functions:
async function sqLiteConnection(){

    return await sqlite.open({
        filename: path.resolve(__dirname, '..', 'sqLiteDatabase.db'),
        driver: sqlite3.Database
    })

} 

module.exports = sqLiteConnection

// Next step is creating the migration, inputing the SQL code and then configuring its connection thourgh the migrations folder index.js file