// CRUD logic uchun
import { create } from "domain"
import pool from "../config/database.js"
import { alwayshelp } from "../utils/constants.js"

export const collectionsController = {
    create:async function(req,res){
        try{
            const {user_id,title,description,image}=req.body
            const values=[user_id,title,description,image]
            const query=`INSERT INTO collections(user_id,title,description,image) VALUES($1,$2,$3,$4) RETURNING *`
            const result=await pool.query(query,values)
            return res.json(result.rows[0])
        }catch(err){
            console.log(err)
        }
    },
    get:async function(req,res){
        try{
            const tablename="collections"
            const result=await alwayshelp(tablename)
            return res.json(result)
        }catch(err){
            console.log(err)
        }
    } 
}