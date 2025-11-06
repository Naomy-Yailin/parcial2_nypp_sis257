import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelAcademico } from '../../entities/nivel-academico.entity';
import { NivelesService } from './niveles.service';
import { NivelesController } from './niveles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NivelAcademico])],
  controllers: [NivelesController],
  providers: [NivelesService],
  exports: [TypeOrmModule]
})
export class NivelesModule {}