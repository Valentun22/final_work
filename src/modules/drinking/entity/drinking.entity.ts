import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('drinking_requests')
export class DrinkingEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    venueId: string;

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column()
    description: string;

    @Column()
    gender: string;

    @Column()
    numberOfPeople: number;

    @Column()
    paymentType: string;

    @Column()
    budget: number;
}
