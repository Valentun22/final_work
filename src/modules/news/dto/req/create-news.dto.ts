import {PickType} from "@nestjs/swagger";
import {NewsEntity} from "../../entity/news.entity";

export class CreateNewsDto extends PickType(NewsEntity, [
    'title',
    'content',
    'venueId',
]) {}

//todo виправити dto