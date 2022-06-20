import { Collection } from 'mongodb';
import nextConnect from 'next-connect';

import middleware from '@/middleware/database';

const COLLECTION = 'authors';

const handler = nextConnect();

handler.use(middleware);

type AuthorSchema = {
  id: number;
  name: string;
}

handler.get(async (req: any, res: any) => {
  const collection = req.db.collection(COLLECTION) as Collection<AuthorSchema>;

  const findResult = await collection.find({}).toArray();

  res.json(findResult);
});

handler.post(async (req: any, res: any) => {
  const collection = req.db.collection(COLLECTION) as Collection<AuthorSchema>;

  const doc = JSON.parse(req.body);

  const result = await collection.insertOne(doc);

  res.json(result);
});

export default handler;
