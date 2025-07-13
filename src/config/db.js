const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function runMigration(fileName) {
  const client = await pool.connect();
  try {
    const migrationQuery = fs.readFileSync(
      path.join(__dirname, `../migrations/${fileName}`),
      "utf8"
    );
    await client.query(migrationQuery);
    console.log(`Migration ${fileName} executed successfully`);
  } catch (error) {
    console.error(`Error running migration ${fileName}:`, error);
  } finally {
    client.release();
  }
}

async function runMigrations() {
  await runMigration("create_users_table.sql");
  await runMigration("create_projects_table.sql");
}

runMigrations();

module.exports = pool;
