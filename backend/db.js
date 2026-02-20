import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'habittracker',
    user: 'anupam',
    password:null,
});

export default pool;