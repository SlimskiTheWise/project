import express from "express";
import {login, signup} from "../controllers/userController.js";
const router = express.Router()

router.post('/user/create', signup)
router.post('/user/login', login)

export default router