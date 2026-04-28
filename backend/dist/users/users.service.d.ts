import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        nome: string;
        tipo: import("@prisma/client").$Enums.UserType;
        id: number;
        createdAt: Date;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string;
        nome: string;
        tipo: import("@prisma/client").$Enums.UserType;
        id: number;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        nome: string;
        tipo: import("@prisma/client").$Enums.UserType;
        id: number;
        createdAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        email: string;
        senha: string;
        nome: string;
        tipo: import("@prisma/client").$Enums.UserType;
        id: number;
        createdAt: Date;
    } | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        nome: string;
        tipo: import("@prisma/client").$Enums.UserType;
        id: number;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
