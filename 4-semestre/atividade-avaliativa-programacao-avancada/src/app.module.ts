import { Module } from '@nestjs/common';

import { Database } from './database/database.provider';
import { GamesModule } from './games/games.module';
import { DatabaseModule } from './database/database.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [GamesModule, DatabaseModule, GenresModule],
  controllers: [],
  providers: []
})
export class AppModule { }
