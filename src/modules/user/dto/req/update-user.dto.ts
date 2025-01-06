import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User biography',
  })
  @IsString()
  @IsOptional()
  readonly bio?: string;

  @ApiPropertyOptional({
    description: "User name"
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'The URL of the user\'s profile picture'
  })
  @IsUrl()
  @IsOptional()
  readonly image?: string;
}
