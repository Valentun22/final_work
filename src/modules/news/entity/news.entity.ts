import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import {TableNameEnum} from "../../../database/enums/table-name.enum";
import {VenueEntity} from "../../venue/entity/venue.entity";

@Entity(TableNameEnum.NEWS)
export class NewsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @ManyToOne(() => VenueEntity, (venue) => venue.news)
    @JoinColumn({ name: 'venueId' })
    venue: VenueEntity;

    @Column()
    venueId: string;
}