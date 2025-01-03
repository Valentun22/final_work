import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import {ReviewService} from "./services/review.service";

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add a review' })
    @Post()
    public async addReview(
        @CurrentUser() userData: IUserData,
        @Body() dto: CreateReviewDto,
    ): Promise<{ message: string }> {
        return await this.reviewService.addReview(userData, dto);
    }
}
