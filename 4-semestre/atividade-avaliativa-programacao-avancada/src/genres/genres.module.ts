import { DatabaseModule } from 'src/database/database.module';
import { GenreProvider } from './genres.provider';
import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [GenresController],
  providers: [GenresService, ...GenreProvider]
})
export class GenresModule { }
