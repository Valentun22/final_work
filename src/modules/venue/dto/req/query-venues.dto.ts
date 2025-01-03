import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryVenuesDto {
    @ApiPropertyOptional({ description: 'Search by venue name' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ description: 'Sorting criteria (e.g., rating:desc)' })
    @IsOptional()
    @IsString()
    sortBy?: string;

    @ApiPropertyOptional({ description: 'Filter criteria (e.g., wifi,parking)' })
    @IsOptional()
    @IsString()
    filters?: string;
}
