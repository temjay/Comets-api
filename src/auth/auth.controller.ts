import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto.js';
import { UsersService } from '../users/users.service.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService) { }

    // SignUp endpoint to create a new user
    @Post('/register')
    async create(@Body() user: CreateUserDto) {
        return this.usersService.create(user);
    }

    // SignIn endpoint to authenticate a user
    @Post('/login')
    async login(@Body() credentials: CreateUserDto) {
        return this.usersService.login(credentials);
    }

}
