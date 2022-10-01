import { Genre } from 'src/genres/entities/genre.entity';
import { PartialType } from '@nestjs/mapped-types';
import CreateGameDto from './create-game.dto';
import { IsString, ValidateNested, IsOptional, IsDateString, IsArray
 } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateGameDto extends PartialType(CreateGameDto) {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    @IsDateString()
    @Transform(({ value }) => new Date(value))
    releaseDate: Date;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Genre)
    genres: Genre[];
}
