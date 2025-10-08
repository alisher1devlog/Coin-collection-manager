// # Database connection config uchun

import pg from "pg"

const {Pool}= pg

const pool=new Pool({
    user:"postgres",
    database:"odamlar",
    password:"1234",
    host:"localhost",
    port:5432
})


export default pool