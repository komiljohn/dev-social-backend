import { Entity, ManyToOne, Unique } from '@mikro-orm/core';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Unique({ properties: ['followingUser', 'followedUser'] })
@Entity()
export class Follow extends BaseEntity {
  @ManyToOne(() => User, { deleteRule: 'cascade' })
  followingUser: User;

  @ManyToOne(() => User, { deleteRule: 'cascade' })
  followedUser: User;
}
