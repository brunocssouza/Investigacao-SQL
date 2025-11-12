import { NextResponse } from "next/server";
import { execute } from "@/lib/db";

export async function GET() {
	try {
		const rows = await execute("SELECT * FROM `vencedores` ORDER BY `nome` ASC");
		return NextResponse.json({ rows });
	} catch (err: any) {
		return NextResponse.json(
			{ error: err?.message || "Erro ao listar vencedores" },
			{ status: 500 }
		);
	}
}


