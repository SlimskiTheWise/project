import {MongoClient} from "mongodb";

const client = new MongoClient("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

await client.connect()
    .then(() => console.log('db connected'))
    .catch(e => console.error(e))

const db = client.db('mall')
export const userCollection = db.collection("user")
