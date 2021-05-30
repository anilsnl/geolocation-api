import { MongoClient } from "mongodb";

import { dbSettings } from '../../config';


const uri = dbSettings.CONNECTTION_STRING.toString();
const dbName = dbSettings.DB_NAME;
console.log(dbName);
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export const getDb = async () => {
    if (!client.isConnected()) {
        await client.connect();
    }

    return client.db(dbName);
}

export const closeConnection = async () => {
    if (client.isConnected()) {
        await client.close();
    }
}