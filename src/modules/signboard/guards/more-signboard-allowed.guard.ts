import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { AccountTypeEnum } from '../../../database/enums/account-type.enum'
import { UserRepository } from '../../../repository/services/user.repository'

@Injectable()
export class MoreSignboardAllowedGuard implements CanActivate {
	constructor(private readonly userRepository: UserRepository) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const userSignboardId = request.params.userId
		const userWithSignboard = await this.userRepository.findOne({
			where: { id: userSignboardId },
			relations: ['signboard'],
		})
		if (
			userWithSignboard.accountType === AccountTypeEnum.BASE_ACCOUNT &&
			userWithSignboard.signboards.length > 0
		) {
			throw new ForbiddenException(
				`Error. To add more ads, upgrade to ${AccountTypeEnum.CRITIC_ACCOUNT} account.`
			)
		}
		return true
	}
}
