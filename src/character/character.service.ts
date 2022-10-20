import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Character } from './entities/character.entity';
import { catchError, find, lastValueFrom, map, Observable } from 'rxjs';

@Injectable()
export class CharacterService {

  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    private readonly axios: HttpService
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    let selectCharacter = await this.characterRepository.findOneBy({ name: createCharacterDto.name });

    if (selectCharacter) {
      throw new HttpException('O personagem já está cadastrado.', HttpStatus.BAD_REQUEST);
    }
    else {
      let character = new Character()
  
      character.name = createCharacterDto.name
  
      let findCharacter = await this.findCharacter(character.name)
    
      character.nickname = findCharacter.nickname
      character.photo = findCharacter.img
  
      let findAppearance = await this.findAppearances(character.name)
  
      character.appearances = findAppearance
       
      return await this.characterRepository.save(character)
    }
  }

  async findAll() {
    let selectCharacters = await this.characterRepository.find({ order: { name: 'ASC'}});
    if (selectCharacters.length > 0) {
      return selectCharacters;
    } else {
      throw new HttpException('Nenhum personagem foi encontrado.', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(name: string) {
    let selectCharacter = await this.characterRepository.findOneBy({ name: name });
    if (selectCharacter) {
      return selectCharacter;
    } else {
      throw new HttpException('Personagem não encontrado.', HttpStatus.NOT_FOUND);
    }
  }

  async remove(name: string) {
    let selectCharacter = await this.characterRepository.findOneBy({ name: name });
    await this.characterRepository.remove(selectCharacter);
    throw new HttpException('Personagem removido com sucesso.', HttpStatus.OK);
  }

  async findCharacter(name: string) {
    let apiUrl = 'https://www.breakingbadapi.com/api/characters?name='

    let findCharacter = this.axios
      .get(`${apiUrl}${name}`)
      .pipe(
        map((res) => res.data.shift()),
        map((data) => {
          let { name, nickname, img } = data
          return { name, nickname, img }
        })
      )
      .pipe(
        catchError(() => {
          throw new HttpException('Esse personagem não existe em Braking Bad.', HttpStatus.NOT_FOUND)
        }),
      );

    return await lastValueFrom(findCharacter);
  }

  async findAppearances(name: string) {
    let apiUrl = 'https://www.breakingbadapi.com/api/episodes'

    let findEpisodes = this.axios
      .get(apiUrl)
      .pipe(
        map((res) => res.data)
      )
      .pipe(
        catchError(() => {
          throw new HttpException('Não encontramos os episódios.', HttpStatus.NOT_FOUND)
        }),
      );

    let episodesList = await lastValueFrom(findEpisodes)
    let appearIn = []
    let dontAppearIn = []

    episodesList.forEach(episode => {
      if(episode.characters.includes(name)) {
        appearIn.push({
          season: episode.season,
          ep: episode.episode,
          title: episode.title
        })
      }
      else {
        dontAppearIn.push({
          season: episode.season,
          ep: episode.episode,
          title: episode.title
        })
      }
    })

    return appearIn;
  }
}
