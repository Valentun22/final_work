import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import {TableNameEnum} from "../../../database/enums/table-name.enum";
import {BaseModel} from "../../../database/entities/models/base.model";
import {UserEntity} from "../../user/entity/user.entity";

@Entity(TableNameEnum.REFRESH_TOKEN)
export class RefreshTokenEntity extends BaseModel {
  @Column('text')
  refreshToken: string;

  @Column('text')
  deviceId: string;

  @Column()
  userId: string;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;
}
