import { Client } from "pg";

// The DB connection string MUST come from an environment variable.
// Do NOT hardcode credentials here.
const CONNECTION_STRING =
  process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

let client;

function ensureConnectionString() {
  if (!CONNECTION_STRING) {
    throw new Error(
      "NEON_DATABASE_URL or DATABASE_URL is not set. Set it in your environment and do NOT commit credentials to source control."
    );
  }
}

export async function getClient() {
  ensureConnectionString();
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
