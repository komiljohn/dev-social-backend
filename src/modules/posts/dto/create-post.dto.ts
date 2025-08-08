import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PostStatus } from '../entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Post title',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @ApiProperty({
    description: 'Post body',
    example: 'Post body',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: 'Post status',
    example: 'PostStatus.PUBLISHED',
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;
}
