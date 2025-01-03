import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRoleEnum} from '../../database/enums/roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { AdminManagerService } from './services/admin-manager.service';
import { UserResDto } from '../user/dto/res/user.res.dto';
import { BaseAdminManagerReqDto } from './dto/req/base-admin-manager.req.dto';
import {RoleUser} from "./decorators/check.role";
import {RolesGuard} from "./guards/role.guard";

@ApiTags('Admin/Manager. This tag is for admin roles.')
@RoleUser(UserRoleEnum.ADMIN)
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('admins/managers')
export class AdminManagerController {
  constructor(private readonly adminManagerService: AdminManagerService) {}

  @ApiOperation({ summary: 'Create a new role' })
  @Put(':userId')
  public async setNewRole(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: BaseAdminManagerReqDto,
  ): Promise<UserResDto> {
    return await this.adminManagerService.setNewRole(userData, userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Set critic account' })
  @Put('/critic:userId')
  async setCritic(@Param('userId') userId: string): Promise<void> {
    await this.adminManagerService.setCritic(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete User' })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.adminManagerService.deleteUser(userId);
  }
  @ApiOperation({ summary: 'Block signboard' })
  @Put(':signboard_id')
  async blockSignboard(
    @Param('signboard_id') signboardId: string,
  ): Promise<void> {
    await this.adminManagerService.blockSignboard(signboardId);
  }

  @ApiOperation({ summary: 'Unblock signboard' })
  @Patch(':signboard_id')
  async unblockSignboard(
    @Param('signboard_id') signboardId: string,
  ): Promise<void> {
    await this.adminManagerService.unblockSignboard(signboardId);
  }

  @ApiOperation({ summary: 'Delete signboard' })
  @Delete(':signboard_id')
  async deleteSignboard(
    @Param('signboard_id') signboardId: string,
  ): Promise<void> {
    await this.adminManagerService.deleteSignboard(signboardId);
  }
}
