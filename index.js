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

async function createInColletion(collection) {
  const newDataLocation = {
    mainName: "Lar da Criança Ninho de Paz",
    collectionDate: "2022-08-03T03:29:40.798Z",
    url: "https://www.google.com/maps/search/Lar+da+Crian%C3%A7a+Ninho+de+Paz+-+Pra%C3%A7a+Heitor+Levi,+7+-+Tatuap%C3%A9,+S%C3%A3o+Paulo+-+SP,+03316-070",
    collectionSuccess: true,
  }

  await collection.insertOne(newDataLocation)
}

async function retrieveInColletion(collection) {
  const query = { mainName: 'Lar da Criança Ninho de Paz' };
  const location = await collection.findOne(query)
  console.log(location)
}

async function updateInColletion(collection) {
  const query = { mainName: 'Lar da Criança Ninho de Paz' };
  await collection.updateOne(
    query,
    {
      $set: { collectionSuccess: true, collectionDate: new Date() },
    }
  );
}

async function deleteInColletion(collection) {
  const query = { mainName: 'Lar da Criança Ninho de Paz' };
  await collection.deleteOne(query);
}


async function testeDB(client) {
  const database = await client.db('scrawping')
  const location = await database.collection('locations')
  // await createInColletion(location)
  // await retrieveInColletion(location)
  // await updateInColletion(location)
  // await deleteInColletion(location)

}

async function connectMongo() {
  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const uri = `mongodb+srv://${username}:${password}@scrawping.ztcmq.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    await testeDB(client);
  } catch (err) {
    console.log('Error in connection: ', err)
  } finally {
    await client.close();
  }

}


(() => {
  setEnv()
  connectMongo()
})()