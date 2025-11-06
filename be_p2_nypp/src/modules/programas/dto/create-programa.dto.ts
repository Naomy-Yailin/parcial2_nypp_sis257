import { IsDateString, IsEnum, IsInt, IsNumberString, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProgramaEstado } from '../../../entities/programa.entity';

export class CreateProgramaDto {
  @ApiProperty({ description: 'ID del nivel académico' })
  @IsInt()
  @Min(1)
  id_nivel_academico: number;

  @ApiProperty({ maxLength: 100 })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ maxLength: 2000 })
  @IsString()
  @MaxLength(2000)
  descripcion: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  version: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  duracion_meses: number;

  @ApiProperty({ description: 'Formato 0.00' })
  @IsNumberString()
  costo: string;

  @ApiProperty({ format: 'date' })
  @IsDateString()
  fecha_inicio: string;

  @ApiProperty({ enum: ProgramaEstado })
  @IsEnum(ProgramaEstado)
  estado: ProgramaEstado;
}