import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}
