import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    @InjectRepository(Skill)
    private readonly skillRepository: EntityRepository<Skill>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const userExists = await this.userRepo.findOne({ email });

    if (userExists)
      throw new ConflictException('User with this email already exists');

    const hashedPassword = await hash(createUserDto.password, 10);

    const user = this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.em.persistAndFlush([user]);

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneOrFail(id: string) {
    const user = await this.userRepo.findOne({ id });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({ id });

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepo.findOne({ email });

    return user;
  }

  async updateUserSkills(userId: string, skillNames: string[]): Promise<void> {
    // Normalize skill names
    const uniqueSkillNames = [
      ...new Set(skillNames.map((name) => name.trim())),
    ];

    // 1. Load the existing user
    const user = await this.findOneOrFail(userId);

    // 2. Find existing skills from DB
    const existingSkills = await this.skillRepository.find({
      name: { $in: uniqueSkillNames },
    });
    const existingNames = existingSkills.map((s) => s.name);

    // 3. Create any missing skills
    const newSkills = uniqueSkillNames
      .filter((name) => !existingNames.includes(name))
      .map((name) => this.skillRepository.create({ name }));

    const allSkills = [...existingSkills, ...newSkills];

    // 4. Assign new skill set to the user
    user.skills.set(allSkills); // replaces existing ones
    await this.em.flush();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
