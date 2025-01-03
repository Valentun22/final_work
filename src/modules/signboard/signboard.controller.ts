import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { SignboardService } from './services/signboard.service';
import { CreateSignboardDto } from './dto/req/create-signboard.dto';
import { SignboardResDto } from './dto/res/signboard.res.dto';
import { UpdateSignboardDto } from './dto/req/update-signboard.dto';
import { SignboardListReqDto } from './dto/req/signboard-list.req.dto';
import { SignboardListResDto } from './dto/res/signboard-list.res.dto';
import {UserRoleEnum} from "../../database/enums/roles.enum";
import {MoreSignboardAllowedGuard} from "./guards/more-signboard-allowed.guard";
import {RolesGuard} from "../admin-manager/guards/role.guard";
import {RoleUser} from "../admin-manager/decorators/check.role";

@ApiTags('Signboard')
@Controller('signboard')
export class SignboardController {
  constructor(private readonly signboardService: SignboardService) {}

  @ApiBearerAuth()
  @RoleUser(UserRoleEnum.ADMIN)
  @UseGuards( RolesGuard, MoreSignboardAllowedGuard)
  @ApiOperation({
    summary: 'Allowed for users with ADMIN role',
  })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateSignboardDto,
  ): Promise<SignboardResDto> {
    return await this.signboardService.create(userData, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update signboard' })
  @Put(':signboard_id')
  public async update(
    @Param('signboard_id', ParseUUIDPipe) signboard_id: string,
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateSignboardDto,
  ): Promise<SignboardResDto> {
    return await this.signboardService.update(
      userData,
      dto,
      signboard_id,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get signboard by id' })
  @Get(':signboard_id')
  public async getById(
    @Param('signboard_id', ParseUUIDPipe) signboard_id: string,
    @CurrentUser() userData: IUserData,
  ): Promise<SignboardResDto> {
    return await this.signboardService.getById(userData, signboard_id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all signboard' })
  @Get()
  public async getAll(
    @CurrentUser() userData: IUserData,
    @Query() query: SignboardListReqDto,
  ): Promise<SignboardListResDto> {
    return await this.signboardService.getAll(userData, query);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete signboard' })
  @Delete(':signboard_id')
  public async delete(
    @Param('signboard_id', ParseUUIDPipe) signboard_id: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.signboardService.delete(userData, signboard_id);
  }
}
