import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from './User';
import { Board } from './Board';
import { BaseEntity } from 'typeorm/index';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('integer')
  order: number;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  userId: string | null;

  @Column('uuid')
  boardId: string;

  @Column('text')
  description: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  columnId: string | null;

  @ManyToOne(() => Board, (board) => board.id)
  board: Board;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
