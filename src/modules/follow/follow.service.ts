import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Follow } from './entities/follow.entity';
import { UserService } from '../user/user.service';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: EntityRepository<Follow>,
    private readonly userService: UserService,
    private readonly em: EntityManager,
  ) {}

  async create(createFollowDto: CreateFollowDto) {
    const followingUser = await this.userService.findOneOrFail(
      createFollowDto.followingUserId,
    );

    const followedUser = await this.userService.findOneOrFail(
      createFollowDto.followedUserId,
    );

    const existing = await this.followRepository.findOne({
      followingUser,
      followedUser,
    });

    if (followingUser.id === followedUser.id)
      throw new BadRequestException('User cannot follow themselves');

    if (existing)
      throw new ConflictException('User already followed this user');

    const follow = this.followRepository.create({
      followingUser,
      followedUser,
    });
    await this.em.persistAndFlush(follow);

    return follow;
  }
}
