import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../databases/mysql';

@Entity()
export class Role extends AbstractEntity<Role> {
  @Column()
  name: string;
}
