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

  @Property({ type: TextType, length: 1000, nullable: true })
  bio?: string;

  @Property({ length: 30, nullable: true })
  company?: string;

  @Property({ length: 30, nullable: true })
  location?: string;

  @Property({ length: 30, nullable: true })
  github_username?: string;

  @Enum(() => UserStatus)
  status?: UserStatus = UserStatus.ACTIVE;

  @OneToMany(() => Post, (post) => post.user)
  posts = new Collection<Post>(this);

  @Property({ length: 50, nullable: true })
  website?: string;

  @Property({ length: 50, nullable: true })
  youtube?: string;

  @Property({ length: 50, nullable: true })
  twitter?: string;

  @Property({ length: 50, nullable: true })
  instagram?: string;

  @Property({ length: 50, nullable: true })
  facebook?: string;

  @Property({ length: 50, nullable: true })
  linkedin?: string;

  @ManyToMany(() => Skill, (skill) => skill.users, {
    owner: true,
    pivotTable: 'user_skill',
  })
  skills = new Collection<Skill>(this);
}
