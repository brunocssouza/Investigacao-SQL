"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import ShowWinners from "./ShowWinners";

export default function Introduction({ onSubmit }: { onSubmit: (hardMode: boolean) => void }) {

    const [difficultyModal, setDifficultyModal] = useState(false)
    const [showWinners, setShowWinners] = useState(false);

    // Oculta o footer enquanto a introdução estiver visível
    useEffect(() => {
        document.body.classList.add("hide-footer");
        return () => {
            document.body.classList.remove("hide-footer");
        };
    }, []);

    return (
        <main className="w-full min-h-screen flex justify-center items-center flex-col">
            <div className="fixed top-4 right-4 z-50">
                <Link
                    href="/admin"
                    className="px-4 py-2 rounded-md border border-white/30 text-sm hover:bg-white hover:text-black transition-colors"
                >
                    Administrador
                </Link>
            </div>
            <div className="p-4 mb-12">
                <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl text-center mb-8 py-2" style={{color: '#fff'}}>Investigação <span className="text-amber-500">SQL</span></h1>
                <p className="text-slate-400 text-center text-base sm:text-lg md:text-xl" style={{color: '#8f8f8f'}}>Um furto ocorreu em um Museu e depende de você utilizar SQL como forma de descobrir quem foi o culpado.</p>
            </div>

            <div className=" p-4  flex flex-col items-center justify-center gap-4">
                <h2 className="font-bold text-xl sm:text-2xl text-center" style={{color: '#fff'}}>Pronto para começar?</h2>
                <button
                    className="group px-10 py-3 mb-4 rounded-md bg-amber-500 text-white font-semibold hover:scale-105 hover:bg-white hover:text-black hover:border transition-transform duration-300 inline-flex items-center"
                    onClick={() => setDifficultyModal(!difficultyModal)}
                >
                    <span>Jogar</span>
                    <span className="ml-2 inline-block transition-all duration-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0">
                        →
                    </span>
                </button>

                {/* Ícones grandes GitHub e LinkedIn */}
                <div className="flex items-center gap-6 mb-6">
                    <a
                        href="https://github.com/brunocssouza"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-white/90 hover:text-white transition-colors"
                        title="GitHub"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="56" height="56" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.475 2 2 6.59 2 12.253c0 4.52 2.865 8.349 6.839 9.699.5.095.682-.221.682-.492 0-.242-.009-.882-.014-1.731-2.782.613-3.369-1.37-3.369-1.37-.455-1.175-1.11-1.488-1.11-1.488-.908-.636.069-.623.069-.623 1.004.072 1.532 1.062 1.532 1.062.892 1.57 2.341 1.117 2.91.854.091-.661.35-1.117.636-1.374-2.221-.258-4.555-1.137-4.555-5.06 0-1.118.389-2.033 1.028-2.75-.103-.258-.446-1.297.098-2.704 0 0 .84-.274 2.75 1.05a9.301 9.301 0 0 1 2.5-.345c.848.004 1.705.118 2.504.345 1.909-1.324 2.748-1.05 2.748-1.05.546 1.407.203 2.446.1 2.704.64.717 1.027 1.632 1.027 2.75 0 3.933-2.338 4.799-4.566 5.053.359.318.679.943.679 1.902 0 1.372-.012 2.478-.012 2.816 0 .273.18.592.688.491C19.138 20.6 22 16.772 22 12.253 22 6.59 17.523 2 12 2z" />
                        </svg>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/brunocssouza/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-white/90 hover:text-white transition-colors"
                        title="LinkedIn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="56" height="56" fill="currentColor" aria-hidden="true">
                            <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.943v5.663H9.086V9h3.111v1.561h.045c.434-.822 1.494-1.69 3.073-1.69 3.287 0 3.894 2.164 3.894 4.98v6.601zM5.337 7.433a1.81 1.81 0 1 1 0-3.62 1.81 1.81 0 0 1 0 3.62zM6.9 20.452H3.77V9H6.9v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                </div>

                <button className="underline" onClick={() => setShowWinners(!showWinners)}>
                    {showWinners ? "Ocultar vencedores" : "Ver vencedores anteriores"}
                </button>
            </div>
            {showWinners && (
                <ShowWinners />
            )}


            {difficultyModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="difficulty-title"
                    onClick={() => setDifficultyModal(!difficultyModal)}
                >
                    <div
                        className="w-full max-w-3xl rounded-lg bg-white text-black shadow-[0_0_30px_-10px_rgba(0,0,0,0.6)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h4 id="difficulty-title" className="font-semibold text-xl">Escolha a dificuldade</h4>
                            <button
                                className="rounded-md px-3 py-1 text-sm border hover:bg-black hover:text-white transition-colors"
                                onClick={() => setDifficultyModal(!difficultyModal)}
                                aria-label="Fechar modal"
                            >
                                Fechar
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 justify-center text-2xl font-medium">
                                <button
                                    className="flex-1 px-6 py-8 shadow-md bg-amber-400 text-black font-bold rounded-md hover:scale-105 duration-300 hover:bg-white hover:border hover:text-black transition-transform text-left"
                                    onClick={() => { onSubmit(false); }}
                                >
                                    Detetive Novato
                                    <p className="text-base font-light mt-2">Você terá dicas e exemplos para te guiar.</p>
                                </button>
                                <button
                                    className="flex-1 px-6 py-8 shadow-md bg-red-600 text-white font-bold rounded-md hover:scale-105 duration-300 hover:bg-white hover:border hover:text-black transition-transform text-left"
                                    onClick={() => onSubmit(true)}
                                >
                                    Sherlock Holmes
                                    <p className="text-base font-light mt-2">Boa sorte.</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}