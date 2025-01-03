import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateDrinkingDto} from "../dto/create-drinking.dto";
import {DrinkingEntity} from "../entity/drinking.entity";

@Injectable()
export class DrinkingService {
    constructor(
        @InjectRepository(DrinkingEntity)
        private readonly drinkingRepository: Repository<DrinkingEntity>,
    ) {}

    public async create(dto: CreateDrinkingDto): Promise<{ message: string }> {
        const drinking = this.drinkingRepository.create(dto);
        await this.drinkingRepository.save(drinking);
        return { message: 'Drinking request created successfully' };
    }

    public async getAll(filters: any): Promise<DrinkingEntity[]> {
        return this.drinkingRepository.find(filters);
    }
}
