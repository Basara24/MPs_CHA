import { UserType } from '@prisma/client';
export declare class RegisterDto {
    nome: string;
    email: string;
    senha: string;
    tipo?: UserType;
}
