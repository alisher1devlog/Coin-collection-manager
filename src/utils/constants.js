// O'zgarmas qiymatlar (status types)
import pool from "../config/database.js";

export async function alwayshelp(tablename){
    try{
        const query=`SELECT * FROM ${tablename}`
        const {rows}=await pool.query(query)
        return rows
    }catch(err){
        return err
    }
}


export async function deletefromtable(tablename,id){
    try{
        const result=await alwayshelp(tablename)
        const query=`DELETE FROM ${tablename} WHERE id=${id}`
        const {rows}=await pool.query(query)
        return `${id} deleted from the table`
    }catch(err){
        return err
    }
}


export async function getOnefromtable(tablename,id){
    try{
        const result=await alwayshelp(tablename)
        const query=`SELECT * FROM ${tablename} WHERE id=${id}`
        const {rows}=await pool.query(query)
        return rows
    }catch(err){
        return err
    }
}

export async function getOnePersonfromCollection(tablename,id){
    try{
        const result=await alwayshelp(tablename)
        const query=`SELECT id FROM collections WHERE user_id=${id}`
        const {rows}=await pool.query(query)
        return rows
    }catch(err){
        console.log(err)
    }
}

export async function updateCoinfromUsertoUser(trade,values,to_user_id){
    try{
        const tablename="collections"
        const query=`DELETE FROM collection_coins WHERE coin_id=$1 RETURNING*`
        const userCollection=await getOnePersonfromCollection(tablename,to_user_id)
        const collection_id=userCollection
        const query1=`INSERT INTO collection_coins (collection_id,coin_id,condition,note) VALUES($1,$2,$3,$4) RETURNING *`
        await pool.query(query,[trade.coin_id])
        const result=await pool.query(query1,values)
        return result
    }catch(err){
        console.log(err)
    }
}

