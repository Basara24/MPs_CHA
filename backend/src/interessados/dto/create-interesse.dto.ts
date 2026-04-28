import { IsOptional, IsString } from 'class-validator';

export class CreateInteresseDto {
  @IsString()
  @IsOptional()
  mensagem?: string;
}
