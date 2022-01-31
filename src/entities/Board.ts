import { Entity, PrimaryGeneratedColumn, Column, BaseEntity , OneToMany } from 'typeorm';
import ColumnEntity from './Column';

@Entity('board')
export class Board extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')

  id: string;

  @Column('varchar', { length: 50 })

  title: string;

  @OneToMany(() => ColumnEntity, (column) => column.board, { cascade: true })
  columns: ColumnEntity[];
}
