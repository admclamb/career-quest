import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardColumn } from './board-column.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ nullable: false, length: 50 })
  title: string;

  @OneToMany(() => BoardColumn, (boardColumn) => boardColumn.board)
  columns: BoardColumn[];

  @Column({ nullable: false })
  userSub: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  public removePrivateProperties() {
    this.userSub = null;
  }
}
