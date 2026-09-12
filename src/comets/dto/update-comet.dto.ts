import { IsString, MinLength } from "class-validator";

export class UpdateCometDto {
    @IsString()
    @MinLength(3, { message: 'Name must at least, be 3 chars long' })
    name: string;
}