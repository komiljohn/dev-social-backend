import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';

export enum PostStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class Post extends BaseEntity {
  @Property({ nullable: false, length: 30 })
  title!: string;

  @Property({ type: 'text', nullable: false, length: 1000 })
  body!: string;

  @ManyToOne(() => User, {
    deleteRule: 'cascade',
  })
  user: User;

  @Enum(() => PostStatus)
  status: PostStatus = PostStatus.ACTIVE;
}
