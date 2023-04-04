const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'ekta0811',
    database: 'e-comm'
})

client.connect()

module.exports = client