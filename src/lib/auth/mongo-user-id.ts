import { ObjectId, type Document, type Filter } from "mongodb";

export const getMongoUserIdFilter = (id: string): Filter<Document> => ({
  _id: new ObjectId(id),
});
