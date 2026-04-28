import { TerrenoStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FilterTerrenoDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @IsOptional()
  precoMin?: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @IsOptional()
  precoMax?: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @IsOptional()
  tamanhoMin?: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @IsOptional()
  tamanhoMax?: number;

  @IsString()
  @IsOptional()
  cidade?: string;

  @IsEnum(TerrenoStatus)
  @IsOptional()
  status?: TerrenoStatus;
}
