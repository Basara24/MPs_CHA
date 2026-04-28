import { TerrenoStatus } from '@prisma/client';
export declare class FilterTerrenoDto {
    precoMin?: number;
    precoMax?: number;
    tamanhoMin?: number;
    tamanhoMax?: number;
    cidade?: string;
    status?: TerrenoStatus;
}
