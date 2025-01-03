import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateCriticDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    bio?: string;
}