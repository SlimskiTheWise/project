import app from "./../app.js";
import {agent} from "supertest";
import {client, closeDB} from "../db.js";
import {config} from 'dotenv'
config()
import bcrypt from "bcrypt";

const token = process.env.TOKEN

let server;
let req;

const {default: user} = await import("./user.json");

beforeAll(async () => {server = app.listen(3333); req = agent(server, {})})
afterAll(async () => {await closeDB(); server.close()})

async function seedUser() {
    const collection = client.db("mall").collection("users");
    const bcryptPassword = await bcrypt.hash(user.password, 8);
    await collection.insertOne({
        username: user.username,
        password: bcryptPassword,
    });
}

describe('login', function() {
    it('should return username and token', async () => {
        await seedUser()
        const res = await req.post('/user/login')
            .send({username: user.username, password: user.password})
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe("superman");
        expect(res.body.token)
    });

    it('should fail if wrong user information is given', async () => { //todo complete this part
        await seedUser()
        const res = await req.post('/user/login')
            .send({username: "user that doesn't exist", password: user.password})
            .set("Accept", "application/json");
        console.log(res.body)
    });
});

describe("GET user info", () => {
    it('should return user info', async function () {
        const res = await req.get('/user')
            .set('Authorization', `Bearer ${token}`)
            .type('Content-Type', 'application/json')
        expect(res.statusCode).toBe(200)
        expect(res.body.username).toBe('superman')
    });
})