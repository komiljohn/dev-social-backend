import { UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  email: string;
  password: string;
  bio: string;
  company: string;
  location: string;
  github_username: string;
  status: UserStatus;
  website: string;
  youtube: string;
  twitter: string;
  instagram: string;
  facebook: string;
  linkedin: string;
}
