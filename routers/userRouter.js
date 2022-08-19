import express from "express";
import {login, signup} from "../controllers/userController.js";
import {verifyToken} from "../middlewares/authentification.js";
const router = express.Router()

router.post('/user/create', signup)
router.post('/user/login', login)
router.get('/user', verifyToken , (req, res) => {
    console.log(res.json(req.decoded));
})
export default router