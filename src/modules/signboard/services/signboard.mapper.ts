import { SignboardResDto } from '../dto/res/signboard.res.dto';
import { SignboardListReqDto } from '../dto/req/signboard-list.req.dto';
import { SignboardListResDto } from '../dto/res/signboard-list.res.dto';
import {SignboardEntity} from "../entity/signboard.entity";
import {VenueEntity} from "../../venue/entity/venue.entity";

export class SignboardMapper {
  public static toResponseDto(
      signboardEntity: SignboardEntity,
    venueEntity: VenueEntity,
  ): SignboardResDto {
    return {
      signboard_id: signboardEntity.id,
      title: signboardEntity.title,
      description: signboardEntity.description,
      body: signboardEntity.description,
      userId: signboardEntity.userId,
      venue: {
        venueId: venueEntity.id,
        name: venueEntity.name,
        location: venueEntity.location,
        averageCheck: venueEntity.averageCheck,
        workingHours: venueEntity.workingHours,
        contactInfo: venueEntity.contactInfo,
        image: venueEntity.image,
        tags: venueEntity.tags,
        owner: venueEntity.owner,
        reviews: venueEntity.reviews,
        news: venueEntity.news,
        favorites: venueEntity.favorites,
      },
    };
  }

  public static toResponseDtoById(
      signboardEntity: SignboardEntity,
  ): SignboardResDto {
    return {
      signboard_id: signboardEntity.id,
      title: signboardEntity.title,
      description: signboardEntity.description,
      body: signboardEntity.description,
      userId: signboardEntity.userId,
      venue: signboardEntity.venue
         ? {
        venueId: signboardEntity.venue.id,
        name: signboardEntity.venue.name,
        location: signboardEntity.venue.location,
        averageCheck: signboardEntity.venue.averageCheck,
        workingHours: signboardEntity.venue.workingHours,
        contactInfo: signboardEntity.venue.contactInfo,
        image: signboardEntity.venue.image,
        tags: signboardEntity.venue.tags,
        owner: signboardEntity.venue.owner,
        reviews: signboardEntity.venue.reviews,
        news: signboardEntity.venue.news,
        favorites: signboardEntity.venue.favorites,
          }
        : null,
    };
  }

  public static ToListResponseDto(
    entities: SignboardEntity[],
    total: number,
    query: SignboardListReqDto,
  ): SignboardListResDto {
    return {
      data: entities.map(this.toResponseDtoById),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }
}
