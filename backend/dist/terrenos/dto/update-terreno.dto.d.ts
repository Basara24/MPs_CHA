import { TerrenoStatus } from '@prisma/client';
export declare class UpdateTerrenoDto {
    titulo?: string;
    descricao?: string;
    tamanho?: number;
    valor?: number;
    cidade?: string;
    estado?: string;
    status?: TerrenoStatus;
}
