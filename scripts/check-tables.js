const { Client } = require("pg");
const CONNECTION = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;

if (!CONNECTION) {
  console.error(
    "NEON_DATABASE_URL or DATABASE_URL is not set. Set the connection string in your environment and do NOT commit it to source control."
  );
  process.exit(1);
}

(async () => {
  const c = new Client({ connectionString: CONNECTION });
  try {
    await c.connect();
    const r = await c.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    );
    console.log(
      "tables:",
      r.rows.map((r) => r.table_name)
    );
  } catch (e) {
    console.error(e);
  } finally {
    await c.end();
  }
})();
