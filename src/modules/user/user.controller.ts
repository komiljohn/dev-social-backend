import { Controller, Get, Body, Patch, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateSkillDto } from '../skill/dto/update-skill.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Authorization()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: User })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ type: User })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOneOrFail(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Update user skills' })
  @Put(':id/skills')
  updateUserSkills(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return this.userService.updateUserSkills(id, updateSkillDto.skills);
  }
}
