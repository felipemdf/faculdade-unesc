import { GenresModule } from './../genres/genres.module';
import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GameProvider } from './games.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, GenresModule],
  controllers: [GamesController],
  providers: [GamesService, ...GameProvider]
})
export class GamesModule { }
