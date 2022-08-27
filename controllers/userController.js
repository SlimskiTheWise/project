import bcrypt from "bcrypt";
import {generateToken} from "../utils/jwt.js";
import {client} from "../db.js";
import userError from "../errors/userError.js";

export const userCollection = await client.db("mall").collection("users");

export async function signup(req, res) {
    try {
        const {username, password} = req.body
        if (await userCollection.findOne({username})) {
            return res.status(404).json({error: userError.EXISTING_USER})
        } else {
            const bcryptPassword = await bcrypt.hash(password, 8)
            const {insertedId, acknowledged} = await userCollection.insertOne({
                username: username,
                password: bcryptPassword
            })
            if (acknowledged) {
                res.status(201).json(insertedId)
            }
        }
    } catch (e) {
        res.send(e)
    }
}

export async function login(req, res) {
    try {
        const {username, password} = req.body
        const user = await userCollection.findOne({username})
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(404).json({error: userError.INVALID_USER})
        }
        const token = await generateToken(user);
        res.status(200).json({username: user.username, token})
    } catch (e) {
        return res.status(401).send(e)
    }
}

