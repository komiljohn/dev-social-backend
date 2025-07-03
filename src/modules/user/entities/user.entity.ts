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

  @Property({ nullable: false })
  email!: string;

  @Property({ nullable: false })
  password!: string;

  @Property({ type: TextType, nullable: false })
  bio!: string;

  @Property({ nullable: false })
  company!: string;

  @Property({ nullable: false })
  location!: string;

  @Property({ nullable: false })
  github_username!: string;

  @Enum(() => UserStatus)
  status: UserStatus = UserStatus.ACTIVE;

  @Property()
  website: string;

  @Property()
  youtube: string;

  @Property()
  twitter: string;

  @Property()
  instagram: string;

  @Property()
  facebook: string;

  @Property()
  linkedin: string;
}
