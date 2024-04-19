import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import { AbstractEntity } from '../databases/mysql';
import { Role } from './role.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles?: Role[];
}
