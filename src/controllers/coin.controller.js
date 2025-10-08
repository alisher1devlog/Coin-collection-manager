// CRUD logic uchun
import pool from "../config/database.js"
import { alwayshelp,deletefromtable } from "../utils/constants.js"


export const coinsController={
    create:async function(req,res){
        try{
            const {name,country,year,material,value,image}=req.body
            const values=[name,country,year,material,value,image]
            const query=`INSERT INTO coins(name,country,year,material,value,image) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`
            const result=await pool.query(query,values)
            return res.status(200).json(result.rows)
        }catch(err){
            console.log(err)
        }

    },
    getAll:async function(req,res){
        try{
            const tablename="coins"
            const result=await alwayshelp(tablename)
            return res.json(result)
        }catch(err){
            throw new Error(err)
        }
    },
    update: async function (req, res) {
        try{
            const id=req.params.id
            const tablename="coins"
            const result=await alwayshelp(tablename)
            const coinsIndex=result.findIndex(coin=>coin.id===+id)
            if(coinsIndex===-1) return res.status(404).json({message:`${id} not found`})
            const keys=Object.keys(req.body)
            const values=Object.values(req.body)
            let Query=keys.map((key,i)=>`${key}=$${i+1}`).join(",") 
            const query=`UPDATE coins SET ${Query},updated_at=NOW() WHERE id=$${keys.length+1} RETURNING *`
            const {rows}=await pool.query(query,[...values,id])
            res.status(200).json(rows)
        }catch(err){
            console.log(err)
        }
    },
    delete:async function(req,res){
        try{
            const id=req.params.id
            const tablename="coins"
            const result=await alwayshelp(tablename)
            const coinsIndex=result.findIndex(coin=>coin.id===+id)
            if(coinsIndex===-1) return res.status(404).json({message:`${id} not found`})
            const response=await deletefromtable(tablename,id)
            res.status(200).json(response)
        }catch(err){
            console.log(err)
        }
    },
    getOne:async function(req,res){
        try{
            const id=req.params.id
            const query=`SELECT * FROM coins WHERE id=$1`
            const {rows}=await pool.query(query,[id])
            res.status(200).json(rows)
        }catch(err){
            console.log(err)
        }
    }
}