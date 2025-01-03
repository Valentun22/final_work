import { UserMapper } from '../../user/services/user.mapper';
import { TokenResDto } from '../dto/res/token.res.dto';
import { AuthUserResDto } from '../dto/res/auth-user.res.dto';
import {UserEntity} from "../../user/entity/user.entity";

export class AuthMapper {
  public static toResponseDto(
    userEntity: UserEntity,
    tokens: TokenResDto,
  ): AuthUserResDto {
    return {
      user: UserMapper.toResponseDto(userEntity),
      tokens,
    };
  }
}
