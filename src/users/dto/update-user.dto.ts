import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../auth/dto/create-user.dto.js';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    username?: string;
}
