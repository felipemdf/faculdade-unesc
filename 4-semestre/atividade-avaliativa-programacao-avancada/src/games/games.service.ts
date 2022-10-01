
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import CreateGameDto from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(@Inject('GAME_REPOSITORY') private readonly repository: Repository<Game>) { }

  create(createGameDto: CreateGameDto) {
    const game: Game = this.repository.create(createGameDto);
    return this.repository.save(game);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id: id } });
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    // const newGame: Game = this.repository.create(updateGameDto);
    // const game: Game = await this.repository.findOne({ where: { id: id } });

    // if (game) {
    //   newGame.id = game.id;
    //   await this.repository.save(newGame);
    // }

    // return new HttpException("Game not found!", HttpStatus.NOT_FOUND);

    return await this.repository.update(id, updateGameDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
