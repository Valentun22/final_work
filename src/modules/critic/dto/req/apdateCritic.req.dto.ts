import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateCriticDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    bio?: string;
}