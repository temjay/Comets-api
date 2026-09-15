import { IS_NOT_EMPTY, IsString, MinLength } from "class-validator";

export class CreateCometDto {
    @IsString()
    @MinLength(3, { message: 'Name must at least, be 3 chars long' })
    title!: string;

    @IsString()
    speed!: string;
}