import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programa } from '../../entities/programa.entity';
import { NivelAcademico } from '../../entities/nivel-academico.entity';
import { ProgramasService } from './programas.service';
import { ProgramasController } from './programas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Programa, NivelAcademico])],
  controllers: [ProgramasController],
  providers: [ProgramasService]
})
export class ProgramasModule {}