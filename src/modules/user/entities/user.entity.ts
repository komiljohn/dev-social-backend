import { Entity, Enum, PrimaryKey, Property, TextType } from '@mikro-orm/core';
import { v4 } from 'uuid';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property({ nullable: false, length: 30 })
  email!: string;

  @Property({ nullable: false, length: 30 })
  password!: string;

  @Property({ type: TextType, nullable: false })
  bio!: string;

  @Property({ nullable: false, length: 30 })
  company!: string;

  @Property({ nullable: false, length: 30 })
  location!: string;

  @Property({ nullable: false, length: 30 })
  github_username!: string;

  @Enum(() => UserStatus)
  status: UserStatus = UserStatus.ACTIVE;

  @Property({ length: 50 })
  website: string;

  @Property({ length: 50 })
  youtube: string;

  @Property({ length: 50 })
  twitter: string;

  @Property({ length: 50 })
  instagram: string;

  @Property({ length: 50 })
  facebook: string;

  @Property({ length: 50 })
  linkedin: string;
}
