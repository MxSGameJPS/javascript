const fs = require("fs");
const { Client } = require("pg");

const path = require("path");
const MIGRATION = path.resolve(
  __dirname,
  "..",
  "migrations",
  "create_users.sql"
);
const CONNECTION =
  process.env.NEON_DATABASE_URL ||
  "postgresql://neondb_owner:npg_cGsr8gqvkO4J@ep-steep-darkness-ac8ctclq-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

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
