import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsInt } from 'class-validator';
import {StatusTypeEnum} from "../../../../database/enums/status-type.enum";

export class CreateSignboardDto {
  @ApiProperty({
    description: 'The title of the sign',
    example: 'New product',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: 'The main text of the sign',
    example: 'Product description...',
  })
  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @ApiProperty({
    description: 'Description of the sign',
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'Signage image URL',
  })
  @IsString()
  @IsOptional()
  readonly image?: string;

  @ApiProperty({
    description: 'Status of the sign',
    example: 'ACTIVE',
  })
  @IsEnum(StatusTypeEnum)
  @IsNotEmpty()
  readonly status: StatusTypeEnum;

  @ApiProperty({
    description: 'The ID of the user who created the banner',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({
    description: 'The ID of the location associated with the sign',
    example: 2,
  })
  @IsInt()
  @IsNotEmpty()
  readonly venueId: number;

  @ApiProperty({
    description: 'The number of views of the sign',
    example: 100,
  })
  @IsInt()
  @IsOptional()
  readonly views?: number;

  @ApiProperty({
    description: 'Additional information about the sign',
    example: 'Additional details...',
  })
  @IsString()
  @IsOptional()
  readonly additionalInfo?: string;
}
