import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';

@Authorization()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOneOrFail(id);
  }

  @Get(':id/comment')
  async getComments(@Param('id') id: string) {
    return this.postsService.getComments(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const updatedPost = await this.postsService.update(id, {
      ...updatePostDto,
    });
    return updatedPost;
  }

  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ) {
    return this.postsService.create(createPostDto, user);
  }

  @Post('like')
  async likePost(@Body('postId') postId: string, @CurrentUser() user: User) {
    return this.postsService.like({ postId, userId: user.id }, user);
  }

  @Post('unlike')
  async unlikePost(@Body('postId') postId: string, @CurrentUser() user: User) {
    return this.postsService.unlike({ postId, userId: user.id }, user);
  }

  @Post('comment')
  async commentPost(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() user: User,
  ) {
    return this.postsService.comment(createCommentDto, user);
  }

  @Delete('/:id/comment/:commentId')
  async deleteComment(
    @Param('id') postId: string,
    @Param('commentId') commentId: string,
    @CurrentUser() user: User,
  ) {
    return this.postsService.deleteComment({ postId }, commentId, user);
  }
}
