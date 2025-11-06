import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from '../../entities/programa.entity';
import { NivelAcademico } from '../../entities/nivel-academico.entity';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@Injectable()
export class ProgramasService {
  constructor(
    @InjectRepository(Programa) private repo: Repository<Programa>,
    @InjectRepository(NivelAcademico) private nivelesRepo: Repository<NivelAcademico>,
  ) {}

  findAll() {
    return this.repo.find({
      where: { fecha_eliminacion: null },
      relations: ['nivel'],
      order: { nivel: { nombre: 'ASC' }, nombre: 'ASC' },
    });
  }

  async findOne(id: number) {
    const prog = await this.repo.findOne({ where: { id, fecha_eliminacion: null }, relations: ['nivel'] });
    if (!prog) throw new NotFoundException('Programa no encontrado');
    return prog;
  }

  async create(dto: CreateProgramaDto) {
    const nivel = await this.nivelesRepo.findOne({ where: { id: dto.id_nivel_academico, fecha_eliminacion: null } });
    if (!nivel) throw new NotFoundException('Nivel Académico inválido');
    return this.repo.save(this.repo.create({
      nivel,
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      version: dto.version,
      duracion_meses: dto.duracion_meses,
      costo: dto.costo,
      fecha_inicio: dto.fecha_inicio,
      estado: dto.estado,
    }));
  }

  async update(id: number, dto: UpdateProgramaDto) {
    const prog = await this.findOne(id);
    if (dto.id_nivel_academico) {
      const nivel = await this.nivelesRepo.findOne({ where: { id: dto.id_nivel_academico, fecha_eliminacion: null } });
      if (!nivel) throw new NotFoundException('Nivel Académico inválido');
      (prog as any).nivel = nivel;
    }
    Object.assign(prog, {
      nombre: dto.nombre ?? prog.nombre,
      descripcion: dto.descripcion ?? prog.descripcion,
      version: dto.version ?? prog.version,
      duracion_meses: dto.duracion_meses ?? prog.duracion_meses,
      costo: dto.costo ?? prog.costo,
      fecha_inicio: dto.fecha_inicio ?? prog.fecha_inicio,
      estado: (dto as any).estado ?? prog.estado,
    });
    return this.repo.save(prog);
  }

  async remove(id: number) {
    const prog = await this.findOne(id);
    prog.fecha_eliminacion = new Date();
    return this.repo.save(prog);
  }
}