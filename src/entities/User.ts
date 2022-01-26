import { Entity, PrimaryGeneratedColumn, Column , BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')

  id: string;

  @Column('varchar', { length: 50 })

  name: string;

  @Column('varchar', { length: 50 })

  login: string;

  @Column('varchar', { length: 200 })

  password: string;
}
