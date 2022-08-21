import {userCollection} from "../db.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {config} from "dotenv";
config()

export async function isPasswordMatch(username, password) {
    const user = await userCollection.findOne({username})
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        new Error('user not found');
    }
    return user
}

export async function generateToken(user) {
    const key = process.env.JWT_SECRET;
    const token = jwt.sign({_id: user._id, username: user.username}, key)
    return token
}