import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NivelAcademico } from '../entities/nivel-academico.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(NivelAcademico)
    private readonly repo: Repository<NivelAcademico>,
  ) {}

  async onModuleInit() {
    const nombres = ['Diplomado', 'Especialidad', 'Maestría', 'Doctorado'];
    for (const nombre of nombres) {
      const found = await this.repo.findOne({ where: { nombre } });
      if (!found) {
        await this.repo.save(this.repo.create({ nombre }));
      }
    }
  }
}
