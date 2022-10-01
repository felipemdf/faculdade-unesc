import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(@Inject('GENRE_REPOSITORY') private readonly repository: Repository<Genre>) { }

  create(createGenreDto: CreateGenreDto) {
    const genre: Genre = this.repository.create(createGenreDto);
    return this.repository.save(genre);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id: id } });
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    const genre: Genre = this.repository.create(updateGenreDto);
    return this.repository.update(id, genre);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
