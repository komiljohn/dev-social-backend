import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { UserModule } from '../user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Education } from './entities/education.entity';

@Module({
  imports: [UserModule, MikroOrmModule.forFeature([Education])],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
