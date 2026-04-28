import { TerrenoStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateTerrenoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  tamanho: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  valor: number;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsEnum(TerrenoStatus)
  @IsOptional()
  status?: TerrenoStatus;
}
