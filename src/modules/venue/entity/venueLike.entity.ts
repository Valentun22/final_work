import {Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from 'typeorm';
import {VenueEntity} from "./venue.entity";
import {UserEntity} from "../../user/entity/user.entity";

@Entity()
export class VenueLikeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.likedVenues)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @Column()
    userId: string;

    @ManyToOne(() => VenueEntity, (venue) => venue.likes)
    @JoinColumn({ name: 'venueId' })
    venue: VenueEntity;

    @Column()
    venueId: string;
}