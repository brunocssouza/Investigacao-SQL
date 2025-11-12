import { NextResponse } from "next/server";
import { execute } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const password: string | undefined = body?.password;
    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Senha inválida" }, { status: 400 });
    }

    const rows = await execute("SELECT senha FROM credenciais ORDER BY id ASC LIMIT 1");
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Credenciais não configuradas" }, { status: 500 });
    }
    const hash = (rows[0] as any).senha as string;
    const ok = await bcrypt.compare(password, hash);
    if (!ok) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_auth", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1h
    });
    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Erro ao autenticar" },
      { status: 500 }
    );
  }
}


