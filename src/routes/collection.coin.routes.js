import { Router } from "express";
import { createCollection_coins, getAllCollection_coins} from "../controllers/collection.coin.controller.js";

const collection_coins=Router()


collection_coins.get("/",getAllCollection_coins)
collection_coins.post("/",createCollection_coins)



export const collection_coinsRouter=collection_coins