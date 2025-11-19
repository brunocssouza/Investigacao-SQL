import type React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Investigação SQL',
  description: 'Resolva mistérios com programação!',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className={`${inter.className} app-bg text-slate-100 antialiased`}>


        <main className="md:pb-16 pb-0">
          {children}
        </main>

        <footer className="w-full border-t border-white/10 bg-slate-800 backdrop-blur supports-backdrop-filter:bg-slate-800 md:fixed md:bottom-0">
          <div className="mx-auto flex flex-wrap items-center justify-center sm:justify-between px-4 py-3 gap-4">
            <div className="text-xs sm:text-sm text-white ">
              Caso encontre dificuldades, você pode pedir auxílio para um dos orientadores.
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/brunocssouza/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Bruno Souza"
                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-white hover:bg-white/10 transition-colors"
                title="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.943v5.663H9.086V9h3.111v1.561h.045c.434-.822 1.494-1.69 3.073-1.69 3.287 0 3.894 2.164 3.894 4.98v6.601zM5.337 7.433a1.81 1.81 0 1 1 0-3.62 1.81 1.81 0 0 1 0 3.62zM6.9 20.452H3.77V9H6.9v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/brunocssouza/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Bruno Souza"
                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-white hover:bg-white/10 transition-colors"
                title="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10z"/>
                  <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                  <circle cx="17.5" cy="6.5" r="1.5"/>
                </svg>
              </a>
              <a
                href="https://github.com/brunocssouza"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Bruno Souza"
                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-white hover:bg-white/10 transition-colors"
                title="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.475 2 2 6.59 2 12.253c0 4.52 2.865 8.349 6.839 9.699.5.095.682-.221.682-.492 0-.242-.009-.882-.014-1.731-2.782.613-3.369-1.37-3.369-1.37-.455-1.175-1.11-1.488-1.11-1.488-.908-.636.069-.623.069-.623 1.004.072 1.532 1.062 1.532 1.062.892 1.57 2.341 1.117 2.91.854.091-.661.35-1.117.636-1.374-2.221-.258-4.555-1.137-4.555-5.06 0-1.118.389-2.033 1.028-2.75-.103-.258-.446-1.297.098-2.704 0 0 .84-.274 2.75 1.05a9.301 9.301 0 0 1 2.5-.345c.848.004 1.705.118 2.504.345 1.909-1.324 2.748-1.05 2.748-1.05.546 1.407.203 2.446.1 2.704.64.717 1.027 1.632 1.027 2.75 0 3.933-2.338 4.799-4.566 5.053.359.318.679.943.679 1.902 0 1.372-.012 2.478-.012 2.816 0 .273.18.592.688.491C19.138 20.6 22 16.772 22 12.253 22 6.59 17.523 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>

       
      </body>
    </html>
  );
}


