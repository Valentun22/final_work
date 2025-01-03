import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {IUserData} from "../../auth/interfaces/user-data.interface";
import {CreateReviewDto} from "../dto/create-review.dto";
import {ReviewEntity} from "../entities/review.entity";

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewEntity)
        private readonly reviewRepository: Repository<ReviewEntity>,
    ) {}

    public async addReview(
        userData: IUserData,
        dto: CreateReviewDto,
    ): Promise<{ message: string }> {
        const review = this.reviewRepository.create({
            ...dto,
            userId: userData.userId,
        });
        await this.reviewRepository.save(review);
        return { message: 'Review added successfully' };
    }
}
