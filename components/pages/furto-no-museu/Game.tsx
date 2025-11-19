"use client";

import Image from "next/image";
import { JSX, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

type Row = Record<string, unknown>;

export default function Game({ hardMode = false }: { hardMode: boolean }) {

    const [query, setQuery] = useState("");
    const [rows, setRows] = useState<Row[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [dicas, setDicas] = useState(false);
    const [tentativaCerta, setTentativaCerta] = useState(false)
    const [tentativas, setTentativas] = useState(0)
    const [activeSection, setActiveSection] = useState<number>(0);
    const [showAccuseModal, setShowAccuseModal] = useState(false);
    const [suspectName, setSuspectName] = useState("");
    const [notes, setNotes] = useState("");

    // Persiste anotações entre trocas de seção e recarregamentos
    useEffect(() => {
        try {
            const saved = localStorage.getItem("game_notes");
            if (saved != null) setNotes(saved);
        } catch {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        try {
            localStorage.setItem("game_notes", notes);
        } catch {}
    }, [notes]);

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
            setActiveSection(SECTION_INDEX.CONSOLE);
        } catch (e: any) {
            setError(e?.message || "Erro inesperado");
        } finally {
            setLoading(false);
        }
    }

    async function guessCulprit(inputValue: string) {
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

        const confirm = await Swal.fire({
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
        });
        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch("/api/accuse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(data?.error || "Falha ao verificar acusação");
            }

            if (data?.correct) {
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
        } catch (e: any) {
            Swal.fire({
                title: "Erro",
                text: e?.message || "Não foi possível verificar a acusação.",
                icon: "error",
                background: "#2b2e36",
                color: "#fff",
                confirmButtonColor: "#4f46e5",
            });
        }
    }

    // Índices das sections no carrossel
    const SECTION_INDEX = {
        NEWSPAPER: 0,
        NOTES: 1,
        CONSOLE: 2
    } as const;

    // Renderizadores de seção (reutilizados em desktop e mobile)
    function renderNewspaperSection(): JSX.Element {
        return (
            <section className="w-full px-1 md:px-2">
                <div className="newspaper newspaper-section w-full space-y-8 p-6 md:p-10 text-lg md:text-xl">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <img
                            src="/diamante.png"
                            alt="Diamante do Amanhecer"
                            className="max-h-48 max-w-48"
                        />

                        <div className="px-2 md:px-8 py-6 md:py-8">
                            <h1 className="newspaper-title text-4xl md:text-5xl">Jornal de Hoje</h1>
                            <div className="byline text-center mb-2">
                                <span className="dateline">15 de setembro de 2025</span> · Redator: <span>Bruno César Silva de Souza</span>
                            </div>
                            <h2 className="text-5xl font-bold my-8 text-center">Museu atacado!</h2>
                            <p className="md:text-4xl drop-cap newspaper-columns pb-8 text-justify text-md">
                                Na madrugada do dia de hoje, o museu
                                “Aurora Arte & História” sofreu um furto — onde nenhum alarme soou — de um de seus itens
                                {hardMode ? " mas nada mais de importância foi divulgado para a imprensa" : ": o Diamante do Amanhecer, uma joia lendária recém-chegada de uma exposição internacional"}.
                                A peça desapareceu {hardMode ? "de uma das salas" : "da Sala de Tesouros entre 02h e 03h da manhã. Acreditam que saber quais funcionários tinham acesso a sala que sofreu o furto é o ponto de partida pra descobrir o mistério"}.
                                <br />
                                {hardMode ? "" : "A investigação interna indica que um funcionário do museu foi o responsável — alguém com acesso restrito, conhecimento técnico e um álibi falso."}
                            </p>
                        </div>
                    </div>
                    <div className=" p-4 md:p-5">
                        <div >
                            <h2 className="mb-2 font-bold text-2xl border-b-2">Seu Objetivo</h2>
                            <p className="text-xl mb-2 text-justify">
                                <strong>Principal: </strong>Como um detetive {hardMode ? "experiente" : "novato"}, seu objetivo neste caso, a partir das informações da manchete, é <strong>descobrir o culpado</strong> pelo crime ocorrido no museu.
                                Fique atento em todos os detalhes fornecidos nas tabelas e depoimentos, pois eles serão cruciais para desvendar o mistério. Há diversas formas de abordar a investigação, então use seu raciocínio lógico e habilidades analíticas para conectar as pistas e chegar à verdade.
                            </p>
                            <p className="text-xl text-justify">
                                <strong>Bônus: </strong>Após solucionar o caso, caso você apresente ao menos <strong>5 justificativas válidas</strong> para sua acusação e seja de seu interesse, você poderá <strong>submeter seu nome ao Hall dos Detetives</strong> e eternizar sua façanha!
                            </p>
                        </div>

                    </div>
                    <div className=" p-4 md:p-5">
                        <h2 className="mb-2 font-bold text-2xl border-b-2">Informações do Banco de Dados</h2>
                        <div className=" p-4 md:p-5 flex flex-col md:flex-row md:space-x-12 space-y-8 md:space-y-0 justify-center w-full">

                            {!hardMode && (
                                <div className="w-full md:w-auto">
                                    <h2 className="mb-2 font-bold text-xl border-b-2">Diagrama</h2>
                                    <Image
                                        src="/Modelo DER - O Roubo do Diamante do Amanhecer.png"
                                        width={1000}
                                        height={600}
                                        alt="Modelo DER"
                                        className="w-full h-auto max-w-3xl"
                                    />
                                </div>
                            )}


                            <div className="w-full md:w-auto">
                                <h2 className="mb-2 font-bold text-xl border-b-2">Descrições das tabelas</h2>
                                <ul className="space-y-1 text-xl">
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
                    </div>
                </div>
            </section>
        );
    }

    function renderNotesSection(): JSX.Element {
        return (
            <section className="w-screen px-1 md:px-2">
                <div className="newspaper w-full p-6 md:p-10 space-y-6 text-lg md:text-xl">
                    <h2 className="mb-2 font-bold text-2xl">Bloco de Anotações</h2>
                    <p className="mb-3">
                        Utilize este espaço para anotar pistas, hipóteses e conexões que encontrar.
                    </p>
                    <textarea
                        rows={20}
                        placeholder="Digite suas anotações aqui."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="border-gray-400 border-2 mb-3 w-full font-mono p-3 text-base md:text-lg"
                    />
                </div>
            </section>
        );
    }

    function renderConsoleSection(): JSX.Element {
        return (
            <section className="w-screen px-1 md:px-2">
                <div className="newspaper newspaper-section w-full p-6 md:p-10 flex flex-col text-lg md:text-xl space-y-4">
                    <h2 className="mb-2 font-bold text-2xl">Exemplos de Consultas</h2>
                    <p className="mb-3">Somente consultas SELECT simples são permitidas.</p>

                    <div>
                        <button onClick={() => setDicas(!dicas)} className="newspaper-button mt-1 mb-4">
                            {dicas ? "Ocultar exemplos" : "Ver exemplos"}
                        </button>
                        {dicas && (
                            <div className="mt-2 space-y-4">
                                <p className="mb-3 font-semibold">Exemplos de consultas</p>
                                {examples.map((ex, i) => (
                                    <div
                                        key={i}
                                        className="grid gap-2 md:grid-cols-2 newspaper-card p-4"
                                    >
                                        <div className="mb-1 font-semibold">{ex.title}</div>
                                        {ex.hint && (
                                            <div className="mb-2 text-sm">{ex.hint}</div>
                                        )}
                                        <pre className="newspaper-pre text-xs">{ex.sql}</pre>
                                        <button
                                            onClick={() => {
                                                setQuery(ex.sql);
                                                setActiveSection(SECTION_INDEX.CONSOLE);
                                                const el = document.getElementById("consulta-input") as HTMLTextAreaElement | null;
                                                el?.focus();
                                            }}
                                            disabled={loading}
                                            className="newspaper-button"
                                        >
                                            Usar query
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <h3 className="font-bold">Console de Consultas</h3>
                    <textarea
                        id="consulta-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                if (!loading && query.trim().length > 0) {
                                    run();
                                }
                            }
                        }}
                        rows={8}
                        placeholder="Escreva sua consulta aqui"
                        className="newspaper-textarea mb-3 w-full font-mono p-3 text-base md:text-lg"
                    />
                    <div className="flex items-center gap-3 mb-2">
                        <button
                            onClick={run}
                            disabled={loading}
                            className="newspaper-button w-fit"
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
                            ) : (<>Executar Consulta</>)}
                        </button>
                        <button
                            onClick={() => setShowAccuseModal(true)}
                            className="newspaper-button secondary w-fit"
                        >
                            Acusar um Suspeito
                        </button>
                    </div>
                    {error && (
                        <div className=" text-red-400" aria-live="polite">
                            {error}
                        </div>
                    )}

                    <div className="mt-6">
                        {!rows ? (
                            <div className="text-black">Execute uma consulta para ver os resultados aqui.</div>
                        ) : rows.length === 0 ? (
                            <div className="text-black">Nenhum resultado.</div>
                        ) : (
                            <div className="overflow-hidden">
                                <div className="max-h-[500px] overflow-auto">
                                    <table className="newspaper-table">
                                        <caption className="mb-2">
                                            Resultado da Consulta
                                        </caption>
                                        <thead>
                                            <tr>
                                                {columns.map((c) => (
                                                    <th key={c}>
                                                        {c}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((r, idx) => (
                                                <tr key={idx}>
                                                    {columns.map((c) => (
                                                        <td key={c}>
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

                </div>
            </section>
        );
    }

    return (
        <div className="mx-auto pt-9 pb-0 md:pb-8 relative bg-cover bg-center min-h-screen overflow-x-hidden" style={{ backgroundImage: 'url("/newspaper.png")' }}>
            
            {/* Barra fixa de dificuldade no topo */}
            <div
                className={`fixed top-0 left-0 w-full h-9 z-50 text-white text-sm font-semibold flex items-center justify-center ${tentativaCerta ? "bg-green-600" : hardMode ? "bg-red-600" : "bg-amber-500"}`}
            >
                {`${hardMode ? "Dificuldade: Sherlock Holmes" : "Dificuldade: Detetive Novato"}${tentativaCerta ? " - Você acertou o culpado! Tentativas: " + tentativas : ""}`}
            </div>

            {/* Navegação (mobile: não fixa; desktop: fixa lateral) */}
            <nav className="relative mt-3 z-40 flex flex-wrap gap-3 px-2 justify-center md:justify-end md:mt-0 md:fixed md:right-6 md:top-1/2 md:-translate-y-1/2 md:flex-col">
                {[
                    { label: "Introdução", idx: SECTION_INDEX.NEWSPAPER },
                    { label: "Bloco de Anotações", idx: SECTION_INDEX.NOTES },
                    { label: "Consultas", idx: SECTION_INDEX.CONSOLE }
                ].map((b) => (
                    <button
                        key={b.idx}
                        aria-label={b.label}
                        title={b.label}
                        onClick={() => {
                            setActiveSection(b.idx);
                            if (b.idx === SECTION_INDEX.NOTES) {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            } else if (b.idx === SECTION_INDEX.CONSOLE) {
                                const el = document.getElementById("consulta-input") as HTMLTextAreaElement | null;
                                el?.focus();
                            }
                        }}
                        className={`float-nav-btn flex-1 ${activeSection === b.idx ? "active" : ""}`}
                    >
                        {b.label}
                    </button>
                ))}
            </nav>

            {/* Conteúdo: renderização condicional universal (sem carrossel) */}
            <div className="relative">
                {activeSection === SECTION_INDEX.NEWSPAPER && renderNewspaperSection()}
                {activeSection === SECTION_INDEX.NOTES && renderNotesSection()}
                {activeSection === SECTION_INDEX.CONSOLE && renderConsoleSection()}
            </div>

            {/* Modal de acusação */}
            {showAccuseModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowAccuseModal(false)} />
                    <div className="relative newspaper newspaper-section p-6 w-[90%] max-w-xl space-y-4 bg-cover rounded-sm" style={{ backgroundImage: 'url("/newspaper.png")' }}>
                        <h3 className="font-bold text-xl">Acusar um Suspeito</h3>
                        <p>Digite o nome completo do suspeito que você deseja acusar.</p>
                        <input
                            autoFocus
                            value={suspectName}
                            onChange={(e) => setSuspectName(e.target.value)}
                            type="password"
                            placeholder="Ex.: José da Silva"
                            className="newspaper-input w-full p-3 font-mono text-base md:text-lg"
                        />
                        <div className="flex justify-end gap-3 pt-2">
                            <button className="newspaper-button secondary" onClick={() => setShowAccuseModal(false)}>
                                Cancelar
                            </button>
                            <button
                                className="newspaper-button"
                                onClick={() => {
                                    const name = suspectName;
                                    setShowAccuseModal(false);
                                    setSuspectName("");
                                    guessCulprit(name);
                                }}
                            >
                                Confirmar Acusação
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function formatCell(value: unknown): string {
    if (value == null) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
}
