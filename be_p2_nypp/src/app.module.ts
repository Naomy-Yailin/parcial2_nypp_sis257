
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { NivelAcademico } from './entities/nivel-academico.entity';
import { Programa } from './entities/programa.entity';

import { NivelesModule } from './modules/niveles/niveles.module';
import { ProgramasModule } from './modules/programas/programas.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [NivelAcademico, Programa],
      synchronize: true, // ← crea/actualiza tablas automáticamente desde entidades
    }),
    TypeOrmModule.forFeature([NivelAcademico, Programa]),
    NivelesModule,
    ProgramasModule,
    SeedModule,
  ],
})
export class AppModule {}