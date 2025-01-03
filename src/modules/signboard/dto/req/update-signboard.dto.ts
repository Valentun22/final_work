import { PickType } from '@nestjs/swagger';
import { BaseSignboardReqDto } from './base-signboard.req.dto';

export class UpdateSignboardDto extends PickType(BaseSignboardReqDto, [
    'title',
    'body',
    'description',
    'image',
    'status',
    'additionalInfo',
]) {}

//todo виправити dto