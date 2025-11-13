import { NextResponse } from "next/server";
import { execute } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get("table");
    if (!table) {
      return NextResponse.json({ error: "Tabela não informada" }, { status: 400 });
    }
    const payload = await request.json().catch(() => ({}));
    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    // Segurança básica do identificador de tabela
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(table)) {
      return NextResponse.json({ error: "Nome de tabela inválido" }, { status: 400 });
    }

    // Descobre colunas primárias para ignorar (equivalente ao auto_increment no UI)
    const colsMeta = await execute(`PRAGMA table_info("${table.replace(/"/g, '""')}")`);
    const autoCols = new Set(colsMeta.filter((c: any) => c.pk).map((c: any) => c.name));

    const entries = Object.entries(payload).filter(([k]) => !autoCols.has(k));
    if (entries.length === 0) {
      return NextResponse.json({ error: "Nenhum campo para inserir" }, { status: 400 });
    }

    // Segurança básica de nomes de colunas
    for (const [k] of entries) {
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(k)) {
        return NextResponse.json({ error: `Coluna inválida: ${k}` }, { status: 400 });
      }
    }

    const columns = entries.map(([k]) => `"${k}"`).join(", ");
    const placeholders = entries.map(() => "?").join(", ");
    const values = entries.map(([, v]) => v);

    await execute(`INSERT INTO "${table}" (${columns}) VALUES (${placeholders})`, values);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Erro" }, { status: 500 });
  }
}


