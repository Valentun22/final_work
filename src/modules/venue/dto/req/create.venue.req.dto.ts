import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsArray,
    IsOptional,
} from 'class-validator';

export class CreateVenueDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNumber()
    averageCheck: number;

    @IsNotEmpty()
    @IsString()
    workingHours: string;

    @IsNotEmpty()
    @IsString()
    contactInfo: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    menu?: string[];

    @IsNumber()
    @IsOptional()
    latitude?: number;

    @IsNumber()
    @IsOptional()
    longitude?: number;

    @IsString()
    @IsOptional()
    type?: string;

    @IsOptional()
    features?: {
        wifi: boolean;
        parking: boolean;
        liveMusic: boolean;
    };
}