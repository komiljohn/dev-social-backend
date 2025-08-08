import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { UserStatus } from '../entities/user.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(30)
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password!: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'User bio',
    example: 'I am a software developer',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  bio: string;

  @ApiProperty({
    description: 'User company',
    example: 'Acme Inc',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  company: string;

  @ApiProperty({
    description: 'User location',
    example: 'New York',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  location: string;

  @ApiProperty({
    description: 'User github username',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  github_username: string;

  @ApiProperty({
    description: 'User status',
    example: 'active',
  })
  @IsEnum(UserStatus)
  @IsNotEmpty()
  status: UserStatus;

  @ApiProperty({
    description: 'User website',
    example: 'https://example.com',
  })
  @IsString()
  @IsUrl()
  @MaxLength(50)
  website: string;

  @ApiProperty({
    description: 'User youtube',
    example: 'https://youtube.com/user',
  })
  @IsString()
  @IsUrl()
  @MaxLength(50)
  youtube: string;

  @ApiProperty({
    description: 'User twitter',
    example: 'https://twitter.com/user',
  })
  @IsString()
  @IsUrl()
  @MaxLength(50)
  twitter: string;

  @ApiProperty({
    description: 'User instagram',
    example: 'https://instagram.com/user',
  })
  @IsString()
  @IsUrl()
  @MaxLength(50)
  instagram: string;

  @ApiProperty({
    description: 'User facebook',
    example: 'https://facebook.com/user',
  })
  @IsString()
  @IsUrl()
  @MaxLength(50)
  facebook: string;

  @ApiProperty({
    description: 'User linkedin',
    example: 'https://linkedin.com/user',
  })
  @IsString()
  @IsUrl()
  @MaxLength(50)
  linkedin: string;

  @ApiProperty({
    description: 'User posts',
    example: [],
  })
  @IsArray()
  @IsOptional()
  posts: Post[];
}
