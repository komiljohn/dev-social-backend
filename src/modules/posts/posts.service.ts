import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Post } from './entities/post.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UserService,
    private readonly em: EntityManager,
    @InjectRepository(Post) private readonly postRepo: EntityRepository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.userService.findOneOrFail(createPostDto.userId);

    const post = this.postRepo.create({
      ...createPostDto,
      user,
    });

    await this.em.persistAndFlush(post);

    return post;
  }

  async findOneOrFail(id: string) {
    const user = await this.postRepo.findOne({ id });

    if (!user) throw new NotFoundException('Post not found');

    return user;
  }
}
