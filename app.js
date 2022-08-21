import express from "express";
import router from "./routers/userRouter.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', router)

app.listen(3000, () => {
    console.log('server running')
});

app.get('/', (req, res) => {
    res.send('hello world')
})

