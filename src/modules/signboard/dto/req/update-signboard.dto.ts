import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import {StatusTypeEnum} from "../../../../database/enums/status-type.enum";

export class UpdateSignboardDto {
    @ApiPropertyOptional({
        description: 'The title of the sign',
        example: 'Updated title',
    })
    @IsString()
    @IsOptional()
    readonly title?: string;

    @ApiPropertyOptional({
        description: 'The main text of the sign',
    })
    @IsString()
    @IsOptional()
    readonly body?: string;

    @ApiPropertyOptional({
        description: 'Updated sign description',
    })
    @IsString()
    @IsOptional()
    readonly description?: string;

    @ApiPropertyOptional({
        description: 'Signage image URL',
    })
    @IsString()
    @IsOptional()
    readonly image?: string;

    @ApiPropertyOptional({
        description: 'Status of the sign',
        example: 'ACTIVE',
    })
    @IsEnum(StatusTypeEnum)
    @IsOptional()
    readonly status?: StatusTypeEnum;

    @ApiPropertyOptional({
        description: 'Additional information about the sign',
        example: 'Details...',
    })
    @IsString()
    @IsOptional()
    readonly additionalInfo?: string;
}
