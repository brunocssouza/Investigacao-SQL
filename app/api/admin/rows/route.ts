import { NextResponse } from "next/server";
import { execute } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get("table");
    const limitStr = searchParams.get("limit") || "200";
    const limit = Math.min(Math.max(parseInt(limitStr, 10) || 200, 1), 1000);
    if (!table) {
      return NextResponse.json({ error: "Tabela não informada" }, { status: 400 });
    }

    // Identificadores seguros: apenas letras, números e underscore
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(table)) {
      return NextResponse.json({ error: "Nome de tabela inválido" }, { status: 400 });
    }

    const rows = await execute(`SELECT * FROM "${table}" LIMIT ${limit}`);
    return NextResponse.json({ rows });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Erro" }, { status: 500 });
  }
}


