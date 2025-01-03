import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { StatusTypeEnum } from '../../../database/enums/status-type.enum';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { SignboardMapper } from './signboard.mapper';
import { BaseSignboardReqDto } from '../dto/req/base-signboard.req.dto';
import { SignboardResDto } from '../dto/res/signboard.res.dto';
import { UpdateSignboardDto } from '../dto/req/update-signboard.dto';
import { SignboardListReqDto } from '../dto/req/signboard-list.req.dto';
import { SignboardListResDto } from '../dto/res/signboard-list.res.dto';
import {SignboardRepository} from "../../../repository/services/signboard.repository";
import {VenuesRepository} from "../../../repository/services/venues.repository";
import {StatisticRepository} from "../../../repository/services/statistic.repository";

@Injectable()
export class SignboardService {
  constructor(
    private readonly signboardRepository: SignboardRepository,
    private readonly venuesRepository: VenuesRepository,
    private readonly statisticRepository: StatisticRepository,

  ) {}

  public async create(
      userData: IUserData,
      dto: BaseSignboardReqDto,
  ): Promise<SignboardResDto> {
    const { title, description, body, venueId, status } = dto;

    const venueEntity = await this.venuesRepository.findOneBy({
      id: venueId,
    });

    if (!venueEntity) {
      throw new UnprocessableEntityException('The specified venue does not exist');
    }

    const newSignboard = this.signboardRepository.create({
      title,
      description,
      body,
      status: status || StatusTypeEnum.INACTIVE,
      userId: userData.userId,
      venueId: venueEntity.id,
    });

    const savedSignboard = await this.signboardRepository.save(newSignboard);

    return SignboardMapper.toResponseDto(savedSignboard, venueEntity);
  }

  public async update(
      userData: IUserData,
      dto: UpdateSignboardDto,
      signboard_id: string,
  ): Promise<SignboardResDto> {
    const { title, description, body, status } = dto;

    const signboardEntity = await this.signboardRepository.findOneBy({
      id: signboard_id,
      userId: userData.userId,
    });

    if (!signboardEntity) {
      throw new ConflictException('You cannot update this signboard');
    }

    const updatedSignboard = this.signboardRepository.merge(signboardEntity, {
      title,
      description,
      body,
      status,
    });

    const savedSignboard = await this.signboardRepository.save(updatedSignboard);

    const venueEntity = await this.venuesRepository.findOneBy({
      id: signboardEntity.venueId,
    });

    return SignboardMapper.toResponseDto(savedSignboard, venueEntity);
  }

  public async getById(
    userData: IUserData,
    signboard_id: string,
  ): Promise<SignboardResDto> {
    const signboardEntity =
      await this.signboardRepository.getSignboardById(signboard_id);
    if (signboardEntity.userId !== userData.userId) {
      await this.statisticRepository.save(
        this.statisticRepository.create({ signboard_id: signboard_id }),
      );
    }
    return SignboardMapper.toResponseDtoById(signboardEntity);
  }

  public async getAll(
    userData: IUserData,
    query: SignboardListReqDto,
  ): Promise<SignboardListResDto> {
    const [entities, total] = await this.signboardRepository.getAll(query);

    return SignboardMapper.ToListResponseDto(entities, total, query);
  }

  public async delete(
    userData: IUserData,
    signboard_id: string,
  ): Promise<void> {
    const signboardEntity = await this.signboardRepository.findOneBy({
      userId: userData.userId,
      id: signboard_id,
    });
    if (!signboardEntity) {
      throw new ConflictException("I can't remove this ad");
    }
    const venuesEntity = await this.venuesRepository.findOneBy({
      id: signboardEntity.venueId,
    });
    await this.signboardRepository.delete({ id: signboard_id });

    await this.venuesRepository.delete({ id: venuesEntity.id });
  }
}

