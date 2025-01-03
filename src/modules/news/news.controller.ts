import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Put,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateNewsDto } from './dto/req/create-news.dto';
import { UpdateNewsDto } from './dto/req/update-news.dto';
import {NewsService} from "./services/news.service";
import {UserRoleEnum} from "../../database/enums/roles.enum";
import {RolesGuard} from "../admin-manager/guards/role.guard";
import {RoleUser} from "../admin-manager/decorators/check.role";
import {QueryNewsDto} from "./dto/req/query-news.dto";

@ApiTags('News')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @ApiOperation({ summary: 'Add news to a venue' })
    @UseGuards( RolesGuard)
    @RoleUser(UserRoleEnum.ADMIN)
    @Post()
    public async create(@Body() dto: CreateNewsDto) {
        return await this.newsService.create(dto);
    }

    @ApiOperation({ summary: 'Get all news' })
    @Get()
    public async findAll(
        @Query('venueId') venueId?: string,
        @Query('limit') limit?: number,
        @Query('offset') offset?: number,
    ) {
        return await this.newsService.findAll(venueId, limit, offset);
    }

    @ApiOperation({ summary: 'Get news by ID' })
    @ApiParam({ name: 'id', type: String })
    @Get(':id')
    public async findOne(@Param('id') id: string) {
        return await this.newsService.findOne(id);
    }

    @ApiOperation({ summary: 'Update news by ID' })
    @ApiParam({ name: 'id', type: String })
    @UseGuards( RolesGuard)
    @RoleUser(UserRoleEnum.ADMIN)
    @Put(':id')
    public async update(
        @Param('id') id: string,
        @Body() dto: UpdateNewsDto,
    ) {
        return await this.newsService.update(id, dto);
    }

    @ApiOperation({ summary: 'Delete news by ID' })
    @ApiParam({ name: 'id', type: String })
    @UseGuards( RolesGuard)
    @RoleUser(UserRoleEnum.ADMIN)
    @Delete(':id')
    public async remove(@Param('id') id: string) {
        return await this.newsService.remove(id);
    }

    @ApiOperation({ summary: 'Get news by category' })
    @Get()
    public async getAll(@Query() query: QueryNewsDto) {
        return await this.newsService.getAll(query);
    }
}