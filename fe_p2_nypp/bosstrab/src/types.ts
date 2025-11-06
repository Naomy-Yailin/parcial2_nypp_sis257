export type Nivel = { id: number; nombre: string; descripcion?: string|null };
export type Programa = {
  id?: number;
  id_nivel_academico?: number;
  nivel?: Nivel;
  nombre: string;
  descripcion: string;
  version: number;
  duracion_meses: number;
  costo: string;
  fecha_inicio: string;
  estado: 'En Planificación' | 'En curso' | 'Finalizado';
};