import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNivelDto {
  @ApiProperty({ maxLength: 20 })
  @IsString()
  @MaxLength(20)
  nombre: string;

  @ApiProperty({ maxLength: 500, required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;
}