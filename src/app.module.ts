import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MeetingEntity } from './database/entities/meeting.entity'
import { StatisticEntity } from './database/entities/statistic.entity'
import { AuthModule } from './modules/auth/auth.module'
import { RefreshTokenEntity } from './modules/auth/entity/refresh-token.entity'
import { CriticModule } from './modules/critic/critic.module'
import { DrinkingService } from './modules/drinking/services/drinking.service'
import { FavoriteEntity } from './modules/favorite/entities/favorite.entity'
import { FavoriteModule } from './modules/favorite/favorite.module'
import { NewsEntity } from './modules/news/entity/news.entity'
import { NewsModule } from './modules/news/news.module'
import { ReviewEntity } from './modules/review/entities/review.entity'
import { ReviewModule } from './modules/review/review.module'
import { SignboardEntity } from './modules/signboard/entity/signboard.entity'
import { StatisticModule } from './modules/statistic/statistic.module'
import { UserEntity } from './modules/user/entity/user.entity'
import { UserModule } from './modules/user/user.module'
import { VenueEntity } from './modules/venue/entity/venue.entity'
import { VenueLikeEntity } from './modules/venue/entity/venueLike.entity'
import { VenueModule } from './modules/venue/venue.module'
import { PostgresModule } from './repository/postgres/postgres.module'
import { RedisModule } from './repository/redis/redis.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: './environments/local.env',
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('POSTGRES_HOST'),
				port: configService.get('POSTGRES_PORT'),
				username: configService.get('POSTGRES_USER'),
				password: configService.get('POSTGRES_PASSWORD'),
				database: configService.get('POSTGRES_DB'),
				entities: [
					StatisticEntity,
					UserEntity,
					SignboardEntity,
					VenueEntity,
					VenueLikeEntity,
					FavoriteEntity,
					NewsEntity,
					ReviewEntity,
					DrinkingService,
					RefreshTokenEntity,
					MeetingEntity,
				],
				synchronize: false,
			}),
			inject: [ConfigService],
		}),
		StatisticModule,
		AuthModule,
		UserModule,
		PostgresModule,
		RedisModule,
		FavoriteModule,
		ReviewModule,
		NewsModule,
		VenueModule,
		CriticModule,
	],
})
export class AppModule {}

// todo додати модулі