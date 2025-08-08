import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Authorization()
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  create(
    @Body() createExperienceDto: CreateExperienceDto,
    @CurrentUser() user: User,
  ) {
    return this.experienceService.create(createExperienceDto, user);
  }

  @Get()
  findAll() {
    return this.experienceService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceService.remove(+id);
  }
}
