import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Skill } from './entities/skill.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MikroOrmModule.forFeature([Skill]), UserModule],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
