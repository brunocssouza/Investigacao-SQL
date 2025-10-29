'use client';

import { useMemo, useState } from 'react';

type Row = Record<string, unknown>;

export default function Page() {
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dicas, setDicas] = useState(false);

  const columns = useMemo(() => {
    if (!rows || rows.length === 0) return [] as string[];
    const keys = new Set<string>();
    rows.forEach((r) => Object.keys(r).forEach((k) => keys.add(k)));
    return Array.from(keys);
  }, [rows]);

  const examples = [
    {
      title: 'Mostrar todos da tabela funcionários',
      sql: "SELECT * FROM funcionarios",
      hint: 'SELECT * FROM funcionarios: retorna todas as colunas e linhas da tabela "funcionarios".',
    },
    {
      title: 'Mostrar todos os funcionários em ordem alfabética',
      sql: "SELECT * FROM funcionarios ORDER BY nome ASC",
      hint: 'ORDER BY nome ASC: retorna o resultado em ordem alfabética de sua coluna "nome".',
    },
    {
      title: 'Buscar por um registro específico',
      sql: "SELECT * FROM funcionarios WHERE nome = 'Otávio Silva'",
      hint: 'WHERE nome = "Otávio Silva": filtra os resultados para mostrar apenas o funcionário com esse nome.',
    },
    {
      title: 'Buscar por um registro parcial',
      sql: "SELECT * FROM funcionarios WHERE nome LIKE '%Silva%'",
      hint: 'LIKE "%Olivia%": busca por qualquer ocorrência da palavra "Olivia" na coluna "nome".',
    },
  ];

  async function run() {
    setLoading(true);
    setError(null);
    setRows(null);
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Falha na consulta');
      setRows(data.rows || []);
    } catch (e: any) {
      setError(e?.message || 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  }

  function guessCulprit(inputValue: string) {
    if (inputValue.trim().toLowerCase() === 'alexandre torres') {
      alert('Correto! Este é o culpado pelo roubo do Diamante do Amanhecer.');
    } else {
      alert('Incorreto. Tente novamente.');
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <section className="glass-section p-6 md:p-8 animate-fade-in-up">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h1 className="mb-3 bg-linear-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent md:text-left">
              O Roubo do Diamante do Amanhecer
            </h1>
            <p className="text-justify text-slate-300">
              Na madrugada de <strong>15 de setembro de 2025</strong>, o museu “Aurora Arte & História” sofreu o roubo de seu item mais valioso: <strong>o Diamante do Amanhecer</strong>, uma joia lendária recém-chegada de uma exposição internacional. A peça desapareceu da <strong>Sala de Tesouros</strong> entre <strong>02h e 03h da manhã</strong>.
              Nenhum alarme disparou. <i>Apenas os registros de acesso e os depoimentos dos funcionários restaram como fonte de pistas.</i>
              <br />
              <br />
              A investigação interna indica que um funcionário do museu foi o responsável — alguém com acesso restrito, conhecimento técnico e um álibi falso.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img src="./diamante.png" alt="Diamante do Amanhecer" className="max-h-48 drop-shadow-2xl animate-float" />
          </div>
        </div>
      </section>

      {/* Objetivo e Tabelas */}
      <section className="glass-section p-6 md:p-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <h2 className="mb-2 font-bold text-slate-100">Objetivo</h2>
            <ul className="text-slate-300">
              <li>Descobrir quem roubou o diamante e quais evidências indicam o culpado.</li>
            </ul>
          </div>
          <div className="glass-card p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <h2 className="mb-2 font-bold text-slate-100">Tabelas</h2>
            <ul className="space-y-1 text-slate-300">
              <li><strong>funcionarios</strong> — Identifica cada funcionário e cargo.</li>
              <li><strong>salas</strong> — Mostra as localizações e nomes das áreas.</li>
              <li><strong>obras</strong> — Registra as peças do museu.</li>
              <li><strong>acessos</strong> — Registra horários e locais de entrada/saída.</li>
              <li><strong>movimentacoes</strong> — Mostra quando itens foram movidos ou manipulados.</li>
              <li><strong>depoimentos</strong> — Declarações dos funcionários.</li>
              <li><strong>permissoes</strong> — Que funcionario tem permissao a qual sala.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Exemplos de consultas */}
      <section className="glass-section p-6 md:p-8">
        <p className=" font-semibold text-slate-200">Se tiver dificuldades, você pode pedir por exemplos.</p>
        <button
          onClick={() => setDicas(true)}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-500 px-2 py-2 font-semibold text-white transition-all duration-500 hover:pr-8 mt-3 disabled:opacity-50"
        >
          <span className="transition-all duration-500 group-hover:pr-6 px-2">Ver exemplos</span>
          <span className="absolute opacity-0 right-4 text-2xl transition-all duration-500 group-hover:opacity-100 group-hover:right-2">&raquo;</span>
        </button>

        {dicas && (
          <div className="mt-8 space-y-4">
            <p className="mb-3 font-semibold text-slate-200">Exemplos de consultas</p>
            {examples.map((ex, i) => (
              <div key={i} className="grid gap-2 md:grid-cols-2 glass-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-1 font-semibold text-slate-100">{ex.title}</div>
                {ex.hint && <div className="mb-2 text-sm text-slate-400">{ex.hint}</div>}
                <pre className="overflow-x-auto rounded-md bg-slate-900 p-3 text-xs text-slate-100">{ex.sql}</pre>
                <button
                  onClick={() => setQuery(ex.sql)}
                  disabled={loading}
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-500 px-2 py-2 font-semibold text-white transition-all duration-500 hover:pr-8  disabled:opacity-50"
                >
                  <span className="transition-all duration-500 group-hover:pr-6">Usar query</span>
                  <span className="absolute opacity-0 right-4 text-2xl transition-all duration-500 group-hover:opacity-100 group-hover:right-2">&raquo;</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Console de consultas */}
      <section className="glass-section flex flex-col p-6 md:p-8">
        <h2 className="mb-2 font-bold text-slate-100">Você pode realizar as consultas por aqui:</h2>
        <p className="mb-3 text-slate-400">Somente consultas SELECT simples são permitidas.</p>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={6}
          placeholder="Escreva sua consulta SELECT aqui"
          className="input-control mb-3 w-full font-mono p-3"
        />
        <button
          onClick={run}
          disabled={loading}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-500 px-4 py-2 font-semibold text-white transition-all duration-500 hover:pr-8 mb-8 w-fit disabled:opacity-60"
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
                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-90" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              Executando...
            </>
          ) : (
            <>
              <span className="transition-all duration-500 group-hover:pr-6">Executar</span>
              <span className="absolute opacity-0 right-4 text-xl transition-all duration-500 group-hover:opacity-100 group-hover:right-2">&raquo;</span>
            </>
          )}
        </button>


        <p className="mb-2 font-bold text-slate-100">Quem é o culpado?</p>
        <input
          placeholder="Digite aqui o nome completo do culpado."
          className="input-control mb-2 w-full p-3 font-mono"
          onKeyDown={(e) => e.key === 'Enter' && guessCulprit((e.target as HTMLInputElement).value)}
        />
        <button
          onClick={() => {
            const input = document.querySelector('input') as HTMLInputElement;
            if (input) guessCulprit(input.value);
          }}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-600 px-4 py-2 font-semibold text-white transition-all duration-500 hover:pr-8 w-fit"
        >
          <span className="transition-all duration-500 group-hover:pr-6">Verificar Culpado</span>
          <span className="absolute opacity-0 right-4 text-xl transition-all duration-500 group-hover:opacity-100 group-hover:right-2">&raquo;</span>
        </button>

        {error && <div className="mt-3 text-red-400" aria-live="polite">{error}</div>}
      </section>

      {/* Resultado */}
      {rows && (
        <section className="glass-section p-4 md:p-6 animate-fade-in-up">
          {rows.length === 0 ? (
            <div className="text-slate-300">Nenhum resultado.</div>
          ) : (
            <div className="overflow-hidden rounded-xl">
              <div className="max-h-[500px] overflow-auto">
                <table className="w-full border-collapse text-sm text-slate-200">
                  <caption className="mb-2 p-2 text-left text-base font-semibold text-slate-100">Resultado da Consulta</caption>
                  <thead className="sticky top-0 bg-slate-800/80 backdrop-blur">
                    <tr>
                      {columns.map((c) => (
                        <th key={c} className="border-b border-white/10 p-2 text-left font-semibold text-slate-200">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, idx) => (
                      <tr key={idx} className="odd:bg-white/5">
                        {columns.map((c) => (
                          <td key={c} className="border-b border-white/10 p-2 align-top">
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
        </section>
      )}
    </div>
  );
}

function formatCell(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}
