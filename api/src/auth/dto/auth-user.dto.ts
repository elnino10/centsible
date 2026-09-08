import { IsEmail, IsNotEmpty, ValidateIf } from "class-validator";

export class AuthUserDto {
    @IsNotEmpty()
    password: string;

    @ValidateIf(o => !o.username)
    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @ValidateIf(o => !o.email)
    @IsNotEmpty()
    username?: string;
}