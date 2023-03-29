// Update with your config settings.


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const path = require('path')

const knexConfig = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'sqLiteDatabase.db')
    },

    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
    },

    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'knexMigrations')
    },

    useNullAsDefault: true
  }

}

module.exports = knexConfig
