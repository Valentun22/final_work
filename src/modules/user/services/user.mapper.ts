import { UserResDto } from '../dto/res/user.res.dto';
import {UserEntity} from "../entity/user.entity";

export class UserMapper {
  public static toResponseDto(userEntity: UserEntity): UserResDto {
    return {
      email: userEntity.email,
      image: userEntity.image,
      name: userEntity.name,
      id: userEntity.id,
      bio: userEntity.bio,
      role: userEntity.role,
      reviews: userEntity.reviews,
      favorites: userEntity.favorites,
    };
  }
}
