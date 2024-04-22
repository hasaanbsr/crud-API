const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'curdapi',
    user: 'postgres',
    password: 'Jubelio123'
});

module.exports = db; 

