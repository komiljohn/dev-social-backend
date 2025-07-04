import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFollowDto {
  @IsUUID()
  @IsNotEmpty()
  followedUserId: string;

  @IsUUID()
  @IsNotEmpty()
  followingUserId: string;
}
