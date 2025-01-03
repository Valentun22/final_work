import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RedisModule } from '../../repository/redis/redis.module'
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository'
import { UserRepository } from '../../repository/services/user.repository'
import { UserEntity } from '../user/entity/user.entity'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { RefreshTokenEntity } from './entity/refresh-token.entity'
import { JwtAccessGuard } from './guards/jwt-access.guard'
import { AuthCacheService } from './services/auth-cache.service'
import { AuthService } from './services/auth.service'
import { TokenService } from './services/token.service'

@Module({
	imports: [
		JwtModule,
		RedisModule,
		UserModule,
		TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
	],
	controllers: [AuthController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAccessGuard,
		},
		AuthService,
		AuthCacheService,
		TokenService,
		UserRepository,
		RefreshTokenRepository,
	],
	exports: [AuthCacheService],
})
export class AuthModule {}
