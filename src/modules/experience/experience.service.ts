import { Injectable } from '@nestjs/common';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserService } from '../user/user.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { Experience } from './entities/experience.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly userService: UserService,
    private readonly em: EntityManager,
    @InjectRepository(Experience)
    private readonly postRepo: EntityRepository<Experience>,
  ) {}

  async create(createExperienceDto: CreateExperienceDto, user: User) {
    const userEntity = await this.userService.findOneOrFail(user.id);

    const experience = this.postRepo.create({
      ...createExperienceDto,
      user: userEntity,
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
