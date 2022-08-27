import {MongoClient} from "mongodb";
import {MongoMemoryServer} from "mongodb-memory-server";

const {NODE_ENV} = process.env;

let uri;
/** @type {MongoMemoryServer|null} */ let memoryServer = null;

if (NODE_ENV==="test") {
    memoryServer =  await MongoMemoryServer.create();
    uri = memoryServer.getUri();
} else if (NODE_ENV==="local") {
    uri = "mongodb://localhost:27017"
}

export const client = await MongoClient.connect(uri);

export async function closeDB() {
    memoryServer && await memoryServer.stop();
    await client.close();
}
