import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const password: string | undefined = body?.password;
    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Senha inválida" }, { status: 400 });
    }

    const envPassword = process.env.ADMIN_PASSWORD;
    if (!envPassword) {
      return NextResponse.json({ error: "ADMIN_PASSWORD não configurado" }, { status: 500 });
    }
    if (password !== envPassword) {
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


