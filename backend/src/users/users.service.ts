import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeDigits(value: string) {
    return value.replace(/\D+/g, '');
  }

  async create(createUserDto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existing) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const normalizedCpf = this.normalizeDigits(createUserDto.cpf);
    const existingCpf = await this.prisma.user.findUnique({
      where: { cpf: normalizedCpf },
    });
    if (existingCpf) {
      throw new ConflictException('CPF já cadastrado');
    }

    const senhaHash = await bcrypt.hash(createUserDto.senha, 10);
    return this.prisma.user.create({
      data: {
        nome: createUserDto.nome,
        email: createUserDto.email,
        cpf: normalizedCpf,
        telefone: this.normalizeDigits(createUserDto.telefone),
        cidade: createUserDto.cidade,
        estado: createUserDto.estado.toUpperCase(),
        senha: senhaHash,
        tipo: createUserDto.tipo ?? UserType.CLIENTE,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        cidade: true,
        estado: true,
        tipo: true,
        createdAt: true,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        cidade: true,
        estado: true,
        tipo: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        cidade: true,
        estado: true,
        tipo: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const data: UpdateUserDto = { ...updateUserDto };

    if (data.email) {
      const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (existing && existing.id !== id) {
        throw new ConflictException('E-mail já cadastrado');
      }
    }

    if (data.cpf) {
      data.cpf = this.normalizeDigits(data.cpf);
      const existingCpf = await this.prisma.user.findUnique({ where: { cpf: data.cpf } });
      if (existingCpf && existingCpf.id !== id) {
        throw new ConflictException('CPF já cadastrado');
      }
    }

    if (data.telefone) {
      data.telefone = this.normalizeDigits(data.telefone);
    }

    if (data.estado) {
      data.estado = data.estado.toUpperCase();
    }

    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        cidade: true,
        estado: true,
        tipo: true,
        createdAt: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'Usuário removido com sucesso' };
  }
}
