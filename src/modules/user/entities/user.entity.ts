import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  Property,
  TextType,
} from '@mikro-orm/core';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Skill } from 'src/modules/skill/entities/skill.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class User extends BaseEntity {
  @Property({ nullable: false, length: 30, unique: true })
  email!: string;

  @Property({ nullable: false, length: 100 })
  password!: string;

  @Property({ nullable: false, length: 50 })
  name!: string;

  @Property({ type: TextType, nullable: false, length: 1000 })
  bio!: string;

  @Property({ nullable: false, length: 30 })
  company!: string;

  @Property({ nullable: false, length: 30 })
  location!: string;

  @Property({ nullable: false, length: 30 })
  github_username!: string;

  @Enum(() => UserStatus)
  status: UserStatus = UserStatus.ACTIVE;

  @OneToMany(() => Post, (post) => post.user)
  posts = new Collection<Post>(this);

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

  @ManyToMany(() => Skill, (skill) => skill.users, {
    owner: true,
    pivotTable: 'user_skill',
  })
  skills = new Collection<Skill>(this);
}
