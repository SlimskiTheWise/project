import jwt from "jsonwebtoken";
import {config} from 'dotenv'
import bcrypt from "bcrypt";
config()

export async function verifyToken(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = req.decoded = jwt.verify(token,  process.env.JWT_SECRET);
        return next()
    } catch (error) {
       new Error(error)
    }
}