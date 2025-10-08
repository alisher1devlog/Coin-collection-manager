//  /coins endpoints

import { Router } from "express";
import { coinsController } from "../controllers/coin.controller.js";

const router=Router()


router.post("/",coinsController.create)
router.get("/",coinsController.getAll)
router.patch("/:id",coinsController.update)
router.delete("/:id",coinsController.delete)
router.get("/:id",coinsController.getOne)

export const coinsRouter=router