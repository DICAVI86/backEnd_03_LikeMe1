const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'diegocastillovial', 
    password: '', 
    database: 'likeme', 
    port: 5432,
});


module.exports = pool;
