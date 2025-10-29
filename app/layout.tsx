import type React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Museu Mistério - Consultas',
  description: 'Interface somente-SELECT via Prisma',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 antialiased`}>
        {/* Ambient decorative blobs */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl animate-[blob_16s_ease-in-out_infinite]"></div>
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-600/20 blur-3xl animate-[blob_18s_ease-in-out_infinite]"></div>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-900/60 backdrop-blur supports-backdrop-filter:bg-slate-900/40">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-lg bg-linear-to-br from-indigo-500 to-emerald-500 shadow-lg animate-float"></div>
              <span className="text-sm font-semibold tracking-wide text-slate-200">Investigação SQL</span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">
          {children}
        </main>

        <footer className="mt-6 border-t border-white/10 bg-slate-900/60 backdrop-blur supports-backdrop-filter:bg-slate-900/40">
          <div className="mx-auto max-w-5xl px-4 py-3 text-slate-300">
            Caso encontre dificuldades, você pode pedir auxílio para um dos orientadores.
          </div>
        </footer>
      </body>
    </html>
  );
}


