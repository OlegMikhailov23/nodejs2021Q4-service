import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/index';
import { Board } from './Board';

@Entity('column')
export default class ColumnEntity extends  BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id:string

  @Column('varchar', { length: 50 })

  title: string;

  @ManyToOne(() => Board, (board) => board.columns, {onDelete: 'CASCADE'})
  board: Board
}
