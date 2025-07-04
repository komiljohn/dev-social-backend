import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserService } from '../user/user.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
    private readonly em: EntityManager,
    private readonly userService: UserService,
    private readonly postService: PostsService,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const user = await this.userService.findOneOrFail(createCommentDto.userId);
    const post = await this.postService.findOneOrFail(createCommentDto.postId);

    const comment = this.commentRepository.create({
      ...createCommentDto,
      user,
      post,
    });

    await this.em.persistAndFlush(comment);

    return comment;
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    console.log(updateCommentDto);
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
