import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Entity()
export class Education extends BaseEntity {
  @Property({ nullable: false, length: 30 })
  school!: string;

  @Property({ nullable: false, length: 30 })
  degree!: string;

  @Property({ nullable: false, length: 30 })
  speciality!: string;

  @Property({ nullable: false })
  from!: Date;

  @Property({ nullable: false })
  to!: Date;

  @ManyToOne(() => User, { deleteRule: 'cascade' })
  user: User;
}
