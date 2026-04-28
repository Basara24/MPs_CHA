export type UserType = 'CLIENTE' | 'ADMIN' | 'VENDEDOR';

export interface AuthUser {
  sub: number;
  email: string;
  nome: string;
  tipo: UserType;
}

export interface Terreno {
  id: number;
  titulo: string;
  descricao: string;
  tamanho: number;
  valor: number;
  cidade: string;
  estado: string;
  status: 'DISPONIVEL' | 'RESERVADO' | 'VENDIDO';
  imagens: { id: number; url: string }[];
}
