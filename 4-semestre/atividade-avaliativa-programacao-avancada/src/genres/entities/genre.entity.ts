import { Game } from './../../games/entities/game.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 510, nullable: false })
    name: string
}
