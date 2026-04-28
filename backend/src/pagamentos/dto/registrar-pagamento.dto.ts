import { IsDateString, IsOptional } from 'class-validator';

export class RegistrarPagamentoDto {
  @IsDateString()
  @IsOptional()
  dataPagamento?: string;
}
