import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function isSelectOnly(sql: string): boolean {
  if (!sql) return false;
  const trimmed = sql.trim();
  if (trimmed.length === 0 || trimmed.length > 4000) return false;

  // Bloqueia comentários e múltiplas sentenças
  if (/;|--|\/\*/.test(trimmed)) return false;

  const normalized = trimmed.replace(/\s+/g, ' ').toLowerCase();
  if (!normalized.startsWith('select')) return false;

  // Palavras perigosas fora SELECT
  const forbidden = [
    ' insert ',
    ' update ',
    ' delete ',
    ' drop ',
    ' alter ',
    ' create ',
    ' truncate ',
    ' grant ',
    ' revoke ',
    ' call ',
    ' use ',
    ' replace ',
    ' rename ',
    ' outfile',
    ' infile',
    ' load_file',
    ' benchmark',
    ' sleep',
  ];
  for (const token of forbidden) {
    if (normalized.includes(token)) return false;
  }

  // Restringe UNION para evitar pivot para outras queries
  if (/\bunion\b/i.test(trimmed)) return false;

  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const query: string | undefined = body?.query;
    console.log(query)

    if (!query || !isSelectOnly(query)) {
      return NextResponse.json(
        { error: 'Somente SELECT simples é permitido.' },
        { status: 400 }
      );
    }

    const rows = (await prisma.$queryRawUnsafe<any[]>(query)) ?? [];
    return NextResponse.json({ rows });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Erro ao executar consulta. Verifique novamente a sintáxe.' },
      { status: 500 }
    );
  }
}


