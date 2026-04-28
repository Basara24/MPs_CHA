import { UserType } from '@prisma/client';
export declare class UpdateUserDto {
    nome?: string;
    email?: string;
    senha?: string;
    tipo?: UserType;
}
