import { IsArray, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsArray()
  @IsString({ each: true })
  skills!: string[];
}
