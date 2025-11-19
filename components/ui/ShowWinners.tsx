"use client"

import { useEffect, useState } from "react";

type Winner = {
	id: number;
	nome: string;
	sobrenome: string;
	dificuldade: string | null;
	senac: string | null;
};

export default function ShowWinners() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [winners, setWinners] = useState<Winner[]>([]);

	useEffect(() => {
		let isMounted = true;
		async function load() {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch("/api/winners", { cache: "no-store" });
				const data = await res.json();
				if (!res.ok) throw new Error(data?.error || "Falha ao carregar vencedores");
				if (isMounted) {
					setWinners(Array.isArray(data?.rows) ? data.rows : []);
				}
			} catch (e: any) {
				if (isMounted) setError(e?.message || "Erro inesperado");
			} finally {
				if (isMounted) setLoading(false);
			}
		}
		load();
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="mt-4 p-4 bg-slate-800 rounded-md w-full max-w-2xl">
			<p className="font-semibold text-xl mb-4 text-amber-500">Vencedores Anteriores</p>
			{loading ? (
				<div className="text-slate-300">Carregando...</div>
			) : error ? (
				<div className="text-red-400">{error}</div>
			) : winners.length === 0 ? (
				<div className="text-slate-300">Nenhum vencedor registrado.</div>
			) : (
				<ul className="list-disc list-inside space-y-2">
					{winners.map((w) => (
						<li key={w.id}>
							{w.nome} {w.sobrenome}
							{w.dificuldade ? ` — Dificuldade: ${w.dificuldade}` : ""}
							{w.senac ? ` — Senac: ${w.senac}` : ""}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}


