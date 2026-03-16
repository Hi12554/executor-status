import pg from "pg";

const { Pool } = pg;

const url = process.env.NEON_DATABASE_URL;

if (!url) {
  throw new Error("NEON_DATABASE_URL is not set.");
}

export const pool = new Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS executor_data (
      id INTEGER PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  const { rows } = await pool.query("SELECT id FROM executor_data WHERE id = 1");
  if (rows.length === 0) {
    const { EXECUTOR_DATA } = await import("../data/defaultData.js");
    await pool.query(
      "INSERT INTO executor_data (id, data) VALUES (1, $1)",
      [JSON.stringify(EXECUTOR_DATA)]
    );
    console.log("Database seeded with default executor data.");
  }
}

export async function getExecutorData(): Promise<object[]> {
  const { rows } = await pool.query("SELECT data FROM executor_data WHERE id = 1");
  return rows[0]?.data ?? [];
}

export async function setExecutorData(data: object[]): Promise<void> {
  await pool.query(
    "INSERT INTO executor_data (id, data, updated_at) VALUES (1, $1, NOW()) ON CONFLICT (id) DO UPDATE SET data = $1, updated_at = NOW()",
    [JSON.stringify(data)]
  );
}
