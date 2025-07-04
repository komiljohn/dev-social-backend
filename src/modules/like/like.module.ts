import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UserModule } from '../user/user.module';
import { PostsModule } from '../posts/posts.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Like } from './entities/like.entity';

@Module({
  imports: [UserModule, PostsModule, MikroOrmModule.forFeature([Like])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
