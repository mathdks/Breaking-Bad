import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post('/create')
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Get('/find')
  findAll() {
    return this.characterService.findAll();
  }

  @Get('/find/:name')
  findOne(@Param('name') name: string) {
    return this.characterService.findOne(name);
  }

  @Delete('/delete/:name')
  remove(@Param('name') name: string) {
    return this.characterService.remove(name);
  }
}
