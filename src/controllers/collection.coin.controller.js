// CRUD logic uchun
import pool from "../config/database.js"
import { alwayshelp,deletefromtable } from "../utils/constants.js"



export async function createCollection_coins(req,res){
    try{
        const {collection_id,coin_id,condition,note}=req.body
        const values=[collection_id,coin_id,condition,note]
        const query=`INSERT INTO collection_coins(collection_id,coin_id,condition,note) VALUES($1,$2,$3,$4)  RETURNING *`
        const {rows}=await pool.query(query,values)
        res.json(rows)
    }catch(err){
        console.log(err)
    }
} 


export async function getAllCollection_coins(req,res){
    try{
        const tablename="collection_coins"
        const result=await alwayshelp(tablename)
        return res.json(result)
    }catch(err){
        console.log(err)
    }
}


export async function UpdateCollection_coins(req,res){
    try{
        const id=req.params.id
        const tablename="collection_coins"
        const result=await alwayshelp(tablename)
        const collectionIndex=result.findIndex(collection=>collection.id===+id)
        if(collectionIndex===-1){
            return res.status(404).json({message:`${id} not found`})
        }
        const keys=Object.keys(req.body)
        const values=Object.values(req.body)
        values.coin_id=Number(values.coin_id)
        const setQuery=keys.map((key,i)=>`${key}=$${i+1}`).join(",")
        const query=`UPDATE collection_coins SET ${setQuery} WHERE id=$${keys.length+1} RETURNING *`
        const {rows}=await pool.query(query,[...values,id])
        return res.json(rows)
    }catch(err){
        console.log(err)
    }
}

export async function DeleteCollection_coins(req,res){
    try{
        const id=req.params.id
        const tablename="collection_coins"
        const result=await alwayshelp(tablename)
        console.log(result)
        const collectionIndex=result.findIndex((collection)=>collection.id===+id)
        if(collectionIndex===-1) return res.status(404).json({message:`${id} not found`})
        const response=await deletefromtable(tablename,id)
        return res.json(response)
    }catch(err){
        console.log(err)
    }
}