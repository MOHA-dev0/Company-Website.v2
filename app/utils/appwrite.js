import { Client, Databases, Account, ID, Teams, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
const database = new Databases(client);
const account = new Account(client);
const teams = new Teams(client);
const storage = new Storage(client);

export { client, database, account, ID, teams, Storage };

export async function publishPost(title, description, image) {
  try {
    if (!description) {
      throw new Error("All fields (description) are required.");
    }

    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      ID.unique(),
      {
        title,
        description,
        image,
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to publish post:", error);
    throw error;
  }
}

export async function uploadImage(file) {
  try {
    const response = await storage.createFile(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
      ID.unique(),
      file
    );
    return response;
  } catch (error) {
    console.error("Failed to upload image:", error);
    throw error;
  }
}
