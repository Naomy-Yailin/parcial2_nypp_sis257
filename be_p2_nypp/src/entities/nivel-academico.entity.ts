import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Programa } from './programa.entity';

@Entity({ name: 'niveles_academicos' })
export class NivelAcademico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  nombre: string;

  @Column({ length: 500, nullable: true })
  descripcion?: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  fecha_modificacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_eliminacion?: Date | null;

  @OneToMany(() => Programa, (p) => p.nivel)
  programas: Programa[];
}