"use client"

import { useEffect, useMemo, useState } from "react";

type ColumnMeta = {
  column_name: string;
  data_type: string;
  is_nullable: "YES" | "NO";
  column_key?: string;
  extra?: string;
};

type Row = Record<string, any>;

export default function AdminCrudPage() {
  const [tables, setTables] = useState<string[]>([]);
  const [table, setTable] = useState<string>("");
  const [columns, setColumns] = useState<ColumnMeta[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const primaryKey = useMemo(() => {
    return columns.find((c) => c.column_key === "PRI")?.column_name || "id";
  }, [columns]);

  const insertableColumns = useMemo(
    () => columns.filter((c) => !(c.extra || "").includes("auto_increment")),
    [columns]
  );

  const [newItem, setNewItem] = useState<Row>({});
  const [editing, setEditing] = useState<Record<string, boolean>>({});
  const [editValues, setEditValues] = useState<Record<string, Row>>({});

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/tables");
      const data = await res.json();
      if (res.ok) setTables(data.tables || []);
    })();
  }, []);

  useEffect(() => {
    if (!table) return;
    setError(null);
    setLoading(true);
    (async () => {
      try {
        const [colsRes, rowsRes] = await Promise.all([
          fetch(`/api/admin/columns?table=${encodeURIComponent(table)}`),
          fetch(`/api/admin/rows?table=${encodeURIComponent(table)}&limit=200`),
        ]);
        const colsData = await colsRes.json();
        const rowsData = await rowsRes.json();
        if (!colsRes.ok) throw new Error(colsData?.error || "Erro ao carregar colunas");
        if (!rowsRes.ok) throw new Error(rowsData?.error || "Erro ao carregar registros");
        setColumns(colsData.columns || []);
        setRows(rowsData.rows || []);
        setNewItem({});
        setEditing({});
        setEditValues({});
      } catch (e: any) {
        setError(e?.message || "Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    })();
  }, [table]);

  async function createItem() {
    if (!table) return;
    const payload: Row = {};
    insertableColumns.forEach((c) => {
      if (newItem[c.column_name] !== undefined) {
        payload[c.column_name] = newItem[c.column_name];
      }
    });
    const res = await fetch(`/api/admin/insert?table=${encodeURIComponent(table)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || "Erro ao inserir");
      return;
    }
    // reload rows
    const rowsRes = await fetch(`/api/admin/rows?table=${encodeURIComponent(table)}&limit=200`);
    const rowsData = await rowsRes.json();
    if (rowsRes.ok) setRows(rowsData.rows || []);
    setNewItem({});
  }

  async function deleteItem(id: any) {
    if (!table) return;
    if (!confirm("Excluir este registro?")) return;
    const res = await fetch(
      `/api/admin/delete?table=${encodeURIComponent(table)}&pk=${encodeURIComponent(primaryKey)}&id=${encodeURIComponent(id)}`,
      { method: "DELETE" }
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || "Erro ao excluir");
      return;
    }
    setRows((prev) => prev.filter((r) => String(r[primaryKey]) !== String(id)));
  }

  async function saveEdit(id: any) {
    if (!table) return;
    const values = editValues[id] || {};
    const res = await fetch(
      `/api/admin/update?table=${encodeURIComponent(table)}&pk=${encodeURIComponent(primaryKey)}&id=${encodeURIComponent(id)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || "Erro ao atualizar");
      return;
    }
    setEditing((e) => ({ ...e, [id]: false }));
    setRows((prev) =>
      prev.map((r) => (String(r[primaryKey]) === String(id) ? { ...r, ...values } : r))
    );
  }

  return (
    <div className="w-11/12 mx-auto py-8 mb-16">
      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-xl font-semibold">CRUD Administrativo</h1>
        <div className="ml-auto">
          <select
            className="input-control p-2"
            value={table}
            onChange={(e) => setTable(e.target.value)}
          >
            <option value="">Selecione uma tabela</option>
            {tables.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!table && <div className="text-slate-300">Escolha uma tabela para gerenciar.</div>}
      {error && <div className="text-red-400 mb-3">{error}</div>}
      {loading && <div className="text-slate-300">Carregando...</div>}

      {table && !loading && (
        <div className="space-y-6">
          <div className="glass-section p-4">
            <h2 className="font-semibold mb-3">Inserir novo registro</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {insertableColumns.map((c) => (
                <div key={c.column_name}>
                  <label className="block text-xs mb-1">{c.column_name}</label>
                  <input
                    className="input-control w-full p-2"
                    value={newItem[c.column_name] ?? ""}
                    onChange={(e) =>
                      setNewItem((prev) => ({ ...prev, [c.column_name]: e.target.value }))
                    }
                  />
                </div>
              ))}
            </div>
            <button onClick={createItem} className="mt-3 px-4 py-2 rounded-md bg-indigo-600">
              Inserir
            </button>
          </div>

          <div className="glass-section p-4">
            <div className="overflow-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 bg-slate-800/80 backdrop-blur">
                  <tr>
                    {columns.map((c) => (
                      <th key={c.column_name} className="border-b border-white/10 p-2 text-left">
                        {c.column_name}
                      </th>
                    ))}
                    <th className="border-b border-white/10 p-2 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const id = r[primaryKey];
                    const isEditing = !!editing[id];
                    return (
                      <tr key={String(id)} className="odd:bg-white/5 align-top">
                        {columns.map((c) => (
                          <td key={c.column_name} className="border-b border-white/10 p-2">
                            {isEditing ? (
                              <input
                                className="input-control w-full p-1"
                                defaultValue={r[c.column_name] ?? ""}
                                onChange={(e) =>
                                  setEditValues((prev) => ({
                                    ...prev,
                                    [id]: { ...(prev[id] || {}), [c.column_name]: e.target.value },
                                  }))
                                }
                              />
                            ) : (
                              String(r[c.column_name] ?? "")
                            )}
                          </td>
                        ))}
                        <td className="border-b border-white/10 p-2 space-x-2">
                          {!isEditing ? (
                            <>
                              <button
                                className="px-2 py-1 rounded-md bg-amber-600"
                                onClick={() => setEditing((prev) => ({ ...prev, [id]: true }))}
                              >
                                Editar
                              </button>
                              <button
                                className="px-2 py-1 rounded-md bg-red-600"
                                onClick={() => deleteItem(id)}
                              >
                                Excluir
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="px-2 py-1 rounded-md bg-green-600"
                                onClick={() => saveEdit(id)}
                              >
                                Salvar
                              </button>
                              <button
                                className="px-2 py-1 rounded-md bg-gray-600"
                                onClick={() => setEditing((prev) => ({ ...prev, [id]: false }))}
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


