import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from "../../user/entity/user.entity";
import {CreateCriticDto} from "../dto/req/createCritic.req.dto";
import {UserRoleEnum} from "../../../database/enums/roles.enum";
import {UpdateCriticDto} from "../dto/req/apdateCritic.req.dto";
import {CreateReviewDto} from "../../review/dto/create-review.dto";
import {ReviewEntity} from "../../review/entities/review.entity";

@Injectable()
export class CriticService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ReviewEntity)
        private readonly reviewRepository: Repository<ReviewEntity>,
    ) {}

    async create(createCriticDto: CreateCriticDto): Promise<UserEntity> {
        const critic = this.userRepository.create({
            ...createCriticDto,
            role: UserRoleEnum.CRITIC
        });
        return await this.userRepository.save(critic);
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({ where: { role: UserRoleEnum.CRITIC } });
    }

    async findOne(id: string ): Promise<UserEntity> {
        const critic = await this.userRepository.findOne({ where: { id, role: UserRoleEnum.CRITIC } });
        if (!critic) {
            throw new NotFoundException(`Critic with ID ${id} not found`);
        }
        return critic;
    }

    async update(id: string , updateCriticDto: UpdateCriticDto): Promise<UserEntity> {
        const critic = await this.findOne(id);
        this.userRepository.merge(critic, updateCriticDto);
        return await this.userRepository.save(critic);
    }

    async remove(id: string ): Promise<void> {
        await this.userRepository.delete(id);
    }

    async addReview(userId: string, createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
        const review = this.reviewRepository.create({
            ...createReviewDto,
            userId: userId,
            venue: { id: createReviewDto.venueId },
        });
        return await this.reviewRepository.save(review);
    }
}