const fs = require("fs");
const { Client } = require("pg");

const path = require("path");
const MIGRATION = path.resolve(
  __dirname,
  "..",
  "migrations",
  "create_users.sql"
);
const CONNECTION = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

if (!CONNECTION) {
  console.error(
    "NEON_DATABASE_URL or DATABASE_URL is not set. Set the connection string in your environment and do NOT commit it to source control."
  );
  process.exit(1);
}

async function run() {
  const sql = fs.readFileSync(MIGRATION, "utf8");
  const client = new Client({ connectionString: CONNECTION });
  try {
    await client.connect();
    console.log("Connected to DB, running migration...");
    // create extension if not exists
    await client.query("CREATE EXTENSION IF NOT EXISTS pgcrypto;");
    await client.query(sql);
    console.log("Migration applied.");
  } catch (err) {
    console.error("Migration error", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
