import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).send("Only GET allowed");
  const { filename } = req.query;
  if (!filename) return res.status(400).send("Missing filename");
  await client.connect();
  const db = client.db("emergencybriefcase");
  const file = await db.collection("files").findOne({ filename });
  if (!file) return res.status(404).send("File not found");
  res.json({ content: file.content });
}
