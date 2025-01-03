import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository'
import { UserRepository } from '../../repository/services/user.repository'
import { RefreshTokenEntity } from '../auth/entity/refresh-token.entity'
import { UserEntity } from './entity/user.entity'
import { UserService } from './services/user.service'
import { UserController } from './user.controller'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity])],
	controllers: [UserController],
	providers: [UserService, UserRepository, RefreshTokenRepository],
	exports: [UserService],
})
export class UserModule {}
