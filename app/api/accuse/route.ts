import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
	try {
		const body = await request.json().catch(() => ({}));
		const name: string | undefined = body?.name;
		if (!name || typeof name !== "string") {
			return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
		}

		const hash = process.env.CULPRIT_HASH;
		if (!hash) {
			return NextResponse.json(
				{ error: "CULPRIT_HASH não configurado no servidor" },
				{ status: 500 }
			);
		}

		const normalized = name.trim().toLowerCase();
		const ok = await bcrypt.compare(normalized, hash);
		return NextResponse.json({ correct: ok });
	} catch (err: any) {
		return NextResponse.json(
			{ error: err?.message || "Erro ao verificar acusação" },
			{ status: 500 }
		);
	}
}


