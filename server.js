// server uchun
import express from "express"
import * as routes from "./src/routes/index.js"



const app=express()


app.use(express.json())
const PORT=process.env.PORT ||3000

app.use("/coins",routes.coinsRouter)
app.use("/collections/:id/coins",routes.collection_coinsRouter)
app.use("/collection_coins",routes.collectionCoinsRouter)
app.use("/trades",routes.tradeRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})