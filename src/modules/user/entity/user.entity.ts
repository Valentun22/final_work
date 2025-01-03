import { SignboardEntity } from 'src/modules/signboard/entity/signboard.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseModel } from '../../../database/entities/models/base.model'
import { AccountTypeEnum } from '../../../database/enums/account-type.enum'
import { UserRoleEnum } from '../../../database/enums/roles.enum'
import { TableNameEnum } from '../../../database/enums/table-name.enum'
import { RefreshTokenEntity } from '../../auth/entity/refresh-token.entity'
import { FavoriteEntity } from '../../favorite/entities/favorite.entity'
import { ReviewEntity } from '../../review/entities/review.entity'
import { VenueEntity } from '../../venue/entity/venue.entity'
import { VenueLikeEntity } from '../../venue/entity/venueLike.entity'

@Entity(TableNameEnum.USERS)
export class UserEntity extends BaseModel {
	@Column({ unique: true })
	email: string

	@Column('text', { select: false })
	password: string

	@Column('text', { nullable: true })
	image?: string

	@Column('text')
	name: string

	@Column('text', { nullable: true })
	bio?: string

	@Column({
		type: 'enum',
		enum: AccountTypeEnum,
		default: AccountTypeEnum.BASE_ACCOUNT,
	})
	accountType: AccountTypeEnum

	@Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
	role: UserRoleEnum

	@OneToMany(() => VenueEntity, venue => venue.owner)
	venues?: VenueEntity[]

	@OneToMany(() => ReviewEntity, review => review.userId)
	reviews: ReviewEntity[]

	@OneToMany(() => FavoriteEntity, favorite => favorite.user)
	favorites: FavoriteEntity[]

	@OneToMany(() => RefreshTokenEntity, entity => entity.user)
	refreshTokens?: RefreshTokenEntity[]

	@OneToMany(() => SignboardEntity, signboards => signboards.user)
	signboards: SignboardEntity[]

	@OneToMany(() => VenueLikeEntity, like => like.user)
	likedVenues: VenueLikeEntity[]
}
