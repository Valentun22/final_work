import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VenuesRepository } from 'src/repository/services/venues.repository'
import { VenueEntity } from './entity/venue.entity'
import { VenueLikeEntity } from './entity/venueLike.entity'
import { VenueService } from './services/venue.service'
import {VenueController} from "./venue.controller";

@Module({
	imports: [TypeOrmModule.forFeature([VenueEntity, VenueLikeEntity])],
	controllers: [VenueController],
	providers: [VenueService, VenuesRepository],
	exports: [VenueService],
})
export class VenueModule {}
