import { UserType } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches, MinLength } from 'class-validator';
import { IsCpf } from '../../common/validators/is-cpf.validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Length(11, 14)
  @IsCpf({ message: 'CPF invalido' })
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  cidade?: string;

  @IsString()
  @Length(2, 2)
  @IsOptional()
  estado?: string;

  @IsString()
  @MinLength(8)
  @Matches(/[A-Z]/, { message: 'A senha precisa conter uma letra maiuscula' })
  @Matches(/\d/, { message: 'A senha precisa conter um numero' })
  @IsOptional()
  senha?: string;

  @IsEnum(UserType)
  @IsOptional()
  tipo?: UserType;
}
