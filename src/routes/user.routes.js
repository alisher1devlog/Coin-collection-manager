import { Router } from "express";
import { usersController } from "../controllers/user.controller.js";

const router=Router()


router.post("/",usersController.create)
router.get("/",usersController.get)


export const userRouter=router