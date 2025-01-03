import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {VenueEntity} from "../../venue/entity/venue.entity";
import {TableNameEnum} from "../../../database/enums/table-name.enum";

@Entity(TableNameEnum.REVIEWS)
export class ReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    venueId: string;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => VenueEntity, (venue) => venue.reviews)
    @JoinColumn({ name: 'venueId' })
    venue: VenueEntity;
}
