import pg from 'pg';    // package for executing SQL from JS
import dotenv from 'dotenv'; // to manage environment variables
dotenv.config();

const mySecret = process.env['CockroachDBPassword']; // reads from .env file at root 

const pool = new pg.Pool({
    user: 'grace_hopper', 
    host: 'stormy-ocelot-12775.5xj.cockroachlabs.cloud',
    database: 'painters', // public database 
    password: mySecret, 
    port: 26257,
    ssl: true,
});
pool.connect();

// async means this function will execute asynchronously
async function demoSelect()  {
    let results = await pool.query('SELECT * FROM painters'); 
    let painters = results.rows; // each row corresponds to one painter
    for(let painter of painters){
        console.log(`${painter.first_name} ${painter.last_name}`);
    }
    console.log(JSON.stringify(results.rows)); // just to show you what rows looks like
}

await demoSelect();
