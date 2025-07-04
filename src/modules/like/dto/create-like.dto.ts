import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  postId: string;
}
