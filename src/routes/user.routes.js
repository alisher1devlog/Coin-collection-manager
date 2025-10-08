import express from "express"
import userController from "../controllers/user.controller.js"

const router = express.Router();


router.post('/register',userController.registerUser);

router.post('/login',userController.loginUser);

router.get('/',userController.getAllUsers);

router.get('/:id',userController.getById);

export default router;

