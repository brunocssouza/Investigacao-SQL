import { createClient, type Client } from '@libsql/client';

declare global {
	// eslint-disable-next-line no-var
	var libsqlClient: Client | undefined;
}

const tursoUrl = process.env.TURSO_DB_URL || process.env.DATABASE_URL;
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

if (!tursoUrl) {
	throw new Error('TURSO_DB_URL ou DATABASE_URL não definido nas variáveis de ambiente');
}

const client: Client =
	globalThis.libsqlClient ||
	createClient({
		url: tursoUrl,
		authToken: tursoAuthToken,
	});

if (process.env.NODE_ENV !== 'production') {
	globalThis.libsqlClient = client;
}

export async function queryRaw(sql: string): Promise<any[]> {
	const res = await client.execute(sql);
	// libSQL retorna rows em formato array-like; normalizamos para array simples
	return (res.rows as unknown as any[]) ?? [];
}

export async function execute(sql: string, params: any[] = []): Promise<any[]> {
	const res = await client.execute({ sql, args: params });
	return (res.rows as unknown as any[]) ?? [];
}


