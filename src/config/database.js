// # Database connection config uchun
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    host: 'localhost',
    user:'postgres',
    password:'12345',
    database:'coin_collection',
    port:5432
});

pool.connect((err,client,release)=>{//Connection test qilish
    if (err) {
        console.log("Database connection xatosi!",err.message);
    }else{
        console.log("Database muvaffaqiyatli ulandi!");
        release();
    }
});


export default pool;
