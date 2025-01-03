import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from './news.controller';
import {NewsEntity} from "./entity/news.entity";
import {NewsService} from "./services/news.service";

@Module({
    imports: [TypeOrmModule.forFeature([NewsEntity])],
    controllers: [NewsController],
    providers: [NewsService],
    exports: [NewsService],
})
export class NewsModule {}