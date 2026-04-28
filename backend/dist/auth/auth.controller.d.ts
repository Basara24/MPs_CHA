import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            sub: number;
            email: string;
            tipo: string;
            nome: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            sub: number;
            email: string;
            tipo: string;
            nome: string;
        };
    }>;
    me(user: {
        sub: number;
        email: string;
        tipo: string;
        nome: string;
    }): {
        sub: number;
        email: string;
        tipo: string;
        nome: string;
    };
}
