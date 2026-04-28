export interface AuthUser {
    sub: number;
    email: string;
    tipo: string;
    nome: string;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
