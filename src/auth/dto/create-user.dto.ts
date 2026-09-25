import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    username!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
    password!: string;
}
