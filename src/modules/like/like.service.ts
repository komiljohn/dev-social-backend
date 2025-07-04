import { ConflictException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { UserService } from '../user/user.service';
import { PostsService } from '../posts/posts.service';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Like } from './entities/like.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class LikeService {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostsService,
    private readonly em: EntityManager,
    @InjectRepository(Like)
    private readonly likeRepository: EntityRepository<Like>,
  ) {}

  async create(createLikeDto: CreateLikeDto) {
    const user = await this.userService.findOneOrFail(createLikeDto.userId);
    const post = await this.postService.findOneOrFail(createLikeDto.postId);

    const existing = await this.likeRepository.findOne({
      user,
      post,
    });

    if (existing) throw new ConflictException('User already liked this post');

    const like = this.likeRepository.create({
      ...createLikeDto,
      user,
      post,
    });

    await this.em.persistAndFlush(like);

    return like;
  }

  findAll() {
    return `This action returns all like`;
  }

  findOne(id: string) {
    return `This action returns a #${id} like`;
  }

  update(id: string, updateLikeDto: UpdateLikeDto) {
    console.log(updateLikeDto);
    return `This action updates a #${id} like`;
  }

  remove(id: string) {
    return `This action removes a #${id} like`;
  }
}
