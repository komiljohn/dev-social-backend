import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateEducationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  school: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  degree: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  speciality: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  from: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  to: Date;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
