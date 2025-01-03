import { Column, Entity } from 'typeorm'
import { TableNameEnum } from '../enums/table-name.enum'
import { BaseModel } from './models/base.model'

@Entity(TableNameEnum.STATISTICS)
export class StatisticEntity extends BaseModel {
	@Column()
	signboard_id: string

	// @ManyToOne(() => SignboardEntity)
	// @JoinColumn({ name: 'signboard_id' })
	// signboard: SignboardEntity
}
