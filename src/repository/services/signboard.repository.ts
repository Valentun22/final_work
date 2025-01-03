import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {SignboardEntity} from "../../modules/signboard/entity/signboard.entity";
import {SignboardListReqDto} from "../../modules/signboard/dto/req/signboard-list.req.dto";

@Injectable()
export class SignboardRepository extends Repository<SignboardEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SignboardEntity, dataSource.manager);
  }

  public async findByIdOrThrow(id: string): Promise<SignboardEntity> {
    const entity = await this.findOneBy({ id });
    if (!entity) {
      throw new UnprocessableEntityException('Signboard not found');
    }
    return entity;
  }

  public async getSignboardById(
      signboard_id: string,
  ): Promise<SignboardEntity> {
    const qb = this.createQueryBuilder('signboard');
    qb.leftJoinAndSelect('signboard.venue', 'venue');
    qb.where('signboard.id = :signboard_id');
    qb.setParameter('signboard_id', signboard_id);
    return await qb.getOne();
  }
  public async getAll(
    query: SignboardListReqDto,
  ): Promise<[SignboardEntity[], number]> {
    const qb = this.createQueryBuilder('signboard');
    qb.leftJoinAndSelect('signboard.venue', 'venue');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
