import { Module, Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Redis } from 'ioredis'
import { Config, RedisConfig } from '../../configs/config.type'
import { REDIS_CLIENT } from './redis.constants'
import { RedisService } from './services/redis.service'

const redisProvider: Provider = {
	provide: REDIS_CLIENT,
	useFactory: (configService: ConfigService<Config>) => {
		const redisConfig = configService.get<RedisConfig>('redis')

		// if (!redisConfig) {
		// 	throw new Error('Redis configuration is missing')
		// }

		return new Redis({
			port: 6379,
			host: 'localhost',
			password: 'ldjkfn',
			// Add some reasonable defaults and error handling
			retryStrategy: times => {
				return Math.min(times * 50, 2000)
			},
		})
	},
	inject: [ConfigService],
}

@Module({
	providers: [redisProvider, RedisService],
	exports: [RedisService],
})
export class RedisModule {}
