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

    // Descobre colunas auto_increment para ignorar
    const colsMeta = await execute(
      `SELECT column_name, extra FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ? ORDER BY ordinal_position`,
      [table]
    );
    const autoCols = new Set(
      colsMeta.filter((c: any) => (c.extra as string)?.includes("auto_increment")).map((c: any) => c.column_name)
    );

    const entries = Object.entries(payload).filter(([k]) => !autoCols.has(k));
    if (entries.length === 0) {
      return NextResponse.json({ error: "Nenhum campo para inserir" }, { status: 400 });
    }

    const columns = entries.map(([k]) => `\`${k}\``).join(", ");
    const placeholders = entries.map(() => "?").join(", ");
    const values = entries.map(([, v]) => v);

    await execute(`INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`, values);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Erro" }, { status: 500 });
  }
}


