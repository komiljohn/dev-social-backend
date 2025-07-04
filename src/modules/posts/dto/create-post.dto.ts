import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { PostStatus } from '../entities/post.entity';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  body: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;
}
