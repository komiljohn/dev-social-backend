import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Entity()
export class Skill extends BaseEntity {
  @Property({ unique: true })
  name!: string;

  @ManyToMany(() => User, (user) => user.skills)
  users = new Collection<User>(this);
}
