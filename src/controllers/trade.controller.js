// CRUD logic uchun
import pool from "../config/database.js"
import { alwayshelp,deletefromtable,getOnefromtable,updateCoinfromUsertoUser } from "../utils/constants.js"

export const tradesController={
    create:async function(req,res){
        try{
            const {from_user_id,to_user_id,coin_id,status}=req.body
            if(!coin_id){
                return res.json({message:`coin_id majburiy`})
            }
            const values=[from_user_id,to_user_id,coin_id,status]
            const query=`INSERT INTO trades(from_user_id,to_user_id,coin_id,status) VALUES($1,$2,$3,$4) RETURNING *`
            const result=await pool.query(query,values)
            res.json(result)
        }catch(err){
            console.log(err)
        }
    },
    getAll:async function(req,res){
        try{
            const tablename="trades"
            const result=await alwayshelp(tablename)
            res.json(result)
        }catch(err){
            console.log(err)
        }
    },
    getOne:async function(req,res){
        try{
            const id=req.params.id
            const tablename="trades"
            const result=await getOnefromtable(tablename,id)
            res.json(result)
        }catch(err){
            console.log(err)
        }
    },
    update:async function(req,res){
        try{
            const id=req.params.id
            const {collection_id,condition,note,status}=req.body
            const tablename="trades"
            const result=await alwayshelp(tablename)
            const tradeIndex=result.findIndex(trade=>trade.id===+id)
            if(tradeIndex===-1) res.status(404).json({message:`${id} not found`})
            const trade=result[tradeIndex]
            const values=[collection_id,trade.coin_id,condition,note]
            console.log(trade)
            console.log(values)
            const to_user_id=trade.to_user_id
            if(status.toLowerCase()==="accepted"){
                const newcollection_coin=await updateCoinfromUsertoUser(trade,values,to_user_id)
                await pool.query("UPDATE trades SET status=$1 WHERE id=$2",["accepted",trade.id])
                res.json(newcollection_coin)
            }
            if(status.toLowerCase()==="rejected"){
                res.json(`${trade.id} trade status changed to rejected  `)
                await pool.query("UPDATE trades SET status=$1 WHERE id=$2",["rejected",trade.id])
            }
        }catch(err){
            console.log(err)
        }
    },
    delete:async function(req,res){
        try{
            const id=req.params.id
            const tablename="trades"
            const result=await deletefromtable(tablename,id)
            res.json(result)
        }catch(err){
            console.log(err)
        }
    }
}