import pg from "pg";

const { Pool } = pg;

let pool: pg.Pool | null = null;

export function getPostgresPool() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL
  });

  return pool;
}

export async function initialiseExtractionTables() {
  const db = getPostgresPool();
  if (!db) {
    return;
  }

  await db.query(`
    create table if not exists brand_extractions (
      id uuid primary key,
      website_url text not null,
      status text not null,
      output_json jsonb,
      error text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);
}
