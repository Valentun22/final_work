import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { TableNameEnum } from '../enums/table-name.enum'

@Entity(TableNameEnum.MEETINGS)
export class MeetingEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	date: string

	@Column()
	time: string

	@Column()
	purpose: string

	// @ManyToOne(() => UserEntity)
	// user: UserEntity;

	// @ManyToOne(() => VenueEntity)
	// venue: VenueEntity
}
