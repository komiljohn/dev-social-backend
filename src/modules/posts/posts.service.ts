import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Post } from './entities/post.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateLikeDto } from '../like/dto/create-like.dto';
import { User } from '../user/entities/user.entity';
import { Like } from '../like/entities/like.entity';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import { Comment } from '../comment/entities/comment.entity';
import { UpdateCommentDto } from '../comment/dto/update-comment.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UserService,
    private readonly em: EntityManager,
    @InjectRepository(Post) private readonly postRepo: EntityRepository<Post>,
    @InjectRepository(Like) private readonly likeRepo: EntityRepository<Like>,
    @InjectRepository(Comment)
    private readonly commentRepo: EntityRepository<Comment>,
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

  async findAll() {
    return this.postRepo.findAll();
  }

  async getComments(postId: string) {
    return this.commentRepo.findAll({
      where: {
        post: postId,
      },
    });
  }

  async findOneOrFail(id: string) {
    const post = await this.postRepo.findOne({ id });

    if (!post) throw new NotFoundException('Post not found');

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepo.findOneOrFail({ id });

    this.postRepo.assign(post, updatePostDto);
    await this.em.persistAndFlush(post);

    return post;
  }

  async like(createLikeDto: CreateLikeDto, user: User) {
    const post = await this.findOneOrFail(createLikeDto.postId);

    const existing = await this.likeRepo.findOne({
      user,
      post,
    });

    if (existing) throw new ConflictException('User already liked this post');

    const like = this.likeRepo.create({
      ...createLikeDto,
      user,
      post,
    });

    await this.em.persistAndFlush(like);

    return like;
  }

  async unlike(createLikeDto: CreateLikeDto, user: User) {
    const post = await this.findOneOrFail(createLikeDto.postId);

    const existingLike = await this.likeRepo.findOne({
      user,
      post,
    });

    if (existingLike) {
      await this.em.removeAndFlush(existingLike);
      return { id: existingLike.id };
    }

    return { message: 'Post not liked' };
  }

  async comment(createCommentDto: CreateCommentDto, user: User) {
    const post = await this.findOneOrFail(createCommentDto.postId);

    const comment = this.commentRepo.create({
      ...createCommentDto,
      user,
      post,
    });

    await this.em.persistAndFlush(comment);

    return comment;
  }

  async deleteComment(
    updateCommentDto: UpdateCommentDto,
    commentId: string,
    user: User,
  ) {
    const post = await this.findOneOrFail(updateCommentDto.postId!);
    const comment = await this.commentRepo.findOneOrFail({
      id: commentId,
      post,
    });

    if (comment.user.id !== user.id) {
      throw new ForbiddenException(
        'You are not authorized to delete this comment',
      );
    }

    await this.em.removeAndFlush(comment);

    return { id: commentId };
  }
}
