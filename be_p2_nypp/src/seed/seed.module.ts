import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelAcademico } from '../entities/nivel-academico.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([NivelAcademico])],
  providers: [SeedService],
})
export class SeedModule {}
