import { NextResponse } from "next/server";
import { execute } from "@/lib/db";

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get("table");
    const pk = searchParams.get("pk");
    const id = searchParams.get("id");
    if (!table || !pk || !id) {
      return NextResponse.json({ error: "Parâmetros ausentes" }, { status: 400 });
    }

    const payload = await request.json().catch(() => ({}));
    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const entries = Object.entries(payload);
    if (entries.length === 0) {
      return NextResponse.json({ error: "Nenhuma alteração" }, { status: 400 });
    }

    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(table) || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(pk)) {
      return NextResponse.json({ error: "Identificadores inválidos" }, { status: 400 });
    }
    for (const [k] of entries) {
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(k)) {
        return NextResponse.json({ error: `Coluna inválida: ${k}` }, { status: 400 });
      }
    }

    const sets = entries.map(([k]) => `"${k}" = ?`).join(", ");
    const values = entries.map(([, v]) => v);
    values.push(id);

    await execute(`UPDATE "${table}" SET ${sets} WHERE "${pk}" = ?`, values);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Erro" }, { status: 500 });
  }
}


