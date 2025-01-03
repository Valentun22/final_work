import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VenuesRepository } from 'src/repository/services/venues.repository'
import { VenueEntity } from './entity/venue.entity'
import { VenueLikeEntity } from './entity/venueLike.entity'
import { VenueService } from './services/venue.service'

@Module({
	imports: [TypeOrmModule.forFeature([VenueEntity, VenueLikeEntity])],
	providers: [VenueService, VenuesRepository],
	exports: [VenueService],
})
export class VenueModule {}
