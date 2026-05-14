import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { IsCpf } from '../../common/validators/is-cpf.validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  @IsCpf({ message: 'CPF invalido' })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @Length(2, 2)
  estado: string;

  @IsString()
  @MinLength(8)
  @Matches(/[A-Z]/, { message: 'A senha precisa conter uma letra maiuscula' })
  @Matches(/\d/, { message: 'A senha precisa conter um numero' })
  senha: string;

  @IsEnum(UserType)
  @IsOptional()
  tipo?: UserType;
}
