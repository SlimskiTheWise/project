import {MongoClient} from "mongodb";
import {config} from 'dotenv'
config()

const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

await client.connect()
    .then(() => console.log('db connected'))
    .catch(e => console.error(e))

const db = client.db('mall')
export const userCollection = db.collection("user")
