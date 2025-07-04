import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Unique({ properties: ['user', 'post'] })
@Entity()
export class Like extends BaseEntity {
  @ManyToOne(() => User, { deleteRule: 'cascade' })
  user!: User;

  @ManyToOne(() => Post, { deleteRule: 'cascade' })
  post!: Post;
}
