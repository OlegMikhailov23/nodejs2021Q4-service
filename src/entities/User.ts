import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'typeorm/index';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')

  id: string;

  @Column('varchar', { length: 50 })

  name: string;

  @Column('varchar', { length: 50 })

  login: string;

  @Column('varchar', { length: 50 })

  password: string;
}
