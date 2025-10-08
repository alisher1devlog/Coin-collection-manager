// collections endpoints

import { Router } from "express";
import { collectionsController } from "../controllers/collection.controller.js";

const router=Router()

router.post("/",collectionsController.create)
router.get("/",collectionsController.get)

export const CollectionRouter=router