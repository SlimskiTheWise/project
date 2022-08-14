import bcrypt from "bcrypt";
import {userCollection} from "../db.js";
import {generateToken, isPasswordMatch} from "../middlewares/authentification.js";

export async function signup(req, res) {
    try {
        const {username, password} = req.body
        if (await userCollection.findOne({username})) {
            new Error("username already exists")
        } else {
            const bcryptPassword = await bcrypt.hash(password, 8)
            const {insertedId, acknowledged} = await userCollection.insertOne({username: username, password: bcryptPassword})
            if (acknowledged) {
                res.status(200).send(insertedId)
            }
        }
    } catch (e) {
        throw new Error("error occurred creating user ")
    }
}

export async function login(req, res) {
    try {
        const {username, password} = req.body
        const user = await isPasswordMatch(username, password);
        const token = await generateToken(user);
        res.send({userId: user._id, token})
    } catch (e) {
        new Error(e)
    }
}

