import { Client, Databases, Account, ID, Teams } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPONT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
const database = new Databases(client);
const account = new Account(client);
const teams = new Teams(client);

export { client, database, account, ID, teams };
