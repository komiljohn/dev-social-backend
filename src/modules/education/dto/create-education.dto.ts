import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEducationDto {
  @ApiProperty({
    description: 'School',
    example: 'School of Science',
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  school: string;

  @ApiProperty({
    description: 'Degree',
    example: 'Bachelor',
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  degree: string;

  @ApiProperty({
    description: 'Speciality',
    example: 'Computer Science',
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  speciality: string;

  @ApiProperty({
    description: 'From',
    example: '2010-01-01',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  from: Date;

  @ApiProperty({
    description: 'To',
    example: '2015-01-01',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  to: Date;
}
