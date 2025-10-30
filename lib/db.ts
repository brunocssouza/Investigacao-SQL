import { createPool, type Pool } from 'mysql2/promise';

declare global {
  // Evita recriar pool em HMR no Next.js
  // eslint-disable-next-line no-var
  var mysqlPool: Pool | undefined;
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL não definido nas variáveis de ambiente');
}

const pool: Pool = globalThis.mysqlPool || createPool(databaseUrl);
if (process.env.NODE_ENV !== 'production') {
  globalThis.mysqlPool = pool;
}

export async function queryRaw(sql: string): Promise<any[]> {
  const [rows] = await pool.query(sql);
  return rows as any[];
}


