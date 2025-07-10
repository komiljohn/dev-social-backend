import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  comment!: string;

  @IsUUID()
  @IsNotEmpty()
  postId: string;
}
