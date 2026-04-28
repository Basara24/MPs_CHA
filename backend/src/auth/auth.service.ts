import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const createdUser = await this.usersService.create({
      ...dto,
      tipo: dto.tipo ?? UserType.CLIENTE,
    });

    return this.signToken({
      sub: createdUser.id,
      email: createdUser.email,
      tipo: createdUser.tipo,
      nome: createdUser.nome,
    });
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const validPassword = await bcrypt.compare(dto.senha, user.senha);
    if (!validPassword) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.signToken({
      sub: user.id,
      email: user.email,
      tipo: user.tipo,
      nome: user.nome,
    });
  }

  private signToken(payload: { sub: number; email: string; tipo: string; nome: string }) {
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      user: payload,
    };
  }
}
