import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryNewsDto {
    @ApiPropertyOptional({ description: 'Category of the news' })
    @IsOptional()
    @IsString()
    category?: string;
}
