import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateDrinkingDto {
    @IsNotEmpty()
    @IsString()
    venueId: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsString()
    time: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    gender: string;

    @IsNotEmpty()
    @IsNumber()
    numberOfPeople: number;

    @IsNotEmpty()
    @IsString()
    paymentType: string;

    @IsNotEmpty()
    @IsNumber()
    budget: number;
}
