// using SQL, we'll code the table creation and then export as a migration
let createUsers = `

    CREATE TABLE IF NOT EXISTS users (

        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR,
        email VARCHAR,
        password VARCHAR,
        avatar VARCHAR NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    ) 
`

module.exports = createUsers