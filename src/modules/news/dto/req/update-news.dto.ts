import {PickType} from "@nestjs/swagger";
import {NewsEntity} from "../../entity/news.entity";

export class UpdateNewsDto extends PickType(NewsEntity, [
  'title',
  'content'
]) {}