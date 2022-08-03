import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function setEnv(){
  dotenv.config({
    path: path.resolve(__dirname, '.env')
  })
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log('---------- DTABASES ----------')
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function connectDB() {
  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const uri = `mongodb+srv://${username}:${password}@scrawping.ztcmq.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listDatabases(client);
  } catch (err) {
    console.log('Error in connection: ', err)
  } finally {
    await client.close();
  }

}


(() => {
  setEnv()
  connectDB()
})()