import { NextResponse } from "next/server";
import { execute } from "@/lib/db";

export async function GET() {
  try {
    const rows = await execute(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = DATABASE() ORDER BY table_name"
    );
    const tables = rows.map((r: any) => r.table_name);
    return NextResponse.json({ tables });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Erro" }, { status: 500 });
  }
}


