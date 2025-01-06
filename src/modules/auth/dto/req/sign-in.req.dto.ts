import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SignInReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly deviceId: string;

  @ApiProperty({
    description: 'User\'s email address',
    example: 'example@mail.com',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
