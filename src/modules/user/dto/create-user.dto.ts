import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(30)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  password: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  location: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  github_username: string;

  @IsEnum(UserStatus)
  @IsNotEmpty()
  status: UserStatus;

  @IsString()
  @IsUrl()
  @MaxLength(50)
  website: string;

  @IsString()
  @IsUrl()
  @MaxLength(50)
  youtube: string;

  @IsString()
  @IsUrl()
  @MaxLength(50)
  twitter: string;

  @IsString()
  @IsUrl()
  @MaxLength(50)
  instagram: string;

  @IsString()
  @IsUrl()
  @MaxLength(50)
  facebook: string;

  @IsString()
  @IsUrl()
  @MaxLength(50)
  linkedin: string;
}
