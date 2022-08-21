import chai from "chai";
import {app} from "./../app.js";
import chaiHttp from "chai-http";
import {config} from 'dotenv'
config()

const { expect } = chai;
chai.use(chaiHttp);
const user = {username: "superman", password: "1234"};
const token = process.env.TOKEN

describe('hello world', function() {
        it('/', async () => {
            const res = await chai.request(app)
                .get('/')
                expect(res)
        });
    });

describe('login', function() {
    it('should return id and token', async () => {
        const res = await chai.request(app)
            .post('/user/login')
            .send(user)
            .set("Accept", "application/json");
        expect(res.statusCode).equal(200);
        expect(res.body.userId).equal("62f74907d0830e2dbb587233");
    });
});

describe("GET user info", () => {
    it('should return user info', async function () {
        const res = await chai.request(app)
            .get('/user')
            .set('Authorization', `Bearer ${token}`)
        expect('Content-Type', 'application/json')
        expect(res.statusCode).equal(200)
        expect(res.body.username).equal('superman')
        expect(res.body._id).equal('62f74907d0830e2dbb587233')
    });
})