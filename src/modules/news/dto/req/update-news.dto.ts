import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto {
  @ApiPropertyOptional({
    description: 'Headline of the news',
    example: 'A new exciting title',
  })
  @IsString()
  @IsOptional()
  readonly title?: string;

  @ApiPropertyOptional({
    description: 'Updated news content',
    example: 'Updated news text...',
  })
  @IsString()
  @IsOptional()
  readonly content?: string;
}
