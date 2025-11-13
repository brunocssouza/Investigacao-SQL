import { NextResponse } from "next/server";
import { execute } from "@/lib/db";

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get("table");
    const pk = searchParams.get("pk");
    const id = searchParams.get("id");
    if (!table || !pk || !id) {
      return NextResponse.json({ error: "Parâmetros ausentes" }, { status: 400 });
    }

    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(table) || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(pk)) {
      return NextResponse.json({ error: "Identificadores inválidos" }, { status: 400 });
    }

    await execute(`DELETE FROM "${table}" WHERE "${pk}" = ?`, [id]);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Erro" }, { status: 500 });
  }
}


