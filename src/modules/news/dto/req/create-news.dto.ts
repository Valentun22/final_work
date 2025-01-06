import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateNewsDto {
    @ApiProperty({
        description: 'Headline of the news',
        example: 'A new exciting title',
    })
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    readonly venueId: number;
}
