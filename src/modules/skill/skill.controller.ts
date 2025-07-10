import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UserService } from '../user/user.service';
import { SkillService } from './skill.service';
import { Authorization } from 'src/decorators/authorization.decorator';

@Authorization()
@Controller('skill')
export class SkillController {
  constructor(
    private readonly userService: UserService,
    private readonly skillService: SkillService,
  ) {}

  @Post()
  create(userId: string, @Body() createSkillDto: CreateSkillDto) {
    return this.userService.updateUserSkills(userId, createSkillDto.skills);
  }

  @Get()
  findAll() {
    return this.skillService.findAll();
  }
}
