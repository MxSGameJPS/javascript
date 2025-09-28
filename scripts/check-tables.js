const { Client } = require("pg");
const CONNECTION =
  process.env.NEON_DATABASE_URL ||
  "postgresql://neondb_owner:npg_cGsr8gqvkO4J@ep-steep-darkness-ac8ctclq-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

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
