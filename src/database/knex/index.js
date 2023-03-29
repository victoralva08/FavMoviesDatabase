const knex = require('knex')
const { development } = require('../../../knexfile.js') // desestructrin development property from the knexfile object.


module.exports = knex(development)