import app from "./../app.js";
import request from "supertest";
import {config} from 'dotenv'
config()

const user = {username: "superman", password: "1234"};
const token = process.env.TOKEN

describe('hello world', function() {
        it('/', async () => {
            const res = await request(app).get('/')
                expect(res)
        });
    });

describe('login', function() {
    it('should return id and token', async () => {
        const res = await request(app)
            .post('/user/login')
            .send(user)
            .set("Accept", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body.userId).toBe("62f74907d0830e2dbb587233");
    });
});

describe("GET user info", () => {
    it('should return user info', async function () {
        const res = await request(app)
            .get('/user')
            .set('Authorization', `Bearer ${token}`)
            .type('Content-Type', 'application/json')
        expect(res.statusCode).toBe(200)
        expect(res.body.username).toBe('superman')
        expect(res.body._id).toBe('62f74907d0830e2dbb587233')
    });
})