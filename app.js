import express from "express";
import router from "./routers/userRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', router)

app.get('/', (req, res) => {
    res.send('hello world')
})

export default app