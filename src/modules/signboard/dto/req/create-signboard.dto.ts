import { PickType } from '@nestjs/swagger';
import { BaseSignboardReqDto } from './base-signboard.req.dto';

export class CreateSignboardDto extends PickType(BaseSignboardReqDto, [
  'title',
  'body',
  'description',
  'image',
  'status',
  'userId',
  'venueId',
  'views',
  'additionalInfo',
]) {}
