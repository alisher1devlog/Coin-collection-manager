// server uchun
import express from "express"
import * as routes from "./src/routes/index.js"
import UserRouter from './src/routes/user.routes.js'; 



const app=express()


app.use(express.json())
const PORT=process.env.PORT ||3000

app.use("/coins",routes.coinsRouter)
app.use("/collections/:id/coins",routes.collection_coinsRouter)
app.use("/collection_coins",routes.collectionCoinsRouter)
app.use("/trades",routes.tradeRoutes)
app.use('/users',UserRouter);


app.use((req,res)=>{
    const method = req.method;
    const url = req.url;
    res.send(`cannot ${method}, ${url}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
