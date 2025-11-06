import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NivelAcademico } from '../../entities/nivel-academico.entity';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';

@Injectable()
export class NivelesService {
  constructor(@InjectRepository(NivelAcademico) private repo: Repository<NivelAcademico>) {}

  findAll() {
    return this.repo.find({ where: { fecha_eliminacion: null }, order: { nombre: 'ASC' } });
  }

  async findOne(id: number) {
    const nivel = await this.repo.findOne({ where: { id, fecha_eliminacion: null } });
    if (!nivel) throw new NotFoundException('Nivel no encontrado');
    return nivel;
  }

  create(dto: CreateNivelDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateNivelDto) {
    const nivel = await this.findOne(id);
    Object.assign(nivel, dto);
    return this.repo.save(nivel);
  }

  async remove(id: number) {
    const nivel = await this.findOne(id);
    nivel.fecha_eliminacion = new Date();
    return this.repo.save(nivel);
  }
}