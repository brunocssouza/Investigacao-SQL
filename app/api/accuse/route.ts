import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json().catch(() => ({}));
		const name: string | undefined = body?.name;
		if (!name || typeof name !== "string") {
			return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
		}

		const configuredName = process.env.CULPRIT_NAME || "Hugo Martins";
		if (!configuredName) {
			return NextResponse.json(
				{ error: "CULPRIT_NAME não configurado no servidor" },
				{ status: 500 }
			);
		}

		const normalize = (s: string) => s.trim().toLowerCase();
		const ok = normalize(name) === normalize(configuredName);
		return NextResponse.json({ correct: ok });
	} catch (err: any) {
		return NextResponse.json(
			{ error: err?.message || "Erro ao verificar acusação" },
			{ status: 500 }
		);
	}
}


