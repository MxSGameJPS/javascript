import { Pool } from "pg";

const CONNECTION_STRING =
  process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

let pool;
function ensureConnectionString() {
  if (!CONNECTION_STRING) {
    throw new Error(
      "NEON_DATABASE_URL or DATABASE_URL is not set. Set it in your environment and do NOT commit credentials to source control."
    );
  }
}

function getPool() {
  ensureConnectionString();
  if (!pool) {
    pool = new Pool({ connectionString: CONNECTION_STRING });
  }
  return pool;
}

export async function query(text, params) {
  const p = getPool();
  return p.query(text, params);
}
