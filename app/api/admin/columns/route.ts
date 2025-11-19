import { NextResponse } from "next/server";
import { execute } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get("table");
    if (!table) {
      return NextResponse.json({ error: "Tabela não informada" }, { status: 400 });
    }

    // PRAGMA table_info retorna: cid, name, type, notnull (0/1), dflt_value, pk (0/1)
    const pragmaRows = await execute(`PRAGMA table_info("${table.replace(/"/g, '""')}")`);

    const columns = (pragmaRows || []).map((r: any) => ({
      column_name: r.name as string,
      data_type: (r.type as string) || "",
      is_nullable: r.notnull ? "NO" : "YES",
      column_key: r.pk ? "PRI" : "",
      extra: r.pk ? "auto_increment" : "",
    }));

    return NextResponse.json({ columns });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Erro" }, { status: 500 });
  }
}


