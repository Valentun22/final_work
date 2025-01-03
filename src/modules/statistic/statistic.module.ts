import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StatisticEntity } from 'src/database/entities/statistic.entity'
import { SignboardEntity } from '../signboard/entity/signboard.entity'

@Module({
	imports: [TypeOrmModule.forFeature([StatisticEntity, SignboardEntity])],
})
export class StatisticModule {}
