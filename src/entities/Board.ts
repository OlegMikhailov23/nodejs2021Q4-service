import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('board')
export class Board extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')

  id: string;

  @Column('varchar', { length: 50 })

  title: string;

  @Column('json')
  columns: string
}
