// # users table model
import pool from "../config/database.js";

const user = {
    
    async getAll(){
        const sql = 'SELECT id, name, email,created_at,updated_at, FROM users';
        const { rows } = await pool.query(sql);
        return rows;
    },
    async findById(id){
        const sql = `SELECT id,name,email,created_at,updated_at FROM users WHERE id = $1`;
        const { rows } = await pool.query(sql,[id]);
        return rows[0] || null;
    },
    async findByEmail(email){
        const sql = `SELECT * FROM users WHERE email = $1`;
        const { rows } = await pool.query(sql,[email]);
        return rows[0] || null;
    },
    async createUser(newUser){
        const {name,email,password} = newUser;
        const sql = `INSERT INTO users (name,email,password,created_at, updated_at) VALUES($1,$2,$3,NOW(),NOW()) RETURNING id`;
        const { rows } = await pool.query(sql,[name,email,password]);
        
        return {id:rows[0].id, ...newUser};
    },
    async updateUser(id,userData){
        const {name ,email } = userData;
        const sql = `UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3`;
        const result = await pool.query(sql, [name,email,id]);
        return result.rowCount>0; 
    },
    async deleteUser(id){
        const sql = `DELETE FROM users WHERE id = $1`;
        const result = await pool.query(sql,[id]);
        return result.rowCount>0;
    }
};

export default user;