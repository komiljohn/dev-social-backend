import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UserModule } from '../user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from './entities/post.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UserModule, MikroOrmModule.forFeature([Post])],
})
export class PostsModule {}
