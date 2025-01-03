import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { BaseModel } from '../../../database/entities/models/base.model'
import { StatusTypeEnum } from '../../../database/enums/status-type.enum'
import { TableNameEnum } from '../../../database/enums/table-name.enum'
import { UserEntity } from '../../user/entity/user.entity'
import { VenueEntity } from '../../venue/entity/venue.entity'

@Entity(TableNameEnum.SIGNBOARD)
export class SignboardEntity extends BaseModel {
	@Column('text')
	title: string

	@Column('text')
	description: string

	@Column('text')
	body: string

	@Column({
		type: 'enum',
		enum: StatusTypeEnum,
		default: StatusTypeEnum.INACTIVE,
	})
	status: StatusTypeEnum

	@Column()
	userId: string
	@ManyToOne(() => UserEntity, user => user.signboards)
	@JoinColumn({ name: 'userId' })
	user?: UserEntity

	@Column()
	venueId: string
	@OneToOne(() => VenueEntity, entity => entity.signboard)
	@JoinColumn({ name: 'venueId' })
	venue?: VenueEntity

	// @OneToMany(() => StatisticEntity, statistic => statistic.signboard)
	// statistics: StatisticEntity[]
}
