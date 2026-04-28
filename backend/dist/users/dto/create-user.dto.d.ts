import { UserType } from '@prisma/client';
export declare class CreateUserDto {
    nome: string;
    email: string;
    senha: string;
    tipo?: UserType;
}
