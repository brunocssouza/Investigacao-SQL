import type React from 'react';
import './globals.css';

export const metadata = {
  title: 'Museu Mistério - Consultas',
  description: 'Interface somente-SELECT via Prisma',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif', margin: 0, background: '#F5472A', color: '#0f172a' }}>
        <main style={{ maxWidth: 1100, margin: '0 auto', padding: 20 }}>{children}</main>
        <footer style={{ borderTop: '1px solid #e5e7eb', marginTop: 24, background: '#f8fafc' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 20px', color: '#475569'  }}>
            Caso encontre dificuldades, você pode pedir auxilio para um dos orientadores.
          </div>
        </footer>
      </body>
    </html>
  );
}


