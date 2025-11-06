import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { NivelAcademico } from './nivel-academico.entity';

export enum ProgramaEstado {
  PLAN = 'En Planificación',
  CURSO = 'En curso',
  FIN = 'Finalizado',
}

@Entity({ name: 'programas' })
export class Programa {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NivelAcademico, (n) => n.programas, { nullable: false })
  @JoinColumn({ name: 'id_nivel_academico' })
  nivel: NivelAcademico;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 2000 })
  descripcion: string;

  @Column('int')
  version: number;

  @Column('int')
  duracion_meses: number;

  @Column('numeric', { precision: 12, scale: 2 })
  costo: string;

  @Column('date')
  fecha_inicio: string;

  @Column({ type: 'enum', enum: ProgramaEstado })
  estado: ProgramaEstado;

  @Column({ type: 'timestamp', default: () => 'now()' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  fecha_modificacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_eliminacion?: Date | null;
}