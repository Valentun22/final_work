import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DrinkingController} from "./drinking.controller";
import {DrinkingEntity} from "./entity/drinking.entity";
import {DrinkingService} from "./services/drinking.service";

@Module({
    imports: [TypeOrmModule.forFeature([DrinkingEntity])],
    controllers: [DrinkingController],
    providers: [DrinkingService],
})
export class DrinkingModule {}
