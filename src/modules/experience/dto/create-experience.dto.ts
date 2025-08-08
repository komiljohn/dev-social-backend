import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty({
    description: 'Company',
    example: 'Company Inc',
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  company: string;

  @ApiProperty({
    description: 'Position',
    example: 'Software Engineer',
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  position: string;

  @ApiProperty({
    description: 'Description',
    example: 'Worked on project X',
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Location',
    example: 'New York, NY',
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  location: string;

  @ApiProperty({
    description: 'From',
    example: '2015-01-01',
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
