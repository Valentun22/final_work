import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
    @IsNotEmpty()
    venueId: string;

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsNotEmpty()
    comment: string;
}
