import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir login sem cookie
  if (pathname === "/admin" || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  const needsAuth =
    pathname.startsWith("/admin/crud") || pathname.startsWith("/api/admin/");

  if (!needsAuth) {
    return NextResponse.next();
  }

  const hasCookie = req.cookies.get("admin_auth")?.value === "1";
  if (hasCookie) {
    return NextResponse.next();
  }

  // Se é API protegida sem cookie, responder 401
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  // Redireciona para /admin
  const url = req.nextUrl.clone();
  url.pathname = "/admin";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};


