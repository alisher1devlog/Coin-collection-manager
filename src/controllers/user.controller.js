// CRUD logic uchun
import pool from "../config/database.js"
import { alwayshelp } from "../utils/constants.js"



export const usersController = {
    create:async function(req,res){
        try{    
            const {name,email,password}=req.body
            const values=[name,email,password]
            const query=`INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *`
            const result=await pool.query(query,values)
            return res.json(result.rows[0])
        }catch(err){
            console.log(err)
        }
    },
    get:async function(req,res){
        try{
            const tablename="users"
            const result=await alwayshelp(tablename)
            return res.json(result)
        }catch(err){
            console.log(err)
        }
    }
}