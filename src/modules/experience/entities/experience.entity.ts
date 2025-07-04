import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Entity()
export class Experience extends BaseEntity {
  @Property({ nullable: false, length: 30 })
  company!: string;

  @Property({ nullable: false, length: 50 })
  position!: string;

  @Property({ type: 'text', nullable: false })
  description!: string;

  @Property({ nullable: false, length: 50 })
  location!: string;

  @Property({ nullable: false })
  from!: Date;

  @Property({ nullable: false })
  to!: Date;

  @ManyToOne(() => User, { deleteRule: 'cascade' })
  user!: User;
}
