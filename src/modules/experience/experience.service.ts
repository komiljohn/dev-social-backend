import { Injectable } from '@nestjs/common';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserService } from '../user/user.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { Experience } from './entities/experience.entity';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly userService: UserService,
    private readonly em: EntityManager,
    @InjectRepository(Experience)
    private readonly postRepo: EntityRepository<Experience>,
  ) {}

  async create(createExperienceDto: CreateExperienceDto) {
    const user = await this.userService.findOneOrFail(
      createExperienceDto.userId,
    );

    const experience = this.postRepo.create({
      ...createExperienceDto,
      user,
    });

    await this.em.persistAndFlush(experience);

    return experience;
  }

  findAll() {
    return `This action returns all experience`;
  }

  findOne(id: number) {
    return `This action returns a #${id} experience`;
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    console.log(updateExperienceDto);
    return `This action updates a #${id} experience`;
  }

  remove(id: number) {
    return `This action removes a #${id} experience`;
  }
}
