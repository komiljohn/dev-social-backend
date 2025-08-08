import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({
    description: 'List of skill names',
    example: ['JavaScript', 'TypeScript'],
  })
  @IsArray()
  @IsString({ each: true })
  skills!: string[];
}
