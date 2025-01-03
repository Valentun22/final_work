import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {VenueEntity} from "../../modules/venue/entity/venue.entity";

@Injectable()
export class VenuesRepository extends Repository<VenueEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(VenueEntity, dataSource.manager);
  }

  public async findByIdOrThrow(id: string): Promise<VenueEntity> {
    const entity = await this.findOneBy({ id });
    if (!entity) {
      throw new UnprocessableEntityException('Venues not found');
    }
    return entity;
  }
}
