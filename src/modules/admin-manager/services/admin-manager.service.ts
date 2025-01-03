import { ConflictException, Injectable } from '@nestjs/common';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { UserMapper } from '../../user/services/user.mapper';
import { UserResDto } from '../../user/dto/res/user.res.dto';
import { BaseAdminManagerReqDto } from '../dto/req/base-admin-manager.req.dto';
import {AccountTypeEnum} from "../../../database/enums/account-type.enum";
import {StatusTypeEnum} from "../../../database/enums/status-type.enum";
import {SignboardRepository} from "../../../repository/services/signboard.repository";
import {UserRepository} from "../../../repository/services/user.repository";

@Injectable()
export class AdminManagerService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly signboardRepository: SignboardRepository,
  ) {}

  public async setNewRole(
    userData: IUserData,
    userId: string,
    dto: BaseAdminManagerReqDto,
  ): Promise<UserResDto> {
    const userEntity = await this.userRepository.findByIdOrThrow(userId);
    if (userEntity.role === dto.role) {
      throw new ConflictException('User already has this role');
    }
    userEntity.role = dto.role;
    await this.userRepository.save(userEntity);
    return UserMapper.toResponseDto(userEntity);
  }

  public async setCritic(userId: string): Promise<void> {
    const userEntity = await this.userRepository.findByIdOrThrow(userId);
    if (userEntity.accountType === AccountTypeEnum.CRITIC_ACCOUNT) {
      throw new ConflictException('User already has CRITIC account');
    }
    userEntity.accountType = AccountTypeEnum.CRITIC_ACCOUNT;
    await this.userRepository.save(userEntity);
  }

  public async deleteUser(userId: string): Promise<void> {
    const userEntity = await this.userRepository.findByIdOrThrow(userId);
    await this.userRepository.delete(userEntity.id);
  }

  public async blockSignboard(signboard_Id: string): Promise<void> {
    const entity =
        await this.signboardRepository.findByIdOrThrow(signboard_Id);
    if (entity.status === StatusTypeEnum.BLOCKED) {
      throw new ConflictException('Signboard is already blocked');
    }
    entity.status = StatusTypeEnum.BLOCKED;
    await this.signboardRepository.save(entity);
  }

  public async unblockSignboard(signboard_Id: string): Promise<void> {
    const entity =
        await this.signboardRepository.findByIdOrThrow(signboard_Id);
    if (entity.status === StatusTypeEnum.ACTIVE) {
      throw new ConflictException('Signboard is already active');
    }
    entity.status = StatusTypeEnum.ACTIVE;
    await this.signboardRepository.save(entity);
  }

  public async deleteSignboard(signboard_Id: string): Promise<void> {
    const entity =
      await this.signboardRepository.findByIdOrThrow(signboard_Id);
    await this.signboardRepository.delete(entity);
  }
}
