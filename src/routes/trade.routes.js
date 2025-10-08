// /trades endpoints

import { Router } from "express";
import { tradesController } from "../controllers/trade.controller.js";

const router=Router()


router.get("/",tradesController.getAll)
router.get("/:id",tradesController.getOne)
router.post("/",tradesController.create)
router.put("/:id",tradesController.update)
router.delete("/:id",tradesController.delete)

export const tradeRoutes=router