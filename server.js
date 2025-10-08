// server uchun

import express from "express"
// import mainRouter from './src/routes/index.js'
import UserRouter from './src/routes/user.routes.js'; 
const app = express()

app.use(express.json())
const PORT = process.env.PORT || 3000

app.use('/users',UserRouter);


app.use((req,res)=>{
    const method = req.method;
    const url = req.url;
    res.send(`cannot ${method}, ${url}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})