import { Genre } from "src/genres/entities/genre.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 510, nullable: false })
    name: string

    @Column({ type: 'text', default: null })
    description: string;

    @Column({ nullable: false })
    releaseDate: Date

    @ManyToMany(() => Genre, { eager: true })
    @JoinTable({ name: "game_genre" })
    genres: Genre[]
}
