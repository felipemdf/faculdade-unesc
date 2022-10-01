import { DataSource } from 'typeorm';
import { Genre } from './entities/genre.entity';

export const GenreProvider = [
    {
        provide: 'GENRE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Genre),
        inject: ['DATA_SOURCE'],
    },
];