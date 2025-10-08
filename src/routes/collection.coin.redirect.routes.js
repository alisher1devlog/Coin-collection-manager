import { Router } from "express";
import { UpdateCollection_coins,DeleteCollection_coins } from "../controllers/collection.coin.controller.js";


const  collection_coins1=Router()


collection_coins1.patch("/:id",UpdateCollection_coins)
collection_coins1.delete("/:id",DeleteCollection_coins)


export const collectionCoinsRouter=collection_coins1