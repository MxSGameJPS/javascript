import { Client } from "pg";

// Prefer environment variable; fallback to the provided connection string.
const CONNECTION_STRING =
  process.env.NEON_DATABASE_URL ||
  "postgresql://neondb_owner:npg_cGsr8gqvkO4J@ep-steep-darkness-ac8ctclq-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

let client;

export async function getClient() {
  if (!client) {
    client = new Client({ connectionString: CONNECTION_STRING });
    await client.connect();
  }
  return client;
}

export async function query(text, params) {
  const c = await getClient();
  return c.query(text, params);
}
