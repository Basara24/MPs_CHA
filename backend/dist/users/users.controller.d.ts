import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
