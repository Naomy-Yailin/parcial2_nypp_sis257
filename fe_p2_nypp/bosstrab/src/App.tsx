import { useEffect, useState } from 'react';
import { api } from './api';
import type { Nivel, Programa } from './types';

export default function App() {
  const [niveles, setNiveles] = useState<Nivel[]>([]);
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [form, setForm] = useState<Programa>({
    nombre: '', descripcion: '', version: 1, duracion_meses: 1, costo: '0.00',
    fecha_inicio: '2025-01-01', estado: 'En Planificación'
  });

  const load = async () => {
    const [n, p] = await Promise.all([api.get<Nivel[]>('/niveles'), api.get<Programa[]>('/programas')]);
    setNiveles(n.data); setProgramas(p.data);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id_nivel_academico) return alert('Selecciona nivel académico');
    await api.post('/programas', form);
    setForm({ nombre: '', descripcion: '', version: 1, duracion_meses: 1, costo: '0.00',
      fecha_inicio: '2025-01-01', estado: 'En Planificación' });
    await load();
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h1>bosstrab · Programas de Postgrado USFX</h1>

      <section>
        <h2>Crear Programa</h2>
        <form onSubmit={submit} style={{ display: 'grid', gap: 8 }}>
          <label>Nivel académico
            <select value={form.id_nivel_academico ?? ''} onChange={(e) => setForm({ ...form, id_nivel_academico: Number(e.target.value) })} required>
              <option value='' disabled>Seleccione…</option>
              {niveles.map(n => <option key={n.id} value={n.id}>{n.nombre}</option>)}
            </select>
          </label>
          <label>Nombre
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} maxLength={100} required />
          </label>
          <label>Descripción
            <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} maxLength={2000} required />
          </label>
          <label>Versión
            <input type='number' min={1} value={form.version} onChange={(e) => setForm({ ...form, version: Number(e.target.value) })} required />
          </label>
          <label>Duración (meses)
            <input type='number' min={1} value={form.duracion_meses} onChange={(e) => setForm({ ...form, duracion_meses: Number(e.target.value) })} required />
          </label>
          <label>Costo (Bs)
            <input value={form.costo} onChange={(e) => setForm({ ...form, costo: e.target.value })} required />
          </label>
          <label>Fecha inicio
            <input type='date' value={form.fecha_inicio} onChange={(e) => setForm({ ...form, fecha_inicio: e.target.value })} required />
          </label>
          <label>Estado
            <select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value as Programa['estado'] })} required>
              <option>En Planificación</option>
              <option>En curso</option>
              <option>Finalizado</option>
            </select>
          </label>
          <button type='submit'>Guardar</button>
        </form>
      </section>

      <section>
        <h2>Listado (ordenado por nivel → nombre)</h2>
        <table width='100%' border={1} cellPadding={6} style={{ borderCollapse: 'collapse' }}>
          <thead>
          <tr><th>ID</th><th>Nivel</th><th>Nombre</th><th>Versión</th><th>Duración</th><th>Costo</th><th>Inicio</th><th>Estado</th></tr>
          </thead>
          <tbody>
          {programas.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.nivel?.nombre}</td><td>{p.nombre}</td><td>{p.version}</td>
              <td>{p.duracion_meses}</td><td>{p.costo}</td><td>{p.fecha_inicio}</td><td>{p.estado}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}