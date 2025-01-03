import {
    Controller,
    Post,
    Delete,
    Param,
    UseGuards, Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import {FavoriteService} from "./services/favorite.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CurrentUser} from "../auth/decorators/current-user.decorator";
import {IUserData} from "../auth/interfaces/user-data.interface";

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) {}

    @ApiOperation({ summary: 'Add venue to favorites' })
    @ApiParam({ name: 'venueId', type: String })
    @UseGuards(JwtAuthGuard)
    @Post(':venueId')
    async addFavorite(@CurrentUser() user: IUserData, @Param('venueId') venueId: string) {
        const userId = user.userId;
        return await this.favoriteService.addFavorite(userId, venueId);
    }

    @ApiOperation({ summary: 'Remove venue from favorites' })
    @ApiParam({ name: 'venueId', type: String })
    @UseGuards(JwtAuthGuard)
    @Delete(':venueId')
    async removeFavorite(
        @CurrentUser() user: IUserData,
        @Param('venueId') venueId: string,
    ) {
        const userId = user.userId;
        return await this.favoriteService.removeFavorite(userId, venueId);
    }

    @ApiOperation({ summary: 'Get user favorites' })
    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserFavorites(@CurrentUser() user: IUserData) {
        const userId = user.userId;
        return await this.favoriteService.getUserFavorites(userId);
    }
}