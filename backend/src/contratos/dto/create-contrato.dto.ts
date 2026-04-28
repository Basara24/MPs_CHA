import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsNumber, Min } from 'class-validator';

export class CreateContratoDto {
  @Transform(({ value }) => Number(value))
  @IsInt()
  clienteId: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  terrenoId: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  valorTotal: number;

  @IsDateString()
  dataInicio: string;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  quantidadeParcelas: number;

  @IsDateString()
  primeiroVencimento: string;
}
