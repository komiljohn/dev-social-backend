import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UserModule } from '../user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from './entities/post.entity';
import { Like } from '../like/entities/like.entity';
import { Comment } from '../comment/entities/comment.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UserModule, MikroOrmModule.forFeature([Post, Like, Comment])],
  exports: [PostsService],
})
export class PostsModule {}
