import { Client, Databases, Query } from "react-native-appwrite";

// Database and table information
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// Not all files are sharing state yet, so I am creating a new client to interact with the database.
const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

// Where I will hold different functions for interacting with the database.

// Get all users currently in the database.
export const getAllUsers = async () => {
    try {
        const result = await database.listDocuments({
            databaseId: DATABASE_ID,
            collectionId: COLLECTION_ID,
        });
        return result.documents;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

