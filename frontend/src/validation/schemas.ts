import { z } from 'zod';
import { isValidCpf, onlyDigits } from '../utils/validators';

export const terrenoFormSchema = z.object({
  titulo: z.string().min(3, 'Informe um titulo valido'),
  descricao: z.string().min(10, 'Descreva melhor o terreno'),
  tamanho: z.number().min(1, 'Informe um tamanho maior que zero'),
  valor: z.number().min(1, 'Informe um valor maior que zero'),
  estado: z.string().length(2, 'Selecione um estado'),
  cidade: z.string().min(2, 'Selecione uma cidade'),
});

export type TerrenoFormInput = z.infer<typeof terrenoFormSchema>;

export const userRegisterSchema = z
  .object({
    nome: z.string().min(3, 'Informe o nome completo'),
    email: z.string().email('Digite um e-mail valido'),
    estado: z.string().length(2, 'Selecione um estado'),
    cidade: z.string().min(2, 'Selecione uma cidade'),
    cpf: z
      .string()
      .refine((value) => onlyDigits(value).length === 11, 'Digite um CPF valido')
      .refine((value) => isValidCpf(value), 'CPF invalido'),
    telefone: z
      .string()
      .refine((value) => onlyDigits(value).length >= 10, 'Digite um telefone valido'),
    senha: z
      .string()
      .min(8, 'A senha deve ter no minimo 8 caracteres')
      .regex(/[A-Z]/, 'A senha precisa conter uma letra maiuscula')
      .regex(/\d/, 'A senha precisa conter um numero'),
    confirmarSenha: z.string().min(1, 'Confirme a senha'),
  })
  .refine((value) => value.senha === value.confirmarSenha, {
    path: ['confirmarSenha'],
    message: 'As senhas nao coincidem',
  });

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
