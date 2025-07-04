import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Entity()
export class Comment extends BaseEntity {
  @Property({ type: 'text', nullable: false })
  comment!: string;

  @ManyToOne(() => User, { deleteRule: 'cascade' })
  user!: User;

  @ManyToOne(() => Post, { deleteRule: 'cascade' })
  post!: Post;
}
