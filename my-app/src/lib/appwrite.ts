import { Client, TablesDB, Account } from "appwrite";

const client = new Client();
client
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("693f069200226b2ad19b");

const account = new Account(client);
const tablesDB = new TablesDB(client);

export {
    client,
    account,
    tablesDB
}