import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { CreateVenueDto } from '../dto/req/create.venue.req.dto'
import { QueryVenuesDto } from '../dto/req/query-venues.dto'
import { UpdateVenueDto } from '../dto/req/update.venue.req.dto'
import { VenueEntity } from '../entity/venue.entity'
import { VenueLikeEntity } from '../entity/venueLike.entity'
import FindAllOptions from '../interfaces/findAll.interface'

@Injectable()
export class VenueService {
	constructor(
		@InjectRepository(VenueEntity)
		private readonly venueRepository: Repository<VenueEntity>,
		@InjectRepository(VenueLikeEntity)
		private readonly venueLikeRepository: Repository<VenueLikeEntity>
	) {}

	async create(createVenueDto: CreateVenueDto): Promise<VenueEntity> {
		const venue = this.venueRepository.create(createVenueDto)
		return await this.venueRepository.save(venue)
	}

	async findAll(options: FindAllOptions): Promise<VenueEntity[]> {
		const {
			search,
			tags,
			averageCheck,
			rating,
			type,
			features,
			limit,
			offset,
		} = options

		const query = this.venueRepository.createQueryBuilder('venue')

		if (search) {
			query.andWhere(
				'(venue.name LIKE :search OR venue.description LIKE :search)',
				{ search: `%${search}%` }
			)
		}
		if (tags && tags.length > 0) {
			query.andWhere('venue.tags && :tags', { tags })
		}
		if (averageCheck) {
			query.andWhere('venue.averageCheck <= :averageCheck', { averageCheck })
		}
		if (rating) {
			query.andWhere('venue.rating >= :rating', { rating })
		}
		if (type) {
			query.andWhere('venue.type = :type', { type })
		}
		if (features) {
			Object.entries(features).forEach(([key, value]) => {
				query.andWhere(`venue.features ->> '${key}' = :${key}`, {
					[key]: JSON.stringify(value),
				})
			})
		}
		if (limit) {
			query.take(limit)
		}
		if (offset) {
			query.skip(offset)
		}
		return await query.getMany()
	}

	async findOne(id: string): Promise<VenueEntity> {
		const venue = await this.venueRepository.findOne({ where: { id } })
		if (!venue) {
			throw new NotFoundException(`Venue with ID ${id} not found`)
		}
		return venue
	}

	async update(
		id: string,
		updateVenueDto: UpdateVenueDto
	): Promise<VenueEntity> {
		const venue = await this.findOne(id)
		this.venueRepository.merge(venue, updateVenueDto)
		return await this.venueRepository.save(venue)
	}

	async remove(id: string): Promise<void> {
		await this.venueRepository.delete(id)
	}

	async likeVenue(venueId: string, userId: string): Promise<VenueEntity> {
		const venue = await this.findOne(venueId)
		const existingLike = await this.venueLikeRepository.findOne({
			where: { userId, venueId },
		})
		if (existingLike) {
			return venue
		}
		const like = this.venueLikeRepository.create({ userId, venueId })
		await this.venueLikeRepository.save(like)

		venue.likes++
		return await this.venueRepository.save(venue)
	}

	async unlikeVenue(venueId: string, userId: string): Promise<VenueEntity> {
		const venue = await this.findOne(venueId)
		const existingLike = await this.venueLikeRepository.findOne({
			where: { userId, venueId },
		})
		if (!existingLike) {
			return venue
		}
		await this.venueLikeRepository.delete(existingLike.id)

		venue.likes--
		return await this.venueRepository.save(venue)
	}

	public async getAllVenueList(query: QueryVenuesDto): Promise<VenueEntity[]> {
		const { sortBy, filters, search } = query
		const qb = this.venueRepository.createQueryBuilder('venue')
		if (search) {
			qb.where('venue.name ILIKE :search', { search: `%${search}%` })
		}
		if (filters) {
			filters.split(',').forEach(filter => {
				if (filter === 'wifi')
					qb.andWhere(`:filter = ANY (venue.tags)`, { filter: 'wifi' })
				if (filter === 'parking')
					qb.andWhere(`:filter = ANY (venue.tags)`, { filter: 'parking' })
			})
		}
		if (sortBy) {
			const [field, direction] = sortBy.split(':')
			qb.orderBy(`venue.${field}`, direction.toUpperCase() as 'ASC' | 'DESC')
		}
		return qb.getMany()
	}

	public async getTopByCategory(category: string): Promise<VenueEntity[]> {
		return this.venueRepository.find({
			where: { tags: Like(`%${category}%`) },
			order: { rating: 'DESC' },
			take: 10,
		})
	}
}
