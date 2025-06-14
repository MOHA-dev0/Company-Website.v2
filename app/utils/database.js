import { database } from "./appwrite";
<<<<<<< HEAD
import { ID, Query } from "appwrite";
=======
import { ID } from "appwrite";
>>>>>>> Admin-Recive-Message#5

const collections = [
  {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    id: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
    name: "posts",
  },
  {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    id: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MESSAGES_ID,
    name: "messages",
  },
<<<<<<< HEAD
  {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    id: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COMMENTS_ID,
    name: "comments",
  },
  {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    id: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERS_ID,
    name: "users",
  },
  {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    id: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_GITHUB_ID,
    name: "github",
  },
=======
>>>>>>> Admin-Recive-Message#5
];

const db = {};

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, id = ID.unique()) =>
      database.createDocument(col.databaseId, col.id, id, payload),

    update: (id, payload) =>
      database.updateDocument(col.databaseId, col.id, id, payload),

    get: (id) => database.getDocument(col.databaseId, col.id, id),

<<<<<<< HEAD
    list: (queries = []) =>
      database.listDocuments(col.databaseId, col.id, queries),

    delete: (id) => database.deleteDocument(col.databaseId, col.id, id),

    query: {
      equal: (attribute, value) => Query.equal(attribute, value),
      orderDesc: (attribute) => Query.orderDesc(attribute),
    },
  };
});

export { db, Query };
=======
    list: (queries) => database.listDocuments(col.databaseId, col.id, queries),

    delete: (id) => database.deleteDocument(col.databaseId, col.id, id),
  };
});

export { db };
>>>>>>> Admin-Recive-Message#5
