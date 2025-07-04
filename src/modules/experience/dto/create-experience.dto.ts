import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDate,
  IsUUID,
} from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  position: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  location: string;

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
