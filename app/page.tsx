'use client';

import { useMemo, useState } from 'react';

type Row = Record<string, unknown>;

export default function Page() {
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      title: 'Buscar por um registro parcial',
      sql: "SELECT nome FROM funcionarios WHERE nome LIKE '%Olivia%'",
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
    if (inputValue.trim().toLowerCase() === 'júlio barreto') {
      alert('Correto! Júlio Barreto é o culpado pelo roubo do Diamante do Amanhecer.');
    } else {
      alert('Incorreto. Tente novamente.');
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-4 p-4  rounded-lg border border-slate-200 bg-white">
        <h1 className="text-center font-bold text-4xl mb-2">O Roubo do Diamante do Amanhecer</h1>
        <div className="flex justify-center">
          <img src="./diamante.png" alt="" className="max-h-48" />
        </div>
        <p className="bg-white border border-slate-200 rounded-lg p-3 text-justify mt-3">
          Na madrugada de <strong>15 de setembro de 2025</strong>, o museu “Aurora Arte & História” sofreu o roubo de seu item mais valioso: <strong>o Diamante do Amanhecer</strong>, uma joia lendária recém-chegada de uma exposição internacional. A peça desapareceu da <strong>Sala de Tesouros</strong> entre <strong>02h e 03h da manhã</strong>.
          Nenhum alarme disparou. <i>Apenas os registros de acesso e os depoimentos dos funcionários restaram como fonte de pistas.</i><br /><br />
          A investigação interna indica que um funcionário do museu foi o responsável — alguém com acesso restrito, conhecimento técnico e um álibi falso.
        </p>
      </div>

      <div className="mb-4 p-4 rounded-lg border border-slate-200 space-y-4 bg-[#f8fafc]">
        <div className="bg-white border border-slate-200 rounded-lg p-3">
          <h2 className="font-bold mb-2">Objetivo</h2>
          <ul>
            <li>- Descobrir quem roubou o diamante e quais evidências evidenciam o culpado.</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-3">
          <h2 className="font-bold mb-2">Tabelas</h2>
          <ul className="space-y-1">
            <li><strong>funcionarios</strong> - Identifica cada funcionário e cargo.</li>
            <li><strong>salas</strong> - Mostra as localizações e nomes das áreas.</li>
            <li><strong>obras</strong> - Registra as peças do museu.</li>
            <li><strong>acessos</strong> - Registra horários e locais de entrada/saída.</li>
            <li><strong>movimentacoes</strong> - Mostra quando itens foram movidos ou manipulados.</li>
            <li><strong>depoimentos</strong> - Declarações dos funcionários.</li>
          </ul>
        </div>
      </div>

      <div className="mb-4 p-4  rounded-lg border border-slate-200 bg-[#f8fafc]">
        <p className="font-bold mb-2">Exemplos de consultas</p>
        <div className="flex flex-col gap-3">
          {examples.map((ex, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-3">
              <div className="font-semibold mb-1">{ex.title}</div>
              {ex.hint && <div className="text-slate-500 text-sm mb-2">{ex.hint}</div>}
              <pre className="bg-slate-900 text-slate-100 rounded-md p-2 text-xs overflow-x-auto">{ex.sql}</pre>
              <button
                onClick={() => setQuery(ex.sql)}
                disabled={loading}
                className="mt-2 px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded disabled:opacity-50"
              >
                Usar query
              </button>
            </div>
          ))}
        </div>
      </div>


      <div className="mb-4 p-4  rounded-lg border border-slate-200 bg-[#f8fafc] flex flex-col">
        <h2 className="font-bold mb-2">Você pode realizar as consultas por aqui:</h2>
        <p className="text-slate-600 mb-2">Somente consultas SELECT simples são permitidas.</p>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={6}
          placeholder="Escreva sua consulta SELECT aqui"
          className="w-full font-mono border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 mb-2"
        />
        <button
          onClick={run}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 mb-8"
        >
          {loading ? 'Executando...' : 'Executar'}
        </button>

        <p className="font-bold mb-2">Quem é o culpado?</p>
        <input
          placeholder="Digite aqui o nome completo do culpado."
          className="w-full font-mono border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 mb-2"
          onKeyDown={(e) => e.key === 'Enter' && guessCulprit((e.target as HTMLInputElement).value)}
        />
        <button
          onClick={() => {
            const input = document.querySelector('input') as HTMLInputElement;
            if (input) guessCulprit(input.value);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Verificar Culpado
        </button>
        {error && <div className="mt-3 text-red-600">{error}</div>}
      </div>

      {rows && (
        <div className="mb-4 p-4  rounded-lg border border-slate-200 bg-[#f8fafc] flex flex-col">
          {rows.length === 0 ? (
            <div>Nenhum resultado.</div>
          ) : (
            <table className="border-collapse w-full bg-white border border-slate-200 rounded-lg">
              <caption className="font-bold mb-2">Resultado da Consulta</caption>
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c} className="text-left border-b border-slate-300 p-2 bg-slate-100">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={idx}>
                    {columns.map((c) => (
                      <td key={c} className="border-b border-slate-200 p-2 align-top">
                        {formatCell(r[c])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

function formatCell(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}
