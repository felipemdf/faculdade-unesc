import { IsString, ValidateNested, IsNotEmpty, IsOptional, IsDate, IsArray, ArrayNotEmpty } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Genre } from 'src/genres/entities/genre.entity';


export default class CreateGameDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    releaseDate: Date;

    @ArrayNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Genre)
    genres: Genre[];
}
