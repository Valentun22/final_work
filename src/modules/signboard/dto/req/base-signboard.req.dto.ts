import {IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Length, ValidateNested} from "class-validator";
import {StatusTypeEnum} from "../../../../database/enums/status-type.enum";
import {Transform, Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";
import {TransformHelper} from "../../../../common/helpers/transform.helper";
import {StatisticEntity} from "../../../../database/entities/statistic.entity";

export class BaseSignboardReqDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  title: string;

  @ApiProperty()
  @IsString()
  @Length(0, 500)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @ApiProperty()
  @IsString()
  @Length(0, 5000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  body: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(StatusTypeEnum)
  status: StatusTypeEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  venueId?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatisticEntity)
  views?: StatisticEntity[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  additionalInfo?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  image: string;
}