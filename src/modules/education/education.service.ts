import { Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Education } from './entities/education.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { UserService } from '../user/user.service';

@Injectable()
export class EducationService {
  constructor(
    private readonly userService: UserService,
    private readonly em: EntityManager,
    @InjectRepository(Education)
    private readonly postRepo: EntityRepository<Education>,
  ) {}

  async create(createEducationDto: CreateEducationDto) {
    const user = await this.userService.findOneOrFail(
      createEducationDto.userId,
    );

    const education = this.postRepo.create({
      ...createEducationDto,
      user,
    });

    await this.em.persistAndFlush(education);

    return education;
  }

  findAll() {
    return `This action returns all education`;
  }

  findOne(id: string) {
    return `This action returns a #${id} education`;
  }

  update(id: string, updateEducationDto: UpdateEducationDto) {
    console.log(updateEducationDto);
    return `This action updates a #${id} education`;
  }

  remove(id: string) {
    return `This action removes a #${id} education`;
  }
}
