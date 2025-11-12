import { NextResponse } from "next/server";
import { execute } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get("table");
    if (!table) {
      return NextResponse.json({ error: "Tabela não informada" }, { status: 400 });
    }
    const rows = await execute(
      `SELECT column_name, data_type, is_nullable, column_key, extra
       FROM information_schema.columns
       WHERE table_schema = DATABASE() AND table_name = ?
       ORDER BY ordinal_position`,
      [table]
    );
    return NextResponse.json({ columns: rows });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Erro" }, { status: 500 });
  }
}


