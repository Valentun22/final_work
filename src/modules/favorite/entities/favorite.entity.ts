import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from 'typeorm';
import {VenueEntity} from "../../venue/entity/venue.entity";
import {TableNameEnum} from "../../../database/enums/table-name.enum";
import {UserEntity} from "../../user/entity/user.entity";

@Entity(TableNameEnum.FAVORITE)
export class FavoriteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.favorites)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @Column()
    userId: string;

    @ManyToOne(() => VenueEntity, (venue) => venue.favorites)
    @JoinColumn({ name: 'venueId' })
    venue: VenueEntity;

    @Column()
    venueId: string;
}