const { Client } = require("pg");
const CONNECTION = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

if (!CONNECTION) {
  console.error("NEON_DATABASE_URL or DATABASE_URL is not set.");
  process.exit(1);
}

(async () => {
  const c = new Client({ connectionString: CONNECTION });
  try {
    await c.connect();
    const res = await c.query("SELECT id, name, email FROM users;");
    console.log("users:", res.rows);
  } catch (e) {
    console.error("db error", e && e.message ? e.message : e);
  } finally {
    await c.end();
  }
})();
