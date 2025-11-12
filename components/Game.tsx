"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";

type Row = Record<string, unknown>;

export default function Game({ hardMode = false }: { hardMode: boolean }) {

    const [query, setQuery] = useState("");
    const [rows, setRows] = useState<Row[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [dicas, setDicas] = useState(false);
    const [tentativaErrada, setTentativaErrada] = useState(false);
    const [tentativaCerta, setTentativaCerta] = useState(false)
    const [tentativas, setTentativas] = useState(0)
    const [activeSection, setActiveSection] = useState<number>(0);

    const columns = useMemo(() => {
        if (!rows || rows.length === 0) return [] as string[];
        const keys = new Set<string>();
        rows.forEach((r) => Object.keys(r).forEach((k) => keys.add(k)));
        return Array.from(keys);
    }, [rows]);

    const examples = [
        {
            title: "Mostrar todos da tabela funcionários",
            sql: "SELECT * FROM funcionarios",
            hint: 'SELECT * FROM funcionarios: retorna todas as colunas e linhas da tabela "funcionarios".',
        },
        {
            title: "Mostrar todos os funcionários em ordem alfabética",
            sql: "SELECT * FROM funcionarios ORDER BY nome ASC",
            hint: 'ORDER BY nome ASC: retorna o resultado em ordem alfabética de sua coluna "nome".',
        },
        {
            title: "Buscar por um registro específico",
            sql: "SELECT * FROM funcionarios WHERE nome = 'Otávio Silva'",
            hint: 'WHERE nome = "Otávio Silva": filtra os resultados para mostrar apenas o funcionário com esse nome.',
        },
        {
            title: "Buscar por um registro parcial",
            sql: "SELECT * FROM funcionarios WHERE nome LIKE '%Silva%'",
            hint: 'LIKE "%Olivia%": busca por qualquer ocorrência da palavra "Olivia" na coluna "nome".',
        },
    ];

    async function run() {
        setLoading(true);
        setError(null);
        setRows(null);
        try {
            const res = await fetch("/api/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Falha na consulta");
            setRows(data.rows || []);
            // Leva o usuário para a seção de resultados no "carrossel"
            setActiveSection(4);
        } catch (e: any) {
            setError(e?.message || "Erro inesperado");
        } finally {
            setLoading(false);
        }
    }

    function guessCulprit(inputValue: string) {
        const name = inputValue.trim();

        setTentativas((prev) => prev + 1);

        if (!name) {
            Swal.fire({
                title: "Digite um nome!",
                icon: "warning",
                background: "#2b2e36",
                color: "#fff",
                confirmButtonColor: "#4f46e5",
            });
            return;
        }

        Swal.fire({
            title: "Tem certeza?",
            text: "Você só tem uma única chance de acusar o culpado!",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sim, tenho certeza!",
            cancelButtonText: "Cancelar",
            background: "#2b2e36",
            color: "#fff",
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                if (name.toLowerCase() === "hugo martins") {
                    setTentativaErrada(false);
                    setTentativaCerta(true);
                    Swal.fire({
                        title: "Correto!",
                        text: "Você encontrou o culpado pelo roubo do Diamante do Amanhecer!",
                        icon: "success",
                        background: "#2b2e36",
                        color: "#fff",
                        confirmButtonColor: "#4f46e5",
                    });
                } else {
                    setTentativaErrada(true);
                    setTentativaCerta(false);
                    Swal.fire({
                        title: "Incorreto!",
                        text: "O culpado saiu impune desta vez.",
                        icon: "error",
                        background: "#2b2e36",
                        color: "#fff",
                        confirmButtonColor: "#4f46e5",
                    });
                }
            }
        });
    }

    // Índices das sections no carrossel
    const SECTION_INDEX = {
        NEWSPAPER: 0,
        OVERVIEW: 1,
        EXAMPLES: 2,
        CONSOLE: 3,
        RESULTS: 4
    } as const;

    return (
        <div className="w-11/12 mx-auto py-8 relative">
            {/* Navegação flutuante à direita */}
            <nav className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
                {[
                    { label: "Jornal", idx: SECTION_INDEX.NEWSPAPER },
                    { label: "Resumo", idx: SECTION_INDEX.OVERVIEW },
                    { label: "Exemplos", idx: SECTION_INDEX.EXAMPLES },
                    { label: "Console", idx: SECTION_INDEX.CONSOLE },
                    { label: "Resultados", idx: SECTION_INDEX.RESULTS }
                ].map((b) => (
                    <button
                        key={b.idx}
                        aria-label={b.label}
                        title={b.label}
                        onClick={() => setActiveSection(b.idx)}
                        className={`float-nav-btn ${activeSection === b.idx ? "active" : ""}`}
                    >
                        {b.idx + 1}
                    </button>
                ))}
            </nav>

            {/* Trilho carrossel */}
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${activeSection * 100}%)` }}
                >
                    {/* 0 - Jornal (realista) */}
                    <section className="w-full shrink-0 px-1 md:px-2">
                        <div className="newspaper newspaper-section w-full space-y-8 border p-6 md:p-10">
                            <div className="flex flex-col justify-center items-center gap-4">
                                <img
                                    src="./diamante.png"
                                    alt="Diamante do Amanhecer"
                                    className="max-h-48 max-w-48"
                                />

                                <div className="px-2 md:px-8 py-6 md:py-8">
                                    <h1 className="newspaper-title text-4xl md:text-5xl">Jornal de Hoje</h1>
                                    <div className="byline text-center mb-2">
                                        <span className="dateline">15 de setembro de 2025</span> · Museu Aurora Arte & História
                                    </div>
                                    <p className="newspaper-lead drop-cap newspaper-columns">
                                        Na madrugada de <strong>15 de setembro de 2025</strong>, o museu
                                        “Aurora Arte & História” sofreu um furto de um de seus itens
                                        {hardMode ? " mas nada mais de importância foi divulgado para a imprensa" : ": o Diamante do Amanhecer, uma joia lendária recém-chegada de uma exposição internacional"}.
                                        A peça desapareceu {hardMode ? "de uma das salas" : "da Sala de Tesouros entre 02h e 03h da manhã. Acreditam que saber quais funcionários tinham acesso a sala que sofreu o furto é o ponto de partida pra descobrir o mistério."}.
                                        Nenhum alarme disparou. Apenas os registros de acesso e os depoimentos dos funcionários restaram como fonte de pistas.
                                        <br />
                                        <br />
                                        {hardMode ? "": "A investigação interna indica que um funcionário do museu foi o responsável — alguém com acesso restrito, conhecimentotécnico e um álibi falso."}
                                    </p>    
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 1 - Resumo (Objetivo / Tabelas / DER) */}
                    <section className="w-full shrink-0 px-1 md:px-2">
                        <div className="glass-section p-6 md:p-8 space-y-6 animate-fade-in-up">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="glass-card p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                    <h2 className="mb-2 font-bold text-slate-100">Objetivo</h2>
                                    <ul className="text-slate-300">
                                        <li>- Descobrir quem roubou o diamante;</li>
                                        <li>- Quais evidências levaram a essa conclusão.</li>
                                    </ul>
                                </div>
                                <div className="glass-card p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                    <h2 className="mb-2 font-bold text-slate-100">Tabelas</h2>
                                    <ul className="space-y-1 text-slate-300">
                                        <li>
                                            <strong>funcionarios</strong> — Identifica cada funcionário e cargo.
                                        </li>
                                        <li>
                                            <strong>salas</strong> — Mostra as localizações e nomes das áreas.
                                        </li>
                                        <li>
                                            <strong>obras</strong> — Registra as peças do museu.
                                        </li>
                                        <li>
                                            <strong>acessos</strong> — Registra horários e locais de entrada/saída.
                                        </li>
                                        <li>
                                            <strong>movimentacoes</strong> — Mostra quando itens foram movidos ou manipulados.
                                        </li>
                                        <li>
                                            <strong>depoimentos</strong> — Declarações dos funcionários.
                                        </li>
                                        <li>
                                            <strong>permissoes</strong> — Que funcionario tem permissao a qual sala.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="glass-card p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <h2 className="mb-2 font-bold text-slate-100">Modelo DER</h2>
                                <Image
                                    src="/Modelo DER - O Roubo do Diamante do Amanhecer.png"
                                    width={1000}
                                    height={600}
                                    alt="Modelo DER"
                                />
                            </div>
                        </div>
                    </section>

                    {/* 2 - Exemplos e bloco de anotações */}
                    <section className="w-full shrink-0 px-1 md:px-2">
                        <div className="glass-section p-6 md:p-8">
                            <p className="font-semibold text-slate-200">
                                Se tiver dificuldades, você pode pedir por exemplos.
                            </p>
                            <button
                                onClick={() => setDicas(!dicas)}
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-500 active:bg-indigo-600 px-3 py-2 font-semibold text-white transition-all duration-500 hover:pr-8 mt-3 disabled:opacity-50"
                            >
                                <span className="transition-all duration-500 group-hover:pr-6 px-2">
                                    Ver exemplos
                                </span>
                                <span className="absolute opacity-0 right-4 text-2xl transition-all duration-500 group-hover:opacity-100 group-hover:right-2">
                                    &raquo;
                                </span>
                            </button>

                            {dicas && (
                                <div className="mt-8 space-y-4">
                                    <p className="mb-3 font-semibold text-slate-200">
                                        Exemplos de consultas
                                    </p>
                                    {examples.map((ex, i) => (
                                        <div
                                            key={i}
                                            className="grid gap-2 md:grid-cols-2 glass-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                        >
                                            <div className="mb-1 font-semibold text-slate-100">
                                                {ex.title}
                                            </div>
                                            {ex.hint && (
                                                <div className="mb-2 text-sm text-slate-400">{ex.hint}</div>
                                            )}
                                            <pre className="overflow-x-auto rounded-md bg-slate-900 p-3 text-xs text-slate-100">
                                                {ex.sql}
                                            </pre>
                                            <button
                                                onClick={() => {
                                                    setQuery(ex.sql);
                                                    setActiveSection(SECTION_INDEX.CONSOLE);
                                                }}
                                                disabled={loading}
                                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-md active:bg-indigo-600 bg-indigo-500 px-3 py-2 font-semibold text-white transition-all duration-500 hover:pr-8  disabled:opacity-50"
                                            >
                                                <span className="transition-all duration-500 group-hover:pr-6">
                                                    Usar query
                                                </span>
                                                <span className="absolute opacity-0 right-4 text-2xl transition-all duration-500 group-hover:opacity-100 group-hover:right-2">
                                                    &raquo;
                                                </span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <h2 className="mt-8 mb-2 font-bold text-slate-100">
                                Bloco de Anotações
                            </h2>
                            <p className="mb-3 text-slate-400">
                                Caso necessário, você pode utilizar este campo para anotações de dados
                                importantes em sua investigação.
                            </p>
                            <textarea
                                rows={6}
                                placeholder="Digite aqui."
                                className="input-control mb-3 w-full font-mono p-3"
                            />
                        </div>
                    </section>

                    {/* 3 - Console de consultas e acusação */}
                    <section className="w-full shrink-0 px-1 md:px-2">
                        <div className="glass-section p-6 md:p-8 flex flex-col">
                            <h2 className="mb-2 font-bold text-slate-100">
                                Você pode realizar as consultas por aqui:
                            </h2>
                            <p className="mb-3 text-slate-400">
                                Somente consultas SELECT simples são permitidas.
                            </p>
                            <textarea
                                id="consulta-input"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                rows={6}
                                placeholder="Escreva sua consulta SELECT aqui"
                                className="input-control mb-3 w-full font-mono p-3"
                            />
                            <button
                                onClick={run}
                                disabled={loading}
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-500 px-4 py-2 font-semibold text-white transition-all duration-500 hover:pr-8 mb-2 w-fit disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="h-4 w-4 animate-spin mr-2"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden
                                        >
                                            <circle
                                                className="opacity-20"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-90"
                                                d="M4 12a8 8 0 018-8"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        Executando...
                                    </>
                                ) : (
                                    <>
                                        <span className="transition-all duration-500 group-hover:pr-6">
                                            Executar
                                        </span>
                                        <span className="absolute opacity-0 right-4 text-xl transition-all duration-500 group-hover:opacity-100 group-hover:right-2">
                                            &raquo;
                                        </span>
                                    </>
                                )}
                            </button>
                            {error && (
                                <div className=" text-red-400" aria-live="polite">
                                    {error}
                                </div>
                            )}

                            <p className="mb-2 mt-8 font-bold text-slate-100">Quem é o culpado?</p>
                            <input
                                placeholder="Digite aqui o nome completo do culpado."
                                className="input-control mb-2 w-full p-3 font-mono"
                                type="password"
                                onKeyDown={(e) =>
                                    e.key === "Enter" &&
                                    guessCulprit((e.target as HTMLInputElement).value)
                                }
                            />
                            <button
                                onClick={() => {
                                    const input = document.querySelector("input") as HTMLInputElement;
                                    if (input) guessCulprit(input.value);
                                }}
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-600 px-4 py-2 font-semibold text-white transition-all duration-500 hover:pr-8 w-fit"
                            >
                                <span className="transition-all duration-500 group-hover:pr-6">
                                    Verificar Culpado
                                </span>
                                <span className="absolute opacity-0 right-4 text-xl transition-all duration-500 group-hover:opacity-100 group-hover:right-2">
                                    &raquo;
                                </span>
                            </button>
                            {tentativaErrada && (
                                <div className="mt-4 text-red-500 font-semibold">
                                    Tentativas: {tentativas} <br></br>
                                    Você errou... mas não desista! Continue investigando e tente
                                    novamente.
                                </div>
                            )}
                            {tentativaCerta && (
                                <div className="mt-4 text-green-500 font-semibold">
                                    Tentativas: {tentativas} <br></br>
                                    Parabéns! Você solucionou o caso com sucesso!
                                </div>
                            )}
                        </div>
                    </section>

                    {/* 4 - Resultado */}
                    <section className="w-full shrink-0 px-1 md:px-2">
                        <div
                            id="resultado"
                            className="glass-section p-6 md:p-8 animate-fade-in-up"
                        >
                            {!rows ? (
                                <div className="text-slate-300">Execute uma consulta para ver os resultados aqui.</div>
                            ) : rows.length === 0 ? (
                                <div className="text-slate-300">Nenhum resultado.</div>
                            ) : (
                                <div className="overflow-hidden rounded-xl">
                                    <div className="max-h-[500px] overflow-auto">
                                        <table className="w-full border-collapse text-sm text-slate-200">
                                            <caption className="mb-2 p-2 text-left text-base font-semibold text-slate-100">
                                                Resultado da Consulta
                                            </caption>
                                            <thead className="sticky top-0 bg-slate-800/80 backdrop-blur">
                                                <tr>
                                                    {columns.map((c) => (
                                                        <th
                                                            key={c}
                                                            className="border-b border-white/10 p-2 text-left font-semibold text-slate-200"
                                                        >
                                                            {c}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map((r, idx) => (
                                                    <tr key={idx} className="odd:bg-white/5">
                                                        {columns.map((c) => (
                                                            <td
                                                                key={c}
                                                                className="border-b border-white/10 p-2 align-top"
                                                            >
                                                                {formatCell(r[c])}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function formatCell(value: unknown): string {
    if (value == null) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
}
