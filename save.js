import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");
  const { filename, content } = req.body;
  if (!filename || typeof content !== "string") return res.status(400).send("Missing filename or content");
  await client.connect();
  const db = client.db("emergencybriefcase");
  await db.collection("files").updateOne(
    { filename },
    { $set: { content } },
    { upsert: true }
  );
  res.send("Saved!");
}
