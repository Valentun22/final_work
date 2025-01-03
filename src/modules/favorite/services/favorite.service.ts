import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Injectable} from "@nestjs/common";
import {FavoriteEntity} from "../entities/favorite.entity";

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(FavoriteEntity)
        private readonly favoriteRepository: Repository<FavoriteEntity>,
    ) {}

    async addFavorite(userId: string, venueId: string): Promise<FavoriteEntity> {
        const favorite = this.favoriteRepository.create({ userId, venueId });
        return await this.favoriteRepository.save(favorite);
    }

    async removeFavorite(userId: string, venueId: string): Promise<void> {
        await this.favoriteRepository.delete({ userId, venueId });
    }

    async getUserFavorites(userId: string): Promise<FavoriteEntity[]> {
        return await this.favoriteRepository.find({
            where: { userId },
            relations: ['venue'],
        });
    }
}
