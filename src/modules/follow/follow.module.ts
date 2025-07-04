import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Follow } from './entities/follow.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, MikroOrmModule.forFeature([Follow])],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
