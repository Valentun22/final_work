import { Module } from '@nestjs/common';
import { CriticController } from './critic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CriticService} from "./service/critic.service";
import {UserEntity} from "../user/entity/user.entity";
import {ReviewEntity} from "../review/entities/review.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ReviewEntity])],
    controllers: [CriticController],
    providers: [CriticService],
    exports: [CriticService],
})
export class CriticModule {}