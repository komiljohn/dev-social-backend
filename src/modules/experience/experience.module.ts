import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Experience } from './entities/experience.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, MikroOrmModule.forFeature([Experience])],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
