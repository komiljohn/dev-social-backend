import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserModule } from '../user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Comment } from './entities/comment.entity';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [UserModule, PostsModule, MikroOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
