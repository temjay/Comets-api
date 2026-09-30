import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto.js';
import { UsersService } from '../users/users.service.js';
import { AuthService } from './auth.service.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // SignUp endpoint to create a new user
    @Post('/register')
    async create(@Body() user: CreateUserDto) {
        return this.authService.create(user);
    }

    // SignIn endpoint to authenticate a user
    @Post('/login')
    async login(@Body() credentials: CreateUserDto) {
        return this.authService.login(credentials);
    }

    @Post('/refresh-token')
    async refreshToken(@Body('refreshToken') refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto.token);
    }
}
