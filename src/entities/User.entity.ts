import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')

  id: string;

  @Column('varchar', { length: 50 })

  name: string;

  @Column('varchar', { length: 50 })

  login: string;

  @Column('varchar', { length: 50 })

  password: string;
}
