"use client"

import { useState } from "react";
import Link from "next/link";
import ShowWinners from "./ShowWinners";

export default function Introduction({ onSubmit }: { onSubmit: (hardMode: boolean) => void }) {

    const [difficultyModal, setDifficultyModal] = useState(false)
    const [showWinners, setShowWinners] = useState(false);

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
                <h1 className="font-bold text-6xl text-center mb-8  py-2">Investigação <span className="text-amber-500">SQL</span></h1>
                <p className="text-slate-400 text-center text-xl">Um furto ocorreu em um Museu e depende de você utilizar SQL como forma de descobrir quem foi o culpado.</p>
            </div>

            <div className=" p-4  flex flex-col items-center justify-center gap-4">
                <h2 className="font-bold text-2xl text-center">Pronto para começar?</h2>
                <button
                    className=" px-10 py-3 mb-8 rounded-md bg-amber-500 text-white font-semibold hover:scale-105 hover:bg-white hover:text-black hover:border transition-transform duration-300"
                    onClick={() => setDifficultyModal(!difficultyModal)}
                >
                    Jogar
                </button>
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